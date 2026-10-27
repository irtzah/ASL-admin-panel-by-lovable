import { ArrowDown, ArrowUp, ImageIcon, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { uploadFile } from "@/cms/api";
import { emptyValue, formatValue, newItem, optLabel, optValue, type FieldDef } from "@/cms/fields";
import { useResource } from "@/cms/hooks";
import { options as configOptions } from "@/config/admin";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DynamicIcon, StatusPill } from "./primitives";

type Obj = Record<string, unknown>;
const EMPTY: Obj = {};

function useFieldOptions(field: FieldDef) {
  const src = useResource(field.optionsFrom?.resource ?? "services");
  if (!field.optionsFrom) return field.options ?? [];
  return (src.data ?? []).map((r) => ({ value: String(r[field.optionsFrom!.value]), label: String(r[field.optionsFrom!.label]) }));
}

function SelectField({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const opts = useFieldOptions(field);
  return (
    <Select value={String(value ?? "")} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder={`Select ${field.label.toLowerCase()}`} /></SelectTrigger>
      <SelectContent>
        {opts.map((o) => (
          <SelectItem key={optValue(o)} value={optValue(o)}>{optLabel(o)}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ImageField({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const url = String(value ?? "");
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
        {url ? <img src={url} alt="" className="size-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} /> : <ImageIcon className="size-5 text-muted-foreground" />}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Input value={url} onChange={(e) => onChange(e.target.value)} placeholder="https://… or upload" />
        <div>
          <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => ref.current?.click()}>
            <Upload /> {busy ? "Uploading…" : "Upload"}
          </Button>
          <input
            ref={ref}
            type="file"
            accept="image/*"
            hidden
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setBusy(true);
              try {
                onChange(await uploadFile(file));
              } catch (err) {
                toast.error((err as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function StringListEditor({ value, onChange, itemLabel = "item" }: { value: string[]; onChange: (v: string[]) => void; itemLabel?: string }) {
  const list = value ?? [];
  return (
    <div className="space-y-2">
      {list.map((v, i) => (
        <div key={i} className="flex gap-2">
          <Input value={v} onChange={(e) => onChange(list.map((x, j) => (j === i ? e.target.value : x)))} />
          <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${itemLabel}`} onClick={() => onChange(list.filter((_, j) => j !== i))}>
            <X />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...list, ""])}>
        <Plus /> Add {itemLabel}
      </Button>
    </div>
  );
}

export function FieldInput({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  switch (field.type) {
    case "textarea":
      return <Textarea rows={4} value={String(value ?? "")} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
    case "select":
      return <SelectField field={field} value={value} onChange={onChange} />;
    case "icon":
      return (
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground"><DynamicIcon name={String(value ?? "")} className="size-4" /></span>
          <div className="flex-1"><SelectField field={{ ...field, options: configOptions.icons }} value={value} onChange={onChange} /></div>
        </div>
      );
    case "switch":
      return <Switch checked={Boolean(value)} onCheckedChange={onChange} />;
    case "image":
      return <ImageField value={value} onChange={onChange} />;
    case "stringList":
      return <StringListEditor value={(value as string[]) ?? []} onChange={onChange} itemLabel={field.itemLabel} />;
    case "collection":
      return (
        <CollectionEditor
          items={(value as Obj[]) ?? []}
          onChange={onChange}
          fields={field.itemFields ?? []}
          titleKey={field.itemTitleKey}
          subtitleKey={field.itemSubtitleKey}
          itemLabel={field.itemLabel}
          compact
        />
      );
    default:
      return <Input type={field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "url" ? "url" : "text"} value={String(value ?? "")} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
  }
}

const isWide = (f: FieldDef) => f.full || ["textarea", "stringList", "collection", "image"].includes(f.type);

export function ObjectForm<T extends Obj>({ fields, value, onChange }: { fields: FieldDef[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {fields.map((f) => (
        <div key={f.key} className={cn("space-y-2", isWide(f) && "md:col-span-2", f.type === "switch" && "flex items-center justify-between gap-4 space-y-0 rounded-lg border px-4 py-3")}>
          <Label className="text-sm font-medium">{f.label}</Label>
          <FieldInput field={f} value={value[f.key] ?? emptyValue(f)} onChange={(v) => onChange({ ...value, [f.key]: v })} />
          {f.help && <p className="text-xs text-muted-foreground">{f.help}</p>}
        </div>
      ))}
    </div>
  );
}

export function ItemDialog<T extends Obj>({ open, onOpenChange, title, fields, initial, onSubmit }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; fields: FieldDef[]; initial: T; onSubmit: (v: T) => void }) {
  const [draft, setDraft] = useState<T>(initial);
  const [lastInitial, setLastInitial] = useState(initial);
  if (initial !== lastInitial) {
    setLastInitial(initial);
    setDraft(initial);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">{title}</DialogTitle>
        </DialogHeader>
        <ObjectForm fields={fields} value={draft} onChange={setDraft} />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => { onSubmit(draft); onOpenChange(false); }}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ConfirmDelete({ name, onConfirm, trigger }: { name: string; onConfirm: () => void; trigger?: React.ReactNode }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="icon" aria-label={`Delete ${name}`} className="text-muted-foreground hover:text-destructive"><Trash2 /></Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete “{name}”?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export interface Column {
  key: string;
  label: string;
  kind?: "status" | "badge" | "lookup" | "money";
}

/** Generic add / edit / reorder / delete editor for any array of objects. */
export function CollectionEditor<T extends Obj>({
  items,
  onChange,
  fields,
  titleKey = "title",
  subtitleKey,
  itemLabel = "Item",
  columns,
  compact,
  renderCell,
  openNew,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  fields: FieldDef[];
  titleKey?: string;
  subtitleKey?: string;
  itemLabel?: string;
  columns?: Column[];
  compact?: boolean;
  renderCell?: (col: Column, item: T) => React.ReactNode;
  openNew?: boolean;
}) {
  const [editing, setEditing] = useState<{ index: number; item: T } | null>(() => (openNew ? { index: -1, item: newItem(fields) as unknown as T } : null));
  const move = (i: number, d: number) => {
    const next = [...items];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const actions = (item: T, i: number) => (
    <div className="flex shrink-0 items-center justify-end gap-0.5">
      <Button type="button" variant="ghost" size="icon" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp /></Button>
      <Button type="button" variant="ghost" size="icon" aria-label="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)}><ArrowDown /></Button>
      <Button type="button" variant="ghost" size="icon" aria-label="Edit" onClick={() => setEditing({ index: i, item })}><Pencil /></Button>
      <ConfirmDelete name={String(item[titleKey] || itemLabel)} onConfirm={() => remove(i)} />
    </div>
  );

  return (
    <div className="space-y-3">
      {columns ? (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {columns.map((c) => <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>)}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((item, i) => (
                <tr key={String(item.id ?? i)} className="hover:bg-muted/30">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3">
                      {renderCell?.(c, item) ?? (c.kind === "status" ? <StatusPill status={String(item[c.key])} /> : <span className={c.key === titleKey ? "font-medium" : "text-muted-foreground"}>{formatValue(item[c.key])}</span>)}
                    </td>
                  ))}
                  <td className="px-2 py-1">{actions(item, i)}</td>
                </tr>
              ))}
              {!items.length && (
                <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-muted-foreground">No {itemLabel.toLowerCase()}s yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <ul className={cn("divide-y rounded-xl border", compact && "bg-muted/20")}>
          {items.map((item, i) => (
            <li key={String(item.id ?? i)} className="flex items-center gap-3 px-4 py-2.5">
              {typeof item.icon === "string" && <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground"><DynamicIcon name={item.icon} className="size-4" /></span>}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{formatValue(item[titleKey])}</p>
                {subtitleKey && <p className="truncate text-xs text-muted-foreground">{formatValue(item[subtitleKey])}</p>}
              </div>
              {"isActive" in item && <StatusPill status={item.isActive ? "Active" : "Draft"} />}
              {actions(item, i)}
            </li>
          ))}
          {!items.length && <li className="px-4 py-6 text-center text-sm text-muted-foreground">Nothing here yet.</li>}
        </ul>
      )}
      <Button type="button" variant={compact ? "outline" : "default"} size="sm" onClick={() => setEditing({ index: -1, item: newItem(fields) as unknown as T })}>
        <Plus /> Add {itemLabel}
      </Button>
      <ItemDialog
        open={editing !== null}
        onOpenChange={(o) => !o && setEditing(null)}
        title={editing?.index === -1 ? `Add ${itemLabel}` : `Edit ${itemLabel}`}
        fields={fields}
        initial={editing?.item ?? (EMPTY as T)}
        onSubmit={(v) => {
          if (!editing) return;
          onChange(editing.index === -1 ? [...items, v] : items.map((x, j) => (j === editing.index ? v : x)));
        }}
      />
    </div>
  );
}
