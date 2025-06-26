import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-inner flex justify-around py-2 z-10">
      <Link
        to="/home"
        className={`text-sm ${
          location.pathname === "/home"
            ? "text-blue-700 font-semibold"
            : "text-blue-500"
        }`}
      >
        Inicio
      </Link>
      <Link
        to="/inspection"
        className={`text-sm ${
          location.pathname === "/inspection"
            ? "text-blue-700 font-semibold"
            : "text-blue-500"
        }`}
      >
        Inspección
      </Link>
      <Link
        to="/map"
        className={`text-sm ${
          location.pathname === "/map"
            ? "text-blue-700 font-semibold"
            : "text-blue-500"
        }`}
      >
        Mapa
      </Link>
    </nav>
  );
};

export default Navigation;
