"use server";

import { redirect } from "next/navigation";
import { addBlog, increaseLike } from "../services/blogs";
import { revalidatePath } from "next/cache";

export const createNote = async (FormData: FormData) => {
  const title = FormData.get("title") as string;
  const author = FormData.get("author") as string;
  const url = FormData.get("URL") as string;
  addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const increaseBlogLike = async (FormData: FormData) => {
  const id = Number(FormData.get("id"));
  increaseLike(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
