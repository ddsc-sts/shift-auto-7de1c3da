import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Clock, MapPin, Plus, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/portal/AppShell";
import { PageHeader, Pill, Plate, Section, StatCard } from "@/components/portal/ui";
import { Button } from "@/components/ui/button";
import { appointments, vehicles } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agendamentos")({
  head: () => ({
    meta: [
      { title: "Agendamentos · Shift Auto" },
      { name: "description", content: "Agende revisões e serviços para seus veículos com horário reservado." },
      { property: "og:title", content: "Agendamentos · Shift Auto" },
      { property: "og:description", content: "Revisões preventivas com horário reservado." },
    ],
  }),
  component: Agendamentos,
});

const slots = ["08:00", "08:30", "09:30", "10:00", "13:30", "14:00", "15:30", "16:00"];
const days = ["Seg 23", "Ter 24", "Qua 25", "Qui 26", "Sex 27", "Sáb 28"];

function Agendamentos() {
  const [day, setDay] = useState(days[0]);
  const [slot, setSlot] = useState("09:30");
  const [car, setCar] = useState(vehicles[0]!.id);
  return (
    <AppShell>
      <PageHeader
        eyebrow="Revisões preventivas"
        title="Agendamentos"
        description="Reserve um horário na oficina e acompanhe o que já está marcado."
        actions={<Button size="lg"><Plus /> Novo agendamento</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Próximo agendamento" value="28 Nov, 08:30" icon={<CalendarCheck className="size-4" />} tone="success" hint="Jeep Compass · Matriz" />
        <StatCard label="Revisão sugerida" value="2.450 km" icon={<Clock className="size-4" />} tone="primary" hint="Toyota Corolla" />
        <StatCard label="Tempo estimado" value="1h 45min" icon={<Clock className="size-4" />} tone="info" hint="Sala de espera ou leva-e-traz" />
        <StatCard label="Garantia" value="12 meses" icon={<ShieldCheck className="size-4" />} hint="Peças originais homologadas" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Section title="Marcar novo horário" icon={<Plus className="size-4" />}>
          <div className="space-y-6">
            <div>
              <span className="eyebrow">1 · Veículo</span>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {vehicles.filter((v) => v.status !== "archived").map((v) => (
                  <button key={v.id} onClick={() => setCar(v.id)} className={cn("flex items-center justify-between rounded-xl border p-3 text-left text-sm transition", car === v.id ? "border-primary bg-primary-soft ring-4 ring-primary/10" : "border-border hover:bg-accent")}>
                    <span className="font-semibold">{v.name}</span>
                    <Plate value={v.plate} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="eyebrow">2 · Dia</span>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {days.map((d) => (
                  <button key={d} onClick={() => setDay(d)} className={cn("rounded-xl border py-3 text-sm font-semibold transition", day === d ? "border-ink bg-ink text-ink-foreground" : "border-border hover:bg-accent")}>{d}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="eyebrow">3 · Horário</span>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {slots.map((s) => (
                  <button key={s} onClick={() => setSlot(s)} className={cn("rounded-xl border py-2.5 font-mono text-sm transition", slot === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent")}>{s}</button>
                ))}
              </div>
            </div>
            <Button size="lg" className="w-full">Confirmar {day} às {slot}</Button>
          </div>
        </Section>

        <Section title="Já agendados" icon={<CalendarCheck className="size-4" />}>
          <div className="space-y-3">
            {appointments.map((a) => (
              <div key={a.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <Pill tone={a.status === "confirmed" ? "success" : "warning"} dot>{a.status === "confirmed" ? "Confirmado" : "Aguardando"}</Pill>
                  <span className="font-mono text-[11px] text-muted-foreground">{a.id}</span>
                </div>
                <div className="mt-3 flex items-end gap-4">
                  <div className="rounded-xl bg-ink px-3 py-2 text-center text-ink-foreground">
                    <p className="font-display text-lg font-bold leading-none">{a.date}</p>
                    <p className="font-mono text-xs text-ink-muted">{a.time}</p>
                  </div>
                  <div>
                    <p className="font-semibold">{a.service}</p>
                    <p className="text-xs text-muted-foreground">{a.vehicle} · {a.plate}</p>
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5" /> {a.place}</p>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-2xl bg-primary-soft p-4 text-sm">
              <Truck className="size-5 text-primary" /> Leva-e-traz disponível em até 40 km de Joinville.
            </div>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
