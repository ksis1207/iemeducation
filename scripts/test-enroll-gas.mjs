const gasUrl = process.argv[2] || process.env.ENROLL_GAS_URL;

if (!gasUrl) {
  console.error('Usage: node scripts/test-enroll-gas.mjs <gas-url>');
  console.error('   or: ENROLL_GAS_URL=<gas-url> npm run test:enroll:gas');
  process.exit(1);
}

function makeBasePayload() {
  return {
    submissionId: `test-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    sourcePage: 'https://ieumedu.kr/test-negative',
    name: '홍길동',
    phone: '010-2345-6781',
    email: 'negativecase@gmail.com',
    course: '모래놀이심리상담사 2급',
    message: '음성 테스트 기본값',
    privacyConsent: true,
    website: '',
  };
}

async function postText(body) {
  const response = await fetch(gasUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body,
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error(`JSON parse failed: ${text}`);
  }
  return { status: response.status, data };
}

function buildCases() {
  const base = makeBasePayload();
  const cases = [
    {
      name: 'invalid-json',
      body: '{"broken":',
      expectError: '잘못된 요청 형식입니다.',
    },
    {
      name: 'english-name',
      body: JSON.stringify({ ...base, name: 'Hong' }),
      expectError: '이름은 한글만 입력해 주세요.',
    },
    {
      name: 'missing-email',
      body: JSON.stringify({ ...base, email: '' }),
      expectError: '이메일을 입력해 주세요.',
    },
    {
      name: 'invalid-email-local',
      body: JSON.stringify({ ...base, email: '1bad@gmail.com' }),
      expectError: '이메일 형식을 확인해 주세요.',
    },
    {
      name: 'missing-consent',
      body: JSON.stringify({ ...base, privacyConsent: false }),
      expectError: '개인정보 수집·이용 동의가 필요합니다.',
    },
    {
      name: 'honeypot',
      body: JSON.stringify({ ...base, website: 'https://spam.example' }),
      expectError: '잘못된 제출입니다. 다시 시도해 주세요.',
    },
    {
      name: 'script-pattern',
      body: JSON.stringify({ ...base, message: '<script>alert(1)</script>' }),
      expectError: '입력 내용에 허용되지 않는 형식이 포함되어 있습니다.',
    },
    {
      name: 'too-many-urls',
      body: JSON.stringify({
        ...base,
        message: 'https://a.example https://b.example https://c.example',
      }),
      expectError: '입력 내용에 허용되지 않는 형식이 포함되어 있습니다.',
    },
  ];

  if (
    process.env.DUPLICATE_EMAIL &&
    process.env.DUPLICATE_PHONE &&
    process.env.DUPLICATE_COURSE
  ) {
    cases.push({
      name: 'duplicate-submission',
      body: JSON.stringify({
        ...base,
        email: process.env.DUPLICATE_EMAIL,
        phone: process.env.DUPLICATE_PHONE,
        course: process.env.DUPLICATE_COURSE,
      }),
      expectError: '이미 같은 이메일·연락처·과정으로 접수된 신청이 있습니다.',
    });
  }

  return cases;
}

let failed = 0;
const cases = buildCases();

for (const testCase of cases) {
  try {
    const result = await postText(testCase.body);
    const ok = result.data && result.data.ok === false && String(result.data.error || '').includes(testCase.expectError);
    if (!ok) {
      failed += 1;
      console.error(`[FAIL] ${testCase.name}`);
      console.error(`  status: ${result.status}`);
      console.error(`  response: ${JSON.stringify(result.data)}`);
      continue;
    }
    console.log(`[PASS] ${testCase.name} -> ${result.data.error}`);
  } catch (error) {
    failed += 1;
    console.error(`[FAIL] ${testCase.name}`);
    console.error(`  error: ${error.message}`);
  }
}

if (failed) {
  console.error(`\n${failed} test(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${cases.length} negative test(s) passed.`);
