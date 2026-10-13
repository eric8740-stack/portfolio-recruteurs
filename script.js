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

// Année du pied de page
(function () {
  var a = document.getElementById('annee');
  if (a) a.textContent = String(new Date().getFullYear());
})();
