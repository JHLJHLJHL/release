// 세 페이지가 함께 쓰는 윗줄 · 아랫줄 · 카드 그리기.
const GITHUB = "https://github.com/JHLJHLJHL";
const EMAIL = "honeymath.gbe@gmail.com";

const ICON = {
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 20h14"/></svg>`,
  open: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5h5v5m0-5-8 8M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>`,
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

// 클립보드 API가 막힌 환경(http 주소 등)에서는 임시 입력칸으로 복사한다.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {}
  const box = document.createElement("textarea");
  box.value = text;
  box.setAttribute("readonly", "");
  box.style.cssText = "position:fixed;top:0;left:0;opacity:0";
  document.body.append(box);
  box.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch {}
  box.remove();
  return ok;
}

function renderChrome(current, brandHref = "index.html") {
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    nav.innerHTML = `<div class="wrap">
      <a class="brand" href="${brandHref}">HONEYMATH</a>
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
      <button class="copy-mail" type="button" title="눌러서 복사">${EMAIL}</button>
    </div>`;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.append(toast);
    let timer;
    foot.querySelector(".copy-mail").addEventListener("click", async () => {
      toast.textContent = (await copyText(EMAIL)) ? "복사되었습니다." : "복사하지 못했습니다.";
      toast.classList.add("show");
      clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove("show"), 1800);
    });
  }
}
