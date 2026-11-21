import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }
  const body = await req.json();
  const { username, name, password } = body;
  const hash = await bcrypt.hash(password, 10);
  if (username && name && hash) {
    await db.insert(users).values({ username, name, passwordHash: hash });
    return NextResponse.json({ message: "success" }, { status: 201 });
  }
  return NextResponse.json({ message: "bad request" }, { status: 400 });
};
