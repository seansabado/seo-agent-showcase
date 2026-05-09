import { useEffect, useState } from "react";

interface FirestoreDocState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFirestoreDoc = <T>(
  key: string,
  fetcher: (docKey: string) => Promise<T>,
): FirestoreDocState<T> => {
  const [state, setState] = useState<FirestoreDocState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    const load = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await fetcher(key);
        if (!active) return;
        setState({ data: result, loading: false, error: null });
      } catch (error) {
        if (!active) return;
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [key, fetcher]);

  return state;
};
