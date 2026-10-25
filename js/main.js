/* ---------- 유틸 ---------- */
const $ = (sel) => document.querySelector(sel);
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const tags = (list) => list.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
const statusBadge = (s) => (s ? `<span class="status status-${esc(s).toLowerCase()}">${esc(s.charAt(0) + s.slice(1).toLowerCase())}</span>` : "");
const catClass = (c) => (/english|영어/i.test(c || "") ? "c-en" : /word|어휘/i.test(c || "") ? "c-word" : "c-dev");

/* ---------- 테마 토글 ---------- */
const MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 13.1A8.5 8.5 0 0 1 10.9 3.5 8.5 8.5 0 1 0 20.5 13.1Z"/></svg>';
const SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>';

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = $("#themeToggle");
  btn.innerHTML = theme === "dark" ? SUN : MOON;
  btn.setAttribute("aria-label", theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환");
  try { localStorage.setItem("theme", theme); } catch (e) {}
}
applyTheme(document.documentElement.dataset.theme || "light");
$("#themeToggle").addEventListener("click", () =>
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")
);

/* ---------- 네비게이션 활성 표시 ---------- */
const navIds = ["home", "projects", "experiments", "notes", "about"];
function updateActive() {
  const y = window.scrollY + 180;
  let current = "home";
  navIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y) current = id;
  });
  document.querySelectorAll(".nav-menu a").forEach((a) =>
    a.classList.toggle("active", a.dataset.section === current)
  );
}
window.addEventListener("scroll", updateActive, { passive: true });
updateActive();

/* ---------- 타이핑 효과 ---------- */
(function typing() {
  const el = $("#typing");
  const lines = SITE.typingLines;
  let li = 0, ci = 0, deleting = false;
  function tick() {
    const line = lines[li];
    el.textContent = line.slice(0, ci);
    if (!deleting && ci < line.length) { ci++; setTimeout(tick, 60); }
    else if (!deleting) { deleting = true; setTimeout(tick, 1400); }
    else if (ci > 0) { ci--; setTimeout(tick, 25); }
    else { deleting = false; li = (li + 1) % lines.length; setTimeout(tick, 300); }
  }
  tick();
})();

/* ---------- Projects ---------- */
function projectCard(p) {
  const link = p.github
    ? `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="card-link">View on GitHub ↗</a>`
    : `<span class="card-link muted">Coming soon</span>`;
  const role = p.role && p.role.length
    ? `<ul class="role-list">${p.role.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : "";
  return `
    <article class="card project-card ${p.featured ? "featured" : ""}">
      <div class="card-top">
        <span class="card-category">${esc(p.category)} · ${esc(p.type)}</span>
        ${statusBadge(p.status)}
      </div>
      <h3>${esc(p.title)}</h3>
      <p class="card-subtitle">${esc(p.subtitle)}</p>
      <p class="card-desc">${esc(p.description)}</p>
      ${role}
      <div class="tags">${tags(p.techStack)}</div>
      ${link}
    </article>`;
}
const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);
$("#projectList").innerHTML = [...featured, ...others].map(projectCard).join("");

/* ---------- Experiments ---------- */
$("#experimentList").innerHTML = experiments.map((e) => `
  <article class="card experiment-card">
    <div class="card-top">
      <span class="exp-number">${esc(e.number)}</span>
      ${statusBadge(e.status)}
    </div>
    <span class="card-category">${esc(e.category)}</span>
    <h3>${esc(e.title)}</h3>
    <p class="card-subtitle">${esc(e.subtitle)}</p>
    <p class="card-desc">${esc(e.description)}</p>
    <pre class="methods">${e.methods.map((m) => `<span class="prompt">→</span> ${esc(m)}`).join("\n")}</pre>
    <div class="tags">${tags(e.techStack)}</div>
  </article>`).join("");

/* ---------- Latest Notes (posts.json) ---------- */
(async function loadPosts() {
  const box = $("#notesList");
  try {
    const res = await fetch("posts.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    const posts = await res.json();
    if (!posts.length) {
      box.innerHTML = `<p class="notes-status">아직 불러온 글이 없습니다. 곧 첫 기록이 올라옵니다.</p>`;
      return;
    }
    box.innerHTML = posts.map((p, i) => `
      <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" class="note-item ${catClass(p.category)}">
        <span class="note-number">${String(i + 1).padStart(2, "0")}</span>
        <div class="note-content">
          ${p.category ? `<span class="card-category">${esc(p.category)}</span>` : ""}
          <h3>${esc(p.title)}</h3>
        </div>
        <span class="note-date">${esc(p.date)}</span>
        <span class="note-arrow" aria-hidden="true">↗</span>
      </a>`).join("");
  } catch (err) {
    console.error("Latest Notes 오류:", err);
    box.innerHTML = `<p class="notes-status error">게시글을 불러오지 못했습니다.</p>`;
  }
})();

/* ---------- About ---------- */
$("#aboutSummary").innerHTML = summary.map((s) => `
  <div class="summary-item">
    <span>${esc(s.label)}</span><strong>${esc(s.value)}</strong><p>${esc(s.desc)}</p>
  </div>`).join("");

$("#careerList").innerHTML = careers.map((c) => `
  <div class="timeline-item">
    <span class="timeline-tag ${c.tag === "NOW" ? "now" : ""}">${esc(c.tag)}</span>
    <div>
      <h4>${esc(c.title)}</h4>
      <ul>${c.tasks.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    </div>
  </div>`).join("");

$("#stackList").innerHTML = stack.map((s) => `<span class="stack-item">${esc(s)}</span>`).join("");
$("#certList").innerHTML = certs.map((c) => `<span class="cert-item"><span class="ok">✓</span> ${esc(c)}</span>`).join("");

/* ---------- Contact / Footer ---------- */
$("#contactLinks").innerHTML = contacts.map((c) => `
  <a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer" class="contact-link">
    <span class="contact-label">${esc(c.label)}</span><span>${esc(c.value)}</span><span aria-hidden="true">↗</span>
  </a>`).join("");
$("#year").textContent = new Date().getFullYear();
(function () {
  const d = new Date(), w = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const el = $("#today");
  if (el) el.textContent = `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, "0")} ${w[d.getDay()]}`;
})();
