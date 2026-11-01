import { BRAND_LOGO_ALT } from './brand';
import type { SiteLocale } from '../i18n/locales';

/** The shared logo depicts the same artwork on every route; route keywords do not describe it. */
export function resolveBrandLogoAlt(_pathname: string, _locale: SiteLocale = 'en'): string {
  return BRAND_LOGO_ALT;
}
