import { Link } from "react-router-dom";
import { useState } from "react";
import Burger from "/assets/icon-hamburger.svg";
import arrow from "/assets/icon-chevron.svg";
import data from "../data.json";

export default function Header() {
  const [CheeseBurger, SetCheeseBurger] = useState(false);
  const navigation: string[] = [
    "MERCURY",
    "VENUS",
    "EARTH",
    "MARS",
    "JUPITER",
    "SATURN",
    "URANUS",
    "NEPTUNE",
  ];

  return (
    <header className="relative z-50 text-white border-b border-white/20 px-[24px] py-[16px] md:px-[40px] md:pt-[32px] md:pb-0 lg:px-[32px] lg:py-0">
      <div className="flex items-center justify-between md:flex-col md:gap-[39px] lg:flex-row lg:gap-0">
        <h1 className="font-[Antonio] font-normal uppercase text-[28px] tracking-[-1px] md:tracking-[-1.05px] leading-[100%] lg:py-[22px]">
          THE PLANETS
        </h1>

        <img
          src={Burger}
          alt="CheeseBurger icon"
          onClick={() => SetCheeseBurger(!CheeseBurger)}
          className="w-[24px] h-[17px] cursor-pointer md:hidden"
          style={CheeseBurger ? { filter: "brightness(0.5)" } : {}}
        />

        <nav className="hidden md:flex justify-center gap-[33px] pb-[27px] lg:pb-0 lg:py-[34px]">
          {navigation.map((PlanetName) => {
            const formattedPlanet =
              PlanetName[0].toUpperCase() + PlanetName.slice(1).toLowerCase();

            return (
              <Link
                key={formattedPlanet}
                className="font-bold text-[11px] tracking-[1px] leading-[25px] text-white opacity-75 hover:opacity-100 transition"
                to={formattedPlanet}
              >
                {PlanetName}
              </Link>
            );
          })}
        </nav>
      </div>

      {CheeseBurger && (
        <div className="absolute top-full left-0 w-full bg-[#070724] h-screen z-40 px-[24px] pt-[44px] pb-[67px] md:hidden">
          <nav>
            <ul>
              {navigation.map((PlanetName) => {
                const formattedPlanet =
                  PlanetName[0].toUpperCase() +
                  PlanetName.slice(1).toLowerCase();
                const planetInfo = data.find(
                  (planet) => planet.name === formattedPlanet,
                );

                return (
                  <li
                    key={formattedPlanet}
                    className="flex items-center justify-between mb-[20px] border-b border-white/10 pb-[20px]"
                  >
                    <div className="flex items-center gap-[25px]">
                      <div
                        style={{
                          background: planetInfo?.color,
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <Link
                        className="font-bold text-[15px] tracking-[1.36px] leading-[25px]"
                        to={formattedPlanet}
                        onClick={() => SetCheeseBurger(false)}
                      >
                        {PlanetName}
                      </Link>
                    </div>
                    <img src={arrow} alt="Arrow icon" />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}