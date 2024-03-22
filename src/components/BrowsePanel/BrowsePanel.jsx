/* eslint-disable react/prop-types */
import { useMemo } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import "./BrowsePanel.css";

export default function BrowsePanel({ heading, category, url }) {
  const options = useMemo(() => {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzA2NmM5Y2RmMWZhZTg1ZTZmZGM4MGE2NmM0ZTlkMyIsInN1YiI6IjY1Zjk0NTdhMzkxYjljMDE2MmM4Mjc0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d8B9-OCKdCH-bCx2TEdKnezqhIEiT00A0vAh8PyuDY8",
      },
    };
  }, []);
  const { data, isLoading, errorMessage } = useFetch(url, options);

  if (isLoading) return <p>Loading...</p>;
  else if (errorMessage) return <p>{errorMessage}</p>;
  else if (!data.results.length) return <p>Sorry No Data Found</p>;
  else
    return (
      <section>
        <h2>
          {heading} | {category}
        </h2>
        <article>
          {data.results.slice(0, 6).map((d, index) => (
            <p key={index}>{d.title || d.name}</p>
          ))}
        </article>
      </section>
    );
}
