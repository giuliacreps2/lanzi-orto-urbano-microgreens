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
  | "ghost"
  | "admin"
  | "adminOutline"
  | "danger";

type BaseButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLinkProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--color-brand-dark)] bg-[var(--color-brand-dark)] text-white hover:bg-[#1d3f23]",

  secondary:
    "border border-[var(--color-brand-dark)] bg-transparent text-[var(--color-brand-dark)] hover:bg-[#e9eee3]",

  ghost:
    "border border-transparent bg-transparent text-[var(--color-brand-dark)] hover:bg-[#e9eee3]",

  admin: "border border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-800",

  adminOutline:
    "border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50",

  danger: "border border-red-600 bg-red-600 text-white hover:bg-red-500",
};

const buttonSizes =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium no-underline transition disabled:pointer-events-none disabled:opacity-50";

export function Button(props: ButtonProps) {
  const { children, variant = "admin", className, ...rest } = props;

  const classes = cn(buttonSizes, buttonVariants[variant], className);

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
