import BrowserSlider from "../../components/BrowseSlider/BrowserSlider";
import BrowsePanel from "../../components/BrowsePanel/BrowsePanel";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <header></header>
      <main>
        <BrowserSlider
          heading={"Trending"}
          category={"Movie"}
          url="https://api.themoviedb.org/3/trending/movie/day?language=en-US"
        />
        <BrowsePanel
          heading={"Popular"}
          category={"Movie"}
          url={
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
          }
        />
        <BrowsePanel
          heading={"Now Playing"}
          category={"Movie"}
          url={
            "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
          }
        />
        <BrowsePanel
          heading={"Upcoming"}
          category={"Movie"}
          url={
            "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
          }
        />
        <BrowsePanel
          heading={"Top Rated"}
          category={"Movie"}
          url={
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
          }
        />
        <BrowserSlider
          heading="Trending"
          category="TV Series"
          url="https://api.themoviedb.org/3/trending/tv/day?language=en-US"
        />
        <BrowsePanel
          heading={"Popular"}
          category={"TV Series"}
          url={"https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"}
        />
        <BrowsePanel
          heading={"Airing Today"}
          category={"TV Series"}
          url={
            "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1"
          }
        />
        <BrowsePanel
          heading={"On Air"}
          category={"TV Series"}
          url={"https://api.themoviedb.org/3/tv/on_the_air"}
        />
        <BrowsePanel
          heading={"Top Rated"}
          category={"TV Series"}
          url={"https://api.themoviedb.org/3/tv/top_rated"}
        />
      </main>
    </>
  );
}
