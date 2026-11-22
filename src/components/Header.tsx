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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070724]/70 px-[24px] py-[16px] text-white backdrop-blur-md md:px-[40px] md:pb-0 md:pt-[32px] lg:mb-[50px] lg:px-[32px] lg:py-0">
      <div className="flex items-center justify-between md:flex-col md:gap-[39px] lg:flex-row lg:gap-0">
        <Link to="/Earth">
          <h1 className="font-[Antonio] text-[28px] font-normal uppercase leading-[100%] tracking-[-1px] transition-opacity hover:opacity-70 lg:py-[22px]">
            THE PLANETS
          </h1>
        </Link>

        <img
          src={Burger}
          alt="Menu"
          onClick={() => setOpen(!open)}
          className="h-[17px] w-[24px] cursor-pointer transition-opacity md:hidden"
          style={open ? { opacity: 0.5 } : {}}
        />

        <nav className="hidden justify-center gap-[33px] pb-[27px] md:flex lg:py-[34px]">
          {navigation.map((name) => {
            const planetName = format(name);
            const color = data.find((p) => p.name === planetName)?.color;
            const active = pathname.endsWith(`/${planetName}`);

            return (
              <Link
                key={planetName}
                to={planetName}
                style={{ "--c": color } as CSSProperties}
                className={`border-b-2 pb-[4px] text-[11px] font-bold leading-[25px] tracking-[1px] transition hover:border-[color:var(--c)] hover:text-[color:var(--c)] hover:opacity-100 ${
                  active
                    ? "border-[color:var(--c)] text-[color:var(--c)] opacity-100"
                    : "border-transparent opacity-75"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>

      {open && (
        <div className="fade-up absolute left-0 top-full z-40 h-screen w-full bg-[#070724]/95 px-[24px] pb-[67px] pt-[44px] backdrop-blur-md md:hidden">
          <nav>
            <ul>
              {navigation.map((name) => {
                const planetName = format(name);
                const color = data.find((p) => p.name === planetName)?.color;

                return (
                  <li key={planetName}>
                    <Link
                      to={planetName}
                      onClick={() => setOpen(false)}
                      className="mb-[20px] flex items-center justify-between border-b border-white/10 pb-[20px] transition-opacity hover:opacity-70"
                    >
                      <div className="flex items-center gap-[25px]">
                        <div
                          className="h-[20px] w-[20px] rounded-full"
                          style={{
                            background: color,
                            boxShadow: `0 0 14px ${color}`,
                          }}
                        />
                        <span className="text-[15px] font-bold leading-[25px] tracking-[1.36px]">
                          {name}
                        </span>
                      </div>
                      <img src={arrow} alt="" />
                    </Link>
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
