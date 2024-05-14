import recipes from "../recipes.json";
import "./Recettes.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Recettes() {
  const [weekName, setWeekName] = useState("rien");
  const [recipeSelected, setRecipeSelected] = useState([]);
  const navigate = useNavigate();

  const handleValidateWeek = () => {
    //stock le nom de la semaine + ce qui est coché dans la liste de la semaine
    const semaine = { name: weekName, recettes: recipeSelected };
    //recupère en string tout les objets dans "mon stockage" ou un tableau vide
    const semainesString = localStorage.getItem("monStockage") || "[]";
    // remet en objet les semaines
    const semaines = JSON.parse(semainesString);
    semaines.push(semaine);
    localStorage.setItem("monStockage", JSON.stringify(semaines));
    //reset les checkbox
    navigate("/");
  };

  const handleChangeWeekName = (event) => {
    setWeekName(event.target.value);
  };

  const handleChangeCheckbox = (e) => {
    if (recipeSelected.includes(e.target.name)) {
      setRecipeSelected(
        recipeSelected.filter((item) => item !== e.target.name)
      );
    } else {
      // crée un nouveau tableau de résultats avec les nouvelles recettes sélectionnés
      const newArray = [...recipeSelected, e.target.name];
      setRecipeSelected(newArray);
    }
  };

  return (
    <>
      <section className="topRecipes">
        <input
          type="text"
          name="myInput"
          defaultValue="Semaine du "
          onChange={handleChangeWeekName}
        />
        <button className="buttonValidateWeek" onClick={handleValidateWeek}>
          Valider la semaine
        </button>
      </section>
      <div className="recipes">
        {recipes.map((recette, index) => {
          return (
            <li className="recipesList" key={index}>
              <div className="recipesDisplay">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={recette.name}
                  value={recette.name}
                  onChange={handleChangeCheckbox}
                />
                {recette.name}
              </div>
            </li>
          );
        })}
      </div>
    </>
  );
}

export default Recettes;
