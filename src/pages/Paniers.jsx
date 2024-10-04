import "./Paniers.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import recipes from "../recipes.json";
import { getItem } from "../adapters/api";

function Paniers() {
  // permet d'aller sur le bon Panier grace à l'ID
  const [computedBasket, setBasket] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // je récupère la liste des semaines que je retransforme en objet
    getItem().then((data) => {
      const storedWeeks = data.result || [];
      const storedWeek = storedWeeks[id];
      const basket = {};
      // je récupère les recettes de cette semaines
      for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < storedWeek.recipes.length; j++) {
          // je compare les recettes de ma semaine avec ceux du JSON
          if (recipes[i].name === storedWeek.recipes[j].name) {
            // je récupère les ingrédients de chaque recette dans le JSON
            for (let k = 0; k < recipes[i].ingredients.length; k++) {
              const ingredient = recipes[i].ingredients[k];
              // j'additionne les ingedients similaires sinon j'ajoute l'ingredient dans basket
              if (basket[ingredient.name]) {
                basket[ingredient.name].quantity += parseInt(
                  ingredient.quantity
                );
              } else {
                basket[ingredient.name] = {
                  quantity: parseFloat(ingredient.quantity),
                  quantity_type: ingredient.quantity_type,
                };
              }
            }
          }
        }
      }
      setBasket(basket);
    });
  }, [id]);

  // je récupère la bonne semaine grace à l'index
  return (
    <div className="Paniers">
      <h3 className="basketTitle">Ma liste de course pour la semaine :</h3>
      <div>
        {Object.entries(computedBasket).map((name_qty, index) => {
          return (
            <li className="basketList" key={index}>
              <p className="ingredient">{name_qty[0]}</p>
              <p className="ingredient">{name_qty[1].quantity}</p>
              <p className="ingredient">{name_qty[1].quantity_type}</p>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default Paniers;
