import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src?: string;
  initials?: string;
  alt?: string;
  square?: boolean;
  className?: string;
};

export function Avatar({
  src,
  initials,
  alt = "",
  square = false,
  className,
}: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-zinc-100 text-xs font-semibold text-zinc-700",
        square ? "rounded-lg" : "rounded-full",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="40px" className="object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </span>
  );
}

type AvatarButtonProps = AvatarProps & {
  onClick?: () => void;
};

export function AvatarButton({
  onClick,
  className,
  ...props
}: AvatarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden transition hover:opacity-80",
        className,
      )}
    >
      <Avatar {...props} className="size-full" />
    </button>
  );
}
