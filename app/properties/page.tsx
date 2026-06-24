import AddPropertyForm from "@/components/properties/add-property-form";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function PropertiesPage() {
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .order("id", { ascending: false });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Properties
        </h1>

        <div className="border rounded-lg px-4 py-2">
          Total Properties: {properties?.length || 0}
        </div>
      </div>

      <AddPropertyForm />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {properties?.map((property) => (
          <Link
            key={property.id}
            href={`/properties/${property.id}`}
          >
            <div className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition cursor-pointer h-full">
              <h2 className="text-lg font-bold">
                🏢 {property.name}
              </h2>

              <p className="mt-2">
                📍 {property.location}
              </p>

              <p>
                🏠 {property.bhk}
              </p>

              <p>
                💰 ₹
                {Number(property.price).toLocaleString()}
              </p>

              {property.description && (
                <p className="text-sm text-gray-500 mt-3">
                  {property.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}