import { Outlet } from "react-router-dom";
import AutocompleteWidget from "../AutocompleteWidget/AutocompleteWidget";
import "./Layout.css";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <AutocompleteWidget />
      <Outlet />
    </>
  );
}
