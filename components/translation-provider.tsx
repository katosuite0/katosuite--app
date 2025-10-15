'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Locale, Dictionary } from '@/i18n/dictionaries';

type TranslationContextValue = {
  locale: Locale;
  dictionary: Dictionary;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

export function TranslationProvider({
  locale,
  dictionary,
  children
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, dictionary }), [locale, dictionary]);

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function useDictionary() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useDictionary must be used within a TranslationProvider');
  }
  return context;
}
