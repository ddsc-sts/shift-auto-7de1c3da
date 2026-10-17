import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, CircleDashed, Hand, Loader2, ShieldCheck, Wrench } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { AppShell } from "@/components/portal/AppShell";
import { Pill, Plate } from "@/components/portal/ui";
import { km, vehicles } from "@/lib/data";
import { cn } from "@/lib/utils";

const CarViewer = lazy(() => import("@/components/portal/CarViewer"));

export const Route = createFileRoute("/veiculos/$id")({
  ssr: false,
  loader: ({ params }) => {
    const v = vehicles.find((x) => x.id === params.id);
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Veículo"} · Histórico 3D · Shift Auto` },
      { name: "description", content: "Explore em 3D onde cada manutenção foi feita no seu carro." },
      { property: "og:title", content: `${loaderData?.name ?? "Veículo"} · Shift Auto` },
      { property: "og:description", content: "Histórico visual 3D de manutenção." },
    ],
  }),
  component: VehiclePage,
});

const stateUi = {
  done: { tone: "success", label: "Concluído", icon: CheckCircle2 },
  progress: { tone: "primary", label: "Em andamento", icon: Loader2 },
  planned: { tone: "info", label: "Planejado", icon: CircleDashed },
} as const;

function VehiclePage() {
  const v = Route.useLoaderData();
  const [sel, setSel] = useState(v.components[0]?.id ?? "");
  const c = v.components.find((x) => x.id === sel) ?? v.components[0];
  const st = stateUi[c.state];

  return (
    <AppShell>
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/veiculos" className="grid size-10 place-items-center rounded-full border border-border bg-card hover:bg-accent" aria-label="Voltar">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{v.name}</h1>
            <Plate value={v.plate} />
          </div>
          <p className="text-sm text-muted-foreground">{v.version} · {km(v.km)}</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-ink shadow-[var(--shadow-lift)]">
        <div className="pointer-events-none absolute inset-0 bg-grid-ink" />
        <div className="grid lg:grid-cols-[1fr_380px]">
          <div className="relative h-[460px] md:h-[600px]">
            <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
              <Pill tone="success" dot>Gêmeo digital 3D</Pill>
              {v.activeOrder && <Pill tone="primary">O.S. {v.activeOrder.id}</Pill>}
            </div>
            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 text-xs text-ink-muted">
              <Hand className="size-3.5" /> Arraste para girar · role para aproximar
            </div>
            <Suspense fallback={<div className="grid h-full place-items-center text-ink-muted"><Loader2 className="size-6 animate-spin" /></div>}>
              <CarViewer url={v.model} components={v.components} selected={sel} onSelect={setSel} />
            </Suspense>
          </div>

          <aside className="relative z-10 m-4 flex flex-col gap-4 rounded-2xl bg-card p-5 lg:ml-0">
            <div>
              <span className="eyebrow">Componentes atendidos</span>
              <div className="mt-3 flex flex-col gap-1.5">
                {v.components.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => setSel(x.id)}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition",
                      x.id === sel ? "border-primary bg-primary-soft font-semibold" : "border-border hover:bg-accent",
                    )}
                  >
                    {x.name}
                    <span className={cn("size-2 rounded-full", x.state === "done" ? "bg-success" : x.state === "progress" ? "bg-primary" : "bg-info")} />
                  </button>
                ))}
              </div>
            </div>

            <div key={c.id} className="animate-fade-up space-y-4 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{c.service}</h3>
                <Pill tone={st.tone}>{st.label}</Pill>
              </div>
              {(c.oldPart || c.newPart) && (
                <div className="grid grid-cols-2 gap-2">
                  {c.oldPart && (
                    <div className="rounded-xl border border-destructive/30 bg-destructive-soft p-3">
                      <span className="eyebrow !text-destructive">Peça antiga</span>
                      <p className="mt-1 text-xs font-medium">{c.oldPart}</p>
                    </div>
                  )}
                  {c.newPart && (
                    <div className="rounded-xl border border-success/30 bg-success-soft p-3">
                      <span className="eyebrow !text-success">Peça nova</span>
                      <p className="mt-1 text-xs font-medium">{c.newPart}</p>
                    </div>
                  )}
                </div>
              )}
              <dl className="space-y-2 text-sm">
                {[
                  ["Componente", c.name],
                  ["Data", c.date],
                  ["Ordem de serviço", c.order],
                  ["Mecânico", c.mechanic],
                ].map(([k, val]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{val}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-2 rounded-xl bg-muted p-3 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 shrink-0 text-success" />
                O registro textual continua disponível mesmo se o modelo 3D mudar.
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          ["Odômetro", km(v.km)],
          ["Saúde geral", `${v.health}%`],
          ["Bateria 12V", v.battery],
          ["Próxima revisão", v.nextService],
        ].map(([l, val]) => (
          <div key={l} className="surface p-4">
            <span className="eyebrow">{l}</span>
            <p className="mt-2 font-mono text-lg font-semibold">{val}</p>
          </div>
        ))}
      </div>
      {v.activeOrder && (
        <div className="surface flex items-center gap-3 p-4 text-sm">
          <Wrench className="size-4 text-primary" /> {v.activeOrder.title} — {v.activeOrder.box} · entrega {v.activeOrder.eta}
        </div>
      )}
    </AppShell>
  );
}
