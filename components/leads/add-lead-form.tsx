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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const { error } = await supabase
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
      ]);

    if (error) {
      console.log(error);
      alert("Error adding lead");
      return;
    }

    alert("Lead Added Successfully");

    setName("");
    setEmail("");
    setPhone("");
    setBudget("");
    setLocation("");
    setMessage("");

    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border rounded-lg p-4"
    >
      <h2 className="text-xl font-semibold">
        Add Lead
      </h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Budget"
        value={budget}
        onChange={(e) =>
          setBudget(e.target.value)
        }
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Requirements / Message"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        rows={4}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save Lead
      </button>
    </form>
  );
}