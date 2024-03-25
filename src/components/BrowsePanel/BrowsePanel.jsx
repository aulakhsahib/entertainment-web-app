/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch.jsx";
import useEntertainment from "../../hooks/useEntertainment.jsx";
import "./BrowsePanel.css";
import { Link } from "react-router-dom";

export default function BrowsePanel({ heading, category, url }) {
  const { apiRequestOptions } = useEntertainment();
  const { data, isLoading, errorMessage } = useFetch(url, apiRequestOptions);

  const urlCategory = category === "Movie" ? "movies" : "tv";

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
            <Link key={index} to={`${urlCategory}/${d.id}`}>
              <p>{d.title || d.name}</p>
            </Link>
          ))}
        </article>
      </section>
    );
}
