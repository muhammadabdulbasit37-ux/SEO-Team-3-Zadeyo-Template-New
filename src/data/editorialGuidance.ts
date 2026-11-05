import type { SiteLocale } from '../i18n/locales';

/** Public information reference, separate from the authorized affiliate checkout helpers. */
export const MAIN_PRODUCT_REFERENCE = 'https://zadeyo.com/products/the-isle-novaxware-cheats';
/** Actual UTC revision date of the website-owned guidance; never stamped at build time. */
export const EDITORIAL_GUIDANCE_UPDATED = '2026-11-05';
export function guideModifiedDate(slug: string, published: string): string {
  return slug in editorialGuidance.en.guides ? EDITORIAL_GUIDANCE_UPDATED : published;
}

export const archiveGuides: Record<string, string> = {
  'the-isle-cheats-evrima-support': 'evrima-compatibility',
  'the-isle-esp-what-it-shows': 'esp-and-radar',
  'isle-cheat-cloud-dma-setup-order': 'windows-and-cloud-dma',
  'isle-cheat-monthly-vs-lifetime': 'monthly-and-lifetime',
  'isle-stash-fruit-water-esp': 'resource-esp-markers',
  'isle-cheat-after-evrima-patch': 'evrima-compatibility',
  'buy-the-isle-cheats-safe': 'monthly-and-lifetime',
  'isle-aimbot-worth-it': 'bite-assist-controls',
  'isle-cheat-panic-key-streaming': 'bite-assist-controls',
  'valorant-hwid-ban-explained': 'hardware-flags-and-account-appeals',
  'hwid-spoofer-supported-games': 'hardware-flags-and-account-appeals',
  'hwid-spoofer-step-order-cleaner': 'hardware-flags-and-account-appeals',
  'skin-changer-visible-to-others': 'local-appearance-and-skin-changer',
  'ugc-account-recovery-tool-explained': 'hardware-flags-and-account-appeals',
  'skin-changer-vs-buying-skins': 'local-appearance-and-skin-changer',
};

type Guidance = {
  guideHeading: string; referenceLabel: string; archiveHeading: string; guideLabel: string;
  originalAuthorUnknown: string; overviewIntro: string; overviewAnchor: string; overviewEnding: string;
  guides: Record<string, string>;
};

/** Website-owned guidance; supplied archive text and approved article bodies are untouched. */
export const editorialGuidance: Record<SiteLocale, Guidance> = {
  en: {
    guideHeading: 'Before choosing your product', referenceLabel: 'Check the current Zadeyo listing',
    archiveHeading: 'Current reading for this topic', guideLabel: 'Read the related guide',
    originalAuthorUnknown: 'The original post was supplied without an author name. “Original poster” is an archive label.',
    overviewIntro: 'For a starting point across our products and guides, visit the', overviewAnchor: 'The Isle Cheats overview', overviewEnding: '.',
    guides: {
      'esp-and-radar': 'Use the feature overview to compare what the two displays show. Check the current listing before treating a screenshot or an archived report as a promise about a particular build.',
      'evrima-compatibility': 'Check the supported game branch before comparing features or access plans. Zadeyo maintains the current product listing and build-specific requirements; an older discussion does not establish present compatibility.',
      'windows-and-cloud-dma': 'Review the current Windows, security and Cloud DMA requirements on Zadeyo before purchasing. Equipment options and edition-specific details belong to that listing; confirm any separate costs there.',
      'bite-assist-controls': 'Compare the listed controls with the current edition before choosing a plan. A targeting preference or player report does not establish a supported setting, result or detection status for every build.',
      'resource-esp-markers': 'Compare the resource markers you need with the current feature list. Distinguish markers shown in the game view from information shown on radar when reviewing the screenshots.',
      'local-appearance-and-skin-changer': 'Choose the product by its stated purpose. The main toolkit’s appearance options and the separately licensed Skin Changer are different offerings; confirm the exact title and cosmetic support before checkout.',
      'hardware-flags-and-account-appeals': 'Choose between identifier changes and appeal workflows according to the restriction you are investigating. Compare the dedicated product pages; a historical report about another game is not a current compatibility list.',
      'monthly-and-lifetime': 'Compare the access period and included edition before deciding by price. The plan selected on this site is passed to affiliate checkout; review the order details and current terms on Zadeyo before payment.',
    },
  },
  es: {
    guideHeading: 'Antes de elegir tu producto', referenceLabel: 'Consultar la ficha actual de Zadeyo',
    archiveHeading: 'Guía actual sobre este tema', guideLabel: 'Leer la guía relacionada',
    originalAuthorUnknown: 'La publicación original se facilitó sin nombre de autor. «Autor original» es una etiqueta del archivo.',
    overviewIntro: 'Para empezar a explorar nuestros productos y guías, visita la', overviewAnchor: 'presentación de los trucos para The Isle', overviewEnding: '.',
    guides: {
      'esp-and-radar': 'Consulta el resumen de funciones para comparar la información de ambas vistas. Revisa la ficha actual antes de interpretar una captura o un relato archivado como una promesa para una versión concreta.',
      'evrima-compatibility': 'Comprueba la rama compatible antes de comparar funciones o planes. Zadeyo mantiene la ficha actual y los requisitos de cada versión; una conversación antigua no confirma la compatibilidad presente.',
      'windows-and-cloud-dma': 'Revisa los requisitos actuales de Windows, seguridad y Cloud DMA en Zadeyo antes de comprar. Consulta allí las opciones de equipo, los detalles de cada edición y cualquier coste adicional.',
      'bite-assist-controls': 'Compara los controles indicados con la edición actual antes de elegir un plan. Una preferencia o experiencia personal no confirma ajustes, resultados ni estado de detección para todas las versiones.',
      'resource-esp-markers': 'Compara los marcadores que necesitas con la lista actual de funciones. Al revisar las capturas, distingue la información mostrada en la escena de la que aparece en el radar.',
      'local-appearance-and-skin-changer': 'Elige según la finalidad del producto. Las opciones de apariencia del kit principal y Skin Changer, con licencia independiente, son ofertas distintas; confirma el juego y los cosméticos compatibles antes de pagar.',
      'hardware-flags-and-account-appeals': 'Compara los cambios de identificadores y los flujos de apelación según la restricción que investigas. Consulta las páginas específicas; una experiencia antigua con otro juego no constituye una lista de compatibilidad actual.',
      'monthly-and-lifetime': 'Compara el periodo de acceso y la edición incluida antes de decidir por el precio. El plan elegido se transmite al checkout de afiliado; revisa el pedido y las condiciones actuales en Zadeyo antes de pagar.',
    },
  },
  de: {
    guideHeading: 'Vor der Produktauswahl', referenceLabel: 'Aktuelle Produktseite bei Zadeyo prüfen',
    archiveHeading: 'Aktueller Ratgeber zu diesem Thema', guideLabel: 'Passenden Ratgeber lesen',
    originalAuthorUnknown: 'Der ursprüngliche Beitrag wurde ohne Autorennamen übermittelt. „Ursprünglicher Verfasser“ ist eine Archivkennzeichnung.',
    overviewIntro: 'Einen Einstieg in unsere Produkte und Ratgeber bietet die', overviewAnchor: 'Übersicht zu Cheats für The Isle', overviewEnding: '.',
    guides: {
      'esp-and-radar': 'Vergleiche in der Funktionsübersicht, welche Informationen die beiden Ansichten zeigen. Prüfe die aktuelle Produktseite, bevor du einen Screenshot oder Archivbericht als Zusage für einen bestimmten Build verstehst.',
      'evrima-compatibility': 'Prüfe zuerst den unterstützten Spielzweig. Die aktuelle Produktseite und buildabhängige Voraussetzungen stehen bei Zadeyo; eine ältere Diskussion belegt keine heutige Kompatibilität.',
      'windows-and-cloud-dma': 'Prüfe vor dem Kauf die aktuellen Windows-, Sicherheits- und Cloud-DMA-Voraussetzungen bei Zadeyo. Dort findest du Angaben zu Ausrüstung und Editionen und kannst mögliche Zusatzkosten klären.',
      'bite-assist-controls': 'Vergleiche die aufgeführten Einstellungen mit der aktuellen Edition, bevor du einen Tarif wählst. Eine Vorliebe oder Spielerfahrung belegt weder unterstützte Einstellungen noch Ergebnisse oder Erkennungsstatus für jeden Build.',
      'resource-esp-markers': 'Vergleiche die benötigten Ressourcenmarker mit der aktuellen Funktionsliste. Unterscheide bei Screenshots zwischen Markern in der Spielansicht und Informationen auf dem Radar.',
      'local-appearance-and-skin-changer': 'Wähle nach dem angegebenen Zweck. Die Darstellungsoptionen des Hauptpakets und der separat lizenzierte Skin Changer sind unterschiedliche Angebote. Kläre das konkrete Spiel und unterstützte Kosmetik vor dem Kauf.',
      'hardware-flags-and-account-appeals': 'Vergleiche Kennungsänderungen und Einspruchsabläufe anhand der untersuchten Einschränkung. Lies die jeweiligen Produktseiten; ein älterer Bericht zu einem anderen Spiel ist keine aktuelle Kompatibilitätsliste.',
      'monthly-and-lifetime': 'Vergleiche Zugangsdauer und enthaltene Edition, bevor du nach dem Preis entscheidest. Der gewählte Tarif wird an den Affiliate-Checkout übergeben. Prüfe Bestellung und aktuelle Bedingungen bei Zadeyo vor der Zahlung.',
    },
  },
  fr: {
    guideHeading: 'Avant de choisir votre produit', referenceLabel: 'Consulter la fiche actuelle sur Zadeyo',
    archiveHeading: 'Guide actuel sur ce sujet', guideLabel: 'Lire le guide associé',
    originalAuthorUnknown: 'La publication originale a été fournie sans nom d’auteur. « Auteur initial » est une indication d’archive.',
    overviewIntro: 'Pour découvrir nos produits et guides, consultez la', overviewAnchor: 'présentation des cheats The Isle', overviewEnding: '.',
    guides: {
      'esp-and-radar': 'Comparez les informations des deux affichages dans la présentation des fonctions. Consultez la fiche actuelle avant de considérer une capture ou un témoignage archivé comme une promesse pour une version précise.',
      'evrima-compatibility': 'Vérifiez la branche compatible avant de comparer les fonctions ou les formules. Zadeyo tient à jour la fiche et les prérequis propres aux versions ; une ancienne discussion ne confirme pas la compatibilité actuelle.',
      'windows-and-cloud-dma': 'Consultez les prérequis actuels de Windows, de sécurité et de Cloud DMA sur Zadeyo avant l’achat. Vérifiez sur cette fiche les équipements, les détails de chaque édition et les éventuels coûts supplémentaires.',
      'bite-assist-controls': 'Comparez les réglages présentés avec l’édition actuelle avant de choisir une formule. Une préférence ou un témoignage ne confirme ni réglage pris en charge, ni résultat, ni état de détection pour chaque version.',
      'resource-esp-markers': 'Comparez les marqueurs nécessaires avec la liste actuelle des fonctions. Lors de la lecture des captures, distinguez les informations de la scène de celles affichées sur le radar.',
      'local-appearance-and-skin-changer': 'Choisissez selon la fonction annoncée. Les options d’apparence du kit principal et le Skin Changer sous licence séparée sont deux offres distinctes. Confirmez le jeu et les cosmétiques pris en charge avant l’achat.',
      'hardware-flags-and-account-appeals': 'Comparez les changements d’identifiants et les processus de recours selon la restriction concernée. Consultez les pages dédiées ; un ancien témoignage sur un autre jeu ne constitue pas une liste de compatibilité actuelle.',
      'monthly-and-lifetime': 'Comparez la durée d’accès et l’édition incluse avant de choisir selon le prix. La formule sélectionnée est transmise au checkout affilié ; vérifiez la commande et les conditions actuelles sur Zadeyo avant le paiement.',
    },
  },
};
