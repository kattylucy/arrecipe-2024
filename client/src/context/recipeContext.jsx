import React, { createContext, useContext, useState } from "react";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipe, setRecipe] = useState({});

  return (
    <RecipeContext.Provider value={{ recipe, setRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};
