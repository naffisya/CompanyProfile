// ========================================
// THEME TOGGLE SYSTEM - 5 THEMES
// ========================================

// 1. DEFINISI TEMA
const themes = {
  default: {
    name: 'Default',
    primary: '#3498db',
    secondary: '#2c3e50',
    background: '#ffffff',
    text: '#333333',
    accent: '#e74c3c'
  },
  dark: {
    name: 'Dark',
    primary: '#1a1a2e',
    secondary: '#16213e',
    background: '#0f0f23',
    text: '#eaeaea',
    accent: '#e94560'
  },
  nature: {
    name: 'Nature',
    primary: '#27ae60',
    secondary: '#16a085',
    background: '#f0f8f0',
    text: '#2d3436',
    accent: '#f39c12'
  },
  ocean: {
    name: 'Ocean',
    primary: '#0984e3',
    secondary: '#00b894',
    background: '#dfe6e9',
    text: '#2d3436',
    accent: '#fd79a8'
  },
  sunset: {
    name: 'Sunset',
    primary: '#fd79a8',
    secondary: '#fdcb6e',
    background: '#fff5e6',
    text: '#2d3436',
    accent: '#e17055'
  }
};

// 2. STATE MANAGEMENT
let currentTheme = 'default';

// 3. FUNGSI APPLY THEME
function applyTheme(themeName) {
  const theme = themes[themeName];
  
  if (!theme) {
    console.error('Theme tidak ditemukan!');
    return;
  }

  // Manipulasi CSS Variables di root
  const root = document.documentElement;
  root.style.setProperty('--primary-color', theme.primary);
  root.style.setProperty('--secondary-color', theme.secondary);
  root.style.setProperty('--background-color', theme.background);
  root.style.setProperty('--text-color', theme.text);
  root.style.setProperty('--accent-color', theme.accent);

  // Update state
  currentTheme = themeName;

  // Simpan ke localStorage
  localStorage.setItem('selectedTheme', themeName);

  // Update UI active state
  updateActiveButton(themeName);

  // Log untuk debugging
  console.log(`Theme changed to: ${theme.name}`);
}

// 4. UPDATE ACTIVE BUTTON
function updateActiveButton(themeName) {
  // Hapus class active dari semua button
  const buttons = document.querySelectorAll('.theme-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Tambah class active ke button yang dipilih
  const activeButton = document.querySelector(`[data-theme="${themeName}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// 5. EVENT LISTENERS
function initThemeToggle() {
  // Get semua theme buttons
  const themeButtons = document.querySelectorAll('.theme-btn');

  // Tambahkan event listener ke setiap button
  themeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const selectedTheme = this.getAttribute('data-theme');
      applyTheme(selectedTheme);
    });

    // Hover effect (opsional)
    button.addEventListener('mouseenter', function() {
      const themeName = this.getAttribute('data-theme');
      const theme = themes[themeName];
      this.style.transform = 'scale(1.1)';
      this.style.borderColor = theme.primary;
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Load saved theme dari localStorage
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme && themes[savedTheme]) {
    applyTheme(savedTheme);
  } else {
    applyTheme('default');
  }
}

// 6. FUNGSI UNTUK CYCLE THEMES (BONUS)
function cycleTheme() {
  const themeNames = Object.keys(themes);
  const currentIndex = themeNames.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themeNames.length;
  applyTheme(themeNames[nextIndex]);
}

// 7. KEYBOARD SHORTCUT (BONUS)
function initKeyboardShortcut() {
  document.addEventListener('keydown', function(event) {
    // Tekan 'T' untuk cycle theme
    if (event.key === 't' || event.key === 'T') {
      cycleTheme();
    }
  });
}

// 8. INITIALIZE SEMUA
document.addEventListener('DOMContentLoaded', function() {
  console.log('Theme Toggle System initialized!');
  initThemeToggle();
  initKeyboardShortcut();
});

// 9. EXPORT FUNCTIONS (untuk digunakan di tempat lain)
window.themeSystem = {
  applyTheme,
  cycleTheme,
  getCurrentTheme: () => currentTheme,
  getThemes: () => themes
};