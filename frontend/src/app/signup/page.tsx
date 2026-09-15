"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import Button from "@/components/Button";
import FormField from "@/components/auth/FormField";
import { signup } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      await signup({
        email: String(form.get("email")),
        password: String(form.get("password")),
        first_name: String(form.get("first_name") ?? ""),
        last_name: String(form.get("last_name") ?? ""),
      });
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Request Access"
      title="Create your account"
      description="Use your email address to continue."
      footer={
        <p className="text-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={submit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="First name"
            name="first_name"
            autoComplete="given-name"
          />
          <FormField
            label="Last name"
            name="last_name"
            autoComplete="family-name"
          />
        </div>
        <FormField
          label="Email address"
          icon="mail"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <FormField
          label="Password"
          icon="lock"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
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
          pendingLabel="Creating account…"
          variant="success"
        >
          Create account
        </Button>
      </form>
    </AuthCard>
  );
}
