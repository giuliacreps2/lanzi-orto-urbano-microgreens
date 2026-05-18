import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`overflow-hidden rounded-xl border border-[rgba(184,197,168,0.65)] bg-white ${className}`}
    >
      {children}
    </article>
  );
}