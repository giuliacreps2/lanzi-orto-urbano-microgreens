type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
          {title}
        </h1>

        {description ? (
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        ) : null}
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}
