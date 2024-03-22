import { useState, useEffect, useRef } from "react";

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const abortController = useRef();
  useEffect(() => {
    setIsLoading(true);
    setData(null);
    setErrorMessage(null);

    if (abortController?.current) {
      abortController.current.abort();
    }

    abortController.current = new AbortController();

    fetch(url, { ...options, signal: abortController.current.signal })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          return response.json().then((error) => {
            throw new Error(
              `${response.status} ${error.message || response.statusText}`
            );
          });
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error.message);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url, options]);

  return {
    data,
    isLoading,
    errorMessage,
  };
}
