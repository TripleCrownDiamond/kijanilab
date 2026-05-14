import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  organization?: string;
  projectType?: string;
  message?: string;
  locale?: string;
};

const isText = (value: unknown, min = 2) => typeof value === "string" && value.trim().length >= min;

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  if (!isText(payload.name) || !isText(payload.email) || !isText(payload.message, 10)) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  return NextResponse.json(
    {
      status: "ok",
      lead: {
        ...payload,
        createdAt: new Date().toISOString(),
      },
    },
    { status: 200 },
  );
}
