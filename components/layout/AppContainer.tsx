type AppContainerProps = {
  children: React.ReactNode;
};

export function AppContainer({
  children,
}: AppContainerProps) {
  return (
    <main className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {children}
      </div>
    </main>
  );
}