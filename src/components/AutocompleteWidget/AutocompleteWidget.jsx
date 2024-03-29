import { useState, useEffect } from "react";
import "./AutocompleteWidget.css";
import useEntertainment from "../../hooks/useEntertainment";
import useDebounce from "../../hooks/useDebounce";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { Link } from "react-router-dom";

export default function AutocompleteWidget() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [searchInput, setSearchInput] = useState("");

  const [searchQuery, setValueWithDebounce] = useDebounce();

  const { apiRequestOptions } = useEntertainment();

  useEffect(() => {
    setValueWithDebounce(searchInput);
  }, [searchInput, setValueWithDebounce]);

  useUpdateEffect(() => {
    setIsLoading(true);
    setData(null);
    setErrorMessage(null);
    if (!searchQuery) {
      setIsLoading(false);
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`,
      apiRequestOptions
    )
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
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error(error.message);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, apiRequestOptions]);

  if (!searchInput)
    return (
      <section>
        <form className="search-bar">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </form>
      </section>
    );
  else
    return (
      <section>
        <form className="search-bar">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />

          <div id="results-section">
            {isLoading ? (
              <p>Loading...</p>
            ) : errorMessage ? (
              <p>Error: {errorMessage}</p>
            ) : data && data.results && data.results.length ? (
              data.results.slice(0, 10).map((result, index) => (
                <Link key={index} to={`movies/${result.id}`}>
                  <div>
                    {result.title}{" "}
                    {/* Adjust according to your data structure */}
                  </div>
                </Link>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </form>
      </section>
    );
}
