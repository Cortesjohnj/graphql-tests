import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

function Recipes({ isVegetarian }) {
  const GET_RECIPES = gql`
    query {
      recipes(vegetarian: ${isVegetarian}) {
        id
        title
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RECIPES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.recipes.map((recipe) => (
    <li key={recipe.id}>
      <h2>{recipe.title}</h2>
    </li>
  ));
}

function Bottom() {
  const [isVegetarian, setIsVegetarian] = useState(false);

  const handleClick = () => {
    setIsVegetarian(!isVegetarian);
    console.log(isVegetarian);
  };

  return (
    <>
      <div className="bottom">
        <label for="bottom__checkbox">Vegetarian</label>
        <input onClick={handleClick} type="checkbox" id="bottom__checkbox" />
        <ul className="bottom__recipes-list">
          <Recipes isVegetarian={isVegetarian} />
        </ul>
      </div>
    </>
  );
}

export default Bottom;
