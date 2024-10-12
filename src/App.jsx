import "./App.css";
import Header from "./components/Header";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import auth from './auth';

function App() {
  auth.login()
  
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
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
