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
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-8">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-40 left-1/2 h-[360px] w-[720px] -translate-x-1/2   bg-primary/20 blur-[130px]" />
        <div className="absolute -bottom-32 left-1/2 h-[280px] w-[600px] -translate-x-1/2   bg-secondary/10 blur-[140px]" />
      </div>
      <section className="relative w-full max-w-md rounded-2xl border border-outline-variant/80 bg-surface-container-low/90 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        <div className="mb-5 flex items-center justify-between border-b border-outline-variant/80 pb-5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5   bg-primary" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-primary/90 uppercase">
              {eyebrow}
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">{description}</p>
        <div className="mt-6 grid gap-4">{children}</div>
        <div className="mt-6 border-t border-outline-variant/80 pt-4 text-center">
          {footer}
        </div>
      </section>
    </main>
  );
}
