export type ServicePreview = {
  slug: string;
  title: string;
  summary: string;
  value: string;
  image: string;
};

export type ServiceDetail = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  deliverables: string[];
};

export const keyStats = [
  { label: "Projets livres", value: "48+" },
  { label: "Secteurs actifs", value: "8" },
  { label: "Pays couverts", value: "11" },
];

export const servicePreview: ServicePreview[] = [
  {
    slug: "strategie-digitale",
    title: "Strategie digitale agricole",
    summary:
      "Nous alignons marque, acquisition et conversion pour transformer une presence floue en machine commerciale claire.",
    value: "Pipeline plus qualifie en moins de 90 jours.",
    image:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "data-ia",
    title: "Data, BI et IA metier",
    summary:
      "Nous connectons collecte terrain, dashboards et modeles predictifs pour decisions rapides et mieux justifiees.",
    value: "Moins d'incertitude, plus de decisions actionnables.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "automatisation",
    title: "Automatisation des operations",
    summary:
      "Nous eliminons les goulots d'etranglement avec workflows, alertes intelligentes et rapports automatiques.",
    value: "Jusqu'a 35% de temps gagne sur les operations repetitives.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "produits-digitaux",
    title: "Produits web et mobile",
    summary:
      "Nous livrons des plateformes robustes pour agents terrain, equipes centrales et partenaires de filiere.",
    value: "Des outils utilises au quotidien, pas des prototypes oublies.",
    image:
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "climat-environnement",
    title: "Climat et environnement",
    summary:
      "Nous structurons vos indicateurs de resilience climatique pour piloter adaptation, risques et conformite.",
    value: "Impact environnemental mesurable et defendable.",
    image:
      "https://images.unsplash.com/photo-1530507629858-e4977d30e6c8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "agroalimentaire-tracabilite",
    title: "Agroalimentaire et tracabilite",
    summary:
      "Nous digitalisons la chaine du champ a l'unite de transformation avec preuves qualite en temps reel.",
    value: "Trajectoire produit plus transparente pour clients et bailleurs.",
    image:
      "https://images.unsplash.com/photo-1592982537447-6f2a6a0aa94d?auto=format&fit=crop&w=1400&q=80",
  },
];

export const serviceCatalog: ServiceDetail[] = [
  {
    slug: "strategie-digitale",
    title: "Strategie digitale agricole",
    problem:
      "Votre acquisition est irreguliere et votre discours ne convertit pas assez vite.",
    solution:
      "Audit, repositionnement, plan editorial SEO et architecture de conversion complete.",
    result: "Visibilite mieux ciblee et cout d'acquisition reduit.",
    deliverables: ["Audit digital", "Plan de croissance", "Roadmap SEO", "Playbook contenu"],
  },
  {
    slug: "data-ia",
    title: "Data, BI et IA",
    problem:
      "Les decisions reposent sur des feuilles dispersees et des rapports lents.",
    solution:
      "Pipelines de donnees, dashboards executifs et modules d'aide a la decision basee IA.",
    result: "Pilotage en quasi temps reel avec indicateurs fiables.",
    deliverables: ["Formulaires terrain", "Dashboard BI", "Modeles de prevision", "Cadre de gouvernance data"],
  },
  {
    slug: "automatisation",
    title: "Automatisation des operations",
    problem:
      "Vos equipes perdent du temps sur des taches manuelles repetitives.",
    solution:
      "Conception de workflows metier, orchestration notifications et reporting automatique.",
    result: "Execution plus rapide, moins d'erreurs, equipes plus focus.",
    deliverables: ["Cartographie processus", "Automations no-code/code", "Alerts intelligentes", "Rapports automatiques"],
  },
  {
    slug: "produits-digitaux",
    title: "Produits web et mobile",
    problem: "Vos equipes manquent d'outils metier adaptes a la realite terrain.",
    solution:
      "Conception UX, developpement full-stack et maintenance proactive de solutions sur mesure.",
    result: "Adoption forte et operations harmonisees entre terrain et siege.",
    deliverables: ["App web", "App mobile", "Portail partenaires", "Support evolutif"],
  },
  {
    slug: "climat-environnement",
    title: "Climat et environnement",
    problem:
      "Vous devez prouver vos efforts de resilience sans systeme de suivi coherent.",
    solution:
      "Modeles d'indicateurs, cartographies de risques et tableaux de bord impact.",
    result: "Reporting climat solide pour financeurs et partenaires.",
    deliverables: ["Cadre MRV", "Carte de risques", "Tableau resilience", "Protocoles de suivi"],
  },
  {
    slug: "foresterie",
    title: "Foresterie et ressources naturelles",
    problem: "Le suivi des plantations et des zones forestieres est fragmente.",
    solution:
      "Monitoring geospatial, protocoles terrain et alertes anti-degradation.",
    result: "Visibilite continue sur evolution des ressources forestieres.",
    deliverables: ["Cartes SIG", "Protocoles terrain", "Rapport forestier", "Alerte deforestation"],
  },
  {
    slug: "peche-aquaculture",
    title: "Peche et aquaculture",
    problem: "Les decisions de production sont prises sans telemetry fiable.",
    solution:
      "Suivi qualite eau, tableau rendement et routines d'alerte sanitaire.",
    result: "Meilleure maitrise des cycles et des pertes de production.",
    deliverables: ["Suivi fermes", "Qualite eau", "Tracking rendements", "Reporting sanitaire"],
  },
  {
    slug: "agroalimentaire-tracabilite",
    title: "Agroalimentaire et tracabilite",
    problem: "La chaine qualite manque de preuves centralisees et auditables.",
    solution:
      "Trajectoire lot-produit digitalisee avec preuves qualite et jalons process.",
    result: "Confiance client renforcce et conformite simplifiee.",
    deliverables: ["Tracking lots", "Qualite numerisee", "Historique process", "Rapport conformite"],
  },
];

export const testimonials = [
  {
    name: "Amina Sossa",
    role: "Directrice Programmes",
    organization: "Alliance Riz Ouest Afrique",
    context:
      "Nous devions harmoniser la collecte terrain sur 4 pays avec des donnees heterogenes.",
    result: "Cycle de reporting passe de 21 a 5 jours et visibilite instantanee pour nos bailleurs.",
    quote:
      "KijaniLab a transforme un chaos operationnel en systeme lisible et actionnable.",
  },
  {
    name: "Koffi Kouadio",
    role: "COO",
    organization: "GreenSeed Processing",
    context:
      "Notre unite de transformation perdait des lots faute de tracabilite exploitable.",
    result: "Pertes reduites de 28% et audits qualite passes sans reserve majeure.",
    quote:
      "Leur equipe comprend la realite industrielle, pas seulement le code.",
  },
  {
    name: "Clarisse Mensah",
    role: "Lead Innovation",
    organization: "Programme Climat Sahel",
    context:
      "Nous avions besoin d'un pilotage climat concret pour arbitrer nos investissements.",
    result: "Cadre MRV operationnel en 10 semaines avec indicateurs validates sur le terrain.",
    quote:
      "Chaque livrable etait utile des le premier jour de deploiement.",
  },
];

export const faq = [
  {
    question: "Quel budget minimum pour lancer une mission ?",
    answer:
      "La plupart des missions debutent entre 7 000 EUR et 25 000 EUR selon l'ampleur, le niveau data et les integrations attendues.",
  },
  {
    question: "Combien de temps pour un premier resultat concret ?",
    answer:
      "Un premier lot visible est generalement livre entre 3 et 6 semaines avec une trajectoire complete planifiee au trimestre.",
  },
  {
    question: "Intervenez-vous seulement en agriculture ?",
    answer:
      "Notre coeur est agritech, agroalimentaire et climat. Nous intervenons aussi sur les maillons connexes de la chaine de valeur.",
  },
  {
    question: "Faites-vous le support apres livraison ?",
    answer:
      "Oui, nous proposons un suivi continu: optimisation produit, support utilisateurs et evolutions prioritaires mensuelles.",
  },
];

export const sectors = [
  "Production vegetale",
  "Production animale",
  "Peche et aquaculture",
  "Foresterie",
  "Transformation agroalimentaire",
  "Climat et environnement",
  "Securite alimentaire et nutrition",
  "Genre et inclusion",
];

export const processSteps = [
  {
    title: "Diagnostic",
    description: "Audit express de vos operations, donnees et objectifs business.",
  },
  {
    title: "Cadrage",
    description: "Roadmap priorisee, KPI de succes et architecture de solution.",
  },
  {
    title: "Build",
    description: "Conception produit, implementation technique et tests terrain.",
  },
  {
    title: "Suivi",
    description: "Mesure d'impact, optimisation continue et support equipe.",
  },
];

export const caseStudy = {
  title: "Reseau Cooperatif Coton",
  problem:
    "Donnees rendements, intrants et climat centralisees avec 6 semaines de retard.",
  solution:
    "Mise en place d'une plateforme mobile + BI avec synchronisation offline-first.",
  result:
    "Disponibilite des indicateurs hebdomadaires, +19% de rendement moyen sur 2 campagnes.",
};
