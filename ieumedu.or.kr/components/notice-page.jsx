/* ── NOTICE PAGE (공지사항) ── */
const NOTICES = [
  { id: 26, category: '모집공고', pinned: true, date: '2026.05.17', title: '[안내] 2급·1급 연간 교육계획안 반영 및 수강료 공개', author: '교육원', views: 96,
    content: '2026년 연간 교육계획안(2급/1급) 반영 내용을 안내드립니다.\n\n• 2급: 총 60시간 / 교육비 50만 원\n• 1급: 총 90시간 / 교육비 70만 원\n• 교육비 기준: 실습·평가비 포함 / 교재·자격증비 별도\n• 2급 대상: 상담 입문자·교사·부모\n• 1급 대상: 2급 수료자·상담 경험자\n\n수강료는 공개되었으며, 개강 일정·모집정원·세부 운영 방식은 평생교육시설 인가 승인 후 공지사항을 통해 최종 안내드립니다.\n\n문의: ☎ 062-655-4116' },
  { id: 25, category: '교육원소식', pinned: true, date: '2026.02.20', title: '[중요] 평생교육시설 인가 절차 진행 안내 – 개강 일정 인가 승인 후 공지', author: '원장실', views: 412,
    content: '이음통합평생교육원을 찾아주신 모든 분들께 감사드립니다.\n\n본 교육원은 현재 광주광역시 서구청에 평생교육시설 등록 및 인가 절차를 진행하고 있습니다.\n\n• 진행 단계: 평생교육시설 등록 · 인가 신청 · 심사 진행 중\n• 개강 일정: 인가 승인 후 홈페이지 및 공지사항을 통해 공지 예정\n• 수강료: 2급 50만 원 / 1급 70만 원 (공개)\n• 커리큘럼: 2급 60시간 / 1급 90시간 연간 교육계획안 반영\n• 강사진: 대한심리통합연구회 협력 체계 구축 완료\n\n인가 절차가 마무리되는 대로 2급·1급 과정 정식 개강 일정과 모집 공고를 안내드리겠습니다.\n\n관심 등록을 남겨주시면 인가 승인 및 모집 개시 시점에 개별 안내 드리오니, 많은 관심과 응원 부탁드립니다.\n\n문의: ☎ 062-655-4116' },
  { id: 24, category: '모집공고', pinned: true, date: '2026.02.18', title: '2급 · 1급 과정 사전 관심 등록 접수 안내 (개강일 인가 승인 후 공지)', author: '교육원', views: 284,
    content: '모래놀이심리상담사 2급·1급 과정에 관심 있으신 분들을 위해 사전 관심 등록을 받고 있습니다.\n\n• 대상: 모래놀이심리상담사 자격 취득 및 수강 희망자\n• 접수 방법: 홈페이지 문의 양식 또는 전화(062-655-4116)\n• 안내 시점: 평생교육시설 인가 승인 직후 · 모집 공고 시 개별 안내\n• 사전 등록은 법적 효력이 있는 수강 신청이 아니며, 인가 승인 후 정식 신청 절차가 별도로 진행됩니다.\n\n2급 과정 총 60시간 · 1급 과정 총 90시간으로 설계되어 있으며, 세부 커리큘럼은 교육과정 페이지에서 확인하실 수 있습니다.' },
  { id: 23, category: '교육원소식', pinned: false, date: '2026.02.10', title: '이음심리연구상담센터 개소 안내 – 상담 예약 접수 시작', author: '원장실', views: 318 },
  { id: 22, category: '자격안내', pinned: false, date: '2026.01.28', title: '모래놀이심리상담사 민간자격 등록 정보 (한국직업능력연구원)', author: '자격관리팀', views: 205 },
  { id: 21, category: '교육원소식', pinned: false, date: '2026.01.20', title: '대한심리통합연구회 연구회원 모집', author: '연구회', views: 178 },
  { id: 20, category: '일정공지', pinned: false, date: '2026.01.05', title: '2026년 신년 인사 및 교육원 운영 방향 안내', author: '원장실', views: 412 },
  { id: 19, category: '교육원소식', pinned: false, date: '2025.12.20', title: '2025년 한 해 동안 이음통합평생교육원을 함께해 주신 모든 분들께 감사드립니다', author: '원장실', views: 521 },
  { id: 18, category: '자격안내', pinned: false, date: '2025.11.25', title: '민간자격 제도 및 자격 발급 절차 안내', author: '자격관리팀', views: 234 },
  { id: 17, category: '교육원소식', pinned: false, date: '2025.11.10', title: '모래놀이심리상담 연구 세미나 후기', author: '연구회', views: 156 },
  { id: 16, category: '일정공지', pinned: false, date: '2025.10.15', title: '평생교육원 개원 준비 진행 상황 공유', author: '원장실', views: 389 },
];

const NOTICE_CATEGORIES = ['전체', '모집공고', '일정공지', '교육원소식', '자격안내'];

function NoticePage({ tweaks, setPage }) {
  const [cat, setCat] = React.useState('전체');
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState(null);

  const filtered = NOTICES.filter(n => {
    if (cat !== '전체' && n.category !== cat) return false;
    if (query && !n.title.includes(query)) return false;
    return true;
  }).sort((a,b) => (b.pinned - a.pinned) || (b.id - a.id));

  if (selected) {
    return <NoticeDetail notice={selected} tweaks={tweaks} onBack={() => setSelected(null)}/>;
  }

  const catColor = (c) => {
    const map = { '모집공고': tweaks.primary, '일정공지': tweaks.accent, '교육원소식': '#7A9B8E', '자격안내': '#9C7CAE' };
    return map[c] || tweaks.textMuted;
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 0 50px' }}>
          <SectionTitle sub="NOTICE" title="공지사항"
            desc="이음통합평생교육원의 모집공고 · 교육일정 · 주요 소식을 확인하실 수 있습니다."
            tweaks={tweaks}/>
        </div>
      </section>

      <section style={{ padding: '40px 24px 80px', background:'#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* 카테고리 탭 + 검색 */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16, marginBottom:20 }}>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {NOTICE_CATEGORIES.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  style={{
                    padding:'10px 18px', borderRadius:999, fontSize:13, fontWeight:600, cursor:'pointer',
                    border: cat === c ? `1.5px solid ${tweaks.primary}` : `1.5px solid ${tweaks.border}`,
                    background: cat === c ? tweaks.primary : '#fff',
                    color: cat === c ? '#fff' : tweaks.textMuted,
                    fontFamily:'inherit', transition:'all 0.15s',
                  }}>{c}</button>
              ))}
            </div>
            <div style={{ position:'relative' }}>
              <input type="text" placeholder="제목 검색..." value={query} onChange={e => setQuery(e.target.value)}
                style={{ padding:'10px 16px 10px 40px', borderRadius:10, border:`1.5px solid ${tweaks.border}`, fontSize:14, fontFamily:'inherit', outline:'none', width:220, boxSizing:'border-box' }}
                onFocus={e => e.target.style.borderColor = tweaks.primary}
                onBlur={e => e.target.style.borderColor = tweaks.border}/>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tweaks.textMuted} strokeWidth="2"
                   style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
          </div>

          {/* 목록 */}
          <div style={{ border:`1px solid ${tweaks.border}`, borderRadius:16, overflow:'hidden' }}>
            <div style={{ display:'grid', gridTemplateColumns:'80px 120px 1fr 100px 80px', padding:'14px 20px', background:tweaks.bgMain, fontSize:12, fontWeight:700, color:tweaks.textMuted, letterSpacing:'0.04em' }}>
              <div>번호</div>
              <div>구분</div>
              <div>제목</div>
              <div>작성일</div>
              <div style={{ textAlign:'right' }}>조회</div>
            </div>
            {filtered.length === 0 ? (
              <div style={{ padding:'60px 20px', textAlign:'center', color:tweaks.textMuted, fontSize:14 }}>검색 결과가 없습니다.</div>
            ) : filtered.map((n, i) => (
              <button key={n.id} onClick={() => setSelected(n)}
                style={{
                  width:'100%', display:'grid', gridTemplateColumns:'80px 120px 1fr 100px 80px',
                  padding:'16px 20px', borderTop:`1px solid ${tweaks.border}`,
                  background: n.pinned ? tweaks.warmBg : '#fff',
                  cursor:'pointer', fontFamily:'inherit', border:'none', borderRadius:0,
                  textAlign:'left', alignItems:'center', transition:'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = tweaks.bgMain}
                onMouseLeave={e => e.currentTarget.style.background = n.pinned ? tweaks.warmBg : '#fff'}>
                <div style={{ fontSize:13, color:tweaks.textMuted }}>
                  {n.pinned
                    ? <span style={{ padding:'3px 8px', borderRadius:4, background:tweaks.primary, color:'#fff', fontSize:11, fontWeight:700 }}>공지</span>
                    : n.id}
                </div>
                <div>
                  <span style={{ padding:'4px 10px', borderRadius:6, fontSize:12, fontWeight:600,
                    background: `${catColor(n.category)}20`, color: catColor(n.category) }}>{n.category}</span>
                </div>
                <div style={{ fontSize:14, fontWeight: n.pinned ? 700 : 500, color:tweaks.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{n.title}</div>
                <div style={{ fontSize:13, color:tweaks.textMuted }}>{n.date}</div>
                <div style={{ fontSize:13, color:tweaks.textMuted, textAlign:'right' }}>{n.views}</div>
              </button>
            ))}
          </div>

          {/* 문의 */}
          <div style={{ marginTop:32, padding:24, borderRadius:16, background:tweaks.bgMain, textAlign:'center' }}>
            <div style={{ fontSize:15, color:tweaks.text, marginBottom:12 }}>
              공지사항에 대한 자세한 문의는 교육원으로 연락주세요.
            </div>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <Btn tweaks={tweaks} onClick={() => window.open('tel:062-655-4116')}>☎ 062-655-4116</Btn>
              <Btn tweaks={tweaks} variant="outline" onClick={() => setPage('enroll')}>문의하기 →</Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function NoticeDetail({ notice, tweaks, onBack }) {
  const catColor = (c) => {
    const map = { '모집공고': tweaks.primary, '일정공지': tweaks.accent, '교육원소식': '#7A9B8E', '자격안내': '#9C7CAE' };
    return map[c] || tweaks.textMuted;
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 0 40px' }}>
          <button onClick={onBack}
            style={{ background:'none', border:'none', color:tweaks.primary, fontSize:14, fontWeight:600, cursor:'pointer', padding:0, marginBottom:20, fontFamily:'inherit' }}>
            ← 공지사항 목록
          </button>
          <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14, flexWrap:'wrap' }}>
            <span style={{ padding:'5px 12px', borderRadius:6, fontSize:13, fontWeight:700,
              background: `${catColor(notice.category)}20`, color: catColor(notice.category) }}>{notice.category}</span>
            {notice.pinned && <span style={{ padding:'5px 12px', borderRadius:6, background:tweaks.primary, color:'#fff', fontSize:12, fontWeight:700 }}>공지</span>}
          </div>
          <h1 style={{ fontSize:28, fontWeight:700, color:tweaks.text, margin:0, lineHeight:1.4, fontFamily:tweaks.fontHeading, textWrap:'pretty' }}>{notice.title}</h1>
          <div style={{ display:'flex', gap:18, marginTop:20, fontSize:13, color:tweaks.textMuted }}>
            <span>{notice.date}</span>
            <span>작성: {notice.author}</span>
            <span>조회 {notice.views}</span>
          </div>
        </div>
      </section>

      <section style={{ padding:'50px 24px 80px', background:'#fff' }}>
        <div style={{ maxWidth: 900, margin:'0 auto' }}>
          <div style={{ padding:'32px 0', fontSize:15, color:tweaks.text, lineHeight:2, whiteSpace:'pre-wrap', borderBottom:`1px solid ${tweaks.border}` }}>
            {notice.content || '자세한 내용은 교육원으로 문의하여 주시기 바랍니다.\n\n☎ 062-655-4116\n평일 09:00 ~ 18:00'}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:28, flexWrap:'wrap', gap:12 }}>
            <button onClick={onBack}
              style={{ padding:'12px 22px', borderRadius:10, border:`1.5px solid ${tweaks.border}`, background:'#fff', fontSize:14, fontWeight:600, color:tweaks.text, cursor:'pointer', fontFamily:'inherit' }}>
              ← 목록으로
            </button>
            <Btn tweaks={tweaks} onClick={() => window.open('tel:062-655-4116')}>☎ 문의하기</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

window.NoticePage = NoticePage;
window.NOTICES = NOTICES;
