import { useTranslations } from "next-intl";
import plans from "@/config/plans.json";

export default function PricingPage() {
  const t = useTranslations("Pricing");

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.plans.map((plan) => (
          <div
            key={plan.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold mb-6">
              ${plan.priceUSD.toFixed(2)}
              <span className="text-sm font-normal text-gray-600">
                {" "}
                {t("perMonth")}
              </span>
            </p>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">{t("features")}</h3>
              <ul className="space-y-2">
                {plan.features.library && (
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Library Access
                  </li>
                )}
                {plan.features.aiGeneration && (
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    AI Generation
                  </li>
                )}
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Export Lessons
                </li>
              </ul>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              {t("selectPlan")}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
