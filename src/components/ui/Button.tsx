import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--color-brand-dark)] bg-[var(--color-brand-dark)] text-white hover:bg-[#1d3f23]",

  secondary:
    "border border-[var(--color-brand-dark)] bg-transparent text-[var(--color-brand-dark)] hover:bg-[#e9eee3]",

  ghost:
    "border border-transparent bg-transparent text-[var(--color-brand-dark)] hover:bg-[#e9eee3]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-semibold uppercase tracking-wide no-underline transition ${buttonVariants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}