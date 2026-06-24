/* ── 강사진 소개 ── */
function FacultyPage({ tweaks }) {
  // 원장
  const director = {
    name: '선 애 순',
    role: '이음통합평생교육원 원장',
    subRole: '대한심리통합연구회 대표 · 이음심리연구상담센터 센터장',
    spec: ['모래놀이심리상담', '아동·영유아 발달', '부모교육'],
    education: [
      '광주대학교 대학원 유아 교육 석사 - 실내와 실외 놀이 환경에 따른 유아의 가상놀이 비교(2002)',
      '광신대학교 대학원 유아특수교육 석사 — 그림동화책 읽어주기가 다문화가정 아동의 언어능력 향상에 미치는 효과 (2010)',
      '남부대학교 대학원 특수교육 박사 수료(2020) - 특수상담',
      '목포대학교 대학원 가정학 박사 - 아동의 모래상자치료에서 상징물, 관계성, 심리적 표현 및 개성화 과정에 관한 연구(2013)',
    ],
    career: [
      '현 이음통합평생교육원 원장',
      '현 대한심리통합연구회 대표',
      '현 샘아동심리연구원 원장',
      '현 목포과학대학교 사회복지과 외래교수',
      '전 광주보건대학교 사회복지과 외래교수',
      '전 위더스원격평생교육원 운영교수',
      '전 둥지유치원 교사',
      '전 다솜아동가족상담소 소장',
    ],
    activity: [
      '전남이주여성인권센터 상담 (3년)',
      '여성의 쉼터 상담 (13년)',
      '전남육아종합지원센터 부모교육 및 상담 (10년)',
      '광주광역시육아종합지원센터 영유아 상담 (5년)',
      '고창교육지원청 특수학생 상담 (4년)',
      '고창교육지원청 위(Wee)센터 위기학생 상담 (8년)',
      '영애원 아동 상담 운영위원 (10년)',
      '광주쌍촌종합사회복지관 1급 뇌성마비 상담 (3년)',
      '정읍교육지원청 특수교원연수(모래놀이치료 중심으로) : 아동의 성심리와 인권 감수성 이해 및 놀이 (2021)',
      '정읍교육지원청 위(Wee)센터 교원연수 : 청소년상담을 위한 심리적 전략 (2019)',
    ],
    publications: [
      '도형심리 상담 이해와 분석 (2022, 공저)',
      '영유아생활지도 및 상담(2021, 공저)',
      '그림을 통한 아동심리 진단 및 해석 (2020, 공저)',
      '아동문학(2018, 공저)',
      '영유아 발달(2018, 공저)',
      '아동상담(2017, 공저)',
      '영아발달(2015, 공저)',
      '아동 독서치료: 이론과 실제(2010, 공저)',
      '모래놀이심리상담의 이해와 적용(2025, 공저)',
      '애착과 아동정서 중심치료(2017, 공저)',
    ],
    papers: [
      '다문화가정 아동의 사회불안·위축행동 변화를 위한 모래상자치료 사례연구 (모래상자치료연구, 2013)',
      '다문화가정 아동의 모래상자치료 사례분석 연구 (아동과 권리, 2012)',
      '다문화가정 아동의 가족기능과 사회적 능력과의 관계 (심리행동연구, 2012)',
      '다문화가정 수줍음 아동의 독서치료 프로그램 효과 (독서치료연구, 2011)',
      '그림동화책 읽어주기가 다문화가정 아동의 언어능력 향상에 미치는 효과 (특수아동교육연구, 2010)',
      '이혼가정 아동의 정서적 행동 변화를 위한 모래상자치료 사례연구 (모래상자치료연구, 2010)',
    ],
  };

  return (
    <div style={{ paddingTop: 72 }}>
      {/* 헤더 */}
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 0 60px' }}>
          <SectionTitle sub="FACULTY" title="강사진 소개"
            desc="이음통합평생교육원의 전문 강사진을 소개합니다." tweaks={tweaks}/>
        </div>
      </section>

      {/* 원장 프로필 - 확장형 */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: tweaks.accent, letterSpacing: '0.08em', marginBottom: 8 }}>DIRECTOR</div>
            <h3 style={{ fontSize: 26, fontWeight: 700, color: tweaks.text, margin: 0, fontFamily: tweaks.fontHeading }}>원장 프로필</h3>
          </div>

          <Card tweaks={tweaks} hover={false} style={{ padding: 0, overflow: 'hidden' }}>
            {/* 상단 프로필 섹션 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(200px, 260px) 1fr',
              gap: 0,
              background: tweaks.bgMain,
            }} className="faculty-top-grid">
              {/* 사진 영역 */}
              <div style={{
                padding: 36, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: `linear-gradient(135deg, ${tweaks.warmBg}, ${tweaks.primaryLight})`,
                borderRight: `1px solid ${tweaks.border}`,
              }}>
                <div style={{
                  width: 160, height: 200, borderRadius: 16,
                  background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${tweaks.border}`, marginBottom: 16,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ fontSize: 13, color: tweaks.textMuted }}>원장 사진</div>
                </div>
                <div style={{
                  fontSize: 22, fontWeight: 700, color: tweaks.text,
                  fontFamily: tweaks.fontHeading, letterSpacing: '0.05em',
                }}>{director.name}</div>
                <div style={{ fontSize: 13, color: tweaks.primary, fontWeight: 600, marginTop: 6 }}>{director.role}</div>
                <div style={{ fontSize: 12, color: tweaks.textMuted, marginTop: 2 }}>{director.subRole}</div>
              </div>

              {/* 전문 분야 & 소개 */}
              <div style={{ padding: 36 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: tweaks.textMuted, letterSpacing: '0.08em', marginBottom: 10 }}>전문 분야</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                  {director.spec.map((s, i) => (
                    <span key={i} style={{
                      padding: '6px 14px', borderRadius: 20,
                      background: '#fff', border: `1px solid ${tweaks.primary}`,
                      color: tweaks.primary, fontSize: 13, fontWeight: 500,
                    }}>{s}</span>
                  ))}
                </div>
                <p style={{
                  fontSize: 15, color: tweaks.text, lineHeight: 1.9,
                  margin: 0, textWrap: 'pretty',
                }}>
                  아동·영유아 발달심리와 모래놀이심리상담 분야에서 20여 년 간 현장 경험을 쌓아온 
                  전문가입니다. 대학 강단에서의 교육, 공공기관 연수, 지역사회 상담 활동을 통해 
                  이론과 실천을 아우르는 교육을 지향합니다.
                </p>
              </div>
            </div>

            {/* 하단: 학력 / 경력 / 저서 / 논문 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 0,
            }}>
              <FacultyBlock title="학력" items={director.education} tweaks={tweaks} borderRight/>
              <FacultyBlock title="주요 경력" items={director.career} tweaks={tweaks} borderRight/>
              <FacultyBlock title="주요 활동" items={director.activity} tweaks={tweaks}/>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 0,
              borderTop: `1px solid ${tweaks.border}`,
            }}>
              <FacultyBlock title="저서 · 단행본" items={director.publications} tweaks={tweaks} borderRight/>
              <FacultyBlock title="주요 논문" items={director.papers} tweaks={tweaks}/>
            </div>
          </Card>
        </div>
      </section>

      {/* 협력 강사진 */}
      <section style={{ padding: '80px 24px', background: tweaks.bgMain }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: tweaks.accent, letterSpacing: '0.08em', marginBottom: 8 }}>INSTRUCTORS</div>
            <h3 style={{ fontSize: 26, fontWeight: 700, color: tweaks.text, margin: 0, fontFamily: tweaks.fontHeading }}>협력 강사진</h3>
            <p style={{ fontSize: 14, color: tweaks.textMuted, marginTop: 10, lineHeight: 1.7 }}>
              각 분야 전문 교수진이 과정별 강의와 실습 지도를 담당합니다.
            </p>
          </div>

          <Card tweaks={tweaks} hover={false} style={{ textAlign: 'center', padding: 36 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="24" fill={tweaks.primary} opacity="0.1"/>
                <path d="M18 35c2.8-4 5.9-6 10-6s7.2 2 10 6" stroke={tweaks.primary} strokeWidth="2" strokeLinecap="round"/>
                <circle cx="28" cy="21" r="6" stroke={tweaks.primary} strokeWidth="2"/>
              </svg>
            </div>
            <h4 style={{ fontSize: 18, fontWeight: 700, color: tweaks.text, margin: '0 0 10px', fontFamily: tweaks.fontHeading }}>
              협력 강사진은 과정 확정 후 순차 공개합니다
            </h4>
            <p style={{ fontSize: 14, color: tweaks.textMuted, lineHeight: 1.8, margin: 0 }}>
              과정별 강의와 실습 지도는 대한심리통합연구회 및 관련 분야 전문가와 협력해 운영할 예정입니다.
              확정된 강사진과 담당 과목은 모집 공고와 함께 안내합니다.
            </p>
          </Card>

          <div style={{
            marginTop: 24, padding: 20, borderRadius: 12,
            background: '#fff', border: `1px solid ${tweaks.border}`,
            fontSize: 13, color: tweaks.textMuted, lineHeight: 1.8, textAlign: 'center',
          }}>
            ※ 과정별 강사진은 학기마다 일부 변동될 수 있습니다.<br/>
            세부 사항은 교육원에 문의해 주세요. (☎ 062-655-4116)
          </div>
        </div>
      </section>
    </div>
  );
}

/* 강사 프로필 블록 (학력/경력/활동/저서/논문 공통) */
function FacultyBlock({ title, items, tweaks, borderRight = false }) {
  return (
    <div style={{
      padding: 28,
      borderRight: borderRight ? `1px solid ${tweaks.border}` : 'none',
    }} className="faculty-block">
      <div style={{
        fontSize: 12, fontWeight: 700, color: tweaks.accent,
        letterSpacing: '0.1em', marginBottom: 16,
      }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            fontSize: 13.5, color: tweaks.text, lineHeight: 1.75,
            marginBottom: 10, paddingLeft: 14, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 10,
              width: 4, height: 4, borderRadius: '50%',
              background: tweaks.primary, opacity: 0.5,
            }}/>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

window.FacultyPage = FacultyPage;
