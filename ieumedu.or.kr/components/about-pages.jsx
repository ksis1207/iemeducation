/* ── 원장 인사말 ── */
function GreetingPage({ tweaks }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 0 60px' }}>
          <SectionTitle sub="GREETING" title="원장 인사말" tweaks={tweaks}/>
        </div>
      </section>

      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Card tweaks={tweaks} hover={false}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {/* 원장 프로필 영역 */}
              <div style={{ width: 180, flexShrink: 0, textAlign: 'center' }}>
                <div style={{
                  width: 160, height: 200, borderRadius: 16, background: tweaks.warmBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${tweaks.border}`, margin: '0 auto 16px',
                }}>
                  <div style={{ fontSize: 13, color: tweaks.textMuted }}>원장 사진</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: tweaks.text, fontFamily: tweaks.fontHeading }}>선 애 순</div>
                <div style={{ fontSize: 13, color: tweaks.textMuted, marginTop: 4 }}>이음통합평생교육원 원장</div>
              </div>

              {/* 인사말 본문 */}
              <div style={{ flex: 1, minWidth: 280 }}>
                <h3 style={{
                  fontSize: 22, fontWeight: 700, color: tweaks.text, margin: '0 0 24px',
                  fontFamily: tweaks.fontHeading, lineHeight: 1.5,
                }}>
                  "마음을 잇고, 성장을 잇는<br/>따뜻한 교육을 실천합니다"
                </h3>
                <div style={{ fontSize: 15, color: tweaks.textMuted, lineHeight: 2, textWrap: 'pretty' }}>
                  <p style={{ marginBottom: 16 }}>
                    안녕하세요. 이음통합평생교육원 원장 선애순입니다.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    우리 교육원은 '이음(잇다)'이라는 이름처럼, 사람과 사람의 마음을 잇고, 
                    배움과 성장을 잇는 다리 역할을 하고자 설립되었습니다.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    모래놀이심리상담은 말로 표현하기 어려운 내면의 감정과 무의식을 
                    모래와 상징물을 통해 자연스럽게 드러내고 치유하는 전문 상담 기법입니다. 
                    저는 오랜 현장 경험을 통해 이 분야의 전문 인력 양성이 
                    얼마나 중요한지를 깊이 체감해 왔습니다.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    이음통합평생교육원은 체계적인 이론 교육과 실습 중심의 커리큘럼을 통해, 
                    아동·청소년·성인을 위한 심리상담 전문가를 양성하고 있습니다. 
                    이음심리연구상담센터와의 긴밀한 연계를 통해 
                    현장 중심의 살아있는 교육을 제공합니다.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    배움에는 나이도, 자격 조건도 없습니다. 
                    심리상담에 관심을 가진 모든 분들에게 문을 열어두고 있습니다. 
                    함께 배우고, 함께 성장하는 따뜻한 교육 공동체를 만들어 가겠습니다.
                  </p>
                  <p>
                    감사합니다.
                  </p>
                </div>
                <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${tweaks.border}` }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: tweaks.text, fontFamily: tweaks.fontHeading }}>
                    이음통합평생교육원 원장 &nbsp;<span style={{ fontSize: 18 }}>선애순</span>
                  </div>
                  <div style={{ marginTop: 14, fontSize: 13, color: tweaks.muted, lineHeight: 1.8 }}>
                    원장의 칼럼과 해설은 <a href="https://news.ieumedu.kr" target="_blank" rel="noopener" style={{ color: tweaks.primary, textDecoration: 'none', fontWeight: 500 }}>이음교육저널</a>,
                    <a href="https://brunch.co.kr/@205593d149c84b6" target="_blank" rel="noopener" style={{ color: tweaks.primary, textDecoration: 'none', fontWeight: 500, marginLeft: 4 }}>브런치북 『감정도 잠이 필요하다』</a>에서도 만나실 수 있습니다.
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

/* ── 설립목적 / 교육철학 ── */
function MissionPage({ tweaks }) {
  const values = [
    {
      title: '전인적 성장 지원',
      desc: '지식 전달을 넘어, 상담사 자신의 내면 성장과 전인적 발달을 함께 추구합니다.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke={tweaks.primary} strokeWidth="2" fill={tweaks.primaryLight}/>
          <circle cx="20" cy="16" r="5" stroke={tweaks.primary} strokeWidth="1.5" fill="none"/>
          <path d="M12 30c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={tweaks.primary} strokeWidth="1.5" fill="none"/>
        </svg>
      ),
    },
    {
      title: '현장 중심 교육',
      desc: '이음심리연구상담센터와 연계하여 이론과 실습이 균형 잡힌 교육을 운영합니다.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="6" y="10" width="28" height="20" rx="3" stroke={tweaks.primary} strokeWidth="2" fill={tweaks.primaryLight}/>
          <path d="M6 16h28M14 16v14M26 16v14" stroke={tweaks.primary} strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      title: '평생학습 실현',
      desc: '누구나, 언제든 배울 수 있는 열린 교육 환경을 지향합니다.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M8 28V14l12-6 12 6v14" stroke={tweaks.primary} strokeWidth="2" fill={tweaks.primaryLight}/>
          <path d="M14 18v8M20 16v10M26 18v8" stroke={tweaks.primary} strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      title: '윤리적 전문성',
      desc: '상담 윤리와 법규를 준수하며, 사회적 책임을 다하는 전문 인력을 양성합니다.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 6l10 5v10c0 7-10 13-10 13S10 28 10 21V11l10-5z" stroke={tweaks.primary} strokeWidth="2" fill={tweaks.primaryLight}/>
          <path d="M15 20l4 4 6-8" stroke={tweaks.primary} strokeWidth="2" fill="none"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 0 60px' }}>
          <SectionTitle sub="MISSION" title="설립목적 및 교육철학" desc="이음통합평생교육원이 추구하는 교육의 방향입니다." tweaks={tweaks}/>
        </div>
      </section>

      {/* 설립목적 */}
      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: tweaks.text, margin: '0 0 24px', fontFamily: tweaks.fontHeading }}>설립목적</h3>
          <Card tweaks={tweaks} hover={false} style={{ background: tweaks.bgMain }}>
            <div style={{ fontSize: 15, color: tweaks.text, lineHeight: 2, textWrap: 'pretty' }}>
              <p style={{ marginBottom: 12 }}>
                이음통합평생교육원은 <strong>모래놀이심리상담 분야의 전문 인력 양성</strong>을 목적으로 설립되었습니다.
              </p>
              <p style={{ marginBottom: 12 }}>
                급변하는 현대 사회에서 심리적 어려움을 겪는 아동·청소년·성인이 증가하고 있으며, 
                이에 대응하는 전문 상담 인력의 수요가 꾸준히 늘어나고 있습니다.
              </p>
              <p>
                본 교육원은 체계적인 이론 교육과 현장 실습을 통해 
                모래놀이심리상담사 민간자격(2급·1급)을 취득할 수 있는 교육과정을 운영하며, 
                대한심리통합연구회 및 이음심리연구상담센터와 연계하여
                실질적인 상담 역량을 갖춘 전문가를 배출하고 있습니다.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 교육철학 / 핵심가치 */}
      <section style={{ padding: '60px 24px', background: tweaks.bgMain }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: tweaks.text, margin: '0 0 32px', fontFamily: tweaks.fontHeading, textAlign: 'center' }}>교육 핵심가치</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <Card key={i} tweaks={tweaks} style={{ textAlign: 'center', padding: 28 }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{v.icon}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: tweaks.text, margin: '0 0 10px', fontFamily: tweaks.fontHeading }}>{v.title}</h4>
                <p style={{ fontSize: 14, color: tweaks.textMuted, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── 연혁 ── */
function HistoryPage({ tweaks }) {
  const timeline = [
    { year: '2026', events: [
      { month: '2월', text: '대한심리통합연구회 발족' },
      { month: '4월', text: '이음심리연구상담센터 개소식' },
      { month: '4월', text: '㈜가비아 도메인 등록' },
      { month: '4월', text: '이음통합평생교육원 인터넷 홈페이지(https://www.ieumedu.kr) 개설' },
      { month: '4월', text: '인터넷 신문 「이음교육저널」 등록' },
      { month: '4월', text: '이음교육저널(https://news.ieumedu.kr) 인터넷 홈페이지 개설' },
      { month: '4월', text: '이음통합평생교육원 교육청 등록' },
      { month: '5월', text: '한국직업능력연구원 민간자격 등록' },
      { month: '6월', text: '모래놀이심리상담 2급과정 준비' },
      { month: '7월', text: '모래놀이심리상담 2급과정 개설' },
      { month: '8월', text: '모래놀이심리상담 1급과정 준비' },
      { month: '9월', text: '모래놀이심리상담 1급과정 개설' },
      { month: '10월', text: '모래놀이심리상담사 2급 자격 발급 개시' },
      { month: '11월', text: '모래놀이심리상담사 1급 자격 발급 개시' },
    ]},
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 0 60px' }}>
          <SectionTitle sub="HISTORY" title="연혁" desc="이음통합평생교육원의 발자취입니다." tweaks={tweaks}/>
        </div>
      </section>

      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {timeline.map((group, gi) => (
            <div key={gi} style={{ marginBottom: gi < timeline.length - 1 ? 48 : 0 }}>
              {/* Year label */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24,
              }}>
                <div style={{
                  fontSize: 28, fontWeight: 800, color: tweaks.primary,
                  fontFamily: tweaks.fontHeading,
                }}>{group.year}</div>
                <div style={{ height: 2, width: 40, background: tweaks.primary, borderRadius: 1, opacity: 0.3 }}/>
              </div>

              {/* Events */}
              <div style={{ paddingLeft: 20, borderLeft: `2px solid ${tweaks.border}` }}>
                {group.events.map((ev, ei) => (
                  <div key={ei} style={{
                    position: 'relative', paddingLeft: 24, paddingBottom: ei < group.events.length - 1 ? 24 : 0,
                  }}>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute', left: -7, top: 6,
                      width: 12, height: 12, borderRadius: '50%',
                      background: tweaks.primary, border: `3px solid ${tweaks.bgMain}`,
                    }}/>
                    <div style={{ fontSize: 13, fontWeight: 600, color: tweaks.accent, marginBottom: 4 }}>{ev.month}</div>
                    <div style={{ fontSize: 15, color: tweaks.text, lineHeight: 1.6 }}>{ev.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 40, padding: 20, borderRadius: 12, background: tweaks.bgMain, fontSize: 13, color: tweaks.textMuted, lineHeight: 1.8, textAlign: 'center' }}>
            ※ 연혁은 주요 사항 기준이며, 세부 일정은 다를 수 있습니다.<br/>
            정확한 정보는 교육원에 문의해 주세요. (☎ 062-655-4116)
          </div>
        </div>
      </section>
    </div>
  );
}

window.GreetingPage = GreetingPage;
window.MissionPage = MissionPage;
window.HistoryPage = HistoryPage;
