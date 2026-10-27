import { createFileRoute } from "@tanstack/react-router";
import { useEditableResource } from "@/cms/hooks";
import { schemas } from "@/cms/schemas";
import type { FooterColumn, NavItem } from "@/cms/types";
import { CollectionEditor, ObjectForm } from "@/components/cms/editors";
import { LoadingState, PageHeader, Panel, SaveBar } from "@/components/cms/primitives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { options } from "@/config/admin";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/navigation")({
  head: () => pageHead("Header & Footer", "Manage navigation links, header logo, footer columns and contact details."),
  component: NavigationPage,
});

const navTypeLabel = Object.fromEntries(options.navType.map((o) => [o.value, o.label]));

function HeaderTab() {
  const r = useEditableResource("header");
  if (!r.draft) return <LoadingState />;
  const d = r.draft;
  return (
    <div className="space-y-6">
      <Panel title="Branding" description="Logo and the notice shown at the top of every page.">
        <ObjectForm fields={schemas.headerMeta} value={d} onChange={(v) => r.setDraft({ ...d, ...v })} />
      </Panel>
      <Panel title="Navigation links & buttons" description="Add, reorder, edit or remove anything in the site header.">
        <CollectionEditor<NavItem>
          items={d.navItems}
          onChange={(navItems) => r.setDraft({ ...d, navItems })}
          fields={schemas.navItem}
          titleKey="label"
          itemLabel="Link / Button"
          columns={[{ key: "label", label: "Label" }, { key: "url", label: "URL" }, { key: "type", label: "Type" }, { key: "target", label: "Target" }, { key: "isActive", label: "Status", kind: "status" }]}
          renderCell={(c, item) => (c.key === "type" ? <span className="text-muted-foreground">{navTypeLabel[item.type]}</span> : c.key === "isActive" ? undefined : undefined)}
        />
      </Panel>
      <SaveBar dirty={r.dirty} saving={r.saving} onSave={r.save} onReset={r.reset} />
    </div>
  );
}

function FooterTab() {
  const r = useEditableResource("footer");
  if (!r.draft) return <LoadingState />;
  const d = r.draft;
  const set = (v: Partial<typeof d>) => r.setDraft({ ...d, ...v });
  return (
    <div className="space-y-6">
      <Panel title="Brand info"><ObjectForm fields={schemas.footerBrand} value={d} onChange={set} /></Panel>
      <Panel title="Footer columns" description="Link categories such as Quick Links, Sectors or Legal.">
        <CollectionEditor<FooterColumn> items={d.columns} onChange={(columns) => set({ columns })} fields={schemas.footerColumn} itemLabel="Column" titleKey="title" />
      </Panel>
      <Panel title="Contact details"><ObjectForm fields={schemas.footerContact} value={d} onChange={set} /></Panel>
      <Panel title="Copyright & registration"><ObjectForm fields={schemas.footerLegal} value={d} onChange={set} /></Panel>
      <SaveBar dirty={r.dirty} saving={r.saving} onSave={r.save} onReset={r.reset} />
    </div>
  );
}

const tabs = [
  { key: "header", label: "Header & navigation", Component: HeaderTab },
  { key: "footer", label: "Footer", Component: FooterTab },
];

function NavigationPage() {
  return (
    <>
      <PageHeader eyebrow="Website" title="Header & Footer" description="Everything that appears on every page of aslservices.co.uk." />
      <Tabs defaultValue={tabs[0].key}>
        <TabsList className="mb-6">{tabs.map((t) => <TabsTrigger key={t.key} value={t.key}>{t.label}</TabsTrigger>)}</TabsList>
        {tabs.map((t) => <TabsContent key={t.key} value={t.key}><t.Component /></TabsContent>)}
      </Tabs>
    </>
  );
}
