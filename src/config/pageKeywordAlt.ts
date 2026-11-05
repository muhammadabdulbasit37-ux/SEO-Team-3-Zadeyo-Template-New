import { getTranslations } from '../i18n';
import type { SiteLocale } from '../i18n/locales';

/** The shared logo depicts the same artwork on every route; route keywords do not describe it. */
export function resolveBrandLogoAlt(_pathname: string, locale: SiteLocale = 'en'): string {
  return getTranslations(locale).ui.brandLogoAlt;
}
