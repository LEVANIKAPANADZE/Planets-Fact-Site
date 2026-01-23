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
    <header
      className="relative z-50 px-[24px] py-[16px] border-b 
      border-gray-400 md:py-[32px] 
    border-none"
    >
      <div className="flex justify-center items-center relative">
        <h1
          className="font-[Antonio] font-normal text-[28px] 
        md: tracking-[1px] leading-[100%]"
        >
          THE PLANETS
        </h1>
        <img
          src={Burger}
          alt="CheeseBurger icon"
          onClick={() => SetCheeseBurger(!CheeseBurger)}
          className="w-[24px] h-[17px] absolute right-0 md:hidden"
          style={CheeseBurger ? { filter: "brightness(0.5)" } : {}}
        />
      </div>

      <nav className="hidden md:flex justify-center mt-[39px] gap-[33px]">
        {navigation.map((PlanetName) => {
          const formattedPlanet =
            PlanetName[0].toUpperCase() + PlanetName.slice(1).toLowerCase();

          return (
            <Link
              key={formattedPlanet}
              className="font-[700] text-white 
              hover:text-gray-400 transition 
              md: text-[11px]"
              to={formattedPlanet}
            >
              {PlanetName}
            </Link>
          );
        })}
      </nav>

      {CheeseBurger && (
        <div
          className="opacity-[92%] absolute top-full left-0 w-full 
      bg-[#070724] h-screen z-40 px-[24px] pt-[44px] pb-[67px] md:hidden"
        >
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
                    className="flex items-center justify-between mb-[20px] border-b border-gray-500 pb-[10px]"
                  >
                    <div className="flex items-center gap-[25px] justify-center">
                      <div
                        style={{
                          background: planetInfo?.color,
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <Link
                        className="font-[700] leading-[15px]"
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
