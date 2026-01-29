const translations = {
    es: {
        home: "Inicio",
        blog: "Blog",
        multimedia: "Multimedia",
        publications: "Publicaciones",
        about: "Sobre mí",
        contact: "Contacto",
        toggleLang: "EN",
        // Blog Page
        blog_title: "Blog",
        blog_date_1: "29 Enero 2026",
        blog_title_1: "Reflexiones Nocturnas",
        blog_text_1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        blog_date_2: "15 Enero 2026",
        blog_title_2: "Minimalismo Digital",
        blog_text_2: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        blog_date_3: "01 Enero 2026",
        blog_title_3: "El Comienzo",
        blog_text_3: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        // Multimedia Page
        media_title: "Multimedia",
        media_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        // Publications Page
        pub_title: "Publicaciones",
        pub_item_1_title: "Estudio sobre el Minimalismo",
        pub_item_1_desc: "Publicado en Design Journal, 2025.",
        pub_read_more: "Leer más",
        pub_item_2_title: "La Noche y el Arte",
        pub_item_2_desc: "Ensayo fotográfico colaborativo.",
        pub_view_project: "Ver proyecto",
        pub_item_3_title: "Noctiphilus: El Origen",
        pub_item_3_desc: "Artículo destacado en medium.",
        // About Page
        about_title: "Sobre mí",
        about_p1: "Soy un creador enfocado en la simplicidad y el diseño nocturno. Busco la elegancia en la ausencia de luz y la claridad en el espacio negativo.",
        about_p2: "NOCTIPHILUS es mi canvas personal donde exploro estas ideas.",
        // Contact Page
        contact_title: "Contacto",
        contact_email: "Email",
        contact_email_ph: "tu@email.com",
        contact_msg: "Mensaje",
        contact_msg_ph: "Escribe tu mensaje aquí...",
        contact_send: "Enviar"
    },
    en: {
        home: "Home",
        blog: "Blog",
        multimedia: "Multimedia",
        publications: "Publications",
        about: "About Me",
        contact: "Contact",
        toggleLang: "ES",
        // Blog Page
        blog_title: "Blog",
        blog_date_1: "January 29, 2026",
        blog_title_1: "Nightly Reflections",
        blog_text_1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        blog_date_2: "January 15, 2026",
        blog_title_2: "Digital Minimalism",
        blog_text_2: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        blog_date_3: "January 01, 2026",
        blog_title_3: "The Beginning",
        blog_text_3: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        // Multimedia Page
        media_title: "Multimedia",
        media_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        // Publications Page
        pub_title: "Publications",
        pub_item_1_title: "Study on Minimalism",
        pub_item_1_desc: "Published in Design Journal, 2025.",
        pub_read_more: "Read more",
        pub_item_2_title: "The Night and Art",
        pub_item_2_desc: "Collaborative photographic essay.",
        pub_view_project: "View project",
        pub_item_3_title: "Noctiphilus: The Origin",
        pub_item_3_desc: "Featured article on Medium.",
        // About Page
        about_title: "About Me",
        about_p1: "I am a creator focused on simplicity and nocturnal design. I seek elegance in the absence of light and clarity in negative space.",
        about_p2: "NOCTIPHILUS is my personal canvas where I explore these ideas.",
        // Contact Page
        contact_title: "Contact",
        contact_email: "Email",
        contact_email_ph: "your@email.com",
        contact_msg: "Message",
        contact_msg_ph: "Write your message here...",
        contact_send: "Send"
    }
};

let currentLang = 'es';

const langToggleBtn = document.getElementById('lang-toggle');
const themeToggleBtn = document.getElementById('theme-toggle');
const menuToggleBtn = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
// We need to re-query this every time? No, but pages reload.
// Actually, script.js is loaded on every page, so it runs fresh each time.
const translatableElements = document.querySelectorAll('[data-translate]');

// Initialize Language
function setLanguage(lang) {
    currentLang = lang;
    translatableElements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', translations[lang][key]);
                }
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Update Desktop Button
    if (langToggleBtn) {
        langToggleBtn.textContent = translations[lang].toggleLang;
    }

    // Update Mobile Button
    const mobileLangToggleBtn = document.getElementById('mobile-lang-toggle');
    if (mobileLangToggleBtn) {
        mobileLangToggleBtn.textContent = translations[lang].toggleLang;
    }

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang); // Save preference
}

// Menu Toggle Event
menuToggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close menu when clicking a link (but not the language toggle if it's inside)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close if it's the language toggle
        if (e.target.id === 'mobile-lang-toggle') return;

        nav.classList.remove('active');
    });
});

// Language Toggle Logic
const mobileLangToggleBtn = document.getElementById('mobile-lang-toggle');

function toggleLanguage() {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    setLanguage(newLang);
}

// Events for both buttons
langToggleBtn.addEventListener('click', toggleLanguage);
if (mobileLangToggleBtn) {
    mobileLangToggleBtn.parentElement.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent hash navigation
        toggleLanguage();
    });
}

// Update setLanguage to update both buttons
const originalSetLanguage = setLanguage;
setLanguage = function (lang) {
    currentLang = lang;
    translatableElements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    const nextLang = lang === 'es' ? 'EN' : 'ES'; // Logic was "show current", user wants toggle? 
    // Wait, original code was: langToggleBtn.textContent = translations[lang].toggleLang;
    // translations[es].toggleLang is EN. So it shows the TARGET language.

    langToggleBtn.textContent = translations[lang].toggleLang;
    if (mobileLangToggleBtn) {
        mobileLangToggleBtn.textContent = translations[lang].toggleLang;
    }

    document.documentElement.lang = lang;
};

// Dark Mode Toggle Event
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    // Save preference (optional, but requested implicitly by "features")
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load Preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}
