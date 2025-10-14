import plans from "@/config/plans.json";

export interface Plan {
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
}

export function getPlans(): Plan[] {
  return plans.plans;
}

export function getPlanById(planId: string): Plan | undefined {
  return plans.plans.find((p) => p.id === planId);
}

export function hasLibraryAccess(planId: string): boolean {
  const plan = getPlanById(planId);
  return plan?.features.library || false;
}
