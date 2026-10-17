import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Plate({ value, className }: { value: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex flex-col overflow-hidden rounded-md border-2 border-ink bg-card leading-none",
        className,
      )}
    >
      <span className="bg-info px-1.5 py-[2px] text-center font-mono text-[7px] font-bold tracking-[0.2em] text-primary-foreground">
        BRASIL
      </span>
      <span className="px-2 py-1 font-mono text-xs font-bold tracking-wider text-ink">{value}</span>
    </span>
  );
}

const tones = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
  danger: "bg-destructive-soft text-destructive",
  neutral: "bg-muted text-muted-foreground",
} as const;
export type Tone = keyof typeof tones;

export function Pill({ tone = "neutral", children, dot }: { tone?: Tone; children: ReactNode; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
        tones[tone],
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="animate-fade-up flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Pill tone="success" dot>
          {eyebrow}
        </Pill>
        <h1 className="mt-4 text-3xl font-bold text-foreground md:text-[2.6rem] md:leading-[1.05]">{title}</h1>
        {description && <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "neutral",
  highlight,
  children,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  tone?: Tone;
  highlight?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "surface surface-hover animate-fade-up flex flex-col p-5",
        highlight && "border-primary/40 ring-4 ring-primary/10",
      )}
    >
      <div className="flex items-start justify-between">
        <span className="eyebrow">{label}</span>
        {icon && <span className={cn("grid size-9 place-items-center rounded-xl", tones[tone])}>{icon}</span>}
      </div>
      <div className="mt-4 font-display text-[1.7rem] font-bold leading-none tracking-tight text-foreground">
        {value}
      </div>
      {hint && <div className="mt-2 text-xs text-muted-foreground">{hint}</div>}
      {children}
    </div>
  );
}

export function Section({
  title,
  icon,
  action,
  children,
  className,
}: {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface animate-fade-up p-6", className)}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Progress({ value, tone = "primary" }: { value: number; tone?: "primary" | "success" }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full", tone === "primary" ? "bg-gradient-primary" : "bg-success")}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
