import { useParams } from "react-router-dom";
import data from "../data.json";
import { useState } from "react";
import Wiki from "/assets/icon-source.svg";

type Section = "overview" | "structure" | "geology";

export default function Planet() {
  const { planetName } = useParams();
  const planet = data.find((planet) => planet.name === planetName);
  const [selection, setSelection] = useState("OVERVIEW");

  if (!planet) {
    return <h1>Planet not found. Redirecting to Earth...</h1>;
  }

  const lilInfo = {
    "ROTATION TIME": `${planet.rotation}`,
    "REVOLUTION TIME": `${planet.revolution}`,
    RADIUS: `${planet.radius}`,
    "AVERAGE TEMP.": `${planet.temperature}`,
  };


  const arr = [
    { type: "OVERVIEW", label: "OVERVIEW" },
    { type: "STRUCTURE", label: "STRUCTURE" },
    { type: "GEOLOGY", label: "SURFACE" },
  ];


  const Tarr = [
    { type: "OVERVIEW", num: "01", label: "OVERVIEW" },
    { type: "STRUCTURE", num: "02", label: "INTERNAL STRUCTURE" },
    { type: "GEOLOGY", num: "03", label: "SURFACE GEOLOGY" },
  ];

  const current = planet[selection.toLowerCase() as Section];


  const toCss = (v: unknown) => (typeof v === "number" ? `${v}px` : String(v));
  const sizeVars = {
    "--s": toCss(planet.size),
    "--g": toCss(planet.Ssize),
  } as React.CSSProperties;

  const planetImgClass =
    "w-[var(--s)] md:w-[calc(var(--s)*1.6)] lg:w-[calc(var(--s)*2.3)] max-w-full";

  return (
    <div className="w-full text-white" style={sizeVars}>
      <div className="md:hidden flex w-full border-b border-white/20">
        {arr.map((element) => (
          <span
            key={element.type}
            onClick={() => setSelection(element.type)}
            className={`flex-1 text-center cursor-pointer text-[9px] font-bold tracking-[2px] pt-[20px] pb-[17px] border-b-4 ${
              selection === element.type ? "opacity-100" : "opacity-50"
            }`}
            style={{
              borderBottomColor:
                selection === element.type ? planet.color : "transparent",
            }}
          >
            {element.label}
          </span>
        ))}
      </div>

      <div className="px-[24px] md:px-[40px] lg:px-[165px] max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:gap-[40px]">
          <div className="flex justify-center items-center w-full lg:flex-1 mt-[95px] mb-[98px] md:mt-[120px] md:mb-[126px] lg:my-[140px]">
            {selection === "GEOLOGY" ? (
              <div className="relative flex justify-center items-center">
                <img
                  className={`relative z-10 ${planetImgClass}`}
                  src={planet.images.planet}
                  alt={planet.name}
                />
                <img
                  className="absolute top-[65%] left-1/2 -translate-x-1/2 z-20 w-[var(--g)] md:w-[calc(var(--g)*1.6)] lg:w-[calc(var(--g)*2.3)]"
                  src={planet.images.geology}
                  alt="Geology"
                />
              </div>
            ) : (
              <img
                className={planetImgClass}
                src={
                  selection === "STRUCTURE"
                    ? planet.images.internal
                    : planet.images.planet
                }
                alt={planet.name}
              />
            )}
          </div>

       
          <div className="w-full md:flex md:items-center md:justify-between md:gap-[69px] lg:flex-col lg:items-start lg:justify-center lg:gap-[39px] lg:w-[350px] lg:shrink-0">
            <div className="flex flex-col items-center text-center md:items-start md:text-left md:max-w-[339px] lg:max-w-[350px]">
              <h1 className="font-[Antonio] uppercase font-normal text-[40px] md:text-[48px] lg:text-[80px] leading-[100%]">
                {planet.name}
              </h1>
              <p className="mt-[16px] md:mt-[23px] w-full max-w-[327px] md:max-w-none font-normal text-[11px] lg:text-[14px] leading-[22px] lg:leading-[25px] opacity-[75%]">
                {current?.content}
              </p>

              <div className="flex items-center mt-[32px] md:mt-[24px] gap-[7px] text-[12px] leading-[25px]">
                <span className="opacity-[50%] font-normal">Source :</span>
                <a
                  className="opacity-[50%] underline font-bold flex items-center hover:opacity-100"
                  href={current?.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                  <img
                    className="w-[12px] h-[12px] ml-[4px]"
                    src={Wiki}
                    alt="Arrow icon"
                  />
                </a>
              </div>
            </div>

           
            <div className="hidden md:flex flex-col gap-[16px] md:w-[281px] lg:w-full shrink-0">
              {Tarr.map((item) => {
                const active = selection === item.type;
                return (
                  <button
                    key={item.type}
                    onClick={() => setSelection(item.type)}
                    className={`flex items-center gap-[17px] lg:gap-[28px] px-[20px] lg:px-[28px] py-[8px] lg:py-[12px] border text-left text-[9px] lg:text-[12px] font-bold tracking-[2.6px] transition-colors ${
                      active
                        ? "border-transparent"
                        : "border-white/20 hover:bg-white/20"
                    }`}
                    style={{ background: active ? planet.color : undefined }}
                  >
                    <span className="opacity-50">{item.num}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      
        <div className="mt-[28px] mb-[47px] md:mt-[27px] lg:mt-[87px] flex flex-col gap-[8px] md:grid md:grid-cols-4 md:gap-[11px] lg:gap-[30px]">
          {Object.entries(lilInfo).map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between items-center md:flex-col md:items-start md:justify-center md:gap-[6px] lg:gap-[8px] border border-white/20 px-[24px] py-[9px] md:px-[15px] md:py-[16px] lg:px-[23px] lg:py-[20px]"
            >
              <span className="font-bold text-[8px] lg:text-[11px] tracking-[1px] leading-[16px] lg:leading-[25px] opacity-50 uppercase">
                {label}
              </span>
              <h2 className="text-[20px] md:text-[24px] lg:text-[40px] leading-[100%] font-[Antonio] uppercase">
                {value}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}