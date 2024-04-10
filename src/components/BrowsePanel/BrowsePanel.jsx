/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch.jsx";
import useEntertainment from "../../hooks/useEntertainment.jsx";
import "./BrowsePanel.css";
import { Link } from "react-router-dom";

export default function BrowsePanel({ heading, category, url, to }) {
  const { apiRequestOptions } = useEntertainment();
  const { data, isLoading, errorMessage } = useFetch(url, apiRequestOptions);

  const urlCategory = category === "Movie" ? "movies" : "tv";

  if (isLoading) return <p>Loading...</p>;
  else if (errorMessage) return <p>{errorMessage}</p>;
  else if (!data.results.length) return <p>Sorry No Data Found</p>;
  else
    return (
      <section>
        <div className="panel-container">
          <div className="slider-header">
            <div className="slider-category-container">
              <h2>{heading}</h2>
              <span>{category}</span>
            </div>
            <Link className="see-more-link" to={to}>
              See More
            </Link>
          </div>
        </div>
        <div className="panel-items">
          {data.results.slice(0, 8).map((d, index) => {
            console.log(d);
            return (
              <Link className="movie-panel-poster" key={index} to={`${urlCategory}/${d.id}`}>
                <div className="panel-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w780${d.poster_path}`}
                    alt=""
                  />
                  <p>{d.title || d.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    );
}
