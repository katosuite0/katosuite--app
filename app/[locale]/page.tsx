 codex/add-automated-github-deployment-script-04e1zj

 codex/add-automated-github-deployment-script-rziebe
 main
import { Hero } from '@/components/hero';
import { DashboardPreview } from '@/components/dashboard-preview';
import { MarketingHighlights } from '@/components/marketing-highlights';
import { QAChecklist } from '@/components/qa-checklist';
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
        <QAChecklist />
      </main>
    </div>
 codex/add-automated-github-deployment-script-04e1zj


import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">KatoSuite</h1>
      <nav className="space-x-4">
        <Link href="/en/pricing" className="text-blue-600 hover:underline">
          {t("pricing")}
        </Link>
        <Link href="/en/library" className="text-blue-600 hover:underline">
          {t("library")}
        </Link>
        <Link href="/en/lessons" className="text-blue-600 hover:underline">
          {t("lessons")}
        </Link>
      </nav>
    </main>
 main
 main
  );
}
