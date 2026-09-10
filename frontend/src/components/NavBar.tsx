"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearTokens } from "@/lib/auth";
import { useAuthState } from "@/hooks/useAuthState";

export default function NavBar() {
  const router = useRouter();
  const authed = useAuthState();

  function logout() {
    clearTokens();
    router.push("/");
  }

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
      <Link href="/" className="font-semibold text-zinc-950 dark:text-zinc-50">
        Init Repo
      </Link>
      <nav className="flex items-center gap-4 text-sm font-medium">
        {authed ? (
          <button
            onClick={logout}
            className="rounded-full border border-zinc-300 px-4 py-1.5 dark:border-zinc-700"
          >
            Log out
          </button>
        ) : (
          <>
            <Link href="/login" className="text-zinc-700 dark:text-zinc-300">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-indigo-600 px-4 py-1.5 text-white hover:bg-indigo-500"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
