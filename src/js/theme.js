const themeColors = {
    light: {
        background: '#f0f0f0',
        white: '#ffffff',
        black: '#161717',
        gray100: '#f0f0f0',
        gray200: '#e0e0e0',
        gray300: '#ddd',
        gray400: '#ccc',
        gray500: '#9ca3af',
        gray600: '#888'
    },
    dark: {
        background: 'var(--dark-background)',
        white: 'var(--dark-white)',
        black: 'var(--dark-text)',
        gray100: 'var(--dark-gray-100)',
        gray200: 'var(--dark-gray-200)',
        gray300: 'var(--dark-gray-300)',
        gray400: 'var(--dark-gray-400)',
        gray500: 'var(--dark-gray-500)',
        gray600: 'var(--dark-gray-600)'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = root.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function applyTheme(theme) {
        const colors = themeColors[theme];
        root.classList.toggle('dark-theme', theme === 'dark');
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';

        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
        });
    }
});