document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupSearch();
  if (document.getElementById("project-list")) initPortfolio();
  if (document.getElementById("project-detail")) initProjectDetail();
});

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");
  const close = document.querySelector(".menu-close");
  if (!toggle || !menu) return;
  const setOpen = (open) => {
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  };
  toggle.addEventListener("click", () => setOpen(true));
  close?.addEventListener("click", () => setOpen(false));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
}

function setupSearch() {
  const panel = document.querySelector(".search-panel");
  const open = document.querySelector(".search-toggle");
  const close = document.querySelector(".search-close");
  const input = document.querySelector("#project-search");
  if (!open) return;
  open.addEventListener("click", () => {
    if (!panel) return;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    setTimeout(() => input?.focus(), 120);
  });
  close?.addEventListener("click", () => {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    if (input) input.value = "";
    document.querySelectorAll(".project-item").forEach(el => el.hidden = false);
  });
  input?.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll(".project-item").forEach(item => {
      item.hidden = q && !item.dataset.search.includes(q);
    });
  });
}

function initPortfolio() {
  const list = document.getElementById("project-list");
  const filters = document.querySelectorAll(".filter");
  const render = (filter = "All") => {
    list.innerHTML = "";
    projects.filter(p => filter === "All" || p.category === filter).forEach((p, index) => {
      const article = document.createElement("article");
      article.className = "project-item reveal";
      article.dataset.search = `${p.title} ${p.location} ${p.category} ${p.year}`.toLowerCase();
      article.innerHTML = `
        <div class="project-meta">
          <span class="project-number">${p.number}</span>
          <div class="project-copy">
            <h2>${p.title}</h2>
            <p>${p.location.toUpperCase()}</p>
            <p>${p.category.toUpperCase()} · ${p.year}</p>
          </div>
          <a class="view-link" href="project.html?id=${p.id}" aria-label="View ${p.title}">VIEW PROJECT →</a>
        </div>
        <a class="project-image-wrap" href="project.html?id=${p.id}" aria-label="Open ${p.title}">
          <img src="${p.cover}" alt="${p.title} — ${p.category}, ${p.location}" loading="${index === 0 ? "eager" : "lazy"}">
        </a>`;
      list.appendChild(article);
    });
    observeReveals();
  };
  filters.forEach(btn => btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
    window.scrollTo({top: 0, behavior: "smooth"});
  }));
  render();
}

function observeReveals() {
  const items = document.querySelectorAll(".reveal:not(.seen)");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("seen"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("seen");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  items.forEach(el => observer.observe(el));
}

function initProjectDetail() {
  const id = new URLSearchParams(location.search).get("id") || projects[0].id;
  const p = projects.find(project => project.id === id) || projects[0];
  const current = projects.findIndex(project => project.id === p.id);
  const previous = projects[(current - 1 + projects.length) % projects.length];
  const next = projects[(current + 1) % projects.length];
  const detail = document.getElementById("project-detail");
  detail.innerHTML = `
    <section class="project-hero">
      <div class="project-detail-meta">
        <span>${p.number}</span>
        <div>
          <h1>${p.title}</h1>
          <p>${p.location.toUpperCase()}</p>
          <p>${p.category.toUpperCase()} · ${p.year}</p>
        </div>
      </div>
      <img class="detail-hero-image" src="${p.cover}" alt="${p.title}">
    </section>
    <section class="project-description">
      <div class="eyebrow">ABOUT THE PROJECT</div>
      <p>${p.description}</p>
      <div class="project-info">
        <div><span>CLIENT</span><strong>${p.client}</strong></div>
        <div><span>STATUS</span><strong>${p.status}</strong></div>
        <div><span>AREA</span><strong>${p.area}</strong></div>
        <div><span>YEAR</span><strong>${p.year}</strong></div>
        <div><span>LOCATION</span><strong>${p.location}</strong></div>
      </div>
    </section>
    <section class="detail-gallery">
      ${p.gallery.map((src, i) => `<img src="${src}" alt="${p.title} project image ${i+1}" loading="lazy" class="${i % 3 === 0 ? "gallery-wide" : ""}">`).join("")}
    </section>
    <nav class="project-nextprev">
      <a href="project.html?id=${previous.id}"><span>← PREVIOUS</span><strong>${previous.title}</strong></a>
      <a class="next" href="project.html?id=${next.id}"><span>NEXT →</span><strong>${next.title}</strong></a>
    </nav>`;
}