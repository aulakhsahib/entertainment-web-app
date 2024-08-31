import { useParams } from "react-router-dom";
import useEntertainment from "../../hooks/useEntertainment";
import useFetch from "../../hooks/useFetch";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import "./TVDetailsPage.css";
import { useState } from "react";

export default function TVDetailsPage() {
  const { id } = useParams();
  const { apiRequestOptions } = useEntertainment();
  const url = `https://api.themoviedb.org/3/tv/${id}`;
  const [getCreditUrl, setGetCreditUrl] = useState("");

  const {
    data: tvData,
    isLoading,
    errorMessage,
  } = useFetch(url, apiRequestOptions);

  const {
    data: creditData,
    isLoading: castIsLoading,
    errorMessage: castErrorMessage,
  } = useFetch(getCreditUrl, apiRequestOptions);

  useUpdateEffect(() => {
    if (tvData && tvData.id) {
      setGetCreditUrl(`https://api.themoviedb.org/3/tv/${tvData.id}/credits`);
    }
  }, [tvData]);

  if (isLoading) return <p>Loading...</p>;
  else if (errorMessage) return <p>{errorMessage}</p>;
  else if (!Object.keys(tvData).length) return <p>Sorry No Data Found</p>;
  else
    return (
      <section className="tv-section">
        <div className="tv-poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w780${tvData.poster_path}`}
            alt=""
          />
        </div>

        <div className="tv-details-container">
          <h2>{tvData.name}</h2>

          <div className="tv-tagline">{tvData.tagline}</div>

          <div className="tv-ratings-container"></div>

          <div className="tv-misc-info">
            <div className="info-tab">
              <h3>Language</h3>
              <span>{tvData.spoken_languages[0].english_name}</span>
            </div>

            <div className="info-tab">
              <h3>First Air</h3>
              <span>{tvData.first_air_date}</span>
            </div>

            <div className="info-tab">
              <h3>Last Air</h3>
              <span>{tvData.last_air_date}</span>
            </div>

            <div className="info-tab">
              <h3>Status</h3>
              <span>{tvData.status}</span>
            </div>
          </div>

          <div className="tv-genre">
            <h3>Genre</h3>
            <div className="tv-genre-container">
              {tvData.genres.map((genre, index) => (
                <span className="bordered-info-button" key={index}>
                  {genre.name}{" "}
                </span>
              ))}
            </div>
          </div>

          <div className="tv-synopsis">
            <h3>Synopsis</h3>
            <p>{tvData.overview}</p>
          </div>

          <div className="tv-cast">
            <h3>Cast</h3>
            <div className="tv-cast-container">
              {creditData &&
                creditData.cast.length !== 0 &&
                creditData.cast.map((c, index) => (
                  <span className="bordered-info-button" key={index}>
                    {c.name}
                  </span>
                ))}
            </div>
          </div>

          <div className="tv-button-container">
            {tvData.homepage && (
              <button className="website-button">
                <a href={tvData.homepage}>Website</a>
              </button>
            )}
            <button className="website-button">
              <a href={`https://www.imdb.com/title/${tvData.imdb_id}`}>IMDB</a>
            </button>
          </div>
        </div>
      </section>
    );
}
