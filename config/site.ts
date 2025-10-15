export const siteConfig = {
  name: 'KatoSuite',
  description:
    'KatoSuite helps educators plan inclusive lessons, automate compliance workflows, and deliver insights to stakeholders.',
  defaultLocale: 'en',
  locales: ['en', 'fr'] as const
};

export type SiteConfig = typeof siteConfig;
