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
        if (theme === 'dark') {
            root.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
            root.style.setProperty('--color-background', 'var(--dark-background)');
            root.style.setProperty('--color-white', 'var(--dark-white)');
            root.style.setProperty('--color-black', 'var(--dark-text)');
            root.style.setProperty('--color-gray-100', 'var(--dark-gray-100)');
            root.style.setProperty('--color-gray-200', 'var(--dark-gray-200)');
            root.style.setProperty('--color-gray-300', 'var(--dark-gray-300)');
            root.style.setProperty('--color-gray-400', 'var(--dark-gray-400)');
            root.style.setProperty('--color-gray-500', 'var(--dark-gray-500)');
            root.style.setProperty('--color-gray-600', 'var(--dark-gray-600)');
        } else {
            root.classList.remove('dark-theme');
            themeToggle.textContent = '🌙';
            root.style.setProperty('--color-background', '#f0f0f0');
            root.style.setProperty('--color-white', '#ffffff');
            root.style.setProperty('--color-black', '#161717');
            root.style.setProperty('--color-gray-100', '#f0f0f0');
            root.style.setProperty('--color-gray-200', '#e0e0e0');
            root.style.setProperty('--color-gray-300', '#ddd');
            root.style.setProperty('--color-gray-400', '#ccc');
            root.style.setProperty('--color-gray-500', '#9ca3af');
            root.style.setProperty('--color-gray-600', '#888');
        }
    }
});