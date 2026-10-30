import { eq, ilike } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";
import { getCurrentUser } from "./session";

// const blogs = [
//   {
//     id: 1,
//     title: "next.js utilizes React Server Components",
//     author: "devi",
//     url: "http://localhost:3000/",
//     likes: 4,
//   },
//   {
//     id: 2,
//     title: "next.js is built on top of React",
//     author: "yelli",
//     url: "http://localhost:3000/",
//     likes: 10,
//   },
//   {
//     id: 3,
//     title: "next.js supports both static and dynamic rendering",
//     author: "ueii",
//     url: "http://localhost:3000/",
//     likes: 9,
//   },
// ];

// const nextId = 4;

export const getBlogs = (title?: string) => {
  if (title) {
    title = title.trim().toLocaleLowerCase();
    return db.query.blogs.findMany({ where: ilike(blogs.title, `%${title}%`) });
  }
  return db.query.blogs.findMany();
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  await db
    .insert(blogs)
    .values({ title: title, author: author, url: url, userId: user.id });
};

export const getBlogById = (id: number) => {
  return db.query.blogs.findFirst({ where: eq(blogs.id, id) });
};

export const increaseLike = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
};
