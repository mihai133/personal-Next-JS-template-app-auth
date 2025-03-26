"use client";

import { register } from "@/actions/auth";
import { useActionState } from "react";
import Link from "next/link";

export default function Register() {
  const [state, action, isPending] = useActionState(register, null);
  return (
    <div className="container md:w-1/2 mx-auto">
      <h1 className="title ">Register</h1>

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
              <div className="error">
                <p>Passwords must:</p>
                <ul className="list-disc list-inside ml-4">
                  {state?.errors?.password.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="input"
              placeholder="Confirm Password"
              defaultValue={state?.confirmPassword}
            />
            {state?.errors?.confirmPassword && (
              <p className="error">{state?.errors?.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">
            {isPending ? "Loading..." : "Register"}
          </button>

          <Link href="/login" className="text-link">
            or login here
          </Link>
        </div>
      </form>
    </div>
  );
}
