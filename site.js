// 세 페이지가 함께 쓰는 윗줄 · 아랫줄 · 카드 그리기.
const GITHUB = "https://github.com/JHLJHLJHL";

const MARK = `<svg viewBox="0 0 64 64" aria-hidden="true">
  <defs><linearGradient id="hm" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ffc35c"/><stop offset="1" stop-color="#e8890c"/></linearGradient></defs>
  <path d="M32 3 57 17.5v29L32 61 7 46.5v-29Z" fill="url(#hm)"/>
  <path d="M22 22v20M42 22v20M22 32h20" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
</svg>`;

const ICON = {
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 20h14"/></svg>`,
  open: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5h5v5m0-5-8 8M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>`,
};

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function iconSrc(app) {
  return `assets/${app.id}/${app.id === "starmd" || app.id === "review" || app.id === "yeolmae" ? "icon.png" : "icon.svg"}`;
}

function badges(app) {
  return `<div class="badges">
    <span class="badge badge-free">무료</span>
    ${app.audience === "teacher" ? `<span class="badge badge-teacher">교사용</span>` : ""}
    <span class="badge">${esc(app.platform.split(" · ")[0])}</span>
  </div>`;
}

function card(app) {
  return `<a class="card" href="app.html?id=${app.id}">
    <span class="icon"><img src="${iconSrc(app)}" alt="" width="56" height="56" loading="lazy"></span>
    <span><h3>${esc(app.name)}</h3><p>${esc(app.tagline)}</p>${badges(app)}</span>
  </a>`;
}

function renderChrome(current) {
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    nav.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html">${MARK}HONEYMATH</a>
      <nav class="nav-links">
        <a href="apps.html"${current === "apps" ? ' aria-current="page"' : ""}>앱</a>
        <a href="${GITHUB}" target="_blank" rel="noopener">GitHub</a>
      </nav>
    </div>`;
  }
  const foot = document.querySelector("[data-foot]");
  if (foot) {
    foot.innerHTML = `<div class="wrap">
      <span>© ${new Date().getFullYear()} HONEYMATH</span>
      <span><a href="apps.html">앱 목록</a> · <a href="${GITHUB}/release/releases" target="_blank" rel="noopener">모든 릴리스</a></span>
    </div>`;
  }
}
