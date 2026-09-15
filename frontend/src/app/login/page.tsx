"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import Button from "@/components/Button";
import FormField from "@/components/auth/FormField";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      await login(String(form.get("email")), String(form.get("password")));
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Clearance Required"
      title="Sign in to your account"
      description="Use your Officer ID or email to continue."
      footer={
        <p className="text-sm text-on-surface-variant">
          Need an account?{" "}
          <Link href="/signup" className="font-medium text-primary">
            Sign up
          </Link>
        </p>
      }
    >
      <form onSubmit={submit} className="grid gap-4">
        <FormField
          label="Officer ID or Email"
          icon="badge"
          name="email"
          type="text"
          autoComplete="username"
          required
        />
        <FormField
          label="Password"
          icon="lock"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}
        <Button
          action="submit"
          className="mt-2 w-full"
          pending={pending}
          pendingLabel="Signing in…"
          variant="warning"
        >
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}
