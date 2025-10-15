'use client';

import Link from 'next/link';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { useDictionary } from '@/components/translation-provider';

export function SiteHeader() {
  const {
    locale,
    dictionary: {
      common: { tagline }
    }
  } = useDictionary();

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white/80 p-6 backdrop-blur">
      <div className="flex items-center justify-between">
        <Link href={`/${locale}`} className="text-lg font-semibold text-slate-900">
          KatoSuite
        </Link>
        <LocaleSwitcher currentLocale={locale} />
      </div>
      <p className="text-sm text-slate-600">{tagline}</p>
    </header>
  );
}
