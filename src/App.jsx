import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import GenrePage from "./pages/GenrePage/GenrePage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
import TVDetailsPage from "./pages/TVDetailsPage/TVDetailsPage.jsx";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage.jsx";
import SeeMorePage from "./pages/SeeMorePage/SeeMorePage.jsx";
import AutocompleteWidget from "./components/AutocompleteWidget/AutocompleteWidget.jsx";
function App() {
  return (
    <BrowserRouter>
    <AutocompleteWidget />
      <Routes>
        {/* Movie Routes */}
        <Route index element={<HomePage />} />
        <Route path="movies" element={<Navigate to="/movies/discover" />} />
        <Route
          path="movies/genre"
          element={
            <GenrePage
              url="https://api.themoviedb.org/3/genre/movie/list"
              category="movie"
            />
          }
        />
        <Route path="movies/:id" element={<MovieDetailsPage />} />
        <Route
          path="movies/discover"
          element={<DiscoverPage category="movies" />}
        />
        {/* TV Routes */}
        <Route path="tv" element={<Navigate to="/tv/discover" />} />
        <Route
          path="tv/genre"
          element={
            <GenrePage
              url=" https://api.themoviedb.org/3/genre/tv/list"
              category="tv"
            />
          }
        />
        <Route path="tv/:id" element={<TVDetailsPage />} />
        <Route path="tv/discover" element={<DiscoverPage category="tv" />} />

        <Route path="/" element={<Layout />}>
          {[
            "movies/trending",
            "movies/popular",
            "movies/now_playing",
            "movies/upcoming",
            "movies/top_rated",
            "tv/trending",
            "tv/popular",
            "tv/airing_today",
            "tv/on_the_air",
            "tv/top_rated",
          ].map((path, index) => {
            const seeMorePath = transformedPath(path);
            return (
              <Route
                key={index}
                path={path}
                element={<SeeMorePage seeMorePath={seeMorePath} />}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function transformedPath(path) {
  let seeMorePath;
  if (path.includes("trending") && path.includes("movies")) {
    seeMorePath = "trending/movie/day";
  } else if (path.includes("trending") && path.includes("tv")) {
    seeMorePath = "trending/tv/day";
  }

  if (!seeMorePath) {
    seeMorePath = path.replace("movies", "movie");
  }
  return seeMorePath;
}
