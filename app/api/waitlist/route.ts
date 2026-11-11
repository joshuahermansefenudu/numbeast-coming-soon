import { NextResponse } from "next/server";
import { validateEmail } from "../../../lib/validateEmail";
const FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSfeWNU2BKbkaT3epCuppD2wRqHK801-GzoHtvGYr8ve9aAQ-g/formResponse";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json({ error: "Invalid request" }, { status: 403 });
  try {
    const text = await request.text();
    if (text.length > 1024)
      return NextResponse.json({ error: "Invalid request" }, { status: 413 });
    const { email, website } = JSON.parse(text);
    if (website) return NextResponse.json({ ok: true });
    if (
      typeof email !== "string" ||
      email.length > 254 ||
      !validateEmail(email.trim())
    )
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 },
      );
    const response = await fetch(FORM, {
      method: "POST",
      body: new URLSearchParams({ "entry.632745447": email.trim() }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return NextResponse.json(
        { error: "Could not save your email" },
        { status: 502 },
      );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not save your email" },
      { status: 502 },
    );
  }
}
