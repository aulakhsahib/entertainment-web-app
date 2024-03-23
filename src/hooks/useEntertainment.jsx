import EntertainmentContext from "../context/EntertainmentProvider";
import { useContext } from "react";

export default function useEntertainment() {
  return useContext(EntertainmentContext);
}
