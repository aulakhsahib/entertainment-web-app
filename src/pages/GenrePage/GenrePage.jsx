/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch";
import useEntertainment from "../../hooks/useEntertainment";
import "./GenrePage.css";

export default function GenrePage( {url, category}) {
  const {apiRequestOptions} = useEntertainment();

  const { data, isLoading, errorMessage } = useFetch(url, apiRequestOptions);

  const genres = data?.genres;
  if (isLoading) return <p>Loading...</p>;
  else if (errorMessage) return <p>{errorMessage}</p>;
  else if (!genres.length) return <p>Sorry No Data Found</p>;
  else
    return (
      <section>
        {genres.map((genre, index) => (
          <p key={index}>{genre.name}</p>
        ))}
      </section>
    );
}
