import { useState, useEffect, useRef } from "react";
import "./AutocompleteWidget.css";
import useEntertainment from "../../hooks/useEntertainment";
import useDebounce from "../../hooks/useDebounce";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import useEventListener from "../../hooks/useEventListener";

export default function AutocompleteWidget() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setValueWithDebounce, isDebouncing] = useDebounce();
  const [areResultsVisible, setAreResultsVisible] = useState(!!searchInput);
  const resultsContainer = useRef(null);

  const { dropdownState, modifyDropdownState, apiRequestOptions } =
    useEntertainment();

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
      `${dropdownState.searchCategorySelectionDropdown.selectedValue.link}${searchQuery}`,
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

  const handleBodyClick = (e) => {
    if (!resultsContainer.current) return;

    if (!resultsContainer.current.contains(e.target)) {
      setAreResultsVisible(false);
    }
  };

  useEventListener("click", handleBodyClick, document.body, true);

  let resultsSectionContent;
  if (isDebouncing) {
    resultsSectionContent = <p>Debouncing...</p>;
  } else if (isLoading) {
    resultsSectionContent = <p>Loading...</p>;
  } else if (errorMessage) {
    resultsSectionContent = <p>{errorMessage}</p>;
  } else if (data && data.results && data.results.length) {
    resultsSectionContent = data.results.slice(0, 10).map((result, index) => (
      <Link
        className="link-redirect"
        key={index}
        to={`${dropdownState.searchCategorySelectionDropdown.selectedValue.category}/${result.id}`}
        onClick={() => {
          setAreResultsVisible(false);
          setSearchInput("");
        }}
      >
        <img
          className="autocomplete-image"
          src={`https://image.tmdb.org/t/p/w780${result.poster_path}`}
          alt=""
        />
        <p>
          {new Date(result.release_date || result.first_air_date).getFullYear()}
        </p>
        <p>{result.title || result.name} </p>
      </Link>
    ));
  } else {
    resultsSectionContent = <p>No results found.</p>;
  }

  return (
    <section className="autocomplete-widget-main-container">
      <Dropdown
        id="searchCategorySelectionDropdown"
        options={dropdownState.searchCategorySelectionDropdown.options}
        value={dropdownState.searchCategorySelectionDropdown.selectedValue}
        modifyDropdownState={modifyDropdownState}
      />
      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <div className="search-bar-result-container">
          <input
            id="search"
            type="text"
            value={searchInput}
            placeholder={`Search for ${dropdownState.searchCategorySelectionDropdown.selectedValue.category}`}
            onChange={(event) => {
              setSearchInput(event.target.value);
              setAreResultsVisible(!!event.target.value);
            }}
          />
          {areResultsVisible && (
            <div className="results-section" ref={resultsContainer}>
              {resultsSectionContent}
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
