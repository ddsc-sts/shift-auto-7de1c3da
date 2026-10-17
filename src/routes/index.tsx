import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, Car, CheckCircle2, FileText, MessageCircle, Plus, Receipt, Wrench } from "lucide-react";
import { AppShell } from "@/components/portal/AppShell";
import { VehicleCard } from "@/components/portal/VehicleCard";
import { PageHeader, Pill, Progress, Section, StatCard } from "@/components/portal/ui";
import { Button } from "@/components/ui/button";
import { brl, history, user, vehicles } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início · Shift Auto — Portal do cliente" },
      { name: "description", content: "Acompanhe seus veículos, ordens de serviço e histórico de manutenção na Shift Auto." },
      { property: "og:title", content: "Shift Auto — Portal do cliente" },
      { property: "og:description", content: "Seus carros, serviços e histórico de manutenção em um só lugar." },
    ],
  }),
  component: Home,
});

function Home() {
  const active = vehicles.find((v) => v.activeOrder)!;
  return (
    <AppShell>
      <PageHeader
        eyebrow={`Oficina conectada · ${user.city}`}
        title={
          <>
            Olá, {user.first}. <span className="text-muted-foreground">Sua garagem está em boas mãos.</span>
          </>
        }
        description="Acompanhe a saúde dos seus veículos, as ordens de serviço em andamento e tudo o que já foi feito em cada carro."
        actions={
          <>
            <Button variant="outline" size="lg">
              <MessageCircle /> Falar com a oficina
            </Button>
            <Button asChild size="lg">
              <Link to="/agendamentos">
                <Plus /> Agendar revisão
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Garagem" value={`${vehicles.filter((v) => v.status !== "archived").length} veículos`} icon={<Car className="size-4" />} hint={<span className="flex gap-1.5"><Pill tone="primary">1 na oficina</Pill><Pill tone="success">1 em dia</Pill></span>} />
        <StatCard label={`O.S. ativa ${active.activeOrder!.id}`} value={`${active.activeOrder!.progress}%`} tone="primary" icon={<Wrench className="size-4" />} highlight hint={`Entrega prevista: ${active.activeOrder!.eta}`}>
          <div className="mt-3"><Progress value={active.activeOrder!.progress} /></div>
        </StatCard>
        <StatCard label="Aprovação pendente" value={brl(1250)} tone="warning" icon={<Receipt className="size-4" />} hint="Pastilhas + fluido de freio" />
        <StatCard label="Próxima revisão" value="2.450 km" tone="success" icon={<CalendarClock className="size-4" />} hint="Toyota Corolla · plano em dia" />
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Meus veículos</h2>
          <Link to="/veiculos" className="text-sm font-semibold text-primary hover:underline">Ver todos →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Section title="Últimas manutenções" icon={<CheckCircle2 className="size-4" />} action={<Link to="/historico" className="text-xs font-semibold text-primary">Histórico completo</Link>}>
          <ol className="relative space-y-5 border-l border-border pl-5">
            {history.slice(0, 3).map((h) => (
              <li key={h.title} className="relative">
                <span className={`absolute -left-[27px] top-1 size-3 rounded-full ring-4 ring-card ${h.status === "done" ? "bg-success" : "bg-primary"}`} />
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground">{h.date}</span>
                  <span className="font-mono text-xs font-semibold">{brl(h.value)}</span>
                </div>
                <p className="mt-0.5 font-semibold">{h.title}</p>
                <p className="text-xs text-muted-foreground">{h.vehicle} · {h.mechanic}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Linha do tempo da O.S. #1048" icon={<FileText className="size-4" />} action={<Pill tone="primary" dot>Em andamento</Pill>}>
          <div className="space-y-3">
            {[
              { l: "Recepção e check-in", p: 100, t: "08:10" },
              { l: "Diagnóstico de freios", p: 100, t: "09:30" },
              { l: "Substituição das pastilhas", p: 80, t: "agora" },
              { l: "Teste de frenagem e validação", p: 0, t: "17:00" },
            ].map((s) => (
              <div key={s.l} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 rounded-xl border border-border p-3">
                <span className="text-sm font-medium">{s.l}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{s.t}</span>
                <div className="col-span-2"><Progress value={s.p} tone={s.p === 100 ? "success" : "primary"} /></div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
