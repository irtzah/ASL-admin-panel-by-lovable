import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchResource, saveResource } from "./api";
import type { CmsResources, ResourceKey } from "./types";

export const resourceQueryKey = (key: ResourceKey) => ["cms", key] as const;

export function useResource<K extends ResourceKey>(key: K) {
  return useQuery({ queryKey: resourceQueryKey(key), queryFn: () => fetchResource(key) });
}

export function useSaveResource<K extends ResourceKey>(key: K, successMessage = "Changes saved") {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CmsResources[K]) => saveResource(key, data),
    onSuccess: (data) => {
      qc.setQueryData(resourceQueryKey(key), data);
      toast.success(successMessage);
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

/** Local editable draft of a resource with dirty tracking + save/reset. */
export function useEditableResource<K extends ResourceKey>(key: K) {
  const query = useResource(key);
  const mutation = useSaveResource(key);
  const [draft, setDraft] = useState<CmsResources[K] | null>(null);

  useEffect(() => {
    if (query.data && draft === null) setDraft(query.data);
  }, [query.data, draft]);

  const dirty = draft !== null && JSON.stringify(draft) !== JSON.stringify(query.data);

  return {
    draft,
    setDraft: (next: CmsResources[K]) => setDraft(next),
    isLoading: query.isLoading,
    error: query.error,
    dirty,
    saving: mutation.isPending,
    save: () => draft && mutation.mutate(draft),
    /** Persist a value immediately (used by CRUD dialogs). */
    commit: (next: CmsResources[K]) => {
      setDraft(next);
      mutation.mutate(next);
    },
    reset: () => query.data && setDraft(query.data),
  };
}
