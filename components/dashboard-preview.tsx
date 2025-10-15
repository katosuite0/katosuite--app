import { SanitizedContent } from '@/components/sanitized-content';

export function DashboardPreview({ heading, intro }: { heading: string; intro: string }) {
  return (
    <section className="rounded-3xl bg-slate-900 p-8 text-white shadow-lg">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">{heading}</h2>
          <SanitizedContent html={`<p>${intro}</p>`} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Students supported', value: '1,280' },
            { label: 'Accommodations tracked', value: '5,642' },
            { label: 'Parent updates sent', value: '864' }
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-slate-800/60 p-4">
              <p className="text-sm text-slate-300">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
