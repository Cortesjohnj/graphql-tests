/* eslint-disable */
import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

function Top() {
  const [input, setInput] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);

  const ADD_RECIPE = gql`
    mutation ($input: RecipeInput!) {
      addRecipe(recipe: $input) {
        id
        title
        vegetarian
      }
    }
  `;
  const [addRecipe] = useMutation(ADD_RECIPE);

  const onHandleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    setIsVegetarian(!isVegetarian);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
    addRecipe({
      variables: { input: { title: input, vegetarian: isVegetarian } },
    });
  };

  return (
    <div>
      <h3>Title</h3>
      <input name="input" value={input} onChange={onHandleChange} type="text" />
      <label htmlFor="checkbox">Vegetarian</label>
      <input onClick={handleClick} type="checkbox" />
      <button onClick={handleSubmit}>Add Recipe</button>
    </div>
  );
}

export default Top;
