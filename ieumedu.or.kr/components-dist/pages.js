function SectionTitle({ sub, title, desc, tweaks, align = "center" }) {
  return /* @__PURE__ */ React.createElement("div", { style: { textAlign: align, marginBottom: 48 } }, sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: tweaks.accent, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 } }, sub), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 32, fontWeight: 700, color: tweaks.text, margin: 0, lineHeight: 1.3, fontFamily: tweaks.fontHeading } }, title), desc && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, color: tweaks.textMuted, marginTop: 12, maxWidth: 560, lineHeight: 1.7, ...align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {} } }, desc));
}
function Card({ children, tweaks, style = {}, hover = true }) {
  const ref = React.useRef();
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref,
      style: { background: "#fff", borderRadius: 16, padding: 32, border: `1px solid ${tweaks.border}`, transition: "all 0.25s", ...style },
      onMouseEnter: (e) => {
        if (hover) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(92,64,51,0.08)";
        }
      },
      onMouseLeave: (e) => {
        if (hover) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }
      }
    },
    children
  );
}
function Btn({ children, tweaks, variant = "primary", onClick, style = {}, disabled = false, type = "button" }) {
  const base = { padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.2s", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8 };
  const variants = {
    primary: { background: tweaks.primary, color: "#fff", ...base },
    secondary: { background: tweaks.primaryLight, color: tweaks.primary, ...base },
    outline: { background: "transparent", color: tweaks.primary, border: `1.5px solid ${tweaks.primary}`, ...base }
  };
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type,
      disabled,
      style: { ...variants[variant], ...disabled ? { opacity: 0.55, cursor: "not-allowed" } : null, ...style },
      onClick: disabled ? void 0 : onClick,
      onMouseEnter: (e) => {
        if (!disabled) e.currentTarget.style.opacity = 0.85;
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.opacity = disabled ? 0.55 : 1;
      }
    },
    children
  );
}
const STORAGE_KEYS = {
  enrollDraft: "ieumedu_enroll_draft_v2",
  enrollPrefill: "ieumedu_enroll_prefill_v2",
  enrollSubmissions: "ieumedu_enroll_submissions_v2"
};
const STORAGE_TTLS = {
  enrollDraft: 1e3 * 60 * 60 * 24,
  enrollPrefill: 1e3 * 60 * 60 * 6,
  enrollSubmissions: 1e3 * 60 * 60 * 24 * 35
};
function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.__storageEnvelope === 1) {
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        window.localStorage.removeItem(key);
        return fallback;
      }
      return parsed.data;
    }
    return parsed;
  } catch (error) {
    return fallback;
  }
}
function writeStorage(key, value, options = {}) {
  try {
    const expiresInMs = options.expiresInMs || 0;
    const payload = expiresInMs > 0 ? {
      __storageEnvelope: 1,
      data: value,
      expiresAt: Date.now() + expiresInMs
    } : value;
    window.localStorage.setItem(key, JSON.stringify(payload));
  } catch (error) {
    return false;
  }
  return true;
}
function formatDateLabel(dateText) {
  if (!dateText) return "";
  const [year, month, day] = dateText.split("-");
  if (!year || !month || !day) return dateText;
  return `${year}.${month}.${day}`;
}
function normalizePhoneLink(phone) {
  return String(phone || "").replace(/[^\d+]/g, "");
}
function normalizePhoneValue(phone) {
  return String(phone || "").replace(/[^\d]/g, "");
}
const EMAIL_DOMAIN_OPTIONS = [
  { value: "gmail.com", label: "gmail.com" },
  { value: "naver.com", label: "naver.com" },
  { value: "daum.net", label: "daum.net" },
  { value: "direct", label: "\uC9C1\uC811\uC785\uB825" }
];
function sanitizeKoreanNameInput(value) {
  return String(value || "").replace(/[^가-힣\s]/g, "").replace(/\s{2,}/g, " ").slice(0, 20);
}
function formatPhoneInput(value) {
  const digits = normalizePhoneValue(value).slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.startsWith("02")) {
    if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length <= 9) return `${digits.slice(0, 2)}-${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, digits.length - 4)}-${digits.slice(-4)}`;
}
function normalizeEmailValue(email) {
  return String(email || "").trim().toLowerCase();
}
function sanitizeEmailLocalInput(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 32);
}
function sanitizeEmailDomainInput(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9.-]/g, "").replace(/\.{2,}/g, ".").replace(/^-+|-+$/g, "").slice(0, 80);
}
function splitEmailAddress(email) {
  const normalized = normalizeEmailValue(email);
  if (!normalized.includes("@")) {
    return { localPart: "", domainOption: "gmail.com", customDomain: "" };
  }
  const [localPart, domainPart] = normalized.split("@");
  const matchedOption = EMAIL_DOMAIN_OPTIONS.find((item) => item.value === domainPart && item.value !== "direct");
  return {
    localPart: sanitizeEmailLocalInput(localPart),
    domainOption: matchedOption ? matchedOption.value : "direct",
    customDomain: matchedOption ? "" : sanitizeEmailDomainInput(domainPart)
  };
}
function buildEmailAddress(form) {
  const localPart = sanitizeEmailLocalInput(form.emailLocal);
  const domainPart = form.emailDomain === "direct" ? sanitizeEmailDomainInput(form.emailCustomDomain) : sanitizeEmailDomainInput(form.emailDomain);
  if (!localPart || !domainPart) return "";
  return `${localPart}@${domainPart}`;
}
function buildEmptyEnrollForm() {
  return {
    name: "",
    phone: "",
    email: "",
    emailLocal: "",
    emailDomain: "gmail.com",
    emailCustomDomain: "",
    course: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 2\uAE09",
    message: "",
    privacyConsent: false,
    website: ""
  };
}
function buildFormFromSavedData(savedData = {}) {
  const emptyForm = buildEmptyEnrollForm();
  const emailParts = splitEmailAddress((savedData == null ? void 0 : savedData.email) || "");
  return {
    ...emptyForm,
    ...savedData,
    name: sanitizeKoreanNameInput((savedData == null ? void 0 : savedData.name) || ""),
    phone: formatPhoneInput((savedData == null ? void 0 : savedData.phone) || ""),
    emailLocal: sanitizeEmailLocalInput((savedData == null ? void 0 : savedData.emailLocal) || emailParts.localPart),
    emailDomain: (savedData == null ? void 0 : savedData.emailDomain) || emailParts.domainOption || emptyForm.emailDomain,
    emailCustomDomain: sanitizeEmailDomainInput((savedData == null ? void 0 : savedData.emailCustomDomain) || emailParts.customDomain),
    course: normalizeCourseLabel((savedData == null ? void 0 : savedData.course) || emptyForm.course),
    message: (savedData == null ? void 0 : savedData.message) || "",
    email: "",
    website: ""
  };
}
function normalizeCourseLabel(course) {
  const value = String(course || "").trim();
  if (!value) return "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 2\uAE09";
  if (value === "2\uAE09") return "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 2\uAE09";
  if (value === "1\uAE09") return "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 1\uAE09";
  if (value === "\uAE30\uD0C0") return "\uAE30\uD0C0 \uBB38\uC758";
  return value;
}
function buildDuplicateKey(record) {
  return [
    normalizeEmailValue(record.email),
    normalizePhoneValue(record.phone),
    normalizeCourseLabel(record.course)
  ].join("|");
}
function pruneSubmissionHistory(records) {
  const cutoff = Date.now() - STORAGE_TTLS.enrollSubmissions;
  if (!Array.isArray(records)) return [];
  return records.filter((item) => {
    if (!(item == null ? void 0 : item.submittedAt)) return false;
    const submittedTime = new Date(item.submittedAt).getTime();
    if (!submittedTime || submittedTime < cutoff) return false;
    return !!buildDuplicateKey(item);
  });
}
function buildEnrollSummary(record) {
  return [
    `\uC774\uB984: ${record.name}`,
    `\uC5F0\uB77D\uCC98: ${record.phone}`,
    `\uC774\uBA54\uC77C: ${record.email || "\uBBF8\uC785\uB825"}`,
    `\uACFC\uC815: ${record.course}`,
    `\uBB38\uC758 \uB0B4\uC6A9: ${record.message || "\uBBF8\uC785\uB825"}`,
    `\uAC1C\uC778\uC815\uBCF4 \uB3D9\uC758: ${record.privacyConsent ? "\uB3D9\uC758" : "\uBBF8\uB3D9\uC758"}`,
    `\uC811\uC218\uBC88\uD638: ${record.submissionId || "\uC0DD\uC131\uB428"}`,
    `\uC811\uC218\uC2DC\uAC01: ${record.submittedAt || "\uBBF8\uAE30\uB85D"}`
  ].join("\n");
}
function HeroBg({ tweaks }) {
  const canvasRef = React.useRef(null);
  const mouse = React.useRef({ x: 0.5, y: 0.5 });
  const raf = React.useRef(null);
  const particles = React.useRef([]);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h;
    const resize = () => {
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    particles.current = Array.from({ length: 18 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      baseX: Math.random() * w,
      baseY: Math.random() * h,
      r: 30 + Math.random() * 120,
      speed: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      drift: 0.2 + Math.random() * 0.4
    }));
    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / w;
      mouse.current.y = (e.clientY - rect.top) / h;
    };
    canvas.parentElement.addEventListener("mousemove", handleMove);
    const hex2rgb = (hex) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
    let t = 0;
    const draw = () => {
      t += 8e-3;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x, my = mouse.current.y;
      const colors = [tweaks.primary, tweaks.accent];
      particles.current.forEach((p, i) => {
        const fx = Math.sin(t * p.speed + p.phase) * 40 * p.drift;
        const fy = Math.cos(t * p.speed * 0.7 + p.phase) * 30 * p.drift;
        const px = (mx - 0.5) * 80 * p.speed, py = (my - 0.5) * 60 * p.speed;
        p.x += (p.baseX + fx + px - p.x) * 0.025;
        p.y += (p.baseY + fy + py - p.y) * 0.025;
        const [cr, cg, cb] = hex2rgb(colors[i % 2]);
        const alpha = 0.035 + 0.02 * Math.sin(t + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.fill();
      });
      const [gr, gg, gb] = hex2rgb(tweaks.primary);
      const gx = w * mx, gy = h * my;
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, 250);
      grad.addColorStop(0, `rgba(${gr},${gg},${gb},0.06)`);
      grad.addColorStop(1, `rgba(${gr},${gg},${gb},0)`);
      ctx.beginPath();
      ctx.arc(gx, gy, 250, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      canvas.parentElement.removeEventListener("mousemove", handleMove);
    };
  }, [tweaks.primary, tweaks.accent]);
  return /* @__PURE__ */ React.createElement("canvas", { ref: canvasRef, style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } });
}
function HomePage({ setPage, tweaks }) {
  const heroStyle = {
    minHeight: "85vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(165deg, ${tweaks.bgMain} 0%, ${tweaks.warmBg} 50%, ${tweaks.primaryLight} 100%)`,
    padding: "120px 24px 80px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden"
  };
  const bannerNotices = (window.NOTICES || []).filter((n) => n.pinned).slice(0, 2);
  const [bannerIdx, setBannerIdx] = React.useState(0);
  React.useEffect(() => {
    if (bannerNotices.length < 2) return;
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % bannerNotices.length), 5e3);
    return () => clearInterval(t);
  }, [bannerNotices.length]);
  const currentBanner = bannerNotices[bannerIdx];
  const latestNotices = (window.NOTICES || []).slice(0, 4);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { style: heroStyle }, /* @__PURE__ */ React.createElement(HeroBg, { tweaks }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 720, position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", padding: "6px 16px", borderRadius: 20, background: "rgba(139,111,71,0.1)", fontSize: 13, fontWeight: 600, color: tweaks.primary, marginBottom: 24 } }, "\uD3C9\uC0DD\uAD50\uC721\uC6D0 \xB7 \uBBFC\uAC04\uC790\uACA9 \xB7 \uC2EC\uB9AC\uC0C1\uB2F4"), /* @__PURE__ */ React.createElement("h1", { className: "hero-title", style: { fontSize: tweaks.heroSize, fontWeight: 800, color: tweaks.text, lineHeight: 1.25, margin: 0, fontFamily: tweaks.fontHeading, letterSpacing: "-0.02em", textWrap: "pretty" } }, "\uB9C8\uC74C\uC744 \uC787\uB294 \uAD50\uC721,", /* @__PURE__ */ React.createElement("br", null), "\uC131\uC7A5\uC744 \uC787\uB294 \uC0C1\uB2F4"), /* @__PURE__ */ React.createElement("p", { className: "hero-description", style: { fontSize: 18, color: tweaks.textMuted, marginTop: 20, lineHeight: 1.8, textWrap: "pretty" } }, "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0\uC740 \uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC \uC591\uC131\uC744 \uD1B5\uD574", /* @__PURE__ */ React.createElement("br", { className: "hide-mobile" }), "\uC544\uB3D9\xB7\uCCAD\uC18C\uB144\xB7\uC131\uC778\uC758 \uC2EC\uB9AC\uC801 \uC131\uC7A5\uC744 \uC9C0\uC6D0\uD569\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 36, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Btn, { tweaks, onClick: () => setPage("courses") }, "\uAD50\uC721\uACFC\uC815 \uC548\uB0B4 \u2192"), /* @__PURE__ */ React.createElement(Btn, { tweaks, variant: "outline", onClick: () => setPage("enroll") }, "\uC218\uAC15\uC2E0\uCCAD \xB7 \uBB38\uC758")), currentBanner && /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "hero-notice-banner",
      onClick: () => setPage("notice"),
      style: {
        marginTop: 40,
        width: "100%",
        maxWidth: 620,
        padding: "14px 20px",
        borderRadius: 999,
        border: `1.5px solid ${tweaks.border}`,
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s",
        textAlign: "left",
        boxShadow: "0 4px 20px rgba(139,111,71,0.08)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.background = "#fff";
        e.currentTarget.style.transform = "translateY(-2px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.7)";
        e.currentTarget.style.transform = "translateY(0)";
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { padding: "4px 10px", borderRadius: 6, background: tweaks.primary, color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 } }, "\uACF5\uC9C0"),
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 500, color: tweaks.text, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, currentBanner.title),
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: tweaks.textMuted, flexShrink: 0 } }, bannerNotices.length > 1 && /* @__PURE__ */ React.createElement(React.Fragment, null, bannerIdx + 1, "/", bannerNotices.length, " \xB7 "), "\uC790\uC138\uD788 \u2192")
  ))), /* @__PURE__ */ React.createElement("section", { style: { background: tweaks.primary, padding: "0 24px" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1 } }, [
    { icon: "\u{1F4CD}", label: "\uC8FC\uC18C", value: "\uAD11\uC8FC\uAD11\uC5ED\uC2DC \uC11C\uAD6C \uD68C\uC7AC\uB85C 859, 3\uCE35" },
    { icon: "\u260E", label: "\uC804\uD654", value: "062-655-4116" },
    { icon: "\u{1F550}", label: "\uC6B4\uC601", value: "\uD3C9\uC77C 09:00 \u2013 18:00" },
    { icon: "\u{1F310}", label: "\uC6F9\uC0AC\uC774\uD2B8", value: "ieumedu.or.kr" }
  ].map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "24px 28px", color: "#fff", display: "flex", alignItems: "center", gap: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 22 } }, item.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, opacity: 0.7, marginBottom: 2 } }, item.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500 } }, item.value)))))), /* @__PURE__ */ React.createElement("section", { style: { padding: "64px 24px 40px", background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1100, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: tweaks.accent, letterSpacing: "0.08em", marginBottom: 8 } }, "QUICK MENU"), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 26, fontWeight: 700, color: tweaks.text, margin: 0, fontFamily: tweaks.fontHeading } }, "\uC790\uC8FC \uCC3E\uC73C\uC2DC\uB294 \uBA54\uB274")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 } }, [
    { id: "courses", label: "\uAD50\uC721\uACFC\uC815", desc: "2\uAE09 \xB7 1\uAE09 \uCEE4\uB9AC\uD058\uB7FC", page: "courses" },
    { id: "enroll", label: "\uC218\uAC15\uC2E0\uCCAD", desc: "\uC628\uB77C\uC778 \xB7 \uC804\uD654", page: "enroll" },
    { id: "notice", label: "\uACF5\uC9C0\uC0AC\uD56D", desc: "\uBAA8\uC9D1 \xB7 \uC77C\uC815 \uACF5\uC9C0", page: "notice" },
    { id: "faculty", label: "\uAD50\uC218\uC9C4", desc: "\uAC15\uC0AC \uC18C\uAC1C", page: "faculty" },
    { id: "location", label: "\uC624\uC2DC\uB294 \uAE38", desc: "\uC9C0\uB3C4 \xB7 \uC8FC\uCC28 \uC548\uB0B4", page: "location" }
  ].map((q, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: q.id,
      onClick: () => setPage(q.page),
      style: {
        padding: "24px 16px",
        borderRadius: 16,
        background: "#fff",
        border: `1.5px solid ${tweaks.border}`,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s",
        textAlign: "center"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = tweaks.primary;
        e.currentTarget.style.background = tweaks.primaryLight;
        e.currentTarget.style.transform = "translateY(-3px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = tweaks.border;
        e.currentTarget.style.background = "#fff";
        e.currentTarget.style.transform = "translateY(0)";
      }
    },
    /* @__PURE__ */ React.createElement(QuickIcon, { id: q.id, tweaks }),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: tweaks.text, marginTop: 12, fontFamily: tweaks.fontHeading } }, q.label),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: tweaks.textMuted, marginTop: 4 } }, q.desc)
  ))))), /* @__PURE__ */ React.createElement("section", { style: { padding: "60px 24px 80px", background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "ABOUT", title: "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0", desc: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4 \uC804\uBB38 \uAD50\uC721\uAE30\uAD00\uC73C\uB85C\uC11C \uCCB4\uACC4\uC801\uC778 \uC774\uB860 \uAD50\uC721\uACFC \uC2E4\uC2B5\uC744 \uD1B5\uD574 \uC804\uBB38 \uC0C1\uB2F4 \uC778\uB825\uC744 \uC591\uC131\uD569\uB2C8\uB2E4.", tweaks }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 } }, [
    { title: "\uCCB4\uACC4\uC801 \uAD50\uC721\uACFC\uC815", desc: "\uBC1C\uB2EC\uC2EC\uB9AC, \uC0C1\uB2F4\uC774\uB860, \uBAA8\uB798\uB180\uC774\uCE58\uB8CC \uB4F1 \uB2E8\uACC4\uBCC4 \uCEE4\uB9AC\uD058\uB7FC\uC744 \uC6B4\uC601\uD569\uB2C8\uB2E4.", icon: "\u{1F4DA}" },
    { title: "\uBBFC\uAC04\uC790\uACA9 \uBC1C\uAE09", desc: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 2\uAE09\xB71\uAE09 \uC790\uACA9 \uACFC\uC815\uC744 \uD1B5\uD574 \uC804\uBB38\uC131\uC744 \uC778\uC99D\uD569\uB2C8\uB2E4.", icon: "\u{1F3C5}" },
    { title: "\uC804\uBB38 \uC0C1\uB2F4 \uC5F0\uACC4", desc: "\uC774\uC74C\uC2EC\uB9AC\uC5F0\uAD6C\uC0C1\uB2F4\uC13C\uD130\uC640 \uC5F0\uACC4\uD558\uC5EC \uC2E4\uC9C8\uC801\uC778 \uC0C1\uB2F4 \uACBD\uD5D8\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4.", icon: "\u{1F91D}" }
  ].map((item, i) => /* @__PURE__ */ React.createElement(Card, { key: i, tweaks }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 16 } }, item.icon), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 700, color: tweaks.text, margin: "0 0 10px", fontFamily: tweaks.fontHeading } }, item.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: tweaks.textMuted, lineHeight: 1.7, margin: 0 } }, item.desc)))))), /* @__PURE__ */ React.createElement("section", { style: { padding: "80px 24px", background: tweaks.bgMain } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "COURSES", title: "\uAD50\uC721\uACFC\uC815 \uC548\uB0B4", desc: "\uAE30\uCD08\uBD80\uD130 \uC804\uBB38\uAC00 \uACFC\uC815\uAE4C\uC9C0 \uCCB4\uACC4\uC801\uC778 \uB2E8\uACC4\uBCC4 \uAD50\uC721\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4.", tweaks }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 } }, [
    { level: "2\uAE09", title: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 2\uAE09", hours: "\uCD1D 60\uC2DC\uAC04 \xB7 \uC5F0\uAC04 \uC6B4\uC601", desc: "\uC0C1\uB2F4 \uC785\uBB38\uC790\xB7\uAD50\uC0AC\xB7\uBD80\uBAA8 \uB300\uC0C1 / \uAD50\uC721\uBE44 50\uB9CC \uC6D0", tag: "\uAD50\uC721\uBE44 \uACF5\uAC1C" },
    { level: "1\uAE09", title: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 1\uAE09", hours: "\uCD1D 90\uC2DC\uAC04 \xB7 \uC2EC\uD654\uACFC\uC815", desc: "2\uAE09 \uC218\uB8CC\uC790\xB7\uC0C1\uB2F4 \uACBD\uD5D8\uC790 \uB300\uC0C1 / \uAD50\uC721\uBE44 70\uB9CC \uC6D0", tag: "\uAD50\uC721\uBE44 \uACF5\uAC1C" },
    { level: "Info", title: "\uC778\uAC00 \uC808\uCC28 \uC9C4\uD589 \uC911", hours: "\uAC1C\uAC15 \uC77C\uC815 \xB7 \uBAA8\uC9D1 \uACF5\uACE0", desc: "\uC218\uAC15\uB8CC \uACF5\uAC1C \uC644\uB8CC \xB7 \uAC1C\uAC15\uC77C\uC740 \uC778\uAC00 \uC2B9\uC778 \uD6C4 \uACF5\uC9C0", tag: "\uC9C4\uD589\uC911" }
  ].map((item, i) => /* @__PURE__ */ React.createElement(Card, { key: i, tweaks, style: { position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 16, right: 16, padding: "4px 12px", borderRadius: 20, background: tweaks.primaryLight, color: tweaks.primary, fontSize: 12, fontWeight: 700 } }, item.tag), /* @__PURE__ */ React.createElement("div", { style: { width: 48, height: 48, borderRadius: 12, background: tweaks.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: item.level.length > 2 ? 13 : 16, fontWeight: 800, color: tweaks.primary, marginBottom: 20, fontFamily: tweaks.fontHeading } }, item.level), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 700, color: tweaks.text, margin: "0 0 6px", fontFamily: tweaks.fontHeading } }, item.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: tweaks.accent, fontWeight: 600, marginBottom: 12 } }, item.hours), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: tweaks.textMuted, lineHeight: 1.7, margin: 0 } }, item.desc)))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginTop: 36 } }, /* @__PURE__ */ React.createElement(Btn, { tweaks, variant: "secondary", onClick: () => setPage("courses") }, "\uC804\uCCB4 \uACFC\uC815 \uC790\uC138\uD788 \uBCF4\uAE30 \u2192")))), /* @__PURE__ */ React.createElement("section", { style: { padding: "80px 24px", background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", gap: 40 }, className: "home-notice-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, borderBottom: `2px solid ${tweaks.text}`, paddingBottom: 12 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 22, fontWeight: 700, color: tweaks.text, margin: 0, fontFamily: tweaks.fontHeading } }, "\uCD5C\uC2E0 \uACF5\uC9C0"), /* @__PURE__ */ React.createElement("button", { onClick: () => setPage("notice"), style: { background: "none", border: "none", fontSize: 13, color: tweaks.textMuted, cursor: "pointer", fontFamily: "inherit" } }, "\uC804\uCCB4\uBCF4\uAE30 +")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 0 } }, latestNotices.map((n, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: n.id,
      onClick: () => setPage("notice"),
      style: {
        display: "grid",
        gridTemplateColumns: "90px 1fr auto",
        gap: 16,
        alignItems: "center",
        padding: "16px 4px",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${tweaks.border}`,
        cursor: "pointer",
        fontFamily: "inherit",
        textAlign: "left",
        transition: "all 0.15s"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.background = tweaks.bgMain;
        e.currentTarget.style.paddingLeft = "12px";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.paddingLeft = "4px";
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { padding: "3px 10px", borderRadius: 4, background: tweaks.primaryLight, color: tweaks.primary, fontSize: 11, fontWeight: 700, justifySelf: "start" } }, n.category),
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: n.pinned ? 700 : 500, color: tweaks.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, n.pinned && /* @__PURE__ */ React.createElement("span", { style: { color: tweaks.primary, marginRight: 6 } }, "\u25CF"), n.title),
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: tweaks.textMuted } }, n.date)
  )))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { padding: 28, borderRadius: 16, background: tweaks.warmBg, border: `1px solid ${tweaks.border}`, height: "100%", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: tweaks.accent, letterSpacing: "0.08em", marginBottom: 6 } }, "CONTACT"), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 22, fontWeight: 700, color: tweaks.text, margin: "0 0 10px", fontFamily: tweaks.fontHeading } }, "\uAD50\uC721 \uBB38\uC758"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: tweaks.textMuted, lineHeight: 1.7, margin: "0 0 20px" } }, "\uC218\uAC15 \uACFC\uC815, \uC77C\uC815, \uC790\uACA9 \uB4F1", /* @__PURE__ */ React.createElement("br", null), "\uAD81\uAE08\uD55C \uC810\uC774 \uC788\uC73C\uC2DC\uBA74 \uC5B8\uC81C\uB4E0 \uC5F0\uB77D \uC8FC\uC138\uC694."), /* @__PURE__ */ React.createElement("div", { style: { padding: 16, borderRadius: 12, background: "#fff", marginBottom: 12, border: `1px solid ${tweaks.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: tweaks.textMuted, letterSpacing: "0.06em" } }, "TEL"), /* @__PURE__ */ React.createElement("a", { href: "tel:062-655-4116", style: { fontSize: 22, fontWeight: 800, color: tweaks.primary, textDecoration: "none", fontFamily: tweaks.fontHeading, letterSpacing: "-0.01em" } }, "062-655-4116"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: tweaks.textMuted, marginTop: 2 } }, "\uD3C9\uC77C 09:00 \u2013 18:00 / \uD1A0 10:00 \u2013 15:00")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: "auto" } }, /* @__PURE__ */ React.createElement(Btn, { tweaks, onClick: () => setPage("enroll"), style: { flex: 1, justifyContent: "center" } }, "\uC628\uB77C\uC778 \uBB38\uC758"), /* @__PURE__ */ React.createElement(Btn, { tweaks, variant: "outline", onClick: () => setPage("location"), style: { flex: 1, justifyContent: "center" } }, "\uC624\uC2DC\uB294 \uAE38")))))), /* @__PURE__ */ React.createElement("section", { style: { padding: "64px 24px", background: tweaks.primary, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 600, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 26, fontWeight: 700, color: "#fff", margin: "0 0 12px", fontFamily: tweaks.fontHeading } }, "\uAD50\uC721 \uC0C1\uB2F4 \uBC0F \uC218\uAC15\uC2E0\uCCAD"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 28 } }, "\uAD81\uAE08\uD55C \uC810\uC774 \uC788\uC73C\uC2DC\uBA74 \uC5B8\uC81C\uB4E0 \uBB38\uC758\uD574 \uC8FC\uC138\uC694."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Btn, { tweaks, style: { background: "#fff", color: tweaks.primary }, onClick: () => setPage("enroll") }, "\uC218\uAC15\uC2E0\uCCAD \uBC14\uB85C\uAC00\uAE30"), /* @__PURE__ */ React.createElement(
    Btn,
    {
      tweaks,
      style: { background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" },
      onClick: () => window.open("tel:062-655-4116")
    },
    "\u260E 062-655-4116"
  )))));
}
function QuickIcon({ id, tweaks }) {
  const size = 28;
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: tweaks.primary, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const wrapStyle = { width: 52, height: 52, borderRadius: 14, background: tweaks.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" };
  const icons = {
    courses: /* @__PURE__ */ React.createElement("svg", { ...props }, /* @__PURE__ */ React.createElement("path", { d: "M4 19.5A2.5 2.5 0 016.5 17H20" }), /* @__PURE__ */ React.createElement("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" }), /* @__PURE__ */ React.createElement("path", { d: "M8 7h8M8 11h6" })),
    enroll: /* @__PURE__ */ React.createElement("svg", { ...props }, /* @__PURE__ */ React.createElement("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }), /* @__PURE__ */ React.createElement("path", { d: "M14 2v6h6" }), /* @__PURE__ */ React.createElement("path", { d: "M9 15l2 2 4-4" })),
    notice: /* @__PURE__ */ React.createElement("svg", { ...props }, /* @__PURE__ */ React.createElement("path", { d: "M22 11.08V12a10 10 0 11-5.93-9.14" }), /* @__PURE__ */ React.createElement("path", { d: "M22 4L12 14.01l-3-3" })),
    faculty: /* @__PURE__ */ React.createElement("svg", { ...props }, /* @__PURE__ */ React.createElement("path", { d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "7", r: "4" })),
    verify: /* @__PURE__ */ React.createElement("svg", { ...props }, /* @__PURE__ */ React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }), /* @__PURE__ */ React.createElement("path", { d: "M9 12l2 2 4-4" })),
    location: /* @__PURE__ */ React.createElement("svg", { ...props }, /* @__PURE__ */ React.createElement("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "10", r: "3" }))
  };
  return /* @__PURE__ */ React.createElement("div", { style: wrapStyle }, icons[id]);
}
function EnrollPage({ tweaks, setPage }) {
  const content = window.SITE_CONTENT || {};
  const brand = content.brand || {};
  const contact = content.contact || {};
  const enroll = content.enroll || {};
  const initialDraft = React.useMemo(() => buildEmptyEnrollForm(), []);
  const restoredDraft = React.useMemo(() => readStorage(STORAGE_KEYS.enrollDraft, null), []);
  const prefill = readStorage(STORAGE_KEYS.enrollPrefill, null);
  const [form, setForm] = React.useState(() => buildFormFromSavedData(prefill || initialDraft));
  const [availableDraft, setAvailableDraft] = React.useState(() => prefill ? null : restoredDraft);
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [draftSaved, setDraftSaved] = React.useState(false);
  const [receiptId, setReceiptId] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState(null);
  const [submitError, setSubmitError] = React.useState("");
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const [turnstileMessage, setTurnstileMessage] = React.useState("");
  const [turnstileState, setTurnstileState] = React.useState("idle");
  const turnstileContainerRef = React.useRef(null);
  const turnstileWidgetRef = React.useRef(null);
  const normalizedPhone = normalizePhoneLink(contact.phone || "062-655-4116");
  const contactEmail = (contact.email || "").trim();
  const canEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
  const gasUrl = (enroll.gasUrl || "").trim();
  const turnstileSiteKey = String(enroll.turnstileSiteKey || "").trim();
  const turnstileAction = String(enroll.turnstileAction || "enroll_form").trim() || "enroll_form";
  const turnstileRequired = !!enroll.turnstileRequired;
  const turnstileEnabled = !!turnstileSiteKey;
  const turnstileEnforced = turnstileRequired || turnstileEnabled;
  const didInitDraftWrite = React.useRef(false);
  React.useEffect(() => {
    if (!didInitDraftWrite.current) {
      didInitDraftWrite.current = true;
      return;
    }
    writeStorage(STORAGE_KEYS.enrollDraft, form, { expiresInMs: STORAGE_TTLS.enrollDraft });
    setDraftSaved(true);
    const timer = window.setTimeout(() => setDraftSaved(false), 1200);
    return () => window.clearTimeout(timer);
  }, [form]);
  React.useEffect(() => {
    if (prefill) {
      window.localStorage.removeItem(STORAGE_KEYS.enrollPrefill);
    }
  }, []);
  const handleRestoreDraft = () => {
    if (!availableDraft) return;
    setForm(buildFormFromSavedData(availableDraft));
    setAvailableDraft(null);
    setSubmitError("");
    setErrors({});
  };
  const handleDiscardDraft = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEYS.enrollDraft);
    } catch (error) {
    }
    setAvailableDraft(null);
  };
  React.useEffect(() => {
    if (!turnstileEnforced) {
      setTurnstileState("disabled");
      setTurnstileMessage("");
      setTurnstileToken("");
      return;
    }
    if (!turnstileEnabled) {
      setTurnstileState("missing-config");
      setTurnstileMessage("\uBCF4\uC548 \uD655\uC778 \uC124\uC815\uC774 \uC544\uC9C1 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC804\uD654 \uBB38\uC758\uB97C \uC774\uC6A9\uD574 \uC8FC\uC138\uC694.");
      setTurnstileToken("");
      return;
    }
    let cancelled = false;
    let pollTimer = null;
    setTurnstileState("loading");
    setTurnstileMessage("");
    const renderWidget = () => {
      if (cancelled) return;
      if (!turnstileContainerRef.current) {
        pollTimer = window.setTimeout(renderWidget, 300);
        return;
      }
      if (!window.turnstile || typeof window.turnstile.render !== "function") {
        pollTimer = window.setTimeout(renderWidget, 300);
        return;
      }
      if (turnstileWidgetRef.current !== null) return;
      turnstileWidgetRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        action: turnstileAction,
        callback: (token) => {
          if (cancelled) return;
          setTurnstileToken(token || "");
          setTurnstileState("verified");
          setTurnstileMessage("");
        },
        "error-callback": (errorCode) => {
          if (cancelled) return true;
          setTurnstileToken("");
          setTurnstileState("error");
          setTurnstileMessage("\uBCF4\uC548 \uD655\uC778\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC0C8\uB85C\uACE0\uCE68 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.");
          console.error("Turnstile error:", errorCode);
          return true;
        },
        "expired-callback": () => {
          if (cancelled) return;
          setTurnstileToken("");
          setTurnstileState("expired");
          setTurnstileMessage("\uBCF4\uC548 \uD655\uC778 \uC2DC\uAC04\uC774 \uC9C0\uB098 \uB2E4\uC2DC \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
        },
        "timeout-callback": () => {
          if (cancelled) return;
          setTurnstileToken("");
          setTurnstileState("expired");
          setTurnstileMessage("\uBCF4\uC548 \uD655\uC778 \uC2DC\uAC04\uC774 \uC9C0\uB098 \uB2E4\uC2DC \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
        }
      });
    };
    renderWidget();
    return () => {
      cancelled = true;
      if (pollTimer) window.clearTimeout(pollTimer);
      if (window.turnstile && turnstileWidgetRef.current !== null) {
        try {
          window.turnstile.remove(turnstileWidgetRef.current);
        } catch (error) {
        }
      }
      turnstileWidgetRef.current = null;
    };
  }, [turnstileAction, turnstileEnabled, turnstileEnforced, turnstileSiteKey]);
  const inputStyle = {
    width: "100%",
    borderRadius: 12,
    border: `1.5px solid ${tweaks.border}`,
    fontSize: 15,
    fontFamily: "inherit",
    background: "#fff",
    outline: "none",
    transition: "border 0.2s",
    boxSizing: "border-box"
  };
  const singleLineFieldStyle = {
    ...inputStyle,
    height: 52,
    padding: "0 16px",
    lineHeight: 1.4
  };
  const selectFieldStyle = {
    ...singleLineFieldStyle,
    cursor: "pointer"
  };
  const textAreaStyle = {
    ...inputStyle,
    minHeight: 100,
    padding: "12px 16px",
    lineHeight: 1.6,
    resize: "vertical"
  };
  const labelStyle = { fontSize: 14, fontWeight: 600, color: tweaks.text, marginBottom: 6, display: "block" };
  const validateForm = () => {
    const nextErrors = {};
    const nameValue = sanitizeKoreanNameInput(form.name).trim();
    const phoneDigits = normalizePhoneValue(form.phone);
    const composedEmail = buildEmailAddress(form);
    if (!nameValue) {
      nextErrors.name = "\uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.";
    } else if (!/^[가-힣]+(?:\s[가-힣]+)*$/.test(nameValue)) {
      nextErrors.name = "\uC774\uB984\uC740 \uD55C\uAE00\uB9CC \uC785\uB825\uD574 \uC8FC\uC138\uC694.";
    }
    if (!phoneDigits) {
      nextErrors.phone = "\uC5F0\uB77D\uCC98\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.";
    } else if (!/^\d{9,11}$/.test(phoneDigits)) {
      nextErrors.phone = "\uC5F0\uB77D\uCC98 \uD615\uC2DD\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694.";
    }
    if (!sanitizeEmailLocalInput(form.emailLocal)) {
      nextErrors.email = "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.";
    } else if (!/^[a-z][a-z0-9._-]{1,31}$/.test(sanitizeEmailLocalInput(form.emailLocal))) {
      nextErrors.email = "\uC774\uBA54\uC77C \uC55E\uBD80\uBD84\uC740 \uC601\uBB38\uC73C\uB85C \uC2DC\uC791\uD574 \uC601\uBB38\xB7\uC22B\uC790\xB7.-_\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.";
    } else if (form.emailDomain === "direct" && !sanitizeEmailDomainInput(form.emailCustomDomain)) {
      nextErrors.email = "\uC774\uBA54\uC77C \uB3C4\uBA54\uC778\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.";
    } else if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test(form.emailDomain === "direct" ? sanitizeEmailDomainInput(form.emailCustomDomain) : form.emailDomain)) {
      nextErrors.email = "\uC774\uBA54\uC77C \uB3C4\uBA54\uC778 \uD615\uC2DD\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694.";
    } else if (!composedEmail) {
      nextErrors.email = "\uC774\uBA54\uC77C \uD615\uC2DD\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694.";
    }
    if (!form.privacyConsent) {
      nextErrors.privacyConsent = "\uAC1C\uC778\uC815\uBCF4 \uC218\uC9D1\xB7\uC774\uC6A9\uC5D0 \uB3D9\uC758\uD574 \uC8FC\uC138\uC694.";
    }
    if (turnstileEnforced) {
      if (!turnstileEnabled) {
        nextErrors.turnstile = "\uBCF4\uC548 \uD655\uC778 \uC124\uC815\uC774 \uC544\uC9C1 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC804\uD654 \uBB38\uC758\uB97C \uC774\uC6A9\uD574 \uC8FC\uC138\uC694.";
      } else if (!turnstileToken.trim()) {
        nextErrors.turnstile = "\uBCF4\uC548 \uD655\uC778\uC744 \uC644\uB8CC\uD574 \uC8FC\uC138\uC694.";
      }
    }
    if (form.website.trim()) {
      nextErrors.website = "\uC798\uBABB\uB41C \uC81C\uCD9C\uC785\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.";
    }
    return nextErrors;
  };
  const resetTurnstile = () => {
    setTurnstileToken("");
    if (!turnstileEnabled) return;
    if (window.turnstile && turnstileWidgetRef.current !== null) {
      try {
        window.turnstile.reset(turnstileWidgetRef.current);
      } catch (error) {
      }
    }
    setTurnstileState("loading");
  };
  const handleCopySummary = async (summary) => {
    try {
      await navigator.clipboard.writeText(summary);
      window.alert("\uC2E0\uCCAD \uB0B4\uC6A9\uC744 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4.");
    } catch (error) {
      window.prompt("\uBCF5\uC0AC\uD560 \uB0B4\uC6A9\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694.", summary);
    }
  };
  const submitToGas = async (payload) => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12e3);
    let response;
    try {
      response = await fetch(gasUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
    } finally {
      window.clearTimeout(timeout);
    }
    let responseText = "";
    try {
      responseText = await response.text();
    } catch (error) {
      responseText = "";
    }
    let responseJson = null;
    if (responseText) {
      try {
        responseJson = JSON.parse(responseText);
      } catch (error) {
        responseJson = null;
      }
    }
    const accepted = response.ok && (!responseJson || responseJson.ok !== false);
    return {
      accepted,
      responseJson
    };
  };
  const handleSubmit = async (event) => {
    var _a;
    if (event == null ? void 0 : event.preventDefault) event.preventDefault();
    setSubmitError("");
    const nextErrors = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (submitting) return;
    setSubmitting(true);
    const composedEmail = buildEmailAddress(form);
    const submissionId = `IEUM-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "")}-${Date.now().toString().slice(-6)}`;
    const submissionRecord = {
      submissionId,
      submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
      sourcePage: `${window.location.origin}${window.location.pathname}#enroll`,
      name: sanitizeKoreanNameInput(form.name).trim(),
      phone: formatPhoneInput(form.phone),
      email: composedEmail,
      course: normalizeCourseLabel(form.course),
      message: form.message.trim(),
      privacyConsent: form.privacyConsent,
      turnstileToken: turnstileToken.trim()
    };
    const duplicateKey = buildDuplicateKey(submissionRecord);
    const previousSubmissions = pruneSubmissionHistory(readStorage(STORAGE_KEYS.enrollSubmissions, []));
    const localDuplicate = previousSubmissions.find((item) => {
      if (!(item == null ? void 0 : item.submittedAt)) return false;
      const submittedTime = new Date(item.submittedAt).getTime();
      if (!submittedTime) return false;
      const withinCooldown = Date.now() - submittedTime < 10 * 60 * 1e3;
      return withinCooldown && buildDuplicateKey(item) === duplicateKey;
    });
    if (localDuplicate) {
      setSubmitError("\uBC29\uAE08 \uAC19\uC740 \uC774\uBA54\uC77C\xB7\uC5F0\uB77D\uCC98\xB7\uACFC\uC815\uC73C\uB85C \uC2E0\uCCAD\uD55C \uAE30\uB85D\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uBA54\uC77C\uD568 \uB610\uB294 \uAD50\uC721\uC6D0 \uC548\uB0B4\uB97C \uBA3C\uC800 \uD655\uC778\uD574 \uC8FC\uC138\uC694.");
      setSubmitting(false);
      return;
    }
    let deliveryStatus = "manual";
    let failureReason = "";
    if (gasUrl) {
      try {
        const result = await submitToGas(submissionRecord);
        if (result.accepted) {
          deliveryStatus = "gas";
        } else if ((_a = result.responseJson) == null ? void 0 : _a.error) {
          setSubmitError(result.responseJson.error);
          resetTurnstile();
          setSubmitting(false);
          return;
        } else {
          failureReason = "\uC790\uB3D9 \uC804\uC1A1 \uC751\uB2F5\uC744 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
        }
      } catch (error) {
        failureReason = (error == null ? void 0 : error.name) === "AbortError" ? "\uC811\uC218 \uC11C\uBC84 \uC751\uB2F5\uC774 \uC9C0\uC5F0\uB418\uC5B4 \uC790\uB3D9 \uC804\uC1A1\uC744 \uB05D\uAE4C\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4." : (error == null ? void 0 : error.message) || "\uC790\uB3D9 \uC804\uC1A1 \uC694\uCCAD \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.";
      }
    } else {
      failureReason = "\uC6B4\uC601\uC6A9 \uC811\uC218 URL\uC774 \uC544\uC9C1 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.";
    }
    const history = pruneSubmissionHistory(readStorage(STORAGE_KEYS.enrollSubmissions, []));
    const summaryRecord = {
      ...submissionRecord,
      deliveryStatus,
      failureReason
    };
    const savedRecord = {
      submissionId,
      submittedAt: submissionRecord.submittedAt,
      email: submissionRecord.email,
      phone: submissionRecord.phone,
      course: submissionRecord.course,
      deliveryStatus
    };
    writeStorage(STORAGE_KEYS.enrollSubmissions, [savedRecord, ...history].slice(0, 30), { expiresInMs: STORAGE_TTLS.enrollSubmissions });
    try {
      window.localStorage.removeItem(STORAGE_KEYS.enrollDraft);
    } catch (error) {
    }
    setAvailableDraft(null);
    setReceiptId(submissionId);
    setSubmitResult({
      mode: deliveryStatus === "gas" ? "sent" : "fallback",
      reason: failureReason,
      summary: buildEnrollSummary(summaryRecord)
    });
    setSubmitted(true);
    setSubmitting(false);
  };
  if (submitted) {
    const isFallback = (submitResult == null ? void 0 : submitResult.mode) === "fallback";
    const summary = (submitResult == null ? void 0 : submitResult.summary) || buildEnrollSummary({
      submissionId: receiptId,
      submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
      name: form.name,
      phone: form.phone,
      email: buildEmailAddress(form),
      course: normalizeCourseLabel(form.course),
      message: form.message,
      privacyConsent: form.privacyConsent
    });
    const smsHref = normalizedPhone ? `sms:${normalizedPhone}?body=${encodeURIComponent(summary)}` : "";
    const mailHref = canEmail ? `mailto:${contactEmail}?subject=${encodeURIComponent(`[${brand.name || "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0"}] \uC218\uAC15\uC2E0\uCCAD \uBB38\uC758`)}&body=${encodeURIComponent(summary)}` : "";
    return /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 72 } }, /* @__PURE__ */ React.createElement("section", { style: { padding: "120px 24px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 20 } }, "\u2713"), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 28, fontWeight: 700, color: tweaks.text, fontFamily: tweaks.fontHeading } }, isFallback ? enroll.fallbackTitle || "\uC2E0\uCCAD \uB0B4\uC6A9\uC740 \uC791\uC131\uB418\uC5C8\uC9C0\uB9CC \uC790\uB3D9 \uC811\uC218\uB294 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4" : enroll.successTitle || "\uC2E0\uCCAD\uC774 \uC811\uC218\uB418\uC5C8\uC2B5\uB2C8\uB2E4"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, color: tweaks.textMuted, marginTop: 12 } }, isFallback ? enroll.fallbackDesc || "\uC544\uB798 \uBC84\uD2BC\uC73C\uB85C \uC2E0\uCCAD \uB0B4\uC6A9\uC744 \uBCF5\uC0AC\uD558\uAC70\uB098 \uBB38\uC790\xB7\uC774\uBA54\uC77C\uB85C \uC804\uB2EC\uD574 \uC8FC\uC138\uC694." : enroll.successDesc || "\uB2F4\uB2F9\uC790\uAC00 \uD655\uC778 \uD6C4 \uC5F0\uB77D\uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, fontSize: 14, color: tweaks.text } }, "\uC811\uC218\uBC88\uD638: ", /* @__PURE__ */ React.createElement("strong", null, receiptId || "\uC0DD\uC131\uB428")), isFallback ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, fontSize: 13, color: tweaks.textMuted, lineHeight: 1.8 } }, "\uC790\uB3D9 \uC804\uC1A1 \uC2E4\uD328 \uC0AC\uC720: ", (submitResult == null ? void 0 : submitResult.reason) || "\uD655\uC778\uB418\uC9C0 \uC54A\uC74C") : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, fontSize: 13, color: tweaks.textMuted, lineHeight: 1.8 } }, "\uC811\uC218 \uB0B4\uC6A9\uC774 \uC6B4\uC601 \uC2DC\uD2B8\uB85C \uC804\uB2EC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uB2F4\uB2F9\uC790\uAC00 \uD655\uC778 \uD6C4 \uC5F0\uB77D\uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 28, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Btn, { tweaks, variant: "secondary", onClick: () => handleCopySummary(summary) }, "\uC2E0\uCCAD \uB0B4\uC6A9 \uBCF5\uC0AC"), isFallback && normalizedPhone && /* @__PURE__ */ React.createElement(Btn, { tweaks, variant: "outline", onClick: () => window.open(smsHref, "_self") }, "\uBB38\uC790 \uBCF4\uB0B4\uAE30"), isFallback && canEmail && /* @__PURE__ */ React.createElement(Btn, { tweaks, variant: "outline", onClick: () => window.open(mailHref, "_self") }, "\uC774\uBA54\uC77C \uBCF4\uB0B4\uAE30"), /* @__PURE__ */ React.createElement(Btn, { tweaks, variant: "outline", onClick: () => window.open(`tel:${normalizedPhone || "0626554116"}`) }, "\uC804\uD654 \uBB38\uC758"))));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 72 } }, /* @__PURE__ */ React.createElement("section", { style: { padding: "64px 24px 0", background: tweaks.warmBg } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto", padding: "40px 0 60px" } }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "ENROLLMENT", title: "\uC218\uAC15\uC2E0\uCCAD \xB7 \uBB38\uC758", desc: "\uC544\uB798 \uC591\uC2DD\uC744 \uC791\uC131\uD558\uC2DC\uAC70\uB098 \uC804\uD654\uB85C \uBB38\uC758\uD574 \uC8FC\uC138\uC694.", tweaks }))), /* @__PURE__ */ React.createElement("section", { style: { padding: "60px 24px", background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 40 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: draftSaved ? tweaks.primary : tweaks.textMuted, marginBottom: 16 } }, draftSaved ? "\uC784\uC2DC\uC800\uC7A5\uB418\uC5C8\uC2B5\uB2C8\uB2E4." : availableDraft ? "\uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uC774\uC804 \uC784\uC2DC\uC791\uC131 \uB0B4\uC6A9\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4." : "\uC791\uC131 \uB0B4\uC6A9\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uC81C\uD55C\uC801\uC73C\uB85C \uC784\uC2DC\uC800\uC7A5\uB429\uB2C8\uB2E4."), availableDraft && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 } }, /* @__PURE__ */ React.createElement(Btn, { tweaks, variant: "secondary", onClick: handleRestoreDraft, style: { padding: "10px 16px", fontSize: 14 } }, "\uC774\uC804 \uC784\uC2DC\uC791\uC131 \uBCF5\uC6D0"), /* @__PURE__ */ React.createElement(Btn, { tweaks, variant: "outline", onClick: handleDiscardDraft, style: { padding: "10px 16px", fontSize: 14 } }, "\uC800\uC7A5\uB41C \uB0B4\uC6A9 \uC9C0\uC6B0\uAE30")), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, style: { display: "grid", gap: 20 } }, submitError && /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", borderRadius: 12, background: "#FFF4F4", border: "1px solid #F0C7C7", color: "#8B1E1E", fontSize: 14, lineHeight: 1.7 } }, submitError), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: labelStyle }, "\uC774\uB984 *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      style: singleLineFieldStyle,
      value: form.name,
      onChange: (e) => setForm({ ...form, name: sanitizeKoreanNameInput(e.target.value) }),
      placeholder: "\uD64D\uAE38\uB3D9",
      autoComplete: "name",
      onFocus: (e) => e.target.style.borderColor = tweaks.primary,
      onBlur: (e) => e.target.style.borderColor = tweaks.border
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: tweaks.textMuted, marginTop: 6 } }, "\uC774\uB984\uC740 \uD55C\uAE00\uB9CC \uC785\uB825\uD569\uB2C8\uB2E4."), errors.name && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#C62828", marginTop: 6 } }, errors.name)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: labelStyle }, "\uC5F0\uB77D\uCC98 *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      style: singleLineFieldStyle,
      value: form.phone,
      onChange: (e) => setForm({ ...form, phone: formatPhoneInput(e.target.value) }),
      placeholder: "010-1234-5678",
      autoComplete: "tel",
      inputMode: "numeric",
      onFocus: (e) => e.target.style.borderColor = tweaks.primary,
      onBlur: (e) => e.target.style.borderColor = tweaks.border
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: tweaks.textMuted, marginTop: 6 } }, "\uC22B\uC790\uB9CC \uC785\uB825\uD558\uBA74 \uC790\uB3D9\uC73C\uB85C \uC5F0\uB77D\uCC98 \uD615\uC2DD\uC5D0 \uB9DE\uCDB0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."), errors.phone && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#C62828", marginTop: 6 } }, errors.phone)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: labelStyle }, "\uC774\uBA54\uC77C *"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) 24px minmax(112px, 148px)", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      style: singleLineFieldStyle,
      type: "text",
      value: form.emailLocal,
      onChange: (e) => setForm({ ...form, emailLocal: sanitizeEmailLocalInput(e.target.value) }),
      placeholder: "example",
      autoComplete: "email",
      inputMode: "email",
      onFocus: (e) => e.target.style.borderColor = tweaks.primary,
      onBlur: (e) => e.target.style.borderColor = tweaks.border
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: tweaks.text, textAlign: "center" } }, "@"), /* @__PURE__ */ React.createElement(
    "select",
    {
      style: selectFieldStyle,
      value: form.emailDomain,
      onChange: (e) => setForm({ ...form, emailDomain: e.target.value, emailCustomDomain: e.target.value === "direct" ? form.emailCustomDomain : "" })
    },
    EMAIL_DOMAIN_OPTIONS.map((option) => /* @__PURE__ */ React.createElement("option", { key: option.value, value: option.value }, option.label))
  )), form.emailDomain === "direct" && /* @__PURE__ */ React.createElement(
    "input",
    {
      style: singleLineFieldStyle,
      type: "text",
      value: form.emailCustomDomain,
      onChange: (e) => setForm({ ...form, emailCustomDomain: sanitizeEmailDomainInput(e.target.value) }),
      placeholder: "example.com",
      inputMode: "email",
      onFocus: (e) => e.target.style.borderColor = tweaks.primary,
      onBlur: (e) => e.target.style.borderColor = tweaks.border
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: tweaks.textMuted, marginTop: 6 } }, "\uC774\uBA54\uC77C \uC55E\uBD80\uBD84\uC740 \uC601\uBB38\uC73C\uB85C \uC2DC\uC791\uD558\uBA70 \uC601\uBB38\xB7\uC22B\uC790\xB7.-_\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."), errors.email && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#C62828", marginTop: 6 } }, errors.email)), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }, "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("label", null, "\uC6F9\uC0AC\uC774\uD2B8"), /* @__PURE__ */ React.createElement("input", { tabIndex: "-1", autoComplete: "off", value: form.website, onChange: (e) => setForm({ ...form, website: e.target.value }) })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: labelStyle }, "\uACFC\uC815 \uC120\uD0DD *"), /* @__PURE__ */ React.createElement("select", { style: selectFieldStyle, value: normalizeCourseLabel(form.course), onChange: (e) => setForm({ ...form, course: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 2\uAE09" }, "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 2\uAE09"), /* @__PURE__ */ React.createElement("option", { value: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 1\uAE09" }, "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 1\uAE09"), /* @__PURE__ */ React.createElement("option", { value: "\uAE30\uD0C0 \uBB38\uC758" }, "\uAE30\uD0C0 \uBB38\uC758"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: labelStyle }, "\uBB38\uC758 \uB0B4\uC6A9"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      style: textAreaStyle,
      value: form.message,
      onChange: (e) => setForm({ ...form, message: e.target.value }),
      placeholder: "\uAD81\uAE08\uD55C \uC810\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.",
      onFocus: (e) => e.target.style.borderColor = tweaks.primary,
      onBlur: (e) => e.target.style.borderColor = tweaks.border
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { padding: 16, borderRadius: 12, background: tweaks.bgMain, border: `1px solid ${tweaks.border}` } }, /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: tweaks.text, lineHeight: 1.8, cursor: "pointer" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      checked: !!form.privacyConsent,
      onChange: (e) => setForm({ ...form, privacyConsent: e.target.checked }),
      style: { marginTop: 3 }
    }
  ), /* @__PURE__ */ React.createElement("span", null, "\uC774\uB984, \uC5F0\uB77D\uCC98, \uC774\uBA54\uC77C, \uBB38\uC758 \uB0B4\uC6A9\uC744 \uC0C1\uB2F4 \uBC0F \uC218\uAC15 \uC548\uB0B4 \uBAA9\uC801\uC73C\uB85C \uC218\uC9D1\xB7\uC774\uC6A9\uD558\uB294 \uB370 \uB3D9\uC758\uD569\uB2C8\uB2E4.")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: tweaks.textMuted, marginTop: 8, lineHeight: 1.7 } }, "\uC0C1\uC138 \uAE30\uC900\uC740 \uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.", /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setPage("privacy"),
      style: { marginLeft: 8, background: "none", border: "none", padding: 0, color: tweaks.primary, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }
    },
    "\uBC14\uB85C\uAC00\uAE30"
  )), errors.privacyConsent && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#C62828", marginTop: 8 } }, errors.privacyConsent)), turnstileEnforced && /* @__PURE__ */ React.createElement("div", { style: { padding: 16, borderRadius: 12, background: "#fff", border: `1px solid ${tweaks.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: tweaks.text, marginBottom: 10 } }, "\uBCF4\uC548 \uD655\uC778 *"), turnstileEnabled ? /* @__PURE__ */ React.createElement("div", { ref: turnstileContainerRef }) : null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: turnstileMessage || errors.turnstile ? "#8B1E1E" : tweaks.textMuted, marginTop: 10, lineHeight: 1.7 } }, errors.turnstile || turnstileMessage || (turnstileState === "verified" ? "\uBCF4\uC548 \uD655\uC778\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4." : "\uC2E0\uCCAD \uC804 \uC790\uB3D9\uD654 \uACF5\uACA9 \uCC28\uB2E8\uC744 \uC704\uD55C \uBCF4\uC548 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4."))), /* @__PURE__ */ React.createElement(Btn, { tweaks, type: "submit", disabled: submitting, style: { width: "100%", justifyContent: "center" } }, submitting ? "\uC81C\uCD9C \uC911\uC785\uB2C8\uB2E4..." : "\uC2E0\uCCAD\uC11C \uC81C\uCD9C\uD558\uAE30"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: tweaks.textMuted, lineHeight: 1.7 } }, "\uAC19\uC740 \uC774\uBA54\uC77C\xB7\uC5F0\uB77D\uCC98\xB7\uACFC\uC815 \uC870\uD569\uC740 \uC77C\uC815 \uAE30\uAC04 \uC911\uBCF5 \uC811\uC218\uAC00 \uC81C\uD55C\uB429\uB2C8\uB2E4."))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, { tweaks, hover: false, style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("h4", { style: { fontSize: 16, fontWeight: 700, color: tweaks.text, margin: "0 0 16px", fontFamily: tweaks.fontHeading } }, "\uC9C1\uC811 \uBB38\uC758"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14, fontSize: 15, color: tweaks.textMuted } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: tweaks.text } }, "\uC804\uD654"), /* @__PURE__ */ React.createElement("br", null), contact.phone || "062-655-4116"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: tweaks.text } }, "\uC8FC\uC18C"), /* @__PURE__ */ React.createElement("br", null), contact.address || "\uAD11\uC8FC\uAD11\uC5ED\uC2DC \uC11C\uAD6C \uD68C\uC7AC\uB85C 859, 3\uCE35", /* @__PURE__ */ React.createElement("br", null), brand.name || "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: tweaks.text } }, "\uC6B4\uC601\uC2DC\uAC04"), /* @__PURE__ */ React.createElement("br", null), contact.hours || "\uD3C9\uC77C 09:00 - 18:00"))), /* @__PURE__ */ React.createElement(Card, { tweaks, hover: false }, /* @__PURE__ */ React.createElement("h4", { style: { fontSize: 16, fontWeight: 700, color: tweaks.text, margin: "0 0 12px", fontFamily: tweaks.fontHeading } }, "\uAD00\uB828 \uB9C1\uD06C"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 10, fontSize: 14 } }, (enroll.links || []).map((link, i) => /* @__PURE__ */ React.createElement("a", { key: i, href: link.url, target: "_blank", rel: "noopener", style: { color: tweaks.primary, textDecoration: "none" } }, link.label, " \u2192"))))))));
}
function CertificationPage({ tweaks }) {
  const [openIdx, setOpenIdx] = React.useState(null);
  const faqs = [
    { q: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC \uC790\uACA9\uC740 \uAD6D\uAC00\uACF5\uC778\uC778\uAC00\uC694?", a: "\uBCF8 \uC790\uACA9\uC740 \uBBFC\uAC04\uC790\uACA9\uC73C\uB85C, \uAD6D\uAC00\uACF5\uC778 \uC790\uACA9\uC774 \uC544\uB2D9\uB2C8\uB2E4. \uB2E4\uB9CC \uD55C\uAD6D\uC9C1\uC5C5\uB2A5\uB825\uC5F0\uAD6C\uC6D0\uC5D0 \uB4F1\uB85D\uB41C \uC815\uC2DD \uBBFC\uAC04\uC790\uACA9\uC785\uB2C8\uB2E4." },
    { q: "\uC790\uACA9 \uCDE8\uB4DD \uD6C4 \uC5B4\uB5A4 \uD65C\uB3D9\uC774 \uAC00\uB2A5\uD55C\uAC00\uC694?", a: "\uC544\uB3D9\xB7\uCCAD\uC18C\uB144\xB7\uC131\uC778 \uB300\uC0C1 \uC2EC\uB9AC\uC0C1\uB2F4, \uAD50\uC721\uAE30\uAD00 \uC0C1\uB2F4\uC0AC, \uC0AC\uC124 \uC0C1\uB2F4\uC13C\uD130 \uC6B4\uC601, \uD3C9\uC0DD\uAD50\uC721 \uAC15\uC0AC \uB4F1\uC758 \uD65C\uB3D9\uC774 \uAC00\uB2A5\uD569\uB2C8\uB2E4." },
    { q: "\uC218\uAC15 \uC790\uACA9 \uC870\uAC74\uC774 \uC788\uB098\uC694?", a: "2\uAE09 \uACFC\uC815\uC740 \uC2EC\uB9AC\uC0C1\uB2F4 \uBC0F \uAD50\uC721\uC5D0 \uAD00\uC2EC \uC788\uB294 \uBD84\uC774\uBA74 \uB204\uAD6C\uB098 \uC218\uAC15 \uAC00\uB2A5\uD569\uB2C8\uB2E4. 1\uAE09 \uACFC\uC815\uC740 2\uAE09 \uC790\uACA9 \uCDE8\uB4DD\uC790\uC5D0 \uD55C\uD569\uB2C8\uB2E4." },
    { q: "\uAD50\uC721\uBE44\uB294 \uC5B4\uB5BB\uAC8C \uB418\uB098\uC694?", a: "\uC5F0\uAC04 \uAD50\uC721\uACC4\uD68D\uC548 \uAE30\uC900\uC73C\uB85C 2\uAE09 50\uB9CC \uC6D0, 1\uAE09 70\uB9CC \uC6D0\uC785\uB2C8\uB2E4. (\uC2E4\uC2B5\xB7\uD3C9\uAC00\uBE44 \uD3EC\uD568 / \uAD50\uC7AC\xB7\uC790\uACA9\uC99D\uBE44 \uBCC4\uB3C4)" },
    { q: "\uC628\uB77C\uC778 \uC218\uAC15\uC774 \uAC00\uB2A5\uD55C\uAC00\uC694?", a: "\uACFC\uC815\uBCC4\uB85C \uC628\uB77C\uC778/\uC624\uD504\uB77C\uC778 \uBCD1\uD589 \uC6B4\uC601 \uC5EC\uBD80\uAC00 \uB2E4\uB985\uB2C8\uB2E4. \uC0C1\uC138 \uB0B4\uC6A9\uC740 \uBB38\uC758\uD574 \uC8FC\uC138\uC694." }
  ];
  return /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 72 } }, /* @__PURE__ */ React.createElement("section", { style: { padding: "64px 24px 0", background: tweaks.warmBg } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto", padding: "40px 0 60px" } }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "CERTIFICATION", title: "\uBBFC\uAC04\uC790\uACA9 \uC548\uB0B4", desc: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC \uBBFC\uAC04\uC790\uACA9\uC5D0 \uB300\uD55C \uC548\uB0B4\uC785\uB2C8\uB2E4.", tweaks }))), /* @__PURE__ */ React.createElement("section", { style: { padding: "60px 24px", background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 800, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(Card, { tweaks, hover: false, style: { marginBottom: 32 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 700, color: tweaks.text, margin: "0 0 20px", fontFamily: tweaks.fontHeading } }, "\uC790\uACA9 \uC815\uBCF4"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px 24px", fontSize: 15, lineHeight: 1.8 } }, [
    ["\uC790\uACA9\uBA85", "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 2\uAE09 / 1\uAE09"],
    ["\uBC1C\uAE09\uAE30\uAD00", "\uB300\uD55C\uC2EC\uB9AC\uD1B5\uD569\uC5F0\uAD6C\uD68C"],
    ["\uB4F1\uB85D\uAE30\uAD00", "\uD55C\uAD6D\uC9C1\uC5C5\uB2A5\uB825\uC5F0\uAD6C\uC6D0"],
    ["\uAD50\uC721\uAE30\uAD00", "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0"],
    ["\uC790\uACA9 \uC720\uD615", "\uBBFC\uAC04\uC790\uACA9 (\uBE44\uACF5\uC778)"]
  ].map(([k, v], i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: i }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, color: tweaks.primary, whiteSpace: "nowrap" } }, k), /* @__PURE__ */ React.createElement("div", { style: { color: tweaks.text } }, v))))), /* @__PURE__ */ React.createElement(Card, { tweaks, hover: false, style: { marginBottom: 32, background: tweaks.bgMain } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: tweaks.textMuted, lineHeight: 1.8, margin: 0 } }, "\u203B \uBCF8 \uC790\uACA9\uC740 \uBBFC\uAC04\uC790\uACA9\uC73C\uB85C \uAD6D\uAC00\uACF5\uC778 \uC790\uACA9\uC774 \uC544\uB2D9\uB2C8\uB2E4.", /* @__PURE__ */ React.createElement("br", null), "\u203B \uBBFC\uAC04\uC790\uACA9 \uB4F1\uB85D \uBC0F \uACF5\uC778 \uC81C\uB3C4\uC5D0 \uAD00\uD55C \uC0AC\uD56D\uC740 \uD55C\uAD6D\uC9C1\uC5C5\uB2A5\uB825\uC5F0\uAD6C\uC6D0 \uBBFC\uAC04\uC790\uACA9\uC815\uBCF4\uC11C\uBE44\uC2A4(www.pqi.or.kr)\uC5D0\uC11C \uD655\uC778\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4.", /* @__PURE__ */ React.createElement("br", null), "\u203B \uBCF8 \uC790\uACA9\uC740 \uC758\uB8CC\uD589\uC704\uB97C \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.")), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 22, fontWeight: 700, color: tweaks.text, margin: "48px 0 24px", fontFamily: tweaks.fontHeading } }, "\uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 8 } }, faqs.map((faq, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { borderRadius: 12, border: `1px solid ${tweaks.border}`, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setOpenIdx(openIdx === i ? null : i),
      style: { width: "100%", padding: "18px 20px", background: openIdx === i ? tweaks.bgMain : "#fff", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 15, fontWeight: 600, color: tweaks.text, fontFamily: "inherit", textAlign: "left", gap: 12 }
    },
    faq.q,
    /* @__PURE__ */ React.createElement("span", { style: { transform: openIdx === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0, fontSize: 12, color: tweaks.textMuted } }, "\u25BC")
  ), openIdx === i && /* @__PURE__ */ React.createElement("div", { style: { padding: "0 20px 18px", fontSize: 14, color: tweaks.textMuted, lineHeight: 1.8, background: tweaks.bgMain } }, faq.a)))))));
}
function VerifyPage({ tweaks }) {
  const [certNum, setCertNum] = React.useState("");
  const [result, setResult] = React.useState(null);
  const handleSearch = () => {
    if (certNum.trim()) {
      setResult({
        name: "\uD64D\uAE38\uB3D9",
        birth: "2000.00.00",
        certNo: certNum || "2026-02-2-0001",
        level: "\uBAA8\uB798\uB180\uC774\uC2EC\uB9AC\uC0C1\uB2F4\uC0AC 2\uAE09",
        issueDate: "2026\uB144 2\uC6D4 23\uC77C",
        issuer: "\uB300\uD55C\uC2EC\uB9AC\uD1B5\uD569\uC5F0\uAD6C\uD68C",
        valid: true
      });
    }
  };
  return /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 72 } }, /* @__PURE__ */ React.createElement("section", { style: { padding: "64px 24px 0", background: tweaks.warmBg } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto", padding: "40px 0 60px" } }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "VERIFY", title: "\uC790\uACA9\uC778\uC99D \uC870\uD68C", desc: "\uBC1C\uAE09\uB41C \uC790\uACA9\uC99D\uC758 \uC9C4\uC704 \uC5EC\uBD80\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.", tweaks }))), /* @__PURE__ */ React.createElement("section", { style: { padding: "60px 24px", background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 520, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(Card, { tweaks, hover: false }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 600, color: tweaks.text, marginBottom: 8, display: "block" } }, "\uC790\uACA9\uBC88\uD638 \uC785\uB825"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      style: { flex: 1, padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${tweaks.border}`, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
      placeholder: "\uC608: 2026-02-2-0001",
      value: certNum,
      onChange: (e) => setCertNum(e.target.value),
      onKeyDown: (e) => e.key === "Enter" && handleSearch(),
      onFocus: (e) => e.target.style.borderColor = tweaks.primary,
      onBlur: (e) => e.target.style.borderColor = tweaks.border
    }
  ), /* @__PURE__ */ React.createElement(Btn, { tweaks, onClick: handleSearch }, "\uC870\uD68C"))), result && /* @__PURE__ */ React.createElement(Card, { tweaks, hover: false, style: { marginTop: 20, border: `2px solid ${result.valid ? "#4CAF50" : "#f44336"}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: result.valid ? "#E8F5E9" : "#FFEBEE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 } }, result.valid ? "\u2713" : "\u2717"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: result.valid ? "#2E7D32" : "#C62828", fontSize: 16 } }, result.valid ? "\uC720\uD6A8\uD55C \uC790\uACA9\uC785\uB2C8\uB2E4" : "\uD655\uC778\uB418\uC9C0 \uC54A\uB294 \uC790\uACA9\uBC88\uD638\uC785\uB2C8\uB2E4"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 20px", fontSize: 14, lineHeight: 1.8 } }, [
    ["\uC790\uACA9\uBA85", result.level],
    ["\uC131\uBA85", result.name],
    ["\uC0DD\uB144\uC6D4\uC77C", result.birth],
    ["\uC790\uACA9\uBC88\uD638", result.certNo],
    ["\uBC1C\uAE09\uC77C", result.issueDate],
    ["\uBC1C\uAE09\uAE30\uAD00", result.issuer]
  ].map(([k, v], i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: i }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, color: tweaks.textMuted } }, k), /* @__PURE__ */ React.createElement("div", { style: { color: tweaks.text } }, v)))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, padding: 12, borderRadius: 8, background: tweaks.bgMain, fontSize: 12, color: tweaks.textMuted, lineHeight: 1.7 } }, "\u203B \uBCF8 \uC790\uACA9\uC740 \uBBFC\uAC04\uC790\uACA9\uC73C\uB85C \uAD6D\uAC00\uACF5\uC778 \uC790\uACA9\uC774 \uC544\uB2D9\uB2C8\uB2E4.", /* @__PURE__ */ React.createElement("br", null), "\u203B \uC758\uB8CC\uD589\uC704\uB97C \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.")))));
}
function SiteFooter({ tweaks }) {
  return /* @__PURE__ */ React.createElement("footer", { style: { background: tweaks.text, padding: "48px 24px 32px" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "#fff", fontSize: 16, marginBottom: 12, fontFamily: tweaks.fontHeading } }, "\uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 2 } }, "\uB300\uD45C: \uC120\uC560\uC21C", /* @__PURE__ */ React.createElement("br", null), "\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638: 296-05-03812", /* @__PURE__ */ React.createElement("br", null), "\uAD11\uC8FC\uAD11\uC5ED\uC2DC \uC11C\uAD6C \uD68C\uC7AC\uB85C 859, 3\uCE35", /* @__PURE__ */ React.createElement("br", null), "\u260E 062-655-4116")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 12 } }, "\uC5F0\uACC4 \uAE30\uAD00"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 2 } }, "\uC774\uC74C\uC2EC\uB9AC\uC5F0\uAD6C\uC0C1\uB2F4\uC13C\uD130", /* @__PURE__ */ React.createElement("br", null), "\uB300\uD55C\uC2EC\uB9AC\uD1B5\uD569\uC5F0\uAD6C\uD68C")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 12 } }, "\uC678\uBD80 \uB9C1\uD06C"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, lineHeight: 2 } }, /* @__PURE__ */ React.createElement("a", { href: "https://news.ieumedu.kr", target: "_blank", rel: "noopener", style: { color: "rgba(255,255,255,0.5)", textDecoration: "none" } }, "\uC774\uC74C\uAD50\uC721\uC800\uB110 \u2192"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "https://think-sis.co.kr", target: "_blank", rel: "noopener", style: { color: "rgba(255,255,255,0.5)", textDecoration: "none" } }, "\uBE14\uB85C\uADF8 \u2192"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "https://brunch.co.kr/@205593d149c84b6", target: "_blank", rel: "noopener", style: { color: "rgba(255,255,255,0.5)", textDecoration: "none" } }, "\uBE0C\uB7F0\uCE58\uBD81 \u2192"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "https://www.pqi.or.kr", target: "_blank", rel: "noopener", style: { color: "rgba(255,255,255,0.5)", textDecoration: "none" } }, "\uBBFC\uAC04\uC790\uACA9\uC815\uBCF4\uC11C\uBE44\uC2A4 \u2192")))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", lineHeight: 1.8 } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8, color: "rgba(255,255,255,0.65)" } }, "\u203B \uBCF8 \uAD50\uC721\uC6D0\uC740 \uD604\uC7AC ", /* @__PURE__ */ React.createElement("strong", { style: { color: "rgba(255,255,255,0.85)" } }, "\uAD11\uC8FC\uAD11\uC5ED\uC2DC \uC11C\uAD6C\uCCAD\uC5D0 \uD3C9\uC0DD\uAD50\uC721\uC2DC\uC124 \uB4F1\uB85D \xB7 \uC778\uAC00 \uC808\uCC28"), "\uB97C \uC9C4\uD589\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4. \xA0\uC218\uAC15\uB8CC\uB294 \uACF5\uAC1C\uB418\uC5C8\uC73C\uBA70 \uAC1C\uAC15 \uC77C\uC815\uC740 \uC778\uAC00 \uC2B9\uC778 \uD6C4 \uACF5\uC9C0\uB429\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("div", { style: { color: "rgba(255,255,255,0.35)" } }, "\xA9 2026 \uC774\uC74C\uD1B5\uD569\uD3C9\uC0DD\uAD50\uC721\uC6D0. All rights reserved."))));
}
window.SectionTitle = SectionTitle;
window.Card = Card;
window.Btn = Btn;
window.HomePage = HomePage;
window.EnrollPage = EnrollPage;
window.CertificationPage = CertificationPage;
window.VerifyPage = VerifyPage;
window.SiteFooter = SiteFooter;
