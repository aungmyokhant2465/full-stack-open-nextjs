import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { getUserWithBlogs } from "../services/users";
import { generateUserToken } from "../actions/users";
import { getReadingList } from "../services/readingList";
import { makeAsRead } from "../actions/readinglist";

const Me = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserWithBlogs(session.user?.email || "");
  if (!user) {
    notFound();
  }
  const reading_list = await getReadingList(user.id);
  const unread_list = reading_list.filter((b) => b.read === false);
  const readed_list = reading_list.filter((b) => b.read);

  return (
    <div className="max-w-2xl mx-auto p-6" data-testid="user-profile">
      <article className="my-2">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p className="my-1" data-testid="user-name">
          <span>Name : </span>
          {user.name}
        </p>
        <p data-testid="user-username">
          <span>Username : </span>
          {user.username}
        </p>
      </article>
      <hr />
      <section data-testid="reading-list-section">
        {reading_list.length > 0 ? (
          <>
            <h3>Reading list</h3>
            <article data-testid="unread-section">
              <h4>Unread ({unread_list.length})</h4>
              {unread_list.length > 0 ? (
                <ul className="text-black">
                  {unread_list &&
                    unread_list.map((l) => (
                      <li
                        key={l.id}
                        className="my-1 p-1 bg-amber-50 flex justify-between"
                      >
                        {l.blog.title}
                        <form action={makeAsRead}>
                          <input
                            type="hidden"
                            name="blog_id"
                            value={l.blog.id}
                          />
                          <button
                            type="submit"
                            data-like
                            aria-pressed="false"
                            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium bg-green-800 text-white transition hover:border-rose-300 hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 aria-pressed:border-rose-300 aria-pressed:bg-rose-50 aria-pressed:text-rose-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-rose-950 dark:aria-pressed:bg-rose-950 dark:aria-pressed:text-rose-400"
                            data-testid="mark-read-"
                          >
                            make as read
                          </button>
                        </form>
                      </li>
                    ))}
                </ul>
              ) : (
                <p data-testid="no-unread-blogs">empyt unread list</p>
              )}
            </article>
            <article>
              <h4>Readed ({readed_list.length})</h4>
              <ul className="text-black">
                {readed_list &&
                  readed_list.map((l) => (
                    <li key={l.id} className="my-1 p-1 bg-green-200">
                      {l.blog.title}
                    </li>
                  ))}
              </ul>
            </article>
          </>
        ) : (
          <p data-testid="empty-reading-list">empty</p>
        )}
      </section>
      <hr />
      <article data-testid="api-token-section">
        <h2 className="text-2xl font-bold mb-4">API Token</h2>
        <div className="m-1 p-1 bg-gray-400" data-testid="token-display">
          <h4>Current token:</h4>
          <p className="m-1 p-1 bg-gray-600">
            {user.token ? (
              <code data-testid="api-token">{user.token}</code>
            ) : (
              <span data-testid="no-token-message">
                no token has been generated yet
              </span>
            )}
          </p>
        </div>
        <form action={generateUserToken}>
          <input type="hidden" name="username" value={user.username} />
          <button
            type="submit"
            className=" text-blue-600 h-10 border-2 p-1 px-2 rounded-sm hover:bg-gray-100 hover:border-2 hover:cursor-pointer"
            data-testid="generate-token-button"
          >
            Generate New Token
          </button>
        </form>
      </article>
    </div>
  );
};

export default Me;
