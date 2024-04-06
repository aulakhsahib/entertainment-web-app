import { Link, useSearchParams, useLocation } from "react-router-dom";
import "./DiscoverPage.css";
import useFetch from "../../hooks/useFetch";
import useEntertainment from "../../hooks/useEntertainment";

export default function DiscoverPage() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { apiRequestOptions } = useEntertainment();

  let category = pathname.match(/\/([^/]+)\//)[1];
  if (category === "movies") category = "movie";

  const currentPageNumber = parseInt(searchParams.get("page")) || 1;

  const genreQuery = searchParams.get("genre")
    ? `&with_genres${searchParams.get("genre")}`
    : "";

  const apiUrl =
    `https://api.themoviedb.org/3/discover/${category}?page=${currentPageNumber}${genreQuery}`.trim();
  const { data, isLoading, errorMessage } = useFetch(apiUrl, apiRequestOptions);

  const totalPages = data?.total_pages;
  console.log(totalPages);

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
        {currentPageNumber - 1 > 0 && (
          <button
            onClick={() => {
              setSearchParams((prev) => {
                prev.set("page", parseInt(currentPageNumber) - 1);
                return prev;
              });
            }}
          >
            Previous Page
          </button>
        )}
        <span>
          {currentPageNumber} of {totalPages}
        </span>
        {currentPageNumber + 1 <= totalPages && (
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
        )}
      </section>
    );
}

/* 
1. When genre is not available
2. When page is available
3. Getting the category of the media (Change it in the urlString)
*/
