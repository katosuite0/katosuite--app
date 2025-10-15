import plansData from '@/config/plans.json';

export type Plan = {
  id: string;
  name: string;
  priceUSD: number;
  features: {
    lessonCreation: boolean;
    export: boolean;
    library: boolean;
    aiGeneration: boolean;
  };
  limits: {
    lessonsPerMonth: number;
    exportsPerMinute: number;
    aiRequestsPerMinute: number;
  };
};

const plans: Plan[] = plansData.plans as Plan[];
const planById = new Map(plans.map((plan) => [plan.id, plan] as const));

export function listPlans(): Plan[] {
  return plans;
}

export function getPlan(planId: string): Plan | undefined {
  return planById.get(planId);
}

export function planIncludes(planId: string, feature: keyof Plan['features']): boolean {
  const plan = getPlan(planId);
  if (!plan) {
    return false;
  }

  return plan.features[feature] === true;
}

export function formatPrice(plan: Plan): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return formatter.format(plan.priceUSD);
}
