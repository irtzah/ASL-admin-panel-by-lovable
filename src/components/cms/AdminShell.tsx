import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, ExternalLink, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useResource } from "@/cms/hooks";
import { brand, sidebarNav, type NavEntry } from "@/config/admin";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function NavBadge({ source }: { source: NonNullable<NavEntry["badgeFrom"]> }) {
  const { data } = useResource(source.resource);
  const count = Array.isArray(data) ? data.filter((r) => (r as Record<string, unknown>)[source.field] === source.value).length : 0;
  if (!count) return null;
  return <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">{count}</span>;
}

function useNotifications() {
  const badges = sidebarNav.flatMap((g) => g.items).filter((i) => i.badgeFrom);
  const a = useResource("applications");
  const m = useResource("messages");
  const q = useResource("quotes");
  const lookup: Record<string, unknown[] | undefined> = { applications: a.data, messages: m.data, quotes: q.data };
  return badges.reduce((sum, b) => sum + (lookup[b.badgeFrom!.resource] ?? []).filter((r) => (r as Record<string, unknown>)[b.badgeFrom!.field] === b.badgeFrom!.value).length, 0);
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const notifications = useNotifications();
  const current = sidebarNav.flatMap((g) => g.items).find((i) => (i.to === "/" ? path === "/" : path.startsWith(i.to)));

  return (
    <div className="flex min-h-screen bg-background">
      {mobileOpen && <div className="fixed inset-0 z-30 bg-ink/50 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 lg:sticky lg:top-0 lg:h-screen",
          collapsed ? "w-20" : "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-20 items-center gap-3 border-b border-sidebar-border px-6">
          <img src={brand.logoUrl} alt={brand.name} className="h-7 w-auto" />
          {!collapsed && <span className="font-serif text-lg italic text-gold-soft">{brand.product}</span>}
        </div>
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
          {sidebarNav.map((group) => (
            <div key={group.group}>
              {!collapsed && <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/50">{group.group}</p>}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active = item === current;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        title={item.label}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                          active ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          collapsed && "justify-center",
                        )}
                      >
                        <item.icon className="size-4 shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                        {!collapsed && item.badgeFrom && !active && <NavBadge source={item.badgeFrom} />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <button onClick={() => setCollapsed(!collapsed)} className="hidden items-center gap-2 border-t border-sidebar-border px-6 py-4 text-xs text-sidebar-foreground/70 hover:text-sidebar-accent-foreground lg:flex">
          {collapsed ? <PanelLeftOpen className="size-4" /> : <><PanelLeftClose className="size-4" /> Collapse</>}
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b bg-background/85 px-4 backdrop-blur md:px-8">
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></Button>
          <p className="hidden text-sm text-muted-foreground sm:block">{brand.name} <span className="mx-1.5 text-gold">/</span> <span className="text-foreground">{current?.label}</span></p>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={brand.liveSiteUrl} target="_blank" rel="noreferrer"><ExternalLink /> <span className="hidden sm:inline">Preview site</span></a>
            </Button>
            <Button variant="outline" size="icon" className="relative" aria-label="Notifications">
              <Bell />
              {notifications > 0 && <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">{notifications}</span>}
            </Button>
            <div className="flex items-center gap-3 rounded-full border bg-card py-1 pl-1 pr-4">
              <span className="flex size-8 items-center justify-center rounded-full bg-ink text-xs font-semibold text-primary">{brand.admin.initials}</span>
              <div className="hidden leading-tight md:block">
                <p className="text-sm font-medium">{brand.admin.name}</p>
                <p className="text-xs text-muted-foreground">{brand.admin.role}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
