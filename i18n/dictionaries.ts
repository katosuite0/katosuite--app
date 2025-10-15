export type Locale = 'en' | 'fr';

export type Dictionary = {
  common: {
    tagline: string;
    heroCta: string;
    heroSubheading: string;
    heroHeading: string;
    dashboardHeading: string;
    dashboardIntro: string;
    marketingHeading: string;
    marketingIntro: string;
    qaChecklistHeading: string;
    qaChecklistItems: string[];
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    common: {
      tagline: 'Built by educators, for educators',
      heroHeading: 'Design inclusive lessons in minutes',
      heroSubheading:
        'KatoSuite combines AI lesson planning, curriculum alignment, and compliance automation into a single workspace.',
      heroCta: 'Start planning',
      dashboardHeading: 'Live classroom insight',
      dashboardIntro:
        'Track accommodations, export evidence for compliance, and collaborate with support teams across your district.',
      marketingHeading: 'Why teams choose KatoSuite',
      marketingIntro:
        'Focus on students instead of paperwork with workflows that automate documentation, reporting, and parent communication.',
      qaChecklistHeading: 'Launch checklist',
      qaChecklistItems: [
        'Health endpoint responds with { ok: true }',
        'GitHub OAuth login returns to dashboard',
        'Stripe checkout triggers Supabase entitlement update',
        'PDF export returns a signed URL',
        'Localization toggle persists between routes',
        'Lighthouse performance ≥ 90 on mobile'
      ]
    }
  },
  fr: {
    common: {
      tagline: 'Créé par des enseignants, pour des enseignants',
      heroHeading: 'Concevez des leçons inclusives en quelques minutes',
      heroSubheading:
        "KatoSuite réunit planification assistée par IA, alignement curriculaire et conformité automatisée dans un même espace.",
      heroCta: 'Commencer',
      dashboardHeading: 'Vue en direct de la classe',
      dashboardIntro:
        "Suivez les adaptations, exportez les preuves pour la conformité et collaborez avec les équipes de soutien du district.",
      marketingHeading: 'Pourquoi les équipes choisissent KatoSuite',
      marketingIntro:
        "Concentrez-vous sur les élèves plutôt que sur l'administratif grâce à des flux qui automatisent la documentation, le reporting et la communication avec les familles.",
      qaChecklistHeading: 'Liste de vérification du lancement',
      qaChecklistItems: [
        "Le point de terminaison de santé répond { ok: true }",
        "La connexion GitHub renvoie vers le tableau de bord",
        "Stripe déclenche la mise à jour des droits dans Supabase",
        "L'export PDF renvoie une URL signée",
        "Le sélecteur de langue persiste entre les pages",
        "Performance Lighthouse ≥ 90 sur mobile"
      ]
    }
  }
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries.en;
}
