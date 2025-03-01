import { Link } from "react-router-dom";

export default function Header() {
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
    <header>
      <h1>THE PLANETS</h1>
      <div>
        <nav>
          <ul>
            {navigation.map((Planet: string) => {
              return (
                <li key={Planet}>
                  <Link
                    to={Planet[0].toUpperCase() + Planet.slice(1).toLowerCase()}
                  >
                    {Planet}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
