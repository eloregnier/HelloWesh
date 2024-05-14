import "./Semaines.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Semaines() {
  const navigate = useNavigate();
  const [semaines, setSemaines] = useState([]);
  // recupère les infos de "mon stockage" et les remet en objet ou récupère un tableau vide
  useEffect(() => {
    const storedWeeks = JSON.parse(localStorage.getItem("monStockage") || "[]");
    setSemaines(storedWeeks);
  }, []);

  const handleDeleteWeek = (index) => {
    const updatedWeeks = [...semaines];
    updatedWeeks.splice(index, 1);
    setSemaines(updatedWeeks);
    localStorage.setItem("monStockage", JSON.stringify(updatedWeeks));
  };

  const handleBasket = (index) => {
    navigate(`/Paniers/${index}`);
  };

  return (
    <div>
      {semaines.map((semaine, index) => (
        <div className="Semaines" key={index}>
          <h3 className="weekName">{semaine.name}</h3>
          <ul className="recipeList">
            {semaine.recettes.map((recipe, idx) => (
              <li key={idx}>{recipe}</li>
            ))}
          </ul>
          <button
            className="buttonWeek"
            onClick={() => handleDeleteWeek(index)}
          >
            Supprimer la semaine
          </button>
          <button className="buttonWeek" onClick={() => handleBasket(index)}>
            Voir mon panier
          </button>
        </div>
      ))}
    </div>
  );
}

export default Semaines;
