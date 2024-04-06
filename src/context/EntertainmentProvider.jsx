/* eslint-disable react/prop-types */
import { useState, useMemo, createContext } from "react";

const EntertainmentContext = createContext();

export function EntertainmentProvider({ children }) {
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

  const apiRequestOptions = useMemo(() => {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzA2NmM5Y2RmMWZhZTg1ZTZmZGM4MGE2NmM0ZTlkMyIsInN1YiI6IjY1Zjk0NTdhMzkxYjljMDE2MmM4Mjc0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d8B9-OCKdCH-bCx2TEdKnezqhIEiT00A0vAh8PyuDY8",
      },
    };
  }, []);
  return (
    <EntertainmentContext.Provider
      value={{ dropdownState, modifyDropdownState, apiRequestOptions }}
    >
      {children}
    </EntertainmentContext.Provider>
  );
}

export default EntertainmentContext;
