/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch";
import useEntertainment from "../../hooks/useEntertainment";
import { Link, useSearchParams } from "react-router-dom";

import "./SeeMorePage.css";
import PageIndicator from "../../components/PageIndicator/PageIndicator";
export default function SeeMorePage({ seeMorePath }) {
  const { apiRequestOptions } = useEntertainment();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageNumber = parseInt(searchParams.get("page")) || 1;

  const apiUrl =
    `https://api.themoviedb.org/3/${seeMorePath}?page=${currentPageNumber}`.trim();
  const { data, isLoading, errorMessage } = useFetch(apiUrl, apiRequestOptions);

  const totalPages = data?.total_pages;

  if (isLoading) return <p>Loading...</p>;
  else if (errorMessage) return <p>{errorMessage}</p>;
  else if (!data.results.length) return <p>Sorry No Data Found</p>;
  else
    return (
      <div className="see-more-container">
        <section className="see-more-page-section">
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
