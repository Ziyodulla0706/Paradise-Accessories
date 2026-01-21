// Paradise Accessories - Internationalization System
// ==================================================

// Language configuration
const languages = {
    ru: {
        name: 'Русский',
        code: 'ru',
        flag: '🇷🇺'
    },
    uz: {
        name: 'O\'zbek',
        code: 'uz',
        flag: '🇺🇿'
    },
    en: {
        name: 'English',
        code: 'en',
        flag: '🇬🇧'
    }
};

// Get current language from URL
function getCurrentLanguage() {
    const path = window.location.pathname;
    const match = path.match(/\/(ru|uz|en)\//);
    return match ? match[1] : 'ru'; // Default to Russian
}

// Get current page name (without language prefix)
function getCurrentPage() {
    const path = window.location.pathname;
    const match = path.match(/\/(ru|uz|en)\/([^\/]+)$/);
    if (match) {
        return match[2];
    }
    // If just /ru/ or /uz/ or /en/ return index.html
    if (path.match(/\/(ru|uz|en)\/?$/)) {
        return 'index.html';
    }
    return 'index.html';
}

// Switch to a different language
function switchLanguage(newLang) {
    const currentLang = getCurrentLanguage();
    const currentPage = getCurrentPage();

    // Get current URL and replace language directory
    // Works for both file:// protocol and web servers
    const currentUrl = window.location.href;

    // More precise replacement: only replace /{lang}/ pattern once
    // This prevents duplicate replacements in the path
    const langPattern = new RegExp(`/${currentLang}/`);
    const newUrl = currentUrl.replace(langPattern, `/${newLang}/`);

    // Save preference
    localStorage.setItem('preferredLanguage', newLang);

    // Navigate to new URL
    window.location.href = newUrl;
}

// Initialize language switcher
function initLanguageSwitcher() {
    const currentLang = getCurrentLanguage();
    const switcher = document.getElementById('languageSwitcher');
    const dropdownContent = document.getElementById('languageDropdown');

    if (!switcher || !dropdownContent) return;

    // Set current language display
    const currentLangBtn = switcher.querySelector('.current-lang');
    if (currentLangBtn) {
        const langData = languages[currentLang];
        currentLangBtn.innerHTML = `${langData.flag} <span>${langData.code.toUpperCase()}</span>`;
    }

    // Populate dropdown
    Object.keys(languages).forEach(lang => {
        if (lang !== currentLang) {
            const langData = languages[lang];
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'language-option';
            link.innerHTML = `${langData.flag} ${langData.name}`;
            link.onclick = (e) => {
                e.preventDefault();
                switchLanguage(lang);
            };
            dropdownContent.appendChild(link);
        }
    });

    // Toggle dropdown on click
    switcher.addEventListener('click', (e) => {
        e.stopPropagation();
        switcher.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        switcher.classList.remove('active');
    });
}

// Auto-redirect to preferred language on root
function handleRootRedirect() {
    const path = window.location.pathname;

    // Check if we're already inside a language directory
    const isInLangDir = path.match(/\/(ru|uz|en)\//);

    // Only redirect if we're at the ROOT index, not already in a language folder
    if (!isInLangDir && (path === '/' || path === '/index.html' || path.endsWith('/index.html'))) {
        const preferredLang = localStorage.getItem('preferredLanguage') || 'ru';
        // Use absolute path to avoid relative path issues
        const newPath = path.substring(0, path.lastIndexOf('/')) + `/${preferredLang}/`;
        window.location.href = newPath;
    }
}

// Set HTML lang attribute
function setHtmlLang() {
    const currentLang = getCurrentLanguage();
    document.documentElement.setAttribute('lang', currentLang);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    handleRootRedirect();
    setHtmlLang();
    initLanguageSwitcher();

    console.log(`Language: ${getCurrentLanguage()}`);
});

// Export for use in other scripts
window.i18n = {
    getCurrentLanguage,
    getCurrentPage,
    switchLanguage,
    languages
};
