import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Recipe from "./Recipe";
import "./App.css";
require("dotenv").config();

function App() {
  const REACT_APP_ID = process.env.REACT_APP_ID;
  const REACT_APP_KEY = process.env.REACT_APP_KEY;

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${REACT_APP_ID}&app_key=${REACT_APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };
  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map((recipe) => (
        <Recipe
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
}

export default App;
