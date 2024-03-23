import { Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <h1>header</h1>
      <Outlet />
    </>
  );
}
