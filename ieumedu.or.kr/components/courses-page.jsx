/* ── COURSES PAGE (전면 개편) ── */
function CoursesPage({ setPage, tweaks }) {
  const [tab, setTab] = React.useState('level2'); // level2 | level1 | compare | schedule

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 0 50px' }}>
          <SectionTitle sub="CURRICULUM" title="교육과정 안내"
            desc="모래놀이심리상담사 2급·1급, 대한심리통합연구회 기준 커리큘럼에 따라 체계적으로 운영됩니다."
            tweaks={tweaks}/>

          {/* Tabs */}
          <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginTop:-20 }}>
            {[
              ['level2', '2급 과정'],
              ['level1', '1급 과정'],
              ['compare', '2급 vs 1급'],
              ['schedule', '일정 · 수강료'],
            ].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)}
                style={{
                  padding:'12px 22px', borderRadius:999, fontSize:14, fontWeight:600, cursor:'pointer',
                  border: tab === key ? `1.5px solid ${tweaks.primary}` : `1.5px solid ${tweaks.border}`,
                  background: tab === key ? tweaks.primary : '#fff',
                  color: tab === key ? '#fff' : tweaks.text,
                  fontFamily:'inherit', transition:'all 0.2s',
                }}>{label}</button>
            ))}
          </div>
        </div>
      </section>

      {tab === 'level2' && <Level2Section tweaks={tweaks} setPage={setPage}/>}
      {tab === 'level1' && <Level1Section tweaks={tweaks} setPage={setPage}/>}
      {tab === 'compare' && <CompareSection tweaks={tweaks}/>}
      {tab === 'schedule' && <ScheduleSection tweaks={tweaks} setPage={setPage}/>}
    </div>
  );
}

/* ── 2급 ── */
function Level2Section({ tweaks, setPage }) {
  const parts = [
    {
      title: 'PART Ⅰ. 모래놀이상담의 기초 이해',
      hours: 15,
      chapters: [
        { no:1, name:'모래놀이상담의 이해', h:5, theory:4, practice:1, detail:'정의·역사·치료적 의미, 아동/성인 적용, 놀이의 발달적 의미' },
        { no:2, name:'모래놀이상담의 기본 원리', h:5, theory:3, practice:2, detail:'자유롭고 보호된 공간, 비언어적 표현의 의미, 상담자의 태도' },
        { no:3, name:'모래놀이상담의 주요 이론', h:5, theory:4, practice:1, detail:'Jung 분석심리학, Kalff의 모래놀이치료, 대상관계이론' },
      ],
    },
    {
      title: 'PART Ⅱ. 상담의 구조와 기본 기법',
      hours: 15,
      chapters: [
        { no:4, name:'모래놀이상담의 구조와 환경', h:5, theory:2, practice:3, detail:'모래상자·피규어 구성, 상담실 배치, 회기 운영 구조' },
        { no:5, name:'상담자의 역할과 태도', h:5, theory:2, practice:3, detail:'공감적 관찰, 침묵의 사용, 비지시적 개입의 원칙' },
        { no:6, name:'내담자 이해와 관찰 기법', h:5, theory:2, practice:3, detail:'아동·청소년·성인별 관찰 포인트, 기록·촬영 기법' },
      ],
    },
    {
      title: 'PART Ⅲ. 실습과 체험 중심 학습',
      hours: 20,
      chapters: [
        { no:7, name:'모래놀이 체험 실습', h:5, theory:1, practice:4, detail:'자기 경험 모래놀이, 피규어 선택과 배치 실습' },
        { no:8, name:'상징의 기초 이해', h:5, theory:3, practice:2, detail:'색·형태·위치의 의미, 공통적 상징 패턴 해석 입문' },
        { no:9, name:'사례 관찰 및 분석 실습', h:5, theory:2, practice:3, detail:'사례 영상 관찰, 기록 작성, 토론 중심 학습' },
        { no:10, name:'역할극과 모의상담', h:5, theory:1, practice:4, detail:'상담자-내담자 역할 체험, 피드백 및 자기성찰' },
      ],
    },
    {
      title: 'PART Ⅳ. 사례 · 윤리',
      hours: 10,
      chapters: [
        { no:11, name:'아동·청소년 사례 이해', h:5, theory:3, practice:2, detail:'불안·위축·공격성 등 주요 주제별 모래놀이 흐름' },
        { no:12, name:'상담자 윤리와 자기관리', h:5, theory:4, practice:1, detail:'상담 윤리강령, 비밀보장, 2급 상담자의 역할 한계' },
      ],
    },
  ];

  return (
    <>
      {/* 개요 카드 */}
      <section style={{ padding: '40px 24px 20px', background:'#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16, marginBottom:32 }}>
            {[
              ['총 교육시간', '60시간', '이론 32h · 실습 28h'],
              ['교육 기간', '1월~12월', '1~4월 기본교육 · 5~12월 12회 분산'],
              ['수강 대상', '상담 입문자', '교사 · 부모 · 입문 학습자'],
              ['교육비', '50만 원', '실습·평가비 포함 / 교재·자격증비 별도'],
            ].map(([k, v, sub], i) => (
              <div key={i} style={{ padding:'20px 22px', borderRadius:14, background:tweaks.warmBg, border:`1px solid ${tweaks.border}` }}>
                <div style={{ fontSize:12, color:tweaks.textMuted, fontWeight:600, letterSpacing:'0.04em' }}>{k}</div>
                <div style={{ fontSize:22, fontWeight:700, color:tweaks.primary, marginTop:6, fontFamily:tweaks.fontHeading }}>{v}</div>
                <div style={{ fontSize:12, color:tweaks.textMuted, marginTop:4 }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* 영역 구성 */}
          <div style={{ padding:24, borderRadius:16, background:tweaks.bgMain, marginBottom:40 }}>
            <div style={{ fontSize:14, fontWeight:700, color:tweaks.text, marginBottom:14, fontFamily:tweaks.fontHeading }}>연간 운영 포인트 (2급)</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {[
                ['기초 이론 이해', '입문', tweaks.primary],
                ['상징·관찰 실습', '핵심', tweaks.accent],
                ['관찰·기록 훈련', '핵심', '#7A9B8E'],
                ['상담 윤리·역할 한계', '필수', '#C89B6F'],
                ['5~12월 반복 사례 리뷰', '12회', '#9C7CAE'],
              ].map(([n, h, c], i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:999, background:'#fff', border:`1px solid ${tweaks.border}`, fontSize:13 }}>
                  <span style={{ width:10, height:10, borderRadius:'50%', background:c }}/>
                  <strong style={{ color:tweaks.text }}>{n}</strong>
                  <span style={{ color:tweaks.textMuted }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PART별 커리큘럼 */}
      <section style={{ padding: '20px 24px 60px', background:'#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontSize:22, fontWeight:700, color:tweaks.text, margin:'0 0 24px', fontFamily:tweaks.fontHeading }}>세부 커리큘럼 · 12장</h3>

          <div style={{ display:'grid', gap:20 }}>
            {parts.map((part, pi) => (
              <div key={pi} style={{ border:`1px solid ${tweaks.border}`, borderRadius:16, overflow:'hidden' }}>
                <div style={{ padding:'18px 24px', background:tweaks.primary, color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
                  <div style={{ fontSize:16, fontWeight:700, fontFamily:tweaks.fontHeading }}>{part.title}</div>
                  <div style={{ fontSize:13, opacity:0.9 }}>{part.hours}시간</div>
                </div>
                <div style={{ padding:'8px 0' }}>
                  {part.chapters.map((ch, ci) => (
                    <div key={ci} style={{ display:'grid', gridTemplateColumns:'48px 1fr auto', gap:16, padding:'16px 24px', borderBottom: ci < part.chapters.length-1 ? `1px solid ${tweaks.border}` : 'none', alignItems:'start' }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:tweaks.primaryLight, color:tweaks.primary, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, fontFamily:tweaks.fontHeading }}>{String(ch.no).padStart(2,'0')}</div>
                      <div>
                        <div style={{ fontSize:15, fontWeight:600, color:tweaks.text, marginBottom:4 }}>{ch.name}</div>
                        <div style={{ fontSize:13, color:tweaks.textMuted, lineHeight:1.6 }}>{ch.detail}</div>
                      </div>
                      <div style={{ textAlign:'right', fontSize:12, color:tweaks.textMuted, whiteSpace:'nowrap', lineHeight:1.6 }}>
                        <div style={{ fontWeight:700, color:tweaks.text, fontSize:15 }}>{ch.h}h</div>
                        <div>이론 {ch.theory} · 실습 {ch.practice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 수료 후 */}
          <div style={{ marginTop:32, padding:24, borderRadius:16, background:tweaks.warmBg, border:`1px solid ${tweaks.border}` }}>
            <h4 style={{ fontSize:16, fontWeight:700, color:tweaks.text, margin:'0 0 12px', fontFamily:tweaks.fontHeading }}>수료 후 취득 자격 · 역할</h4>
            <div style={{ fontSize:14, color:tweaks.text, lineHeight:1.9 }}>
              • <strong>모래놀이심리상담사 2급</strong> 민간자격 취득<br/>
              • 발급기관: 대한심리통합연구회 (한국직업능력연구원 등록)<br/>
              • <strong style={{ color:tweaks.primary }}>공개 수강료:</strong> 50만 원 (실습·평가비 포함 / 교재·자격증비 별도)<br/>
              • <strong style={{ color:tweaks.primary }}>역할 범위:</strong> 1급 상담사의 지도 아래 상담 보조, 내담자 관찰·기록, 기초 상담 진행<br/>
              • <strong style={{ color:tweaks.primary }}>역할 한계:</strong> 독립적 상담 설계·해석·개입은 불가 (1급 이상 권한)
            </div>
          </div>

          <div style={{ textAlign:'center', marginTop:28 }}>
            <Btn tweaks={tweaks} onClick={() => setPage('enroll')}>2급 과정 신청 · 문의 →</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── 1급 ── */
function Level1Section({ tweaks, setPage }) {
  const parts = [
    {
      title: 'PART Ⅰ. 심층 이론과 분석',
      hours: 25,
      chapters: [
        { no:1, name:'융 분석심리학 심화', h:10, theory:8, practice:2, detail:'자아·자기·그림자·페르소나, 개성화 과정, 집단 무의식' },
        { no:2, name:'Kalff 모래놀이치료 심화', h:10, theory:7, practice:3, detail:'자유롭고 보호된 공간, 치유의 단계, 모-자 일체감' },
        { no:3, name:'상징과 원형의 이해', h:5, theory:4, practice:1, detail:'보편적 원형, 문화적 상징, 개인 무의식의 상징화' },
      ],
    },
    {
      title: 'PART Ⅱ. 상징 해석과 사례 분석',
      hours: 25,
      chapters: [
        { no:4, name:'모래상자의 상징 해석', h:10, theory:5, practice:5, detail:'공간 구조·방향성·중심화, 피규어 군집의 의미' },
        { no:5, name:'발달단계별 모래놀이 특성', h:10, theory:5, practice:5, detail:'영유아·아동·청소년·성인·노인 각 단계의 전형적 표현' },
        { no:6, name:'정신병리와 모래놀이', h:5, theory:3, practice:2, detail:'트라우마·우울·불안·해리 등 주제별 상자 특성' },
      ],
    },
    {
      title: 'PART Ⅲ. 상담 설계와 개입',
      hours: 25,
      chapters: [
        { no:7, name:'상담 과정 설계와 계획 수립', h:10, theory:4, practice:6, detail:'초기상담·목표설정·회기설계·종결, 사례개념화' },
        { no:8, name:'치료적 개입 기법', h:10, theory:4, practice:6, detail:'언어적 반영, 해석 시점, 저항 다루기, 전이·역전이' },
        { no:9, name:'가족·집단 모래놀이', h:5, theory:2, practice:3, detail:'공동 상자 작업, 가족 역동의 해석과 개입' },
      ],
    },
    {
      title: 'PART Ⅳ. 슈퍼비전 · 윤리 · 지도',
      hours: 15,
      chapters: [
        { no:10, name:'사례 발표 및 슈퍼비전', h:5, theory:1, practice:4, detail:'본인 상담 사례 발표, 전문가 슈퍼비전 · 피드백' },
        { no:11, name:'2급 지도자로서의 역량', h:5, theory:2, practice:3, detail:'2급 상담사 지도·코칭, 교육과정 운영 실무' },
        { no:12, name:'상담자 윤리와 전문가 정체성', h:5, theory:3, practice:2, detail:'윤리적 의사결정, 자기분석, 지속적 수련 체계' },
      ],
    },
  ];

  return (
    <>
      <section style={{ padding: '40px 24px 20px', background:'#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16, marginBottom:32 }}>
            {[
              ['총 교육시간', '90시간', '이론 50h · 실습 40h'],
              ['교육 기간', '1월~12월', '1~5월 기본교육 · 6~12월 12회 분산'],
              ['수강 대상', '2급 수료자', '상담 경험자 중심 심화 과정'],
              ['교육비', '70만 원', '실습·평가비 포함 / 교재·자격증비 별도'],
            ].map(([k, v, sub], i) => (
              <div key={i} style={{ padding:'20px 22px', borderRadius:14, background:tweaks.warmBg, border:`1px solid ${tweaks.border}` }}>
                <div style={{ fontSize:12, color:tweaks.textMuted, fontWeight:600, letterSpacing:'0.04em' }}>{k}</div>
                <div style={{ fontSize:22, fontWeight:700, color:tweaks.primary, marginTop:6, fontFamily:tweaks.fontHeading }}>{v}</div>
                <div style={{ fontSize:12, color:tweaks.textMuted, marginTop:4 }}>{sub}</div>
              </div>
            ))}
          </div>

          <div style={{ padding:24, borderRadius:16, background:tweaks.bgMain, marginBottom:40 }}>
            <div style={{ fontSize:14, fontWeight:700, color:tweaks.text, marginBottom:14, fontFamily:tweaks.fontHeading }}>연간 운영 포인트 (1급)</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {[
                ['분석심리학 심화', '핵심', tweaks.primary],
                ['상징 해석 훈련', '핵심', tweaks.accent],
                ['개입 언어·기록 작성', '핵심', '#7A9B8E'],
                ['사례 발표·시뮬레이션', '실습', '#C89B6F'],
                ['2급 지도·윤리 판단', '심화', '#9C7CAE'],
              ].map(([n, h, c], i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:999, background:'#fff', border:`1px solid ${tweaks.border}`, fontSize:13 }}>
                  <span style={{ width:10, height:10, borderRadius:'50%', background:c }}/>
                  <strong style={{ color:tweaks.text }}>{n}</strong>
                  <span style={{ color:tweaks.textMuted }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 24px 60px', background:'#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontSize:22, fontWeight:700, color:tweaks.text, margin:'0 0 24px', fontFamily:tweaks.fontHeading }}>세부 커리큘럼 · 12장</h3>

          <div style={{ display:'grid', gap:20 }}>
            {parts.map((part, pi) => (
              <div key={pi} style={{ border:`1px solid ${tweaks.border}`, borderRadius:16, overflow:'hidden' }}>
                <div style={{ padding:'18px 24px', background:tweaks.text, color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
                  <div style={{ fontSize:16, fontWeight:700, fontFamily:tweaks.fontHeading }}>{part.title}</div>
                  <div style={{ fontSize:13, opacity:0.85 }}>{part.hours}시간</div>
                </div>
                <div style={{ padding:'8px 0' }}>
                  {part.chapters.map((ch, ci) => (
                    <div key={ci} style={{ display:'grid', gridTemplateColumns:'48px 1fr auto', gap:16, padding:'16px 24px', borderBottom: ci < part.chapters.length-1 ? `1px solid ${tweaks.border}` : 'none', alignItems:'start' }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:tweaks.primaryLight, color:tweaks.primary, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, fontFamily:tweaks.fontHeading }}>{String(ch.no).padStart(2,'0')}</div>
                      <div>
                        <div style={{ fontSize:15, fontWeight:600, color:tweaks.text, marginBottom:4 }}>{ch.name}</div>
                        <div style={{ fontSize:13, color:tweaks.textMuted, lineHeight:1.6 }}>{ch.detail}</div>
                      </div>
                      <div style={{ textAlign:'right', fontSize:12, color:tweaks.textMuted, whiteSpace:'nowrap', lineHeight:1.6 }}>
                        <div style={{ fontWeight:700, color:tweaks.text, fontSize:15 }}>{ch.h}h</div>
                        <div>이론 {ch.theory} · 실습 {ch.practice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:32, padding:24, borderRadius:16, background:tweaks.warmBg, border:`1px solid ${tweaks.border}` }}>
            <h4 style={{ fontSize:16, fontWeight:700, color:tweaks.text, margin:'0 0 12px', fontFamily:tweaks.fontHeading }}>수료 후 취득 자격 · 역할</h4>
            <div style={{ fontSize:14, color:tweaks.text, lineHeight:1.9 }}>
              • <strong>모래놀이심리상담사 1급</strong> 민간자격 취득<br/>
              • <strong style={{ color:tweaks.primary }}>공개 수강료:</strong> 70만 원 (실습·평가비 포함 / 교재·자격증비 별도)<br/>
              • <strong style={{ color:tweaks.primary }}>역할 범위:</strong> 상담 과정 설계 · 상징 해석 · 치료적 개입, 사례개념화, 종결까지 주도<br/>
              • <strong style={{ color:tweaks.primary }}>지도 권한:</strong> 2급 상담사 지도 · 슈퍼비전 가능<br/>
              • <strong style={{ color:tweaks.primary }}>활동 영역:</strong> 상담센터, 교육기관, 프리랜서 상담사, 강사 · 연구 활동
            </div>
          </div>

          <div style={{ textAlign:'center', marginTop:28 }}>
            <Btn tweaks={tweaks} onClick={() => setPage('enroll')}>1급 과정 신청 · 문의 →</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── 2급 vs 1급 비교 ── */
function CompareSection({ tweaks }) {
  const rows = [
    ['총 교육시간', '60시간', '90시간'],
    ['이론 : 실습', '32h : 28h (53:47)', '50h : 40h (56:44)'],
    ['교육 기간', '1~4월 기본교육 + 5~12월 12회 분산', '1~5월 기본교육 + 6~12월 12회 분산'],
    ['수강 대상', '상담 입문자 · 교사 · 부모', '2급 수료자 · 상담 경험자'],
    ['핵심 역량', '관찰 · 기록 · 보조', '해석 · 개입 · 지도'],
    ['상담 역할', '상담 보조, 내담자 관찰', '주 상담자, 사례 설계·종결'],
    ['해석 권한', '제한적 (지도자 하에)', '독립적 상징 해석 가능'],
    ['지도 권한', '없음', '2급 상담사 지도·슈퍼비전'],
    ['교육비', '500,000원', '700,000원'],
  ];

  return (
    <section style={{ padding: '40px 24px 80px', background:'#fff' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ border:`1px solid ${tweaks.border}`, borderRadius:16, overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr', background:tweaks.bgMain, padding:'16px 20px', fontWeight:700, fontSize:14, color:tweaks.text }}>
            <div>구분</div>
            <div style={{ textAlign:'center', color:tweaks.primary }}>2급</div>
            <div style={{ textAlign:'center', color:tweaks.text }}>1급</div>
          </div>
          {rows.map(([k, v2, v1], i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr', padding:'16px 20px', borderTop:`1px solid ${tweaks.border}`, fontSize:14, alignItems:'center' }}>
              <div style={{ fontWeight:600, color:tweaks.textMuted }}>{k}</div>
              <div style={{ textAlign:'center', color:tweaks.text }}>{v2}</div>
              <div style={{ textAlign:'center', color:tweaks.text, fontWeight: i === rows.length-1 ? 700 : 400 }}>{v1}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:32, padding:24, borderRadius:16, background:tweaks.warmBg, border:`1px solid ${tweaks.border}` }}>
          <h4 style={{ fontSize:16, fontWeight:700, color:tweaks.text, margin:'0 0 10px', fontFamily:tweaks.fontHeading }}>어떤 과정을 선택해야 할까요?</h4>
          <div style={{ fontSize:14, color:tweaks.text, lineHeight:1.9 }}>
            • <strong>심리상담 입문 · 교사 · 학부모</strong> → <strong style={{ color:tweaks.primary }}>2급부터</strong> 시작하세요.<br/>
            • <strong>2급 수료자 · 상담 경험자 · 전문 상담사 지망</strong> → <strong style={{ color:tweaks.primary }}>1급</strong>으로 심화하세요.<br/>
            • 할인·장학·연계 수강 정책은 모집 공고 시점에 별도 안내합니다.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 일정 · 수강료 ── */
function ScheduleSection({ tweaks, setPage }) {
  return (
    <>
      {/* 인가 안내 Hero */}
      <section style={{ padding: '40px 24px 20px', background:'#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* 인가 진행 안내 박스 */}
          <div style={{
            padding: 40, borderRadius: 20, background: tweaks.warmBg,
            border: `1.5px solid ${tweaks.border}`, textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            {/* 데코 배경 */}
            <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:tweaks.primaryLight, opacity:0.6 }}/>
            <div style={{ position:'absolute', bottom:-30, left:-30, width:120, height:120, borderRadius:'50%', background:tweaks.primaryLight, opacity:0.4 }}/>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:999, background:'#fff', border:`1px solid ${tweaks.border}`, fontSize:12, fontWeight:700, color:tweaks.primary, letterSpacing:'0.05em', marginBottom:20 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:tweaks.accent, display:'inline-block' }}/>
                NOTICE · 인가 절차 진행 중
              </div>
              <h2 style={{ fontSize:28, fontWeight:800, color:tweaks.text, margin:'0 0 16px', fontFamily:tweaks.fontHeading, lineHeight:1.4, textWrap:'pretty' }}>
                2026년 연간 교육계획안 기준 수강료를 공개합니다.<br/>개강 일정은 인가 승인 후 공지됩니다.
              </h2>
              <p style={{ fontSize:15, color:tweaks.textMuted, lineHeight:1.9, margin:'0 auto', maxWidth: 600, textWrap:'pretty' }}>
                본 교육원은 현재 <strong style={{ color:tweaks.text }}>광주광역시 서구청에 평생교육시설 등록 및 인가 절차</strong>를 진행하고 있습니다.<br/>
                수강료는 공개되었으며, 인가 승인 후 정식 개강 일정과 모집 공고를 <strong style={{ color:tweaks.text }}>공지사항</strong>을 통해 안내드립니다.
              </p>

              <div style={{ marginTop:32, display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
                <Btn tweaks={tweaks} onClick={() => setPage('enroll')}>관심 등록 · 사전 문의</Btn>
                <Btn tweaks={tweaks} variant="outline" onClick={() => window.open('tel:062-655-4116')}>☎ 062-655-4116</Btn>
              </div>
            </div>
          </div>

          {/* 진행 상황 체크리스트 */}
          <div style={{ marginTop:40 }}>
            <h3 style={{ fontSize:18, fontWeight:700, color:tweaks.text, margin:'0 0 20px', fontFamily:tweaks.fontHeading }}>인가 진행 절차</h3>
            <div style={{ display:'grid', gap:12 }}>
              {[
                { step:'01', label:'교육 과정 커리큘럼 설계', status:'done', desc:'2급·1급 12장 세부 커리큘럼 확정' },
                { step:'02', label:'강사진 구성 및 연구회 협력 체계 마련', status:'done', desc:'대한심리통합연구회 공동 운영' },
                { step:'03', label:'평생교육시설 등록 · 인가 신청', status:'progress', desc:'광주광역시 서구청 접수 · 심사 진행 중' },
                { step:'04', label:'인가 승인 및 정식 개강 일정 공지', status:'wait', desc:'승인 후 홈페이지 · 공지사항에 공개' },
                { step:'05', label:'수강 신청 접수 개시', status:'wait', desc:'선착순 모집 · 과정별 정원 12명' },
              ].map((s, i) => {
                const isDone = s.status === 'done';
                const isProg = s.status === 'progress';
                const color = isDone ? '#4CAF50' : isProg ? tweaks.primary : tweaks.textMuted;
                const bg = isDone ? '#E8F5E9' : isProg ? tweaks.primaryLight : tweaks.bgMain;
                return (
                  <div key={i} style={{
                    display:'grid', gridTemplateColumns:'auto 1fr auto', gap:16, alignItems:'center',
                    padding:'18px 20px', borderRadius:14,
                    background: isProg ? tweaks.warmBg : '#fff',
                    border:`1px solid ${isProg ? tweaks.primary : tweaks.border}`,
                  }}>
                    <div style={{ width:40, height:40, borderRadius:10, background:bg, color:color, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontFamily:tweaks.fontHeading, fontSize:14 }}>
                      {isDone ? '✓' : s.step}
                    </div>
                    <div>
                      <div style={{ fontSize:15, fontWeight:700, color:tweaks.text, fontFamily:tweaks.fontHeading }}>{s.label}</div>
                      <div style={{ fontSize:13, color:tweaks.textMuted, marginTop:2 }}>{s.desc}</div>
                    </div>
                    <div>
                      <span style={{ padding:'4px 12px', borderRadius:999, background:bg, color:color, fontSize:12, fontWeight:700 }}>
                        {isDone ? '완료' : isProg ? '진행중' : '대기'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 공개된 교육 프레임 */}
      <section style={{ padding: '60px 24px', background: tweaks.bgMain }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontSize:22, fontWeight:700, color:tweaks.text, margin:'0 0 8px', fontFamily:tweaks.fontHeading, textAlign:'center' }}>확정된 교육 프레임</h3>
          <p style={{ fontSize:14, color:tweaks.textMuted, textAlign:'center', margin:'0 0 32px' }}>
            커리큘럼과 수강료는 공개되었으며, 개강 일정은 인가 승인 후 공지됩니다.
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:20 }}>
            {[
              { level:'2급', title:'모래놀이심리상담사 2급', hours:'총 60시간', parts:'1~4월 기본교육 · 5~12월 12회 분산', feature:'입문자·교사·부모 대상 / 상담 보조·관찰·기록 중심' },
              { level:'1급', title:'모래놀이심리상담사 1급', hours:'총 90시간', parts:'1~5월 기본교육 · 6~12월 12회 분산', feature:'2급 수료자·상담 경험자 대상 / 설계·개입·2급 지도 중심' },
            ].map((c, i) => (
              <Card key={i} tweaks={tweaks} hover={false}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:tweaks.primaryLight, color:tweaks.primary, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontFamily:tweaks.fontHeading, fontSize:16 }}>{c.level}</div>
                  <div>
                    <div style={{ fontSize:17, fontWeight:700, color:tweaks.text, fontFamily:tweaks.fontHeading }}>{c.title}</div>
                    <div style={{ fontSize:12, color:tweaks.accent, fontWeight:600, marginTop:2 }}>{c.hours} · {c.parts}</div>
                  </div>
                </div>
                <div style={{ padding:14, borderRadius:10, background:tweaks.bgMain, fontSize:13, color:tweaks.text, lineHeight:1.8 }}>
                  {c.feature}
                </div>
                <div style={{ marginTop:16, padding:'12px 14px', borderRadius:10, background:tweaks.warmBg, border:`1px dashed ${tweaks.border}`, display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:tweaks.accent, letterSpacing:'0.06em' }}>개강 일정</span>
                  <span style={{ fontSize:13, color:tweaks.textMuted, fontWeight:500 }}>인가 승인 후 공지</span>
                </div>
                <div style={{ marginTop:8, padding:'12px 14px', borderRadius:10, background:tweaks.warmBg, border:`1px dashed ${tweaks.border}`, display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:tweaks.accent, letterSpacing:'0.06em' }}>수 강 료</span>
                  <span style={{ fontSize:13, color:tweaks.textMuted, fontWeight:500 }}>{i === 0 ? '50만 원' : '70만 원'}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 관심 등록 CTA */}
      <section style={{ padding: '60px 24px 80px', background:'#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign:'center' }}>
          <div style={{ display:'inline-block', padding:'6px 14px', borderRadius:20, background:tweaks.primaryLight, fontSize:12, fontWeight:700, color:tweaks.primary, letterSpacing:'0.05em', marginBottom:16 }}>
            PRE-REGISTRATION
          </div>
          <h3 style={{ fontSize:24, fontWeight:700, color:tweaks.text, margin:'0 0 14px', fontFamily:tweaks.fontHeading, textWrap:'pretty' }}>
            먼저 소식을 받아보고 싶으시다면
          </h3>
          <p style={{ fontSize:15, color:tweaks.textMuted, lineHeight:1.9, margin:'0 0 28px', textWrap:'pretty' }}>
            관심 등록을 남겨주시면 인가 승인 및 모집 개시 시점에<br/>
            개별 안내 드리겠습니다. (법적 효력이 있는 수강 신청은 아닙니다)
          </p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn tweaks={tweaks} onClick={() => setPage('enroll')}>관심 등록 · 사전 문의 →</Btn>
            <Btn tweaks={tweaks} variant="outline" onClick={() => setPage('notice')}>공지사항 보기</Btn>
          </div>
          <div style={{ marginTop:32, padding:20, borderRadius:12, background:tweaks.bgMain, fontSize:12, color:tweaks.textMuted, lineHeight:1.8, textAlign:'left' }}>
            ※ 본 안내는 인가 절차 진행 중 정보이며, 커리큘럼·시수·수강료는 공개 기준으로 운영하되 <strong style={{ color:tweaks.text }}>개강일·모집정원 등은 인가 승인 이후 최종 확정</strong>됩니다.<br/>
            ※ 민간자격 <strong style={{ color:tweaks.text }}>「모래놀이심리상담사」</strong>는 대한심리통합연구회가 발급하며, 한국직업능력연구원에 등록된 민간자격입니다.<br/>
            ※ 본 자격은 국가공인 자격이 아닙니다.
          </div>
        </div>
      </section>
    </>
  );
}

window.CoursesPage = CoursesPage;
