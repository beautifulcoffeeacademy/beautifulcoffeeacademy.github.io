/* Beautiful Coffee Academy — interactions */

(() => {
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  document.documentElement.setAttribute("data-theme", "light");

  const yearEl = qs("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const menuBtn = qs("#menuBtn");
  const mobileMenu = qs("#mobileMenu");
  if (menuBtn && mobileMenu) {
    const setOpen = (open) => {
      mobileMenu.dataset.open = open ? "true" : "false";
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    menuBtn.addEventListener("click", () => {
      setOpen(mobileMenu.dataset.open !== "true");
    });

    qsa("a[href]", mobileMenu).forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });

    qsa("[data-mobile-submenu]", mobileMenu).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const panelId = btn.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (!panel) return;
        const next = panel.dataset.open !== "true";
        panel.dataset.open = next ? "true" : "false";
        btn.setAttribute("aria-expanded", next ? "true" : "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (mobileMenu.dataset.open !== "true") return;
      const inside = mobileMenu.contains(e.target) || menuBtn.contains(e.target);
      if (!inside) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  const navbar = qs("#navbar");
  const setSticky = () => {
    if (!navbar) return;
    const sticky = window.scrollY > 12;
    navbar.classList.toggle("nav-sticky-solid", sticky);
  };
  setSticky();
  window.addEventListener("scroll", setSticky, { passive: true });

  const sectionIds = ["home", "products", "farming", "courses", "testimonials", "gallery", "contact"];
  const sections = sectionIds.map((id) => qs(`#${id}`)).filter(Boolean);
  const navLinks = navbar ? qsa('a.nav-scroll[href^="#"]', navbar) : [];
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const map = new Map(navLinks.map((a) => [a.getAttribute("href"), a]));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (!visible) return;
        const id = `#${visible.target.id}`;
        map.forEach((a) => a.removeAttribute("aria-current"));
        const active = map.get(id);
        if (active) active.setAttribute("aria-current", "page");
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0.12, 0.2, 0.35] }
    );
    sections.forEach((s) => obs.observe(s));
  }

  if (window.AOS) {
    window.AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 90,
    });
  }

  if (window.GLightbox) {
    window.GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      zoomable: true,
      openEffect: "zoom",
      closeEffect: "zoom",
    });
  }

  const testimonialSwiper = qs("#testimonialSwiper");
  if (testimonialSwiper && window.Swiper) {
    // eslint-disable-next-line no-new
    new window.Swiper("#testimonialSwiper", {
      slidesPerView: 1,
      spaceBetween: 18,
      grabCursor: true,
      loop: true,
      autoplay: { delay: 4200, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
  }

  const fakeSubmit = qs("#fakeSubmit");
  const showToast = (title, msg) => {
    const t = document.createElement("div");
    t.className = "toast";
    t.dataset.open = "false";
    t.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">☕</div>
        <div class="min-w-0">
          <div class="text-sm font-extrabold text-stone-900">${title}</div>
          <div class="mt-0.5 text-xs font-semibold text-stone-600">${msg}</div>
        </div>
        <button class="ml-auto rounded-xl px-2 py-1 text-xs font-extrabold text-stone-500 hover:text-stone-900" aria-label="Close">✕</button>
      </div>
    `;
    document.body.appendChild(t);
    requestAnimationFrame(() => (t.dataset.open = "true"));
    const close = () => {
      t.dataset.open = "false";
      setTimeout(() => t.remove(), 220);
    };
    qs("button", t)?.addEventListener("click", close);
    setTimeout(close, 3600);
  };
  if (fakeSubmit) {
    fakeSubmit.addEventListener("click", () => {
      showToast("Request sent", "Thanks! We’ll email cohort details (demo form).");
    });
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    const hero = qs("#home");
    if (hero) {
      window.gsap.fromTo(
        hero.querySelectorAll("h1, p, .btn-primary, .btn-outline, dl"),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.07, delay: 0.05 }
      );
    }

    qsa("video").forEach((vid) => {
      window.gsap.to(vid, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: vid,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });

    qsa(".surface-card, .glass-card").forEach((card) => {
      window.gsap.fromTo(
        card,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        }
      );
    });
  }

  // Handle hash scrolling on page load and hash change
  const handleHashScroll = () => {
    const hash = window.location.hash;
    if (!hash) return;

    const target = qs(hash);
    if (!target) return;

    const doScroll = () => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Try immediately and again after layout settles.
    doScroll();
    window.setTimeout(doScroll, 150);
    window.setTimeout(doScroll, 450);
  };

  window.addEventListener("DOMContentLoaded", handleHashScroll);
  window.addEventListener("load", handleHashScroll);
  window.addEventListener("hashchange", handleHashScroll);
})();
