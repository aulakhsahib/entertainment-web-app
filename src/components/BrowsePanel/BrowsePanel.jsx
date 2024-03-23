/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch.jsx";
import useEntertainment from "../../hooks/useEntertainment.jsx";
import "./BrowsePanel.css";

export default function BrowsePanel({ heading, category, url }) {
  const { apiRequestOptions } = useEntertainment();
  const { data, isLoading, errorMessage } = useFetch(url, apiRequestOptions);

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
