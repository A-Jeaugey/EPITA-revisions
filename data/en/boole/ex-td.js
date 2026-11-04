/* English text for data/boole/ex-td.js (Tutorial 1, four cards: td1-ex1, td1-ex2, td1-ex3a, td1-ex3b).
   Statements: Tutorial_01.pdf (“Boolean Algebra”, David Bouchet). The text tables and the builder are in
   data/en/boole/ex-annales.js (window.BOOLE_EN), which must be loaded first. */
(function () {
  'use strict';
  var R = window.REV;
  if (!R || !R.i18n || R.i18n.lang !== 'en' || !window.BOOLE_EX || !window.BOOLE_EN) return;
  var map = {};
  window.BOOLE_EX.forEach(function (c) { if (c.kind === 'td') map[c.id] = window.BOOLE_EN.card(c); });
  R.i18n.patch(window.BOOLE_EX, map);
})();
