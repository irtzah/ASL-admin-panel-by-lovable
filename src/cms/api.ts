import type { CmsResources, ResourceKey } from "./types";

/**
 * Data adapter — the ONLY place the dashboard talks to data.
 *
 * Set VITE_API_BASE_URL (e.g. https://api.aslservices.co.uk) to switch every
 * screen to your REST backend. Each resource maps to:
 *   GET  {BASE}/api/{endpoint}  -> returns the resource JSON
 *   PUT  {BASE}/api/{endpoint}  -> body = full resource JSON, returns saved JSON
 *   POST {BASE}/api/uploads     -> multipart "file", returns { url }
 *
 * Without it, an in-memory mock store (seed.ts) is used so the UI is fully interactive.
 */
export const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "");

export const endpoints: Record<ResourceKey, string> = {
  header: "cms/header",
  footer: "cms/footer",
  heroes: "cms/heroes",
  home: "cms/home",
  about: "cms/about",
  services: "services",
  jobs: "jobs",
  applications: "applications",
  messages: "inquiries/messages",
  quotes: "inquiries/quotes",
};

/** Attach your auth token here (e.g. from your login flow). */
function authHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("asl_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

let mockStore: Partial<CmsResources> | null = null;
async function getMockStore() {
  if (!mockStore) {
    const { seed } = await import("./seed");
    mockStore = structuredClone(seed);
  }
  return mockStore as CmsResources;
}
const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export async function fetchResource<K extends ResourceKey>(key: K): Promise<CmsResources[K]> {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/api/${endpoints[key]}`, { headers: authHeaders() });
    if (!res.ok) throw new Error(`Failed to load ${key} (${res.status})`);
    return res.json();
  }
  await delay();
  const store = await getMockStore();
  return structuredClone(store[key]);
}

export async function saveResource<K extends ResourceKey>(
  key: K,
  data: CmsResources[K],
): Promise<CmsResources[K]> {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/api/${endpoints[key]}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to save ${key} (${res.status})`);
    return res.json();
  }
  await delay(400);
  const store = await getMockStore();
  store[key] = structuredClone(data);
  return structuredClone(data);
}

export async function uploadFile(file: File): Promise<string> {
  if (API_BASE) {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch(`${API_BASE}/api/uploads`, { method: "POST", headers: authHeaders(), body });
    if (!res.ok) throw new Error(`Upload failed (${res.status})`);
    const json = (await res.json()) as { url: string };
    return json.url;
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
