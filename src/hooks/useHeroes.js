import { useCallback, useEffect, useState } from "react";
import { obtenerHeroes } from "../services/heroService";

export function useHeroes() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHeroes() {
      setLoading(true);
      setError(null);

      try {
        const data = await obtenerHeroes({
          signal: controller.signal
        });

        setHeroes(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err instanceof Error
              ? err.message
              : "Ha ocurrido un error al cargar los personajes."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadHeroes();

    return () => {
      controller.abort();
    };
  }, [reloadKey]);

  return {
    heroes,
    loading,
    error,
    reload
  };
}