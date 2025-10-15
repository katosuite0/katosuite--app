import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/dictionaries';
import { getDictionary } from '@/i18n/dictionaries';
import { TranslationProvider } from '@/components/translation-provider';

export const dynamic = 'force-static';

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  const dictionary = await getDictionary(params.locale);

  return (
    <html lang={params.locale}>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <TranslationProvider locale={params.locale} dictionary={dictionary}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
