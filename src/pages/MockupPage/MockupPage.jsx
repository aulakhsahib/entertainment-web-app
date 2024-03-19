import useFetch from "../../hooks/useFetch";
import "./MockupPage.css";
export default function MockupPage() {
  const { data, isLoading, errorMessage } = useFetch(
    "https://jsonplaceholder.typicode.com/usrs"
  );
  let fetchContentToShow;
  if (isLoading) fetchContentToShow = "Loading...";
  else if (errorMessage) fetchContentToShow = errorMessage;
  else if (!data.length) fetchContentToShow = "Sorry no data found";
  else {
    fetchContentToShow = data.map(d => JSON.stringify(d));
  }

  return (
    <>
      <header>
        <h1>Mockup Page</h1>
      </header>
      <main>
        <section className="scroll-snapping-section">
          <div className="media-scroller scroll-snapping">
            <div className="media-element">
              <img src="https://picsum.photos/400/200" alt="placeholder-img" />
              <p className="title">Placeholder</p>
            </div>

            <div className="media-element">
              <img src="https://picsum.photos/400/200" alt="placeholder-img" />
              <p className="title">Placeholder</p>
            </div>

            <div className="media-element">
              <img src="https://picsum.photos/400/200" alt="placeholder-img" />
              <p className="title">Placeholder</p>
            </div>

            <div className="media-element">
              <img src="https://picsum.photos/400/200" alt="placeholder-img" />
              <p className="title">Placeholder</p>
            </div>

            <div className="media-element">
              <img src="https://picsum.photos/400/200" alt="placeholder-img" />
              <p className="title">Placeholder</p>
            </div>

            <div className="media-element">
              <img src="https://picsum.photos/400/200" alt="placeholder-img" />
              <p className="title">Placeholder</p>
            </div>

            <div className="media-element">
              <img src="https://picsum.photos/400/200" alt="placeholder-img" />
              <p className="title">Placeholder</p>
            </div>

            <div className="media-element">
              <img src="https://picsum.photos/400/200" alt="placeholder-img" />
              <p className="title">Placeholder</p>
            </div>

            <div className="media-element">
              <img src="https://picsum.photos/400/200" alt="placeholder-img" />
              <p className="title">Placeholder</p>
            </div>

            <div className="media-element">
              <img src="https://picsum.photos/400/200" alt="placeholder-img" />
              <p className="title">Placeholder</p>
            </div>
          </div>
        </section>

        <section id="use-fetch-section">{fetchContentToShow}</section>
      </main>
    </>
  );
}
