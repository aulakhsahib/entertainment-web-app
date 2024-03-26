/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch";
import useEntertainment from "../../hooks/useEntertainment";
import { Link, useSearchParams } from "react-router-dom";

import "./SeeMorePage.css";
export default function SeeMorePage({ seeMorePath }) {
  const { apiRequestOptions } = useEntertainment();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageNumber = parseInt(searchParams.get("page")) || 1;

  const { data, isLoading, errorMessage } = useFetch(
    `https://api.themoviedb.org/3/${seeMorePath}?page=${currentPageNumber}`.trim(),
    apiRequestOptions
  );

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
