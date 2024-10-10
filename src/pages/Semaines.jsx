import "./Semaines.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getItem, setItem } from "../adapters/api";

function Semaines() {
  const navigate = useNavigate();
  const [semaines, setSemaines] = useState([]);

  // recupère les infos de "mon stockage" et les remet en objet ou récupère un tableau vide
  useEffect(() => {
    getItem().then((data) => {
      setSemaines(data.result || []);
    });
  }, []);

  const handleDeleteWeek = (index) => {
    const updatedWeeks = [...semaines];
    updatedWeeks.splice(index, 1);
    setSemaines(updatedWeeks);
    setItem(updatedWeeks);
  };

  const handleBasket = (index) => {
    navigate(`/Paniers/${index}`);
  };

  return (
    <div>
      {semaines.map((semaine, index) => (
        <div className="Semaines" key={index}>
          <h3 className="weekName">{semaine.weekName}</h3>
          <ul className="recipeList">
            {console.log(semaine.recettes)}
            {semaine.recipes.map((recipe, idx) => (
              <li key={idx}>
                {recipe.no} -
                <Link
                  to={`https://hellowesh.utopland.net/recipies/${recipe.no}.pdf`}
                  target="_blank"
                >
                  {recipe.name}
                </Link>
              </li>
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
