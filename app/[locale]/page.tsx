import { Hero } from '@/components/hero';
import { DashboardPreview } from '@/components/dashboard-preview';
import { MarketingHighlights } from '@/components/marketing-highlights';
import { QAChecklist } from '@/components/qa-checklist';
import { PricingTable } from '@/components/pricing-table';
import { SiteHeader } from '@/components/site-header';
import { getDictionary, type Locale } from '@/i18n/dictionaries';

export default async function LocaleHome({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);

  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10">
        <Hero
          heading={dictionary.common.heroHeading}
          subheading={dictionary.common.heroSubheading}
          cta={dictionary.common.heroCta}
          tagline={dictionary.common.tagline}
        />
        <DashboardPreview
          heading={dictionary.common.dashboardHeading}
          intro={dictionary.common.dashboardIntro}
        />
        <MarketingHighlights
          heading={dictionary.common.marketingHeading}
          intro={dictionary.common.marketingIntro}
        />
        <PricingTable
          heading={dictionary.common.pricingHeading}
          intro={dictionary.common.pricingIntro}
        />
        <QAChecklist />
      </main>
    </div>
  );
}
