import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { EntertainmentProvider } from "./context/EntertainmentProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <EntertainmentProvider>
    <App />
  </EntertainmentProvider>
);
