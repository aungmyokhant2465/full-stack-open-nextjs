import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { getUserWithBlogs } from "../services/users";
import { generateUserToken } from "../actions/users";

const Me = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserWithBlogs(session.user?.email || "");
  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <article className="my-2">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p className="my-1">
          <span>Name : </span>
          {user.name}
        </p>
        <p>
          <span>Username : </span>
          {user.username}
        </p>
      </article>
      <hr />
      <article>
        <h2 className="text-2xl font-bold mb-4">API Token</h2>
        <div className="m-1 p-1 bg-gray-400">
          <h4>Current token:</h4>
          <p className="m-1 p-1 bg-gray-600">
            {user.token ?? "no token has been generated yet"}
          </p>
        </div>
        <form action={generateUserToken}>
          <input type="hidden" name="username" value={user.username} />
          <button
            type="submit"
            className=" text-blue-600 h-10 border-2 p-1 px-2 rounded-sm hover:bg-gray-100 hover:border-2 hover:cursor-pointer"
          >
            Generate New Token
          </button>
        </form>
      </article>
    </div>
  );
};

export default Me;
