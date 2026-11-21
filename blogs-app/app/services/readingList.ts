import { db } from "@/db";
import { readingList } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getCurrentUser } from "./session";

export const getReadingList = (user_id: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, user_id),
    with: { blog: true },
  });
};

export const addReadingList = async (blog_id: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  await db.insert(readingList).values({ userId: user.id, blogId: blog_id });
};

export const isAdded = async (blog_id: number) => {
  const user = await getCurrentUser();
  if (!user) {
    return {};
  }
  return db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, user.id),
      eq(readingList.blogId, blog_id),
    ),
  });
};

export const makeRead = async (blog_id: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(eq(readingList.userId, user.id), eq(readingList.blogId, blog_id)),
    );
};
