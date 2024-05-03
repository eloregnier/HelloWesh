import recipes from "../recipes.json";
import "./Recettes.css";
import { useWeekContext } from "../contexts/WeekNameContext";
import { useNavigate } from "react-router-dom";

function Recettes() {
  // possibilité de supprimer ce contexte en utilisant directement le useState ici
  const { weekName, setWeekName } = useWeekContext();
  const navigate = useNavigate();
  const handleValidateWeek = () => {
    // ajouter tout ce qui est coché dans la liste de la semaine
    //stock le nom de la semaine
    const maSemaine = { name: weekName, recettes: ["slip", "jambon"] };
    localStorage.setItem("monStockage", JSON.stringify(maSemaine));
    //reset les checkbox

    navigate("/");
  };

  const handleChangeWeekName = (event) => {
    setWeekName(event.target.value);
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
