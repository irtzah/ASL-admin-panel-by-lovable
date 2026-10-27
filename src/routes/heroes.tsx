import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useEditableResource } from "@/cms/hooks";
import { schemas } from "@/cms/schemas";
import type { HeroContent } from "@/cms/types";
import { ObjectForm } from "@/components/cms/editors";
import { DynamicIcon, LoadingState, PageHeader, Panel, SaveBar } from "@/components/cms/primitives";
import { Button } from "@/components/ui/button";
import { heroPages } from "@/config/admin";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/heroes")({
  head: () => pageHead("Page Heroes", "Edit hero headlines, images and call-to-action buttons for every page."),
  component: HeroesPage,
});
import { pageHead } from "@/lib/seo";

const variantMap = { gold: "default", outline: "outline", ink: "ink" } as const;

function HeroPreview({ hero }: { hero: HeroContent }) {
  const bg = hero.images[0]?.url;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink-gradient p-8 text-ink-foreground">
      {bg && <img src={bg} alt="" className="absolute inset-0 size-full object-cover opacity-20" />}
      <div className="relative">
        {hero.eyebrow && <p className="font-serif text-xl italic text-primary">{hero.eyebrow}</p>}
        <h3 className="mt-2 text-3xl font-medium leading-tight">
          {hero.line1}<br /><span className="text-gold-gradient">{hero.line2}</span>
        </h3>
        {hero.subtitle && <p className="mt-4 max-w-md text-sm text-ink-foreground/80">{hero.subtitle}</p>}
        {hero.tagline && <p className="mt-2 font-serif italic text-gold-soft">{hero.tagline}</p>}
        {hero.buttons.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {hero.buttons.map((b) => (
              <Button key={b.id} size="sm" variant={variantMap[b.variant] ?? "default"} className={b.variant === "outline" ? "border-ink-foreground/40 bg-transparent text-ink-foreground" : ""}>
                {b.label} <DynamicIcon name={b.icon} />
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HeroesPage() {
  const r = useEditableResource("heroes");
  const [page, setPage] = useState(heroPages[0].key);
  if (!r.draft) return <LoadingState />;
  const hero = r.draft[page];
  return (
    <>
      <PageHeader eyebrow="Website" title="Page heroes" description="The large banner at the top of each page." />
      <div className="mb-6 flex flex-wrap gap-2">
        {heroPages.map((p) => (
          <button key={p.key} onClick={() => setPage(p.key)} className={cn("rounded-full border px-4 py-1.5 text-sm transition-colors", page === p.key ? "border-ink bg-ink text-ink-foreground" : "bg-card hover:border-gold")}>
            {p.label}
          </button>
        ))}
      </div>
      {hero ? (
        <div className="grid gap-6 xl:grid-cols-5">
          <Panel title={`${heroPages.find((p) => p.key === page)?.label} hero`} className="xl:col-span-3">
            <ObjectForm fields={schemas.hero} value={hero} onChange={(v) => r.setDraft({ ...r.draft!, [page]: v })} />
          </Panel>
          <div className="xl:col-span-2">
            <p className="eyebrow mb-3">Live preview</p>
            <div className="sticky top-28"><HeroPreview hero={hero} /></div>
          </div>
        </div>
      ) : (
        <Panel><p className="text-sm text-muted-foreground">No hero configured for this page.</p></Panel>
      )}
      <SaveBar dirty={r.dirty} saving={r.saving} onSave={r.save} onReset={r.reset} />
    </>
  );
}
