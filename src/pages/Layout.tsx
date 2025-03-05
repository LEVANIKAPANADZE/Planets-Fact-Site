import Header from "../components/Header";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {
  const navigationLinks: string[] = [
    "/Mercury",
    "/Venus",
    "/Earth",
    "/Mars",
    "/Jupiter",
    "/Saturn",
    "/Uranus",
    "/Neptune",
  ];

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
