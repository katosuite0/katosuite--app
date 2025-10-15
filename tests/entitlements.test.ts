import { describe, expect, it } from 'vitest';

import { getPlan, listPlans, planIncludes, formatPrice } from '@/lib/entitlements';
import { shouldDisplayWatermark, watermarkCopy } from '@/lib/watermark-policy';

describe('entitlements', () => {
  it('returns all plans with pricing information', () => {
    const plans = listPlans();
    expect(plans.length).toBeGreaterThan(0);
    expect(plans.every((plan) => plan.price > 0)).toBe(true);
  });

  it('finds plans by id and checks for features', () => {
    const plan = getPlan('professional');
    expect(plan?.name).toBe('Professional');
    expect(planIncludes('professional', 'Curriculum alignment')).toBe(true);
    expect(planIncludes('starter', 'Curriculum alignment')).toBe(false);
  });

  it('formats prices consistently', () => {
    const plan = getPlan('starter');
    expect(plan).toBeDefined();
    if (plan) {
      expect(formatPrice(plan)).toBe('$29/month');
    }
  });
});

describe('watermark policy', () => {
  it('displays watermark when no plan is assigned', () => {
    expect(shouldDisplayWatermark({ planId: null })).toBe(true);
  });

  it('uses plan configuration to determine watermark visibility', () => {
    expect(shouldDisplayWatermark({ planId: 'starter' })).toBe(true);
    expect(shouldDisplayWatermark({ planId: 'professional' })).toBe(false);
  });

  it('returns copy used in exports', () => {
    expect(watermarkCopy()).toContain('Draft export');
  });
});
