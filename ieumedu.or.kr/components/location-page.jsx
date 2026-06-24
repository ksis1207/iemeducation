/* ── LOCATION PAGE (오시는 길) ── */
function LocationPage({ tweaks, setPage }) {
  const address = '광주광역시 서구 회재로 859, 3층';
  const addressEncoded = encodeURIComponent(address);
  const naverMapUrl = `https://map.naver.com/p/search/${addressEncoded}`;
  const kakaoMapUrl = `https://map.kakao.com/?q=${addressEncoded}`;

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ padding: '64px 24px 0', background: tweaks.warmBg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 0 60px' }}>
          <SectionTitle sub="LOCATION" title="오시는 길"
            desc="광주 서구 풍암동에 위치한 이음통합평생교육원으로 찾아오시는 길을 안내합니다."
            tweaks={tweaks}/>
        </div>
      </section>

      {/* 지도 영역 (정적 지도 일러스트) */}
      <section style={{ padding: '40px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ position:'relative', borderRadius:16, overflow:'hidden', border:`1px solid ${tweaks.border}`, height:420, background:'#E8EFE5' }}>
            {/* SVG 일러스트 지도 */}
            <svg viewBox="0 0 1000 420" style={{ width:'100%', height:'100%', display:'block' }} preserveAspectRatio="xMidYMid slice">
              {/* 배경 */}
              <rect width="1000" height="420" fill="#E8EFE5"/>
              {/* 녹지 */}
              <ellipse cx="150" cy="80" rx="120" ry="60" fill="#C8D9BE" opacity="0.6"/>
              <ellipse cx="850" cy="340" rx="140" ry="70" fill="#C8D9BE" opacity="0.6"/>
              <ellipse cx="700" cy="100" rx="80" ry="40" fill="#C8D9BE" opacity="0.6"/>
              {/* 강 */}
              <path d="M0,280 Q200,260 400,290 T1000,270 L1000,320 Q800,340 600,315 T0,330 Z" fill="#B8D4E3" opacity="0.7"/>
              <text x="120" y="310" fontSize="12" fill="#5A8AA0" fontWeight="600">광주천</text>
              {/* 주요 도로 */}
              <path d="M0,210 L1000,200" stroke="#fff" strokeWidth="22"/>
              <path d="M0,210 L1000,200" stroke="#D4C4A8" strokeWidth="20"/>
              <text x="50" y="195" fontSize="13" fill="#7A6B5D" fontWeight="600">← 회재로</text>
              <text x="900" y="195" fontSize="13" fill="#7A6B5D" fontWeight="600">회재로 →</text>

              <path d="M500,0 L500,420" stroke="#fff" strokeWidth="18"/>
              <path d="M500,0 L500,420" stroke="#D4C4A8" strokeWidth="16"/>
              <text x="510" y="30" fontSize="12" fill="#7A6B5D" fontWeight="600">↑ 풍암지구</text>

              <path d="M200,0 L200,420" stroke="#fff" strokeWidth="12"/>
              <path d="M200,0 L200,420" stroke="#E4D4B8" strokeWidth="10"/>
              <path d="M780,0 L780,420" stroke="#fff" strokeWidth="12"/>
              <path d="M780,0 L780,420" stroke="#E4D4B8" strokeWidth="10"/>

              {/* 건물들 */}
              <rect x="80" y="130" width="60" height="50" fill="#F5F0E8" stroke="#C8B89A" strokeWidth="1.5"/>
              <rect x="280" y="140" width="50" height="45" fill="#F5F0E8" stroke="#C8B89A" strokeWidth="1.5"/>
              <rect x="350" y="130" width="45" height="55" fill="#F5F0E8" stroke="#C8B89A" strokeWidth="1.5"/>
              <rect x="580" y="130" width="55" height="50" fill="#F5F0E8" stroke="#C8B89A" strokeWidth="1.5"/>
              <rect x="650" y="140" width="40" height="40" fill="#F5F0E8" stroke="#C8B89A" strokeWidth="1.5"/>
              <rect x="820" y="130" width="50" height="50" fill="#F5F0E8" stroke="#C8B89A" strokeWidth="1.5"/>

              <rect x="100" y="240" width="55" height="45" fill="#F5F0E8" stroke="#C8B89A" strokeWidth="1.5"/>
              <rect x="300" y="240" width="60" height="50" fill="#F5F0E8" stroke="#C8B89A" strokeWidth="1.5"/>
              <rect x="620" y="240" width="50" height="45" fill="#F5F0E8" stroke="#C8B89A" strokeWidth="1.5"/>

              {/* 근처 랜드마크 */}
              <text x="100" y="165" fontSize="11" fill="#7A6B5D">풍암호수공원</text>
              <text x="350" y="165" fontSize="11" fill="#7A6B5D">서구문화센터</text>
              <text x="650" y="165" fontSize="11" fill="#7A6B5D">풍암초등학교</text>

              {/* 본원 위치 마커 */}
              <g transform="translate(460, 220)">
                <circle r="32" fill={tweaks.primary} opacity="0.15"/>
                <circle r="20" fill={tweaks.primary} opacity="0.3"/>
                <circle r="10" fill={tweaks.primary}/>
                <path d="M0,-28 Q-14,-28 -14,-14 Q-14,0 0,18 Q14,0 14,-14 Q14,-28 0,-28 Z" fill={tweaks.primary}/>
                <circle cx="0" cy="-16" r="5" fill="#fff"/>
              </g>
              <rect x="490" y="200" width="160" height="44" rx="8" fill="#fff" stroke={tweaks.primary} strokeWidth="2"/>
              <text x="500" y="220" fontSize="13" fill={tweaks.text} fontWeight="700">이음통합평생교육원</text>
              <text x="500" y="235" fontSize="11" fill={tweaks.textMuted}>회재로 859, 3층</text>
            </svg>

            {/* 주소 오버레이 */}
            <div style={{ position:'absolute', top:20, left:20, padding:'12px 18px', background:'rgba(255,255,255,0.95)', borderRadius:12, backdropFilter:'blur(6px)', boxShadow:'0 4px 16px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize:11, fontWeight:700, color:tweaks.primary, letterSpacing:'0.08em' }}>ADDRESS</div>
              <div style={{ fontSize:15, fontWeight:700, color:tweaks.text, marginTop:4 }}>광주 서구 회재로 859, 3층</div>
            </div>

            {/* 지도 링크 */}
            <div style={{ position:'absolute', bottom:20, right:20, display:'flex', gap:8 }}>
              <a href={naverMapUrl} target="_blank" rel="noopener"
                 style={{ padding:'10px 18px', background:'#03C75A', color:'#fff', borderRadius:10, fontSize:13, fontWeight:700, textDecoration:'none', boxShadow:'0 4px 12px rgba(0,0,0,0.15)' }}>
                네이버 지도 열기 →
              </a>
              <a href={kakaoMapUrl} target="_blank" rel="noopener"
                 style={{ padding:'10px 18px', background:'#FEE500', color:'#3C1E1E', borderRadius:10, fontSize:13, fontWeight:700, textDecoration:'none', boxShadow:'0 4px 12px rgba(0,0,0,0.15)' }}>
                카카오맵 열기 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 상세 정보 */}
      <section style={{ padding: '40px 24px 80px', background:'#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:20 }}>
          {/* 주소 */}
          <Card tweaks={tweaks} hover={false}>
            <div style={{ width:44, height:44, borderRadius:12, background:tweaks.primaryLight, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tweaks.primary} strokeWidth="2">
                <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <h4 style={{ fontSize:15, fontWeight:700, color:tweaks.text, margin:'0 0 10px', fontFamily:tweaks.fontHeading }}>주소</h4>
            <div style={{ fontSize:14, color:tweaks.text, lineHeight:1.7 }}>
              광주광역시 서구 회재로 859, 3층<br/>
              <span style={{ fontSize:13, color:tweaks.textMuted }}>(풍암동, 이음통합평생교육원)</span>
            </div>
          </Card>

          {/* 전화 */}
          <Card tweaks={tweaks} hover={false}>
            <div style={{ width:44, height:44, borderRadius:12, background:tweaks.primaryLight, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tweaks.primary} strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <h4 style={{ fontSize:15, fontWeight:700, color:tweaks.text, margin:'0 0 10px', fontFamily:tweaks.fontHeading }}>전화 · 팩스</h4>
            <div style={{ fontSize:14, color:tweaks.text, lineHeight:1.7 }}>
              전화 <a href="tel:062-655-4116" style={{ color:tweaks.primary, fontWeight:700, textDecoration:'none' }}>062-655-4116</a><br/>
              <span style={{ fontSize:13, color:tweaks.textMuted }}>평일 09:00 ~ 18:00</span>
            </div>
          </Card>

          {/* 운영시간 */}
          <Card tweaks={tweaks} hover={false}>
            <div style={{ width:44, height:44, borderRadius:12, background:tweaks.primaryLight, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tweaks.primary} strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h4 style={{ fontSize:15, fontWeight:700, color:tweaks.text, margin:'0 0 10px', fontFamily:tweaks.fontHeading }}>운영시간</h4>
            <div style={{ fontSize:14, color:tweaks.text, lineHeight:1.7 }}>
              평일 09:00 – 18:00<br/>
              토요일 10:00 – 15:00<br/>
              <span style={{ fontSize:13, color:tweaks.textMuted }}>일요일 · 공휴일 휴무</span>
            </div>
          </Card>
        </div>
      </section>

      {/* 교통편 */}
      <section style={{ padding: '60px 24px', background: tweaks.bgMain }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontSize:22, fontWeight:700, color:tweaks.text, margin:'0 0 24px', fontFamily:tweaks.fontHeading }}>교통편 안내</h3>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:20 }}>
            {/* 버스 */}
            <div style={{ padding:24, borderRadius:16, background:'#fff', border:`1px solid ${tweaks.border}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'#2E7D32', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14 }}>BUS</div>
                <h4 style={{ fontSize:16, fontWeight:700, color:tweaks.text, margin:0, fontFamily:tweaks.fontHeading }}>버스 이용 시</h4>
              </div>
              <div style={{ fontSize:14, color:tweaks.text, lineHeight:2 }}>
                <strong>방문 전 최신 대중교통 경로를 확인해 주세요.</strong>
                <div style={{ marginTop:12, fontSize:13, color:tweaks.textMuted }}>
                  버스 노선과 하차 정류장은 운행 개편에 따라 달라질 수 있으므로 네이버 지도 또는 카카오맵 길찾기를 기준으로 안내받으시는 것을 권장합니다.
                </div>
              </div>
            </div>

            {/* 지하철 */}
            <div style={{ padding:24, borderRadius:16, background:'#fff', border:`1px solid ${tweaks.border}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'#E65100', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:13 }}>METRO</div>
                <h4 style={{ fontSize:16, fontWeight:700, color:tweaks.text, margin:0, fontFamily:tweaks.fontHeading }}>지하철 이용 시</h4>
              </div>
              <div style={{ fontSize:14, color:tweaks.text, lineHeight:2 }}>
                <strong>광주도시철도 이용 시</strong><br/>
                가까운 역에서 버스 또는 택시로 환승해 이동하실 수 있습니다.<br/>
                <span style={{ color:tweaks.textMuted, fontSize:13 }}>정확한 이동 시간은 길찾기 서비스 기준으로 확인해 주세요.</span>
              </div>
            </div>

            {/* 자가용 */}
            <div style={{ padding:24, borderRadius:16, background:'#fff', border:`1px solid ${tweaks.border}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'#1565C0', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14 }}>CAR</div>
                <h4 style={{ fontSize:16, fontWeight:700, color:tweaks.text, margin:0, fontFamily:tweaks.fontHeading }}>자가용 이용 시</h4>
              </div>
              <div style={{ fontSize:14, color:tweaks.text, lineHeight:2 }}>
                내비게이션에 <strong>「이음통합평생교육원」</strong> 또는<br/>
                <strong>「광주 서구 회재로 859」</strong> 입력<br/>
                <span style={{ color:tweaks.textMuted, fontSize:13 }}>※ 건물 앞 · 인근 공영주차장 이용 가능</span>
              </div>
            </div>
          </div>

          {/* 주차 안내 */}
          <div style={{ marginTop:20, padding:24, borderRadius:16, background:tweaks.warmBg, border:`1px solid ${tweaks.border}`, display:'flex', gap:16, alignItems:'flex-start' }}>
            <div style={{ width:40, height:40, borderRadius:10, background:tweaks.primary, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, flexShrink:0, fontFamily:tweaks.fontHeading }}>P</div>
            <div style={{ fontSize:14, color:tweaks.text, lineHeight:1.9 }}>
              <strong style={{ fontSize:15, color:tweaks.text, fontFamily:tweaks.fontHeading }}>주차 안내</strong><br/>
              • 건물 및 인근 주차 가능 여부는 방문 시간대에 따라 달라질 수 있습니다.<br/>
              • 대면 상담 또는 수업 참석 전 교육원으로 주차 가능 여부를 확인해 주세요.<br/>
              • <span style={{ color:tweaks.textMuted }}>※ 확정되지 않은 무료 주차 혜택은 별도 안내 전까지 제공하지 않습니다.</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 24px', background:'#fff', textAlign:'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h3 style={{ fontSize:22, fontWeight:700, color:tweaks.text, margin:'0 0 12px', fontFamily:tweaks.fontHeading }}>방문 전 꼭 연락 주세요</h3>
          <p style={{ fontSize:15, color:tweaks.textMuted, marginBottom:24, lineHeight:1.7 }}>
            상담실 운영 상황에 따라 대면 상담이 어려울 수 있어<br/>
            방문 전 전화 예약을 권장드립니다.
          </p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn tweaks={tweaks} onClick={() => window.open('tel:062-655-4116')}>☎ 062-655-4116 전화하기</Btn>
            <Btn tweaks={tweaks} variant="outline" onClick={() => setPage('enroll')}>온라인 문의하기</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

window.LocationPage = LocationPage;
