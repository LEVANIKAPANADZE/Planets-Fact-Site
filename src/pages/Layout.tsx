import Header from "../components/Header";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import type { PlanetName } from "../../lib/types";

const navigationNames: PlanetName[] = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

const navigationLinks = navigationNames.map((name) => `/${name}`);

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (!navigationLinks.includes(pathname)) {
      navigate("/Earth");
    }
  }, [pathname, navigate]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
