import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "components/toast/ToastProvider";
import styled from "styled-components";
import RecipesPage from "pages/recipes-page";
import PreviewPage from "pages/preview-page";
import { RecipeProvider } from "./context/recipeContext";

export const AppContainer = styled.div(({ theme: { fonts, media } }) => ({
  fontFamily: `normal, ${fonts.main}`,
  maxWidth: "90%",
  margin: "auto",
  [media.tablet]: {
    maxWidth: "100%",
    minHeight: "100vh",
  },
}));

function App() {
  return (
    <ToastProvider>
      <RecipeProvider>
        <AppContainer>
          <Routes>
            <Route path="/" element={<RecipesPage />} />
            <Route path="/recipe" element={<PreviewPage />} />
          </Routes>
        </AppContainer>
      </RecipeProvider>
    </ToastProvider>
  );
}

export default App;
