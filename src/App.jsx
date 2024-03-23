import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import GenrePage from "./pages/GenrePage/GenrePage.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="movie"
            element={
              <GenrePage url="https://api.themoviedb.org/3/genre/movie/list" category="movie"/>
            }
          />
          <Route
            path="tv"
            element={
              <GenrePage url=" https://api.themoviedb.org/3/genre/tv/list" category="tv"/>
            }
          />
          <Route path="movie/:id" element="" />
          <Route path="tv/:id" element="" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
