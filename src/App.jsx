import "./App.css";
import Header from "./components/Header";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { WeekProvider } from "./contexts/WeekNameContext";

function App() {
  const [navColor, setNavColor] = useState(0);

  const handleClickNav = (index) => {
    setNavColor(index);
  };
  return (
    <>
      <Header />
      <nav className="navBar">
        <Link
          to="/"
          className={`navLink ${navColor === 0 ? "active" : ""}`}
          onClick={() => handleClickNav(0)}
        >
          Semaines
        </Link>
        <Link
          to="/Recettes"
          className={`navLink ${navColor === 1 ? "active" : ""}`}
          onClick={() => handleClickNav(1)}
        >
          Recettes
        </Link>
        <Link
          to="/Paniers"
          className={`navLink ${navColor === 2 ? "active" : ""}`}
          onClick={() => handleClickNav(2)}
        >
          Paniers
        </Link>
      </nav>
      <main>
        <WeekProvider>
          <Outlet />
        </WeekProvider>
      </main>
    </>
  );
}

export default App;
