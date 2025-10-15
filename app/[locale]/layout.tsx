 codex/add-automated-github-deployment-script-rziebe
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
=======
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!["en", "fr"].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "KatoSuite",
    "applicationCategory": "EducationalApplication",
    "description": "Lesson Planning Platform",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "0",
      "highPrice": "29.99",
    },
  };

  return (
    <html lang={locale}>
      <head>
        <title>KatoSuite</title>
        <meta name="description" content="KatoSuite - Lesson Planning Platform" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
 main
      </body>
    </html>
  );
}
