(function () {
  const key = 'qa-plan-theme';
  const stored = localStorage.getItem(key);
  const initial = stored === 'dark' || stored === 'light' ? stored : 'light';

  localStorage.removeItem('eva-theme-v2');
  localStorage.removeItem('eva-theme');
  document.documentElement.setAttribute('data-theme', initial);

  function updateButton() {
    const button = document.getElementById('theme-btn');
    if (!button) return;
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    button.textContent = light ? '◑  SWITCH TO DARK' : '◑  SWITCH TO LIGHT';
  }

  window.toggleTheme = function () {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    const next = light ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(key, next);
    localStorage.removeItem('eva-theme-v2');
    localStorage.removeItem('eva-theme');
    updateButton();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateButton);
  } else {
    updateButton();
  }

  /* ─── Mobile drawer toggle ─── */
  window.toggleMobileMenu = function () {
    document.body.classList.toggle('menu-open');
  };

  function closeMobileMenu() {
    document.body.classList.remove('menu-open');
  }

  /* Close drawer on backdrop click or nav-link tap or Esc */
  document.addEventListener('click', function (e) {
    if (!document.body.classList.contains('menu-open')) return;
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.mobile-menu-toggle');
    /* Tap on a nav link inside the drawer → close after navigation */
    if (e.target.closest('.sidebar .nav-link')) {
      closeMobileMenu();
      return;
    }
    /* Click outside drawer + button → close */
    if (sidebar && !sidebar.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
      closeMobileMenu();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });
}());
