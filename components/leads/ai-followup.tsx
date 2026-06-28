"use client";

import { useState } from "react";

export default function AIFollowup({
  lead,
}: {
  lead: any;
}) {
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  async function generate() {
    setLoading(true);

    const res = await fetch("/api/ai-followup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    const data = await res.json();

    setResult(data);

    setLoading(false);
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-end">

        <button
          onClick={generate}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          {loading
            ? "Generating..."
            : "✨ Generate AI Follow-up"}
        </button>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="border rounded-xl p-4">
          <h3 className="font-semibold mb-3">
            💬 WhatsApp
          </h3>

          <div className="bg-gray-50 rounded-lg p-4 min-h-[150px] whitespace-pre-wrap">
            {result?.whatsapp ||
              "Click Generate AI Follow-up..."}
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <h3 className="font-semibold mb-3">
            📧 Email
          </h3>

          <div className="bg-gray-50 rounded-lg p-4 min-h-[150px] whitespace-pre-wrap">
            {result?.email ||
              "Click Generate AI Follow-up..."}
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <h3 className="font-semibold mb-3">
            📞 Call Script
          </h3>

          <div className="bg-gray-50 rounded-lg p-4 min-h-[150px] whitespace-pre-wrap">
            {result?.callScript ||
              "Click Generate AI Follow-up..."}
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <h3 className="font-semibold mb-3">
            🎯 Recommendation
          </h3>

          <div className="space-y-3">

            <div className="bg-gray-50 rounded-lg p-4">
              {result?.nextAction ||
                "Next Action"}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              {result?.followupDate ||
                "Suggested Follow-up Date"}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}