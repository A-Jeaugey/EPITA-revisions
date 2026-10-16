/* Élec — comportements communs aux pages du cahier de labo :
   numéros en code couleur, sommaire actif, barre de lecture, vérifications de fin de section. */
(function () {
  'use strict';
  var R = window.REV, U = R.util;
  var CC = ['#1b1b1b', '#7a4a25', '#c62828', '#ef6c00', '#f2c200', '#2e7d32', '#1565c0', '#6a1b9a', '#8d8d8d', '#f4f4f4'];
  var CN = ['noir', 'marron', 'rouge', 'orange', 'jaune', 'vert', 'bleu', 'violet', 'gris', 'blanc'];

  function codeSVG(n) {
    var d = String(n).split('').map(Number), xs = d.length === 1 ? [29] : [23, 35], bands = '';
    d.forEach(function (k, i) { bands += '<rect x="' + xs[i] + '" y="2" width="6" height="16" fill="' + CC[k] + '"/>'; });
    return '<svg viewBox="0 0 64 20" aria-hidden="true"><path d="M0 10H14M50 10H64" class="lead"/><rect x="14" y="2" width="36" height="16" rx="5" class="body"/>' + bands + '</svg>';
  }

  function init() {
    U.$$('.code[data-n]').forEach(function (el) { el.innerHTML = codeSVG(+el.dataset.n); });

    /* sommaire : partie visible + coche des parties comprises */
    var links = U.$$('.toc a[href^="#"]'), secs = U.$$('.sec[id]');
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1));
      var b = sec && sec.querySelector('[data-done]');
      if (b) { a.setAttribute('data-toc-key', b.getAttribute('data-done')); a.classList.toggle('done', R.progress.isRead(b.getAttribute('data-done'))); }
    });
    if ('IntersectionObserver' in window && links.length) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); }); });
      }, { rootMargin: '-35% 0px -60% 0px' });
      secs.forEach(function (s) { io.observe(s); });
    }
    var prog = document.getElementById('prog');
    if (prog) {
      var onScroll = function () { var h = document.documentElement.scrollHeight - window.innerHeight; prog.style.width = (h > 0 ? 100 * window.scrollY / h : 0) + '%'; };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
    /* vérifications de fin de section : <div data-check="id1,id2" data-title="…"></div> */
    if (R.quiz) U.$$('[data-check]').forEach(function (el) { R.quiz.mountCheck(el, el.getAttribute('data-check').split(',').map(function (s) { return s.trim(); }), el.getAttribute('data-title')); });
    R.wireDoneButtons();
  }
  document.addEventListener('DOMContentLoaded', init);

  R.elec = { CC: CC, CN: CN, codeSVG: codeSVG, nf: U.nf };
})();
