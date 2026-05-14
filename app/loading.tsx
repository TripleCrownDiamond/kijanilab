export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="loader-grid">
        <div className="loader-sweep" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="glass px-8 py-6 text-center">
            <p className="font-display text-3xl text-base-text">KijaniLab</p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-muted-text">Loading future farming</p>
          </div>
        </div>
      </div>
    </main>
  );
}
