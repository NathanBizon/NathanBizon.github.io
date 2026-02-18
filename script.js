// ===== LANGUAGE TOGGLE =====
let currentLang = 'fr';

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-fr][data-en]').forEach(el => {
        el.textContent = el.dataset[lang];
    });

    document.getElementById('lang-fr').classList.toggle('active', lang === 'fr');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');

    localStorage.setItem('nb-lang', lang);
}

document.getElementById('lang-toggle').addEventListener('click', () => {
    applyLanguage(currentLang === 'fr' ? 'en' : 'fr');
});

// Restore saved language
const savedLang = localStorage.getItem('nb-lang');
if (savedLang && savedLang !== 'fr') applyLanguage(savedLang);


// ===== NAVBAR: scroll shadow & active link =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Shadow on scroll
    navbar.classList.toggle('scrolled', window.scrollY > 10);

    // Active nav link
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}, { passive: true });


// ===== MOBILE HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    const open = navLinksEl.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
});

// Close menu on link click
navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        hamburger.classList.remove('open');
    });
});


// ===== SKILL BAR ANIMATION (IntersectionObserver) =====
const skillSection = document.getElementById('skills');
const fills = skillSection.querySelectorAll('.skill-fill');

// Reset widths immediately so animation triggers on entry
fills.forEach(f => { f.style.width = '0'; });

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            fills.forEach(f => { f.style.width = f.style.getPropertyValue('--pct') || f.style['--pct']; });
            // Use CSS custom property
            fills.forEach(f => { f.style.width = getComputedStyle(f).getPropertyValue('--pct').trim() || '0'; });
            observer.disconnect();
        }
    });
}, { threshold: 0.15 });

observer.observe(skillSection);
