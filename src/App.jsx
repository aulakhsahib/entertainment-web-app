import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import GenrePage from "./pages/GenrePage/GenrePage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
import TVDetailsPage from "./pages/TVDetailsPage/TVDetailsPage.jsx";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<Navigate to="/movies/discover" />} />
          <Route path="tv" element={<Navigate to="/tv/discover" />} />
          <Route
            path="movies/genre"
            element={
              <GenrePage
                url="https://api.themoviedb.org/3/genre/movie/list"
                category="movie"
              />
            }
          />
          <Route
            path="tv/genre"
            element={
              <GenrePage
                url=" https://api.themoviedb.org/3/genre/tv/list"
                category="tv"
              />
            }
          />
          <Route path="movies/:id" element={<MovieDetailsPage />} />
          <Route path="tv/:id" element={<TVDetailsPage />} />
          <Route
            path="movies/discover"
            element={<DiscoverPage category="movies" />}
          />
          <Route path="tv/discover" element={<DiscoverPage category="tv" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/* 
1. Discover Page Logic
2. Pagination Page Logic
*/
