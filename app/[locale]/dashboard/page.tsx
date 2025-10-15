import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { QAChecklist } from '@/components/qa-checklist';
import { getDictionary, type Locale } from '@/i18n/dictionaries';

export default async function DashboardPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);

  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-slate-900">{dictionary.common.dashboardHeading}</h1>
            <p className="text-slate-600">{dictionary.common.dashboardIntro}</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { label: 'Active lesson plans', value: '148' },
              { label: 'Upcoming IEP meetings', value: '12' },
              { label: 'Family notifications queued', value: '36' }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
        <QAChecklist />
        <Link
          href={`/${params.locale}`}
          className="w-fit rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          ← {params.locale === 'fr' ? 'Retour à l’accueil' : 'Back to home'}
        </Link>
      </main>
    </div>
  );
}
