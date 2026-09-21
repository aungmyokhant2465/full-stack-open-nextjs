import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = getBlogs();
  const unsortedBlogs = filter
    ? allBlogs.filter((b) =>
        b.title.toLocaleLowerCase().includes(filter.trim().toLocaleLowerCase()),
      )
    : allBlogs;
  const blogs = unsortedBlogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      <form action={`/blogs`} method="get">
        <input type="search" name="filter" placeholder="Search by title" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title} | likes : <strong>{blog.likes}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
