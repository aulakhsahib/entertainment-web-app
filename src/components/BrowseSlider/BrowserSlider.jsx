/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch";
import useEntertainment from "../../hooks/useEntertainment";
import { Link } from "react-router-dom";
import "./BrowserSlider.css";
export default function BrowserSlider({ heading, category, url }) {
  const { apiRequestOptions } = useEntertainment();
  const { data, isLoading, errorMessage } = useFetch(url, apiRequestOptions);

  const urlCategory = category === "Movie" ? "movies" : "tv";

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
            <Link key={index} to={`${urlCategory}/${d.id}`}>
              <div className="media-group">
                <img
                  src={`https://image.tmdb.org/t/p/w342${d.poster_path}`}
                  alt=""
                />
                <p>{d.title || d.name}</p>
              </div>
            </Link>
          ))}
        </section>
      </>
    );
}
