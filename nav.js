(function () {
  const navRoot = document.getElementById('site-nav');
  if (!navRoot) return;

  const isNested = /\/courses\//.test(location.pathname) || /\/about\//.test(location.pathname);
  const prefix = isNested ? '../' : './';
  const themeAttr = navRoot.dataset.navTheme || 'auto';
  const darkTheme =
    themeAttr === 'dark' ||
    (themeAttr === 'auto' && (document.body.classList.contains('bg-slate-950') || document.body.classList.contains('text-slate-100')));

  const theme = darkTheme ? {
    navLink: 'nav-link text-sm font-medium text-slate-100',
    mobileLink: 'text-sm font-semibold text-slate-100 hover:text-white',
    mobileButton: 'flex w-full items-center justify-between text-sm font-extrabold text-slate-100',
    brandTitle: 'truncate text-sm font-semibold tracking-tight text-slate-100',
    brandSubtitle: '-mt-0.5 truncate text-xs font-semibold text-slate-400',
    buttonRing: 'ring-1 ring-slate-200/20',
    mobileWrapper: 'flex flex-col gap-3 text-sm font-semibold text-slate-100',
  } : {
    navLink: 'nav-link text-sm font-medium',
    mobileLink: 'text-sm font-semibold text-stone-800 hover:text-stone-950',
    mobileButton: 'flex w-full items-center justify-between text-sm font-extrabold text-stone-900',
    brandTitle: 'truncate text-sm font-semibold tracking-tight text-stone-900',
    brandSubtitle: '-mt-0.5 truncate text-xs font-semibold text-stone-600',
    buttonRing: 'ring-1 ring-stone-200/90',
    mobileWrapper: 'flex flex-col gap-3 text-sm font-semibold text-stone-800',
  };

  const brandLogo = `${prefix}logo.jpeg`;
  const homeLink = `${prefix}index.html#home`;
  const contactLink = `${prefix}index.html#contact`;
  const aboutPath = `${prefix}about/`;
  const coursesPath = `${prefix}courses/`;

  navRoot.innerHTML = `
    <nav id="navbar" class="nav-glass relative mt-3 flex items-center justify-between gap-3 rounded-full px-4 py-3" aria-label="Primary">
      <a href="${prefix}index.html" class="group flex min-w-0 items-center gap-2">
        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white shadow-md ring-1 ring-stone-200/80 transition group-hover:-translate-y-0.5" aria-hidden="true">
          <img class="h-8 w-8 rounded-full" src="${brandLogo}" alt="Logo" />
        </span>
        <div class="leading-tight">
          <div class="${theme.brandTitle}">Beautiful</div>
          <div class="${theme.brandSubtitle}">Coffee Academy</div>
        </div>
      </a>

      <div class="hidden items-center gap-6 lg:flex">
        <a class="${theme.navLink}" href="${homeLink}">Home</a>

        <div class="nav-dropdown">
          <button type="button" class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
            About-Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 10l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
          <div class="nav-dropdown-panel" role="menu">
            <a role="menuitem" href="${aboutPath}why-us.html">Why us</a>
            <a role="menuitem" href="${aboutPath}meet-the-team.html">Meet the team</a>
          </div>
        </div>

        <a class="${theme.navLink}" href="${prefix}shop.html">Shop</a>

        <div class="nav-dropdown">
          <button type="button" class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
            Trainings
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 10l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
          <div class="nav-dropdown-panel" role="menu">
            <a role="menuitem" href="${coursesPath}barista-foundations.html">Speciality Barista</a>
            <a role="menuitem" href="${coursesPath}latte-art-studio.html">Latte art</a>
            <a role="menuitem" href="${coursesPath}roasting-essentials.html">Roasting</a>
            <a role="menuitem" href="${coursesPath}brew-methods-lab.html">Brewing</a>
          </div>
        </div>

        <a class="${theme.navLink}" href="${prefix}support-us.html">Support Us</a>
        <a class="${theme.navLink}" href="${contactLink}">Contact-Us</a>
      </div>

      <button
        id="menuBtn"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full ${theme.buttonRing} lg:hidden"
        aria-label="Open menu"
        aria-controls="mobileMenu"
        aria-expanded="false"
        type="button"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </nav>

    <div id="mobileMenu" data-open="false" class="nav-glass relative mt-3 rounded-3xl px-4 py-4 lg:hidden">
      <div class="${theme.mobileWrapper}">
        <a class="${theme.mobileLink}" href="${homeLink}">Home</a>

        <div class="mobile-submenu-shell px-3 py-2">
          <button
            type="button"
            class="${theme.mobileButton}"
            data-mobile-submenu="true"
            aria-expanded="false"
            aria-controls="m-about"
          >
            About-Us <span aria-hidden="true">▾</span>
          </button>
          <div id="m-about" class="nav-dropdown-panel-mobile" data-open="false">
            <a href="${aboutPath}why-us.html">Why us</a>
            <a href="${aboutPath}meet-the-team.html">Meet the team</a>
          </div>
        </div>

        <a class="${theme.mobileLink}" href="${prefix}shop.html">Shop</a>

        <div class="mobile-submenu-shell px-3 py-2">
          <button
            type="button"
            class="${theme.mobileButton}"
            data-mobile-submenu="true"
            aria-expanded="false"
            aria-controls="m-trainings"
          >
            Trainings <span aria-hidden="true">▾</span>
          </button>
          <div id="m-trainings" class="nav-dropdown-panel-mobile" data-open="false">
            <a href="${coursesPath}barista-foundations.html">Speciality Barista</a>
            <a href="${coursesPath}latte-art-studio.html">Latte art</a>
            <a href="${coursesPath}roasting-essentials.html">Roasting</a>
            <a href="${coursesPath}brew-methods-lab.html">Brewing</a>
          </div>
        </div>

        <a class="${theme.mobileLink} font-semibold" href="${prefix}support-us.html">Support Us</a>
        <a class="${theme.mobileLink}" href="${contactLink}">Contact-Us</a>
      </div>
    </div>
  `;

  function normalizePath(path) {
    const cleaned = path.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    const trimmed = cleaned.replace(/\/$/, '');
    return trimmed || '/';
  }

  function markActiveLink() {
    const currentUrl = new URL(location.href);
    const currentPath = normalizePath(currentUrl.pathname);
    const currentHash = currentUrl.hash || (currentPath === '/' ? '#home' : '');

    navRoot.querySelectorAll('a[href]').forEach((link) => {
      const linkUrl = new URL(link.getAttribute('href'), location.href);
      const linkPath = normalizePath(linkUrl.pathname);
      const linkHash = linkUrl.hash || (linkPath === '/' ? '#home' : '');
      const isHomeMatch = currentPath === '/' && linkPath === '/' && linkHash === '#home' && currentHash === '';
      const isActive = linkPath === currentPath && (linkHash === currentHash || isHomeMatch);

      if (!isActive) return;

      link.setAttribute('aria-current', 'page');
      link.classList.add('font-semibold');
      if (link.closest('.nav-dropdown-panel') || link.closest('.nav-dropdown-panel-mobile')) {
        link.classList.add('text-emerald-700');
      }

      const dropdownPanel = link.closest('.nav-dropdown-panel, .nav-dropdown-panel-mobile');
      if (dropdownPanel) {
        const dropdownTrigger = dropdownPanel.closest('.nav-dropdown')?.querySelector('.nav-dropdown-trigger');
        if (dropdownTrigger) {
          dropdownTrigger.classList.add('text-emerald-700');
          if (dropdownPanel.matches('.nav-dropdown-panel-mobile')) {
            dropdownPanel.dataset.open = 'true';
            const mobileButton = document.querySelector(`[aria-controls="${dropdownPanel.id}"]`);
            if (mobileButton) mobileButton.setAttribute('aria-expanded', 'true');
          }
        }
      }
    });
  }

  markActiveLink();

  function setExpanded(button, panel, isOpen) {
    button.setAttribute('aria-expanded', String(isOpen));
    panel.dataset.open = String(isOpen);
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.nav-dropdown-trigger').forEach((button) => {
      const panel = button.nextElementSibling;
      if (panel) setExpanded(button, panel, false);
    });
  }

  document.querySelectorAll('.nav-dropdown-trigger').forEach((button) => {
    const panel = button.nextElementSibling;
    button.addEventListener('click', () => {
      const isOpen = panel?.dataset.open !== 'true';
      closeAllDropdowns();
      setExpanded(button, panel, isOpen);
    });
  });

  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.dataset.open !== 'true';
      mobileMenu.dataset.open = String(open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('[data-mobile-submenu="true"]').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    button.addEventListener('click', () => {
      const isOpen = panel?.dataset.open !== 'true';
      if (panel) panel.dataset.open = String(isOpen);
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });
})();
