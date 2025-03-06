import { Link } from "react-router-dom";
import { useState } from "react";
import Burger from "/assets/icon-hamburger.svg";

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
    <header className="p-[234px]">
      <div className="flex  justify-between  ">
        {" "}
        <h1>THE PLANETS</h1>
        <img
          src={Burger}
          alt="CheeseBurger icon"
          onClick={() => SetCheeseBurger(!CheeseBurger)}
        />
      </div>
      {CheeseBurger ? (
        <div>
          <nav>
            <ul>
              {navigation.map((Planet) => {
                const planet =
                  Planet[0].toUpperCase() + Planet.slice(1).toLowerCase();

                return (
                  <li key={planet}>
                    <Link to={planet}>{Planet}</Link>
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
