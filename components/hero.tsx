import { Button } from '@/components/ui/button';
import { SanitizedContent } from '@/components/sanitized-content';

export function Hero({ heading, subheading, cta, tagline }: { heading: string; subheading: string; cta: string; tagline: string }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="md:w-2/3 space-y-5">
          <p className="text-sm font-medium text-brand-600">{tagline}</p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{heading}</h1>
          <div className="text-lg text-slate-600">
            <SanitizedContent html={`<p>${subheading}</p>`} />
          </div>
          <Button className="w-fit text-base" variant="primary">
            {cta}
          </Button>
        </div>
        <div className="md:w-1/3">
          <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-6 text-sm text-brand-800">
            <p className="font-semibold">Release-ready validations</p>
            <ul className="mt-4 space-y-2 text-brand-700">
              <li>✓ Automated TypeScript checks</li>
              <li>✓ Production build smoke tests</li>
              <li>✓ Stripe and Supabase integrations</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
