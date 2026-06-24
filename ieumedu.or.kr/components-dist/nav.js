const NAV_ITEMS = [
  { id: "about", label: "\uAD50\uC721\uC6D0\uC18C\uAC1C", children: [
    { id: "greeting", label: "\uC6D0\uC7A5 \uC778\uC0AC\uB9D0" },
    { id: "mission", label: "\uC124\uB9BD\uBAA9\uC801 \xB7 \uAD50\uC721\uCCA0\uD559" },
    { id: "history", label: "\uC5F0\uD601" },
    { id: "faculty", label: "\uAC15\uC0AC\uC9C4 \uC18C\uAC1C" },
    { id: "location", label: "\uC624\uC2DC\uB294 \uAE38" }
  ] },
  { id: "courses", label: "\uAD50\uC721\uACFC\uC815", children: [
    { id: "courses", label: "\uCEE4\uB9AC\uD058\uB7FC \xB7 \uC2DC\uC218" },
    { id: "certification", label: "\uBBFC\uAC04\uC790\uACA9 \uC548\uB0B4" },
    { id: "verify", label: "\uC790\uACA9\uC778\uC99D \uC870\uD68C" }
  ] },
  { id: "notice", label: "\uACF5\uC9C0\uC0AC\uD56D" },
  { id: "enroll", label: "\uC218\uAC15\uC2E0\uCCAD" }
];
function SiteHeader({ currentPage, setPage, tweaks }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const dropdownTimeout = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isChildActive = (item) => item.children && item.children.some((c) => c.id === currentPage);
  const isParentActive = (item) => item.id === currentPage || isChildActive(item);
  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: scrolled ? "rgba(250,246,240,0.97)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(139,111,71,0.12)" : "1px solid transparent",
    transition: "all 0.3s ease"
  };
  const innerStyle = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 72
  };
  const logoStyle = {
    fontFamily: tweaks.fontHeading,
    fontSize: 18,
    fontWeight: 700,
    color: tweaks.primary,
    cursor: "pointer",
    letterSpacing: "-0.02em",
    display: "flex",
    alignItems: "center",
    gap: 10
  };
  const linkStyle = (active) => ({
    padding: "8px 16px",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: active ? 600 : 400,
    color: active ? tweaks.primary : tweaks.textMuted,
    background: active ? tweaks.primaryLight : "transparent",
    cursor: "pointer",
    transition: "all 0.2s",
    border: "none",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: 4
  });
  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 4,
    background: "#fff",
    borderRadius: 12,
    padding: "8px 0",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    border: `1px solid ${tweaks.border}`,
    minWidth: 180,
    zIndex: 200
  };
  const dropdownLinkStyle = (active) => ({
    display: "block",
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    color: active ? tweaks.primary : tweaks.text,
    background: active ? tweaks.primaryLight : "transparent",
    cursor: "pointer",
    border: "none",
    width: "100%",
    textAlign: "left",
    fontFamily: "inherit",
    transition: "all 0.15s"
  });
  const handleDropdownEnter = (id) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(id);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };
  const mobileMenuStyle = {
    position: "fixed",
    top: 72,
    left: 0,
    right: 0,
    bottom: 0,
    background: tweaks.bgMain,
    overflowY: "auto",
    display: menuOpen ? "flex" : "none",
    flexDirection: "column",
    padding: "24px",
    gap: 4,
    zIndex: 99
  };
  const mobileLinkStyle = (active, indent = false) => ({
    padding: indent ? "12px 20px 12px 36px" : "14px 20px",
    borderRadius: 10,
    fontSize: indent ? 15 : 16,
    fontWeight: active ? 600 : 400,
    color: active ? tweaks.primary : tweaks.text,
    background: active ? tweaks.primaryLight : "transparent",
    cursor: "pointer",
    border: "none",
    textAlign: "left",
    fontFamily: "inherit"
  });
  const mobileGroupLabelStyle = {
    padding: "14px 20px 6px",
    fontSize: 13,
    fontWeight: 600,
    color: tweaks.accent,
    letterSpacing: "0.04em",
    textTransform: "uppercase"
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", { style: headerStyle }, /* @__PURE__ */ React.createElement("div", { style: innerStyle }, /* @__PURE__ */ React.createElement("div", { style: logoStyle, onClick: () => {
    setPage("home");
    setMenuOpen(false);
  } }, /* @__PURE__ */ React.createElement("svg", { width: "28", height: "28", viewBox: "0 0 28 28", fill: "none" }, /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "14", r: "12", fill: tweaks.primary, opacity: "0.15" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "14", r: "7", fill: tweaks.primary, opacity: "0.3" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "14", r: "3", fill: tweaks.primary })), "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0"), /* @__PURE__ */ React.createElement("nav", { style: { display: "flex", gap: 2, alignItems: "center" }, className: "desktop-nav" }, NAV_ITEMS.map((item) => {
    if (item.children) {
      const active = isParentActive(item);
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: item.id,
          style: { position: "relative" },
          onMouseEnter: () => handleDropdownEnter(item.id),
          onMouseLeave: handleDropdownLeave
        },
        /* @__PURE__ */ React.createElement("button", { style: linkStyle(active) }, item.label, /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", style: { opacity: 0.5, transform: openDropdown === item.id ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" } }, /* @__PURE__ */ React.createElement("path", { d: "M3 5l3 3 3-3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }))),
        openDropdown === item.id && /* @__PURE__ */ React.createElement("div", { style: dropdownStyle }, item.children.map((child) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: `${item.id}-${child.id}`,
            style: dropdownLinkStyle(currentPage === child.id),
            onClick: () => {
              setPage(child.id);
              setOpenDropdown(null);
            },
            onMouseEnter: (e) => e.target.style.background = tweaks.primaryLight,
            onMouseLeave: (e) => {
              if (currentPage !== child.id) e.target.style.background = "transparent";
            }
          },
          child.label
        )))
      );
    }
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: item.id,
        style: linkStyle(currentPage === item.id),
        onClick: () => setPage(item.id),
        onMouseEnter: (e) => {
          if (currentPage !== item.id) e.target.style.background = tweaks.primaryLight;
        },
        onMouseLeave: (e) => {
          if (currentPage !== item.id) e.target.style.background = "transparent";
        }
      },
      item.label
    );
  })), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "mobile-menu-btn",
      onClick: () => setMenuOpen(!menuOpen),
      style: { background: "none", border: "none", cursor: "pointer", padding: 8 }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: tweaks.text, strokeWidth: "2" }, menuOpen ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }), /* @__PURE__ */ React.createElement("line", { x1: "6", y1: "18", x2: "18", y2: "6" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "7", x2: "21", y2: "7" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "12", x2: "21", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "17", x2: "21", y2: "17" })))
  ))), /* @__PURE__ */ React.createElement("div", { style: mobileMenuStyle }, /* @__PURE__ */ React.createElement(
    "button",
    {
      style: mobileLinkStyle(currentPage === "home"),
      onClick: () => {
        setPage("home");
        setMenuOpen(false);
      }
    },
    "\uD648"
  ), NAV_ITEMS.map((item) => {
    if (item.children) {
      return /* @__PURE__ */ React.createElement(React.Fragment, { key: item.id }, /* @__PURE__ */ React.createElement("div", { style: mobileGroupLabelStyle }, item.label), item.children.map((child) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: `${item.id}-${child.id}`,
          style: mobileLinkStyle(currentPage === child.id, true),
          onClick: () => {
            setPage(child.id);
            setMenuOpen(false);
          }
        },
        child.label
      )));
    }
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: item.id,
        style: mobileLinkStyle(currentPage === item.id),
        onClick: () => {
          setPage(item.id);
          setMenuOpen(false);
        }
      },
      item.label
    );
  }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 24, padding: "16px 20px", fontSize: 14, color: tweaks.textMuted, lineHeight: 1.7 } }, /* @__PURE__ */ React.createElement("div", null, "\u260E 062-655-4116"), /* @__PURE__ */ React.createElement("div", null, "\uAD11\uC8FC\uAD11\uC5ED\uC2DC \uC11C\uAD6C \uD68C\uC7AC\uB85C 859, 3\uCE35"))));
}
window.SiteHeader = SiteHeader;
window.NAV_ITEMS = NAV_ITEMS;
function AccreditationBar({ tweaks, setPage }) {
  const [closed, setClosed] = React.useState(() => {
    try {
      return localStorage.getItem("ieum_acc_bar_closed_v1") === "1";
    } catch {
      return false;
    }
  });
  if (closed) return null;
  const close = (e) => {
    e.stopPropagation();
    setClosed(true);
    try {
      localStorage.setItem("ieum_acc_bar_closed_v1", "1");
    } catch {
    }
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "sticky",
    top: 72,
    zIndex: 90,
    background: tweaks.text,
    color: "#fff",
    padding: "10px 24px",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap"
  } }, /* @__PURE__ */ React.createElement("span", { style: {
    padding: "3px 10px",
    borderRadius: 4,
    background: tweaks.accent,
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.05em",
    flexShrink: 0
  } }, "NOTICE"), /* @__PURE__ */ React.createElement("span", { style: { opacity: 0.92, lineHeight: 1.6, textAlign: "center" } }, "\uBCF8 \uAD50\uC721\uC6D0\uC740 \uD604\uC7AC ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#fff" } }, "\uD3C9\uC0DD\uAD50\uC721\uC2DC\uC124 \uB4F1\uB85D \xB7 \uC778\uAC00 \uC808\uCC28"), "\uB97C \uC9C4\uD589\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4.", /* @__PURE__ */ React.createElement("span", { style: { opacity: 0.7 } }, " \uAC1C\uAC15 \uC77C\uC815\xB7\uC218\uAC15\uB8CC\uB294 \uC778\uAC00 \uC2B9\uC778 \uD6C4 \uACF5\uC9C0\uB429\uB2C8\uB2E4.")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setPage("notice"),
      style: {
        background: "rgba(255,255,255,0.15)",
        color: "#fff",
        border: "none",
        padding: "4px 12px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        flexShrink: 0
      }
    },
    "\uC790\uC138\uD788 \uBCF4\uAE30 \u2192"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: close,
      "aria-label": "\uB2EB\uAE30",
      style: {
        background: "transparent",
        color: "rgba(255,255,255,0.6)",
        border: "none",
        padding: "2px 8px",
        fontSize: 18,
        cursor: "pointer",
        fontFamily: "inherit",
        lineHeight: 1,
        flexShrink: 0
      },
      onMouseEnter: (e) => e.target.style.color = "#fff",
      onMouseLeave: (e) => e.target.style.color = "rgba(255,255,255,0.6)"
    },
    "\xD7"
  ));
}
window.AccreditationBar = AccreditationBar;
