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

  // Animate the background to this project's dominant color, if set.
  // The page always paints first with the default blue (from style.css),
  // then — once that first frame is on screen — we swap the --blue
  // variable, and the transition already defined on body/.topbar/.nav-mobile
  // animates smoothly to the new color. Double rAF guarantees the browser
  // has painted the default color before the change starts, so the
  // transition is always visible instead of appearing instant.
  const accent = document.body.dataset.accent;
  if (accent) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--blue', accent);
      });
    });
  }
});
