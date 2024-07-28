import recipes from "../recipes.json";
import "./Recettes.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getItem, setItem } from "../adapters/api";

function Recettes() {
  const [weekName, setWeekName] = useState("rien");
  const [recipeSelected, setRecipeSelected] = useState([]);
  const navigate = useNavigate();

  const handleValidateWeek = () => {
    //stock le nom de la semaine + ce qui est coché dans la liste de la semaine
    const semaine = { name: weekName, recettes: recipeSelected };

    // recupere les infos depuis l'api
    getItem().then((data) => {
      //on entre dans le code de reponse de l'api 
      //le resultat de la promesse si tout se passe bien
      // si aucune donnee dispo, on definit semaines comme un tableau vide
      const semaines = data.result || []
      // quand les infos sont disponibles on ajoute la semaine
      semaines.push(semaine);
      // on met à jour les infos via l'api
      setItem(semaines).then(() => {
        //on change de page quand la donnée est correctement mise à jour
        navigate("/");
      })
    })
    
  };

  const handleChangeWeekName = (event) => {
    setWeekName(event.target.value);
  };

  const handleChangeCheckbox = (e) => {
    console.log("on reciepe", e.target);
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
          const recipeName = ' ' + recette.no + ' ' + recette.name
          return (
            <li className="recipesList" key={index}>
              <div className="recipesDisplay">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={recipeName}
                  value={recipeName}
                  onChange={handleChangeCheckbox}
                />
                {recipeName}
              </div>
            </li>
          );
        })}
      </div>
    </>
  );
}

export default Recettes;
