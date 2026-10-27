import { createFileRoute } from "@tanstack/react-router";
import { useEditableResource } from "@/cms/hooks";
import { schemas } from "@/cms/schemas";
import { CollectionEditor } from "@/components/cms/editors";
import { DynamicIcon, LoadingState, PageHeader, Panel, StatusPill } from "@/components/cms/primitives";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => pageHead("Services & Sectors", "Create and edit the staffing sectors shown on the services pages."),
  component: ServicesPage,
});

function ServicesPage() {
  const r = useEditableResource("services");
  return (
    <>
      <PageHeader eyebrow="Website" title="Services & sectors" description="Sectors appear on the services pages and in the job sector dropdown. Changes save instantly." />
      <Panel>
        {!r.draft ? <LoadingState /> : (
          <CollectionEditor
            items={r.draft}
            onChange={r.commit}
            fields={schemas.service}
            itemLabel="Sector"
            columns={[{ key: "title", label: "Sector" }, { key: "slug", label: "Slug" }, { key: "tagline", label: "Tagline" }, { key: "isActive", label: "Status" }]}
            renderCell={(c, item) =>
              c.key === "title" ? (
                <span className="flex items-center gap-3 font-medium">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground"><DynamicIcon name={String(item.icon)} className="size-4" /></span>
                  {String(item.title)}
                </span>
              ) : c.key === "isActive" ? <StatusPill status={item.isActive ? "Active" : "Draft"} /> : undefined
            }
          />
        )}
      </Panel>
    </>
  );
}
