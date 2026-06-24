"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddPropertyForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bhk, setBhk] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("properties")
      .insert([
        {
          name,
          location,
          bhk,
          price: Number(price),
          description,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Property Added");

    setName("");
    setLocation("");
    setBhk("");
    setPrice("");
    setDescription("");

    window.location.reload();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-xl p-6 bg-white mb-6"
    >
      <h2 className="text-xl font-bold mb-4">
        Add Property
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          placeholder="Property Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border rounded-lg p-3"
          required
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="border rounded-lg p-3"
          required
        />

        <input
          placeholder="BHK"
          value={bhk}
          onChange={(e) =>
            setBhk(e.target.value)
          }
          className="border rounded-lg p-3"
          required
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="border rounded-lg p-3"
          required
        />

      </div>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="border rounded-lg p-3 w-full mt-4"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        {loading
          ? "Adding..."
          : "+ Add Property"}
      </button>
    </form>
  );
}