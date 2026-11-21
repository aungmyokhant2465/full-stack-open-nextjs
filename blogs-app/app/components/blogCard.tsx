import { addToReadingList, increaseBlogLike } from "../actions/blogs";
import { isAdded } from "../services/readingList";

export default async function BlogCard({
  id,
  title,
  author,
  likes,
  url,
}: {
  id: number;
  title: string;
  author: string;
  likes: number;
  url: string;
}) {
  const isAlreadyAdded = await isAdded(id);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-4xl font-semibold leading-snug">
        <a
          data-url
          className="rounded hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          href="#"
        >
          {title}
        </a>
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        By{" "}
        <span
          data-author
          className="font-medium text-slate-700 dark:text-slate-200"
        >
          {author}
        </span>
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <form action={increaseBlogLike}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            data-like
            aria-pressed="false"
            className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 aria-pressed:border-rose-300 aria-pressed:bg-rose-50 aria-pressed:text-rose-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-rose-950 dark:aria-pressed:bg-rose-950 dark:aria-pressed:text-rose-400"
          >
            <svg
              className="h-4 w-4 fill-none group-aria-pressed:fill-current"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.3 6.3a5 5 0 0 1 7.1 0l.6.6.6-.6a5 5 0 1 1 7.1 7.1L12 20.9l-7.7-7.5a5 5 0 0 1 0-7.1Z"
              />
            </svg>
            <span data-like-count>{likes}</span>
            <span className="sr-only">likes</span>
          </button>
        </form>
        {!isAlreadyAdded && (
          <form action={addToReadingList}>
            <input type="hidden" name="blog_id" value={id} />
            <button
              type="submit"
              data-save
              aria-pressed="false"
              className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 aria-pressed:border-indigo-300 aria-pressed:bg-indigo-50 aria-pressed:text-indigo-700 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:aria-pressed:bg-indigo-950 dark:aria-pressed:text-indigo-300"
            >
              <svg
                className="h-4 w-4 fill-none group-aria-pressed:fill-current"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 4h12v17l-6-4-6 4V4Z"
                />
              </svg>
              <span data-save-label>Add to reading list</span>
            </button>
          </form>
        )}

        <a
          data-read
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-sm font-medium text-indigo-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400"
        >
          Read post
        </a>
      </div>
    </article>
  );
}
