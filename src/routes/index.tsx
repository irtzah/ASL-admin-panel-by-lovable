import { createFileRoute, Link } from "@tanstack/react-router";
import { format, subDays, isSameDay } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useResource } from "@/cms/hooks";
import { Button } from "@/components/ui/button";
import { LoadingState, PageHeader, Panel, StatusPill } from "@/components/cms/primitives";
import { kpis, quickActions } from "@/config/admin";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead("Dashboard", "Overview of applications, vacancies and inquiries for ASL Staffing."),
  component: Dashboard,
});

function Kpi({ def }: { def: (typeof kpis)[number] }) {
  const { data } = useResource(def.resource);
  const list = (Array.isArray(data) ? data : []) as Record<string, unknown>[];
  const value = def.filter ? list.filter((r) => r[def.filter!.field] === def.filter!.value).length : list.length;
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-card">
      <p className="text-sm text-muted-foreground">{def.label}</p>
      <p className="mt-2 text-4xl font-medium tracking-tight">{data ? value : "—"}</p>
      <p className="mt-2 text-xs text-gold">{def.hint}</p>
    </div>
  );
}

function Dashboard() {
  const { data: apps, isLoading } = useResource("applications");
  const days = 14;
  const latest = apps?.length ? new Date(Math.max(...apps.map((a) => +new Date(a.appliedAt)))) : new Date();
  const chart = Array.from({ length: days }, (_, i) => {
    const d = subDays(latest, days - 1 - i);
    return { day: format(d, "d MMM"), applications: (apps ?? []).filter((a) => isSameDay(new Date(a.appliedAt), d)).length };
  });
  const recent = [...(apps ?? [])].sort((a, b) => +new Date(b.appliedAt) - +new Date(a.appliedAt)).slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow="Welcome back"
        title="Dashboard overview"
        description="A snapshot of your website, vacancies and candidate pipeline."
        actions={quickActions.map((a) => (
          <Button key={a.label} variant={a.variant} asChild>
            <Link to={a.to} search={a.search}>{a.label}</Link>
          </Button>
        ))}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => <Kpi key={k.label} def={k} />)}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-5">
        <Panel title="Application velocity" description={`Last ${days} days`} className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart}>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} interval={2} stroke="var(--color-muted-foreground)" />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={11} width={24} stroke="var(--color-muted-foreground)" />
                <Tooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                <Bar dataKey="applications" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel
          title="Recent applications"
          className="xl:col-span-3"
          actions={<Button variant="ghost" size="sm" asChild><Link to="/applications">View all <ArrowUpRight /></Link></Button>}
        >
          {isLoading ? <LoadingState /> : (
            <ul className="divide-y">
              {recent.map((a) => (
                <li key={a.id} className="flex items-center gap-4 py-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    {String(a.personal.firstName)[0]}{String(a.personal.lastName)[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{String(a.personal.firstName)} {String(a.personal.lastName)}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.jobTitle} · {format(new Date(a.appliedAt), "d MMM yyyy")}</p>
                  </div>
                  <StatusPill status={a.status} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
