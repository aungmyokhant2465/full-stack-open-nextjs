"use client";

import { useActionState } from "react";
import { InitRegisterUserStateType, registerUser } from "../actions/users";

export default function RegisterPage() {
  const initialState: InitRegisterUserStateType = {
    errors: [],
    values: { name: "", username: "", password: "", re_password: "" },
  };
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values.username}
            />
          </label>
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values.name}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              defaultValue={state.values.password}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="re_password"
              required
              defaultValue={state.values.re_password}
            />
          </label>
        </div>
        <button type="submit">Register</button>
        {state.errors.length > 0 &&
          state.errors.map((e, index) => (
            <p key={index} style={{ color: "red" }}>
              {e}
            </p>
          ))}
      </form>
    </div>
  );
}
