"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddSiteVisitForm() {
  const [leadId, setLeadId] = useState<number | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] =
    useState<any>(null);

  const [propertyName, setPropertyName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [status, setStatus] = useState("Scheduled");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("id,name,email,phone");

    if (error) {
      console.log(error);
      return;
    }

    setLeads(data || []);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!leadId) {
      alert("Please select a lead");
      return;
    }

    const { error } = await supabase
      .from("site_visits")
      .insert([
        {
          lead_id: leadId,
          property_name: propertyName,
          visit_date: visitDate,
          visit_time: visitTime,
          status,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Error creating site visit");
      return;
    }

    alert("Site Visit Scheduled");

    setLeadId(null);
    setSelectedLead(null);
    setPropertyName("");
    setVisitDate("");
    setVisitTime("");
    setStatus("Scheduled");

    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-lg p-4 mb-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">
        Schedule Site Visit
      </h2>

      <select
        value={leadId || ""}
        onChange={(e) => {
          const id = Number(e.target.value);

          setLeadId(id);

          const lead = leads.find(
            (l) => l.id === id
          );

          setSelectedLead(lead);
        }}
        className="w-full border p-2 rounded"
      >
        <option value="">
          Select Lead
        </option>

        {leads.map((lead) => (
          <option
            key={lead.id}
            value={lead.id}
          >
            {lead.name}
          </option>
        ))}
      </select>

      {selectedLead && (
        <div className="border rounded-lg p-3 bg-gray-50">
          <p>
            👤 {selectedLead.name}
          </p>

          <p>
            📧 {selectedLead.email}
          </p>

          <p>
            📞 {selectedLead.phone}
          </p>
        </div>
      )}

      <input
        type="text"
        placeholder="Property Name"
        value={propertyName}
        onChange={(e) =>
          setPropertyName(e.target.value)
        }
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="date"
        value={visitDate}
        onChange={(e) =>
          setVisitDate(e.target.value)
        }
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="11:00 AM"
        value={visitTime}
        onChange={(e) =>
          setVisitTime(e.target.value)
        }
        className="w-full border p-2 rounded"
        required
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="w-full border p-2 rounded"
      >
        <option value="Scheduled">
          Scheduled
        </option>

        <option value="Completed">
          Completed
        </option>

        <option value="Cancelled">
          Cancelled
        </option>
      </select>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Schedule Visit
      </button>
    </form>
  );
}