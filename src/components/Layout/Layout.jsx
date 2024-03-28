import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";
import AutocompleteWidget from "../AutocompleteWidget/AutocompleteWidget";

export default function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="movies/genre">Movies</NavLink>
        <NavLink to="tv/genre">TV Series</NavLink>
      </nav>
      <AutocompleteWidget />
      <Outlet />
    </>
  );
}
