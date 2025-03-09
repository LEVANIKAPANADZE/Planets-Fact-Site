import { useParams } from "react-router-dom";
import data from "../data.json";
import { useState } from "react";
import Wiki from "/assets/icon-source.svg";

export default function Planet() {
  const { planetName } = useParams();
  const planet = data.find((planet) => planet.name === planetName);
  const [selection, setSelection] = useState("OVERVIEW");
  const lilInfo = {
    "ROTATION TIME": "16.08 hours",
    "REVOLUTION TIME": "164.79 years",
    RADIUS: "24,622 km",
    "AVERAGE TEMP.": "-201°c",
  };

  const arr = ["OVERVIEW", "STRUCTURE", "GEOLOGY"];

  if (!planet) {
    return <h1>Planet not found. Redirecting to Earth...</h1>;
  }

  return (
    <div className="px-[24px] flex flex-col items-center">
      <div className="mt-[20px] flex items-center justify-center gap-[43px]">
        {arr.map((element) => (
          <span
            key={element}
            onClick={() => setSelection(element)}
            className={`leading-[100%] text-[9px] font-bold tracking-[5px] pb-[17px] ${
              selection === element
                ? "opacity-100 text-white border-b-4"
                : "opacity-20 text-opacity-50"
            }`}
            style={{
              borderBottomColor:
                selection === element ? planet.color : "transparent",
            }}
          >
            {element}
          </span>
        ))}
      </div>

      <div>
        {selection === "GEOLOGY" ? (
          <div className="relative flex justify-center items-center mt-[64px]">
            <img
              className="relative z-10"
              src={planet.images.planet}
              alt={planet.name}
              style={{ width: planet.size }}
            />

            {selection === "GEOLOGY" && (
              <img
                className="absolute top-[65%] left-1/2 transform -translate-x-1/2 z-20"
                src={planet.images.geology}
                alt="Geology"
                style={{ width: planet.Ssize }}
              />
            )}
          </div>
        ) : (
          <img
            className="mt-[64px]"
            style={{ width: planet.size }}
            src={
              selection === "STRUCTURE"
                ? planet.images.internal
                : planet.images.planet
            }
            alt={planet.name}
          />
        )}
      </div>

      <div className="text-white mt-[67px] flex flex-col gap-[16px] items-center justify-center">
        <h1 className="font-[Antonio] uppercase font-normal text-[40px] leading-[100%]">
          {planet.name}
        </h1>
        <p className="w-[327px] font-normal text-[11px] leading-[22px] text-center opacity-[50%]">
          {planet[selection.toLowerCase() as planetInfo]?.content}
        </p>
      </div>

      <div className="text-white flex items center w-[139px] mt-[32px]">
        <p className="mr-[7px] opacity-[50%] font-normal text-[12px] leading-[25px]">
          Source:
        </p>
        <a
          className="opacity-[50%] underline font-bold text-[12px] leading-[25px] flex items-center"
          href={planet[selection.toLowerCase() as planetInfo]?.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          WIKIPEDIA
          <img
            className="w-[12px] h-[12px] ml-[2px]"
            src={Wiki}
            alt="Arrow icon"
          />
        </a>
      </div>

      <div
        className="text-white w-[327px] mt-[32px] 
  flex flex-col gap-[8px] mb-[47px]"
      >
        {Object.entries(lilInfo).map(([label, value], index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center border border-white/20  
        px-5 py-3 w-full"
            >
              <span className="font-bold text-[10px] leading-[16px] opacity-50">
                {label}
              </span>
              <h2 className="text-[20px] leading-[100%] font-[Antonio]">
                {value}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
