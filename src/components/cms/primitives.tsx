import { icons, Loader2, RotateCcw, Save } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { statusTones, type Tone } from "@/config/admin";
import { cn } from "@/lib/utils";

export function DynamicIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = name ? icons[name as keyof typeof icons] : undefined;
  if (!Icon) return null;
  return <Icon className={className} />;
}

const toneClass: Record<Tone, string> = {
  info: "bg-info/10 text-info ring-info/20",
  warning: "bg-warning/15 text-warning ring-warning/25",
  gold: "bg-primary/20 text-accent-foreground ring-primary/40",
  success: "bg-success/10 text-success ring-success/20",
  destructive: "bg-destructive/10 text-destructive ring-destructive/20",
  muted: "bg-muted text-muted-foreground ring-border",
};

export function StatusPill({ status, className }: { status: string; className?: string }) {
  const tone = statusTones[status] ?? "muted";
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset", toneClass[tone], className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="font-serif text-xl italic text-gold">{eyebrow}</p>}
        <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">{title}</h1>
        <div className="mt-3 flex items-center gap-2 text-gold">
          <span className="h-px w-8 bg-current" />
          <span className="size-1.5 rotate-45 bg-primary" />
          <span className="h-px w-8 bg-current" />
        </div>
        {description && <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ title, description, children, actions, className }: { title?: string; description?: string; children: ReactNode; actions?: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border bg-card p-6 shadow-card", className)}>
      {(title || actions) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="text-lg font-medium text-foreground">{title}</h2>}
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function SaveBar({ dirty, saving, onSave, onReset }: { dirty: boolean; saving: boolean; onSave: () => void; onReset: () => void }) {
  return (
    <div className={cn("sticky bottom-4 z-20 mt-8 flex items-center justify-between gap-4 rounded-full border border-sidebar-border bg-ink px-5 py-3 text-ink-foreground shadow-card transition-all", dirty ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0")}>
      <span className="text-sm">You have unsaved changes</span>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={onReset} className="text-ink-foreground hover:bg-sidebar-accent hover:text-ink-foreground">
          <RotateCcw /> Discard
        </Button>
        <Button size="sm" onClick={onSave} disabled={saving}>
          {saving ? <Loader2 className="animate-spin" /> : <Save />} Save changes
        </Button>
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-24 text-muted-foreground">
      <Loader2 className="mr-2 size-5 animate-spin text-gold" /> Loading…
    </div>
  );
}
