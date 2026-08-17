function openLightbox(btn) {
  if (!btn || btn.disabled) return;
  var img = btn.querySelector('img');
  if (!img) return;
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = btn.getAttribute('data-caption') || img.alt;
  lightbox.classList.add('open');
}

document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
      });
    });
    document.addEventListener('click', function (e) {
      if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') mainNav.classList.remove('open');
    });
  }

  var header = document.getElementById('header');
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY > 40;
    if (header) header.style.boxShadow = scrolled ? '0 4px 16px rgba(15,76,92,.10)' : 'none';
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 480);
  });

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    function closeLightbox() {
      lightbox.classList.remove('open');
      lightboxImg.src = '';
    }
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('section').forEach(function (el) { observer.observe(el); });
});
