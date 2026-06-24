/* ── Shared UI helpers ── */
function SectionTitle({ sub, title, desc, tweaks, align = 'center' }) {
  return (
    <div style={{ textAlign: align, marginBottom: 48 }}>
      {sub && <div style={{ fontSize: 13, fontWeight: 600, color: tweaks.accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{sub}</div>}
      <h2 style={{ fontSize: 32, fontWeight: 700, color: tweaks.text, margin: 0, lineHeight: 1.3, fontFamily: tweaks.fontHeading }}>{title}</h2>
      {desc && <p style={{ fontSize: 16, color: tweaks.textMuted, marginTop: 12, maxWidth: 560, lineHeight: 1.7, ...(align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}) }}>{desc}</p>}
    </div>
  );
}

function Card({ children, tweaks, style = {}, hover = true }) {
  const ref = React.useRef();
  return (
    <div ref={ref} style={{ background: '#fff', borderRadius: 16, padding: 32, border: `1px solid ${tweaks.border}`, transition: 'all 0.25s', ...style }}
         onMouseEnter={e => { if (hover) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(92,64,51,0.08)'; }}}
         onMouseLeave={e => { if (hover) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}}>
      {children}
    </div>
  );
}

function Btn({ children, tweaks, variant = 'primary', onClick, style = {}, disabled = false, type = 'button' }) {
  const base = { padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.2s', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8 };
  const variants = {
    primary: { background: tweaks.primary, color: '#fff', ...base },
    secondary: { background: tweaks.primaryLight, color: tweaks.primary, ...base },
    outline: { background: 'transparent', color: tweaks.primary, border: `1.5px solid ${tweaks.primary}`, ...base },
  };
  return <button
    type={type}
    disabled={disabled}
    style={{ ...variants[variant], ...(disabled ? { opacity: 0.55, cursor: 'not-allowed' } : null), ...style }}
    onClick={disabled ? undefined : onClick}
    onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = 0.85; }}
    onMouseLeave={e => { e.currentTarget.style.opacity = disabled ? 0.55 : 1; }}
  >{children}</button>;
}

const STORAGE_KEYS = {
  enrollDraft: 'ieumedu_enroll_draft_v2',
  enrollPrefill: 'ieumedu_enroll_prefill_v2',
  enrollSubmissions: 'ieumedu_enroll_submissions_v2',
};

const STORAGE_TTLS = {
  enrollDraft: 1000 * 60 * 60 * 24,
  enrollPrefill: 1000 * 60 * 60 * 6,
  enrollSubmissions: 1000 * 60 * 60 * 24 * 35,
};

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.__storageEnvelope === 1) {
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        window.localStorage.removeItem(key);
        return fallback;
      }
      return parsed.data;
    }
    return parsed;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value, options = {}) {
  try {
    const expiresInMs = options.expiresInMs || 0;
    const payload = expiresInMs > 0
      ? {
          __storageEnvelope: 1,
          data: value,
          expiresAt: Date.now() + expiresInMs,
        }
      : value;
    window.localStorage.setItem(key, JSON.stringify(payload));
  } catch (error) {
    return false;
  }
  return true;
}

function formatDateLabel(dateText) {
  if (!dateText) return '';
  const [year, month, day] = dateText.split('-');
  if (!year || !month || !day) return dateText;
  return `${year}.${month}.${day}`;
}

function normalizePhoneLink(phone) {
  return String(phone || '').replace(/[^\d+]/g, '');
}

function normalizePhoneValue(phone) {
  return String(phone || '').replace(/[^\d]/g, '');
}

const EMAIL_DOMAIN_OPTIONS = [
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'daum.net', label: 'daum.net' },
  { value: 'direct', label: '직접입력' },
];

function sanitizeKoreanNameInput(value) {
  return String(value || '')
    .replace(/[^가-힣\s]/g, '')
    .replace(/\s{2,}/g, ' ')
    .slice(0, 20);
}

function formatPhoneInput(value) {
  const digits = normalizePhoneValue(value).slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.startsWith('02')) {
    if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length <= 9) return `${digits.slice(0, 2)}-${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, digits.length - 4)}-${digits.slice(-4)}`;
}

function normalizeEmailValue(email) {
  return String(email || '').trim().toLowerCase();
}

function sanitizeEmailLocalInput(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '')
    .slice(0, 32);
}

function sanitizeEmailDomainInput(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function splitEmailAddress(email) {
  const normalized = normalizeEmailValue(email);
  if (!normalized.includes('@')) {
    return { localPart: '', domainOption: 'gmail.com', customDomain: '' };
  }
  const [localPart, domainPart] = normalized.split('@');
  const matchedOption = EMAIL_DOMAIN_OPTIONS.find((item) => item.value === domainPart && item.value !== 'direct');
  return {
    localPart: sanitizeEmailLocalInput(localPart),
    domainOption: matchedOption ? matchedOption.value : 'direct',
    customDomain: matchedOption ? '' : sanitizeEmailDomainInput(domainPart),
  };
}

function buildEmailAddress(form) {
  const localPart = sanitizeEmailLocalInput(form.emailLocal);
  const domainPart = form.emailDomain === 'direct'
    ? sanitizeEmailDomainInput(form.emailCustomDomain)
    : sanitizeEmailDomainInput(form.emailDomain);
  if (!localPart || !domainPart) return '';
  return `${localPart}@${domainPart}`;
}

function buildEmptyEnrollForm() {
  return {
    name: '',
    phone: '',
    email: '',
    emailLocal: '',
    emailDomain: 'gmail.com',
    emailCustomDomain: '',
    course: '모래놀이심리상담사 2급',
    message: '',
    privacyConsent: false,
    website: '',
  };
}

function buildFormFromSavedData(savedData = {}) {
  const emptyForm = buildEmptyEnrollForm();
  const emailParts = splitEmailAddress(savedData?.email || '');
  return {
    ...emptyForm,
    ...savedData,
    name: sanitizeKoreanNameInput(savedData?.name || ''),
    phone: formatPhoneInput(savedData?.phone || ''),
    emailLocal: sanitizeEmailLocalInput(savedData?.emailLocal || emailParts.localPart),
    emailDomain: savedData?.emailDomain || emailParts.domainOption || emptyForm.emailDomain,
    emailCustomDomain: sanitizeEmailDomainInput(savedData?.emailCustomDomain || emailParts.customDomain),
    course: normalizeCourseLabel(savedData?.course || emptyForm.course),
    message: savedData?.message || '',
    email: '',
    website: '',
  };
}

function normalizeCourseLabel(course) {
  const value = String(course || '').trim();
  if (!value) return '모래놀이심리상담사 2급';
  if (value === '2급') return '모래놀이심리상담사 2급';
  if (value === '1급') return '모래놀이심리상담사 1급';
  if (value === '기타') return '기타 문의';
  return value;
}

function buildDuplicateKey(record) {
  return [
    normalizeEmailValue(record.email),
    normalizePhoneValue(record.phone),
    normalizeCourseLabel(record.course),
  ].join('|');
}

function pruneSubmissionHistory(records) {
  const cutoff = Date.now() - STORAGE_TTLS.enrollSubmissions;
  if (!Array.isArray(records)) return [];
  return records.filter((item) => {
    if (!item?.submittedAt) return false;
    const submittedTime = new Date(item.submittedAt).getTime();
    if (!submittedTime || submittedTime < cutoff) return false;
    return !!buildDuplicateKey(item);
  });
}

function buildEnrollSummary(record) {
  return [
    `이름: ${record.name}`,
    `연락처: ${record.phone}`,
    `이메일: ${record.email || '미입력'}`,
    `과정: ${record.course}`,
    `문의 내용: ${record.message || '미입력'}`,
    `개인정보 동의: ${record.privacyConsent ? '동의' : '미동의'}`,
    `접수번호: ${record.submissionId || '생성됨'}`,
    `접수시각: ${record.submittedAt || '미기록'}`,
  ].join('\n');
}

/* ── Gentle Hero Background ── */
function HeroBg({ tweaks }) {
  const canvasRef = React.useRef(null);
  const mouse = React.useRef({ x: 0.5, y: 0.5 });
  const raf = React.useRef(null);
  const particles = React.useRef([]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h;
    const resize = () => { w = canvas.width = canvas.parentElement.offsetWidth; h = canvas.height = canvas.parentElement.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    particles.current = Array.from({ length: 18 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      baseX: Math.random() * w, baseY: Math.random() * h,
      r: 30 + Math.random() * 120, speed: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2, drift: 0.2 + Math.random() * 0.4,
    }));

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / w;
      mouse.current.y = (e.clientY - rect.top) / h;
    };
    canvas.parentElement.addEventListener('mousemove', handleMove);

    const hex2rgb = (hex) => [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x, my = mouse.current.y;
      const colors = [tweaks.primary, tweaks.accent];
      particles.current.forEach((p, i) => {
        const fx = Math.sin(t * p.speed + p.phase) * 40 * p.drift;
        const fy = Math.cos(t * p.speed * 0.7 + p.phase) * 30 * p.drift;
        const px = (mx - 0.5) * 80 * p.speed, py = (my - 0.5) * 60 * p.speed;
        p.x += (p.baseX + fx + px - p.x) * 0.025;
        p.y += (p.baseY + fy + py - p.y) * 0.025;
        const [cr,cg,cb] = hex2rgb(colors[i % 2]);
        const alpha = 0.035 + 0.02 * Math.sin(t + p.phase);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`; ctx.fill();
      });
      const [gr,gg,gb] = hex2rgb(tweaks.primary);
      const gx = w * mx, gy = h * my;
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, 250);
      grad.addColorStop(0, `rgba(${gr},${gg},${gb},0.06)`);
      grad.addColorStop(1, `rgba(${gr},${gg},${gb},0)`);
      ctx.beginPath(); ctx.arc(gx, gy, 250, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('resize', resize); canvas.parentElement.removeEventListener('mousemove', handleMove); };
  }, [tweaks.primary, tweaks.accent]);

  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}/>;
}

/* ── HOME PAGE ── */
function HomePage({ setPage, tweaks }) {
  const heroStyle = {
    minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: `linear-gradient(165deg, ${tweaks.bgMain} 0%, ${tweaks.warmBg} 50%, ${tweaks.primaryLight} 100%)`,
    padding: '120px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden',
  };

  // 공지 배너에 쓸 최신 공지 (상위 2건 = 봄학기 2급·1급 모집)
  const bannerNotices = (window.NOTICES || []).filter(n => n.pinned).slice(0, 2);
  const [bannerIdx, setBannerIdx] = React.useState(0);
  React.useEffect(() => {
    if (bannerNotices.length < 2) return;
    const t = setInterval(() => setBannerIdx(i => (i + 1) % bannerNotices.length), 5000);
    return () => clearInterval(t);
  }, [bannerNotices.length]);
  const currentBanner = bannerNotices[bannerIdx];

  // 홈 하단 공지 목록 (최신 4건)
  const latestNotices = (window.NOTICES || []).slice(0, 4);

  return (
    <>
      <section style={heroStyle}>
        <HeroBg tweaks={tweaks}/>

        <div style={{ maxWidth: 720, position: 'relative', zIndex: 1 }}>
          <div style={{ display:'inline-block', padding:'6px 16px', borderRadius:20, background:'rgba(139,111,71,0.1)', fontSize:13, fontWeight:600, color:tweaks.primary, marginBottom:24 }}>
            평생교육원 · 민간자격 · 심리상담
          </div>
          <h1 className="hero-title" style={{ fontSize: tweaks.heroSize, fontWeight: 800, color: tweaks.text, lineHeight: 1.25, margin: 0, fontFamily: tweaks.fontHeading, letterSpacing: '-0.02em', textWrap: 'pretty' }}>
            마음을 잇는 교육,<br/>성장을 잇는 상담
          </h1>
          <p className="hero-description" style={{ fontSize: 18, color: tweaks.textMuted, marginTop: 20, lineHeight: 1.8, textWrap: 'pretty' }}>
            이음통합평생교육원은 모래놀이심리상담사 양성을 통해<br className="hide-mobile"/>
            아동·청소년·성인의 심리적 성장을 지원합니다.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn tweaks={tweaks} onClick={() => setPage('courses')}>교육과정 안내 →</Btn>
            <Btn tweaks={tweaks} variant="outline" onClick={() => setPage('enroll')}>수강신청 · 문의</Btn>
          </div>

          {/* 공지 배너 */}
          {currentBanner && (
            <button className="hero-notice-banner" onClick={() => setPage('notice')}
              style={{
                marginTop: 40, width: '100%', maxWidth: 620, padding: '14px 20px',
                borderRadius: 999, border: `1.5px solid ${tweaks.border}`, background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', textAlign: 'left',
                boxShadow: '0 4px 20px rgba(139,111,71,0.08)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <span style={{ padding: '4px 10px', borderRadius: 6, background: tweaks.primary, color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>공지</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: tweaks.text, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentBanner.title}
              </span>
              <span style={{ fontSize: 12, color: tweaks.textMuted, flexShrink: 0 }}>
                {bannerNotices.length > 1 && <>{bannerIdx + 1}/{bannerNotices.length} · </>}자세히 →
              </span>
            </button>
          )}
        </div>
      </section>

      {/* Info strip */}
      <section style={{ background: tweaks.primary, padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1 }}>
          {[
            { icon: '📍', label: '주소', value: '광주광역시 서구 회재로 859, 3층' },
            { icon: '☎', label: '전화', value: '062-655-4116' },
            { icon: '🕐', label: '운영', value: '평일 09:00 – 18:00' },
            { icon: '🌐', label: '웹사이트', value: 'ieumedu.or.kr' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '24px 28px', color: '#fff', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 퀵메뉴 */}
      <section style={{ padding: '64px 24px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: tweaks.accent, letterSpacing: '0.08em', marginBottom: 8 }}>QUICK MENU</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: tweaks.text, margin: 0, fontFamily: tweaks.fontHeading }}>자주 찾으시는 메뉴</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            {[
              { id: 'courses',       label: '교육과정',   desc: '2급 · 1급 커리큘럼', page: 'courses' },
              { id: 'enroll',        label: '수강신청',   desc: '온라인 · 전화',       page: 'enroll' },
              { id: 'notice',        label: '공지사항',   desc: '모집 · 일정 공지',    page: 'notice' },
              { id: 'faculty',       label: '교수진',     desc: '강사 소개',           page: 'faculty' },
              { id: 'location',      label: '오시는 길',  desc: '지도 · 주차 안내',    page: 'location' },
            ].map((q, i) => (
              <button key={q.id} onClick={() => setPage(q.page)}
                style={{
                  padding: '24px 16px', borderRadius: 16, background: '#fff', border: `1.5px solid ${tweaks.border}`,
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', textAlign: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = tweaks.primary; e.currentTarget.style.background = tweaks.primaryLight; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = tweaks.border; e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <QuickIcon id={q.id} tweaks={tweaks}/>
                <div style={{ fontSize: 15, fontWeight: 700, color: tweaks.text, marginTop: 12, fontFamily: tweaks.fontHeading }}>{q.label}</div>
                <div style={{ fontSize: 12, color: tweaks.textMuted, marginTop: 4 }}>{q.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '60px 24px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <SectionTitle sub="ABOUT" title="이음통합평생교육원" desc="모래놀이심리상담 전문 교육기관으로서 체계적인 이론 교육과 실습을 통해 전문 상담 인력을 양성합니다." tweaks={tweaks}/>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { title: '체계적 교육과정', desc: '발달심리, 상담이론, 모래놀이치료 등 단계별 커리큘럼을 운영합니다.', icon: '📚' },
              { title: '민간자격 발급', desc: '모래놀이심리상담사 2급·1급 자격 과정을 통해 전문성을 인증합니다.', icon: '🏅' },
              { title: '전문 상담 연계', desc: '이음심리연구상담센터와 연계하여 실질적인 상담 경험을 제공합니다.', icon: '🤝' },
            ].map((item, i) => (
              <Card key={i} tweaks={tweaks}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: tweaks.text, margin: '0 0 10px', fontFamily: tweaks.fontHeading }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: tweaks.textMuted, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course preview */}
      <section style={{ padding: '80px 24px', background: tweaks.bgMain }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <SectionTitle sub="COURSES" title="교육과정 안내" desc="기초부터 전문가 과정까지 체계적인 단계별 교육을 제공합니다." tweaks={tweaks}/>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { level: '2급', title: '모래놀이심리상담사 2급', hours: '총 60시간 · 연간 운영', desc: '상담 입문자·교사·부모 대상 / 교육비 50만 원', tag: '교육비 공개' },
              { level: '1급', title: '모래놀이심리상담사 1급', hours: '총 90시간 · 심화과정', desc: '2급 수료자·상담 경험자 대상 / 교육비 70만 원', tag: '교육비 공개' },
              { level: 'Info', title: '인가 절차 진행 중', hours: '개강 일정 · 모집 공고', desc: '수강료 공개 완료 · 개강일은 인가 승인 후 공지', tag: '진행중' },
            ].map((item, i) => (
              <Card key={i} tweaks={tweaks} style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position:'absolute', top:16, right:16, padding:'4px 12px', borderRadius:20, background: tweaks.primaryLight, color: tweaks.primary, fontSize:12, fontWeight:700 }}>{item.tag}</div>
                <div style={{ width:48, height:48, borderRadius:12, background:tweaks.primaryLight, display:'flex', alignItems:'center', justifyContent:'center', fontSize:item.level.length > 2 ? 13 : 16, fontWeight:800, color:tweaks.primary, marginBottom:20, fontFamily:tweaks.fontHeading }}>{item.level}</div>
                <h3 style={{ fontSize:18, fontWeight:700, color:tweaks.text, margin:'0 0 6px', fontFamily:tweaks.fontHeading }}>{item.title}</h3>
                <div style={{ fontSize:13, color:tweaks.accent, fontWeight:600, marginBottom:12 }}>{item.hours}</div>
                <p style={{ fontSize:14, color:tweaks.textMuted, lineHeight:1.7, margin:0 }}>{item.desc}</p>
              </Card>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Btn tweaks={tweaks} variant="secondary" onClick={() => setPage('courses')}>전체 과정 자세히 보기 →</Btn>
          </div>
        </div>
      </section>

      {/* 최신 공지 + 문의 (2-컬럼) */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)', gap: 40 }} className="home-notice-grid">
          {/* 최신 공지 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, borderBottom: `2px solid ${tweaks.text}`, paddingBottom: 12 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: tweaks.text, margin: 0, fontFamily: tweaks.fontHeading }}>최신 공지</h3>
              <button onClick={() => setPage('notice')} style={{ background: 'none', border: 'none', fontSize: 13, color: tweaks.textMuted, cursor: 'pointer', fontFamily: 'inherit' }}>전체보기 +</button>
            </div>
            <div style={{ display: 'grid', gap: 0 }}>
              {latestNotices.map((n, i) => (
                <button key={n.id} onClick={() => setPage('notice')}
                  style={{
                    display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: 16, alignItems: 'center',
                    padding: '16px 4px',
                    background: 'transparent', border: 'none', borderBottom: `1px solid ${tweaks.border}`,
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = tweaks.bgMain; e.currentTarget.style.paddingLeft = '12px'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '4px'; }}>
                  <span style={{ padding: '3px 10px', borderRadius: 4, background: tweaks.primaryLight, color: tweaks.primary, fontSize: 11, fontWeight: 700, justifySelf: 'start' }}>{n.category}</span>
                  <span style={{ fontSize: 14, fontWeight: n.pinned ? 700 : 500, color: tweaks.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {n.pinned && <span style={{ color: tweaks.primary, marginRight: 6 }}>●</span>}{n.title}
                  </span>
                  <span style={{ fontSize: 12, color: tweaks.textMuted }}>{n.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 문의 박스 */}
          <div>
            <div style={{ padding: 28, borderRadius: 16, background: tweaks.warmBg, border: `1px solid ${tweaks.border}`, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: tweaks.accent, letterSpacing: '0.08em', marginBottom: 6 }}>CONTACT</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: tweaks.text, margin: '0 0 10px', fontFamily: tweaks.fontHeading }}>교육 문의</h3>
              <p style={{ fontSize: 14, color: tweaks.textMuted, lineHeight: 1.7, margin: '0 0 20px' }}>
                수강 과정, 일정, 자격 등<br/>궁금한 점이 있으시면 언제든 연락 주세요.
              </p>
              <div style={{ padding: 16, borderRadius: 12, background: '#fff', marginBottom: 12, border: `1px solid ${tweaks.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: tweaks.textMuted, letterSpacing: '0.06em' }}>TEL</div>
                <a href="tel:062-655-4116" style={{ fontSize: 22, fontWeight: 800, color: tweaks.primary, textDecoration: 'none', fontFamily: tweaks.fontHeading, letterSpacing: '-0.01em' }}>062-655-4116</a>
                <div style={{ fontSize: 12, color: tweaks.textMuted, marginTop: 2 }}>평일 09:00 – 18:00 / 토 10:00 – 15:00</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                <Btn tweaks={tweaks} onClick={() => setPage('enroll')} style={{ flex: 1, justifyContent: 'center' }}>온라인 문의</Btn>
                <Btn tweaks={tweaks} variant="outline" onClick={() => setPage('location')} style={{ flex: 1, justifyContent: 'center' }}>오시는 길</Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 24px', background: tweaks.primary, textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', margin: '0 0 12px', fontFamily: tweaks.fontHeading }}>교육 상담 및 수강신청</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>궁금한 점이 있으시면 언제든 문의해 주세요.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn tweaks={tweaks} style={{ background: '#fff', color: tweaks.primary }} onClick={() => setPage('enroll')}>수강신청 바로가기</Btn>
            <Btn tweaks={tweaks} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)' }}
                 onClick={() => window.open('tel:062-655-4116')}>☎ 062-655-4116</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── 퀵메뉴 아이콘 ── */
function QuickIcon({ id, tweaks }) {
  const size = 28;
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: tweaks.primary, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const wrapStyle = { width: 52, height: 52, borderRadius: 14, background: tweaks.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' };
  const icons = {
    courses: <svg {...props}><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><path d="M8 7h8M8 11h6"/></svg>,
    enroll:  <svg {...props}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/></svg>,
    notice:  <svg {...props}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
    faculty: <svg {...props}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    verify:  <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    location:<svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  };
  return <div style={wrapStyle}>{icons[id]}</div>;
}


/* ── ENROLLMENT PAGE ── */
function EnrollPage({ tweaks, setPage }) {
  const content = window.SITE_CONTENT || {};
  const brand = content.brand || {};
  const contact = content.contact || {};
  const enroll = content.enroll || {};
  const initialDraft = React.useMemo(() => buildEmptyEnrollForm(), []);
  const restoredDraft = React.useMemo(() => readStorage(STORAGE_KEYS.enrollDraft, null), []);
  const prefill = readStorage(STORAGE_KEYS.enrollPrefill, null);
  const [form, setForm] = React.useState(() => buildFormFromSavedData(prefill || initialDraft));
  const [availableDraft, setAvailableDraft] = React.useState(() => (prefill ? null : restoredDraft));
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [draftSaved, setDraftSaved] = React.useState(false);
  const [receiptId, setReceiptId] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState(null);
  const [submitError, setSubmitError] = React.useState('');
  const [turnstileToken, setTurnstileToken] = React.useState('');
  const [turnstileMessage, setTurnstileMessage] = React.useState('');
  const [turnstileState, setTurnstileState] = React.useState('idle');
  const turnstileContainerRef = React.useRef(null);
  const turnstileWidgetRef = React.useRef(null);
  const normalizedPhone = normalizePhoneLink(contact.phone || '062-655-4116');
  const contactEmail = (contact.email || '').trim();
  const canEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
  const gasUrl = (enroll.gasUrl || '').trim();
  const turnstileSiteKey = String(enroll.turnstileSiteKey || '').trim();
  const turnstileAction = String(enroll.turnstileAction || 'enroll_form').trim() || 'enroll_form';
  const turnstileRequired = !!enroll.turnstileRequired;
  const turnstileEnabled = !!turnstileSiteKey;
  const turnstileEnforced = turnstileRequired || turnstileEnabled;
  const didInitDraftWrite = React.useRef(false);

  React.useEffect(() => {
    if (!didInitDraftWrite.current) {
      didInitDraftWrite.current = true;
      return;
    }
    writeStorage(STORAGE_KEYS.enrollDraft, form, { expiresInMs: STORAGE_TTLS.enrollDraft });
    setDraftSaved(true);
    const timer = window.setTimeout(() => setDraftSaved(false), 1200);
    return () => window.clearTimeout(timer);
  }, [form]);

  React.useEffect(() => {
    if (prefill) {
      window.localStorage.removeItem(STORAGE_KEYS.enrollPrefill);
    }
  }, []);

  const handleRestoreDraft = () => {
    if (!availableDraft) return;
    setForm(buildFormFromSavedData(availableDraft));
    setAvailableDraft(null);
    setSubmitError('');
    setErrors({});
  };

  const handleDiscardDraft = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEYS.enrollDraft);
    } catch (error) {
      // noop
    }
    setAvailableDraft(null);
  };

  React.useEffect(() => {
    if (!turnstileEnforced) {
      setTurnstileState('disabled');
      setTurnstileMessage('');
      setTurnstileToken('');
      return;
    }
    if (!turnstileEnabled) {
      setTurnstileState('missing-config');
      setTurnstileMessage('보안 확인 설정이 아직 완료되지 않았습니다. 전화 문의를 이용해 주세요.');
      setTurnstileToken('');
      return;
    }

    let cancelled = false;
    let pollTimer = null;
    setTurnstileState('loading');
    setTurnstileMessage('');

    const renderWidget = () => {
      if (cancelled) return;
      if (!turnstileContainerRef.current) {
        pollTimer = window.setTimeout(renderWidget, 300);
        return;
      }
      if (!window.turnstile || typeof window.turnstile.render !== 'function') {
        pollTimer = window.setTimeout(renderWidget, 300);
        return;
      }
      if (turnstileWidgetRef.current !== null) return;

      turnstileWidgetRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        action: turnstileAction,
        callback: (token) => {
          if (cancelled) return;
          setTurnstileToken(token || '');
          setTurnstileState('verified');
          setTurnstileMessage('');
        },
        'error-callback': (errorCode) => {
          if (cancelled) return true;
          setTurnstileToken('');
          setTurnstileState('error');
          setTurnstileMessage('보안 확인을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.');
          console.error('Turnstile error:', errorCode);
          return true;
        },
        'expired-callback': () => {
          if (cancelled) return;
          setTurnstileToken('');
          setTurnstileState('expired');
          setTurnstileMessage('보안 확인 시간이 지나 다시 확인이 필요합니다.');
        },
        'timeout-callback': () => {
          if (cancelled) return;
          setTurnstileToken('');
          setTurnstileState('expired');
          setTurnstileMessage('보안 확인 시간이 지나 다시 확인이 필요합니다.');
        },
      });
    };

    renderWidget();
    return () => {
      cancelled = true;
      if (pollTimer) window.clearTimeout(pollTimer);
      if (window.turnstile && turnstileWidgetRef.current !== null) {
        try {
          window.turnstile.remove(turnstileWidgetRef.current);
        } catch (error) {
          // noop
        }
      }
      turnstileWidgetRef.current = null;
    };
  }, [turnstileAction, turnstileEnabled, turnstileEnforced, turnstileSiteKey]);

  const inputStyle = {
    width:'100%', borderRadius:12, border:`1.5px solid ${tweaks.border}`,
    fontSize:15, fontFamily:'inherit', background:'#fff', outline:'none', transition:'border 0.2s',
    boxSizing:'border-box',
  };
  const singleLineFieldStyle = {
    ...inputStyle,
    height:52,
    padding:'0 16px',
    lineHeight:1.4,
  };
  const selectFieldStyle = {
    ...singleLineFieldStyle,
    cursor:'pointer',
  };
  const textAreaStyle = {
    ...inputStyle,
    minHeight:100,
    padding:'12px 16px',
    lineHeight:1.6,
    resize:'vertical',
  };

  const labelStyle = { fontSize:14, fontWeight:600, color:tweaks.text, marginBottom:6, display:'block' };

  const validateForm = () => {
    const nextErrors = {};
    const nameValue = sanitizeKoreanNameInput(form.name).trim();
    const phoneDigits = normalizePhoneValue(form.phone);
    const composedEmail = buildEmailAddress(form);
    if (!nameValue) {
      nextErrors.name = '이름을 입력해 주세요.';
    } else if (!/^[가-힣]+(?:\s[가-힣]+)*$/.test(nameValue)) {
      nextErrors.name = '이름은 한글만 입력해 주세요.';
    }
    if (!phoneDigits) {
      nextErrors.phone = '연락처를 입력해 주세요.';
    } else if (!/^\d{9,11}$/.test(phoneDigits)) {
      nextErrors.phone = '연락처 형식을 확인해 주세요.';
    }
    if (!sanitizeEmailLocalInput(form.emailLocal)) {
      nextErrors.email = '이메일을 입력해 주세요.';
    } else if (!/^[a-z][a-z0-9._-]{1,31}$/.test(sanitizeEmailLocalInput(form.emailLocal))) {
      nextErrors.email = '이메일 앞부분은 영문으로 시작해 영문·숫자·.-_만 사용할 수 있습니다.';
    } else if (form.emailDomain === 'direct' && !sanitizeEmailDomainInput(form.emailCustomDomain)) {
      nextErrors.email = '이메일 도메인을 입력해 주세요.';
    } else if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test((form.emailDomain === 'direct' ? sanitizeEmailDomainInput(form.emailCustomDomain) : form.emailDomain))) {
      nextErrors.email = '이메일 도메인 형식을 확인해 주세요.';
    } else if (!composedEmail) {
      nextErrors.email = '이메일 형식을 확인해 주세요.';
    }
    if (!form.privacyConsent) {
      nextErrors.privacyConsent = '개인정보 수집·이용에 동의해 주세요.';
    }
    if (turnstileEnforced) {
      if (!turnstileEnabled) {
        nextErrors.turnstile = '보안 확인 설정이 아직 완료되지 않았습니다. 전화 문의를 이용해 주세요.';
      } else if (!turnstileToken.trim()) {
        nextErrors.turnstile = '보안 확인을 완료해 주세요.';
      }
    }
    if (form.website.trim()) {
      nextErrors.website = '잘못된 제출입니다. 다시 시도해 주세요.';
    }
    return nextErrors;
  };

  const resetTurnstile = () => {
    setTurnstileToken('');
    if (!turnstileEnabled) return;
    if (window.turnstile && turnstileWidgetRef.current !== null) {
      try {
        window.turnstile.reset(turnstileWidgetRef.current);
      } catch (error) {
        // noop
      }
    }
    setTurnstileState('loading');
  };

  const handleCopySummary = async (summary) => {
    try {
      await navigator.clipboard.writeText(summary);
      window.alert('신청 내용을 클립보드에 복사했습니다.');
    } catch (error) {
      window.prompt('복사할 내용을 확인해 주세요.', summary);
    }
  };

  const submitToGas = async (payload) => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    let response;
    try {
      response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } finally {
      window.clearTimeout(timeout);
    }

    let responseText = '';
    try {
      responseText = await response.text();
    } catch (error) {
      responseText = '';
    }

    let responseJson = null;
    if (responseText) {
      try {
        responseJson = JSON.parse(responseText);
      } catch (error) {
        responseJson = null;
      }
    }

    const accepted = response.ok && (!responseJson || responseJson.ok !== false);
    return {
      accepted,
      responseJson,
    };
  };

  const handleSubmit = async (event) => {
    if (event?.preventDefault) event.preventDefault();
    setSubmitError('');
    const nextErrors = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (submitting) return;

    setSubmitting(true);
    const composedEmail = buildEmailAddress(form);
    const submissionId = `IEUM-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Date.now().toString().slice(-6)}`;
    const submissionRecord = {
      submissionId,
      submittedAt: new Date().toISOString(),
      sourcePage: `${window.location.origin}${window.location.pathname}#enroll`,
      name: sanitizeKoreanNameInput(form.name).trim(),
      phone: formatPhoneInput(form.phone),
      email: composedEmail,
      course: normalizeCourseLabel(form.course),
      message: form.message.trim(),
      privacyConsent: form.privacyConsent,
      turnstileToken: turnstileToken.trim(),
    };
    const duplicateKey = buildDuplicateKey(submissionRecord);
    const previousSubmissions = pruneSubmissionHistory(readStorage(STORAGE_KEYS.enrollSubmissions, []));
    const localDuplicate = previousSubmissions.find((item) => {
      if (!item?.submittedAt) return false;
      const submittedTime = new Date(item.submittedAt).getTime();
      if (!submittedTime) return false;
      const withinCooldown = Date.now() - submittedTime < 10 * 60 * 1000;
      return withinCooldown && buildDuplicateKey(item) === duplicateKey;
    });
    if (localDuplicate) {
      setSubmitError('방금 같은 이메일·연락처·과정으로 신청한 기록이 있습니다. 메일함 또는 교육원 안내를 먼저 확인해 주세요.');
      setSubmitting(false);
      return;
    }
    let deliveryStatus = 'manual';
    let failureReason = '';

    if (gasUrl) {
      try {
        const result = await submitToGas(submissionRecord);
        if (result.accepted) {
          deliveryStatus = 'gas';
        } else if (result.responseJson?.error) {
          setSubmitError(result.responseJson.error);
          resetTurnstile();
          setSubmitting(false);
          return;
        } else {
          failureReason = '자동 전송 응답을 확인하지 못했습니다.';
        }
      } catch (error) {
        failureReason = error?.name === 'AbortError'
          ? '접수 서버 응답이 지연되어 자동 전송을 끝까지 확인하지 못했습니다.'
          : (error?.message || '자동 전송 요청 중 오류가 발생했습니다.');
      }
    } else {
      failureReason = '운영용 접수 URL이 아직 설정되지 않았습니다.';
    }

    const history = pruneSubmissionHistory(readStorage(STORAGE_KEYS.enrollSubmissions, []));
    const summaryRecord = {
      ...submissionRecord,
      deliveryStatus,
      failureReason,
    };
    const savedRecord = {
      submissionId,
      submittedAt: submissionRecord.submittedAt,
      email: submissionRecord.email,
      phone: submissionRecord.phone,
      course: submissionRecord.course,
      deliveryStatus,
    };
    writeStorage(STORAGE_KEYS.enrollSubmissions, [savedRecord, ...history].slice(0, 30), { expiresInMs: STORAGE_TTLS.enrollSubmissions });
    try {
      window.localStorage.removeItem(STORAGE_KEYS.enrollDraft);
    } catch (error) {
      // noop
    }
    setAvailableDraft(null);

    setReceiptId(submissionId);
    setSubmitResult({
      mode: deliveryStatus === 'gas' ? 'sent' : 'fallback',
      reason: failureReason,
      summary: buildEnrollSummary(summaryRecord),
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    const isFallback = submitResult?.mode === 'fallback';
    const summary = submitResult?.summary || buildEnrollSummary({
      submissionId: receiptId,
      submittedAt: new Date().toISOString(),
      name: form.name,
      phone: form.phone,
      email: buildEmailAddress(form),
      course: normalizeCourseLabel(form.course),
      message: form.message,
      privacyConsent: form.privacyConsent,
    });
    const smsHref = normalizedPhone ? `sms:${normalizedPhone}?body=${encodeURIComponent(summary)}` : '';
    const mailHref = canEmail ? `mailto:${contactEmail}?subject=${encodeURIComponent(`[${brand.name || '이음통합평생교육원'}] 수강신청 문의`)}&body=${encodeURIComponent(summary)}` : '';
    return (
      <div style={{ paddingTop: 72 }}>
        <section style={{ padding:'120px 24px', textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:20 }}>✓</div>
          <h2 style={{ fontSize:28, fontWeight:700, color:tweaks.text, fontFamily:tweaks.fontHeading }}>
            {isFallback ? (enroll.fallbackTitle || '신청 내용은 작성되었지만 자동 접수는 완료되지 않았습니다') : (enroll.successTitle || '신청이 접수되었습니다')}
          </h2>
          <p style={{ fontSize:16, color:tweaks.textMuted, marginTop:12 }}>
            {isFallback ? (enroll.fallbackDesc || '아래 버튼으로 신청 내용을 복사하거나 문자·이메일로 전달해 주세요.') : (enroll.successDesc || '담당자가 확인 후 연락드리겠습니다.')}
          </p>
          <div style={{ marginTop: 14, fontSize: 14, color: tweaks.text }}>
            접수번호: <strong>{receiptId || '생성됨'}</strong>
          </div>
          {isFallback ? (
            <div style={{ marginTop: 12, fontSize: 13, color: tweaks.textMuted, lineHeight: 1.8 }}>
              자동 전송 실패 사유: {submitResult?.reason || '확인되지 않음'}
            </div>
          ) : (
            <div style={{ marginTop: 12, fontSize: 13, color: tweaks.textMuted, lineHeight: 1.8 }}>
              접수 내용이 운영 시트로 전달되었습니다. 담당자가 확인 후 연락드리겠습니다.
            </div>
          )}
          <div style={{ marginTop: 28, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn tweaks={tweaks} variant="secondary" onClick={() => handleCopySummary(summary)}>신청 내용 복사</Btn>
            {isFallback && normalizedPhone && <Btn tweaks={tweaks} variant="outline" onClick={() => window.open(smsHref, '_self')}>문자 보내기</Btn>}
            {isFallback && canEmail && <Btn tweaks={tweaks} variant="outline" onClick={() => window.open(mailHref, '_self')}>이메일 보내기</Btn>}
            <Btn tweaks={tweaks} variant="outline" onClick={() => window.open(`tel:${normalizedPhone || '0626554116'}`)}>전화 문의</Btn>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 0 60px' }}>
          <SectionTitle sub="ENROLLMENT" title="수강신청 · 문의" desc="아래 양식을 작성하시거나 전화로 문의해 주세요." tweaks={tweaks}/>
        </div>
      </section>

      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 40 }}>
          {/* Form */}
          <div>
            <div style={{ fontSize: 13, color: draftSaved ? tweaks.primary : tweaks.textMuted, marginBottom: 16 }}>
              {draftSaved ? '임시저장되었습니다.' : (availableDraft ? '이 브라우저에 이전 임시작성 내용이 남아 있습니다.' : '작성 내용은 이 브라우저에 제한적으로 임시저장됩니다.')}
            </div>
            {availableDraft && (
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
                <Btn tweaks={tweaks} variant="secondary" onClick={handleRestoreDraft} style={{ padding:'10px 16px', fontSize:14 }}>
                  이전 임시작성 복원
                </Btn>
                <Btn tweaks={tweaks} variant="outline" onClick={handleDiscardDraft} style={{ padding:'10px 16px', fontSize:14 }}>
                  저장된 내용 지우기
                </Btn>
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ display:'grid', gap:20 }}>
              {submitError && (
                <div style={{ padding: '14px 16px', borderRadius: 12, background: '#FFF4F4', border: '1px solid #F0C7C7', color: '#8B1E1E', fontSize: 14, lineHeight: 1.7 }}>
                  {submitError}
                </div>
              )}
              <div>
                <label style={labelStyle}>이름 *</label>
                <input style={singleLineFieldStyle} value={form.name} onChange={e => setForm({...form, name: sanitizeKoreanNameInput(e.target.value)})} placeholder="홍길동" autoComplete="name"
                  onFocus={e => e.target.style.borderColor = tweaks.primary}
                  onBlur={e => e.target.style.borderColor = tweaks.border}/>
                <div style={{ fontSize: 12, color: tweaks.textMuted, marginTop: 6 }}>이름은 한글만 입력합니다.</div>
                {errors.name && <div style={{ fontSize: 13, color: '#C62828', marginTop: 6 }}>{errors.name}</div>}
              </div>
              <div>
                <label style={labelStyle}>연락처 *</label>
                <input style={singleLineFieldStyle} value={form.phone} onChange={e => setForm({...form, phone: formatPhoneInput(e.target.value)})} placeholder="010-1234-5678" autoComplete="tel" inputMode="numeric"
                  onFocus={e => e.target.style.borderColor = tweaks.primary}
                  onBlur={e => e.target.style.borderColor = tweaks.border}/>
                <div style={{ fontSize: 12, color: tweaks.textMuted, marginTop: 6 }}>숫자만 입력하면 자동으로 연락처 형식에 맞춰 표시됩니다.</div>
                {errors.phone && <div style={{ fontSize: 13, color: '#C62828', marginTop: 6 }}>{errors.phone}</div>}
              </div>
              <div>
                <label style={labelStyle}>이메일 *</label>
                <div style={{ display:'grid', gap:10 }}>
                  <div style={{ display:'grid', gridTemplateColumns:'minmax(0, 1fr) 24px minmax(112px, 148px)', gap:8, alignItems:'center' }}>
                    <input
                      style={singleLineFieldStyle}
                      type="text"
                      value={form.emailLocal}
                      onChange={e => setForm({ ...form, emailLocal: sanitizeEmailLocalInput(e.target.value) })}
                      placeholder="example"
                      autoComplete="email"
                      inputMode="email"
                      onFocus={e => e.target.style.borderColor = tweaks.primary}
                      onBlur={e => e.target.style.borderColor = tweaks.border}
                    />
                    <div style={{ fontSize: 18, fontWeight: 700, color: tweaks.text, textAlign: 'center' }}>@</div>
                    <select
                      style={selectFieldStyle}
                      value={form.emailDomain}
                      onChange={e => setForm({ ...form, emailDomain: e.target.value, emailCustomDomain: e.target.value === 'direct' ? form.emailCustomDomain : '' })}
                    >
                      {EMAIL_DOMAIN_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  {form.emailDomain === 'direct' && (
                    <input
                      style={singleLineFieldStyle}
                      type="text"
                      value={form.emailCustomDomain}
                      onChange={e => setForm({ ...form, emailCustomDomain: sanitizeEmailDomainInput(e.target.value) })}
                      placeholder="example.com"
                      inputMode="email"
                      onFocus={e => e.target.style.borderColor = tweaks.primary}
                      onBlur={e => e.target.style.borderColor = tweaks.border}
                    />
                  )}
                </div>
                <div style={{ fontSize: 12, color: tweaks.textMuted, marginTop: 6 }}>이메일 앞부분은 영문으로 시작하며 영문·숫자·.-_만 사용할 수 있습니다.</div>
                {errors.email && <div style={{ fontSize: 13, color: '#C62828', marginTop: 6 }}>{errors.email}</div>}
              </div>
              <div style={{ position:'absolute', left:'-9999px', width:1, height:1, overflow:'hidden' }} aria-hidden="true">
                <label>웹사이트</label>
                <input tabIndex="-1" autoComplete="off" value={form.website} onChange={e => setForm({...form, website: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>과정 선택 *</label>
                <select style={selectFieldStyle} value={normalizeCourseLabel(form.course)} onChange={e => setForm({...form, course: e.target.value})}>
                  <option value="모래놀이심리상담사 2급">모래놀이심리상담사 2급</option>
                  <option value="모래놀이심리상담사 1급">모래놀이심리상담사 1급</option>
                  <option value="기타 문의">기타 문의</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>문의 내용</label>
                <textarea style={textAreaStyle} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="궁금한 점을 적어주세요."
                  onFocus={e => e.target.style.borderColor = tweaks.primary}
                  onBlur={e => e.target.style.borderColor = tweaks.border}/>
              </div>
              <div style={{ padding: 16, borderRadius: 12, background: tweaks.bgMain, border: `1px solid ${tweaks.border}` }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: tweaks.text, lineHeight: 1.8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={!!form.privacyConsent}
                    onChange={e => setForm({ ...form, privacyConsent: e.target.checked })}
                    style={{ marginTop: 3 }}
                  />
                  <span>
                    이름, 연락처, 이메일, 문의 내용을 상담 및 수강 안내 목적으로 수집·이용하는 데 동의합니다.
                  </span>
                </label>
                <div style={{ fontSize: 13, color: tweaks.textMuted, marginTop: 8, lineHeight: 1.7 }}>
                  상세 기준은 개인정보처리방침에서 확인할 수 있습니다.
                  <button
                    type="button"
                    onClick={() => setPage('privacy')}
                    style={{ marginLeft: 8, background: 'none', border: 'none', padding: 0, color: tweaks.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    바로가기
                  </button>
                </div>
                {errors.privacyConsent && <div style={{ fontSize: 13, color: '#C62828', marginTop: 8 }}>{errors.privacyConsent}</div>}
              </div>
              {turnstileEnforced && (
                <div style={{ padding: 16, borderRadius: 12, background: '#fff', border: `1px solid ${tweaks.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: tweaks.text, marginBottom: 10 }}>보안 확인 *</div>
                  {turnstileEnabled ? (
                    <div ref={turnstileContainerRef}></div>
                  ) : null}
                  <div style={{ fontSize: 12, color: turnstileMessage || errors.turnstile ? '#8B1E1E' : tweaks.textMuted, marginTop: 10, lineHeight: 1.7 }}>
                    {errors.turnstile || turnstileMessage || (turnstileState === 'verified' ? '보안 확인이 완료되었습니다.' : '신청 전 자동화 공격 차단을 위한 보안 확인이 필요합니다.')}
                  </div>
                </div>
              )}
              <Btn tweaks={tweaks} type="submit" disabled={submitting} style={{ width:'100%', justifyContent:'center' }}>
                {submitting ? '제출 중입니다...' : '신청서 제출하기'}
              </Btn>
              <div style={{ fontSize: 12, color: tweaks.textMuted, lineHeight: 1.7 }}>
                같은 이메일·연락처·과정 조합은 일정 기간 중복 접수가 제한됩니다.
              </div>
            </form>
          </div>

          {/* Contact info */}
          <div>
            <Card tweaks={tweaks} hover={false} style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize:16, fontWeight:700, color:tweaks.text, margin:'0 0 16px', fontFamily:tweaks.fontHeading }}>직접 문의</h4>
              <div style={{ display:'grid', gap:14, fontSize:15, color:tweaks.textMuted }}>
                <div><strong style={{ color:tweaks.text }}>전화</strong><br/>{contact.phone || '062-655-4116'}</div>
                <div><strong style={{ color:tweaks.text }}>주소</strong><br/>{contact.address || '광주광역시 서구 회재로 859, 3층'}<br/>{brand.name || '이음통합평생교육원'}</div>
                <div><strong style={{ color:tweaks.text }}>운영시간</strong><br/>{contact.hours || '평일 09:00 - 18:00'}</div>
              </div>
            </Card>
            <Card tweaks={tweaks} hover={false}>
              <h4 style={{ fontSize:16, fontWeight:700, color:tweaks.text, margin:'0 0 12px', fontFamily:tweaks.fontHeading }}>관련 링크</h4>
              <div style={{ display:'grid', gap:10, fontSize:14 }}>
                {(enroll.links || []).map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener" style={{ color:tweaks.primary, textDecoration:'none' }}>{link.label} →</a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── CERTIFICATION INFO / FAQ ── */
function CertificationPage({ tweaks }) {
  const [openIdx, setOpenIdx] = React.useState(null);

  const faqs = [
    { q: '모래놀이심리상담사 자격은 국가공인인가요?', a: '본 자격은 민간자격으로, 국가공인 자격이 아닙니다. 다만 한국직업능력연구원에 등록된 정식 민간자격입니다.' },
    { q: '자격 취득 후 어떤 활동이 가능한가요?', a: '아동·청소년·성인 대상 심리상담, 교육기관 상담사, 사설 상담센터 운영, 평생교육 강사 등의 활동이 가능합니다.' },
    { q: '수강 자격 조건이 있나요?', a: '2급 과정은 심리상담 및 교육에 관심 있는 분이면 누구나 수강 가능합니다. 1급 과정은 2급 자격 취득자에 한합니다.' },
    { q: '교육비는 어떻게 되나요?', a: '연간 교육계획안 기준으로 2급 50만 원, 1급 70만 원입니다. (실습·평가비 포함 / 교재·자격증비 별도)' },
    { q: '온라인 수강이 가능한가요?', a: '과정별로 온라인/오프라인 병행 운영 여부가 다릅니다. 상세 내용은 문의해 주세요.' },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 0 60px' }}>
          <SectionTitle sub="CERTIFICATION" title="민간자격 안내" desc="모래놀이심리상담사 민간자격에 대한 안내입니다." tweaks={tweaks}/>
        </div>
      </section>

      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Card tweaks={tweaks} hover={false} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize:18, fontWeight:700, color:tweaks.text, margin:'0 0 20px', fontFamily:tweaks.fontHeading }}>자격 정보</h3>
            <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'12px 24px', fontSize:15, lineHeight:1.8 }}>
              {[
                ['자격명', '모래놀이심리상담사 2급 / 1급'],
                ['발급기관', '대한심리통합연구회'],
                ['등록기관', '한국직업능력연구원'],
                ['교육기관', '이음통합평생교육원'],
                ['자격 유형', '민간자격 (비공인)'],
              ].map(([k, v], i) => (
                <React.Fragment key={i}>
                  <div style={{ fontWeight:600, color:tweaks.primary, whiteSpace:'nowrap' }}>{k}</div>
                  <div style={{ color:tweaks.text }}>{v}</div>
                </React.Fragment>
              ))}
            </div>
          </Card>

          <Card tweaks={tweaks} hover={false} style={{ marginBottom: 32, background: tweaks.bgMain }}>
            <p style={{ fontSize:13, color:tweaks.textMuted, lineHeight:1.8, margin:0 }}>
              ※ 본 자격은 민간자격으로 국가공인 자격이 아닙니다.<br/>
              ※ 민간자격 등록 및 공인 제도에 관한 사항은 한국직업능력연구원 민간자격정보서비스(www.pqi.or.kr)에서 확인하실 수 있습니다.<br/>
              ※ 본 자격은 의료행위를 포함하지 않습니다.
            </p>
          </Card>

          <h3 style={{ fontSize:22, fontWeight:700, color:tweaks.text, margin:'48px 0 24px', fontFamily:tweaks.fontHeading }}>자주 묻는 질문</h3>
          <div style={{ display:'grid', gap:8 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderRadius:12, border:`1px solid ${tweaks.border}`, overflow:'hidden' }}>
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  style={{ width:'100%', padding:'18px 20px', background: openIdx === i ? tweaks.bgMain : '#fff', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:15, fontWeight:600, color:tweaks.text, fontFamily:'inherit', textAlign:'left', gap:12 }}>
                  {faq.q}
                  <span style={{ transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0)', transition:'transform 0.2s', flexShrink:0, fontSize:12, color:tweaks.textMuted }}>▼</span>
                </button>
                {openIdx === i && (
                  <div style={{ padding:'0 20px 18px', fontSize:14, color:tweaks.textMuted, lineHeight:1.8, background:tweaks.bgMain }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── VERIFICATION PAGE ── */
function VerifyPage({ tweaks }) {
  const [certNum, setCertNum] = React.useState('');
  const [result, setResult] = React.useState(null);

  const handleSearch = () => {
    if (certNum.trim()) {
      setResult({
        name: '홍길동',
        birth: '2000.00.00',
        certNo: certNum || '2026-02-2-0001',
        level: '모래놀이심리상담사 2급',
        issueDate: '2026년 2월 23일',
        issuer: '대한심리통합연구회',
        valid: true,
      });
    }
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 0 60px' }}>
          <SectionTitle sub="VERIFY" title="자격인증 조회" desc="발급된 자격증의 진위 여부를 확인할 수 있습니다." tweaks={tweaks}/>
        </div>
      </section>

      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <Card tweaks={tweaks} hover={false}>
            <label style={{ fontSize:14, fontWeight:600, color:tweaks.text, marginBottom:8, display:'block' }}>자격번호 입력</label>
            <div style={{ display:'flex', gap:8 }}>
              <input
                style={{ flex:1, padding:'14px 16px', borderRadius:12, border:`1.5px solid ${tweaks.border}`, fontSize:15, fontFamily:'inherit', outline:'none', boxSizing:'border-box' }}
                placeholder="예: 2026-02-2-0001"
                value={certNum}
                onChange={e => setCertNum(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                onFocus={e => e.target.style.borderColor = tweaks.primary}
                onBlur={e => e.target.style.borderColor = tweaks.border}
              />
              <Btn tweaks={tweaks} onClick={handleSearch}>조회</Btn>
            </div>
          </Card>

          {result && (
            <Card tweaks={tweaks} hover={false} style={{ marginTop: 20, border: `2px solid ${result.valid ? '#4CAF50' : '#f44336'}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background: result.valid ? '#E8F5E9' : '#FFEBEE', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                  {result.valid ? '✓' : '✗'}
                </div>
                <div>
                  <div style={{ fontWeight:700, color: result.valid ? '#2E7D32' : '#C62828', fontSize:16 }}>
                    {result.valid ? '유효한 자격입니다' : '확인되지 않는 자격번호입니다'}
                  </div>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'10px 20px', fontSize:14, lineHeight:1.8 }}>
                {[
                  ['자격명', result.level],
                  ['성명', result.name],
                  ['생년월일', result.birth],
                  ['자격번호', result.certNo],
                  ['발급일', result.issueDate],
                  ['발급기관', result.issuer],
                ].map(([k,v], i) => (
                  <React.Fragment key={i}>
                    <div style={{ fontWeight:600, color:tweaks.textMuted }}>{k}</div>
                    <div style={{ color:tweaks.text }}>{v}</div>
                  </React.Fragment>
                ))}
              </div>
              <div style={{ marginTop:16, padding:12, borderRadius:8, background:tweaks.bgMain, fontSize:12, color:tweaks.textMuted, lineHeight:1.7 }}>
                ※ 본 자격은 민간자격으로 국가공인 자격이 아닙니다.<br/>※ 의료행위를 포함하지 않습니다.
              </div>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

/* ── FOOTER ── */
function SiteFooter({ tweaks }) {
  return (
    <footer style={{ background: tweaks.text, padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:32, marginBottom:32 }}>
          <div>
            <div style={{ fontWeight:700, color:'#fff', fontSize:16, marginBottom:12, fontFamily:tweaks.fontHeading }}>이음통합평생교육원</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:2 }}>
              대표: 선애순<br/>
              사업자등록번호: 296-05-03812<br/>
              광주광역시 서구 회재로 859, 3층<br/>
              ☎ 062-655-4116
            </div>
          </div>
          <div>
            <div style={{ fontWeight:700, color:'#fff', fontSize:14, marginBottom:12 }}>연계 기관</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:2 }}>
              이음심리연구상담센터<br/>
              대한심리통합연구회
            </div>
          </div>
          <div>
            <div style={{ fontWeight:700, color:'#fff', fontSize:14, marginBottom:12 }}>외부 링크</div>
            <div style={{ fontSize:13, lineHeight:2 }}>
              <a href="https://news.ieumedu.kr" target="_blank" rel="noopener" style={{ color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>이음교육저널 →</a><br/>
              <a href="https://think-sis.co.kr" target="_blank" rel="noopener" style={{ color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>블로그 →</a><br/>
              <a href="https://brunch.co.kr/@205593d149c84b6" target="_blank" rel="noopener" style={{ color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>브런치북 →</a><br/>
              <a href="https://www.pqi.or.kr" target="_blank" rel="noopener" style={{ color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>민간자격정보서비스 →</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:20, fontSize:12, color:'rgba(255,255,255,0.5)', textAlign:'center', lineHeight:1.8 }}>
          <div style={{ marginBottom:8, color:'rgba(255,255,255,0.65)' }}>
            ※ 본 교육원은 현재 <strong style={{ color:'rgba(255,255,255,0.85)' }}>광주광역시 서구청에 평생교육시설 등록 · 인가 절차</strong>를 진행하고 있습니다.
            &nbsp;수강료는 공개되었으며 개강 일정은 인가 승인 후 공지됩니다.
          </div>
          <div style={{ color:'rgba(255,255,255,0.35)' }}>© 2026 이음통합평생교육원. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

window.SectionTitle = SectionTitle;
window.Card = Card;
window.Btn = Btn;
window.HomePage = HomePage;
window.EnrollPage = EnrollPage;
window.CertificationPage = CertificationPage;
window.VerifyPage = VerifyPage;
window.SiteFooter = SiteFooter;
