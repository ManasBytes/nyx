import { ReactNode } from "react";

export default function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 p-6 dark:bg-black">
      <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-10 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {title}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
        <div className="mt-7 grid gap-4">{children}</div>
        <div className="mt-5">{footer}</div>
      </section>
    </main>
  );
}
