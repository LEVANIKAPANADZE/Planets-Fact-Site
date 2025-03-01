import { Link } from "react-router-dom";
import { useState } from "react";
import Burger from "/public/assets/icon-hamburger.svg";

export default function Header() {
  const [burger, SetBurger] = useState(false);

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
    <header className="py-4 px-6">
      <div className="flex flex-row flex-col">
        {" "}
        <h1>THE PLANETS</h1>
        <img
          src={Burger}
          alt="Burger icon"
          onClick={() => SetBurger(!burger)}
        />
      </div>

      {burger ? (
        <div>
          <nav>
            <ul>
              {navigation.map((Planet: string) => {
                return (
                  <li key={Planet}>
                    <Link
                      to={
                        Planet[0].toUpperCase() + Planet.slice(1).toLowerCase()
                      }
                    >
                      {Planet}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
