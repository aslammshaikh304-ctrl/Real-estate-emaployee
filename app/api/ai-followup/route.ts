import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const lead = await request.json();

  const response = await fetch(
    "http://localhost:5678/webhook-test/ai-followup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}