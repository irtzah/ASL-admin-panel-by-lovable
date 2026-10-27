import { createFileRoute } from "@tanstack/react-router";
import { useEditableResource } from "@/cms/hooks";
import { schemas } from "@/cms/schemas";
import { CollectionEditor, ObjectForm } from "@/components/cms/editors";
import { LoadingState, PageHeader, Panel, SaveBar } from "@/components/cms/primitives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/content")({
  head: () => pageHead("Page Content", "Edit Home and About page sections, values, clients and leadership team."),
  component: ContentPage,
});

function HomeTab() {
  const r = useEditableResource("home");
  if (!r.draft) return <LoadingState />;
  const d = r.draft;
  const sections = [
    { key: "whyAsl" as const, title: "Why ASL — feature cards", fields: schemas.featureCard, label: "Card", titleKey: "title", sub: "description" },
    { key: "clients" as const, title: "Featured clients marquee", fields: schemas.logo, label: "Client", titleKey: "name", sub: "logoUrl" },
    { key: "accreditations" as const, title: "Accreditations", fields: schemas.badge, label: "Accreditation", titleKey: "name", sub: "imageUrl" },
  ];
  return (
    <div className="space-y-6">
      <Panel title="Work with us"><ObjectForm fields={schemas.workWithUs} value={d.workWithUs} onChange={(workWithUs) => r.setDraft({ ...d, workWithUs })} /></Panel>
      {sections.map((s) => (
        <Panel key={s.key} title={s.title}>
          <CollectionEditor items={d[s.key]} onChange={(v) => r.setDraft({ ...d, [s.key]: v })} fields={s.fields} itemLabel={s.label} titleKey={s.titleKey} subtitleKey={s.sub} />
        </Panel>
      ))}
      <SaveBar dirty={r.dirty} saving={r.saving} onSave={r.save} onReset={r.reset} />
    </div>
  );
}

function AboutTab() {
  const r = useEditableResource("about");
  if (!r.draft) return <LoadingState />;
  const d = r.draft;
  const sections = [
    { key: "values" as const, title: "Core values", fields: schemas.value, label: "Value", titleKey: "title", sub: "description" },
    { key: "team" as const, title: "Leadership team", fields: schemas.teamMember, label: "Team Member", titleKey: "name", sub: "role" },
  ];
  return (
    <div className="space-y-6">
      <Panel title="Our story"><ObjectForm fields={schemas.story} value={d} onChange={(v) => r.setDraft({ ...d, ...v })} /></Panel>
      {sections.map((s) => (
        <Panel key={s.key} title={s.title}>
          <CollectionEditor items={d[s.key]} onChange={(v) => r.setDraft({ ...d, [s.key]: v })} fields={s.fields} itemLabel={s.label} titleKey={s.titleKey} subtitleKey={s.sub} />
        </Panel>
      ))}
      <SaveBar dirty={r.dirty} saving={r.saving} onSave={r.save} onReset={r.reset} />
    </div>
  );
}

const tabs = [
  { key: "home", label: "Home page", Component: HomeTab },
  { key: "about", label: "About us", Component: AboutTab },
];

function ContentPage() {
  return (
    <>
      <PageHeader eyebrow="Website" title="Page content" description="Sections below the hero on each page." />
      <Tabs defaultValue={tabs[0].key}>
        <TabsList className="mb-6">{tabs.map((t) => <TabsTrigger key={t.key} value={t.key}>{t.label}</TabsTrigger>)}</TabsList>
        {tabs.map((t) => <TabsContent key={t.key} value={t.key}><t.Component /></TabsContent>)}
      </Tabs>
    </>
  );
}
