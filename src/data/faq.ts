import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, ROUTES } from '../utils/path';
import type { SiteLocale } from '../i18n/locales';
import { getSiteFaqs as getSiteFaqsForLocale } from './faq/locale';
import { isUtilityEnabled } from '../config/catalog';
import { applySiteTokens } from '../i18n/brandTokens';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'aim'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
  /** Utility slugs the answer talks about; the item is hidden when any of them is not sold. */
  requires?: string[];
}

export const siteFaqs: SiteFaqItem[] = [
  {
    "id": "status",
    "topic": "setup",
    "icon": "faqStatus",
    "q": "How should I confirm current compatibility?",
    "a": "Check the current product details and ask about your exact EVRIMA build before paying or launching. This site does not provide an independently verified live detection status."
  },
  {
    "id": "after-buy",
    "topic": "setup",
    "icon": "faqAfterBuy",
    "q": "What should I keep after checkout?",
    "a": "Keep the order reference and use the setup instructions supplied with your purchase. Confirm delivery details before payment if your decision depends on timing."
  },
  {
    "id": "ban-risk",
    "topic": "safety",
    "icon": "faqBanRisk",
    "q": "Can third-party tools lead to a ban?",
    "a": "Yes. Using third-party tools can violate game or server rules and lead to account penalties. No feature or preset guarantees protection."
  },
  {
    "id": "platforms",
    "topic": "setup",
    "icon": "faqPlatforms",
    "q": "Does the toolkit support Legacy?",
    "a": "The current listing is EVRIMA only on Steam, with 64-bit Windows 10/11. HVCI, Core Isolation, TPM and Secure Boot must be on. Cloud DMA is required for full functionality."
  },
  {
    "id": "license-move",
    "topic": "setup",
    "icon": "faqLicenseMove",
    "q": "Can I move a license to another PC?",
    "a": "Confirm device limits, transfer eligibility and any reset conditions before checkout. We do not promise unlimited transfers."
  },
  {
    "id": "products-page",
    "topic": "products",
    "icon": "faqProductsPage",
    "q": "Where can I compare the four products?",
    "a": "Explore the products page for The Isle Cheats, HWID Spoofer, UGC and Skin Changer. Each has a separate scope and checkout."
  },
  {
    "id": "ugc-what",
    "topic": "products",
    "icon": "accountRecovery",
    "q": "What does our UGC service organize?",
    "a": "UGC combines appeal templates with repeatable automated dispute steps for restricted gaming, social and marketplace profiles.",
    "scopes": [
      "ugc"
    ],
    "requires": [
      "ugc"
    ]
  },
  {
    "id": "ugc-guarantee",
    "topic": "safety",
    "icon": "faqBanRisk",
    "q": "Does UGC guarantee account recovery?",
    "a": "No outcome is guaranteed. Platform reviewers decide the case; permanent suspensions remain in place.",
    "scopes": [
      "ugc"
    ],
    "requires": [
      "ugc"
    ]
  },
  {
    "id": "ugc-vs-hwid",
    "topic": "products",
    "icon": "faqHwidWhen",
    "q": "How do UGC and HWID Spoofer differ?",
    "a": "UGC works on appeal workflows. HWID Spoofer changes hardware fingerprints. Neither scope establishes what caused your restriction.",
    "scopes": [
      "ugc",
      "hwid-spoofer"
    ],
    "requires": [
      "ugc",
      "hwid-spoofer"
    ]
  },
  {
    "id": "skin-visible",
    "topic": "products",
    "icon": "cosmetic",
    "q": "Do local cosmetics become inventory items?",
    "a": "No. Our Skin Changer draws supported cosmetics locally. They cannot be traded and disappear when the client exits.",
    "scopes": [
      "skin-changer"
    ],
    "requires": [
      "skin-changer"
    ]
  },
  {
    "id": "skin-games",
    "topic": "products",
    "icon": "faqPlatforms",
    "q": "Does the separate Skin Changer support The Isle?",
    "a": "That compatibility is not established by the supplied utility facts. Confirm the exact title and cosmetic. The main toolkit separately lists local dinosaur skin and pattern previews.",
    "scopes": [
      "skin-changer"
    ],
    "requires": [
      "skin-changer"
    ]
  },
  {
    "id": "utility-requirements",
    "topic": "setup",
    "icon": "faqPlatforms",
    "q": "Which setup do the utilities require?",
    "a": "64-bit Windows 10/11, HVCI and Core Isolation on, TPM and Secure Boot on. HWID also needs administrator rights and internet; UGC needs internet; Skin Changer needs internet and loader access.",
    "scopes": [
      "hwid-spoofer",
      "ugc",
      "skin-changer"
    ]
  },
  {
    "id": "what-is-esp",
    "topic": "esp",
    "icon": "faqWhatIsEsp",
    "q": "Which information does dinosaur ESP display?",
    "a": "Our ESP lists species, health, distance, weight, growth and skeletons, with dinosaur locations through terrain and foliage.",
    "scopes": [
      "elite"
    ]
  },
  {
    "id": "esp-vs-aim",
    "topic": "esp",
    "icon": "faqEspVsScripts",
    "q": "How does ESP differ from Bite Assist?",
    "a": "ESP displays information. Bite Assist offers smoothness, range, bone priority, movement prediction and species-specific profiles."
  },
  {
    "id": "elite-slots",
    "topic": "plans",
    "icon": "faqEliteSlots",
    "q": "What are the main access plans?",
    "a": "The Isle Cheats is $35 for 31 days or $150 lifetime with unlimited access wording. Confirm lifetime conditions and edition-specific utilities before payment.",
    "scopes": [
      "elite"
    ]
  },
  {
    "id": "stream-proof",
    "topic": "esp",
    "icon": "faqStreamProof",
    "q": "Can the overlay be hidden from recordings?",
    "a": "The toolkit lists overlay hiding options for OBS and Xbox Game Bar. Check the actual capture output; this is not a detection guarantee."
  },
  {
    "id": "build-status",
    "topic": "safety",
    "icon": "faqUndetected",
    "q": "Are updates and detection status guaranteed?",
    "a": "No. Functionality and detection status have not been independently verified. A game or anti-cheat update can change compatibility."
  },
  {
    "id": "esp-safer",
    "topic": "safety",
    "icon": "faqEspSafer",
    "q": "Is one feature guaranteed safer than another?",
    "a": "We do not establish a lower detection risk for ESP, radar or Bite Assist. Any third-party tool can lead to penalties."
  },
  {
    "id": "hwid-when",
    "topic": "products",
    "icon": "faqHwidWhen",
    "q": "What does our HWID Spoofer change?",
    "a": "Disk serials, MAC addresses, GPU IDs and related fingerprints, with a trace cleaner. It does not remove sanctions attached to an account.",
    "scopes": [
      "hwid-spoofer"
    ],
    "requires": [
      "hwid-spoofer"
    ]
  },
  {
    "id": "external-loader",
    "topic": "products",
    "icon": "faqExternalLoader",
    "q": "Is specific Cloud DMA hardware included?",
    "a": "The listing does not identify included hardware or a complete configuration. Confirm the required equipment and additional purchases before buying software."
  },
  {
    "id": "blog-vs-cheats",
    "topic": "blog",
    "icon": "faqBlogVsCheats",
    "q": "Do these guides establish live product status?",
    "a": "Guides explain scope and buying considerations. They do not establish current functionality or replace a fresh compatibility check."
  },
  {
    "id": "blog-setup",
    "topic": "blog",
    "icon": "faqBlogSetup",
    "q": "Where do I review features and requirements?",
    "a": "Open the main cheats page for EVRIMA features, full requirements and plan selection, or choose the dedicated utility page."
  },
  {
    "id": "who-cheats",
    "topic": "plans",
    "icon": "faqWhoElite",
    "q": "Who should consider the main toolkit?",
    "a": "Buyers whose EVRIMA and Windows setup meets every listed requirement and who understand the scope, edition limits and risk of third-party tools.",
    "scopes": [
      "elite"
    ]
  },
  {
    "id": "vac-update",
    "topic": "safety",
    "icon": "faqVacUpdate",
    "q": "What should I check after a patch?",
    "a": "Record the new game build and confirm current compatibility before launching. An old preset or screenshot does not prove current support."
  },
  {
    "id": "discord-help",
    "topic": "setup",
    "icon": "headphones",
    "q": "What belongs in a setup question?",
    "a": "Product and edition, Windows version, game build and exact error. Include the order reference when relevant and omit passwords or payment card details."
  },
  {
    "id": "pmc-scav-raids",
    "topic": "plans",
    "icon": "faqTurboRanked",
    "q": "Do server presets grant permission?",
    "a": "No. Official or Community preset names describe configurations, not server approval. The current product listing supports EVRIMA only."
  },
  {
    "id": "zoom-hack",
    "topic": "esp",
    "icon": "faqZoomHack",
    "q": "What resources are listed in ESP?",
    "a": "Food, water, herbs, fruits and nests with distance markers. Radar separately lists nearby dinosaurs, nests and carcasses.",
    "scopes": [
      "elite"
    ]
  },
  {
    "id": "trigger-bot",
    "topic": "aim",
    "icon": "faqAutoFarm",
    "q": "Are Auto Finish and Auto Stamina included in every plan?",
    "a": "These utilities and carcass assistance depend on edition. Confirm the exact edition instead of assuming every feature belongs to every plan.",
    "scopes": [
      "elite"
    ]
  },
  {
    "id": "private-cheats",
    "topic": "safety",
    "icon": "faqPrivateCheats",
    "q": "Does private mean undetected?",
    "a": "No. We do not use private as proof of protection or limited availability. Detection status has not been independently verified."
  },
  {
    "id": "faq-more",
    "topic": "all",
    "icon": "faqMore",
    "q": "Where can I find the complete FAQ?",
    "a": "Browse the FAQ page by topic for purchase, feature, utility and setup answers."
  }
];

/** Shared FAQ block copy + filters (home, /faq/, products, blog). */
export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Faq: Browse by category',
  subtitle: 'Plans, ESP, aim, products, setup, and the longer answers.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'aim',
  'safety',
  'products',
  'blog',
  'setup',
];

/** Section copy when FAQ list is scoped to the current page (not /faq/). */
export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers for this page. The FAQ page holds the rest.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export { getProductFaqs, getSiteFaqs, getLandingFaqs, getAllFaqs } from './faq/locale';





const BLOG_FAQ_IDS: Record<string, string[]> = {
 'esp-and-radar': ['what-is-esp','esp-vs-aim','ban-risk'],
 'evrima-compatibility': ['platforms','pmc-scav-raids','build-status'],
 'windows-and-cloud-dma': ['platforms','external-loader','discord-help'],
 'bite-assist-controls': ['esp-vs-aim','trigger-bot','esp-safer'],
 'resource-esp-markers': ['zoom-hack','what-is-esp'],
 'local-appearance-and-skin-changer': ['skin-visible','skin-games'],
 'hardware-flags-and-account-appeals': ['hwid-when','ugc-vs-hwid','ugc-guarantee'],
 'monthly-and-lifetime': ['elite-slots','license-move','after-buy']
};

const DEFAULT_BLOG_FAQ_IDS = ['blog-vs-cheats', 'blog-setup', 'status', 'after-buy', 'platforms'];

function pickFaqItems(ids: string[], locale: SiteLocale): SiteFaqItem[] {
  const localized = getSiteFaqsForLocale(locale);
  const seen = new Set<string>();
  return ids
    .map((id) => localized.find((item) => item.id === id))
    .filter((item): item is SiteFaqItem => Boolean(item))
    .filter((item) => (item.requires ?? []).every(isUtilityEnabled))
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .slice(0, 5)
    .map((item) => ({ ...item, q: applySiteTokens(item.q), a: applySiteTokens(item.a) }));
}

export function getBlogFaqs(_tag: string, slug: string, locale: SiteLocale = 'en'): SiteFaqItem[] {
  return pickFaqItems(BLOG_FAQ_IDS[slug] ?? DEFAULT_BLOG_FAQ_IDS, locale);
}

