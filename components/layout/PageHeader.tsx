type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="mb-8 border-b border-border pb-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Painel
          </span>

          <h1 className="text-4xl font-bold tracking-tight">
            {title}
          </h1>

          {description && (
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {children && (
          <div className="flex shrink-0 items-center">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}