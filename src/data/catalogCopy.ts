import type { SiteLocale } from '../i18n/locales';
import { deepApplySiteTokens } from '../i18n/brandTokens';
import es from './catalogCopy/locales/es.json';
import de from './catalogCopy/locales/de.json';
import fr from './catalogCopy/locales/fr.json';

/** UI copy for the /products/ catalog page and the header products menu. */
export interface CatalogCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  trust: string[];
  featuredEyebrow: string;
  from: string;
  priceLabel: string;
  lifetime: string;
  perMonth: string;
  utilitiesEyebrow: string;
  utilitiesTitle: string;
  utilitiesDesc: string;
  chooserEyebrow: string;
  chooserTitle: string;
  chooserDesc: string;
  scenarios: { slug: string; need: string; answer: string }[];
  compareEyebrow: string;
  compareTitle: string;
  compareDesc: string;
  compareRows: { label: string; values: Record<string, string> }[];
  ctaTitle: string;
  ctaDesc: string;
  ctaSupport: string;
  menuHeading: string;
  menuViewAll: string;
  menuTaglines: Record<string, string>;
}

const en: CatalogCopy = {
  "eyebrow": "Store",
  "title": "Compare The Isle cheats and utilities",
  "subtitle": "Compare our EVRIMA toolkit with three separately licensed utilities. Match the feature scope and requirements to your goal before checkout.",
  "trust": [
    "EVRIMA only",
    "Windows 10 / 11",
    "Monthly or lifetime",
    "Check requirements"
  ],
  "featuredEyebrow": "Main product",
  "from": "From",
  "priceLabel": "Price",
  "lifetime": "Lifetime",
  "perMonth": "/ month",
  "utilitiesEyebrow": "Utilities",
  "utilitiesTitle": "Purpose-built utilities",
  "utilitiesDesc": "Hardware identifiers, account appeals and local cosmetics are different jobs. Each utility has its own capabilities, requirements and license.",
  "chooserEyebrow": "Not sure?",
  "chooserTitle": "Match the product to your goal",
  "chooserDesc": "Compare our EVRIMA toolkit with three separately licensed utilities. Match the feature scope and requirements to your goal before checkout.",
  "scenarios": [
    {
      "slug": "elite",
      "need": "Dinosaur ESP, radar, resource markers and adjustable Bite Assist for EVRIMA. Review the complete setup requirements before choosing your plan.",
      "answer": "The Isle Cheats"
    },
    {
      "slug": "hwid-spoofer",
      "need": "Our HWID Spoofer rewrites disk serials, MAC addresses, GPU IDs and related fingerprints, with trace cleanup included. An account sanction remains separate.",
      "answer": "HWID Spoofer"
    },
    {
      "slug": "ugc",
      "need": "Our UGC service combines appeal templates with automated dispute steps for restricted gaming, social and marketplace profiles. You organize the case; the platform decides the outcome.",
      "answer": "UGC"
    },
    {
      "slug": "skin-changer",
      "need": "Explore our library of weapon finishes, outfits and knife variants in supported titles. The lightweight client draws cosmetics locally without purchasing each item separately.",
      "answer": "Skin Changer"
    }
  ],
  "compareEyebrow": "Compare",
  "compareTitle": "Compare purpose, requirements and access",
  "compareDesc": "Hardware identifiers, account appeals and local cosmetics are different jobs. Each utility has its own capabilities, requirements and license.",
  "compareRows": [
    {
      "label": "Explore our features",
      "values": {
        "elite": "Dinosaur ESP, 2D radar, Bite Assist",
        "hwid-spoofer": "Refresh the identifiers tied to your PC.",
        "ugc": "Give your appeal a repeatable structure.",
        "skin-changer": "Make the preview your own."
      }
    },
    {
      "label": "Check requirements",
      "values": {
        "elite": "Cloud DMA required for full functionality. Confirm the exact setup before purchase.",
        "hwid-spoofer": "Windows 10/11 · 64-bit · Admin · HVCI · TPM · Secure Boot",
        "ugc": "Windows 10/11 · 64-bit · HVCI · TPM · Secure Boot",
        "skin-changer": "Windows 10/11 · 64-bit · HVCI · TPM · Secure Boot"
      }
    },
    {
      "label": "Edition matters",
      "values": {
        "elite": "Check your EVRIMA build and complete hardware setup before checkout. Auto Finish, Auto Stamina and carcass assistance depend on edition; confirm which are included.",
        "hwid-spoofer": "Hardware changes do not remove account sanctions. Listed coverage includes Vanguard, Easy Anti-Cheat, BattlEye, Ricochet, ACE and Javelin; compatibility may change. Spoofing can conflict with publisher terms and lead to penalties.",
        "ugc": "Recovery is not guaranteed. Permanent suspensions remain in place. Platform reviewers decide each case, and weak evidence limits an appeal.",
        "skin-changer": "Cosmetics are not owned inventory and cannot be traded. They disappear when the client exits. Game or Windows updates can affect coverage; using a cosmetic client can conflict with game terms and lead to penalties."
      }
    }
  ],
  "ctaTitle": "The Isle product support",
  "ctaDesc": "Resolve a setup dependency before you pay, or prepare a precise order or loader question.",
  "ctaSupport": "Contact support",
  "menuHeading": "Products",
  "menuViewAll": "Compare all products",
  "menuTaglines": {
    "elite": "Dinosaur ESP · 2D radar · Bite Assist",
    "hwid-spoofer": "Refresh the identifiers tied to your PC.",
    "ugc": "Give your appeal a repeatable structure.",
    "skin-changer": "Make the preview your own."
  }
};

const byLocale: Record<SiteLocale, CatalogCopy> = {
  en,
  es: es as CatalogCopy,
  de: de as CatalogCopy,
  fr: fr as CatalogCopy,
};

const finalized = Object.fromEntries(
  Object.entries(byLocale).map(([locale, copy]) => [locale, deepApplySiteTokens(copy)]),
) as Record<SiteLocale, CatalogCopy>;

export function getCatalogCopy(locale: SiteLocale): CatalogCopy {
  return finalized[locale];
}
