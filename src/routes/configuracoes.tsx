import { createFileRoute } from "@tanstack/react-router";
import { Bell, Laptop, Lock, LogOut, MessageCircle, Mail, ShieldCheck, Smartphone } from "lucide-react";
import { AppShell } from "@/components/portal/AppShell";
import { PageHeader, Pill, Section } from "@/components/portal/ui";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações · Shift Auto" },
      { name: "description", content: "Notificações, segurança da conta e privacidade dos seus dados." },
      { property: "og:title", content: "Configurações · Shift Auto" },
      { property: "og:description", content: "Ajuste notificações e segurança da sua conta." },
    ],
  }),
  component: Config,
});

function Row({ icon: Icon, title, desc, on = true }: { icon: typeof Bell; title: string; desc: string; on?: boolean }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border p-4">
      <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="size-4" /></span>
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={on} />
    </div>
  );
}

function Config() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Conta e privacidade"
        title="Configurações"
        description="Escolha como a oficina fala com você e mantenha sua conta segura."
        actions={<Button size="lg">Salvar preferências</Button>}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Section title="Notificações" icon={<Bell className="size-4" />}>
          <div className="space-y-2.5">
            <Row icon={MessageCircle} title="Atualizações pelo WhatsApp" desc="Status da O.S., fotos e laudos do mecânico" />
            <Row icon={Mail} title="Notas e laudos por e-mail" desc="PDF enviado ao encerrar cada ordem de serviço" />
            <Row icon={Bell} title="Lembretes de revisão" desc="Aviso 15 dias antes da revisão sugerida" />
            <Row icon={Bell} title="Resumo mensal" desc="Gastos e próximos cuidados de cada veículo" on={false} />
          </div>
        </Section>
        <Section title="Segurança" icon={<Lock className="size-4" />}>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl bg-success-soft p-4">
              <ShieldCheck className="mt-0.5 size-5 text-success" />
              <div className="flex-1">
                <div className="flex items-center gap-2"><p className="font-semibold">Verificação em duas etapas</p><Pill tone="success">Ativa</Pill></div>
                <p className="mt-1 text-xs text-muted-foreground">Código enviado por SMS sempre que você entrar de um novo aparelho.</p>
              </div>
            </div>
            <span className="eyebrow">Sessões ativas</span>
            {[
              { i: Smartphone, d: "iPhone 15 · Safari", m: "Joinville, SC · há 8 minutos" },
              { i: Laptop, d: "MacBook Pro · Chrome", m: "Joinville, SC · sessão atual", cur: true },
            ].map((s) => (
              <div key={s.d} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <s.i className="size-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{s.d}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{s.m}</p>
                </div>
                {s.cur ? <Pill tone="info">Atual</Pill> : <Button variant="ghost" size="sm">Encerrar</Button>}
              </div>
            ))}
            <Button variant="outline" className="w-full text-destructive"><LogOut /> Sair de todos os dispositivos</Button>
            <p className="text-[11px] text-muted-foreground">Seus dados são tratados de acordo com a LGPD.</p>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
