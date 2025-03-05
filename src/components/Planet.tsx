import { useParams } from "react-router-dom";
import data from "../data.json";
import { useState } from "react";

export default function Planet() {
  interface Planet {
    name: string;
    overview: {
      content: string;
      source: string;
    };
    structure: {
      content: string;
      source: string;
    };
    geology: {
      content: string;
      source: string;
    };
    rotation: string;
    revolution: string;
    radius: string;
    temperature: string;
    images: {
      planet: string;
      internal: string;
      geology: string;
    };
  }

  const { planetName } = useParams();
  const planet: Planet | undefined = data.find(
    (planet) => planet.name === planetName
  );
  let [selection, setSelection] = useState("OVERVIEW");

  const arr = ["OVERVIEW", "STRUCTURE", "GEOLOGY"];
  console.log(selection);

  if (!planet) {
    return <h1>Planet not found. Redirecting to Earth...</h1>;
  }

  return (
    <div>
      <div>
        {arr.map((element) => {
          return (
            <span key={element} onClick={() => setSelection(element)}>
              {element}
            </span>
          );
        })}
      </div>

      <div>
        {" "}
        <img
          src={
            selection === "STRUCTURE"
              ? planet?.images.internal
              : selection === "GEOLOGY"
              ? planet?.images.geology
              : planet?.images.planet
          }
          alt={planet?.name}
        />
      </div>

      <div>
        {" "}
        <div>
          <h1>{planet?.name}</h1>
          <p>
            {planet[selection.toLowerCase()]?.content || (
              <h1>planet not found</h1>
            )}
          </p>
        </div>
        <div>
          <p>Source</p>

          <span>
            <a
              href={planet[selection.toLowerCase()]?.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              WIKIPEDIA
            </a>
          </span>
        </div>
      </div>

      <div>
        <div>
          ROTATION TIME <span>{planet?.rotation}</span>
        </div>

        <div>
          REVOLUTION TIME <span>{planet?.revolution}</span>
        </div>

        <div>
          radius <span>{planet?.radius}</span>
        </div>

        <div>
          AVERAGE TEMP <span>{planet?.temperature}</span>
        </div>
      </div>
    </div>
  );
}
