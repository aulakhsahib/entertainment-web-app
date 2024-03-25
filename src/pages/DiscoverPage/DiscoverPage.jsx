import { Link, useSearchParams, useLocation } from "react-router-dom";
import "./DiscoverPage.css";
import useFetch from "../../hooks/useFetch";
import useEntertainment from "../../hooks/useEntertainment";

export default function DiscoverPage() {
  const location = useLocation();
  console.log(location);

  const { apiRequestOptions } = useEntertainment();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageNumber = searchParams.get("page") || 1;

  const genreQuery = searchParams.get("genre")
    ? `&with_genres${searchParams.get("genre")}`
    : "";

  const { data, isLoading, errorMessage } = useFetch(
    `https://api.themoviedb.org/3/discover/${"movie"}?page=${currentPageNumber}${genreQuery}`.trim(),
    apiRequestOptions
  );

  if (isLoading) return <p>Loading...</p>;
  else if (errorMessage) return <p>{errorMessage}</p>;
  else if (!data.results.length) return <p>Sorry No Data Found</p>;
  else
    return (
      <section>
        <article>
          {data.results.map((d, index) => (
            <Link key={index} relative="path" to={`../${d.id}`}>
              <p>{d.title || d.name}</p>
            </Link>
          ))}
        </article>
        <button
          onClick={() => {
            setSearchParams((prev) => {
              prev.set("page", parseInt(currentPageNumber) + 1);
              return prev;
            });
          }}
        >
          Next Page
        </button>
      </section>
    );
}

/* 
1. When genre is not available
2. When page is available
3. Getting the category of the media (Change it in the urlString)
*/
