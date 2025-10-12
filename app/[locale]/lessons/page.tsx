"use client";

import { useState } from "react";
import ExportPreview from "@/components/ExportPreview";

export default function LessonsPage() {
  const [content, setContent] = useState("<h2>Sample Lesson</h2><p>This is a sample lesson content.</p>");
  const [planId, setPlanId] = useState("free");

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Lesson Editor</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block mb-2 font-semibold">Content Editor</label>
          <textarea
            className="w-full h-64 border rounded p-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-semibold">Plan Selection</label>
          <select
            className="w-full border rounded p-2 mb-4"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
          >
            <option value="free">Free</option>
            <option value="starter-plus">Starter+</option>
            <option value="pro">Pro</option>
          </select>
          
          <h2 className="font-semibold mb-2">Export Preview</h2>
          <ExportPreview content={content} planId={planId} />
        </div>
      </div>
    </main>
  );
}
