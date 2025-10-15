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
    pricingHeading: string;
    pricingIntro: string;
    pricingBetaTitle: string;
    pricingBetaBody: string;
    qaChecklistHeading: string;
    qaChecklistItems: string[];
    marketingHighlights: { title: string; body: string }[];
    dashboardMetrics: { label: string; value: string }[];
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
      pricingHeading: 'Choose the right plan for your school',
      pricingIntro: 'Start with a guided rollout, then scale district-wide when your team is ready.',
      pricingBetaTitle: 'New tools & updates in beta testing',
      pricingBetaBody: 'Free to try regardless of your plan—while supplies last. Features may change before general availability.',
      qaChecklistHeading: 'Launch checklist',
      qaChecklistItems: [
        'Health endpoint responds with { ok: true }',
        'GitHub OAuth login returns to dashboard',
        'Stripe checkout triggers Supabase entitlement update',
        'PDF export returns a signed URL',
        'Localization toggle persists between routes',
        'Lighthouse performance ≥ 90 on mobile'
      ],
      marketingHighlights: [
        {
          title: 'AI lesson planning',
          body: 'Draft accommodations, objectives, and assessments that stay aligned to your district standards.'
        },
        {
          title: 'Automated compliance',
          body: 'Generate documentation with one click, including parent letters, meeting notes, and progress updates.'
        },
        {
          title: 'Collaboration tools',
          body: 'Share plans with co-teachers, counselors, and specialists across schools with granular permissions.'
        }
      ],
      dashboardMetrics: [
        {
          label: 'Educators collaborating this week',
          value: '{{educator_count}}'
        },
        {
          label: 'Lessons generated with AI guidance',
          value: '{{lesson_count}}'
        },
        {
          label: 'Family updates delivered',
          value: '{{family_update_count}}'
        }
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
      pricingHeading: 'Choisissez l’offre adaptée à votre établissement',
      pricingIntro: 'Démarrez en douceur, puis déployez à l’échelle du district lorsque votre équipe est prête.',
      pricingBetaTitle: 'Nouveaux outils et mises à jour en bêta',
      pricingBetaBody: 'Essayez-les gratuitement quel que soit votre plan – disponibilité limitée. Les fonctionnalités peuvent évoluer avant le lancement officiel.',
      qaChecklistHeading: 'Liste de vérification du lancement',
      qaChecklistItems: [
        "Le point de terminaison de santé répond { ok: true }",
        'La connexion GitHub renvoie vers le tableau de bord',
        'Stripe déclenche la mise à jour des droits dans Supabase',
        'L’export PDF renvoie une URL signée',
        'Le sélecteur de langue persiste entre les pages',
        'Performance Lighthouse ≥ 90 sur mobile'
      ],
      marketingHighlights: [
        {
          title: 'Planification de leçons avec IA',
          body: 'Générez des adaptations, des objectifs et des évaluations alignés sur les cadres provinciaux en quelques clics.'
        },
        {
          title: 'Conformité automatisée',
          body: 'Créez la documentation nécessaire – lettres aux familles, comptes rendus de réunion, mises à jour de progrès – en un clic.'
        },
        {
          title: 'Collaboration simplifiée',
          body: 'Partagez les plans avec les coenseignants, spécialistes et directions avec des autorisations fines.'
        }
      ],
      dashboardMetrics: [
        {
          label: 'Éducateurs actifs cette semaine',
          value: '{{educator_count}}'
        },
        {
          label: 'Leçons générées avec l’IA',
          value: '{{lesson_count}}'
        },
        {
          label: 'Mises à jour envoyées aux familles',
          value: '{{family_update_count}}'
        }
      ]
    }
  }
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries.en;
}
