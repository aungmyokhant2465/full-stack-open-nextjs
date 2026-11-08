import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { increaseBlogLike } from "@/app/actions/blogs";

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <h3 className="text-xl">
        author : <em>{blog.author}</em>
      </h3>
      <p className="text-xl">
        Likes : <strong>{blog.likes}</strong>
      </p>
      <form action={increaseBlogLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          className="border-2 w-8 h-8 rounded-4xl hover:bg-pink-600 hover:border-2 hover:cursor-pointer"
        >
          &hearts;
        </button>
      </form>
      <p className="text-xl">
        link :
        <a href={blog.url} className="text-blue-600 hover:underline">
          {blog.url}
        </a>
      </p>
    </div>
  );
};

export default Blog;
