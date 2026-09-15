"use client";

import Link from "next/link";
import { useAuthState } from "@/hooks/useAuthState";
import { APP_CENTRAL_NAME } from "@/config/main.config";

export default function Home() {
  const authed = useAuthState();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-white">
        {authed ? "You're signed in." : `Welcome to ${APP_CENTRAL_NAME}`}
      </h1>
      <p className="max-w-md text-lg text-on-surface-variant">
        {authed
          ? "Your session is active on this device."
          : "Sign in or create an account to get started."}
      </p>
      {!authed && (
        <div className="flex gap-4">
          <Link
            href="/login"
            className=" border border-outline px-6 py-2.5 font-medium text-on-surface-variant hover:text-on-surface"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className=" bg-primary px-6 py-2.5 font-medium text-slate-950 hover:bg-amber-500"
          >
            Sign up
          </Link>
        </div>
      )}
    </main>
  );
}
