import { NextRequest, NextResponse } from "next/server";
import { getUserWithBlogsByToken } from "../../services/users";

export const GET = async (req: NextRequest) => {
  const req_token = req.headers.get("authorization")?.slice(7);
  if (!req_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await getUserWithBlogsByToken(req_token);
  if (!user) {
    return NextResponse.json({ error: "No found" }, { status: 404 });
  }
  return NextResponse.json(user);
};
