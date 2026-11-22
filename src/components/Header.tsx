import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import type { CSSProperties } from "react";
import Burger from "/assets/icon-hamburger.svg";
import arrow from "/assets/icon-chevron.svg";
import data from "../../lib/data.json";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigation = [
    "MERCURY",
    "VENUS",
    "EARTH",
    "MARS",
    "JUPITER",
    "SATURN",
    "URANUS",
    "NEPTUNE",
  ];

  const format = (name: string) => name[0] + name.slice(1).toLowerCase();

  return (
    <header className="relative z-50 border-b border-white/20 px-[24px] py-[16px] text-white md:px-[40px] md:pb-0 md:pt-[32px] lg:px-[32px] lg:py-0 lg:mb-[50px]">
      <div className="flex items-center justify-between md:flex-col md:gap-[39px] lg:flex-row lg:gap-0">
        <h1 className="font-[Antonio] text-[28px] font-normal uppercase leading-[100%] tracking-[-1px] lg:py-[22px]">
          THE PLANETS
        </h1>

        <img
          src={Burger}
          alt="Menu"
          onClick={() => setOpen(!open)}
          className="h-[17px] w-[24px] cursor-pointer transition-opacity md:hidden"
          style={open ? { opacity: 0.5 } : {}}
        />

        <nav className="hidden justify-center gap-[33px] pb-[27px] md:flex lg:py-[34px] lg:pb-[34px]">
          {navigation.map((name) => {
            const planetName = format(name);
            const color = data.find((p) => p.name === planetName)?.color;
            const active = pathname.endsWith(`/${planetName}`);

            return (
              <Link
                key={planetName}
                to={planetName}
                style={{ "--c": color } as CSSProperties}
                className={`text-[11px] font-bold leading-[25px] tracking-[1px] transition hover:text-[color:var(--c)] hover:opacity-100 ${
                  active ? "text-[color:var(--c)] opacity-100" : "opacity-75"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>

      {open && (
        <div className="absolute left-0 top-full z-40 h-screen w-full bg-[#070724]/95 px-[24px] pb-[67px] pt-[44px] backdrop-blur-md md:hidden">
          <nav>
            <ul>
              {navigation.map((name) => {
                const planetName = format(name);
                const color = data.find((p) => p.name === planetName)?.color;

                return (
                  <li
                    key={planetName}
                    className="mb-[20px] flex items-center justify-between border-b border-white/10 pb-[20px]"
                  >
                    <div className="flex items-center gap-[25px]">
                      <div
                        className="h-[20px] w-[20px] rounded-full"
                        style={{ background: color }}
                      />
                      <Link
                        to={planetName}
                        onClick={() => setOpen(false)}
                        className="text-[15px] font-bold leading-[25px] tracking-[1.36px]"
                      >
                        {name}
                      </Link>
                    </div>
                    <img src={arrow} alt="" />
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
