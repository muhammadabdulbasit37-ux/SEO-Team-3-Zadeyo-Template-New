import {
  ALL_UTILITY_PRODUCT_SLUGS,
  CHEAT_PRODUCT_SLUGS,
  CHEATS_PRIMARY_SLUG,
  HWID_SPOOFER_SLUG,
  SKIN_CHANGER_SLUG,
  UGC_SLUG,
  UTILITY_PRODUCT_PATHS,
  UTILITY_PRODUCT_SLUGS,
  type UtilityProductSlug,
} from '../config/catalog';
import { PRODUCT_BASE } from '../config/site';
import { CHEAT_PRODUCT_NAME } from '../config/game';
import { getTranslations } from '../i18n';
import { deepApplySiteTokens } from '../i18n/brandTokens';
import type { SiteLocale } from '../i18n/locales';
import type { Translations } from '../i18n/types';
import { checkoutForSlug } from '../config/checkout';
import { SHOWCASE_GALLERY_KEYS } from '../config/gameplayMedia';
import { HWID_GALLERY_KEYS } from '../config/hwidMedia';
import type { IconName } from '../components/icons/types';
import { getProductCopyBundle, registerProductCopyBundle, type ProductCopyBundle } from './products/exportCopy';
import esProductCopy from './products/locales/es.json';
import deProductCopy from './products/locales/de.json';
import frProductCopy from './products/locales/fr.json';

export interface ProductSlide {
  /** Still image, or the poster frame when `videoSrc` is set. */
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
  width?: number;
  height?: number;
  /** `image` unless a clip is attached. */
  kind?: 'image' | 'video';
  /** MP4 or WebM. The slider shows this instead of the still; `src` stays the poster. */
  videoSrc?: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  "elite": [
    "esp-and-radar",
    "evrima-compatibility",
    "windows-and-cloud-dma",
    "bite-assist-controls",
    "resource-esp-markers"
  ],
  "hwid-spoofer": [
    "hardware-flags-and-account-appeals",
    "windows-and-cloud-dma"
  ],
  "ugc": [
    "hardware-flags-and-account-appeals",
    "monthly-and-lifetime"
  ],
  "skin-changer": [
    "local-appearance-and-skin-changer",
    "monthly-and-lifetime"
  ]
};

const productBase = PRODUCT_BASE;

const hwidAcquisitionSteps: AcquisitionStep[] = [
  {
    "num": "01",
    "title": "Review the hardware tools",
    "desc": "Work with disk, network and GPU identifiers from one hardware utility, then run the included trace cleaner in the order given by the setup guide."
  },
  {
    "num": "02",
    "title": "Choose the license term",
    "desc": "The license is $50 for 31 days or $150 lifetime. Both terms cover the same tooling. Confirm current game and anti-cheat coverage before purchase."
  },
  {
    "num": "03",
    "title": "Confirm Windows prerequisites",
    "desc": "Use 64-bit Windows 10/11 with administrator rights, internet, HVCI and Core Isolation on, plus TPM and Secure Boot on."
  },
  {
    "num": "04",
    "title": "Check coverage and limitations",
    "desc": "Hardware changes do not remove account sanctions. Listed coverage includes Vanguard, Easy Anti-Cheat, BattlEye, Ricochet, ACE and Javelin; compatibility may change. Spoofing can conflict with publisher terms and lead to penalties."
  }
];

const ugcAcquisitionSteps: AcquisitionStep[] = [
  {
    "num": "01",
    "title": "Review the appeal workflow",
    "desc": "Turn account evidence and a clear timeline into an appeal workflow. Repeatable dispute steps help you organize the process across supported platforms."
  },
  {
    "num": "02",
    "title": "Choose the license term",
    "desc": "Choose $35 for 31 days or $150 lifetime. Both plans provide the same capability set. UGC does not rewrite hardware IDs or bypass security controls."
  },
  {
    "num": "03",
    "title": "Gather account and system details",
    "desc": "Collect ownership evidence and the restriction notice. The client requires 64-bit Windows 10/11, internet, HVCI and Core Isolation on, plus TPM and Secure Boot on."
  },
  {
    "num": "04",
    "title": "Check appeal limitations",
    "desc": "Recovery is not guaranteed. Permanent suspensions remain in place. Platform reviewers decide each case, and weak evidence limits an appeal."
  }
];

const skinChangerAcquisitionSteps: AcquisitionStep[] = [
  {
    "num": "01",
    "title": "Review the available previews",
    "desc": "Choose supported weapon finishes, outfits and knife looks through one client. The preview stays on your screen and is not added to your account inventory."
  },
  {
    "num": "02",
    "title": "Choose the license term",
    "desc": "The license is $35 for 31 days or $150 lifetime. Both terms use the same library. Confirm the exact game and cosmetic before purchase; The Isle support for this separate utility is not established."
  },
  {
    "num": "03",
    "title": "Confirm client requirements",
    "desc": "Use 64-bit Windows 10/11, internet and loader access with HVCI and Core Isolation on, plus TPM and Secure Boot on."
  },
  {
    "num": "04",
    "title": "Check cosmetic ownership limits",
    "desc": "Cosmetics are not owned inventory and cannot be traded. They disappear when the client exits. Game or Windows updates can affect coverage; using a cosmetic client can conflict with game terms and lead to penalties."
  }
];

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    "num": "01",
    "title": "Check your setup",
    "desc": "Confirm EVRIMA, 64-bit Windows 10/11 and every listed security and Cloud DMA requirement."
  },
  {
    "num": "02",
    "title": "Choose your plan",
    "desc": "Review the edition and select monthly or lifetime access. Keep the order details."
  },
  {
    "num": "03",
    "title": "Use the current instructions",
    "desc": "Follow the supplied setup guidance and confirm current compatibility before launching."
  },
  {
    "num": "04",
    "title": "Keep a useful configuration",
    "desc": "Save your settings and presets. Recheck compatibility after a game update."
  }
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  "Check your EVRIMA build and complete hardware setup before checkout. Auto Finish, Auto Stamina and carcass assistance depend on edition; confirm which are included.";

const sharedLimitations =
  "Third-party tools can lead to account penalties. Functionality and detection status have not been independently verified. Game updates can change compatibility; presets do not grant server permission.";

const mainProductSystemRequirements: SystemRequirement[] = [
  {
    "icon": "reqSettings",
    "text": "The Isle on Steam: EVRIMA only. Legacy is not supported by the current listing."
  },
  {
    "icon": "reqWindows",
    "text": "Windows 10 or 11, 64-bit."
  },
  {
    "icon": "reqShieldGuide",
    "text": "HVCI and Core Isolation enabled."
  },
  {
    "icon": "reqShieldGuide",
    "text": "TPM and Secure Boot enabled."
  },
  {
    "icon": "reqSettings",
    "text": "Cloud DMA required for full functionality. Confirm the exact setup before purchase."
  }
];

const galleryRaw = {
  "gpMatchEsp": {
    "width": 1672,
    "height": 941,
    "src": "/images/gameplay/the-isle-dinosaur-esp-gameplay.webp",
    "alt": "The Isle forest scene with dinosaur labels, health readouts, red lines and an overlaid map.",
    "caption": "Dinosaur ESP in the forest",
    "captionDesc": "Dinosaur labels and health readouts appear across a forest scene, with red lines and a map overlay."
  },
  "gpAimbotMenu": {
    "width": 1448,
    "height": 1086,
    "src": "/images/gameplay/the-isle-combat-assist-menu.webp",
    "alt": "The Isle Combat menu with aim-assist toggle, Head target bone, smoothing sliders and maximum distance.",
    "caption": "Combat settings",
    "captionDesc": "The Combat view shows attack keys, target preferences, visibility, prediction and smoothing controls."
  },
  "gpEspMenu": {
    "width": 1448,
    "height": 1086,
    "src": "/images/gameplay/the-isle-player-esp-menu.webp",
    "alt": "The Isle Players ESP menu with box, distance, name, health-bar and bone controls.",
    "caption": "Player ESP controls",
    "captionDesc": "The ESP Players view shows box styles, names, distance, health bars and bone thickness settings."
  }
} satisfies Record<string, {src: string; alt: string; caption: string; captionDesc: string; width: number; height: number; videoSrc?: string}>;

type GalleryKey = keyof typeof galleryRaw;

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((key) => {
    const item: ProductSlide = galleryRaw[key];
    if (!item) throw new Error(`Missing gallery key: ${String(key)}`);
    const { src, alt, caption, captionDesc, width, height, videoSrc } = item;
    return {
      src,
      alt,
      caption,
      captionDesc,
      width,
      height,
      ...(videoSrc ? { videoSrc, kind: 'video' as const } : {}),
    };
  });
}

const showcaseSlides = slide(...SHOWCASE_GALLERY_KEYS);

const hwidGalleryRaw = {
  hwidSerialCheck: {
    src: '/images/hwid-spoofer/hwid-spoofer-serial-check-panel.webp',
    width: 1024,
    height: 576,
    alt: 'Device window listing DISK, MOBO, Display, UUID, GPU, and Network as changed or unchanged.',
    caption: 'Serial check rows',
    captionDesc: 'After a spoof cycle, each row says whether that hardware value changed.',
  },
  hwidUefiSpoof: {
    src: '/images/hwid-spoofer/hwid-spoofer-uefi-spoof-panel.webp',
    width: 1024,
    height: 576,
    alt: 'Device window with Permanent Spoof, GPU spoof on, ethernet spoof off, and a seed field.',
    caption: 'Firmware controls',
    captionDesc: 'From this firmware screen you can switch GPU or ethernet spoofing, type a seed, and apply a permanent change.',
  },
} satisfies Record<
  string,
  { src: string; alt: string; caption: string; captionDesc: string; width: number; height: number; videoSrc?: string }
>;

type HwidGalleryKey = keyof typeof hwidGalleryRaw;

function hwidSlide(...keys: HwidGalleryKey[]): ProductSlide[] {
  return keys.map((key) => {
    const item: ProductSlide = hwidGalleryRaw[key];
    const { src, alt, caption, captionDesc, width, height, videoSrc } = item;
    return {
      src,
      alt,
      caption,
      captionDesc,
      width,
      height,
      ...(videoSrc ? { videoSrc, kind: 'video' as const } : {}),
    };
  });
}

const hwidShowcaseSlides = hwidSlide(...HWID_GALLERY_KEYS);

const ugcShowcaseSlides: ProductSlide[] = [
  {
    src: '/images/ugc/ugc.webp',
    width: 960,
    height: 540,
    alt: 'UGC product mark: a crimson gear, a clock face, and speed lines.',
    caption: 'UGC mark',
    captionDesc: 'The mark stands in for the template library and the dispute runners used on limited profiles.',
  },
];

const skinChangerShowcaseSlides: ProductSlide[] = [
  {
    src: '/images/skin-changer/skin-changer.webp',
    width: 1213,
    height: 682,
    alt: 'Shield mark labeled Skin Changer, with crossed rifles, revolvers, and star highlights.',
    caption: 'Cosmetic mark',
    captionDesc: 'Weapon finishes, character outfits, and knife styles are drawn on your screen alone.',
  },
];

function slugFromHref(href: string): string {
  const normalized = href.replace(/^\//, '').replace(/\/$/, '');
  for (const slug of ALL_UTILITY_PRODUCT_SLUGS) {
    if (normalized === slug || normalized.endsWith(`/${slug}`)) return slug;
  }
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  if (!segment || segment === 'cheats' || segment === 'product') {
    return CHEATS_PRIMARY_SLUG;
  }
  return segment;
}

const tierAbout: Record<string, ProductPage['about']> = {
  "elite": []
};

const tierBodies: Record<string, ProductPage['body']> = {
  "elite": [
    {
      "type": "h2",
      "text": "Choose your access term"
    },
    {
      "type": "p",
      "text": "Choose $35 for 31 days or $150 for lifetime access. Confirm the exact edition, lifetime conditions and any hardware purchases before payment."
    },
    {
      "type": "h2",
      "text": "Local previews and capture options"
    },
    {
      "type": "p",
      "text": "Appearance changes are local previews. Capture controls list OBS and Xbox Game Bar overlay hiding; verify your recording output. Neither feature guarantees protection from detection."
    }
  ]
};

const utilityBodies: Record<string, ProductPage['body']> = {
  "hwid-spoofer": [
    {
      "type": "h2",
      "text": "Prepare the machine"
    },
    {
      "type": "p",
      "text": "Use 64-bit Windows 10/11 with administrator rights, internet, HVCI and Core Isolation on, plus TPM and Secure Boot on."
    },
    {
      "type": "h2",
      "text": "Know the boundary"
    },
    {
      "type": "p",
      "text": "Hardware changes do not remove account sanctions. Listed coverage includes Vanguard, Easy Anti-Cheat, BattlEye, Ricochet, ACE and Javelin; compatibility may change. Spoofing can conflict with publisher terms and lead to penalties."
    }
  ],
  "ugc": [
    {
      "type": "h2",
      "text": "Prepare your evidence"
    },
    {
      "type": "p",
      "text": "Collect ownership evidence and the restriction notice. The client requires 64-bit Windows 10/11, internet, HVCI and Core Isolation on, plus TPM and Secure Boot on."
    },
    {
      "type": "h2",
      "text": "Understand the outcome"
    },
    {
      "type": "p",
      "text": "Recovery is not guaranteed. Permanent suspensions remain in place. Platform reviewers decide each case, and weak evidence limits an appeal."
    }
  ],
  "skin-changer": [
    {
      "type": "h2",
      "text": "Prepare the cosmetic client"
    },
    {
      "type": "p",
      "text": "Use 64-bit Windows 10/11, internet and loader access with HVCI and Core Isolation on, plus TPM and Secure Boot on."
    },
    {
      "type": "h2",
      "text": "Keep local previews in perspective"
    },
    {
      "type": "p",
      "text": "Cosmetics are not owned inventory and cannot be traded. They disappear when the client exits. Game or Windows updates can affect coverage; using a cosmetic client can conflict with game terms and lead to penalties."
    }
  ]
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  "elite": {
    "images": showcaseSlides,
    "overview": {
      "title": "Your EVRIMA toolkit",
      "paragraphs": [
        "Bring dinosaur locations, health and growth into your view while radar organizes nearby dinosaurs, nests and carcasses. Resource ESP adds food, water, herbs, fruits and nests with distance markers.",
        "Tune Bite Assist with smoothness, targeting range, bone priority and movement prediction. Local appearance previews include skins, patterns, favorites and loadout exports. Cloud storage keeps your settings and presets together."
      ]
    },
    "fullFeatures": [
      "Dinosaur ESP",
      "2D radar",
      "Bite Assist",
      "Appearance Changer",
      "Resource ESP",
      "Capture controls",
      "Cloud configurations",
      "Edition utilities",
      "Species profiles"
    ],
    "goodToKnow": "Check your EVRIMA build and complete hardware setup before checkout. Auto Finish, Auto Stamina and carcass assistance depend on edition; confirm which are included.",
    "limitations": "Third-party tools can lead to account penalties. Functionality and detection status have not been independently verified. Game updates can change compatibility; presets do not grant server permission.",
    "systemRequirements": [
      {
        "icon": "reqSettings",
        "text": "The Isle on Steam: EVRIMA only. Legacy is not supported by the current listing."
      },
      {
        "icon": "reqWindows",
        "text": "Windows 10 or 11, 64-bit."
      },
      {
        "icon": "reqShieldGuide",
        "text": "HVCI and Core Isolation enabled."
      },
      {
        "icon": "reqShieldGuide",
        "text": "TPM and Secure Boot enabled."
      },
      {
        "icon": "reqSettings",
        "text": "Cloud DMA required for full functionality. Confirm the exact setup before purchase."
      }
    ]
  },
  "hwid-spoofer": {
    "images": hwidShowcaseSlides,
    "overview": {
      "title": "A focused hardware workflow",
      "paragraphs": [
        "Work with disk, network and GPU identifiers from one hardware utility, then run the included trace cleaner in the order given by the setup guide.",
        "The license is $50 for 31 days or $150 lifetime. Both terms cover the same tooling. Confirm current game and anti-cheat coverage before purchase."
      ]
    },
    "fullFeatures": [
      "Disk serial rewrite",
      "MAC address rewrite",
      "GPU identifier rewrite",
      "Related hardware fingerprints",
      "Trace cleaner in the license",
      "ACE, Javelin, and comparable stacks",
      "Riot Vanguard (Valorant)",
      "BattlEye",
      "Easy Anti-Cheat",
      "Ricochet (Call of Duty)"
    ],
    "goodToKnow": "Use 64-bit Windows 10/11 with administrator rights, internet, HVCI and Core Isolation on, plus TPM and Secure Boot on.",
    "limitations": "Hardware changes do not remove account sanctions. Listed coverage includes Vanguard, Easy Anti-Cheat, BattlEye, Ricochet, ACE and Javelin; compatibility may change. Spoofing can conflict with publisher terms and lead to penalties.",
    "systemRequirements": [
      {
        "icon": "reqWindows",
        "text": "Windows 10 or 11, 64-bit."
      },
      {
        "icon": "reqShieldGuide",
        "text": "In Windows Security, HVCI and Core Isolation on."
      },
      {
        "icon": "reqSettings",
        "text": "Administrator rights for the spoof and the cleaner."
      },
      {
        "icon": "reqWifi",
        "text": "Internet that stays up for activation and updates."
      },
      {
        "icon": "reqSettings",
        "text": "TPM and Secure Boot on, in BIOS/UEFI."
      }
    ]
  },
  "ugc": {
    "images": ugcShowcaseSlides,
    "overview": {
      "title": "Build the case with UGC",
      "paragraphs": [
        "Turn account evidence and a clear timeline into an appeal workflow. Repeatable dispute steps help you organize the process across supported platforms.",
        "Choose $35 for 31 days or $150 lifetime. Both plans provide the same capability set. UGC does not rewrite hardware IDs or bypass security controls."
      ]
    },
    "fullFeatures": [
      "Appeal packets built as workflows",
      "Dispute steps that can repeat",
      "Accounts on more than one platform",
      "Appeals for a gaming profile",
      "Appeals for a social handle",
      "Appeals for a marketplace storefront",
      "Monthly and lifetime licenses",
      "Windows 10 and Windows 11"
    ],
    "goodToKnow": "Collect ownership evidence and the restriction notice. The client requires 64-bit Windows 10/11, internet, HVCI and Core Isolation on, plus TPM and Secure Boot on.",
    "limitations": "Recovery is not guaranteed. Permanent suspensions remain in place. Platform reviewers decide each case, and weak evidence limits an appeal.",
    "systemRequirements": [
      {
        "icon": "reqWindows",
        "text": "Windows 10 or 11, 64-bit."
      },
      {
        "icon": "reqShieldGuide",
        "text": "Windows Security with HVCI and Core Isolation on."
      },
      {
        "icon": "reqSettings",
        "text": "BIOS/UEFI with TPM and Secure Boot on."
      },
      {
        "icon": "reqWifi",
        "text": "Internet after the purchase, for the appeal client."
      }
    ]
  },
  "skin-changer": {
    "images": skinChangerShowcaseSlides,
    "overview": {
      "title": "A cosmetic library on your screen",
      "paragraphs": [
        "Choose supported weapon finishes, outfits and knife looks through one client. The preview stays on your screen and is not added to your account inventory.",
        "The license is $35 for 31 days or $150 lifetime. Both terms use the same library. Confirm the exact game and cosmetic before purchase; The Isle support for this separate utility is not established."
      ]
    },
    "fullFeatures": [
      "Presets for premium weapon finishes",
      "Presets for character outfits",
      "Presets for rare knife styles",
      "Coverage across major titles",
      "A lightweight client on this PC",
      "Cosmetic drawing on this screen only",
      "Monthly and lifetime cosmetic licenses",
      "Windows 10 and Windows 11 support"
    ],
    "goodToKnow": "Use 64-bit Windows 10/11, internet and loader access with HVCI and Core Isolation on, plus TPM and Secure Boot on.",
    "limitations": "Cosmetics are not owned inventory and cannot be traded. They disappear when the client exits. Game or Windows updates can affect coverage; using a cosmetic client can conflict with game terms and lead to penalties.",
    "systemRequirements": [
      {
        "icon": "reqWindows",
        "text": "Windows 10 or 11, 64-bit."
      },
      {
        "icon": "reqShieldGuide",
        "text": "Core Isolation and HVCI enabled in Windows Security."
      },
      {
        "icon": "reqSettings",
        "text": "Secure Boot and TPM enabled in BIOS/UEFI."
      },
      {
        "icon": "reqWifi",
        "text": "Internet, plus loader access, after you purchase."
      }
    ]
  }
};

const utilityAcquisitionSteps: Record<UtilityProductSlug, AcquisitionStep[]> = {
  [HWID_SPOOFER_SLUG]: hwidAcquisitionSteps,
  [UGC_SLUG]: ugcAcquisitionSteps,
  [SKIN_CHANGER_SLUG]: skinChangerAcquisitionSteps,
};

const utilityAcquisitionTitles: Record<UtilityProductSlug, string> = {
  [HWID_SPOOFER_SLUG]: 'Order for this HWID license',
  [UGC_SLUG]: 'Starting the UGC license',
  [SKIN_CHANGER_SLUG]: 'Before the cosmetic client',
};

function buildTierPages(t: Translations): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = CHEAT_PRODUCT_NAME;
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.heroDesc ?? cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function findProductCard(t: Translations, slug: UtilityProductSlug) {
  const match = (items: Translations['products']['items']) =>
    items.find((item) => slugFromHref(item.href) === slug);
  return match(t.products.items) ?? match(getTranslations('en').products.items);
}

function buildUtilityPages(t: Translations): ProductPage[] {
  return UTILITY_PRODUCT_SLUGS.flatMap((slug) => {
    const product = findProductCard(t, slug);
    const content = productContent[slug];
    if (!product || !content) return [];

    return [
      {
        slug,
        kind: 'utility' as const,
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: Math.max(0, content.fullFeatures.length - product.features.length),
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: {
          title: utilityAcquisitionTitles[slug],
          steps: utilityAcquisitionSteps[slug],
        },
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      },
    ];
  });
}

export function getProductPages(locale: SiteLocale): ProductPage[] {
  const t = getTranslations(locale);
  return [...buildTierPages(t), ...buildUtilityPages(t)].map((page) =>
    deepApplySiteTokens(applyProductCopy(page, locale)),
  );
}

export function getCheatPages(locale: SiteLocale) {
  return getProductPages(locale).filter((p) => p.kind === 'tier');
}

export function getProductPage(slug: string, locale: SiteLocale) {
  return getProductPages(locale).find((p) => p.slug === slug);
}

/** Tier slugs for sitemap extras, store lives at `PRODUCT_BASE` only. */
export function getAllProductSlugs(): string[] {
  const slugs = getAllCheatSlugs();
  const catalog = new Set<string>(CHEAT_PRODUCT_SLUGS);
  for (const slug of slugs) {
    if (!catalog.has(slug as (typeof CHEAT_PRODUCT_SLUGS)[number])) {
      throw new Error(`Cheat slug "${slug}" missing from CHEAT_PRODUCT_SLUGS in src/config/catalog.ts`);
    }
  }
  return [];
}

export function getHwidSpooferPage(locale: SiteLocale) {
  return getProductPage(HWID_SPOOFER_SLUG, locale);
}

export function getUtilityPages(locale: SiteLocale) {
  return getProductPages(locale).filter((p) => p.kind === 'utility');
}

export function utilityProductPath(slug: UtilityProductSlug): string {
  return UTILITY_PRODUCT_PATHS[slug];
}

export function getAllCheatSlugs() {
  return getCheatPages('en').map((p) => p.slug);
}

export function getHeroSlides(locale: SiteLocale): ProductSlide[] {
  if (locale === 'en') return showcaseSlides;
  const gallery = productCopyByLocale[locale].gallery;
  return showcaseSlides.map((slide, index) => {
    const copy = gallery[index];
    if (!copy) return slide;
    return { ...slide, alt: copy.alt, caption: copy.caption, captionDesc: copy.captionDesc };
  });
}

const productCopyByLocale: Record<Exclude<SiteLocale, 'en'>, ProductCopyBundle> = {
  es: esProductCopy as ProductCopyBundle,
  de: deProductCopy as ProductCopyBundle,
  fr: frProductCopy as ProductCopyBundle,
};

function acquisitionTitleFor(productName: string) {
  return `How to get ${productName}`;
}

function buildEnglishProductCopyBundle(): ProductCopyBundle {
  const tierSlugs = ['elite'] as const;
  const utilitySlugs = ALL_UTILITY_PRODUCT_SLUGS;

  const tiers = Object.fromEntries(
    tierSlugs.map((slug) => {
      const content = productContent[slug];
      const displayName = CHEAT_PRODUCT_NAME;
      return [
        slug,
        {
          about: tierAbout[slug],
          body: tierBodies[slug] ?? [],
          overview: content.overview,
          goodToKnow: content.goodToKnow,
          limitations: content.limitations,
          acquisitionTitle: acquisitionTitleFor(displayName),
        },
      ];
    }),
  ) as ProductCopyBundle['tiers'];

  const utilities = Object.fromEntries(
    utilitySlugs.map((slug) => {
      const content = productContent[slug];
      return [
        slug,
        {
          body: utilityBodies[slug] ?? [],
          overview: content.overview,
          goodToKnow: content.goodToKnow,
          limitations: content.limitations,
          acquisitionTitle: utilityAcquisitionTitles[slug],
          acquisitionSteps: utilityAcquisitionSteps[slug],
          systemRequirements: content.systemRequirements.map((r) => r.text),
        },
      ];
    }),
  ) as ProductCopyBundle['utilities'];

  return {
    sharedGoodToKnow,
    sharedLimitations,
    acquisitionSteps: defaultAcquisitionSteps.map(({ num, title, desc }) => ({ num, title, desc })),
    systemRequirements: mainProductSystemRequirements.map((r) => r.text),
    gallery: Object.values(galleryRaw).map(({ alt, caption, captionDesc }) => ({
      alt,
      caption,
      captionDesc,
    })),
    tiers,
    utilities,
  };
}

registerProductCopyBundle(buildEnglishProductCopyBundle());

export const heroSlides = getHeroSlides('en');

function productCopyFor(locale: SiteLocale): ProductCopyBundle {
  if (locale === 'en') return getProductCopyBundle();
  return productCopyByLocale[locale];
}

function applyProductCopy(page: ProductPage, locale: SiteLocale): ProductPage {
  if (locale === 'en') return page;
  const copy = productCopyFor(locale);
  const bucket = page.kind === 'tier' ? copy.tiers[page.slug] : copy.utilities[page.slug];
  if (!bucket) return page;

  const isTier = page.kind === 'tier';
  const localizedSteps = isTier ? copy.acquisitionSteps : 'acquisitionSteps' in bucket ? bucket.acquisitionSteps : undefined;
  const localizedRequirements = isTier
    ? copy.systemRequirements
    : 'systemRequirements' in bucket
      ? bucket.systemRequirements
      : undefined;

  const acquisition: ProductAcquisition = {
    title: bucket.acquisitionTitle,
    steps: localizedSteps?.map((step) => ({ ...step })) ?? page.acquisition.steps,
  };

  const localizedGallery = isTier ? copy.gallery : 'gallery' in bucket ? bucket.gallery : undefined;
  const images = localizedGallery
    ? page.images.map((slide, index) => {
        const g = localizedGallery[index];
        if (!g) return slide;
        return { ...slide, alt: g.alt, caption: g.caption, captionDesc: g.captionDesc };
      })
    : page.images;
  const fullFeatures =
    'fullFeatures' in bucket && bucket.fullFeatures?.length ? bucket.fullFeatures : page.fullFeatures;

  const systemRequirements = page.systemRequirements.map((req, index) => ({
    ...req,
    text: localizedRequirements?.[index] ?? req.text,
  }));

  return {
    ...page,
    overview: bucket.overview,
    body: bucket.body,
    about: 'about' in bucket ? bucket.about : page.about,
    goodToKnow: bucket.goodToKnow,
    limitations: bucket.limitations,
    acquisition,
    images,
    fullFeatures,
    systemRequirements,
  };
}
