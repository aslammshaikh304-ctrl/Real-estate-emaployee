"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalSearch() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      const res = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );

      const data = await res.json();

      setResults(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-xl">

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search leads, properties..."
        className="w-full rounded-xl border p-3 shadow-sm"
      />

      {loading && (
        <div className="absolute right-4 top-4 text-sm">
          Searching...
        </div>
      )}

      {results && (

        <div className="absolute z-50 mt-2 w-full rounded-xl border bg-white shadow-xl max-h-[500px] overflow-y-auto">

          {/* Leads */}

          {results.leads?.length > 0 && (

            <div className="p-3">

              <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">
                Leads
              </h3>

              {results.leads.map((lead: any) => (

                <button
                  key={lead.id}
                  onClick={() =>
                    router.push(`/leads`)
                  }
                  className="w-full text-left rounded-lg p-3 hover:bg-gray-100"
                >

                  <div className="font-semibold">
                    {lead.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {lead.phone}
                  </div>

                </button>

              ))}

            </div>

          )}

          {/* Properties */}

          {results.properties?.length > 0 && (

            <div className="border-t p-3">

              <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">
                Properties
              </h3>

              {results.properties.map((property: any) => (

                <button
                  key={property.id}
                  onClick={() =>
                    router.push("/properties")
                  }
                  className="w-full text-left rounded-lg p-3 hover:bg-gray-100"
                >

                  <div className="font-semibold">
                    {property.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {property.location}
                  </div>

                </button>

              ))}

            </div>

          )}

          {/* Followups */}

          {results.followups?.length > 0 && (

            <div className="border-t p-3">

              <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">
                Followups
              </h3>

              {results.followups.map((item: any) => (

                <button
                  key={item.id}
                  onClick={() =>
                    router.push("/followups")
                  }
                  className="w-full text-left rounded-lg p-3 hover:bg-gray-100"
                >

                  {item.followup_message}

                </button>

              ))}

            </div>

          )}

          {/* Site Visits */}

          {results.siteVisits?.length > 0 && (

            <div className="border-t p-3">

              <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">
                Site Visits
              </h3>

              {results.siteVisits.map((visit: any) => (

                <button
                  key={visit.id}
                  onClick={() =>
                    router.push("/site-visits")
                  }
                  className="w-full text-left rounded-lg p-3 hover:bg-gray-100"
                >

                  <div className="font-semibold">
                    {visit.property_name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {visit.visit_date}
                  </div>

                </button>

              ))}

            </div>

          )}

        </div>

      )}

    </div>
  );
}