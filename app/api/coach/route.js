import { NextResponse } from "next/server";

function fallbackTip({ character, course, combo }) {
  const terrain = course?.terrain || "mixed";
  const focus = combo?.focus || "balanced";
  return `Use ${character?.name || "your driver"} with ${combo?.kart || "your kart"} on ${course?.name || "this course"}. Keep your line tight in ${terrain} sections and prioritize ${focus} decisions over risky item plays. Save mushrooms for corners where you can skip braking, not just long straights.`;
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const { character, course, combo } = payload || {};

    if (!character || !course || !combo) {
      return NextResponse.json({ error: "Missing character, course, or combo." }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ tip: fallbackTip({ character, course, combo }), source: "fallback" });
    }

    const prompt = `Tip for ${character.name} (${character.weight}) with ${combo.kart} on ${course.name}. Terrain: ${course.terrain}, ${course.straights}% straights, ${course.turns}% turns, ${course.offroad}% off-road. Focus: ${combo.focus}. Give 3-4 short sentences in coach voice.`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-latest",
        max_tokens: 220,
        system: "You are an expert Mario Kart World coach. Keep advice specific, concise, and practical.",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ tip: fallbackTip({ character, course, combo }), source: "fallback" });
    }

    const data = await res.json();
    const tip = (data.content || []).find((c) => c.type === "text")?.text;

    return NextResponse.json({ tip: tip || fallbackTip({ character, course, combo }), source: "anthropic" });
  } catch {
    return NextResponse.json({ tip: "Coach feed unavailable. Stay smooth on exits and protect your top speed through the last sector.", source: "fallback" });
  }
}