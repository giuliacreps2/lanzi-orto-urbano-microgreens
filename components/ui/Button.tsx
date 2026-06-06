import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "brand"
  | "ghost"
  | "admin"
  | "adminOutline"
  | "danger";

type BaseButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLinkProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  // ── Brand / pubblico ──────────────────────────────────────────
  primary:
    "border-[1.5px] border-[var(--color-brand-dark)] bg-[var(--color-brand-dark)] text-white hover:bg-[#1d3f23] hover:border-[#1d3f23]",

  secondary:
    "border-[1.5px] border-[var(--color-brand-dark)] bg-transparent text-[var(--color-brand-dark)] hover:bg-[#e9eee3]",

  brand:
    "border-[1.5px] border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-white hover:bg-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)]",

  ghost:
    "border-[1.5px] border-transparent bg-transparent text-[var(--color-brand-dark)] hover:bg-[#e9eee3]",

  // ── Admin ─────────────────────────────────────────────────────
  admin:
    "border-[1.5px] border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-800",

  adminOutline:
    "border-[1.5px] border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50",

  danger:
    "border-[1.5px] border-red-600 bg-red-600 text-white hover:bg-red-500",
};

const baseClasses =
  "inline-flex h-[52px] items-center justify-center gap-2 rounded-[8px] px-7 font-[family-name:var(--font-brand)] text-[0.8rem] font-bold uppercase tracking-[0.07em] no-underline whitespace-nowrap transition-[background-color,color,border-color] duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className, ...rest } = props;
  const classes = cn(baseClasses, variantClasses[variant], className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = rest as Omit<
      ButtonAsLinkProps,
      "children" | "variant" | "className"
    >;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
