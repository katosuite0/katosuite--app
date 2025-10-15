import { listPlans, formatPrice } from '@/lib/entitlements';
import { shouldDisplayWatermark } from '@/lib/watermark-policy';

export function PricingTable({ heading, intro }: { heading: string; intro: string }) {
  const plans = listPlans();

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">{heading}</h2>
        <p className="text-sm text-slate-600">{intro}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const watermark = shouldDisplayWatermark({ planId: plan.id });
          const featureList = [
            plan.features.lessonCreation && 'Lesson Creation',
            plan.features.export && 'Export',
            plan.features.library && 'Library Access',
            plan.features.aiGeneration && 'AI Generation',
          ].filter(Boolean) as string[];
          
          return (
            <article key={plan.id} className="flex h-full flex-col justify-between rounded-2xl bg-slate-50 p-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                  <span className="text-sm font-medium text-brand-600">{formatPrice(plan)}</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {featureList.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.limits.lessonsPerMonth === -1 ? (
                    <li className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-500" />
                      <span>Unlimited lessons/month</span>
                    </li>
                  ) : plan.limits.lessonsPerMonth > 0 ? (
                    <li className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-500" />
                      <span>{plan.limits.lessonsPerMonth} lessons/month</span>
                    </li>
                  ) : null}
                </ul>
              </div>
              {watermark ? (
                <p className="mt-6 rounded-full bg-brand-100 px-3 py-1 text-center text-xs font-medium text-brand-700">
                  Draft exports include watermark
                </p>
              ) : (
                <p className="mt-6 text-center text-xs font-medium text-slate-500">Clean, shareable exports</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
