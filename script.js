// Portfolio recruteurs — refonte du 13/10/2026. Aucune dépendance.

// Barre de navigation : filet sous la barre dès qu'on défile
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  function maj() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', maj, { passive: true });
  maj();
})();

// Menu repliable (téléphone et tablette)
(function () {
  var bouton = document.getElementById('navToggle');
  var liens = document.getElementById('navLinks');
  if (!bouton || !liens) return;
  function fermer() {
    liens.classList.remove('open');
    bouton.setAttribute('aria-expanded', 'false');
    bouton.setAttribute('aria-label', 'Ouvrir le menu');
  }
  bouton.addEventListener('click', function () {
    var ouvert = liens.classList.toggle('open');
    bouton.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
    bouton.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  liens.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fermer); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermer(); });
})();

// Bascule clair / sombre (l'état initial est posé dans le <head>)
(function () {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  var meta = document.querySelector('meta[name="theme-color"]');
  function appliquer(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b110d' : '#f8faf8');
    btn.setAttribute('aria-label', theme === 'dark' ? 'Passer en clair' : 'Passer en sombre');
  }
  appliquer(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  btn.addEventListener('click', function () {
    var suivant = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    appliquer(suivant);
    try { localStorage.setItem('theme', suivant); } catch (e) {}
  });
})();

// Apparition douce au défilement (rien si le visiteur a demandé moins de mouvement)
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var cibles = document.querySelectorAll('.tile, .case, .steps li, .tl-card, .skill, .reco, .form');
  var obs = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  cibles.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) return; // déjà à l'écran : on n'anime pas
    el.classList.add('reveal');
    obs.observe(el);
  });
})();

// Année du pied de page
(function () {
  var a = document.getElementById('annee');
  if (a) a.textContent = String(new Date().getFullYear());
})();
