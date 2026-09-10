"use client";

import Link from "next/link";
import { useAuthState } from "@/hooks/useAuthState";

export default function Home() {
  const authed = useAuthState();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {authed ? "You're signed in." : "Welcome to Init Repo"}
      </h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        {authed
          ? "Your session is active on this device."
          : "Sign in or create an account to get started."}
      </p>
      {!authed && (
        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded-full border border-zinc-300 px-6 py-2.5 font-medium dark:border-zinc-700"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-500"
          >
            Sign up
          </Link>
        </div>
      )}
    </main>
  );
}
