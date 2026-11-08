import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = await getBlogs(filter);
  // const unsortedBlogs = filter
  //   ? allBlogs.filter((b) =>
  //       b.title.toLocaleLowerCase().includes(filter.trim().toLocaleLowerCase()),
  //     )
  //   : allBlogs;
  const blogs = allBlogs.sort((a, b) => b.likes - a.likes);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form className="mb-4" action={`/blogs`} method="get">
        <input
          className="border-2 rounded-sm p-2"
          type="search"
          name="filter"
          placeholder="Search by title"
        />
        <button
          className=" text-blue-600 ml-1 h-10 border-2 p-1 rounded-sm hover:bg-gray-100 hover:border-2 hover:cursor-pointer"
          type="submit"
        >
          Search
        </button>
      </form>
      <ul className="space-y-2">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
              {blog.title} | likes : <strong>{blog.likes}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
