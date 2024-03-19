import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    setData(null);
    setErrorMessage(null);

    fetch(url)
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
  }, [url]);

  return {
    data,
    isLoading,
    errorMessage,
  };
}
