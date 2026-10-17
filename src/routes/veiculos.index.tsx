import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/portal/AppShell";
import { VehicleCard } from "@/components/portal/VehicleCard";
import { PageHeader } from "@/components/portal/ui";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/lib/data";

export const Route = createFileRoute("/veiculos/")({
  head: () => ({
    meta: [
      { title: "Meus veículos · Shift Auto" },
      { name: "description", content: "Todos os veículos vinculados à sua conta na Shift Auto." },
      { property: "og:title", content: "Meus veículos · Shift Auto" },
      { property: "og:description", content: "Veja status, quilometragem e histórico 3D de cada carro." },
    ],
  }),
  component: () => (
    <AppShell>
      <PageHeader
        eyebrow="Garagem conectada"
        title="Meus veículos"
        description="Cada carro com seu status, quilometragem e histórico visual 3D dos componentes atendidos."
        actions={<Button size="lg" variant="outline"><Plus /> Vincular veículo</Button>}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {vehicles.map((v) => <VehicleCard key={v.id} v={v} />)}
      </div>
    </AppShell>
  ),
});
