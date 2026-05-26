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
}());
