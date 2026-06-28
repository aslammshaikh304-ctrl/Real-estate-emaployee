"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    const { data: lead, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          phone,
          budget,
          location,
          message,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Error adding lead");
      setLoading(false);
      return;
    }

    try {
      await fetch("/api/welcome-automation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId: lead.id,
          event: "new_lead",
        }),
      });
    } catch (err) {
      console.error("Welcome automation failed", err);
    }

    alert("Lead Added Successfully");

    setName("");
    setEmail("");
    setPhone("");
    setBudget("");
    setLocation("");
    setMessage("");

    setLoading(false);

    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border rounded-xl p-6 bg-white shadow-sm"
    >
      <h2 className="text-xl font-bold">
        Add Lead
      </h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border rounded-lg p-3"
        required
      />

      <textarea
        placeholder="Requirements / Message"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border rounded-lg p-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Lead"}
      </button>
    </form>
  );
}