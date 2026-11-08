import { NextResponse } from "next/server";
import { generateToken } from "../../services/users";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const POST = async () => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await generateToken(session.user?.email || "");
  revalidatePath("/me");
  return NextResponse.json({ success: true }, { status: 201 });
};
