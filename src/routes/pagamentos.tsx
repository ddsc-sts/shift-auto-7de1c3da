import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Download, FileText, QrCode, Receipt, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/portal/AppShell";
import { PageHeader, Pill, Plate, Section, StatCard } from "@/components/portal/ui";
import { Button } from "@/components/ui/button";
import { brl, payments } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pagamentos")({
  head: () => ({
    meta: [
      { title: "Pagamentos · Shift Auto" },
      { name: "description", content: "Orçamentos, pagamentos pendentes e notas dos serviços realizados." },
      { property: "og:title", content: "Pagamentos · Shift Auto" },
      { property: "og:description", content: "Cobranças transparentes e documentos dos seus serviços." },
    ],
  }),
  component: Pagamentos,
});

const items = [
  { d: "Jogo de pastilhas Bosch Cerâmica dianteiras", q: "1 par", v: 780 },
  { d: "Fluido de freio sintético DOT 5.1", q: "500 ml", v: 120 },
  { d: "Mão de obra · substituição e sangria", q: "1,5 h", v: 300 },
  { d: "Teste de frenagem e assentamento", q: "—", v: 50 },
];

function Pagamentos() {
  const [method, setMethod] = useState("pix");
  return (
    <AppShell>
      <PageHeader
        eyebrow="Financeiro transparente"
        title="Pagamentos e documentos"
        description="Aprove orçamentos, acompanhe valores pendentes e baixe notas e laudos de cada serviço."
        actions={<Button variant="outline" size="lg"><Download /> Relatório anual</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Investido em 2026" value={brl(4230)} icon={<Wallet className="size-4" />} hint="4 ordens de serviço" />
        <StatCard label="Aguardando pagamento" value={brl(1250)} icon={<Receipt className="size-4" />} tone="primary" highlight hint="O.S. #1048 · Corolla" />
        <StatCard label="Economia preventiva" value={brl(1840)} icon={<TrendingUp className="size-4" />} tone="success" hint="vs. manutenção corretiva" />
        <StatCard label="Notas disponíveis" value="12" icon={<FileText className="size-4" />} tone="info" hint="PDF e XML" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Section title="Orçamento pendente · O.S. #1048" icon={<Receipt className="size-4" />} action={<Plate value="RIO-9A82" />}>
          <div className="divide-y divide-border">
            {items.map((i) => (
              <div key={i.d} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium">{i.d}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{i.q}</p>
                </div>
                <span className="font-mono text-sm font-semibold">{brl(i.v)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-ink p-5 text-ink-foreground">
            <span className="eyebrow !text-ink-muted">Total da ordem</span>
            <span className="font-display text-3xl font-bold">{brl(1250)}</span>
          </div>
        </Section>

        <Section title="Forma de pagamento" icon={<CreditCard className="size-4" />}>
          <div className="space-y-2">
            {[
              { id: "pix", l: "Pix instantâneo", h: "Confirmação em segundos", icon: QrCode },
              { id: "card", l: "Cartão de crédito", h: "Em até 3x sem juros", icon: CreditCard },
              { id: "shop", l: "Pagar na oficina", h: "Na retirada do veículo", icon: Wallet },
            ].map((m) => (
              <button key={m.id} onClick={() => setMethod(m.id)} className={cn("flex w-full items-center gap-3 rounded-xl border p-4 text-left transition", method === m.id ? "border-primary bg-primary-soft ring-4 ring-primary/10" : "border-border hover:bg-accent")}>
                <m.icon className="size-5 text-primary" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{m.l}</span>
                  <span className="text-xs text-muted-foreground">{m.h}</span>
                </span>
                <span className={cn("size-4 rounded-full border-2", method === m.id ? "border-primary bg-primary" : "border-input")} />
              </button>
            ))}
            <Button size="lg" className="mt-2 w-full">Aprovar e pagar {brl(1250)}</Button>
            <p className="text-center text-[11px] text-muted-foreground">O pagamento é registrado na sua ordem de serviço.</p>
          </div>
        </Section>
      </div>

      <Section title="Histórico de pagamentos" icon={<FileText className="size-4" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                {["O.S.", "Veículo", "Descrição", "Data", "Valor", "Status", ""].map((h) => (
                  <th key={h} className="eyebrow pb-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-muted/60">
                  <td className="py-3 font-mono text-xs">{p.id}</td>
                  <td className="py-3 font-medium">{p.vehicle}</td>
                  <td className="py-3 text-muted-foreground">{p.desc}</td>
                  <td className="py-3 font-mono text-xs">{p.date}</td>
                  <td className="py-3 font-mono font-semibold">{brl(p.value)}</td>
                  <td className="py-3"><Pill tone={p.status === "paid" ? "success" : "warning"} dot>{p.status === "paid" ? "Pago" : "Em aberto"}</Pill></td>
                  <td className="py-3 text-right"><Button variant="ghost" size="sm"><Download /> Nota</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </AppShell>
  );
}
