"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { clearTokens } from "@/lib/auth";
import { useAuthState } from "@/hooks/useAuthState";
import { APP_CENTRAL_NAME } from "@/config/main.config";

export default function NavBar() {
  const router = useRouter();
  const authed = useAuthState();

  function logout() {
    clearTokens();
    router.push("/");
  }

  return (
    <header className="flex items-center justify-between border-b border-outline-variant/30 px-6 py-4">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-mono text-sm font-semibold tracking-wider text-slate-100 uppercase">
          {APP_CENTRAL_NAME}
        </span>
        <span className="text-xs text-outline-variant">{"//"}</span>
        <span className="font-mono text-[11px] tracking-widest text-primary uppercase">
          Criminal Intel
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm font-medium">
        {authed ? (
          <Button
            onClick={logout}
            className="py-1.5 shadow-none hover:bg-transparent hover:shadow-none"
            variant="neutral"
          >
            Log out
          </Button>
        ) : (
          <>
            <Link href="/login" className="text-on-surface-variant">
              Log in
            </Link>
            <Link
              href="/signup"
              className=" bg-primary px-4 py-1.5 text-slate-950 hover:bg-amber-500"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
