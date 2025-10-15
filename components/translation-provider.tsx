'use client';

import React from 'react';
import type { Locale, Dictionary } from '@/i18n/dictionaries';

type TranslationContextValue = {
  locale: Locale;
  dictionary: Dictionary;
};

const TranslationContext: React.Context<TranslationContextValue | null> = React.createContext(null);

export function TranslationProvider({
  locale,
  dictionary,
  children
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = React.useMemo(() => ({ locale, dictionary }), [locale, dictionary]);

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function useDictionary() {
  const context = React.useContext(TranslationContext);
  if (!context) {
    throw new Error('useDictionary must be used within a TranslationProvider');
  }
  return context;
}
