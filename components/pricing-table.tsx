import { listPlans, formatPrice, type Plan } from '@/lib/entitlements';
import { shouldDisplayWatermark } from '@/lib/watermark-policy';

export function PricingTable({ heading, intro }: { heading: string; intro: string }) {
  const plans = listPlans();

  const getFeatureList = (features: Plan['features']) => {
    const featureMap: Record<string, string> = {
      lessonCreation: "Lesson Creation",
      export: "Export Lessons",
      library: "Save to Library",
      aiGeneration: "AI Generation"
    };
    
    return Object.entries(features)
      .filter(([_, enabled]) => enabled === true)
      .map(([key, _]) => featureMap[key])
      .filter((name): name is string => typeof name === "string");
  };

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">{heading}</h2>
        <p className="text-sm text-slate-600">{intro}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const watermark = shouldDisplayWatermark({ planId: plan.id });
          const featuresList = getFeatureList(plan.features);
          
          return (
            <article key={plan.id} className="flex h-full flex-col justify-between rounded-2xl bg-slate-50 p-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                  <span className="text-sm font-medium text-brand-600">{formatPrice(plan)}</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {featuresList.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-slate-500">
                  {plan.limits.lessonsPerMonth === -1 
                    ? "Unlimited lessons"
                    : `${plan.limits.lessonsPerMonth} lessons/month`}
                </div>
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
