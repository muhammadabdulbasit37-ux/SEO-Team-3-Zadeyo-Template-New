import type { SiteLocale } from '../i18n/locales';

/** Website-owned reading paths, separate from the supplied posts/replies and approved article text. */
export const discussionResources = [
  { productSlug: 'elite', productPath: '/cheats/', guideSlug: 'bite-assist-controls', forumSlug: 'isle-aimbot-worth-it', topic: 'biteAssist' },
  { productSlug: 'ugc', productPath: '/ugc/', guideSlug: 'hardware-flags-and-account-appeals', forumSlug: 'ugc-account-recovery-tool-explained', topic: 'ugc' },
] as const;
export type DiscussionResource = (typeof discussionResources)[number];

type NoteCopy = { intro: string; anchor: string; notice: string; productIntro: string; productAnchor: string };
export const discussionResourceCopy: Record<SiteLocale, Record<DiscussionResource['topic'], NoteCopy>> = {
  en: {
    biteAssist: { intro: 'For historical player questions about targeting assistance, read the', anchor: 'archived Bite Assist discussion', notice: 'Archived reports do not establish current controls or results.', productIntro: 'For the listed capabilities, review our', productAnchor: 'current The Isle Cheats features' },
    ugc: { intro: 'For historical questions about the purpose of the appeal client, read the', anchor: 'archived UGC discussion', notice: 'Archived experiences do not establish current support or guarantee recovery.', productIntro: 'For the current scope and limitations, review our', productAnchor: 'UGC appeal workflows' },
  },
  es: {
    biteAssist: { intro: 'Para consultar preguntas históricas de jugadores sobre la asistencia al apuntar, lee la', anchor: 'conversación archivada sobre Bite Assist', notice: 'Los relatos archivados no confirman los controles ni los resultados actuales.', productIntro: 'Para consultar las funciones indicadas, revisa las', productAnchor: 'funciones actuales de The Isle Cheats' },
    ugc: { intro: 'Para consultar preguntas históricas sobre la finalidad del cliente de apelaciones, lee la', anchor: 'conversación archivada sobre UGC', notice: 'Las experiencias archivadas no confirman la compatibilidad actual ni garantizan la recuperación.', productIntro: 'Para conocer el alcance y las limitaciones actuales, revisa nuestros', productAnchor: 'flujos de apelación de UGC' },
  },
  de: {
    biteAssist: { intro: 'Historische Spielerfragen zur Zielhilfe findest du in der', anchor: 'archivierten Diskussion zu Bite Assist', notice: 'Archivierte Berichte belegen weder aktuelle Einstellungen noch Ergebnisse.', productIntro: 'Die aufgeführten Funktionen findest du in unserer', productAnchor: 'aktuellen Funktionsübersicht zu The Isle Cheats' },
    ugc: { intro: 'Historische Fragen zum Zweck des Einspruchsclients findest du in der', anchor: 'archivierten Diskussion zu UGC', notice: 'Archivierte Erfahrungen belegen weder die aktuelle Unterstützung noch eine garantierte Wiederherstellung.', productIntro: 'Den aktuellen Umfang und die Grenzen erklären unsere', productAnchor: 'UGC-Einspruchsabläufe' },
  },
  fr: {
    biteAssist: { intro: "Pour consulter les anciennes questions de joueurs sur l’aide à la visée, lisez la", anchor: 'discussion archivée sur Bite Assist', notice: 'Les témoignages archivés ne confirment ni les réglages ni les résultats actuels.', productIntro: 'Pour connaître les fonctions présentées, consultez nos', productAnchor: 'fonctions actuelles de The Isle Cheats' },
    ugc: { intro: 'Pour consulter les anciennes questions sur le rôle du client de recours, lisez la', anchor: 'discussion archivée sur UGC', notice: 'Les expériences archivées ne confirment pas la compatibilité actuelle et ne garantissent aucune récupération.', productIntro: 'Pour connaître la portée et les limites actuelles, consultez nos', productAnchor: 'processus de recours UGC' },
  },
};
