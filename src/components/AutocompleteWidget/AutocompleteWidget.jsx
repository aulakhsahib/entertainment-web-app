import { useState, useEffect, useRef } from "react";
import "./AutocompleteWidget.css";
import useEntertainment from "../../hooks/useEntertainment";
import useDebounce from "../../hooks/useDebounce";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";

export default function AutocompleteWidget() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setValueWithDebounce] = useDebounce();

  const { apiRequestOptions } = useEntertainment();

  const resultsContainer = useRef(null);

  const [areResultsVisible, setAreResultsVisible] = useState(!!searchInput);

  const [dropdownState, setDropdownState] = useState({
    searchCategorySelectionDropdown: {
      selectedValue: { link: "", category: "" },
      options: [
        {
          label: "Movies",
          value: {
            link: "https://api.themoviedb.org/3/search/movie?query=",
            category: "movies",
          },
        },
        {
          label: "TV Series",
          value: {
            link: "https://api.themoviedb.org/3/search/tv?query=",
            category: "tv",
          },
        },
      ],
    },
  });

  const modifyDropdownState = (focusedDropdown, newValue) => {
    setDropdownState((previousDropdownState) => {
      return {
        ...previousDropdownState,
        [focusedDropdown]: {
          ...previousDropdownState[focusedDropdown],
          selectedValue: { ...newValue },
        },
      };
    });
  };

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

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (!resultsContainer.current) return;

      if (!resultsContainer.current.contains(e.target)) {
        setAreResultsVisible(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick, true);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  if (!areResultsVisible)
    return (
      <section>
        <Dropdown
          id="searchCategorySelectionDropdown"
          options={dropdownState.searchCategorySelectionDropdown.options}
          value={dropdownState.searchCategorySelectionDropdown.selectedValue}
          modifyDropdownState={modifyDropdownState}
        />
        <form className="search-bar">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
              setAreResultsVisible(!!event.target.value);
            }}
          />
        </form>
      </section>
    );
  else
    return (
      <section>
        <Dropdown
          id="searchCategorySelectionDropdown"
          options={dropdownState.searchCategorySelectionDropdown.options}
          value={dropdownState.searchCategorySelectionDropdown.selectedValue}
          modifyDropdownState={modifyDropdownState}
        />
        <form className="search-bar" onSubmit={(e) => console.log(e)}>
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
              setAreResultsVisible(!!event.target.value);
            }}
          />

          <div id="results-section" ref={resultsContainer}>
            {isLoading ? (
              <p>Loading...</p>
            ) : errorMessage ? (
              <p>Error: {errorMessage}</p>
            ) : data && data.results && data.results.length ? (
              data.results.slice(0, 10).map((result, index) => (
                <Link
                  className="link-redirect"
                  key={index}
                  to={`${dropdownState.searchCategorySelectionDropdown.selectedValue.category}/${result.id}`}
                  onClick={() => {
                    setAreResultsVisible(false);
                    setSearchInput("");
                  }}
                >
                  <p>{result.title || result.name} </p>
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

// {
//   label: "All",
//   value: "https://api.themoviedb.org/3/search/multi?query=",
// },
