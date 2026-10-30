"use client";
import { useActionState } from "react";
import { createBlog, InitBlogStateType } from "../../actions/blogs";

const NewBlog = () => {
  const initialState: InitBlogStateType = {
    errors: [],
    values: { title: "", author: "", url: "" },
  };
  const [state, formAction] = useActionState(createBlog, initialState);
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
