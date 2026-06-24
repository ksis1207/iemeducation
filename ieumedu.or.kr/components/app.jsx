const TWEAK_DEFAULTS = window.TWEAK_DEFAULTS || {
  theme: 'warm',
  fontStyle: 'sans',
  heroSize: 48,
};

const THEMES = {
  warm: {
    primary: '#8B6F47', accent: '#C4956A', primaryLight: 'rgba(139,111,71,0.08)',
    bgMain: '#FAF6F0', warmBg: '#F5EDE3', text: '#2C1810', textMuted: '#7A6B5D',
    border: 'rgba(139,111,71,0.12)',
  },
  olive: {
    primary: '#5E7352', accent: '#8FA67A', primaryLight: 'rgba(94,115,82,0.08)',
    bgMain: '#F6F8F4', warmBg: '#EDF2E8', text: '#1E2A18', textMuted: '#5E6B56',
    border: 'rgba(94,115,82,0.12)',
  },
  navy: {
    primary: '#4A5E7A', accent: '#7B95B8', primaryLight: 'rgba(74,94,122,0.08)',
    bgMain: '#F5F7FA', warmBg: '#EBF0F5', text: '#1A2332', textMuted: '#5A6A7E',
    border: 'rgba(74,94,122,0.12)',
  },
};

const FONT_STYLES = {
  sans: { fontHeading: "'Noto Sans KR', sans-serif" },
  serif: { fontHeading: "'Noto Serif KR', serif" },
};

const PAGE_META = {
  home: {
    title: '이음통합평생교육원 – 모래놀이심리상담사 교육',
    description: '이음통합평생교육원은 모래놀이심리상담사 교육과 평생학습 기반 심리상담 과정을 운영하는 교육기관입니다.',
  },
  greeting: {
    title: '원장 인사말 – 이음통합평생교육원',
    description: '이음통합평생교육원 원장 인사말과 교육 철학을 확인하실 수 있습니다.',
  },
  mission: {
    title: '설립목적 및 교육철학 – 이음통합평생교육원',
    description: '이음통합평생교육원이 추구하는 설립목적과 교육철학을 안내합니다.',
  },
  history: {
    title: '연혁 – 이음통합평생교육원',
    description: '이음통합평생교육원의 설립 및 운영 연혁을 확인하실 수 있습니다.',
  },
  institution: {
    title: '기관정보 – 이음통합평생교육원',
    description: '기관 운영 정보와 기본 행정 정보를 안내합니다.',
  },
  instructors: {
    title: '강사진 – 이음통합평생교육원',
    description: '이음통합평생교육원의 강사진과 전문 분야를 안내합니다.',
  },
  faculty: {
    title: '강사진 소개 – 이음통합평생교육원',
    description: '이음통합평생교육원의 전문 강사진과 원장 프로필을 안내합니다.',
  },
  location: {
    title: '오시는 길 – 이음통합평생교육원',
    description: '이음통합평생교육원 위치, 약도, 길찾기 정보를 확인하실 수 있습니다.',
  },
  courses: {
    title: '교육과정 – 이음통합평생교육원',
    description: '모래놀이심리상담사 과정과 세부 교육과정을 안내합니다.',
  },
  schedule: {
    title: '교육일정 – 이음통합평생교육원',
    description: '교육 일정과 자격시험 관련 안내를 확인하실 수 있습니다.',
  },
  refund: {
    title: '학습비 반환 안내 – 이음통합평생교육원',
    description: '학습비 반환 기준과 환불 절차를 안내합니다.',
  },
  enroll: {
    title: '수강신청 · 문의 – 이음통합평생교육원',
    description: '수강신청과 교육 상담 문의를 접수하실 수 있습니다.',
  },
  faq: {
    title: 'FAQ – 이음통합평생교육원',
    description: '수강, 운영, 자격과 관련한 자주 묻는 질문을 정리했습니다.',
  },
  privacy: {
    title: '개인정보처리방침 – 이음통합평생교육원',
    description: '이음통합평생교육원의 개인정보처리방침을 안내합니다.',
  },
  terms: {
    title: '이용약관 – 이음통합평생교육원',
    description: '홈페이지 이용과 서비스 제공에 관한 기본 약관을 안내합니다.',
  },
  notices: {
    title: '공지사항 – 이음통합평생교육원',
    description: '과정 운영, 모집, 개강 관련 공지사항을 확인하실 수 있습니다.',
  },
  notice: {
    title: '공지사항 – 이음통합평생교육원',
    description: '과정 운영, 모집, 개강 관련 공지사항을 확인하실 수 있습니다.',
  },
  certification: {
    title: '민간자격 안내 – 이음통합평생교육원',
    description: '모래놀이심리상담사 민간자격 정보와 운영 안내를 제공합니다.',
  },
  verify: {
    title: '자격인증 조회 – 이음통합평생교육원',
    description: '발급된 자격증의 진위 여부를 확인할 수 있습니다.',
  },
};

const PAGE_ALIASES = {
  institution: 'mission',
  instructors: 'faculty',
  schedule: 'courses',
  refund: 'courses',
  faq: 'certification',
  privacy: 'home',
  terms: 'home',
  notices: 'notice',
};

const ACTIVE_PAGES = new Set([
  'home',
  'greeting',
  'mission',
  'history',
  'faculty',
  'location',
  'courses',
  'enroll',
  'notice',
  'certification',
  'verify',
]);

function normalizePageId(pageId) {
  const candidate = PAGE_ALIASES[pageId] || pageId;
  return ACTIVE_PAGES.has(candidate) ? candidate : 'home';
}

function getInitialPage() {
  const hash = window.location.hash.replace('#', '').trim();
  return normalizePageId(hash);
}

function App() {
  const [page, setPage] = React.useState(getInitialPage);
  const [tweakState, setTweakState] = React.useState(TWEAK_DEFAULTS);
  const [tweakOpen, setTweakOpen] = React.useState(false);

  const tweaks = {
    ...(THEMES[tweakState.theme] || THEMES.warm),
    ...(FONT_STYLES[tweakState.fontStyle] || FONT_STYLES.sans),
    heroSize: tweakState.heroSize,
  };

  React.useEffect(() => {
    const onHashChange = () => {
      const nextPage = getInitialPage();
      setPage((prevPage) => (prevPage === nextPage ? prevPage : nextPage));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  React.useEffect(() => {
    const pageMeta = PAGE_META[page] || PAGE_META.home;
    const nextHash = page === 'home' ? '' : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', `${window.location.pathname}${nextHash}`);
    }
    document.title = pageMeta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', pageMeta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageMeta.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', pageMeta.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  React.useEffect(() => {
    const handler = (event) => {
      if (event.data?.type === '__activate_edit_mode') setTweakOpen(true);
      if (event.data?.type === '__deactivate_edit_mode') setTweakOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const updateTweak = (key, value) => {
    const next = { ...tweakState, [key]: value };
    setTweakState(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
  };

  return (
    <div style={{ background: tweaks.bgMain, minHeight: '100vh' }}>
      <window.SiteHeader currentPage={page} setPage={setPage} tweaks={tweaks}/>
      <main id="main-content" tabIndex="-1">
        {page === 'home' && <window.HomePage setPage={setPage} tweaks={tweaks}/>}
        {page === 'greeting' && <window.GreetingPage tweaks={tweaks}/>}
        {page === 'mission' && <window.MissionPage tweaks={tweaks}/>}
        {page === 'history' && <window.HistoryPage tweaks={tweaks}/>}
        {page === 'faculty' && <window.FacultyPage tweaks={tweaks}/>}
        {page === 'location' && <window.LocationPage tweaks={tweaks} setPage={setPage}/>}
        {page === 'courses' && <window.CoursesPage setPage={setPage} tweaks={tweaks}/>}
        {page === 'enroll' && <window.EnrollPage tweaks={tweaks} setPage={setPage}/>}
        {page === 'notice' && <window.NoticePage tweaks={tweaks} setPage={setPage}/>}
        {page === 'certification' && <window.CertificationPage tweaks={tweaks}/>}
        {page === 'verify' && <window.VerifyPage tweaks={tweaks}/>}
      </main>

      <window.SiteFooter tweaks={tweaks} setPage={setPage}/>

      <div className={`tweak-panel ${tweakOpen ? 'open' : ''}`}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#2C1810' }}>Tweaks</div>

        <div className="tweak-label">색상 테마</div>
        <div className="tweak-row">
          {[
            { id: 'warm', label: '베이지/브라운', color: '#8B6F47' },
            { id: 'olive', label: '올리브/그린', color: '#5E7352' },
            { id: 'navy', label: '네이비/블루', color: '#4A5E7A' },
          ].map((theme) => (
            <button key={theme.id} className={`tweak-chip ${tweakState.theme === theme.id ? 'active' : ''}`}
                    onClick={() => updateTweak('theme', theme.id)}
                    style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ width:12, height:12, borderRadius:'50%', background:theme.color, display:'inline-block' }}/>
              {theme.label}
            </button>
          ))}
        </div>

        <div className="tweak-label">제목 폰트</div>
        <div className="tweak-row">
          {[
            { id: 'sans', label: '고딕 (Sans)' },
            { id: 'serif', label: '명조 (Serif)' },
          ].map((font) => (
            <button key={font.id} className={`tweak-chip ${tweakState.fontStyle === font.id ? 'active' : ''}`}
                    onClick={() => updateTweak('fontStyle', font.id)}>
              {font.label}
            </button>
          ))}
        </div>

        <div className="tweak-label">히어로 제목 크기</div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <input type="range" min="36" max="64" step="2" value={tweakState.heroSize}
                 onChange={(event) => updateTweak('heroSize', Number(event.target.value))}
                 style={{ flex:1 }}/>
          <span style={{ fontSize:13, color:'#888', minWidth:32 }}>{tweakState.heroSize}px</span>
        </div>
      </div>
    </div>
  );
}

window.ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
