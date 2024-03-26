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
          to="movies/trending"
          url="https://api.themoviedb.org/3/trending/movie/day?&page=1"
        />
        <BrowsePanel
          heading={"Popular"}
          category={"Movie"}
          to="movies/popular"
          url={"https://api.themoviedb.org/3/movie/popular?&page=1"}
        />
        <BrowsePanel
          heading={"Now Playing"}
          category={"Movie"}
          to="movies/now_playing"
          url={"https://api.themoviedb.org/3/movie/now_playing?&page=1"}
        />
        <BrowsePanel
          heading={"Upcoming"}
          category={"Movie"}
          to="movies/upcoming"
          url={"https://api.themoviedb.org/3/movie/upcoming?&page=1"}
        />
        <BrowsePanel
          heading={"Top Rated"}
          category={"Movie"}
          to="movies/top_rated"
          url={"https://api.themoviedb.org/3/movie/top_rated?&page=1"}
        />
        <BrowserSlider
          heading="Trending"
          category="TV Series"
          to="tv/trending"
          url="https://api.themoviedb.org/3/trending/tv/day?"
        />
        <BrowsePanel
          heading={"Popular"}
          category={"TV Series"}
          to="tv/popular"
          url={"https://api.themoviedb.org/3/tv/popular?&page=1"}
        />
        <BrowsePanel
          heading={"Airing Today"}
          category={"TV Series"}
          to="tv/airing_today"
          url={"https://api.themoviedb.org/3/tv/airing_today?&page=1"}
        />
        <BrowsePanel
          heading={"On Air"}
          category={"TV Series"}
          to="tv/on_the_air"
          url={"https://api.themoviedb.org/3/tv/on_the_air"}
        />
        <BrowsePanel
          heading={"Top Rated"}
          category={"TV Series"}
          to="tv/top_rated"
          url={"https://api.themoviedb.org/3/tv/top_rated"}
        />
      </main>
    </>
  );
}
