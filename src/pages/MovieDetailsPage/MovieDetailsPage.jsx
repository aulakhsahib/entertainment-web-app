import { useParams } from "react-router-dom";
import "./MovieDetailsPage.css";
import useEntertainment from "../../hooks/useEntertainment";
import useFetch from "../../hooks/useFetch";
export default function MovieDetailsPage() {
  const { id } = useParams();
  const { apiRequestOptions } = useEntertainment();
  const url = `https://api.themoviedb.org/3/movie/${id}`;

  const {
    data: movieData,
    isLoading,
    errorMessage,
  } = useFetch(url, apiRequestOptions);

  if (isLoading) return <p>Loading...</p>;
  else if (errorMessage) return <p>{errorMessage}</p>;
  else if (!Object.keys(movieData).length) return <p>Sorry No Data Found</p>;
  else
    return (
      <section>
        <p>Poster : {movieData.poster_path}</p>
        <p>Title : {movieData.title}</p>
        <p>Rating : </p>
        <p>
          Language :
          {movieData.spoken_languages.map((lang, index) => (
            <span key={index}>{lang.english_name}</span>
          ))}
        </p>
        <p>
          Genre :{" "}
          {movieData.genres.map((genre, index) => (
            <span key={index}>{genre.name} </span>
          ))}
        </p>
        <p>Synopsis : {movieData.overview}</p>
        <p>Cast : </p>
        <p>Website : {movieData.homepage}</p>
        <p>IMDB : </p>
        <p>Length : {movieData.runtime}</p>
        <p>Year : {movieData.release_date}</p>
        <p>Status : </p>
      </section>
    );
}

/*
Info To Show
1. Poster
2. Title
3. Rating
4. Language
5. Genre
6. Synopsis
7. Cast
8. Website
9. IMDB

Movies Specific
1. Length
2. Year
3. Status

TV Series Specific 
1. First Air
2. Last Air
3. Status

*/
