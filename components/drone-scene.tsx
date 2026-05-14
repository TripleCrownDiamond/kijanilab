export function DroneScene() {
  return (
    <div className="drone-wrap relative mx-auto h-[420px] w-full max-w-[520px]">
      <div className="drone-orbit absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30" />
      <div className="drone-card absolute inset-5 rounded-[2rem] border border-border bg-panel/70">
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-accent/40 bg-[radial-gradient(circle_at_30%_30%,rgba(150,255,170,0.5),transparent_55%)] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="drone-body absolute inset-0">
            <span className="drone-arm left-4 top-4" />
            <span className="drone-arm right-4 top-4" />
            <span className="drone-arm left-4 bottom-4" />
            <span className="drone-arm right-4 bottom-4" />
            <span className="drone-core absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-surface" />
          </div>
        </div>
      </div>
      <div className="floating-chip left-6 top-8">AI scouting</div>
      <div className="floating-chip right-8 top-20 [animation-delay:0.5s]">Drone 3D asset</div>
      <div className="floating-chip bottom-10 left-10 [animation-delay:0.9s]">Smart irrigation</div>
    </div>
  );
}
