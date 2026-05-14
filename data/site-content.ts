export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

type MenuItem = {
  label: string;
  href: string;
};

type Service = {
  title: string;
  summary: string;
  bullets: string[];
  benefits: string[];
};

type AutomationItem = {
  process: string;
  examples: string[];
  advantage: string;
};

type AiRoutine = {
  persona: string;
  tasks: string[];
  outcomes: string[];
};

type ProjectRef = {
  name: string;
  url: string;
  context: string;
  impact: string;
};

type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
};

type Glossary = {
  term: string;
  definition: string;
};

type Training = {
  slug: string;
  title: string;
  format: string;
  duration: string;
  audience: string;
};

type Dictionary = {
  localeLabel: string;
  nav: MenuItem[];
  cta: {
    primary: string;
    secondary: string;
    quotation: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  trust: {
    title: string;
    items: string[];
  };
  personasTitle: string;
  personas: string[];
  sections: {
    services: string;
    automation: string;
    ai: string;
    data: string;
    projects: string;
    odss: string;
    training: string;
    glossary: string;
  };
  services: Service[];
  automation: AutomationItem[];
  aiRoutines: AiRoutine[];
  dataStack: {
    title: string;
    tools: string[];
    copy: string;
  };
  projects: ProjectRef[];
  founder: {
    title: string;
    bio: string;
  };
  odss: {
    text: string;
    chips: string[];
  };
  blogPosts: BlogPost[];
  glossary: Glossary[];
  trainings: Training[];
  contact: {
    title: string;
    phonePrimary: string;
    phoneSecondary: string;
    whatsapp: string;
    email: string;
  };
  footer: string;
};

export const contactChannels = {
  phonePrimary: "+229 01 67 65 97 17",
  phoneSecondary: "+229 01 47 14 61 61",
  whatsapp: "https://wa.me/2290167659717",
  email: "contact@kijanilab.com",
};

export const dictionary: Record<Locale, Dictionary> = {
  fr: {
    localeLabel: "Francais",
    nav: [
      { label: "Accueil", href: "" },
      { label: "Services", href: "/services" },
      { label: "Projets", href: "/projets" },
      { label: "Formations", href: "/formations" },
      { label: "Impact", href: "/impact" },
      { label: "Glossaire", href: "/glossaire" },
      { label: "Blog", href: "/blog" },
      { label: "A propos", href: "/a-propos" },
      { label: "Contact", href: "/contact" },
    ],
    cta: {
      primary: "Parler a un expert",
      secondary: "Voir nos services",
      quotation: "Demander un devis",
    },
    hero: {
      badge: "Awwwards mindset x Agritech",
      title: "Nous modernisons l'image de l'agriculture africaine.",
      subtitle:
        "KijaniLab aide cooperatives, faitieres, entreprises agricoles, ONG, institutions et programmes a gagner en visibilite, automatiser leurs operations et integrer l'IA avec impact mesurable.",
    },
    trust: {
      title: "Preuves rapides",
      items: ["48+ projets livres", "11 pays couverts", "8 chaines de valeur suivies"],
    },
    personasTitle: "Nos clients",
    personas: [
      "Cooperatives, unions et faitieres agricoles",
      "Entreprises agricoles et agroalimentaires",
      "ONG, cabinets d'expertise et bureaux d'etudes",
      "Projets et programmes de developpement agricole",
      "Institutions publiques et ministere de l'agriculture",
      "Organisations internationales et bailleurs",
      "Startups agritech, fintech rurales et investisseurs impact",
      "Acteurs logistiques, transformateurs et distributeurs de filiere",
    ],
    sections: {
      services: "Services strategiques",
      automation: "Automatisation intelligente",
      ai: "Integration IA dans les routines",
      data: "Data, cartographie et intelligence terrain",
      projects: "Projets realises",
      odss: "Alignement ODD Nations Unies",
      training: "Formation et montee en competences",
      glossary: "Lexique agroeconomique",
    },
    services: [
      {
        title: "Marketing digital et presence en ligne",
        summary:
          "Nous construisons des ecosystemes digitaux qui attirent des clients et partenaires qualifies localement et a l'international.",
        bullets: [
          "Sites web conversion-first et multilingues",
          "Strategie reseaux sociaux et calendrier editorial",
          "SEO, campagnes ciblage et creation de contenus orientee trafic",
          "Renforcement e-reputation et coherence de marque",
        ],
        benefits: [
          "Visibilite locale et internationale renforcee",
          "Pipeline commercial plus qualifie",
          "Acquisition de partenaires et financeurs plus rapide",
        ],
      },
      {
        title: "Automatisation des processus fastidieux",
        summary:
          "Nous supprimons les taches repetitives qui ralentissent vos equipes en connectant vos outils metier.",
        bullets: [
          "Relances automatiques e-mail et WhatsApp",
          "Generation de rapports operationnels hebdomadaires",
          "Validation de demandes d'intrants et d'achats",
          "Consolidation des donnees terrain et alertes de non-conformite",
        ],
        benefits: [
          "Gain de temps de 20 a 40% sur les operations administratives",
          "Moins d'erreurs humaines et plus de tracabilite",
          "Equipes recentrees sur les decisions a forte valeur",
        ],
      },
      {
        title: "Integration IA metier",
        summary:
          "Nous aidons les entreprises, meme petites, a utiliser l'IA sans remplacer leurs equipes: l'objectif est de gagner du temps et de mieux decider.",
        bullets: [
          "Assistants IA pour redaction d'e-mails, comptes rendus et notes techniques",
          "Generation de rapports mensuels et synthese de donnees",
          "Aide a la prospection, au service client et au support projet",
          "Systemes de priorisation automatique des taches",
        ],
        benefits: [
          "Decisions plus rapides et mieux documentees",
          "Productivite individuelle augmentee",
          "Standardisation de la qualite documentaire",
        ],
      },
      {
        title: "Collecte, analyse et cartographie des donnees",
        summary:
          "Nous mettons en place les outils qui permettent de posseder ses donnees essentielles et de les comprendre en temps reel.",
        bullets: [
          "Collecte terrain mobile offline-first",
          "Dashboards Power BI, Metabase ou Looker Studio",
          "Cartographie SIG: QGIS, Google Earth Engine, Mapbox",
          "Suivi climat, risques et performance de production",
        ],
        benefits: [
          "Pilotage factuel des programmes",
          "Meilleure redevabilite vis-a-vis des partenaires",
          "Capacite de prevoir et corriger plus tot",
        ],
      },
      {
        title: "Produits digitaux et innovation agrotech",
        summary:
          "Nous creons des applications web, mobile et IA qui donnent vie a vos projets digitaux.",
        bullets: [
          "App de detection precoce des maladies des cultures",
          "App de gestion d'exploitation et de suivi de rendement",
          "Marketplaces B2B pour connecter producteurs et acheteurs",
          "Portails de tracabilite agroalimentaire et chaine de valeur",
          "Integrations capteurs IoT et irrigation intelligente",
        ],
        benefits: [
          "Nouveaux services numeriques monétisables",
          "Suivi operationnel continu du terrain",
          "Avantage competitif durable sur la filiere",
        ],
      },
      {
        title: "Agroeconomie, economie verte et blockchain",
        summary:
          "Nous accompagnons les acteurs de la chaine de valeur sur la performance economique, l'inclusion et les technologies emergentes.",
        bullets: [
          "Modelisation economique des filieres agricoles",
          "Trajectoires economie verte et agroalimentaire durable",
          "Cas d'usage blockchain pour tracabilite et transparence",
          "Appui a la structuration de partenariats public-prive",
        ],
        benefits: [
          "Meilleure rentabilite de la chaine de valeur",
          "Confiance accrue des partenaires et consommateurs",
          "Capacite d'acces a de nouveaux financements",
        ],
      },
    ],
    automation: [
      {
        process: "Gestion commerciale et relation partenaires",
        examples: [
          "Envoi automatique d'e-mails de suivi apres reunion",
          "Relance devis et rappels de documents manquants",
          "Qualification automatique des leads entrants",
        ],
        advantage: "Cycle de vente plus court et moins de prospects perdus.",
      },
      {
        process: "Operations programmes et reporting",
        examples: [
          "Generation automatique des rapports hebdomadaires",
          "Consolidation multi-zones en un tableau de bord unique",
          "Alertes sur indicateurs en retard ou hors seuil",
        ],
        advantage: "Reporting plus fiable et disponible a temps pour les decisions.",
      },
      {
        process: "Gestion terrain et qualite",
        examples: [
          "Validation des formulaires terrain par regles metier",
          "Alertes de non-conformite qualite en temps reel",
          "Creation de tickets d'incident automatiquement",
        ],
        advantage: "Moins de pertes, meilleure qualite et reactivite accrue.",
      },
    ],
    aiRoutines: [
      {
        persona: "Cooperative et faitiere",
        tasks: [
          "Rediger les communications aux producteurs",
          "Generer les comptes rendus de reunion",
          "Preparer des previsions de campagne",
        ],
        outcomes: [
          "Temps administratif reduit",
          "Meilleure coordination terrain",
          "Decisions de planification plus rapides",
        ],
      },
      {
        persona: "Entreprise agroalimentaire",
        tasks: [
          "Analyser tendances ventes et stocks",
          "Produire rapports qualite et conformite",
          "Automatiser reponses e-mail clients/fournisseurs",
        ],
        outcomes: [
          "Diminution des ruptures et surstocks",
          "Reactivite commerciale amelioree",
          "Documentation qualite standardisee",
        ],
      },
      {
        persona: "ONG, cabinet, programme de developpement",
        tasks: [
          "Synthese de donnees terrain multi-departements",
          "Creation de rapports bailleurs et presentatons",
          "Generation de notes d'apprentissage et lessons learned",
        ],
        outcomes: [
          "Meilleure redevabilite projet",
          "Gain de temps sur les livrables donor",
          "Capitalisation des connaissances renforcee",
        ],
      },
    ],
    dataStack: {
      title: "Outils data, cartographie et pilotage",
      tools: [
        "KoboToolbox, ODK, CommCare",
        "Power BI, Looker Studio, Metabase",
        "QGIS, Mapbox, Google Earth Engine",
        "PostgreSQL/PostGIS, BigQuery, Airtable",
      ],
      copy:
        "Nous aidons vos equipes a collecter les bonnes donnees, les securiser, les analyser et les transformer en actions concrètes pour la production, le climat et la chaine de valeur.",
    },
    projects: [
      {
        name: "Le Rural",
        url: "https://lerural.bj",
        context: "Plateforme de contenu et d'information agricole orientee visibilite et impact local.",
        impact: "Audience en croissance et meilleure visibilite des initiatives rurales.",
      },
      {
        name: "IDIDONG",
        url: "https://ididong.org",
        context: "Site institutionnel et vitrine de projets a destination de partenaires internationaux.",
        impact: "Positionnement de marque renforce et parcours utilisateur clarifie.",
      },
    ],
    founder: {
      title: "Promoteur",
      bio: "Georgeo AGBAHUNGBA, Agroeconomiste et Software Engineer. Il relie enjeux economiques des filieres agricoles, execution technologique et vision produit pour livrer des solutions utiles, durables et orientees resultat.",
    },
    odss: {
      text:
        "Nos interventions s'alignent sur les ODD en combinant inclusion, productivite, resilience climatique et innovation digitale.",
      chips: ["ODD 1", "ODD 2", "ODD 5", "ODD 8", "ODD 9", "ODD 12", "ODD 13", "ODD 17"],
    },
    blogPosts: [
      {
        category: "IA agricole",
        title: "Comment une cooperative peut integrer l'IA en 30 jours",
        excerpt: "Feuille de route simple pour commencer sans gros budget ni disruption brutale.",
      },
      {
        category: "Automatisation",
        title: "10 processus repetitifs a automatiser en priorite",
        excerpt: "Relances, rapports, validation qualite et suivi stocks: quoi automatiser d'abord.",
      },
      {
        category: "Agroeconomie",
        title: "Creer de la valeur sur toute la chaine agroalimentaire",
        excerpt: "Comprendre marges, inefficacites et leviers numeriques dans la filiere.",
      },
      {
        category: "Climat",
        title: "Donnees climat et decisions terrain: le guide pratique",
        excerpt: "Comment transformer indicateurs climatiques en actions d'adaptation utiles.",
      },
    ],
    glossary: [
      {
        term: "Agroeconomie",
        definition:
          "Discipline qui analyse la production, la transformation, la distribution et la consommation agricole sous l'angle economique.",
      },
      {
        term: "Chaine de valeur",
        definition:
          "Ensemble des acteurs et activites qui creent de la valeur du producteur au consommateur final.",
      },
      {
        term: "Economie verte",
        definition:
          "Modele economique qui concilie croissance, inclusion sociale et reduction des impacts environnementaux.",
      },
      {
        term: "Tracabilite",
        definition:
          "Capacite a suivre l'historique d'un produit, d'un lot ou d'une operation tout au long de la filiere.",
      },
      {
        term: "Irrigation intelligente",
        definition:
          "Pilotage de l'irrigation via capteurs, donnees meteo et automatisation pour optimiser eau et rendement.",
      },
    ],
    trainings: [
      {
        slug: "ia-routines",
        title: "IA pratique pour equipes agricoles et agroalimentaires",
        format: "Bootcamp hybride",
        duration: "2 semaines",
        audience: "Managers, operationnels, equipes support",
      },
      {
        slug: "automation-stack",
        title: "Automatiser ses processus sans casser l'organisation",
        format: "Atelier intensif",
        duration: "3 jours",
        audience: "Direction operationnelle et chefs de projet",
      },
      {
        slug: "data-carto",
        title: "Collecte de donnees et cartographie decisionnelle",
        format: "Formation terrain + dashboard",
        duration: "4 semaines",
        audience: "M&E, analysts, coordinateurs programmes",
      },
    ],
    contact: {
      title: "Parlons de votre projet",
      phonePrimary: contactChannels.phonePrimary,
      phoneSecondary: contactChannels.phoneSecondary,
      whatsapp: contactChannels.whatsapp,
      email: contactChannels.email,
    },
    footer:
      "KijaniLab accompagne la transformation digitale agricole avec une execution orientee impact, conversion et valeur de filiere.",
  },
  en: {
    localeLabel: "English",
    nav: [
      { label: "Home", href: "" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projets" },
      { label: "Training", href: "/formations" },
      { label: "Impact", href: "/impact" },
      { label: "Glossary", href: "/glossaire" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/a-propos" },
      { label: "Contact", href: "/contact" },
    ],
    cta: {
      primary: "Talk to an expert",
      secondary: "Explore services",
      quotation: "Request a quote",
    },
    hero: {
      badge: "Awwwards mindset x Agritech",
      title: "We modernize the image of African agriculture.",
      subtitle:
        "KijaniLab supports cooperatives, agribusinesses, NGOs, institutions and development programs to increase visibility, automate operations, and adopt AI with measurable impact.",
    },
    trust: {
      title: "Fast proof",
      items: ["48+ delivered projects", "11 countries covered", "8 value chains supported"],
    },
    personasTitle: "Who we serve",
    personas: [
      "Cooperatives, unions and umbrella organizations",
      "Agricultural and agro-food companies",
      "NGOs, advisory firms and consulting cabinets",
      "Agricultural development projects and programs",
      "Public institutions and Ministry of Agriculture bodies",
      "International organizations and donors",
      "Agritech startups, rural fintechs and impact investors",
      "Logistics, processing and distribution value-chain actors",
    ],
    sections: {
      services: "Core services",
      automation: "Smart automation",
      ai: "AI integration in daily routines",
      data: "Data, mapping and field intelligence",
      projects: "Selected projects",
      odss: "UN SDGs alignment",
      training: "Training and upskilling",
      glossary: "Agro-economy glossary",
    },
    services: [
      {
        title: "Digital marketing and online presence",
        summary: "We build digital ecosystems that attract qualified clients and partners locally and globally.",
        bullets: [
          "Conversion-first multilingual websites",
          "Social media strategy and editorial planning",
          "SEO, targeted campaigns and traffic-focused content",
          "Brand coherence and online reputation",
        ],
        benefits: ["Stronger global visibility", "Higher quality pipeline", "Faster partner acquisition"],
      },
      {
        title: "Workflow automation",
        summary: "We remove repetitive low-value tasks by connecting your key business tools.",
        bullets: [
          "Automated follow-up emails and WhatsApp reminders",
          "Weekly operational reporting generation",
          "Input requests and procurement approval flows",
          "Field data consolidation and anomaly alerts",
        ],
        benefits: ["20-40% admin time savings", "Fewer errors", "Better team focus"],
      },
      {
        title: "Applied AI integration",
        summary: "We help teams use AI to save time and improve decisions, without replacing people.",
        bullets: [
          "AI assistants for emails, reports and meeting notes",
          "Monthly synthesis and documentation generation",
          "Customer support and prospecting copilots",
          "Task prioritization and decision support",
        ],
        benefits: ["Faster decisions", "Higher productivity", "Consistent document quality"],
      },
      {
        title: "Data collection, analytics and mapping",
        summary: "We help organizations own critical data and turn it into actionable insights.",
        bullets: [
          "Offline-first mobile field collection",
          "Executive dashboards and KPI systems",
          "GIS mapping and risk visualization",
          "Climate and production performance tracking",
        ],
        benefits: ["Evidence-based management", "Donor-ready reporting", "Earlier corrective actions"],
      },
      {
        title: "Digital products and agtech innovation",
        summary: "We design and ship web, mobile and AI products that bring digital projects to life.",
        bullets: [
          "Crop disease early detection apps",
          "Farm management and yield tracking apps",
          "B2B marketplaces for producers and buyers",
          "IoT sensors and smart irrigation integration",
        ],
        benefits: ["New digital revenue streams", "Continuous field visibility", "Durable market advantage"],
      },
      {
        title: "Agro-economy, green economy and blockchain",
        summary: "We support value-chain actors on profitability, inclusion and emerging technologies.",
        bullets: [
          "Value-chain economic modeling",
          "Green economy transition plans",
          "Blockchain traceability use-cases",
          "Public-private partnership structuring",
        ],
        benefits: ["Higher value-chain efficiency", "Better partner trust", "Access to blended finance"],
      },
    ],
    automation: [
      {
        process: "Commercial and partner lifecycle",
        examples: [
          "Automatic post-meeting follow-up emails",
          "Quote reminders and missing document nudges",
          "Incoming lead qualification workflows",
        ],
        advantage: "Shorter sales cycle and fewer lost opportunities.",
      },
      {
        process: "Program operations and reporting",
        examples: [
          "Weekly reporting generation",
          "Cross-region consolidation pipelines",
          "Threshold-based KPI alerts",
        ],
        advantage: "Reliable reporting delivered on decision time.",
      },
      {
        process: "Field and quality operations",
        examples: [
          "Rule-based validation of field forms",
          "Real-time quality non-compliance alerts",
          "Automatic incident ticket creation",
        ],
        advantage: "Lower losses and faster operational response.",
      },
    ],
    aiRoutines: [
      {
        persona: "Cooperatives and federations",
        tasks: ["Member communication drafting", "Meeting recap generation", "Campaign planning support"],
        outcomes: ["Lower admin load", "Better field coordination", "Faster planning decisions"],
      },
      {
        persona: "Agro-food companies",
        tasks: ["Sales and inventory analysis", "Compliance report generation", "Customer email assistance"],
        outcomes: ["Better stock control", "Improved responsiveness", "Standardized quality reporting"],
      },
      {
        persona: "NGOs and development programs",
        tasks: ["Cross-team data synthesis", "Donor report preparation", "Learning note generation"],
        outcomes: ["Stronger accountability", "Time savings on donor deliverables", "Knowledge retention"],
      },
    ],
    dataStack: {
      title: "Data and geospatial stack",
      tools: [
        "KoboToolbox, ODK, CommCare",
        "Power BI, Looker Studio, Metabase",
        "QGIS, Mapbox, Google Earth Engine",
        "PostgreSQL/PostGIS, BigQuery, Airtable",
      ],
      copy:
        "We help teams collect the right data, secure it, analyze it, and convert it into practical field actions for productivity, climate resilience and value-chain performance.",
    },
    projects: [
      {
        name: "Le Rural",
        url: "https://lerural.bj",
        context: "Agricultural media and visibility platform for local ecosystems.",
        impact: "Growing audience and stronger visibility for rural initiatives.",
      },
      {
        name: "IDIDONG",
        url: "https://ididong.org",
        context: "Institutional website built for international partnership communication.",
        impact: "Improved brand positioning and clearer conversion pathways.",
      },
    ],
    founder: {
      title: "Founder",
      bio: "Georgeo AGBAHUNGBA, Agro-economist and Software Engineer, bridging value-chain economics and product engineering to deliver practical digital impact.",
    },
    odss: {
      text: "Our interventions align with SDGs by combining inclusion, productivity, climate resilience and digital innovation.",
      chips: ["SDG 1", "SDG 2", "SDG 5", "SDG 8", "SDG 9", "SDG 12", "SDG 13", "SDG 17"],
    },
    blogPosts: [
      {
        category: "Agri AI",
        title: "How a cooperative can adopt AI in 30 days",
        excerpt: "A practical roadmap to start small and create quick operational wins.",
      },
      {
        category: "Automation",
        title: "10 repetitive processes to automate first",
        excerpt: "Follow-ups, reporting, quality checks and stock flows: where to begin.",
      },
      {
        category: "Agro-economy",
        title: "Driving value across the agro-food chain",
        excerpt: "How to identify margin leakage and unlock digital efficiency.",
      },
      {
        category: "Climate",
        title: "Turning climate data into field decisions",
        excerpt: "How to operationalize climate indicators for adaptation strategy.",
      },
    ],
    glossary: [
      {
        term: "Agro-economy",
        definition: "Field studying agricultural production and markets from an economic perspective.",
      },
      {
        term: "Value chain",
        definition: "All actors and activities creating value from production to final consumption.",
      },
      {
        term: "Green economy",
        definition: "Economic model balancing growth, inclusion and environmental sustainability.",
      },
      {
        term: "Traceability",
        definition: "Ability to track product, lot or process history across the entire chain.",
      },
      {
        term: "Smart irrigation",
        definition: "Sensor-driven irrigation using weather and soil data for better water efficiency.",
      },
    ],
    trainings: [
      {
        slug: "ai-routines",
        title: "Practical AI for agribusiness teams",
        format: "Hybrid bootcamp",
        duration: "2 weeks",
        audience: "Managers, operators, support teams",
      },
      {
        slug: "automation-stack",
        title: "Automating workflows without breaking operations",
        format: "Intensive workshop",
        duration: "3 days",
        audience: "Operations leaders and PMs",
      },
      {
        slug: "data-mapping",
        title: "Field data and decision mapping",
        format: "Field + dashboard training",
        duration: "4 weeks",
        audience: "M&E and data teams",
      },
    ],
    contact: {
      title: "Let us discuss your project",
      phonePrimary: contactChannels.phonePrimary,
      phoneSecondary: contactChannels.phoneSecondary,
      whatsapp: contactChannels.whatsapp,
      email: contactChannels.email,
    },
    footer:
      "KijaniLab delivers agritech transformation with measurable impact across marketing, operations, AI and value-chain intelligence.",
  },
};
