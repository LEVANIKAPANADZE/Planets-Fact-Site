import { useParams } from "react-router-dom";
import data from "../data.json";

export default function Planet() {
  const { planetName } = useParams();
  const planet = data.find((planet) => planet.name === planetName);

  return <div>{planet?.name}</div>;
}
