const TWEAK_DEFAULTS = window.TWEAK_DEFAULTS || {
  theme: "warm",
  fontStyle: "sans",
  heroSize: 48
};
const THEMES = {
  warm: {
    primary: "#8B6F47",
    accent: "#C4956A",
    primaryLight: "rgba(139,111,71,0.08)",
    bgMain: "#FAF6F0",
    warmBg: "#F5EDE3",
    text: "#2C1810",
    textMuted: "#7A6B5D",
    border: "rgba(139,111,71,0.12)"
  },
  olive: {
    primary: "#5E7352",
    accent: "#8FA67A",
    primaryLight: "rgba(94,115,82,0.08)",
    bgMain: "#F6F8F4",
    warmBg: "#EDF2E8",
    text: "#1E2A18",
    textMuted: "#5E6B56",
    border: "rgba(94,115,82,0.12)"
  },
  navy: {
    primary: "#4A5E7A",
    accent: "#7B95B8",
    primaryLight: "rgba(74,94,122,0.08)",
    bgMain: "#F5F7FA",
    warmBg: "#EBF0F5",
    text: "#1A2332",
    textMuted: "#5A6A7E",
    border: "rgba(74,94,122,0.12)"
  }
};
const FONT_STYLES = {
  sans: { fontHeading: "'Noto Sans KR', sans-serif" },
  serif: { fontHeading: "'Noto Serif KR', serif" }
};
const PAGE_META = {
  home: {
    title: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0 \u2013 \uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC \uAD50\uC721",
    description: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0\uC740 \uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC \uAD50\uC721\uACFC \uD3C9\uC0DD\uD559\uC2B5 \uAE30\uBC18 \uC2EC\uB9AC\uC0C1\uB2F4 \uACFC\uC815\uC744 \uC6B4\uC601\uD558\uB294 \uAD50\uC721\uAE30\uAD00\uC785\uB2C8\uB2E4."
  },
  greeting: {
    title: "\uC6D0\uC7A5 \uC778\uC0AC\uB9D0 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0 \uC6D0\uC7A5 \uC778\uC0AC\uB9D0\uACFC \uAD50\uC721 \uCCA0\uD559\uC744 \uD655\uC778\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
  },
  mission: {
    title: "\uC124\uB9BD\uBAA9\uC801 \uBC0F \uAD50\uC721\uCCA0\uD559 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0\uC774 \uCD94\uAD6C\uD558\uB294 \uC124\uB9BD\uBAA9\uC801\uACFC \uAD50\uC721\uCCA0\uD559\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4."
  },
  history: {
    title: "\uC5F0\uD601 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0\uC758 \uC124\uB9BD \uBC0F \uC6B4\uC601 \uC5F0\uD601\uC744 \uD655\uC778\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
  },
  institution: {
    title: "\uAE30\uAD00\uC815\uBCF4 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uAE30\uAD00 \uC6B4\uC601 \uC815\uBCF4\uC640 \uAE30\uBCF8 \uD589\uC815 \uC815\uBCF4\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4."
  },
  instructors: {
    title: "\uAC15\uC0AC\uC9C4 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0\uC758 \uAC15\uC0AC\uC9C4\uACFC \uC804\uBB38 \uBD84\uC57C\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4."
  },
  faculty: {
    title: "\uAC15\uC0AC\uC9C4 \uC18C\uAC1C \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0\uC758 \uC804\uBB38 \uAC15\uC0AC\uC9C4\uACFC \uC6D0\uC7A5 \uD504\uB85C\uD544\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4."
  },
  location: {
    title: "\uC624\uC2DC\uB294 \uAE38 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0 \uC704\uCE58, \uC57D\uB3C4, \uAE38\uCC3E\uAE30 \uC815\uBCF4\uB97C \uD655\uC778\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
  },
  courses: {
    title: "\uAD50\uC721\uACFC\uC815 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC \uACFC\uC815\uACFC \uC138\uBD80 \uAD50\uC721\uACFC\uC815\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4."
  },
  schedule: {
    title: "\uAD50\uC721\uC77C\uC815 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uAD50\uC721 \uC77C\uC815\uACFC \uC790\uACA9\uC2DC\uD5D8 \uAD00\uB828 \uC548\uB0B4\uB97C \uD655\uC778\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
  },
  refund: {
    title: "\uD559\uC2B5\uBE44 \uBC18\uD658 \uC548\uB0B4 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uD559\uC2B5\uBE44 \uBC18\uD658 \uAE30\uC900\uACFC \uD658\uBD88 \uC808\uCC28\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4."
  },
  enroll: {
    title: "\uC218\uAC15\uC2E0\uCCAD \xB7 \uBB38\uC758 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uC218\uAC15\uC2E0\uCCAD\uACFC \uAD50\uC721 \uC0C1\uB2F4 \uBB38\uC758\uB97C \uC811\uC218\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
  },
  faq: {
    title: "FAQ \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uC218\uAC15, \uC6B4\uC601, \uC790\uACA9\uACFC \uAD00\uB828\uD55C \uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38\uC744 \uC815\uB9AC\uD588\uC2B5\uB2C8\uB2E4."
  },
  privacy: {
    title: "\uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0\uC758 \uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4."
  },
  terms: {
    title: "\uC774\uC6A9\uC57D\uAD00 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uD648\uD398\uC774\uC9C0 \uC774\uC6A9\uACFC \uC11C\uBE44\uC2A4 \uC81C\uACF5\uC5D0 \uAD00\uD55C \uAE30\uBCF8 \uC57D\uAD00\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4."
  },
  notices: {
    title: "\uACF5\uC9C0\uC0AC\uD56D \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uACFC\uC815 \uC6B4\uC601, \uBAA8\uC9D1, \uAC1C\uAC15 \uAD00\uB828 \uACF5\uC9C0\uC0AC\uD56D\uC744 \uD655\uC778\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
  },
  notice: {
    title: "\uACF5\uC9C0\uC0AC\uD56D \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uACFC\uC815 \uC6B4\uC601, \uBAA8\uC9D1, \uAC1C\uAC15 \uAD00\uB828 \uACF5\uC9C0\uC0AC\uD56D\uC744 \uD655\uC778\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
  },
  certification: {
    title: "\uBBFC\uAC04\uC790\uACA9 \uC548\uB0B4 \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC \uBBFC\uAC04\uC790\uACA9 \uC815\uBCF4\uC640 \uC6B4\uC601 \uC548\uB0B4\uB97C \uC81C\uACF5\uD569\uB2C8\uB2E4."
  },
  verify: {
    title: "\uC790\uACA9\uC778\uC99D \uC870\uD68C \u2013 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0",
    description: "\uBC1C\uAE09\uB41C \uC790\uACA9\uC99D\uC758 \uC9C4\uC704 \uC5EC\uBD80\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
  }
};
const PAGE_ALIASES = {
  institution: "mission",
  instructors: "faculty",
  schedule: "courses",
  refund: "courses",
  faq: "certification",
  privacy: "home",
  terms: "home",
  notices: "notice"
};
const ACTIVE_PAGES = /* @__PURE__ */ new Set([
  "home",
  "greeting",
  "mission",
  "history",
  "faculty",
  "location",
  "courses",
  "enroll",
  "notice",
  "certification",
  "verify"
]);
function normalizePageId(pageId) {
  const candidate = PAGE_ALIASES[pageId] || pageId;
  return ACTIVE_PAGES.has(candidate) ? candidate : "home";
}
function getInitialPage() {
  const hash = window.location.hash.replace("#", "").trim();
  return normalizePageId(hash);
}
function App() {
  const [page, setPage] = React.useState(getInitialPage);
  const [tweakState, setTweakState] = React.useState(TWEAK_DEFAULTS);
  const [tweakOpen, setTweakOpen] = React.useState(false);
  const tweaks = {
    ...THEMES[tweakState.theme] || THEMES.warm,
    ...FONT_STYLES[tweakState.fontStyle] || FONT_STYLES.sans,
    heroSize: tweakState.heroSize
  };
  React.useEffect(() => {
    const onHashChange = () => {
      const nextPage = getInitialPage();
      setPage((prevPage) => prevPage === nextPage ? prevPage : nextPage);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  React.useEffect(() => {
    const pageMeta = PAGE_META[page] || PAGE_META.home;
    const nextHash = page === "home" ? "" : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", `${window.location.pathname}${nextHash}`);
    }
    document.title = pageMeta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", pageMeta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", pageMeta.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", pageMeta.description);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  React.useEffect(() => {
    const handler = (event) => {
      var _a, _b;
      if (((_a = event.data) == null ? void 0 : _a.type) === "__activate_edit_mode") setTweakOpen(true);
      if (((_b = event.data) == null ? void 0 : _b.type) === "__deactivate_edit_mode") setTweakOpen(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);
  const updateTweak = (key, value) => {
    const next = { ...tweakState, [key]: value };
    setTweakState(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: value } }, "*");
  };
  return /* @__PURE__ */ React.createElement("div", { style: { background: tweaks.bgMain, minHeight: "100vh" } }, /* @__PURE__ */ React.createElement(window.SiteHeader, { currentPage: page, setPage, tweaks }), /* @__PURE__ */ React.createElement("main", { id: "main-content", tabIndex: "-1" }, page === "home" && /* @__PURE__ */ React.createElement(window.HomePage, { setPage, tweaks }), page === "greeting" && /* @__PURE__ */ React.createElement(window.GreetingPage, { tweaks }), page === "mission" && /* @__PURE__ */ React.createElement(window.MissionPage, { tweaks }), page === "history" && /* @__PURE__ */ React.createElement(window.HistoryPage, { tweaks }), page === "faculty" && /* @__PURE__ */ React.createElement(window.FacultyPage, { tweaks }), page === "location" && /* @__PURE__ */ React.createElement(window.LocationPage, { tweaks, setPage }), page === "courses" && /* @__PURE__ */ React.createElement(window.CoursesPage, { setPage, tweaks }), page === "enroll" && /* @__PURE__ */ React.createElement(window.EnrollPage, { tweaks, setPage }), page === "notice" && /* @__PURE__ */ React.createElement(window.NoticePage, { tweaks, setPage }), page === "certification" && /* @__PURE__ */ React.createElement(window.CertificationPage, { tweaks }), page === "verify" && /* @__PURE__ */ React.createElement(window.VerifyPage, { tweaks })), /* @__PURE__ */ React.createElement(window.SiteFooter, { tweaks, setPage }), /* @__PURE__ */ React.createElement("div", { className: `tweak-panel ${tweakOpen ? "open" : ""}` }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#2C1810" } }, "Tweaks"), /* @__PURE__ */ React.createElement("div", { className: "tweak-label" }, "\uC0C9\uC0C1 \uD14C\uB9C8"), /* @__PURE__ */ React.createElement("div", { className: "tweak-row" }, [
    { id: "warm", label: "\uBCA0\uC774\uC9C0/\uBE0C\uB77C\uC6B4", color: "#8B6F47" },
    { id: "olive", label: "\uC62C\uB9AC\uBE0C/\uADF8\uB9B0", color: "#5E7352" },
    { id: "navy", label: "\uB124\uC774\uBE44/\uBE14\uB8E8", color: "#4A5E7A" }
  ].map((theme) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: theme.id,
      className: `tweak-chip ${tweakState.theme === theme.id ? "active" : ""}`,
      onClick: () => updateTweak("theme", theme.id),
      style: { display: "flex", alignItems: "center", gap: 6 }
    },
    /* @__PURE__ */ React.createElement("span", { style: { width: 12, height: 12, borderRadius: "50%", background: theme.color, display: "inline-block" } }),
    theme.label
  ))), /* @__PURE__ */ React.createElement("div", { className: "tweak-label" }, "\uC81C\uBAA9 \uD3F0\uD2B8"), /* @__PURE__ */ React.createElement("div", { className: "tweak-row" }, [
    { id: "sans", label: "\uACE0\uB515 (Sans)" },
    { id: "serif", label: "\uBA85\uC870 (Serif)" }
  ].map((font) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: font.id,
      className: `tweak-chip ${tweakState.fontStyle === font.id ? "active" : ""}`,
      onClick: () => updateTweak("fontStyle", font.id)
    },
    font.label
  ))), /* @__PURE__ */ React.createElement("div", { className: "tweak-label" }, "\uD788\uC5B4\uB85C \uC81C\uBAA9 \uD06C\uAE30"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: "36",
      max: "64",
      step: "2",
      value: tweakState.heroSize,
      onChange: (event) => updateTweak("heroSize", Number(event.target.value)),
      style: { flex: 1 }
    }
  ), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#888", minWidth: 32 } }, tweakState.heroSize, "px"))));
}
window.ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
