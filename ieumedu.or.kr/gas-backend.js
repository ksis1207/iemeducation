/*
Google Apps Script backend for the ieumedu.or.kr enrollment form.

1. Create a Google Spreadsheet and copy its ID from the URL.
2. Open https://script.google.com/ and create a new Apps Script project.
3. Paste this file into Code.gs.
4. Replace SPREADSHEET_ID with the real sheet ID.
5. If you use Cloudflare Turnstile, set TURNSTILE_SECRET_KEY.
6. Deploy as Web App:
   - Execute as: Me
   - Who has access: Anyone
7. Copy the Web App URL and paste it into:
   ieumedu.or.kr/components/site-content.js -> enroll.gasUrl

The frontend sends a POST request with:
  Content-Type: text/plain;charset=utf-8
  body: JSON string
*/

const SPREADSHEET_ID = '1ncy7NnlbEVuvo-1SDR9kpcEhMadQiWmm7uwTeDsJPDU';
const SHEET_NAME = 'Enrollments';
const ADMIN_SHEET_NAME = '접수관리';
const SECURITY_LOG_SHEET_NAME = '접수보안로그';
const NOTIFICATION_EMAIL = '';
const TURNSTILE_SECRET_KEY = '';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TURNSTILE_EXPECTED_ACTION = 'enroll_form';
const TURNSTILE_EXPECTED_HOSTNAME = '';
const DUPLICATE_LOOKBACK_DAYS = 30;
const LOCK_WAIT_SECONDS = 20;
const MAX_URL_COUNT = 2;
const COMMON_EMAIL_DOMAINS = ['gmail.com', 'naver.com', 'daum.net'];
const ALLOWED_COURSES = [
  '모래놀이심리상담사 2급',
  '모래놀이심리상담사 1급',
  '기타 문의',
  '기타',
];
const HEADER_ROW = [
  '접수일시',
  '접수번호',
  '접수경로',
  '이름',
  '연락처',
  '이메일',
  '신청과정',
  '문의내용',
  '개인정보동의',
  '접수상태',
  '전송메모',
];
const ADMIN_HEADER_ROW = [
  '접수일시',
  '접수번호',
  '접수경로',
  '이름',
  '연락처',
  '이메일',
  '신청과정',
  '문의내용',
  '개인정보동의',
  '접수상태',
  '전송메모',
];
const SECURITY_LOG_HEADER_ROW = [
  '기록시각',
  '이벤트유형',
  '사유',
  '접수번호',
  '접수경로',
  '이름',
  '연락처',
  '이메일',
  '과정',
  '비고',
];

function doPost(e) {
  var auditPayload = sanitizePayload_(buildAuditPayload_(e));
  try {
    const payload = sanitizePayload_(parsePayload_(e));
    auditPayload = payload;
    validatePayload_(payload);
    verifyTurnstile_(payload);

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(spreadsheet, SHEET_NAME);
    const lock = LockService.getScriptLock();
    lock.waitLock(LOCK_WAIT_SECONDS * 1000);
    let rowNumber = 0;
    try {
      ensureHeaderRow_(sheet);
      ensureAdminView_(spreadsheet);
      ensureSecurityLogSheet_(spreadsheet);
      ensureNotDuplicate_(sheet, payload);
      rowNumber = appendSubmission_(sheet, payload);
    } finally {
      lock.releaseLock();
    }

    const notificationNote = sendNotificationSafe_(payload, spreadsheet.getUrl());
    if (notificationNote) {
      sheet.getRange(rowNumber, 11).setValue(notificationNote);
      logSecurityEventSafe_(payload, '알림실패', notificationNote);
    }

    return jsonOutput_({
      ok: true,
      submissionId: payload.submissionId || '',
      rowNumber: rowNumber,
      notificationNote: notificationNote || '',
    });
  } catch (error) {
    logSecurityEventSafe_(auditPayload, '차단', error.message || String(error));
    return jsonOutput_({
      ok: false,
      error: error.message || String(error),
    });
  }
}

function parsePayload_(e) {
  const rawBody = e && e.postData && typeof e.postData.contents === 'string'
    ? e.postData.contents.trim()
    : '';
  if (!rawBody) {
    throw new Error('Request body is empty.');
  }
  try {
    return JSON.parse(rawBody);
  } catch (error) {
    throw new Error('잘못된 요청 형식입니다.');
  }
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('신청 정보가 비어 있습니다.');
  }
  if (!String(payload.name || '').trim()) {
    throw new Error('이름을 입력해 주세요.');
  }
  if (!/^[가-힣]+(?:\s[가-힣]+)*$/.test(String(payload.name || '').trim())) {
    throw new Error('이름은 한글만 입력해 주세요.');
  }
  if (!String(payload.phone || '').trim()) {
    throw new Error('연락처를 입력해 주세요.');
  }
  if (!/^\d{9,11}$/.test(normalizePhoneKey_(payload.phone))) {
    throw new Error('연락처 형식을 확인해 주세요.');
  }
  if (!String(payload.email || '').trim()) {
    throw new Error('이메일을 입력해 주세요.');
  }
  if (!isAllowedEmailFormat_(String(payload.email || '').trim())) {
    throw new Error('이메일 형식을 확인해 주세요.');
  }
  if (!payload.privacyConsent) {
    throw new Error('개인정보 수집·이용 동의가 필요합니다.');
  }
  if (ALLOWED_COURSES.indexOf(normalizeCourseLabel_(payload.course)) === -1) {
    throw new Error('신청 가능한 과정만 선택해 주세요.');
  }
  if (payload.website) {
    throw new Error('잘못된 제출입니다. 다시 시도해 주세요.');
  }
  if (containsBlockedPattern_(payload.name) || containsBlockedPattern_(payload.message) || countUrls_(payload.message) > MAX_URL_COUNT) {
    throw new Error('입력 내용에 허용되지 않는 형식이 포함되어 있습니다. 링크나 특수 스크립트 없이 다시 입력해 주세요.');
  }
  if (TURNSTILE_SECRET_KEY && !payload.turnstileToken) {
    throw new Error('보안 확인이 누락되었습니다. 다시 시도해 주세요.');
  }
}

function sanitizePayload_(payload) {
  return {
    submissionId: sanitizeCellText_(payload.submissionId, 80),
    submittedAt: sanitizeTimestamp_(payload.submittedAt),
    sourcePage: sanitizeCellText_(payload.sourcePage, 500),
    name: sanitizeCellText_(payload.name, 80),
    phone: sanitizePhone_(payload.phone),
    email: sanitizeEmail_(payload.email),
    course: normalizeCourseLabel_(sanitizeCellText_(payload.course, 120)),
    message: sanitizeCellText_(payload.message, 2000),
    privacyConsent: !!payload.privacyConsent,
    website: sanitizeCellText_(payload.website, 200),
    turnstileToken: sanitizeTurnstileToken_(payload.turnstileToken),
  };
}

function normalizeCourseLabel_(course) {
  var value = String(course || '').trim();
  if (!value) return '';
  if (value === '2급') return '모래놀이심리상담사 2급';
  if (value === '1급') return '모래놀이심리상담사 1급';
  if (value === '기타') return '기타 문의';
  return value;
}

function sanitizeTimestamp_(value) {
  var raw = String(value || '').trim();
  if (!raw) return new Date().toISOString();
  var parsed = new Date(raw);
  if (isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}

function sanitizePhone_(value) {
  return formatPhoneForStorage_(normalizePhoneKey_(value));
}

function sanitizeEmail_(value) {
  return String(value || '').trim().toLowerCase().slice(0, 120);
}

function sanitizeCellText_(value, maxLength) {
  var text = String(value || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .trim();
  if (/^[=+\-@]/.test(text)) {
    text = "'" + text;
  }
  if (maxLength && text.length > maxLength) {
    text = text.slice(0, maxLength);
  }
  return text;
}

function sanitizeTurnstileToken_(value) {
  return String(value || '').trim().slice(0, 2048);
}

function formatPhoneForStorage_(digits) {
  var onlyDigits = String(digits || '').replace(/[^\d]/g, '').slice(0, 11);
  if (onlyDigits.length <= 3) return onlyDigits;
  if (onlyDigits.indexOf('02') === 0) {
    if (onlyDigits.length <= 5) return onlyDigits.slice(0, 2) + '-' + onlyDigits.slice(2);
    if (onlyDigits.length <= 9) return onlyDigits.slice(0, 2) + '-' + onlyDigits.slice(2, onlyDigits.length - 4) + '-' + onlyDigits.slice(-4);
    return onlyDigits.slice(0, 2) + '-' + onlyDigits.slice(2, 6) + '-' + onlyDigits.slice(6);
  }
  if (onlyDigits.length <= 7) return onlyDigits.slice(0, 3) + '-' + onlyDigits.slice(3);
  return onlyDigits.slice(0, 3) + '-' + onlyDigits.slice(3, onlyDigits.length - 4) + '-' + onlyDigits.slice(-4);
}

function isAllowedEmailFormat_(value) {
  var email = String(value || '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return false;
  }
  var parts = email.split('@');
  if (parts.length !== 2) return false;
  var localPart = parts[0];
  var domainPart = parts[1];
  if (!/^[a-z][a-z0-9._-]{1,31}$/.test(localPart)) {
    return false;
  }
  if (COMMON_EMAIL_DOMAINS.indexOf(domainPart) !== -1) {
    return true;
  }
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test(domainPart);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return getOrCreateSheet_(spreadsheet, SHEET_NAME);
}

function getOrCreateSheet_(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER_ROW);
  }
}

function ensureAdminView_(spreadsheet) {
  var adminSheet = getOrCreateSheet_(spreadsheet, ADMIN_SHEET_NAME);
  adminSheet.setFrozenRows(1);
  adminSheet.getRange(1, 1, 1, ADMIN_HEADER_ROW.length).setValues([ADMIN_HEADER_ROW]);
  adminSheet.getRange('A2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",Enrollments!A2:A))');
  adminSheet.getRange('B2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",Enrollments!B2:B))');
  adminSheet.getRange('C2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",Enrollments!C2:C))');
  adminSheet.getRange('D2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",Enrollments!D2:D))');
  adminSheet.getRange('E2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",Enrollments!E2:E))');
  adminSheet.getRange('F2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",Enrollments!F2:F))');
  adminSheet.getRange('G2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",IF(Enrollments!G2:G="2급","모래놀이심리상담사 2급",IF(Enrollments!G2:G="1급","모래놀이심리상담사 1급",Enrollments!G2:G))))');
  adminSheet.getRange('H2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",Enrollments!H2:H))');
  adminSheet.getRange('I2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",IF(Enrollments!I2:I="Y","동의",IF(Enrollments!I2:I="N","미동의",Enrollments!I2:I))))');
  adminSheet.getRange('J2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",IF(Enrollments!J2:J="gas","자동접수",IF(Enrollments!J2:J="manual","수동확인필요",Enrollments!J2:J))))');
  adminSheet.getRange('K2').setFormula('=ARRAYFORMULA(IF(Enrollments!A2:A="","",Enrollments!K2:K))');
}

function ensureSecurityLogSheet_(spreadsheet) {
  var logSheet = getOrCreateSheet_(spreadsheet, SECURITY_LOG_SHEET_NAME);
  logSheet.setFrozenRows(1);
  if (logSheet.getLastRow() === 0) {
    logSheet.appendRow(SECURITY_LOG_HEADER_ROW);
  }
}

function appendSubmission_(sheet, payload) {
  sheet.appendRow([
    payload.submittedAt || new Date().toISOString(),
    payload.submissionId || '',
    payload.sourcePage || '',
    payload.name || '',
    payload.phone || '',
    payload.email || '',
    normalizeCourseLabel_(payload.course),
    payload.message || '',
    payload.privacyConsent ? '동의' : '미동의',
    '자동접수',
    '',
  ]);
  return sheet.getLastRow();
}

function ensureNotDuplicate_(sheet, payload) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  var rows = sheet.getRange(2, 1, lastRow - 1, HEADER_ROW.length).getValues();
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - DUPLICATE_LOOKBACK_DAYS);
  var phoneKey = normalizePhoneKey_(payload.phone);
  var emailKey = sanitizeEmail_(payload.email);
  var courseKey = normalizeCourseLabel_(payload.course);

  for (var i = rows.length - 1; i >= 0; i -= 1) {
    var row = rows[i];
    var submittedAt = new Date(row[0]);
    if (!isNaN(submittedAt.getTime()) && submittedAt < cutoff) {
      break;
    }
    if (
      normalizePhoneKey_(row[4]) === phoneKey &&
      sanitizeEmail_(row[5]) === emailKey &&
      normalizeCourseLabel_(row[6]) === courseKey
    ) {
      throw new Error('이미 같은 이메일·연락처·과정으로 접수된 신청이 있습니다. 교육원에 기존 접수 상태를 확인해 주세요.');
    }
  }
}

function normalizePhoneKey_(value) {
  return String(value || '').replace(/[^\d]/g, '');
}

function containsBlockedPattern_(value) {
  return /<script|<\/script|javascript:|data:text\/html|onerror=|onload=|<iframe|<img/i.test(String(value || ''));
}

function countUrls_(value) {
  var matches = String(value || '').match(/https?:\/\/|www\./gi);
  return matches ? matches.length : 0;
}

function verifyTurnstile_(payload) {
  if (!TURNSTILE_SECRET_KEY) {
    return;
  }
  if (!payload.turnstileToken) {
    throw new Error('보안 확인이 누락되었습니다. 다시 시도해 주세요.');
  }

  var response = UrlFetchApp.fetch(TURNSTILE_VERIFY_URL, {
    method: 'post',
    payload: {
      secret: TURNSTILE_SECRET_KEY,
      response: payload.turnstileToken,
      idempotency_key: payload.submissionId || Utilities.getUuid(),
    },
    muteHttpExceptions: true,
  });

  var statusCode = response.getResponseCode();
  var bodyText = response.getContentText();
  var result;
  try {
    result = JSON.parse(bodyText || '{}');
  } catch (error) {
    throw new Error('보안 확인 검증 응답을 해석하지 못했습니다. 잠시 후 다시 시도해 주세요.');
  }

  if (statusCode < 200 || statusCode >= 300) {
    throw new Error('보안 확인 검증 서버 응답이 올바르지 않습니다. 잠시 후 다시 시도해 주세요.');
  }
  if (!result.success) {
    var errorCodes = Array.isArray(result['error-codes']) ? result['error-codes'].join(', ') : '';
    if (errorCodes.indexOf('timeout-or-duplicate') !== -1 || errorCodes.indexOf('invalid-input-response') !== -1) {
      throw new Error('보안 확인이 만료되었거나 이미 사용되었습니다. 다시 확인해 주세요.');
    }
    throw new Error('보안 확인 검증에 실패했습니다. 다시 시도해 주세요.');
  }
  if (TURNSTILE_EXPECTED_ACTION && result.action !== TURNSTILE_EXPECTED_ACTION) {
    throw new Error('보안 확인 동작이 일치하지 않습니다. 다시 시도해 주세요.');
  }
  if (TURNSTILE_EXPECTED_HOSTNAME && result.hostname !== TURNSTILE_EXPECTED_HOSTNAME) {
    throw new Error('보안 확인 도메인이 일치하지 않습니다. 다시 시도해 주세요.');
  }
}

function sendNotificationSafe_(payload, sheetUrl) {
  const recipient = NOTIFICATION_EMAIL || Session.getEffectiveUser().getEmail();
  if (!recipient) {
    return '';
  }

  const subject = `[이음통합평생교육원 접수] ${payload.name || '이름 미입력'} / ${payload.course || '과정 미입력'}`;
  const body = [
    '새 수강신청이 접수되었습니다.',
    '',
    `접수시각: ${payload.submittedAt || ''}`,
    `접수번호: ${payload.submissionId || ''}`,
    `이름: ${payload.name || ''}`,
    `연락처: ${payload.phone || ''}`,
    `이메일: ${payload.email || '미입력'}`,
    `과정: ${payload.course || ''}`,
    `문의 내용: ${payload.message || '미입력'}`,
    `개인정보 동의: ${payload.privacyConsent ? '동의' : '미동의'}`,
    `원본 페이지: ${payload.sourcePage || ''}`,
    '',
    `접수 시트: ${sheetUrl}`,
  ].join('\n');

  try {
    GmailApp.sendEmail(recipient, subject, body);
    return '';
  } catch (error) {
    return `알림 메일 실패: ${String(error && error.message || error)}`;
  }
}

function buildAuditPayload_(e) {
  try {
    return parsePayload_(e);
  } catch (error) {
    return {};
  }
}

function logSecurityEventSafe_(payload, eventType, reason) {
  try {
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var logSheet = getOrCreateSheet_(spreadsheet, SECURITY_LOG_SHEET_NAME);
    ensureSecurityLogSheet_(spreadsheet);
    logSheet.appendRow([
      new Date().toISOString(),
      eventType || '기타',
      sanitizeCellText_(reason, 500),
      sanitizeCellText_(payload && payload.submissionId, 80),
      sanitizeCellText_(payload && payload.sourcePage, 500),
      sanitizeCellText_(payload && payload.name, 80),
      sanitizePhone_(payload && payload.phone),
      sanitizeEmail_(payload && payload.email),
      normalizeCourseLabel_(sanitizeCellText_(payload && payload.course, 120)),
      '',
    ]);
  } catch (error) {
    // noop
  }
}

function jsonOutput_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
