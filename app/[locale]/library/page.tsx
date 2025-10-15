"use client";

import { useTranslations } from "next-intl";

export default function LibraryPage() {
  const t = useTranslations("Library");

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
      <p className="text-gray-600 mb-4">{t("validLessonsOnly")}</p>
      <div className="border rounded-lg p-8 text-center text-gray-500">
        {t("noLessons")}
      </div>
    </main>
  );
}
