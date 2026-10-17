import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, ShieldCheck, Sparkles, Wallet, Wrench } from "lucide-react";
import { AppShell } from "@/components/portal/AppShell";
import { PageHeader, Pill, Plate, StatCard } from "@/components/portal/ui";
import { Button } from "@/components/ui/button";
import { brl, history, km } from "@/lib/data";

export const Route = createFileRoute("/historico")({
  head: () => ({
    meta: [
      { title: "Histórico de manutenção · Shift Auto" },
      { name: "description", content: "Tudo o que foi feito em cada carro, com peças, valores e o porquê de cada serviço." },
      { property: "og:title", content: "Histórico de manutenção · Shift Auto" },
      { property: "og:description", content: "Linha do tempo transparente dos serviços realizados." },
    ],
  }),
  component: Historico,
});

function Historico() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Tudo verificado e comprovado"
        title="Minhas manutenções"
        description="Um histórico claro: o que foi feito, por que foi feito, quais peças entraram e quem fez."
        actions={<Button variant="outline" size="lg"><Download /> Baixar relatório (PDF)</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Serviços realizados" value="18" icon={<Wrench className="size-4" />} tone="success" hint="100% com peças certificadas" />
        <StatCard label="Investido" value={brl(6630)} icon={<Wallet className="size-4" />} hint="Últimos 12 meses" />
        <StatCard label="Economia preventiva" value={brl(4210)} icon={<Sparkles className="size-4" />} tone="primary" hint="Evitando reparos corretivos" />
        <StatCard label="Garantia" value="12 meses" icon={<ShieldCheck className="size-4" />} tone="info" hint="Em peças e mão de obra" />
      </div>

      <div className="space-y-4">
        {history.map((h) => (
          <article key={h.title} className="surface surface-hover animate-fade-up grid gap-5 p-6 md:grid-cols-[180px_1fr_220px]">
            <div className="space-y-2">
              <p className="font-display text-lg font-bold">{h.date}</p>
              <p className="text-sm text-muted-foreground">{h.vehicle}</p>
              <Plate value={h.plate} />
              <p className="font-mono text-xs text-muted-foreground">{km(h.km)}</p>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{h.title}</h3>
                <Pill tone={h.status === "done" ? "success" : "primary"} dot>{h.status === "done" ? "Concluído e validado" : "Em andamento"}</Pill>
              </div>
              <p className="mt-3 rounded-xl border-l-2 border-primary bg-primary-soft px-4 py-3 text-sm">
                <span className="font-semibold">Por que foi feito? </span>{h.why}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {h.parts.map((p) => (
                  <li key={p} className="rounded-lg border border-border bg-muted px-2.5 py-1 text-xs">{p}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between gap-3 md:items-end md:text-right">
              <div>
                <p className="font-mono text-xl font-bold">{brl(h.value)}</p>
                <p className="text-xs text-muted-foreground">Responsável: {h.mechanic}</p>
              </div>
              <Button variant="outline" size="sm"><FileText /> Ver laudo e fotos</Button>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
