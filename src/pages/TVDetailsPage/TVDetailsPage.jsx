import { useParams } from "react-router-dom";
import useEntertainment from "../../hooks/useEntertainment";
import useFetch from "../../hooks/useFetch";
import "./TVDetailsPage.css";

export default function TVDetailsPage() {
  const { id } = useParams();
  const { apiRequestOptions } = useEntertainment();
  const url = `https://api.themoviedb.org/3/tv/${id}`;

  const {
    data: tvData,
    isLoading,
    errorMessage,
  } = useFetch(url, apiRequestOptions);

  if (isLoading) return <p>Loading...</p>;
  else if (errorMessage) return <p>{errorMessage}</p>;
  else if (!Object.keys(tvData).length) return <p>Sorry No Data Found</p>;
  else
    return (
      <section>
        <p>Poster : {tvData.poster_path}</p>
        <p>Title : {tvData.title}</p>
        <p>Rating : </p>
        <p>
          Language :
          {tvData.spoken_languages.map((lang, index) => (
            <span key={index}>{lang.english_name}</span>
          ))}
        </p>
        <p>
          Genre :{" "}
          {tvData.genres.map((genre, index) => (
            <span key={index}>{genre.name} </span>
          ))}
        </p>
        <p>Synopsis : {tvData.overview}</p>
        <p>Cast : </p>
        <p>Website : {tvData.homepage}</p>
        <p>IMDB : </p>
        <p>Length : {tvData.runtime}</p>
        <p>Year : {tvData.release_date}</p>
        <p>Status : </p>
      </section>
    );
}
