import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import data from "../../lib/data.json";
import type {
  Planet,
  PlanetInfo,
  PlanetSelection,
  PlanetTab,
} from "../../lib/types";
import Wiki from "/assets/icon-source.svg";

export default function Planet() {
  const { planetName } = useParams();
  const planets = data as Planet[];
  const planet = planets.find((p) => p.name === planetName);
  const [selection, setSelection] = useState<PlanetSelection>("OVERVIEW");

  useEffect(() => {
    setSelection("OVERVIEW");
  }, [planetName]);

  if (!planet) {
    return <h1>Planet not found. Redirecting to Earth...</h1>;
  }

  const current = planet[selection.toLowerCase() as PlanetInfo];
  const viewKey = `${planet.name}-${selection}`;

  const stats = {
    "ROTATION TIME": planet.rotation,
    "REVOLUTION TIME": planet.revolution,
    RADIUS: planet.radius,
    "AVERAGE TEMP.": planet.temperature,
  };

  const tabs: PlanetTab[] = [
    { type: "OVERVIEW", short: "OVERVIEW", full: "OVERVIEW", num: "01" },
    {
      type: "STRUCTURE",
      short: "STRUCTURE",
      full: "INTERNAL STRUCTURE",
      num: "02",
    },
    { type: "GEOLOGY", short: "SURFACE", full: "SURFACE GEOLOGY", num: "03" },
  ];

  const vars = {
    "--s": planet.size,
    "--t": planet.Tsize,
    "--d": planet.Dsize,
    "--g": planet.Ssize,
    "--dg": planet.DSsize,
    "--c": planet.color,
  } as CSSProperties;

  const planetImg = "relative w-[var(--s)] md:w-[var(--t)] lg:w-[var(--d)]";

  return (
    <div className="w-full text-white" style={vars}>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${planet.color}26, transparent 60%)`,
        }}
      />

      <div className="flex w-full border-b border-white/10 md:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.type}
            onClick={() => setSelection(tab.type)}
            className={`flex-1 cursor-pointer border-b-4 pb-[17px] pt-[20px] text-[9px] font-bold tracking-[2px] transition-opacity ${
              selection === tab.type ? "opacity-100" : "opacity-50"
            }`}
            style={{
              borderBottomColor:
                selection === tab.type ? planet.color : "transparent",
            }}
          >
            {tab.short}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-[1440px] px-[24px] md:px-[40px] lg:px-[165px]">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:gap-[40px]">
          <div className="mb-[98px] mt-[95px] flex w-full items-center justify-center md:mb-[126px] md:mt-[120px] lg:my-[100px] lg:flex-1">
            <div
              key={viewKey}
              className="fade-up transition-transform duration-500 hover:scale-105"
            >
              <div className="float relative flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full opacity-40 blur-[80px]"
                  style={{ background: planet.color }}
                />
                {selection === "GEOLOGY" ? (
                  <div className="relative flex items-center justify-center">
                    <img
                      className={`${planetImg} z-10`}
                      src={planet.images.planet}
                      alt={planet.name}
                    />
                    <img
                      className="absolute left-1/2 top-[65%] z-20 w-[var(--g)] -translate-x-1/2 md:w-[calc(var(--g)*1.65)] lg:w-[var(--dg)]"
                      src={planet.images.geology}
                      alt="Geology"
                    />
                  </div>
                ) : (
                  <img
                    className={planetImg}
                    src={
                      selection === "STRUCTURE"
                        ? planet.images.internal
                        : planet.images.planet
                    }
                    alt={planet.name}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:flex md:items-center md:justify-between md:gap-[69px] lg:w-[350px] lg:shrink-0 lg:flex-col lg:items-start lg:gap-[56px]">
            <div
              key={`text-${viewKey}`}
              className="fade-up flex flex-col items-center text-center md:max-w-[339px] md:items-start md:text-left lg:max-w-[350px]"
            >
              <h1 className="font-[Antonio] text-[40px] font-normal uppercase leading-[100%] md:text-[48px] lg:text-[80px]">
                {planet.name}
              </h1>
              <p className="mt-[16px] w-full max-w-[327px] text-[11px] leading-[22px] opacity-75 md:mt-[23px] md:max-w-none lg:text-[14px] lg:leading-[25px]">
                {current.content}
              </p>
              <div className="mt-[32px] flex items-center gap-[7px] text-[12px] leading-[25px] md:mt-[24px]">
                <span className="opacity-50">Source :</span>
                <a
                  href={current.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center font-bold underline opacity-50 transition-opacity hover:opacity-100"
                >
                  Wikipedia
                  <img
                    className="ml-[4px] h-[12px] w-[12px]"
                    src={Wiki}
                    alt=""
                  />
                </a>
              </div>
            </div>

            <div className="hidden shrink-0 flex-col gap-[16px] md:flex md:w-[281px] lg:w-full lg:gap-[24px]">
              {tabs.map((tab) => {
                const active = selection === tab.type;
                return (
                  <button
                    key={tab.type}
                    onClick={() => setSelection(tab.type)}
                    className={`flex cursor-pointer items-center gap-[17px] border px-[20px] py-[8px] text-left text-[9px] font-bold tracking-[2.6px] transition duration-300 hover:translate-x-1 lg:gap-[28px] lg:px-[28px] lg:py-[16px] lg:text-[12px] ${
                      active
                        ? "border-transparent"
                        : "border-white/20 hover:bg-white/15"
                    }`}
                    style={{
                      background: active ? planet.color : undefined,
                      boxShadow: active
                        ? `0 0 30px ${planet.color}66`
                        : undefined,
                    }}
                  >
                    <span className="opacity-50">{tab.num}</span>
                    <span>{tab.full}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-[47px] mt-[28px] flex flex-col gap-[8px] md:mt-[27px] md:grid md:grid-cols-4 md:gap-[11px] lg:mt-[90px] lg:gap-[40px]">
          {Object.entries(stats).map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between border border-t-2 border-white/15 border-t-[color:var(--c)] bg-white/5 px-[24px] py-[9px] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[color:var(--c)] md:flex-col md:items-start md:justify-center md:gap-[6px] md:px-[15px] md:py-[16px] lg:gap-[8px] lg:px-[23px] lg:py-[24px]"
            >
              <span className="text-[8px] font-bold uppercase leading-[16px] tracking-[1px] opacity-50 lg:text-[11px] lg:leading-[25px]">
                {label}
              </span>
              <h2 className="font-[Antonio] text-[20px] uppercase leading-[100%] md:text-[24.5px] lg:text-[40px]">
                {value}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
