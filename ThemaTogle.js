// ========================================
// THEME TOGGLE SYSTEM & UI INTERACTION
// ========================================

// 1. DEFINISI TEMA
const themes = {
  default: {
    name: 'Luméra Pink',
    primary: '#c2185b',      // Pink Makeup
    secondary: '#faf6f8',    // Background Hero/Section
    background: '#ffffff',   // White
    text: '#333333',         // Dark Grey
    accent: '#555555'        // Secondary Text
  },
  dark: {
    name: 'Elegant Dark',
    primary: '#ff4081',      // Bright Pink for contrast
    secondary: '#1f1f1f',    // Dark Grey for sections
    background: '#121212',   // Very Dark BG
    text: '#eaeaea',         // Light Text
    accent: '#b0b0b0'        // Grey Text
  },
  nature: {
    name: 'Nature',
    primary: '#27ae60',      // Green
    secondary: '#f0f8f0',    // Light Green BG
    background: '#ffffff',   // White
    text: '#2d3436',         // Dark
    accent: '#636e72'        // Grey
  },
  ocean: {
    name: 'Ocean',
    primary: '#0984e3',      // Blue
    secondary: '#eaf2f8',    // Light Blue BG
    background: '#ffffff',   // White
    text: '#2c3e50',         // Dark Blue
    accent: '#7f8c8d'        // Grey Blue
  },
  sunset: {
    name: 'Sunset',
    primary: '#d35400',      // Orange
    secondary: '#fdf2e9',    // Light Orange BG
    background: '#fffaf0',   // Cream
    text: '#2d3436',         // Dark
    accent: '#8e44ad'        // Purple
  }
};

// 2. STATE MANAGEMENT
let currentTheme = 'default';

// 3. FUNGSI APPLY THEME
function applyTheme(themeName) {
  const theme = themes[themeName];
  
  if (!theme) {
    console.error(`Theme "${themeName}" not found!`);
    return;
  }

  // Set CSS Variables
  const root = document.documentElement;
  root.style.setProperty('--primary-color', theme.primary);
  root.style.setProperty('--secondary-color', theme.secondary);
  root.style.setProperty('--background-color', theme.background);
  root.style.setProperty('--text-color', theme.text);
  root.style.setProperty('--accent-color', theme.accent);

  // Update State
  currentTheme = themeName;
  
  // Save to LocalStorage
  localStorage.setItem('selectedTheme', themeName);
  
  // Update Button Text
  updateThemeButton(theme.name);
  
  // Log untuk debugging
  console.log(`✅ Theme changed to: ${theme.name}`);
}

// 4. UPDATE THEME BUTTON TEXT
function updateThemeButton(themeName) {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.textContent = `${themeName}`;
  }
}

// 5. CYCLE THEME (Next Theme)
function cycleTheme() {
  const themeNames = Object.keys(themes);
  const currentIndex = themeNames.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themeNames.length;
  
  applyTheme(themeNames[nextIndex]);
}

// 6. INITIALIZE THEME SYSTEM
function initThemeSystem() {
  console.log('Initializing Theme System...');
  
  // A. SETUP THEME BUTTON
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      cycleTheme();
    });
    console.log('Theme button initialized');
  } else {
    console.warn('Theme button not found!');
  }

  // B. LOAD SAVED THEME
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme && themes[savedTheme]) {
    console.log(`Loading saved theme: ${savedTheme}`);
    applyTheme(savedTheme);
  } else {
    console.log('Loading default theme');
    applyTheme('default');
  }
}

// 7. INITIALIZE BURGER MENU
function initBurgerMenu() {
  console.log('Initializing Burger Menu...');
  
  const burgerBtn = document.querySelector('.burger');
  const closeBtn = document.querySelector('.close-menu');
  const overlay = document.querySelector('.menu-overlay');
  const menuLinks = document.querySelectorAll('.menu-panel a');

  if (!burgerBtn || !overlay) {
    console.warn('Burger menu elements not found!');
    return;
  }

  // Buka menu
  burgerBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    console.log('Menu opened');
  });

  // Tutup menu (tombol X)
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      console.log('Menu closed (X button)');
    });
  }

  // Tutup menu (klik background gelap)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      console.log('Menu closed (overlay click)');
    }
  });

  // Tutup menu saat link diklik
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
      console.log('Menu closed (link click)');
    });
  });

  console.log('Burger menu initialized');
}

// 8. MAIN INITIALIZATION
function initSystem() {
  console.log('Starting Luméra Beauty System...');
  
  initThemeSystem();
  initBurgerMenu();
  
  console.log('System initialized successfully!');
}

// 9. JALANKAN SAAT DOM SIAP
document.addEventListener('DOMContentLoaded', initSystem);