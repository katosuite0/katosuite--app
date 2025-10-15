import { SanitizedContent } from '@/components/sanitized-content';

export type MarketingHighlight = {
  title: string;
  body: string;
};

export function MarketingHighlights({
  heading,
  intro,
  items
}: {
  heading: string;
  intro: string;
  items: MarketingHighlight[];
}) {
  return (
    <section className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">{heading}</h2>
        <SanitizedContent html={`<p>${intro}</p>`} />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="space-y-3 rounded-2xl border border-slate-200 p-5">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
