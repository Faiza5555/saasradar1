// language-switcher.js
(function() {
    // Language Switcher HTML
    const switcherHTML = `
        <div class="language-switcher">
            <button class="lang-btn" data-lang="en">
                <span class="flag">🇬🇧</span>
                <span class="lang-text">English</span>
            </button>
            <button class="lang-btn" data-lang="ar">
                <span class="flag">🇸🇦</span>
                <span class="lang-text">العربية</span>
            </button>
            <button class="lang-btn" data-lang="fr">
                <span class="flag">🇫🇷</span>
                <span class="lang-text">Français</span>
            </button>
        </div>
    `;

    // CSS Styles
    const styles = `
        <style>
        .language-switcher {
            display: flex;
            gap: 8px;
            padding: 12px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin: 16px 0;
        }

        .lang-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        }

        .lang-btn:hover {
            border-color: #1a73e8;
            background: #f8f9fa;
        }

        .lang-btn.active {
            border-color: #1a73e8;
            background: #e8f0fe;
        }

        .flag {
            font-size: 20px;
        }

        .lang-text {
            font-size: 14px;
            font-weight: 500;
            color: #202124;
        }

        [dir="rtl"] .language-switcher {
            flex-direction: row-reverse;
        }
        </style>
    `;

    // Insert styles
    document.head.insertAdjacentHTML('beforeend', styles);

    // Find the placeholder and insert switcher
    const placeholder = document.getElementById('language-switcher-placeholder');
    if (placeholder) {
        placeholder.innerHTML = switcherHTML;
    }

    // Language switching logic
    function setupLanguageSwitcher() {
        const buttons = document.querySelectorAll('.lang-btn');
        const currentLang = window.location.pathname.match(/^\/(ar|fr)\//) 
            ? window.location.pathname.match(/^\/(ar|fr)\//)[1] 
            : 'en';

        // Set active button
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });

        // Click handlers
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                let currentPath = window.location.pathname;
                
                // Remove existing language prefix
                let basePath = currentPath.replace(/^\/(en|ar|fr)\//, '/');
                
                // Add new language prefix
                const newPath = lang === 'en' 
                    ? basePath 
                    : `/${lang}${basePath}`;
                
                window.location.href = newPath;
            });
        });

        // Set RTL for Arabic
        if (currentLang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        }
    }

    // Run after DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupLanguageSwitcher);
    } else {
        setupLanguageSwitcher();
    }
})();
