// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        document.body.classList.remove('nav-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Close mobile nav on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.body.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Animate the background glow to this project's dominant color, if set.
  // The page always paints first with the default blue (from style.css),
  // then — once that first frame is on screen — we swap the --blue and
  // --blue-rgb variables, and the transition already defined on the glow
  // layer/.topbar/.nav-mobile animates smoothly to the new color. Double
  // rAF guarantees the browser has painted the default color before the
  // change starts, so the transition is always visible instead of instant.
  const accent = document.body.dataset.accent;
  if (accent) {
    const hexToRgb = (hex) => {
      const clean = hex.replace('#', '');
      const full = clean.length === 3
        ? clean.split('').map(c => c + c).join('')
        : clean;
      const num = parseInt(full, 16);
      return `${(num >> 16) & 255},${(num >> 8) & 255},${num & 255}`;
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--blue', accent);
        document.documentElement.style.setProperty('--blue-rgb', hexToRgb(accent));
      });
    });
  }

  // Hide the nav bar on scroll down, reveal it on scroll up.
  // Stays visible near the top of the page regardless of direction.
  const navBar = document.querySelector('.topbar');
  if (navBar) {
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < 80) {
        navBar.classList.remove('nav-hidden');
      } else if (y > lastY) {
        navBar.classList.add('nav-hidden');
      } else if (y < lastY) {
        navBar.classList.remove('nav-hidden');
      }
      lastY = y;
    }, { passive: true });
  }
});
