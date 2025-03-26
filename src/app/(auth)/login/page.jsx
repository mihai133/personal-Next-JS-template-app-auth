"use client";

import { login } from "@/actions/auth";
import { useActionState } from "react";
import Link from "next/link";

export default function Login() {
  const [state, action, isPending] = useActionState(login, null);
  return (
    <div className="container w-1/2 mx-auto">
      <h1 className="title ">Login</h1>

      <form action={action} className="space-y-4">
        <div>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              placeholder="Email"
              defaultValue={state?.email}
            />
            {state?.errors?.email && (
              <p className="error">{state?.errors?.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="Password"
              defaultValue={state?.password}
            />
            {state?.errors?.password && (
              <p className="error">{state?.errors?.password}</p>
            )}
          </div>
        </div>

        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">
            {isPending ? "Loading..." : "Login"}
          </button>

          <Link href={"/register"} className="text-link">
            or register here
          </Link>
        </div>
      </form>
    </div>
  );
}
