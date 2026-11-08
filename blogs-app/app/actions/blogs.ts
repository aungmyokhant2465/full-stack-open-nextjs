"use server";

import { redirect } from "next/navigation";
import { addBlog, increaseLike } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export interface InitBlogStateType {
  errors: string[];
  values: {
    title: string;
    author: string;
    url: string;
  };
  success: boolean;
}

export const createBlog = async (
  prevState: InitBlogStateType,
  FormData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const title = FormData.get("title") as string;
  const author = FormData.get("author") as string;
  const url = FormData.get("url") as string;
  const errors: string[] = [];
  if (!title || title.length < 5) {
    errors.push("Blog's title must be at least 5 characters long");
  }
  if (!author || author.length < 5) {
    errors.push("Blog's author must be at least 5 characters long");
  }
  if (!url || url.length < 5) {
    errors.push("Blog's url must be at least 5 characters long");
  }
  const values = { title, author, url };
  if (errors.length > 0) {
    return { errors, values, success: false };
  }
  await addBlog(title, author, url);
  revalidatePath("/blogs");
  // redirect("/blogs");
  return { errors: [], values, success: true };
};

export const increaseBlogLike = async (FormData: FormData) => {
  const id = Number(FormData.get("id"));
  await increaseLike(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
