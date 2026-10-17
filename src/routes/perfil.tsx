import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Save, Star, Users, Wrench } from "lucide-react";
import { AppShell } from "@/components/portal/AppShell";
import { PageHeader, Pill, Plate, Section } from "@/components/portal/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { user, vehicles } from "@/lib/data";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil · Shift Auto" },
      { name: "description", content: "Seus dados de contato, veículos vinculados e oficina preferencial." },
      { property: "og:title", content: "Meu perfil · Shift Auto" },
      { property: "og:description", content: "Gerencie seus dados e veículos vinculados." },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Perfil verificado"
        title="Meu perfil"
        description="Seus dados de contato e os veículos vinculados à sua conta."
        actions={<><Button variant="outline" size="lg"><Users /> Compartilhar acesso</Button><Button size="lg"><Save /> Salvar alterações</Button></>}
      />

      <div className="surface animate-fade-up relative overflow-hidden p-6">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-ink md:block" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
          <span className="grid size-24 place-items-center rounded-3xl bg-gradient-primary font-display text-3xl font-bold text-primary-foreground shadow-primary">CS</span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <Pill>Cliente desde {user.since}</Pill>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {user.city}</span>
              <span className="flex items-center gap-1.5"><Mail className="size-4" /> {user.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="size-4" /> {user.phone}</span>
            </div>
          </div>
          <div className="relative flex items-center gap-3 rounded-2xl bg-card/95 p-4 md:mr-4">
            <span className="grid size-14 place-items-center rounded-full border-4 border-success font-display text-xl font-bold">98</span>
            <div>
              <p className="text-sm font-semibold">Conservação</p>
              <p className="text-xs text-muted-foreground">Revisões sempre em dia</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Section title="Dados de contato">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Nome completo", user.name],
              ["E-mail", user.email],
              ["Telefone / WhatsApp", user.phone],
              ["Cidade", "Joinville / SC"],
            ].map(([l, v]) => (
              <label key={l} className="space-y-1.5">
                <span className="eyebrow">{l}</span>
                <Input defaultValue={v} className="h-11 rounded-xl bg-card" />
              </label>
            ))}
            <label className="space-y-1.5 sm:col-span-2">
              <span className="eyebrow">Endereço</span>
              <Input defaultValue="Rua Visconde de Mauá, 1420 · Apto 802" className="h-11 rounded-xl bg-card" />
            </label>
          </div>
        </Section>

        <div className="space-y-5">
          <Section title={`Veículos vinculados (${vehicles.length})`}>
            <div className="space-y-2">
              {vehicles.map((v) => (
                <div key={v.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <img src={v.image} alt={v.name} loading="lazy" width={1280} height={768} className="h-12 w-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.version}</p>
                  </div>
                  <Plate value={v.plate} />
                </div>
              ))}
            </div>
          </Section>
          <Section title="Oficina preferencial" icon={<Wrench className="size-4" />}>
            <div className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-ink font-display text-lg font-bold text-primary">S</span>
              <div className="flex-1">
                <p className="font-semibold">{user.shop}</p>
                <p className="text-xs text-muted-foreground">Consultor técnico: André Freios</p>
              </div>
              <span className="flex items-center gap-1 font-mono text-sm font-semibold"><Star className="size-4 fill-warning text-warning" /> 4,9</span>
            </div>
          </Section>
        </div>
      </div>
    </AppShell>
  );
}
