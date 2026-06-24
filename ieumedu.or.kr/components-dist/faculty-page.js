function FacultyPage({ tweaks }) {
  const director = {
    name: "\uC120 \uC560 \uC21C",
    role: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0 \uC6D0\uC7A5",
    subRole: "\uB300\uD55C\uC2EC\uB9AC\uD1B5\uD569\uC5F0\uAD6C\uD68C \uB300\uD45C \xB7 \uC774\uC74C\uC2EC\uB9AC\uC5F0\uAD6C\uC0C1\uB2F4\uC13C\uD130 \uC13C\uD130\uC7A5",
    spec: ["\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4", "\uC544\uB3D9\xB7\uC601\uC720\uC544 \uBC1C\uB2EC", "\uBD80\uBAA8\uAD50\uC721"],
    education: [
      "\uAD11\uC8FC\uB300\uD559\uAD50 \uB300\uD559\uC6D0 \uC720\uC544 \uAD50\uC721 \uC11D\uC0AC - \uC2E4\uB0B4\uC640 \uC2E4\uC678 \uB180\uC774 \uD658\uACBD\uC5D0 \uB530\uB978 \uC720\uC544\uC758 \uAC00\uC0C1\uB180\uC774 \uBE44\uAD50(2002)",
      "\uAD11\uC2E0\uB300\uD559\uAD50 \uB300\uD559\uC6D0 \uC720\uC544\uD2B9\uC218\uAD50\uC721 \uC11D\uC0AC \u2014 \uADF8\uB9BC\uB3D9\uD654\uCC45 \uC77D\uC5B4\uC8FC\uAE30\uAC00 \uB2E4\uBB38\uD654\uAC00\uC815 \uC544\uB3D9\uC758 \uC5B8\uC5B4\uB2A5\uB825 \uD5A5\uC0C1\uC5D0 \uBBF8\uCE58\uB294 \uD6A8\uACFC (2010)",
      "\uB0A8\uBD80\uB300\uD559\uAD50 \uB300\uD559\uC6D0 \uD2B9\uC218\uAD50\uC721 \uBC15\uC0AC \uC218\uB8CC(2020) - \uD2B9\uC218\uC0C1\uB2F4",
      "\uBAA9\uD3EC\uB300\uD559\uAD50 \uB300\uD559\uC6D0 \uAC00\uC815\uD559 \uBC15\uC0AC - \uC544\uB3D9\uC758 \uBAA8\uB798\uC0C1\uC790\uCE58\uB8CC\uC5D0\uC11C \uC0C1\uC9D5\uBB3C, \uAD00\uACC4\uC131, \uC2EC\uB9AC\uC801 \uD45C\uD604 \uBC0F \uAC1C\uC131\uD654 \uACFC\uC815\uC5D0 \uAD00\uD55C \uC5F0\uAD6C(2013)"
    ],
    career: [
      "\uD604 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0 \uC6D0\uC7A5",
      "\uD604 \uB300\uD55C\uC2EC\uB9AC\uD1B5\uD569\uC5F0\uAD6C\uD68C \uB300\uD45C",
      "\uD604 \uC0D8\uC544\uB3D9\uC2EC\uB9AC\uC5F0\uAD6C\uC6D0 \uC6D0\uC7A5",
      "\uD604 \uBAA9\uD3EC\uACFC\uD559\uB300\uD559\uAD50 \uC0AC\uD68C\uBCF5\uC9C0\uACFC \uC678\uB798\uAD50\uC218",
      "\uC804 \uAD11\uC8FC\uBCF4\uAC74\uB300\uD559\uAD50 \uC0AC\uD68C\uBCF5\uC9C0\uACFC \uC678\uB798\uAD50\uC218",
      "\uC804 \uC704\uB354\uC2A4\uC6D0\uACA9\uD3C9\uC0DD\uAD50\uC721\uC6D0 \uC6B4\uC601\uAD50\uC218",
      "\uC804 \uB465\uC9C0\uC720\uCE58\uC6D0 \uAD50\uC0AC",
      "\uC804 \uB2E4\uC19C\uC544\uB3D9\uAC00\uC871\uC0C1\uB2F4\uC18C \uC18C\uC7A5"
    ],
    activity: [
      "\uC804\uB0A8\uC774\uC8FC\uC5EC\uC131\uC778\uAD8C\uC13C\uD130 \uC0C1\uB2F4 (3\uB144)",
      "\uC5EC\uC131\uC758 \uC27C\uD130 \uC0C1\uB2F4 (13\uB144)",
      "\uC804\uB0A8\uC721\uC544\uC885\uD569\uC9C0\uC6D0\uC13C\uD130 \uBD80\uBAA8\uAD50\uC721 \uBC0F \uC0C1\uB2F4 (10\uB144)",
      "\uAD11\uC8FC\uAD11\uC5ED\uC2DC\uC721\uC544\uC885\uD569\uC9C0\uC6D0\uC13C\uD130 \uC601\uC720\uC544 \uC0C1\uB2F4 (5\uB144)",
      "\uACE0\uCC3D\uAD50\uC721\uC9C0\uC6D0\uCCAD \uD2B9\uC218\uD559\uC0DD \uC0C1\uB2F4 (4\uB144)",
      "\uACE0\uCC3D\uAD50\uC721\uC9C0\uC6D0\uCCAD \uC704(Wee)\uC13C\uD130 \uC704\uAE30\uD559\uC0DD \uC0C1\uB2F4 (8\uB144)",
      "\uC601\uC560\uC6D0 \uC544\uB3D9 \uC0C1\uB2F4 \uC6B4\uC601\uC704\uC6D0 (10\uB144)",
      "\uAD11\uC8FC\uC30D\uCD0C\uC885\uD569\uC0AC\uD68C\uBCF5\uC9C0\uAD00 1\uAE09 \uB1CC\uC131\uB9C8\uBE44 \uC0C1\uB2F4 (3\uB144)",
      "\uC815\uC74D\uAD50\uC721\uC9C0\uC6D0\uCCAD \uD2B9\uC218\uAD50\uC6D0\uC5F0\uC218(\uBAA8\uB798\uB180\uC774\uCE58\uB8CC \uC911\uC2EC\uC73C\uB85C) : \uC544\uB3D9\uC758 \uC131\uC2EC\uB9AC\uC640 \uC778\uAD8C \uAC10\uC218\uC131 \uC774\uD574 \uBC0F \uB180\uC774 (2021)",
      "\uC815\uC74D\uAD50\uC721\uC9C0\uC6D0\uCCAD \uC704(Wee)\uC13C\uD130 \uAD50\uC6D0\uC5F0\uC218 : \uCCAD\uC18C\uB144\uC0C1\uB2F4\uC744 \uC704\uD55C \uC2EC\uB9AC\uC801 \uC804\uB7B5 (2019)"
    ],
    publications: [
      "\uB3C4\uD615\uC2EC\uB9AC \uC0C1\uB2F4 \uC774\uD574\uC640 \uBD84\uC11D (2022, \uACF5\uC800)",
      "\uC601\uC720\uC544\uC0DD\uD65C\uC9C0\uB3C4 \uBC0F \uC0C1\uB2F4(2021, \uACF5\uC800)",
      "\uADF8\uB9BC\uC744 \uD1B5\uD55C \uC544\uB3D9\uC2EC\uB9AC \uC9C4\uB2E8 \uBC0F \uD574\uC11D (2020, \uACF5\uC800)",
      "\uC544\uB3D9\uBB38\uD559(2018, \uACF5\uC800)",
      "\uC601\uC720\uC544 \uBC1C\uB2EC(2018, \uACF5\uC800)",
      "\uC544\uB3D9\uC0C1\uB2F4(2017, \uACF5\uC800)",
      "\uC601\uC544\uBC1C\uB2EC(2015, \uACF5\uC800)",
      "\uC544\uB3D9 \uB3C5\uC11C\uCE58\uB8CC: \uC774\uB860\uACFC \uC2E4\uC81C(2010, \uACF5\uC800)",
      "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC758 \uC774\uD574\uC640 \uC801\uC6A9(2025, \uACF5\uC800)",
      "\uC560\uCC29\uACFC \uC544\uB3D9\uC815\uC11C \uC911\uC2EC\uCE58\uB8CC(2017, \uACF5\uC800)"
    ],
    papers: [
      "\uB2E4\uBB38\uD654\uAC00\uC815 \uC544\uB3D9\uC758 \uC0AC\uD68C\uBD88\uC548\xB7\uC704\uCD95\uD589\uB3D9 \uBCC0\uD654\uB97C \uC704\uD55C \uBAA8\uB798\uC0C1\uC790\uCE58\uB8CC \uC0AC\uB840\uC5F0\uAD6C (\uBAA8\uB798\uC0C1\uC790\uCE58\uB8CC\uC5F0\uAD6C, 2013)",
      "\uB2E4\uBB38\uD654\uAC00\uC815 \uC544\uB3D9\uC758 \uBAA8\uB798\uC0C1\uC790\uCE58\uB8CC \uC0AC\uB840\uBD84\uC11D \uC5F0\uAD6C (\uC544\uB3D9\uACFC \uAD8C\uB9AC, 2012)",
      "\uB2E4\uBB38\uD654\uAC00\uC815 \uC544\uB3D9\uC758 \uAC00\uC871\uAE30\uB2A5\uACFC \uC0AC\uD68C\uC801 \uB2A5\uB825\uACFC\uC758 \uAD00\uACC4 (\uC2EC\uB9AC\uD589\uB3D9\uC5F0\uAD6C, 2012)",
      "\uB2E4\uBB38\uD654\uAC00\uC815 \uC218\uC90D\uC74C \uC544\uB3D9\uC758 \uB3C5\uC11C\uCE58\uB8CC \uD504\uB85C\uADF8\uB7A8 \uD6A8\uACFC (\uB3C5\uC11C\uCE58\uB8CC\uC5F0\uAD6C, 2011)",
      "\uADF8\uB9BC\uB3D9\uD654\uCC45 \uC77D\uC5B4\uC8FC\uAE30\uAC00 \uB2E4\uBB38\uD654\uAC00\uC815 \uC544\uB3D9\uC758 \uC5B8\uC5B4\uB2A5\uB825 \uD5A5\uC0C1\uC5D0 \uBBF8\uCE58\uB294 \uD6A8\uACFC (\uD2B9\uC218\uC544\uB3D9\uAD50\uC721\uC5F0\uAD6C, 2010)",
      "\uC774\uD63C\uAC00\uC815 \uC544\uB3D9\uC758 \uC815\uC11C\uC801 \uD589\uB3D9 \uBCC0\uD654\uB97C \uC704\uD55C \uBAA8\uB798\uC0C1\uC790\uCE58\uB8CC \uC0AC\uB840\uC5F0\uAD6C (\uBAA8\uB798\uC0C1\uC790\uCE58\uB8CC\uC5F0\uAD6C, 2010)"
    ]
  };
  return /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 72 } }, /* @__PURE__ */ React.createElement("section", { style: { padding: "64px 24px 0", background: tweaks.warmBg } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto", padding: "40px 0 60px" } }, /* @__PURE__ */ React.createElement(
    SectionTitle,
    {
      sub: "FACULTY",
      title: "\uAC15\uC0AC\uC9C4 \uC18C\uAC1C",
      desc: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0\uC758 \uC804\uBB38 \uAC15\uC0AC\uC9C4\uC744 \uC18C\uAC1C\uD569\uB2C8\uB2E4.",
      tweaks
    }
  ))), /* @__PURE__ */ React.createElement("section", { style: { padding: "80px 24px", background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 36 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: tweaks.accent, letterSpacing: "0.08em", marginBottom: 8 } }, "DIRECTOR"), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 26, fontWeight: 700, color: tweaks.text, margin: 0, fontFamily: tweaks.fontHeading } }, "\uC6D0\uC7A5 \uD504\uB85C\uD544")), /* @__PURE__ */ React.createElement(Card, { tweaks, hover: false, style: { padding: 0, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "minmax(200px, 260px) 1fr",
    gap: 0,
    background: tweaks.bgMain
  }, className: "faculty-top-grid" }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: 36,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, ${tweaks.warmBg}, ${tweaks.primaryLight})`,
    borderRight: `1px solid ${tweaks.border}`
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 160,
    height: 200,
    borderRadius: 16,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${tweaks.border}`,
    marginBottom: 16,
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)"
  } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: tweaks.textMuted } }, "\uC6D0\uC7A5 \uC0AC\uC9C4")), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 22,
    fontWeight: 700,
    color: tweaks.text,
    fontFamily: tweaks.fontHeading,
    letterSpacing: "0.05em"
  } }, director.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: tweaks.primary, fontWeight: 600, marginTop: 6 } }, director.role), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: tweaks.textMuted, marginTop: 2 } }, director.subRole)), /* @__PURE__ */ React.createElement("div", { style: { padding: 36 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: tweaks.textMuted, letterSpacing: "0.08em", marginBottom: 10 } }, "\uC804\uBB38 \uBD84\uC57C"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 } }, director.spec.map((s, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: {
    padding: "6px 14px",
    borderRadius: 20,
    background: "#fff",
    border: `1px solid ${tweaks.primary}`,
    color: tweaks.primary,
    fontSize: 13,
    fontWeight: 500
  } }, s))), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 15,
    color: tweaks.text,
    lineHeight: 1.9,
    margin: 0,
    textWrap: "pretty"
  } }, "\uC544\uB3D9\xB7\uC601\uC720\uC544 \uBC1C\uB2EC\uC2EC\uB9AC\uC640 \uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4 \uBD84\uC57C\uC5D0\uC11C 20\uC5EC \uB144 \uAC04 \uD604\uC7A5 \uACBD\uD5D8\uC744 \uC313\uC544\uC628 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4. \uB300\uD559 \uAC15\uB2E8\uC5D0\uC11C\uC758 \uAD50\uC721, \uACF5\uACF5\uAE30\uAD00 \uC5F0\uC218, \uC9C0\uC5ED\uC0AC\uD68C \uC0C1\uB2F4 \uD65C\uB3D9\uC744 \uD1B5\uD574 \uC774\uB860\uACFC \uC2E4\uCC9C\uC744 \uC544\uC6B0\uB974\uB294 \uAD50\uC721\uC744 \uC9C0\uD5A5\uD569\uB2C8\uB2E4."))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 0
  } }, /* @__PURE__ */ React.createElement(FacultyBlock, { title: "\uD559\uB825", items: director.education, tweaks, borderRight: true }), /* @__PURE__ */ React.createElement(FacultyBlock, { title: "\uC8FC\uC694 \uACBD\uB825", items: director.career, tweaks, borderRight: true }), /* @__PURE__ */ React.createElement(FacultyBlock, { title: "\uC8FC\uC694 \uD65C\uB3D9", items: director.activity, tweaks })), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: 0,
    borderTop: `1px solid ${tweaks.border}`
  } }, /* @__PURE__ */ React.createElement(FacultyBlock, { title: "\uC800\uC11C \xB7 \uB2E8\uD589\uBCF8", items: director.publications, tweaks, borderRight: true }), /* @__PURE__ */ React.createElement(FacultyBlock, { title: "\uC8FC\uC694 \uB17C\uBB38", items: director.papers, tweaks }))))), /* @__PURE__ */ React.createElement("section", { style: { padding: "80px 24px", background: tweaks.bgMain } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 36 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: tweaks.accent, letterSpacing: "0.08em", marginBottom: 8 } }, "INSTRUCTORS"), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 26, fontWeight: 700, color: tweaks.text, margin: 0, fontFamily: tweaks.fontHeading } }, "\uD611\uB825 \uAC15\uC0AC\uC9C4"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: tweaks.textMuted, marginTop: 10, lineHeight: 1.7 } }, "\uAC01 \uBD84\uC57C \uC804\uBB38 \uAD50\uC218\uC9C4\uC774 \uACFC\uC815\uBCC4 \uAC15\uC758\uC640 \uC2E4\uC2B5 \uC9C0\uB3C4\uB97C \uB2F4\uB2F9\uD569\uB2C8\uB2E4.")), /* @__PURE__ */ React.createElement(Card, { tweaks, hover: false, style: { textAlign: "center", padding: 36 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("svg", { width: "56", height: "56", viewBox: "0 0 56 56", fill: "none" }, /* @__PURE__ */ React.createElement("circle", { cx: "28", cy: "28", r: "24", fill: tweaks.primary, opacity: "0.1" }), /* @__PURE__ */ React.createElement("path", { d: "M18 35c2.8-4 5.9-6 10-6s7.2 2 10 6", stroke: tweaks.primary, strokeWidth: "2", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("circle", { cx: "28", cy: "21", r: "6", stroke: tweaks.primary, strokeWidth: "2" }))), /* @__PURE__ */ React.createElement("h4", { style: { fontSize: 18, fontWeight: 700, color: tweaks.text, margin: "0 0 10px", fontFamily: tweaks.fontHeading } }, "\uD611\uB825 \uAC15\uC0AC\uC9C4\uC740 \uACFC\uC815 \uD655\uC815 \uD6C4 \uC21C\uCC28 \uACF5\uAC1C\uD569\uB2C8\uB2E4"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: tweaks.textMuted, lineHeight: 1.8, margin: 0 } }, "\uACFC\uC815\uBCC4 \uAC15\uC758\uC640 \uC2E4\uC2B5 \uC9C0\uB3C4\uB294 \uB300\uD55C\uC2EC\uB9AC\uD1B5\uD569\uC5F0\uAD6C\uD68C \uBC0F \uAD00\uB828 \uBD84\uC57C \uC804\uBB38\uAC00\uC640 \uD611\uB825\uD574 \uC6B4\uC601\uD560 \uC608\uC815\uC785\uB2C8\uB2E4. \uD655\uC815\uB41C \uAC15\uC0AC\uC9C4\uACFC \uB2F4\uB2F9 \uACFC\uBAA9\uC740 \uBAA8\uC9D1 \uACF5\uACE0\uC640 \uD568\uAED8 \uC548\uB0B4\uD569\uB2C8\uB2E4.")), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 24,
    padding: 20,
    borderRadius: 12,
    background: "#fff",
    border: `1px solid ${tweaks.border}`,
    fontSize: 13,
    color: tweaks.textMuted,
    lineHeight: 1.8,
    textAlign: "center"
  } }, "\u203B \uACFC\uC815\uBCC4 \uAC15\uC0AC\uC9C4\uC740 \uD559\uAE30\uB9C8\uB2E4 \uC77C\uBD80 \uBCC0\uB3D9\uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4.", /* @__PURE__ */ React.createElement("br", null), "\uC138\uBD80 \uC0AC\uD56D\uC740 \uAD50\uC721\uC6D0\uC5D0 \uBB38\uC758\uD574 \uC8FC\uC138\uC694. (\u260E 062-655-4116)"))));
}
function FacultyBlock({ title, items, tweaks, borderRight = false }) {
  return /* @__PURE__ */ React.createElement("div", { style: {
    padding: 28,
    borderRight: borderRight ? `1px solid ${tweaks.border}` : "none"
  }, className: "faculty-block" }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    fontWeight: 700,
    color: tweaks.accent,
    letterSpacing: "0.1em",
    marginBottom: 16
  } }, title), /* @__PURE__ */ React.createElement("ul", { style: { listStyle: "none", padding: 0, margin: 0 } }, items.map((item, i) => /* @__PURE__ */ React.createElement("li", { key: i, style: {
    fontSize: 13.5,
    color: tweaks.text,
    lineHeight: 1.75,
    marginBottom: 10,
    paddingLeft: 14,
    position: "relative"
  } }, /* @__PURE__ */ React.createElement("span", { style: {
    position: "absolute",
    left: 0,
    top: 10,
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: tweaks.primary,
    opacity: 0.5
  } }), item))));
}
window.FacultyPage = FacultyPage;
