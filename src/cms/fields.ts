export type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "image"
  | "number"
  | "date"
  | "select"
  | "switch"
  | "icon"
  | "stringList"
  | "collection";

export type Option = string | { value: string; label: string };

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: Option[];
  /** Load select options from another resource (e.g. sectors from services). */
  optionsFrom?: { resource: "services" | "jobs"; value: string; label: string };
  placeholder?: string;
  help?: string;
  full?: boolean;
  default?: unknown;
  /** For collection fields */
  itemFields?: FieldDef[];
  itemTitleKey?: string;
  itemSubtitleKey?: string;
  itemLabel?: string;
}

export const optValue = (o: Option) => (typeof o === "string" ? o : o.value);
export const optLabel = (o: Option) => (typeof o === "string" ? o : o.label);

export function emptyValue(f: FieldDef): unknown {
  if (f.default !== undefined) return structuredClone(f.default);
  switch (f.type) {
    case "switch":
      return false;
    case "stringList":
    case "collection":
      return [];
    case "select":
      return f.options?.[0] ? optValue(f.options[0]) : "";
    default:
      return "";
  }
}

export function newItem(fields: FieldDef[]): Record<string, unknown> & { id: string } {
  const item: Record<string, unknown> = {};
  for (const f of fields) item[f.key] = emptyValue(f);
  return { id: crypto.randomUUID(), ...item };
}

export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, k) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[k] : undefined), obj);
}

export function formatValue(v: unknown): string {
  if (v === undefined || v === null || v === "") return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (Array.isArray(v)) return v.length ? v.map((x) => (typeof x === "object" ? Object.values(x as object).filter(Boolean).join(" · ") : String(x))).join(", ") : "—";
  return String(v);
}
