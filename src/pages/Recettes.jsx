import recipes from "../recipes.json";
import "./Recettes.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { getItem, setItem } from "../adapters/api";

function Recettes() {
  const [weekName, setWeekName] = useState("date non renseignée");
  const [recipesSelected, setRecipesSelected] = useState([]);
  const navigate = useNavigate();

  const handleValidateWeek = () => {
    //stock le nom de la semaine + ce qui est coché dans la liste de la semaine
    const newWeek = { weekName, recipes: recipesSelected };

    // recupere les infos depuis l'api
    getItem().then((data) => {
      //on entre dans le code de reponse de l'api
      //le resultat de la promesse si tout se passe bien
      // si aucune donnee dispo, on definit semaines comme un tableau vide
      const semaines = data.result || [];
      // quand les infos sont disponibles on ajoute la semaine
      semaines.push(newWeek);
      // on met à jour les infos via l'api
      setItem(semaines).then(() => {
        //on change de page quand la donnée est correctement mise à jour
        navigate("/");
      });
    });
  };

  const handleChangeWeekName = (event) => {
    setWeekName(event.target.value);
  };

  const handleChangeCheckbox = (recette) => {
    console.log("on recipe", recette);
    const recipeFullName = { no: recette.no, name: recette.name };
    if (recipesSelected.includes(recipeFullName)) {
      console.log("plop", recipeFullName);
      setRecipesSelected(
        recipesSelected.filter((item) => item !== recipeFullName)
      );
    } else {
      // crée un nouveau tableau de résultats avec les nouvelles recettes sélectionnés
      console.log("nouvelle recette", recipeFullName);
      const newArray = [...recipesSelected, recipeFullName];
      setRecipesSelected(newArray);
    }
  };

  const [typeSelectionned, setTypeSelectionned] = useState(null);
  const handleClickType = (type) => {
    setTypeSelectionned(type);
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
      <section className="filters">
        {[...new Set(recipes.map((recette) => recette.type))].map(
          (type, index) => (
            <button key={index} onClick={() => handleClickType(type)}>
              {type}
            </button>
          )
        )}
        <button onClick={() => handleClickType(null)}>Tout afficher</button>
      </section>
      <div className="recipes">
        {recipes
          .filter(
            (recette) =>
              typeSelectionned === null || recette.type === typeSelectionned
          )
          .map((recette, index) => (
            <li className="recipesList" key={index}>
              <div className="recipesDisplay">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={recette.name}
                  value={recette}
                  onChange={() => handleChangeCheckbox(recette)}
                />
                {`${recette.no} - `}
                <Link
                  to={`https://hellowesh.utopland.net/recipies/${recette.no}.pdf`}
                  target="_blank"
                >
                  {recette.name}
                </Link>
              </div>
            </li>
          ))}
      </div>
    </>
  );
}

export default Recettes;
