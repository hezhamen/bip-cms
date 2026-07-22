/** Localized website chrome + section copy for seed (en fallbacks live in seed.ts). */

export type LocaleCode = 'en' | 'ku' | 'ar'

export const WEBSITE_LOCALES: Record<
  Exclude<LocaleCode, 'en'>,
  {
    pioneeringHeadline: string
    programBlurb: string
    programIntro: string
    ctaBandBody: string
    ctaBandHeading: string
    metaDescription: string
    headerLinks: { label: string; href: string }[]
    headerCtas: {
      contactLabel: string
      contactHref: string
      joinLabel: string
      joinHref: string
      askAiLabel: string
    }
    footerNavLinks: { label: string; href: string }[]
    footerSocialLinks: { platform: string; label: string; href: string }[]
    footerProgramLinks: { label: string; href: string }[]
  }
> = {
  ku: {
    pioneeringHeadline:
      'بەرنامەیەکی پێشەنگ کە کۆمپانیاکان، داھێنەران و وەبەرهێنەران کۆدەکاتەوە بۆ داهاتوویەکی هاوبەشی گەشەسەندوو.',
    programBlurb:
      'بەرنامەی Becoming International Professionals (BIP) شارەزایی جیهانی دەبەستێتەوە بە دەرفەتی هەرێمی لە بیناسازی، بانک، وزەی سەوز، گەشتیاری، زیر، تەندروستی و فرانچایز.',
    programIntro:
      'بەرنامەی BIP دەستپێشخەرییەکی نێودەوڵەتی تایبەتە کە ناساندن دەگۆڕێت بۆ ئەنجامی وەبەرهێنان.',
    ctaBandBody:
      'BIP کۆمپانیاکان، داھێنەران و وەبەرهێنەران کۆدەکاتەوە بۆ بنیاتنانی گەشەی بەردەوام لە سەرانسەری هەرێم.',
    ctaBandHeading: 'پەیوەندی بکە',
    metaDescription:
      'BIP — Becoming International Professionals — کۆمپانیاکان، داھێنەران و وەبەرهێنەران کۆدەکاتەوە لە کۆنفرانسەکانی هەرێمی کوردستان.',
    headerLinks: [
      { label: 'سەرەکی', href: '/' },
      { label: 'دەربارە', href: '/about' },
      { label: 'کۆنفرانسەکان', href: '/summits' },
      { label: 'هەواڵ و بلۆگ', href: '/news' },
    ],
    headerCtas: {
      contactLabel: 'پەیوەندی',
      contactHref: '/contact',
      joinLabel: 'لەگەڵمان بەشداربە',
      joinHref: '/join',
      askAiLabel: 'پرسیار لە BIP AI بکە',
    },
    footerNavLinks: [
      { label: 'سەرەکی', href: '/' },
      { label: 'دەربارە', href: '/about' },
      { label: 'بەرنامەکان', href: '/summits' },
      { label: 'پەیوەندیمان پێوە بکە', href: '/contact' },
      { label: 'لەگەڵمان کار بکە', href: '/partner' },
      { label: 'تۆمارکردن', href: '/join' },
    ],
    footerSocialLinks: [
      { platform: 'facebook', label: 'Facebook', href: '#' },
      { platform: 'instagram', label: 'Instagram', href: '#' },
      { platform: 'linkedin', label: 'Linkedin', href: '#' },
      { platform: 'youtube', label: 'Youtube', href: '#' },
      { platform: 'whatsapp', label: 'Whatsapp', href: '#' },
      { platform: 'x', label: 'X', href: '#' },
    ],
    footerProgramLinks: [
      { label: 'BIP 2023', href: '/summits' },
      { label: 'BIP 2024', href: '/summits' },
      { label: 'BIP 2025', href: '/summits' },
    ],
  },
  ar: {
    pioneeringHeadline:
      'برنامج رائد يجمع الشركات والمبتكرين والمستثمرين من أجل مستقبل مشترك من الازدهار.',
    programBlurb:
      'يربط برنامج Becoming International Professionals (BIP) الخبرة العالمية بالفرص الإقليمية عبر الإنشاءات والمصرفية والطاقة الخضراء والسياحة والذكاء الاصطناعي والرعاية الصحية والامتياز.',
    programIntro:
      'برنامج BIP مبادرة دولية متخصصة تحول التعارف إلى نتائج استثمارية.',
    ctaBandBody:
      'يربط BIP الشركات والمبتكرين والمستثمرين لبناء ازدهار دائم في أنحاء المنطقة.',
    ctaBandHeading: 'تواصل معنا',
    metaDescription:
      'BIP — Becoming International Professionals — يربط الشركات والمبتكرين والمستثمرين في قمم إقليم كردستان.',
    headerLinks: [
      { label: 'الرئيسية', href: '/' },
      { label: 'من نحن', href: '/about' },
      { label: 'القمم', href: '/summits' },
      { label: 'الأخبار والمدونات', href: '/news' },
    ],
    headerCtas: {
      contactLabel: 'تواصل',
      contactHref: '/contact',
      joinLabel: 'انضم إلينا',
      joinHref: '/join',
      askAiLabel: 'اسأل BIP AI',
    },
    footerNavLinks: [
      { label: 'الرئيسية', href: '/' },
      { label: 'من نحن', href: '/about' },
      { label: 'البرامج', href: '/summits' },
      { label: 'اتصل بنا', href: '/contact' },
      { label: 'اعمل معنا', href: '/partner' },
      { label: 'سجّل', href: '/join' },
    ],
    footerSocialLinks: [
      { platform: 'facebook', label: 'Facebook', href: '#' },
      { platform: 'instagram', label: 'Instagram', href: '#' },
      { platform: 'linkedin', label: 'Linkedin', href: '#' },
      { platform: 'youtube', label: 'Youtube', href: '#' },
      { platform: 'whatsapp', label: 'Whatsapp', href: '#' },
      { platform: 'x', label: 'X', href: '#' },
    ],
    footerProgramLinks: [
      { label: 'BIP 2023', href: '/summits' },
      { label: 'BIP 2024', href: '/summits' },
      { label: 'BIP 2025', href: '/summits' },
    ],
  },
}

export const PAGES_LOCALES: Record<
  Exclude<LocaleCode, 'en'>,
  Record<
    string,
    {
      seoTitle: string
      seoDescription: string
      eyebrow?: string
      listingTitle?: string
      formTitle?: string
      successTitle?: string
      benefitsHeading?: string
      heading?: string
    }
  >
> = {
  ku: {
    home: {
      seoTitle: 'BIP Summit',
      seoDescription:
        'BIP کۆمپانیاکان، داھێنەران و وەبەرهێنەران کۆدەکاتەوە لە کۆنفرانسەکانی هەرێمی کوردستان.',
    },
    about: {
      seoTitle: 'دەربارە',
      seoDescription: 'دەربارەی بەرنامەی BIP — پەیوەندیکردنی کۆمپانیاکان و وەبەرهێنەران لە هەرێمی کوردستان.',
      eyebrow: 'دەربارەی ئێمە',
    },
    summits: {
      seoTitle: 'کۆنفرانسەکان',
      seoDescription: 'چاپەکانی BIP Summit بگەڕێ — ئەجێندا و ئەنجامەکان لە هەولێر.',
    },
    news: {
      seoTitle: 'هەواڵ و بلۆگ',
      seoDescription: 'هەواڵ و چیرۆک لە BIP Summit و کۆمەڵگەی بەرنامەکە.',
    },
    speakers: {
      seoTitle: 'قسەکەرەکان',
      seoDescription: 'قسەکەرەکانی BIP Summit بناسە.',
      listingTitle: 'قسەکەرەکانمان بناسە',
    },
    join: {
      seoTitle: 'بەشداری لە بەرنامەی BIP',
      seoDescription: 'بەشداری لە بەرنامەی BIP بکە و پەیوەست بمێنەرەوە بە کۆنفرانس و دیلرۆم.',
      formTitle: 'بەشداری لە بەرنامەی BIP',
      successTitle: 'بە سەرکەوتوویی تۆمارکرا',
    },
    partner: {
      seoTitle: 'ببە بە هاوبەش',
      seoDescription: 'ببە بە هاوبەشی BIP — سپۆنسەری کەرتێک یان هاوکاری بۆ چوونە ناو بازاڕ.',
      formTitle: 'ببە بە هاوبەش',
      benefitsHeading: 'سوودەکانی بەرنامە',
    },
    contact: {
      seoTitle: 'پەیوەندی',
      seoDescription: 'پەیوەندی بە تیمی بەرنامەی BIP بکە.',
      eyebrow: 'پەیوەندیمان پێوە بکە',
      heading: 'پەیوەندی بکە',
    },
  },
  ar: {
    home: {
      seoTitle: 'BIP Summit',
      seoDescription:
        'يربط BIP الشركات والمبتكرين والمستثمرين في قمم إقليم كردستان.',
    },
    about: {
      seoTitle: 'من نحن',
      seoDescription: 'تعرّف على برنامج BIP — ربط الشركات والمستثمرين في إقليم كردستان.',
      eyebrow: 'من نحن',
    },
    summits: {
      seoTitle: 'القمم',
      seoDescription: 'استكشف نسخ BIP Summit — الأجندات والنتائج من أربيل.',
    },
    news: {
      seoTitle: 'الأخبار والمدونات',
      seoDescription: 'أخبار وقصص من قمم BIP ومجتمع البرنامج.',
    },
    speakers: {
      seoTitle: 'المتحدثون',
      seoDescription: 'تعرّف على متحدثي BIP Summit.',
      listingTitle: 'تعرّف على المتحدثين',
    },
    join: {
      seoTitle: 'انضم إلى برنامج BIP',
      seoDescription: 'انضم إلى برنامج BIP وابقَ على اتصال بالقمم وغرف الصفقات.',
      formTitle: 'انضم إلى برنامج BIP',
      successTitle: 'تم التسجيل بنجاح',
    },
    partner: {
      seoTitle: 'كن شريكًا',
      seoDescription: 'كن شريك BIP — ارعَ مسارًا أو تعاون على دخول السوق.',
      formTitle: 'كن شريكًا',
      benefitsHeading: 'مزايا البرنامج',
    },
    contact: {
      seoTitle: 'اتصل بنا',
      seoDescription: 'تواصل مع فريق برنامج BIP.',
      eyebrow: 'اتصل بنا',
      heading: 'تواصل معنا',
    },
  },
}

export const SECTIONS_LOCALES: Record<
  Exclude<LocaleCode, 'en'>,
  {
    missionTabs: {
      tabId: string
      label: string
      lead: string
      emphasis: string
      trail: string
    }[]
    stats: { value: string; label: string }[]
    sectionIntros: Record<string, string>
    formIntros: Record<string, string>
    aiChat: {
      welcome: string
      subtitle: string
      placeholder: string
      typing: string
    }
  }
> = {
  ku: {
    missionTabs: [
      {
        tabId: 'mission',
        label: 'ئەرکمان',
        lead: 'پیشەییەکان و ڕێکخراوەکان بەهێز بکەین بە',
        emphasis: 'تۆڕ، تێگەیشتن و متمانە',
        trail: 'بۆ وەبەرهێنان و کارکردن لە سنوورەکاندا.',
      },
      {
        tabId: 'vision',
        label: 'چاوەڕوانییمان',
        lead: 'هەرێمێکی کوردستان کە تێیدا',
        emphasis: 'بەهرە، سەرمایە و تەکنەلۆژیا',
        trail: 'دەبنە گەشەی بەهێز و پەیوەست بە جیهان.',
      },
      {
        tabId: 'what-we-do',
        label: 'چی دەکەین',
        lead: 'کۆنفرانسی BIP ڕێکدەخەین، ڕێڕەوی قووڵ بەڕێوەدەبەین و',
        emphasis: 'دوایەڕۆی ڕێکدەخەین',
        trail: 'تا ناساندن ببێتە پشکنین — و پشکنین ببێتە ڕێککەوتن.',
      },
    ],
    stats: [
      { value: '208', label: 'کۆی ئامادەبووان' },
      { value: '16+', label: 'وڵات' },
      { value: '$360M+', label: 'وەبەرهێنانی ئاسانکراو' },
      { value: '3', label: 'چاپ' },
      { value: '24', label: 'قسەکەر' },
    ],
    sectionIntros: {
      speakers:
        'گوێ لە دامەزرێنەران، بڕیار بەدەستان و کارمەندانی بواری وەبەرهێنان و داھێنان بگرە لە هەرێمی کوردستان و دەرەوە.',
      sectors:
        'BIP سەرمایە و هاوکاری لەسەر ئەو پیشەسازیانە چڕ دەکاتەوە کە دە ساڵی داهاتوو دەجوڵێنن.',
      youtube:
        'وتار، پانێڵ و ساتەکانی دیلرۆم لە چاپەکانی دوایی BIP Summit ببینە.',
      news: 'نوێکاری لە کۆمەڵگەی BIP — کۆنفرانس، هاوبەشی و ڕێککەوتنەکان.',
      summits:
        'هەر چاپێکی BIP Summit لەسەر ئەوی پێشوو دروست دەبێت: ئەجێندای تیژتر، تۆڕی قووڵتر، ئەنجامی ڕوونتر.',
      gallery:
        'دیمەن لە سەکۆی BIP Summit، سەردانی پڕۆژە و گفتوگۆکان کە ناساندن دەگۆڕن بۆ هاوبەشی.',
      media:
        'ڕووماڵی BIP Summit لە دەزگا ناوخۆیی و نێودەوڵەتییەکان دەربارەی وەبەرهێنان و تەکنەلۆژیا.',
      countries:
        'نوێنەر و هاوبەشەکان لە ڕۆژهەڵاتی ناوەڕاست، ئەوروپا، ئاسیا و ئەمریکای باکوورەوە دێن.',
      related: 'چیرۆکی زیاتر لە BIP Summit و تۆڕی بەرنامەکە.',
    },
    formIntros: {
      register:
        'شوێنەکەت لە BIP Summitی داهاتوو حجز بکە — دوو ڕۆژی چڕ لە هەولێر لەگەڵ دیلرۆم و سەردانی پڕۆژە.',
      join: 'بەرنامەی BIP دەستپێشخەرییەکی نێودەوڵەتی تایبەتە.',
      partner:
        'هاوبەشی لەگەڵ BIP بکە بۆ میوانداری ڕێڕەوی کەرت، دیداری بڕیار بەدەستان و پەیوەستبوون بە ڕێککەوتنەکان.',
      contact:
        'پێمان بڵێ چی دەگەڕێیت — تۆمارکردن، هاوبەشی، میدیا یان ناساندنی وەبەرهێنان — تیمی BIP وەڵام دەداتەوە.',
    },
    aiChat: {
      welcome: 'بەخێربێیت بۆ BIP AI',
      subtitle: 'هەر شتێک دەربارەی BIP Summit بپرسە',
      placeholder: 'لێرە بپرسە...',
      typing: 'BIP AI دەنوسێت…',
    },
  },
  ar: {
    missionTabs: [
      {
        tabId: 'mission',
        label: 'مهمتنا',
        lead: 'تمكين المهنيين والمنظمات بـ',
        emphasis: 'الشبكات والرؤية والثقة',
        trail: 'للاستثمار والعمل عبر الحدود.',
      },
      {
        tabId: 'vision',
        label: 'رؤيتنا',
        lead: 'إقليم كردستان حيث',
        emphasis: 'المواهب ورأس المال والتكنولوجيا',
        trail: 'تتراكم إلى نمو دائم ومتصل عالميًا.',
      },
      {
        tabId: 'what-we-do',
        label: 'ما نفعله',
        lead: 'ننظم قمم BIP ونُدير مسارات مكثفة و',
        emphasis: 'ننظم المتابعة',
        trail: 'حتى يتحول التعارف إلى تدقيق — والتدقيق إلى صفقات.',
      },
    ],
    stats: [
      { value: '208', label: 'إجمالي الحضور' },
      { value: '16+', label: 'دولة' },
      { value: '$360M+', label: 'استثمار مُيسَّر' },
      { value: '3', label: 'نسخ' },
      { value: '24', label: 'متحدث' },
    ],
    sectionIntros: {
      speakers:
        'استمع إلى مؤسسين وصنّاع سياسات ومشغّلين يشكلون الاستثمار والابتكار في إقليم كردستان وخارجه.',
      sectors:
        'يركّز BIP رأس المال والتعاون على الصناعات التي تقود العقد القادم من النمو الإقليمي.',
      youtube:
        'شاهد الكلمات الرئيسية والجلسات ولحظات غرف الصفقات من نسخ BIP Summit الأخيرة.',
      news: 'تحديثات من مجتمع BIP — القمم والشراكات والصفقات الجارية.',
      summits:
        'كل نسخة من BIP Summit تبني على السابقة: أجندات أدق وشبكات أعمق ونتائج أوضح.',
      gallery:
        'مشاهد من منصات BIP Summit وزيارات المواقع والمحادثات التي تحول التعارف إلى شراكات.',
      media:
        'تغطية BIP Summit عبر وسائل إعلام إقليمية ودولية حول الاستثمار والتكنولوجيا.',
      countries:
        'ينضم المندوبون والشركاء إلى BIP من الشرق الأوسط وأوروبا وآسيا وأمريكا الشمالية.',
      related: 'المزيد من القصص من قمم BIP وشبكة البرنامج الأوسع.',
    },
    formIntros: {
      register:
        'احجز مقعدك في قمة BIP القادمة — يومان مكثفان في أربيل مع غرف صفقات وزيارات ميدانية.',
      join: 'برنامج BIP مبادرة دولية متخصصة.',
      partner:
        'شارك مع BIP لاستضافة مسار قطاعي ولقاء صنّاع القرار والبقاء على اتصال بالصفقات.',
      contact:
        'أخبرنا بما تستكشفه — التسجيل أو الشراكة أو الإعلام أو مقدمات الاستثمار — وسيرد فريق BIP.',
    },
    aiChat: {
      welcome: 'مرحبًا بك في BIP AI',
      subtitle: 'اسأل أي شيء عن BIP Summit',
      placeholder: 'اسأل هنا...',
      typing: 'BIP AI يكتب…',
    },
  },
}
