"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "../../db/schema";
import { getUserByUsername } from "../services/users";

export interface InitRegisterUserStateType {
  errors: string[];
  values: {
    name: string;
    username: string;
    password: string;
    re_password: string;
  };
}

export const registerUser = async (
  prevState: InitRegisterUserStateType,
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const re_password = formData.get("re_password") as string;
  const errors: string[] = [];
  if (!username || username.length < 4) {
    errors.push("username must be at least 4 characters long");
  }
  if (!password || password.length < 4) {
    errors.push("password must be at least 4 characters long");
  }
  if (password.length !== re_password.length) {
    errors.push("password and re_password are not match");
  }
  const ex_user = await getUserByUsername(username);
  if (ex_user) {
    errors.push("username is already exited");
  }
  if (errors.length > 0) {
    return { errors, values: { name, username, password, re_password } };
  }
  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};
