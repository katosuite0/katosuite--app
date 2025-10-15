import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { MarketingHighlights } from '@/components/marketing-highlights';
import { Hero } from '@/components/hero';
import { getDictionary, type Locale } from '@/i18n/dictionaries';

export default async function MarketingPage({ params }: { params: { locale: Locale } }) {
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
        <MarketingHighlights
          heading={dictionary.common.marketingHeading}
          intro={dictionary.common.marketingIntro}
          items={dictionary.common.marketingHighlights}
        />
        <Link
          href={`/${params.locale}/dashboard`}
          className="w-fit rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          {params.locale === 'fr' ? 'Voir le tableau de bord' : 'View dashboard'}
        </Link>
      </main>
    </div>
  );
}
