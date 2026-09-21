import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { increaseBlogLike } from "@/app/actions/blogs";

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <h3>
        author : <em>{blog.author}</em>
      </h3>
      <p>
        Likes : <strong>{blog.likes}</strong>
      </p>
      <form action={increaseBlogLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">&hearts;</button>
      </form>
      <p>
        link : <a href={blog.url}>{blog.url}</a>
      </p>
    </div>
  );
};

export default Blog;
