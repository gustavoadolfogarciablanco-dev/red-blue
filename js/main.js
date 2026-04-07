/**
 * Red and Blue – Main JavaScript
 * Handles: theme toggle, GSAP animations, scroll reveal, form validation & submission
 */
import { initI18n, t } from "./i18n.js?v=20260407-2";

/* ─────────────────────────────────────────
   i18n – MUST RUN FIRST
───────────────────────────────────────── */
const root = document.documentElement;
const LOADER_TIMEOUT_MS = 3500;
let i18nReady = false;
let assetsReady = false;
let loaderDone = false;

function finishLoader() {
  if (loaderDone) return;
  loaderDone = true;
  root.classList.add("app-ready");
  root.classList.remove("app-loading");
  document.body?.removeAttribute("aria-busy");
}

function tryFinishLoader() {
  if (i18nReady && assetsReady) finishLoader();
}

document.addEventListener("DOMContentLoaded", () => {
  document.body?.setAttribute("aria-busy", "true");
});

window.addEventListener("load", () => {
  assetsReady = true;
  tryFinishLoader();
});

window.setTimeout(() => {
  finishLoader();
}, LOADER_TIMEOUT_MS);

initI18n(() => {
  i18nReady = true;
  tryFinishLoader();
});

/* ─────────────────────────────────────────
   THEME TOGGLE (light / dark / auto)
───────────────────────────────────────── */
const THEME_KEY = "rb-theme";

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY);
}

function applyTheme(theme) {
  if (theme === "dark" || theme === "light") {
    document.documentElement.dataset.theme = theme;
  } else {
    delete document.documentElement.dataset.theme;
  }
}

function toggleTheme() {
  const current = getStoredTheme();
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = current === "dark" || (!current && systemDark);
  const next = isDark ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

applyTheme("light");
document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);

/* ─────────────────────────────────────────
   NAV SCROLL STATE
   Toggles .scrolled from the very first pixel of scroll so the
   nav always has readable contrast over the hero background.
───────────────────────────────────────── */
const nav = document.querySelector(".nav");

function updateNavScroll() {
  nav?.classList.toggle("scrolled", window.scrollY > 0);
}

window.addEventListener("scroll", updateNavScroll, { passive: true });
updateNavScroll(); // apply correct state on load

/* ─────────────────────────────────────────
   GSAP ANIMATIONS
───────────────────────────────────────── */
function initAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  document.documentElement.classList.add("gsap-ready");

  gsap.registerPlugin(ScrollTrigger);

  const heroReveals = gsap.utils.toArray(".hero .js-reveal");
  if (heroReveals.length) {
    gsap.fromTo(
      heroReveals,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      },
    );
  }

  const heroRight = document.querySelector(".hero .js-reveal-right");
  if (heroRight) {
    gsap.fromTo(heroRight, { opacity: 0, x: 48 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 });
  }

  gsap.utils.toArray(".js-reveal:not(.hero .js-reveal)").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      },
    );
  });

  gsap.utils.toArray(".js-reveal-right:not(.hero .js-reveal-right)").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    );
  });

  const staggerGroups = {};

  gsap.utils.toArray(".js-stagger").forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    if (!staggerGroups[parent]) staggerGroups[parent] = [];
    staggerGroups[parent].push(el);
  });

  Object.values(staggerGroups).forEach((group) => {
    gsap.fromTo(
      group,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: group[0].parentElement,
          start: "top 82%",
          once: true,
        },
      },
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  setTimeout(initAnimations, 50);
}

const technologiesSectionInner = document.getElementById("tecnologias").childNodes[1];
const scrollContainer = document.querySelector(".scroll-container");

/* ─────────────────────────────────────────
   TECH STACK FILTERS
───────────────────────────────────────── */
function initTechFilters() {
  const filterButtons = Array.from(document.querySelectorAll(".tech-filter"));
  const cards = Array.from(document.querySelectorAll(".tech-card[data-tech-category]"));
  const countValue = document.querySelector(".tech-count__value");
  if (!filterButtons.length || !cards.length) return;

  cards.forEach((card) => {
    if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
  });

  function setActiveFilter(filter) {
    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.filter === filter;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    let visibleCount = 0;
    cards.forEach((card) => {
      const matches = filter === "all" || card.dataset.techCategory === filter;
      card.classList.toggle("tech-card--hidden", !matches);
      if (matches) visibleCount += 1;
    });

    if (countValue) countValue.textContent = String(visibleCount);
  }

  const techGrid = document.querySelector(".tech-grid");

  const resizeObserver = new ResizeObserver(() => {
    const isExpanded = technologiesSectionInner.classList.contains("expanded");
    const hasOverflow = technologiesSectionInner.scrollHeight > technologiesSectionInner.clientHeight;

    scrollContainer.style.display = hasOverflow && !isExpanded ? "flex" : "none";
  });

  resizeObserver.observe(techGrid);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveFilter(btn.dataset.filter || "all");
    });
  });

  setActiveFilter("all");
}

initTechFilters();

/* ─────────────────────────────────────────
   TECH STACK CARDS
───────────────────────────────────────── */
function initTechCards() {
  const cards = Array.from(document.querySelectorAll(".tech-card"));
  const logos = Array.from(document.querySelectorAll(".tech-card__logo-img"));
  if (!cards.length || !logos.length) return;

  const rootStyles = getComputedStyle(document.documentElement);
  const red = rootStyles.getPropertyValue("--red").trim().replace("#", "") || "E8192C";
  const blue = rootStyles.getPropertyValue("--blue").trim().replace("#", "") || "1A3FAA";

  const buildIconUrls = (slug, color) => [`https://cdn.simpleicons.org/${slug}/${color}`, `https://cdn.simpleicons.org/${slug}?color=${color}`, `https://cdn.simpleicons.org/${slug}`];

  logos.forEach((logo, index) => {
    const color = index % 2 === 0 ? red : blue;
    const logoWrapper = logo.closest(".tech-card__logo");
    const card = logo.closest(".tech-card");
    let slug = "";
    try {
      const url = new URL(logo.src, window.location.href);
      slug = logo.dataset.logo || url.pathname.split("/").filter(Boolean)[0] || "";
    } catch {
      slug = logo.dataset.logo || "";
    }

    const fallbacks = (logo.dataset.logoFallback || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const slugs = [slug, ...fallbacks].filter(Boolean);
    if (!slugs.length) return;

    const queue = slugs.flatMap((item) => buildIconUrls(item, color));
    const loadNext = () => {
      const next = queue.shift();
      if (!next) {
        if (logoWrapper) logoWrapper.classList.add("is-hidden");
        if (card) card.classList.add("is-logo-missing");
        return;
      }
      logo.src = next;
    };

    logo.addEventListener("load", () => {
      if (logoWrapper) logoWrapper.classList.remove("is-hidden");
      if (card) card.classList.remove("is-logo-missing");
    });
    logo.addEventListener("error", loadNext);
    loadNext();
  });

  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (!isTouch) return;

  const clearFlips = () => {
    cards.forEach((card) => card.classList.remove("is-flipped"));
  };

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.stopPropagation();
      const isFlipped = card.classList.toggle("is-flipped");
      if (isFlipped) {
        cards.forEach((other) => {
          if (other !== card) other.classList.remove("is-flipped");
        });
      }
    });
  });

  document.addEventListener("click", clearFlips);
}

initTechCards();

function handleAccordionAction() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const trigger = item.querySelector(".faq-item__trigger");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("faq-item--open");

      items.forEach((i) => {
        i.classList.remove("faq-item--open");
        i.querySelector(".faq-item__trigger").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("faq-item--open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}

handleAccordionAction();

/* ─────────────────────────────────────────
   SMOOTH ANCHOR SCROLL (offset for nav)
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h") || "68");
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

window.addEventListener("load", () => {
  const iframe = document.querySelector("iframe");

  function sendSize() {
    iframe.contentWindow.postMessage({ width: iframe.offsetWidth }, "*");
  }

  sendSize();

  window.addEventListener("resize", () => {
    sendSize();
  });
});

(function () {
  const form = document.getElementById("contactCardForm");
  const submitBtn = document.getElementById("cfSubmitBtn");
  const success = document.getElementById("cfSuccess");

  if (!form) return;

  function getField(name) {
    return form?.querySelector(`[name="${name}"]`);
  }

  function validateField(input) {
    const field = input.closest(".cfield");
    if (!field) return true;

    const error = field.querySelector(".cfield__error");
    let valid = true;

    if (input.required && !input.value.trim()) {
      valid = false;
    } else if (input.type === "email" && input.value) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }

    input.classList.toggle("cfield__input--error", !valid);
    if (error) error.classList.toggle("cfield__error--visible", !valid);

    return valid;
  }

  form.querySelectorAll(".cfield__input, .cfield__textarea").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("cfield__input--error")) validateField(input);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fields = [...form.querySelectorAll("[required]")];
    const allValid = fields.map((f) => validateField(f)).every(Boolean);
    if (!allValid) return;

    const privacy = document.getElementById("cf-privacy");
    if (!privacy.checked) {
      return showToast("toast.error.privacy", "error");
    }

    submitBtn?.classList.add("btn--loading");
    submitBtn.disabled = true;

    const payload = {
      name: getField("name")?.value.trim(),
      subject: getField("subject")?.value.trim(),
      company: getField("company")?.value.trim(),
      phone: getField("phone")?.value.trim(),
      email: getField("email")?.value.trim(),
      message: getField("message")?.value.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Server error");

      form.reset();
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } catch {
      const subject = encodeURIComponent("Consulta desde redandblue.dev");
      const body = encodeURIComponent(`Nombre: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`);
      window.location.href = `mailto:contact@redandblue.dev?subject=${subject}&body=${body}`;

      showToast("toast.error.contact", "error");
    } finally {
      submitBtn?.classList.remove("btn--loading");
      submitBtn.disabled = false;

      showToast("toast.success.contact", "success");
    }
  });
})();

function limitToasts(max = 2) {
  const toasts = document.querySelectorAll(".toastify");
  if (toasts.length >= max) {
    toasts[0].remove();
  }
}

function showToast(key, status = "info") {
  limitToasts(1);

  const styles = {
    success: "linear-gradient(135deg, #22c55e, #16a34a)",
    error: "linear-gradient(135deg, #ef4444, #dc2626)",
    warning: "linear-gradient(135deg, #f59e0b, #d97706)",
    info: "linear-gradient(135deg, #3b82f6, #2563eb)",
  };

  Toastify({
    text: t(key),
    duration: 4000,
    gravity: "bottom",
    position: "right",
    style: {
      background: styles[status] || styles.info,
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.2)",
    },
  }).showToast();
}
