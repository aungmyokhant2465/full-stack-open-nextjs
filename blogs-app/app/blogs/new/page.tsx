"use client";
import { useActionState, useEffect } from "react";
import { createBlog, InitBlogStateType } from "../../actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";

const NewBlog = () => {
  const initialState: InitBlogStateType = {
    errors: [],
    values: { title: "", author: "", url: "" },
    success: false,
  };
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="space-y-2">
        <div>
          <label className="space-x-0.5">
            <span className="block">Title</span>
            <input
              type="text"
              name="title"
              required
              defaultValue={state.values.title}
              className="border-2 rounded-sm p-2"
            />
          </label>
        </div>
        <div>
          <label>
            <span className="block">Auther</span>
            <input
              type="text"
              name="author"
              required
              defaultValue={state.values.author}
              className="border-2 rounded-sm p-2"
            />
          </label>
        </div>
        <div>
          <label>
            <span className="block">URL</span>
            <input
              type="text"
              name="url"
              required
              defaultValue={state.values.url}
              className="border-2 rounded-sm p-2"
            />
          </label>
        </div>
        <button
          type="submit"
          className=" text-blue-600 h-10 border-2 p-1 rounded-sm hover:bg-gray-100 hover:border-2 hover:cursor-pointer"
        >
          Create
        </button>
        {state.errors.length > 0 &&
          state.errors.map((e, index) => (
            <p key={index} style={{ color: "red" }}>
              {e}
            </p>
          ))}
      </form>
    </div>
  );
};

export default NewBlog;
