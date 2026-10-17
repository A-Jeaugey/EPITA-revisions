/* English text for data/annales.js (subject names). The file labels (Sujet, Corrigé…) and the archive labels
   stay French in the data: annales/index.en.html translates them when it displays them. */
REV.i18n.patch(window.ANNALES && window.ANNALES.subjects, {
  elec: { name: 'Electronics' },
  maths: { name: 'Mathematics' },
  physique: { name: 'Physics' },
  algo: { name: 'Algorithms' },
  archi: { name: 'Architecture' },
  prog: { name: 'Programming' },
  cie: { name: 'English · CIE' },
  tim: { name: 'English · TIM' },
  te: { name: 'Communication skills · TE' }
});
