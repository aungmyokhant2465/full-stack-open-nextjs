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
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              required
              defaultValue={state.values.title}
            />
          </label>
        </div>
        <div>
          <label>
            Auther
            <input
              type="text"
              name="author"
              required
              defaultValue={state.values.author}
            />
          </label>
        </div>
        <div>
          <label>
            URL
            <input
              type="text"
              name="url"
              required
              defaultValue={state.values.url}
            />
          </label>
        </div>
        <button type="submit">Create</button>
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
