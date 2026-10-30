"use server";

import { redirect } from "next/navigation";
import { addBlog, increaseLike } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export const createNote = async (FormData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const title = FormData.get("title") as string;
  const author = FormData.get("author") as string;
  const url = FormData.get("url") as string;
  await addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const increaseBlogLike = async (FormData: FormData) => {
  const id = Number(FormData.get("id"));
  await increaseLike(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
