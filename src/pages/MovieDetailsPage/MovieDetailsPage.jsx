import { useParams } from "react-router-dom";
import "./MovieDetailsPage.css";
import useEntertainment from "../../hooks/useEntertainment";
import useFetch from "../../hooks/useFetch";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { useState } from "react";
export default function MovieDetailsPage() {
  const { id } = useParams();
  const { apiRequestOptions } = useEntertainment();
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const [getCreditUrl, setGetCreditUrl] = useState("");

  const {
    data: movieData,
    isLoading: movieIsLoading,
    errorMessage: movieErrorMessage,
  } = useFetch(url, apiRequestOptions);

  const {
    data: creditData,
    isLoading: castIsLoading,
    errorMessage: castErrorMessage,
  } = useFetch(getCreditUrl, apiRequestOptions);

  useUpdateEffect(() => {
    setGetCreditUrl(
      `https://api.themoviedb.org/3/movie/${movieData.id}/credits`
    );
  }, [movieData]);


  if (movieIsLoading) return <p>Loading...</p>;
  else if (movieErrorMessage) return <p>{movieErrorMessage}</p>;
  else if (!Object.keys(movieData).length) return <p>Sorry No Data Found</p>;
  else
    return (
      <section className="movie-section">
        <div className="movie-poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w780${movieData.poster_path}`}
            alt=""
          />
        </div>

        <div className="movie-details-container">
          <h2>{movieData.title}</h2>

          <div className="movie-ratings-container"></div>

          <div className="movie-misc-info">
            <div className="info-tab">
              <h3>Length</h3>
              <span>{movieData.runtime} mins</span>
            </div>

            <div className="info-tab">
              <h3>Language</h3>
              <span>{movieData.spoken_languages[0].english_name}</span>
            </div>

            <div className="info-tab">
              <h3>Year</h3>
              <span>{movieData.release_date}</span>
            </div>

            <div className="info-tab">
              <h3>Status</h3>
              <span>{movieData.status}</span>
            </div>
          </div>

          <div className="movie-genre">
            <h3>Genre</h3>
            <div className="movie-genre-container">
              {movieData.genres.map((genre, index) => (
                <span className="bordered-info-button" key={index}>
                  {genre.name}{" "}
                </span>
              ))}
            </div>
          </div>

          <div className="movie-synopsis">
            <h3>Synopsis</h3>
            <p>{movieData.overview}</p>
          </div>

          <div className="movie-cast">
            <h3>Cast</h3>
            <div className="movie-cast-container">
              {creditData &&
                creditData.cast.length !== 0 &&
                creditData.cast.map((c, index) => (
                  <span className="bordered-info-button" key={index}>
                    {c.name}
                  </span>
                ))}
            </div>
          </div>

          <div className="movie-button-container">
            {movieData.homepage && (
              <button className="website-button">
                <a href={movieData.homepage}>Website</a>
              </button>
            )}
            {movieData.imdb_id && (
              <button className="website-button">
                <a href={`https://www.imdb.com/title/${movieData.imdb_id}`}>
                  IMDB
                </a>
              </button>
            )}
          </div>
        </div>
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
