/* eslint-disable react/prop-types */
import { useMemo, createContext } from "react";

const EntertainmentContext = createContext();

export function EntertainmentProvider({ children }) {
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
    <EntertainmentContext.Provider value={{ apiRequestOptions }}>
      {children}
    </EntertainmentContext.Provider>
  );
}

export default EntertainmentContext;
