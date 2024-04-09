import { Outlet } from "react-router-dom";
import AutocompleteWidget from "../AutocompleteWidget/AutocompleteWidget";
import "./Layout.css";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <div className="main-content-container">
      <Navbar className="navbar-container" />
      <div>
        <AutocompleteWidget />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
