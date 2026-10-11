// =====================================================================
// Логика сайта: поиск, фильтры, рендер, копирование, подстановка сервиса
// =====================================================================

(function () {
  "use strict";

  const state = {
    query: "",
    activeCategory: "all", // "all" или id категории
    activeLang: {},        // templateId -> "ru" | "en"
    serviceValue: {},      // templateId -> текст сервиса
  };

  const contentEl = document.getElementById("content");
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  const resultCountEl = document.getElementById("resultCount");
  const categoryFiltersEl = document.getElementById("categoryFilters");

  // ---------------- Theme ----------------

  function initTheme() {
    const saved = localStorage.getItem("ost-theme");
    const theme = saved || "light";
    applyTheme(theme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ost-theme", theme);
    const sun = document.getElementById("themeIconSun");
    const moon = document.getElementById("themeIconMoon");
    if (theme === "dark") {
      sun.style.display = "none";
      moon.style.display = "block";
    } else {
      sun.style.display = "block";
      moon.style.display = "none";
    }
  }

  document.getElementById("themeToggle").addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // ---------------- Category filter pills ----------------

  function renderCategoryFilters() {
    const countsByCategory = {};
    TEMPLATES.forEach((t) => {
      countsByCategory[t.category] = (countsByCategory[t.category] || 0) + 1;
    });

    const allPill = makePill("all", "Все", TEMPLATES.length);
    categoryFiltersEl.appendChild(allPill);

    CATEGORIES.forEach((cat) => {
      const count = countsByCategory[cat.id] || 0;
      if (count === 0) return;
      categoryFiltersEl.appendChild(makePill(cat.id, cat.name, count));
    });

    updatePillStates();
  }

  function makePill(id, label, count) {
    const pill = document.createElement("div");
    pill.className = "pill";
    pill.dataset.category = id;
    pill.innerHTML = `<span>${escapeHtml(label)}</span><span class="count">${count}</span>`;
    pill.addEventListener("click", function () {
      state.activeCategory = id;
      updatePillStates();
      render();
    });
    return pill;
  }

  function updatePillStates() {
    categoryFiltersEl.querySelectorAll(".pill").forEach((pill) => {
      pill.classList.toggle("active", pill.dataset.category === state.activeCategory);
    });
  }

  // ---------------- Search ----------------

  let searchDebounce = null;
  searchInput.addEventListener("input", function () {
    searchClear.classList.toggle("visible", searchInput.value.length > 0);
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(function () {
      state.query = searchInput.value.trim().toLowerCase();
      render();
    }, 120);
  });

  searchClear.addEventListener("click", function () {
    searchInput.value = "";
    searchClear.classList.remove("visible");
    state.query = "";
    searchInput.focus();
    render();
  });

  // ---------------- Matching ----------------

  function normalize(str) {
    return (str || "").toLowerCase();
  }

  function matchesQuery(template, query) {
    if (!query) return true;
    const haystacks = [
      template.title,
      template.ru,
      template.en,
      (template.tags || []).join(" "),
    ].map(normalize);
    return haystacks.some((h) => h.includes(query));
  }

  function getFilteredTemplates() {
    return TEMPLATES.filter((t) => {
      const categoryOk =
        state.activeCategory === "all" || t.category === state.activeCategory;
      const queryOk = matchesQuery(t, state.query);
      return categoryOk && queryOk;
    });
  }

  // ---------------- Rendering ----------------

  function render() {
    const filtered = getFilteredTemplates();
    contentEl.innerHTML = "";

    if (filtered.length === 0) {
      resultCountEl.textContent = "";
      contentEl.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <p>Ничего не найдено. Попробуйте другой запрос.</p>
        </div>`;
      return;
    }

    if (state.query) {
      resultCountEl.textContent = `Найдено шаблонов: ${filtered.length}`;
    } else {
      resultCountEl.textContent = "";
    }

    // Поиск: показываем плоским списком (релевантность не важна при такой выборке — порядок как в данных)
    // Без поиска — группируем по категориям для навигации
    if (state.query) {
      const grid = document.createElement("div");
      grid.className = "cards-grid";
      filtered.forEach((t) => grid.appendChild(renderCard(t)));
      contentEl.appendChild(grid);
    } else {
      const categoriesToShow =
        state.activeCategory === "all"
          ? CATEGORIES.map((c) => c.id)
          : [state.activeCategory];

      categoriesToShow.forEach((catId) => {
        const catTemplates = filtered.filter((t) => t.category === catId);
        if (catTemplates.length === 0) return;
        const catMeta = CATEGORIES.find((c) => c.id === catId);

        const section = document.createElement("section");
        section.className = "category-section";

        const heading = document.createElement("h2");
        heading.className = "category-heading";
        heading.innerHTML = `<span class="dot"></span>${escapeHtml(catMeta ? catMeta.name : catId)}`;
        section.appendChild(heading);

        const grid = document.createElement("div");
        grid.className = "cards-grid";
        catTemplates.forEach((t) => grid.appendChild(renderCard(t)));
        section.appendChild(grid);

        contentEl.appendChild(section);
      });
    }
  }

  function renderCard(template) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = template.id;

    const catMeta = CATEGORIES.find((c) => c.id === template.category);
    const lang = state.activeLang[template.id] || "ru";

    // Head
    const head = document.createElement("div");
    head.className = "card-head";
    head.innerHTML = `
      <div class="card-title">${highlightMatch(template.title, state.query)}</div>
      <div class="card-cat-badge">${escapeHtml(catMeta ? catMeta.name : template.category)}</div>
    `;
    card.appendChild(head);

    // Service input (if applicable)
    if (template.hasServicePlaceholder) {
      const wrap = document.createElement("div");
      wrap.className = "service-input-wrap";
      const input = document.createElement("input");
      input.type = "text";
      input.className = "service-input";
      input.placeholder = "Название сервиса (например: WhatsApp, Telegram, Vinted)…";
      input.value = state.serviceValue[template.id] || "";
      input.addEventListener("input", function () {
        state.serviceValue[template.id] = input.value;
        updateTextPreview(card, template);
      });
      wrap.appendChild(input);
      card.appendChild(wrap);
    }

    // Lang tabs
    const tabs = document.createElement("div");
    tabs.className = "lang-tabs";
    tabs.innerHTML = `
      <button class="lang-tab ${lang === "ru" ? "active" : ""}" data-lang="ru">RU</button>
      <button class="lang-tab ${lang === "en" ? "active" : ""}" data-lang="en">EN</button>
    `;
    tabs.querySelectorAll(".lang-tab").forEach((btn) => {
      btn.addEventListener("click", function () {
        state.activeLang[template.id] = btn.dataset.lang;
        tabs.querySelectorAll(".lang-tab").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        updateTextPreview(card, template);
      });
    });
    card.appendChild(tabs);

    // Body
    const body = document.createElement("div");
    body.className = "card-body";

    const textEl = document.createElement("p");
    textEl.className = "template-text";
    body.appendChild(textEl);

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.innerHTML = copyIconHtml() + `<span>Копировать</span>`;
    copyBtn.addEventListener("click", function () {
      const text = getResolvedText(template, state.activeLang[template.id] || "ru");
      copyToClipboard(text, copyBtn);
    });
    actions.appendChild(copyBtn);

    if (template.tags && template.tags.length) {
      const tagEl = document.createElement("span");
      tagEl.className = "tag-list";
      tagEl.textContent = template.tags.join(" · ");
      actions.appendChild(tagEl);
    }

    body.appendChild(actions);
    card.appendChild(body);

    // initial text
    textEl.dataset.role = "text";
    renderTextInto(textEl, template, lang);

    return card;
  }

  function updateTextPreview(cardEl, template) {
    const textEl = cardEl.querySelector('[data-role="text"]');
    const lang = state.activeLang[template.id] || "ru";
    renderTextInto(textEl, template, lang);
  }

  function renderTextInto(el, template, lang) {
    const resolved = getResolvedText(template, lang);
    el.innerHTML = highlightMatch(resolved, state.query, true);
  }

  function getResolvedText(template, lang) {
    let text = lang === "en" ? template.en : template.ru;
    if (template.hasServicePlaceholder) {
      const serviceName = (state.serviceValue[template.id] || "").trim();
      const placeholder = serviceName || (lang === "en" ? "[service]" : "[сервис]");
      text = text.split("{{service}}").join(placeholder);
    }
    return text;
  }

  // ---------------- Copy ----------------

  function copyToClipboard(text, btn) {
    const fallbackCopy = function () {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (e) {
        /* no-op */
      }
      document.body.removeChild(ta);
    };

    const onSuccess = function () {
      const originalHtml = btn.innerHTML;
      btn.classList.add("copied");
      btn.innerHTML = checkIconHtml() + `<span>Скопировано</span>`;
      setTimeout(function () {
        btn.classList.remove("copied");
        btn.innerHTML = originalHtml;
      }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(function () {
        fallbackCopy();
        onSuccess();
      });
    } else {
      fallbackCopy();
      onSuccess();
    }
  }

  // ---------------- Helpers ----------------

  function escapeHtml(str) {
    return (str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function highlightMatch(str, query, isPreformatted) {
    const escaped = escapeHtml(str);
    if (!query) return escaped;
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    try {
      const re = new RegExp("(" + escapedQuery + ")", "ig");
      return escaped.replace(re, "<mark>$1</mark>");
    } catch (e) {
      return escaped;
    }
  }

  function copyIconHtml() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
  }

  function checkIconHtml() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  }

  // ---------------- Init ----------------

  initTheme();
  renderCategoryFilters();
  render();
})();
