import { Link, useSearchParams, useLocation } from "react-router-dom";
import "./DiscoverPage.css";
import PageIndicator from "../../components/PageIndicator/PageIndicator";
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

  if (isLoading) return <p>Loading...</p>;
  else if (errorMessage) return <p>{errorMessage}</p>;
  else if (!data.results.length) return <p>Sorry No Data Found</p>;
  else
    return (
      // <section>
      //   <article>
      //     {data.results.map((d, index) => (
      //       <Link key={index} relative="path" to={`../${d.id}`}>
      //         <p>{d.title || d.name}</p>
      //       </Link>
      //     ))}
      //   </article>
      //   <PageIndicator
      //     {...{ currentPageNumber, totalPages, setSearchParams }}
      //   />
      // </section>
      <div className="discover-container">
        <section className="discover-page-section">
          {data.results.map((d, index) => (
            <Link key={index} relative="path" to={`../${d.id}`}>
              <div className="">
                <img
                  src={`https://image.tmdb.org/t/p/w780${d.poster_path}`}
                  alt=""
                />
                <p>{d.title || d.name}</p>
              </div>
            </Link>
          ))}
        </section>
        <PageIndicator
          {...{ currentPageNumber, totalPages, setSearchParams }}
        />
      </div>
    );
}

/* 
1. When genre is not available
2. When page is available
3. Getting the category of the media (Change it in the urlString)
*/
