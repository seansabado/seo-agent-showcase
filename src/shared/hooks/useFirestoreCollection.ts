import { useEffect, useState } from "react";

interface FirestoreCollectionState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
}

export const useFirestoreCollection = <T>(
  queryKey: string,
  fetcher: (query: string) => Promise<T[]>,
): FirestoreCollectionState<T> => {
  const [state, setState] = useState<FirestoreCollectionState<T>>({
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    const load = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await fetcher(queryKey);
        if (!active) return;
        setState({ items: result, loading: false, error: null });
      } catch (error) {
        if (!active) return;
        setState({
          items: [],
          loading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [queryKey, fetcher]);

  return state;
};
