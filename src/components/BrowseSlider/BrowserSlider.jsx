/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch";
import { useMemo } from "react";
import "./BrowserSlider.css";
export default function BrowserSlider({ heading, category, url }) {
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
      <>
        {console.log(data.results)}
        <h2>
          {heading} | {category}
        </h2>
        <section className="media-scroller scroll-snapping">
          {data.results.slice(0, 11).map((d, index) => (
            <div key={index} className="media-group">
              <img
                src={`https://image.tmdb.org/t/p/w342${d.poster_path}`}
                alt=""
              />
              <p>{d.title || d.name}</p>
            </div>
          ))}
        </section>
      </>
    );
}
