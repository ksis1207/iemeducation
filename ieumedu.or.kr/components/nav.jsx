const NAV_ITEMS = [
  { id: 'about', label: '교육원소개', children: [
    { id: 'greeting', label: '원장 인사말' },
    { id: 'mission', label: '설립목적 · 교육철학' },
    { id: 'history', label: '연혁' },
    { id: 'faculty', label: '강사진 소개' },
    { id: 'location', label: '오시는 길' },
  ]},
  { id: 'courses', label: '교육과정', children: [
    { id: 'courses', label: '커리큘럼 · 시수' },
    { id: 'certification', label: '민간자격 안내' },
    { id: 'verify', label: '자격인증 조회' },
  ]},
  { id: 'notice', label: '공지사항' },
  { id: 'enroll', label: '수강신청' },
];

function SiteHeader({ currentPage, setPage, tweaks }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const dropdownTimeout = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Check if current page belongs to a parent (children id may equal parent id; still counts as active)
  const isChildActive = (item) => item.children && item.children.some(c => c.id === currentPage);
  const isParentActive = (item) => item.id === currentPage || isChildActive(item);

  const headerStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    background: scrolled ? 'rgba(250,246,240,0.97)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(139,111,71,0.12)' : '1px solid transparent',
    transition: 'all 0.3s ease',
  };

  const innerStyle = {
    maxWidth: 1200, margin: '0 auto', padding: '0 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 72,
  };

  const logoStyle = {
    fontFamily: tweaks.fontHeading,
    fontSize: 18, fontWeight: 700, color: tweaks.primary,
    cursor: 'pointer', letterSpacing: '-0.02em',
    display: 'flex', alignItems: 'center', gap: 10,
  };

  const linkStyle = (active) => ({
    padding: '8px 16px', borderRadius: 8,
    fontSize: 15, fontWeight: active ? 600 : 400,
    color: active ? tweaks.primary : tweaks.textMuted,
    background: active ? tweaks.primaryLight : 'transparent',
    cursor: 'pointer', transition: 'all 0.2s',
    border: 'none', fontFamily: 'inherit',
    display: 'flex', alignItems: 'center', gap: 4,
  });

  const dropdownStyle = {
    position: 'absolute', top: '100%', left: 0, marginTop: 4,
    background: '#fff', borderRadius: 12, padding: '8px 0',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)', border: `1px solid ${tweaks.border}`,
    minWidth: 180, zIndex: 200,
  };

  const dropdownLinkStyle = (active) => ({
    display: 'block', padding: '10px 20px', fontSize: 14,
    fontWeight: active ? 600 : 400,
    color: active ? tweaks.primary : tweaks.text,
    background: active ? tweaks.primaryLight : 'transparent',
    cursor: 'pointer', border: 'none', width: '100%',
    textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.15s',
  });

  const handleDropdownEnter = (id) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(id);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  // Mobile menu
  const mobileMenuStyle = {
    position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
    background: tweaks.bgMain, overflowY: 'auto',
    display: menuOpen ? 'flex' : 'none',
    flexDirection: 'column', padding: '24px',
    gap: 4, zIndex: 99,
  };

  const mobileLinkStyle = (active, indent = false) => ({
    padding: indent ? '12px 20px 12px 36px' : '14px 20px', borderRadius: 10,
    fontSize: indent ? 15 : 16, fontWeight: active ? 600 : 400,
    color: active ? tweaks.primary : tweaks.text,
    background: active ? tweaks.primaryLight : 'transparent',
    cursor: 'pointer', border: 'none', textAlign: 'left',
    fontFamily: 'inherit',
  });

  const mobileGroupLabelStyle = {
    padding: '14px 20px 6px', fontSize: 13, fontWeight: 600,
    color: tweaks.accent, letterSpacing: '0.04em',
    textTransform: 'uppercase',
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={innerStyle}>
          <div style={logoStyle} onClick={() => { setPage('home'); setMenuOpen(false); }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" fill={tweaks.primary} opacity="0.15"/>
              <circle cx="14" cy="14" r="7" fill={tweaks.primary} opacity="0.3"/>
              <circle cx="14" cy="14" r="3" fill={tweaks.primary}/>
            </svg>
            이음통합평생교육원
          </div>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="desktop-nav">
            {NAV_ITEMS.map(item => {
              if (item.children) {
                const active = isParentActive(item);
                return (
                  <div key={item.id} style={{ position: 'relative' }}
                       onMouseEnter={() => handleDropdownEnter(item.id)}
                       onMouseLeave={handleDropdownLeave}>
                    <button style={linkStyle(active)}>
                      {item.label}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5, transform: openDropdown === item.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                        <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                    {openDropdown === item.id && (
                      <div style={dropdownStyle}>
                        {item.children.map(child => (
                          <button key={`${item.id}-${child.id}`} style={dropdownLinkStyle(currentPage === child.id)}
                                  onClick={() => { setPage(child.id); setOpenDropdown(null); }}
                                  onMouseEnter={e => e.target.style.background = tweaks.primaryLight}
                                  onMouseLeave={e => { if (currentPage !== child.id) e.target.style.background = 'transparent'; }}>
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <button key={item.id} style={linkStyle(currentPage === item.id)}
                        onClick={() => setPage(item.id)}
                        onMouseEnter={e => { if (currentPage !== item.id) e.target.style.background = tweaks.primaryLight; }}
                        onMouseLeave={e => { if (currentPage !== item.id) e.target.style.background = 'transparent'; }}>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={tweaks.text} strokeWidth="2">
              {menuOpen
                ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></>
                : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
              }
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div style={mobileMenuStyle}>
        <button style={mobileLinkStyle(currentPage === 'home')}
                onClick={() => { setPage('home'); setMenuOpen(false); }}>홈</button>

        {NAV_ITEMS.map(item => {
          if (item.children) {
            return (
              <React.Fragment key={item.id}>
                <div style={mobileGroupLabelStyle}>{item.label}</div>
                {item.children.map(child => (
                  <button key={`${item.id}-${child.id}`} style={mobileLinkStyle(currentPage === child.id, true)}
                          onClick={() => { setPage(child.id); setMenuOpen(false); }}>
                    {child.label}
                  </button>
                ))}
              </React.Fragment>
            );
          }
          return (
            <button key={item.id} style={mobileLinkStyle(currentPage === item.id)}
                    onClick={() => { setPage(item.id); setMenuOpen(false); }}>
              {item.label}
            </button>
          );
        })}

        <div style={{ marginTop: 24, padding: '16px 20px', fontSize: 14, color: tweaks.textMuted, lineHeight: 1.7 }}>
          <div>☎ 062-655-4116</div>
          <div>광주광역시 서구 회재로 859, 3층</div>
        </div>
      </div>
    </>
  );
}

window.SiteHeader = SiteHeader;
window.NAV_ITEMS = NAV_ITEMS;

/* ── 인가 진행 고지 바 (모든 페이지 상단, 닫기 가능) ── */
function AccreditationBar({ tweaks, setPage }) {
  const [closed, setClosed] = React.useState(() => {
    try { return localStorage.getItem('ieum_acc_bar_closed_v1') === '1'; } catch { return false; }
  });

  if (closed) return null;

  const close = (e) => {
    e.stopPropagation();
    setClosed(true);
    try { localStorage.setItem('ieum_acc_bar_closed_v1', '1'); } catch {}
  };

  return (
    <div style={{
      position: 'sticky', top: 72, zIndex: 90,
      background: tweaks.text, color: '#fff',
      padding: '10px 24px', fontSize: 13,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      flexWrap: 'wrap',
    }}>
      <span style={{
        padding: '3px 10px', borderRadius: 4,
        background: tweaks.accent, color: '#fff',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', flexShrink: 0,
      }}>NOTICE</span>
      <span style={{ opacity: 0.92, lineHeight: 1.6, textAlign: 'center' }}>
        본 교육원은 현재 <strong style={{ color: '#fff' }}>평생교육시설 등록 · 인가 절차</strong>를 진행하고 있습니다.
        <span style={{ opacity: 0.7 }}> 개강 일정·수강료는 인가 승인 후 공지됩니다.</span>
      </span>
      <button onClick={() => setPage('notice')}
        style={{
          background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none',
          padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
        }}>
        자세히 보기 →
      </button>
      <button onClick={close} aria-label="닫기"
        style={{
          background: 'transparent', color: 'rgba(255,255,255,0.6)', border: 'none',
          padding: '2px 8px', fontSize: 18, cursor: 'pointer', fontFamily: 'inherit',
          lineHeight: 1, flexShrink: 0,
        }}
        onMouseEnter={e => e.target.style.color = '#fff'}
        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
        ×
      </button>
    </div>
  );
}

window.AccreditationBar = AccreditationBar;
