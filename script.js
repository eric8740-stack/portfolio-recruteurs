// NAVBAR
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); });

// MOBILE MENU
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });
navLinks.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { navLinks.classList.remove('active'); }); });

// ACCORDION
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        accordionItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// MODAL
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImg');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const info = card.querySelector('.project-info');
        const img = card.querySelector('.project-image img');
        const tag = info.querySelector('.project-tag');

        if (img && img.naturalWidth > 0) { modalImg.src = img.src; modalImg.alt = img.alt; modalImg.style.display = 'block'; modalImg.parentElement.style.display = 'flex'; }
        else { modalImg.style.display = 'none'; modalImg.parentElement.style.display = 'none'; }

        modalTag.textContent = tag.textContent;
        modalTag.className = 'modal-tag';
        if (tag.classList.contains('tag-vba')) modalTag.classList.add('tag-vba');
        if (tag.classList.contains('tag-ice')) modalTag.classList.add('tag-ice');

        modalTitle.textContent = info.querySelector('h3').textContent;
        modalDesc.textContent = info.querySelector('p').textContent;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.skill-card, .project-card, .timeline-card, .impact-card, .certif-card, .profil-box, .contact-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// COUNTER
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.dataset.count);
            let current = 0;
            const increment = count / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= count) { target.textContent = count; clearInterval(timer); }
                else { target.textContent = Math.floor(current); }
            }, 37);
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });
statNumbers.forEach(num => counterObserver.observe(num));

// SMOOTH LOAD
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
