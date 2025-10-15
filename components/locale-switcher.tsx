'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/i18n/dictionaries';
import { Button } from '@/components/ui/button';

const locales: Locale[] = ['en', 'fr'];

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) return;
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = locale;
    router.push(`/${segments.join('/')}`);
  };

  return (
    <div className="flex gap-3">
      {locales.map((locale) => (
        <Button
          key={locale}
          type="button"
          variant={locale === currentLocale ? 'primary' : 'secondary'}
          onClick={() => handleSwitch(locale)}
          aria-pressed={locale === currentLocale}
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
