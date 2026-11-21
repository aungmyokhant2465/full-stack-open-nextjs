"use server";

import { revalidatePath } from "next/cache";
import { makeRead } from "../services/readingList";

export const makeAsRead = async (FormData: FormData) => {
  const blog_id = FormData.get("blog_id");
  await makeRead(Number(blog_id));
  revalidatePath("/me");
};
