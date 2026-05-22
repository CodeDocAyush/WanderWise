/* ═══════════════════════════════════════════════
   WANDERWISE — script.js
═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   DARK MODE CONTROLLER
───────────────────────────────────────────── */
const themeToggleBtn = document.getElementById('darkModeToggle');

// Load stored theme configuration on startup
const storedTheme = localStorage.getItem('ww-theme') || 'light';
document.documentElement.setAttribute('data-theme', storedTheme);
syncThemeIcon(storedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetedTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetedTheme);
    localStorage.setItem('ww-theme', targetedTheme);
    syncThemeIcon(targetedTheme);
  });
}

function syncThemeIcon(theme) {
  if (!themeToggleBtn) return;
  const iconInstance = themeToggleBtn.querySelector('i');
  if (theme === 'dark') {
    iconInstance.className = 'ti ti-sun';
  } else {
    iconInstance.className = 'ti ti-moon';
  }
}

/* ─────────────────────────────────────────────
   STATIC ROUTING UTILITY
───────────────────────────────────────────── */
function startExplore() {
  const inputEl = document.getElementById('destInput');
  const errorEl = document.getElementById('searchError');
  if (!inputEl) return;

  const rawQuery = inputEl.value.trim().toLowerCase();
  if (!rawQuery) {
    inputEl.focus();
    return;
  }

  // Database map verifying valid routes
  const registry = ['jaipur', 'goa', 'paris', 'agra', 'kerala', 'manali', 'leh ladakh'];

  if (registry.includes(rawQuery)) {
    if (errorEl) errorEl.classList.add('hidden');
    
    // Check if path currently handles local directory execution context
    const insideSubfolder = window.location.pathname.includes('/destinations/');
    const folderPrefix = insideSubfolder ? '' : 'destinations/';
    
    // Smoothly transition window location straight to matching page
    window.location.href = `${folderPrefix}${rawQuery}.html`;
  } else {
    if (errorEl) errorEl.classList.remove('hidden');
  }
}

// Intercept typing action within the search bar
const destInputEl = document.getElementById('destInput');
if (destInputEl) {
  destInputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') startExplore();
  });
}