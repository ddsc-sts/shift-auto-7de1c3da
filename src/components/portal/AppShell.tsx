import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Bell, LifeBuoy, Search } from "lucide-react";
import { user } from "@/lib/data";

const nav = [
  { to: "/", label: "Início" },
  { to: "/veiculos", label: "Veículos" },
  { to: "/historico", label: "Histórico" },
  { to: "/agendamentos", label: "Agendamentos" },
  { to: "/pagamentos", label: "Pagamentos" },
  { to: "/perfil", label: "Perfil" },
  { to: "/configuracoes", label: "Configurações" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-ink font-display text-lg font-bold text-primary">
        S
      </span>
      <span className="leading-none">
        <span className="block font-display text-[17px] font-bold tracking-tight">Shift Auto</span>
        <span className="eyebrow !text-[9px]">Portal do cliente</span>
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-dots">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5">
          <Logo />
          <nav className="mx-auto hidden items-center gap-1 rounded-full border border-border bg-card p-1 shadow-sm lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-ink data-[status=active]:text-ink-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button aria-label="Buscar" className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-accent">
              <Search className="size-4" />
            </button>
            <button aria-label="Notificações" className="relative grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-accent">
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
            </button>
            <div className="hidden items-center gap-2.5 rounded-full border border-border bg-card py-1 pl-1 pr-3 sm:flex">
              <span className="grid size-7 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
                CS
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-semibold">{user.first} Silva</span>
                <span className="block text-[10px] text-muted-foreground">{user.city}</span>
              </span>
            </div>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-5 pb-2 lg:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground data-[status=active]:bg-ink data-[status=active]:text-ink-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl space-y-8 px-5 py-10">{children}</main>
      <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-8 text-xs text-muted-foreground">
        <span>© 2026 Shift Auto · {user.shop}</span>
        <span className="flex items-center gap-1.5">
          <LifeBuoy className="size-3.5" /> Precisa de ajuda? Fale com a oficina pelo WhatsApp
        </span>
      </footer>
    </div>
  );
}
