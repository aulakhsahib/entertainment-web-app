import { useState, useEffect } from "react";
import "./AutocompleteWidget.css";
import useEntertainment from "../../hooks/useEntertainment";
import useDebounce from "../../hooks/useDebounce";
import useFetch from "../../hooks/useFetch";

export default function AutocompleteWidget() {
  const [searchInput, setSearchInput] = useState("");

  //   const [data, setData] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [errorMessage, setErrorMessage] = useState("");

  const { value: searchQuery, setValueWithDebounce } = useDebounce();

  const { apiRequestOptions } = useEntertainment();

  // let { data, isLoading, errorMessage } = useFetch(
  //   `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`,
  //   apiRequestOptions
  // );

  useEffect(() => {
    setValueWithDebounce(searchInput);
  }, [searchInput, setValueWithDebounce]);

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  return (
    <section>
      {searchInput}
      <p>{searchQuery}</p>
      <form>
        <label>
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </label>

        <div id="results-section"></div>
      </form>
    </section>
  );
}
