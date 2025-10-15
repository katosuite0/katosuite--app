'use client';

import { useDictionary } from '@/components/translation-provider';

export function QAChecklist() {
  const {
    dictionary: {
      common: { qaChecklistHeading, qaChecklistItems }
    },
    locale
  } = useDictionary();

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-slate-100 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">{qaChecklistHeading}</h2>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">{locale.toUpperCase()}</span>
      </div>
      <ul className="space-y-3 text-sm text-slate-700">
        {qaChecklistItems.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span aria-hidden className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
