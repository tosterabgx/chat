import { useState } from "react";

export function useFetch(callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetcher = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetcher, isLoading, error];
}
