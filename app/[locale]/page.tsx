import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">KatoSuite</h1>
      <nav className="space-x-4">
        <Link href="/en/pricing" className="text-blue-600 hover:underline">
          {t("pricing")}
        </Link>
        <Link href="/en/library" className="text-blue-600 hover:underline">
          {t("library")}
        </Link>
        <Link href="/en/lessons" className="text-blue-600 hover:underline">
          {t("lessons")}
        </Link>
      </nav>
    </main>
  );
}
