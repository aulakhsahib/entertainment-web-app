/* eslint-disable react/prop-types */
import "./PageIndicator.css";
export default function PageIndicator({
  currentPageNumber,
  totalPages,
  setSearchParams,
}) {
  return (
    <div className="page-indicator-container">
      {currentPageNumber - 1 > 0 && (
        <button
          className="page-indicator-button"
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
        {currentPageNumber}&nbsp;&nbsp;&nbsp;of&nbsp;&nbsp;&nbsp;{totalPages}
      </span>

      {currentPageNumber + 1 <= totalPages && (
        <button
          className="page-indicator-button"
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
    </div>
  );
}
