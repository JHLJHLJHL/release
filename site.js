// 세 페이지가 함께 쓰는 윗줄 · 아랫줄 · 카드 그리기.
const GITHUB = "https://github.com/JHLJHLJHL";

const ICON = {
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 20h14"/></svg>`,
  open: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5h5v5m0-5-8 8M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>`,
};

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

// 타일 아이콘은 둥근 모서리로 자르고, 모양 그대로인 아이콘(iconFree)은 자르지 않는다.
function icon(app, size, extra = "") {
  const cls = ["icon", app.iconFree ? "icon-free" : "", extra].filter(Boolean).join(" ");
  return `<span class="${cls}"><img src="${app.icon}" alt="" width="${size}" height="${size}"></span>`;
}

function badges(app) {
  return `<div class="badges">
    ${app.audience === "teacher" ? `<span class="badge badge-teacher">교사용</span>` : ""}
    <span class="badge">${esc(app.platform.split(" · ").pop())}</span>
  </div>`;
}

function card(app) {
  return `<a class="card" href="app.html?id=${app.id}">
    ${icon(app, 56)}
    <span><h3>${esc(app.name)}</h3><p>${esc(app.tagline)}</p>${badges(app)}</span>
  </a>`;
}

function renderChrome(current) {
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    nav.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html">HONEYMATH</a>
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
