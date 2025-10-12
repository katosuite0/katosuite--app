"use client";

import { useTranslations } from "next-intl";

interface ExportPreviewProps {
  content: string;
  planId: string;
}

export default function ExportPreview({ content, planId }: ExportPreviewProps) {
  const t = useTranslations("Export");
  const showOverlay = planId !== "pro" && planId !== "starter-plus";

  return (
    <div className="relative border rounded-lg p-6 bg-white">
      {showOverlay && (
        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center rounded-lg z-10">
          <div className="bg-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Upgrade to Remove Watermark</h3>
            <p className="text-gray-600 mb-4">Get Starter+ or Pro to export without overlay</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              View Plans
            </button>
          </div>
        </div>
      )}
      
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      
      <footer className="mt-8 pt-4 border-t text-gray-500 text-xs">
        {t("footer")}
      </footer>
    </div>
  );
}
