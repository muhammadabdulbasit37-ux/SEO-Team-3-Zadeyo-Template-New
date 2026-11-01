/** Supplied gameplay capture used for default social previews. */
export const DEFAULT_OG_GAMEPLAY_IMAGE = '/images/gameplay/the-isle-dinosaur-esp-gameplay.webp';
export const DEFAULT_OG_GAMEPLAY_ALT = 'The Isle forest scene with dinosaur labels, health readouts, red lines and an overlaid map.';
export const DEFAULT_OG_GAMEPLAY_WIDTH = 1672;
export const DEFAULT_OG_GAMEPLAY_HEIGHT = 941;
/** Preserve the existing shared gallery slots. */
export const SHOWCASE_GALLERY_KEYS = ['gpMatchEsp', 'gpAimbotMenu', 'gpEspMenu'] as const;

/** Localized description of the same supplied social image. */
export const DEFAULT_OG_GAMEPLAY_ALTS = {
  "en": "The Isle forest scene with dinosaur labels, health readouts, red lines and an overlaid map.",
  "es": "Escena de bosque de The Isle con etiquetas de dinosaurios, datos de salud, líneas rojas y un mapa superpuesto.",
  "de": "Waldszene in The Isle mit Dinosaurierbeschriftungen, Gesundheitswerten, roten Linien und eingeblendeter Karte.",
  "fr": "Scène forestière de The Isle avec étiquettes de dinosaures, santé, lignes rouges et carte superposée."
} as const;
