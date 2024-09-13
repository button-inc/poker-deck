"use server";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const cookieName =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: `${process.env.AUTH_SECRET}`,
    salt: cookieName,
    cookieName: cookieName,
  });
  return NextResponse.json(token, { status: 200 });
}
