(function () {
  "use strict";

  const state = {
    query: "",
    activeLang: {},
    serviceValue: {},
    selectedService: null, // null = показываем все шаблоны; id — показываем ответ по сервису
    activeCategory: null, // null = все категории; id — фильтр по категории
  };

  const contentEl = document.getElementById("content");
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  const resultCountEl = document.getElementById("resultCount");
  const servicesTabletEl = document.getElementById("servicesTablet");
  const categoryFiltersEl = document.getElementById("categoryFilters");

  // ---------------- Brand icons (Simple Icons CDN, официальные SVG-логотипы) ----------------

  function brandIconUrl(slug) {
    // jsDelivr отдаёт исходные SVG из пакета simple-icons по slug бренда.
    return (
      "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/" + slug + ".svg"
    );
  }

  // ---------------- Theme ----------------

  function initTheme() {
    applyTheme(localStorage.getItem("ost-theme") || "light");
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

  // ---------------- Services tablet (grid of circular icons) ----------------

  function renderServicesTablet() {
    servicesTabletEl.innerHTML = "";

    SERVICES.forEach(function (svc) {
      servicesTabletEl.appendChild(makeServiceCircle(svc));
    });

    updateServicesStates();
  }

  // Есть ли у сервиса собственная категория с шаблонами в TEMPLATES
  // (например service.id === "whatsapp" ↔ category: "whatsapp").
  function getServiceCategoryTemplates(serviceId) {
    const hasCategory = CATEGORIES.some(function (c) {
      return c.id === serviceId;
    });
    if (!hasCategory) return null;
    return TEMPLATES.filter(function (t) {
      return t.category === serviceId;
    });
  }

  function makeServiceCircle(service) {
    const el = document.createElement("div");
    el.className = "service-icon";
    el.dataset.service = service.id;

    const iconInnerHtml =
      '<span class="service-icon-brand" style="-webkit-mask-image:url(' +
      brandIconUrl(service.icon) +
      ");mask-image:url(" +
      brandIconUrl(service.icon) +
      ')"></span>';

    el.innerHTML =
      '<div class="service-icon-circle" style="--svc-color: ' +
      (service.color || "var(--accent)") +
      '">' +
      iconInnerHtml +
      "</div>" +
      '<div class="service-icon-label">' +
      escapeHtml(service.name) +
      "</div>";

    el.addEventListener("click", function () {
      // повторный клик по тому же сервису — снять выбор
      state.selectedService =
        state.selectedService === service.id ? null : service.id;
      // клик по иконке сервиса — выходим из поиска и фильтра категории,
      // чтобы сразу увидеть ответ/шаблоны по этому сервису
      if (state.selectedService) {
        state.query = "";
        searchInput.value = "";
        searchClear.classList.remove("visible");
        state.activeCategory = null;
        updateCategoryPillStates();
      }
      updateServicesStates();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return el;
  }

  function updateServicesStates() {
    servicesTabletEl.querySelectorAll(".service-icon").forEach(function (el) {
      const id = el.dataset.service;
      const isActive = state.selectedService === id;
      el.classList.toggle("active", isActive);
    });
  }

  // ---------------- Category filter pills (sidebar) ----------------

  function renderCategoryFilters() {
    if (!categoryFiltersEl) return;
    categoryFiltersEl.innerHTML = "";

    const allPill = makeCategoryPill(null, "Все категории", TEMPLATES.length);
    categoryFiltersEl.appendChild(allPill);

    CATEGORIES.forEach(function (cat) {
      // категории-сервисы (sidebar: false) уже есть в виде иконок справа —
      // не дублируем их пилюлями в левом сайдбаре
      if (cat.sidebar === false) return;
      const count = TEMPLATES.filter(function (t) {
        return t.category === cat.id;
      }).length;
      if (count === 0) return;
      categoryFiltersEl.appendChild(makeCategoryPill(cat.id, cat.name, count));
    });
  }

  function makeCategoryPill(categoryId, name, count) {
    const pill = document.createElement("div");
    pill.className = "pill";
    pill.dataset.category = categoryId || "__all__";
    pill.innerHTML =
      "<span>" +
      escapeHtml(name) +
      '</span><span class="count">' +
      count +
      "</span>";

    pill.addEventListener("click", function () {
      // повторный клик по активной категории — снять фильтр
      state.activeCategory =
        state.activeCategory === categoryId ? null : categoryId;
      // при выборе категории выходим из поиска и из карточки конкретного сервиса,
      // чтобы сразу увидеть отфильтрованный список шаблонов
      state.selectedService = null;
      updateServicesStates();
      updateCategoryPillStates();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return pill;
  }

  function updateCategoryPillStates() {
    if (!categoryFiltersEl) return;
    categoryFiltersEl.querySelectorAll(".pill").forEach(function (el) {
      const id = el.dataset.category;
      const isActive =
        id === "__all__"
          ? state.activeCategory === null
          : state.activeCategory === id;
      el.classList.toggle("active", isActive);
    });
  }

  // ---------------- Search ----------------

  let searchDebounce = null;
  searchInput.addEventListener("input", function () {
    searchClear.classList.toggle("visible", searchInput.value.length > 0);
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(function () {
      state.query = searchInput.value.trim().toLowerCase();
      // как только начинают искать — выходим из карточки сервиса и фильтра категории
      if (state.query) {
        state.selectedService = null;
        state.activeCategory = null;
        updateServicesStates();
        updateCategoryPillStates();
      }
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

  function matchesQuery(template, query) {
    if (!query) return true;
    return [template.title, template.ru, template.en]
      .map(function (s) {
        return (s || "").toLowerCase();
      })
      .some(function (h) {
        return h.indexOf(query) !== -1;
      });
  }

  function getFilteredTemplates() {
    return TEMPLATES.filter(function (t) {
      if (state.activeCategory && t.category !== state.activeCategory) {
        return false;
      }
      return matchesQuery(t, state.query);
    });
  }

  // ---------------- Unique answer per service ----------------

  // Для некоторых сервисов в общий текст добавляется уточнение про официальное
  // мобильное приложение (перед финальной просьбой заказать ещё номера).
  const SERVICE_APP_HINT = {
    telegram: { ru: "Телеграм", en: "Telegram" },
    whatsapp: { ru: "WhatsApp", en: "WhatsApp" },
  };

  function getServiceAnswer(service, lang) {
    const url = lang === "en" ? service.enUrl : service.ruUrl;
    const linkLabel =
      lang === "en"
        ? "View recommended countries for " + service.name
        : "Посмотреть рекомендации для " + service.name;

    const appHint = SERVICE_APP_HINT[service.id];
    const appHintText = appHint
      ? lang === "en"
        ? "Use only the official " + appHint.en + " mobile app and "
        : "Используйте только официальное мобильное приложение " +
          appHint.ru +
          " и "
      : "";
    const tryRequestText =
      lang === "en"
        ? appHintText
          ? "try to order"
          : "please try requesting"
        : appHintText
          ? "попробуйте заказать, пожалуйста,"
          : "Попробуйте заказать, пожалуйста,";

    const intro =
      lang === "en"
        ? 'You can close the number by clicking the red "X" and select another one. Funds are deducted only after the SMS is received.\n\n' +
          "Sometimes, due to various technical reasons, the SMS does not arrive on the first attempt. Typically, up to five attempts are sufficient to receive an SMS on the number. " +
          appHintText +
          tryRequestText +
          " 3–4 additional numbers from the list of countries for better results:"
        : "Можете закрыть номер, нажав на красный крестик, и взять другой. Средства списываются только после получения СМС.\n\n" +
          "Иногда СМС приходят не с первого раза по разным техническим причинам. Как правило, достаточно до 5 попыток, чтобы принять СМС на номер. " +
          appHintText +
          tryRequestText +
          " ещё 3-4 номера стран из списка для лучших результатов:";

    return {
      // отображение: фраза — кликабельная гиперссылка
      display:
        escapeHtml(intro) +
        '\n🔗 <a href="' +
        escapeHtml(url) +
        '" target="_blank" rel="noopener">' +
        escapeHtml(linkLabel) +
        "</a>",
      // копирование: чистый текст с URL в скобках — вставится в любой чат
      copy: intro + "\n🔗 " + linkLabel + " (" + url + ")",
    };
  }

  // ---------------- Rendering ----------------

  function render() {
    contentEl.innerHTML = "";

    // 1) Выбран сервис (клик по иконке справа)
    if (state.selectedService) {
      const svc = SERVICES.find(function (s) {
        return s.id === state.selectedService;
      });
      if (svc) {
        const categoryTemplates = getServiceCategoryTemplates(svc.id);

        const grid = document.createElement("div");
        grid.className = "cards-grid";

        if (categoryTemplates && categoryTemplates.length > 0) {
          // у сервиса есть собственная категория — показываем все её шаблоны
          resultCountEl.textContent =
            "Шаблонов по " + svc.name + ": " + categoryTemplates.length;
          categoryTemplates.forEach(function (t) {
            grid.appendChild(renderCard(t));
          });
        } else {
          // отдельной категории нет — общий ответ про «СМС не приходит»
          resultCountEl.textContent = "";
          grid.appendChild(renderServiceAnswerCard(svc));
        }

        contentEl.appendChild(grid);
        return;
      }
    }

    // 2) Иначе — все шаблоны
    const filtered = getFilteredTemplates();

    if (filtered.length === 0) {
      resultCountEl.textContent = "";
      contentEl.innerHTML =
        '<div class="empty-state">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>' +
        "<p>Ничего не найдено. Попробуйте другой запрос.</p>" +
        "</div>";
      return;
    }

    resultCountEl.textContent =
      state.query || state.activeCategory
        ? "Найдено шаблонов: " + filtered.length
        : "";

    if (state.query) {
      const grid = document.createElement("div");
      grid.className = "cards-grid";
      filtered.forEach(function (t) {
        grid.appendChild(renderCard(t));
      });
      contentEl.appendChild(grid);
      return;
    }

    // Без поиска — группируем по категориям
    CATEGORIES.forEach(function (cat) {
      const catTemplates = filtered.filter(function (t) {
        return t.category === cat.id;
      });
      if (catTemplates.length === 0) return;

      const section = document.createElement("section");
      section.className = "category-section";

      const heading = document.createElement("h2");
      heading.className = "category-heading";
      heading.innerHTML = '<span class="dot"></span>' + escapeHtml(cat.name);
      section.appendChild(heading);

      const grid = document.createElement("div");
      grid.className = "cards-grid";
      catTemplates.forEach(function (t) {
        grid.appendChild(renderCard(t));
      });
      section.appendChild(grid);

      contentEl.appendChild(section);
    });
  }

  function renderServiceAnswerCard(service) {
    const card = document.createElement("div");
    card.className = "card";

    const head = document.createElement("div");
    head.className = "card-head";
    head.innerHTML =
      '<div class="card-title">СМС не приходит — ' +
      escapeHtml(service.name) +
      "</div>" +
      '<div class="card-cat-badge">' +
      escapeHtml(service.name) +
      "</div>";
    card.appendChild(head);

    const langKey = "svc-" + service.id;
    const lang = state.activeLang[langKey] || "ru";

    const tabs = document.createElement("div");
    tabs.className = "lang-tabs";
    tabs.innerHTML =
      '<button class="lang-tab ' +
      (lang === "ru" ? "active" : "") +
      '" data-lang="ru">RU</button>' +
      '<button class="lang-tab ' +
      (lang === "en" ? "active" : "") +
      '" data-lang="en">EN</button>';
    card.appendChild(tabs);

    const body = document.createElement("div");
    body.className = "card-body";

    const textEl = document.createElement("p");
    textEl.className = "template-text";
    textEl.innerHTML = getServiceAnswer(service, lang).display;
    body.appendChild(textEl);

    tabs.querySelectorAll(".lang-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.activeLang[langKey] = btn.dataset.lang;
        tabs.querySelectorAll(".lang-tab").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        textEl.innerHTML = getServiceAnswer(service, btn.dataset.lang).display;
      });
    });

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.innerHTML = copyIconHtml() + "<span>Копировать</span>";
    copyBtn.addEventListener("click", function () {
      const answer = getServiceAnswer(
        service,
        state.activeLang[langKey] || "ru",
      );
      copyToClipboard(answer.copy, copyBtn);
    });
    actions.appendChild(copyBtn);

    body.appendChild(actions);
    card.appendChild(body);
    return card;
  }

  // Обычная карточка шаблона (без изменений)
  function renderCard(template) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = template.id;

    const catMeta = CATEGORIES.find(function (c) {
      return c.id === template.category;
    });
    const lang = state.activeLang[template.id] || "ru";

    const head = document.createElement("div");
    head.className = "card-head";
    head.innerHTML =
      '<div class="card-title">' +
      highlightMatch(template.title, state.query) +
      "</div>" +
      '<div class="card-cat-badge">' +
      escapeHtml(catMeta ? catMeta.name : template.category) +
      "</div>";
    card.appendChild(head);

    if (template.hasServicePlaceholder) {
      const wrap = document.createElement("div");
      wrap.className = "service-input-wrap";
      const input = document.createElement("input");
      input.type = "text";
      input.className = "service-input";
      input.placeholder =
        "Название сервиса (например: WhatsApp, Telegram, Vinted)…";
      input.value = state.serviceValue[template.id] || "";
      input.addEventListener("input", function () {
        state.serviceValue[template.id] = input.value;
        updateTextPreview(card, template);
      });
      wrap.appendChild(input);
      card.appendChild(wrap);
    }

    const tabs = document.createElement("div");
    tabs.className = "lang-tabs";
    tabs.innerHTML =
      '<button class="lang-tab ' +
      (lang === "ru" ? "active" : "") +
      '" data-lang="ru">RU</button>' +
      '<button class="lang-tab ' +
      (lang === "en" ? "active" : "") +
      '" data-lang="en">EN</button>';
    tabs.querySelectorAll(".lang-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.activeLang[template.id] = btn.dataset.lang;
        tabs.querySelectorAll(".lang-tab").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        updateTextPreview(card, template);
      });
    });
    card.appendChild(tabs);

    const body = document.createElement("div");
    body.className = "card-body";

    const textEl = document.createElement("p");
    textEl.className = "template-text";
    textEl.dataset.role = "text";
    renderTextInto(textEl, template, lang);
    body.appendChild(textEl);

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.innerHTML = copyIconHtml() + "<span>Копировать</span>";
    copyBtn.addEventListener("click", function () {
      const text = getResolvedText(
        template,
        state.activeLang[template.id] || "ru",
      );
      copyToClipboard(text, copyBtn);
    });
    actions.appendChild(copyBtn);

    body.appendChild(actions);
    card.appendChild(body);

    return card;
  }

  function updateTextPreview(cardEl, template) {
    const textEl = cardEl.querySelector('[data-role="text"]');
    const lang = state.activeLang[template.id] || "ru";
    renderTextInto(textEl, template, lang);
  }

  function renderTextInto(el, template, lang) {
    el.innerHTML = highlightMatch(
      getResolvedText(template, lang),
      state.query,
      true,
    );
  }

  function getResolvedText(template, lang) {
    let text = lang === "en" ? template.en : template.ru;
    if (template.hasServicePlaceholder) {
      const serviceName = (state.serviceValue[template.id] || "").trim();
      const placeholder =
        serviceName || (lang === "en" ? "[service]" : "[сервис]");
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
      } catch (e) {}
      document.body.removeChild(ta);
    };

    const onSuccess = function () {
      const originalHtml = btn.innerHTML;
      btn.classList.add("copied");
      btn.innerHTML = checkIconHtml() + "<span>Скопировано</span>";
      setTimeout(function () {
        btn.classList.remove("copied");
        btn.innerHTML = originalHtml;
      }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(onSuccess)
        .catch(function () {
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
      return escaped.replace(
        new RegExp("(" + escapedQuery + ")", "ig"),
        "<mark>$1</mark>",
      );
    } catch (e) {
      return escaped;
    }
  }

  function copyIconHtml() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  }

  function checkIconHtml() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  }

  // ---------------- Init ----------------

  initTheme();
  renderServicesTablet();
  renderCategoryFilters();
  updateCategoryPillStates();
  render();
})();
