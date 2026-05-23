import { cn } from "@/src/lib/utils";
import { propagateServerField } from "next/dist/server/lib/render-server";

export function Table({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"table">) {
  return (
    <div className="flow-root">
      <div className="-mx-[--gutter] overflow-x-auto whitespace-nowrap">
        <div className="inline-block min-w-full align-middle sm:px-[--gutter]">
          <table
            className={cn("min-w-full text-left text-sm/6", className)}
            {...props}
          />
        </div>
      </div>
    </div>
  );
}

export function TableHead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"thead">) {
  return (
    <thead className={cn("border-b border-zinc-500", className)} {...props} />
  );
}

export function TableBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody className={cn("divide-y divide-zinc-100", className)} {...props} />
  );
}

export function TableRow({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"tr">) {
  return (
    <tr className={cn("transition hover:bg-zinc-50", className)} {...props} />
  );
}

export function TableHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-medium uppercase tracking-wide",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={cn("px-4 py-4 align-middle text-zinc-700", className)}
      {...props}
    />
  );
}
