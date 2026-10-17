import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Battery, Gauge, HeartPulse, Wrench } from "lucide-react";
import { km, type Vehicle } from "@/lib/data";
import { Pill, Plate, Progress } from "./ui";

const statusMap = {
  maintenance: { tone: "primary", label: "Na oficina agora" },
  healthy: { tone: "success", label: "Em dia" },
  archived: { tone: "neutral", label: "Histórico guardado" },
} as const;

export function VehicleCard({ v }: { v: Vehicle }) {
  const s = statusMap[v.status];
  return (
    <article className="surface surface-hover animate-fade-up group overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden bg-ink">
        <img
          src={v.image}
          alt={v.name}
          loading="lazy"
          width={1280}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="absolute left-4 top-4">
          <Pill tone={s.tone} dot>
            {s.label}
          </Pill>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <h3 className="text-xl font-bold text-ink-foreground">{v.name}</h3>
            <p className="text-xs text-ink-muted">{v.version}</p>
          </div>
          <Plate value={v.plate} />
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        {[
          { icon: Gauge, l: "Odômetro", val: km(v.km) },
          { icon: HeartPulse, l: "Saúde", val: `${v.health}%` },
          { icon: Battery, l: "Bateria", val: v.battery },
        ].map((m) => (
          <div key={m.l} className="px-4 py-3">
            <div className="flex items-center gap-1 eyebrow !text-[9px]">
              <m.icon className="size-3" /> {m.l}
            </div>
            <div className="mt-1 font-mono text-sm font-semibold">{m.val}</div>
          </div>
        ))}
      </div>
      <div className="space-y-4 p-4">
        {v.activeOrder ? (
          <div className="rounded-xl bg-primary-soft p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-primary">
                <Wrench className="size-3.5" /> O.S. {v.activeOrder.id}
              </span>
              <span className="font-mono text-primary">{v.activeOrder.progress}%</span>
            </div>
            <p className="mt-1 text-sm font-medium">{v.activeOrder.title}</p>
            <div className="mt-2">
              <Progress value={v.activeOrder.progress} />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">Previsão de entrega: {v.activeOrder.eta}</p>
          </div>
        ) : (
          <div className="rounded-xl bg-muted p-3 text-sm">
            <span className="eyebrow !text-[9px]">Próximo passo</span>
            <p className="mt-1 font-medium">{v.nextService}</p>
          </div>
        )}
        <Link
          to="/veiculos/$id"
          params={{ id: v.id }}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-ink-foreground transition hover:bg-ink/90"
        >
          Abrir histórico visual 3D <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
