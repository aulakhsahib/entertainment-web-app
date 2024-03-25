/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch";
import useEntertainment from "../../hooks/useEntertainment";
import "./GenrePage.css";
import { Link } from "react-router-dom";

export default function GenrePage({ url }) {
  const { apiRequestOptions } = useEntertainment();

  const { data, isLoading, errorMessage } = useFetch(url, apiRequestOptions);

  const genres = data?.genres;
  if (isLoading) return <p>Loading...</p>;
  else if (errorMessage) return <p>{errorMessage}</p>;
  else if (!genres.length) return <p>Sorry No Data Found</p>;
  else
    return (
      <section>
        {genres.map((genre, index) => (
          <Link key={index} relative="path" to={`../discover?genre=${genre.id}&page=1`}>
            {genre.name}
          </Link>
        ))}
      </section>
    );
}
