import plansData from '@/config/plans.json';

export type Plan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingInterval: 'month' | 'year';
  features: string[];
  watermark: boolean;
};

const plans: Plan[] = plansData as Plan[];
const planById = new Map(plans.map((plan) => [plan.id, plan] as const));

export function listPlans(): Plan[] {
  return plans;
}

export function getPlan(planId: string): Plan | undefined {
  return planById.get(planId);
}

export function planIncludes(planId: string, feature: string): boolean {
  const plan = getPlan(planId);
  if (!plan) {
    return false;
  }

  return plan.features.some((item) => item.toLowerCase() === feature.toLowerCase());
}

export function formatPrice(plan: Plan): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: plan.currency,
    minimumFractionDigits: 0
  });

  const amount = formatter.format(plan.price);
  return `${amount}/${plan.billingInterval}`;
}
