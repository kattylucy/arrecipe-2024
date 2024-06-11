import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";
import { Modal } from "components/modal/Modal";
import { TextInput } from "components/text-input/TextInput";
import { AutoComplete } from "components/autocomplete/Autocomplete";
import { ChipList } from "components/chip-list/ChipList";
import { InputLabel } from "components/UI/Texts";
import { Button } from "components/button/Button";
import { useGetTypes } from "queries/useGetTypes";
import { useRecipeContext } from "context/recipeContext";
import { SizeSelectorComponent } from "./SizeSelectorComponent";
import { IngredientsView } from "./IngredientsView";

type CreateRecipeModalProps = {
  calories?: string;
  cookingTime?: string;
  id?: number;
  isEditing?: boolean;
  url?: string;
  name?: string;
  thumbnail?: string;
  tag?: string;
  closeModal: () => void;
  visible: boolean;
};

interface ListItem {
  name: string;
  _id: string;
}

interface RecipeType {
  name?: string;
  prepTime?: string;
  caloriesPerServing?: string;
  servingSize?: string;
  diet?: ListItem[];
  intolerance?: ListItem[];
  ingredients?: ListItem[];
  cuisine?: ListItem[];
  tags?: object;
  instructions?: Array<{ label: string; text: string }>;
}

const Body = styled.div({
  padding: 14,
});

const Footer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  margin: 20,
});

const fields = [
  {
    id: "diet",
    label: "Diet Type",
    placeholder: "Eg. Gluten-Free",
    fetchUrl: "diets",
  },
  {
    id: "intolerance",
    label: "Intolerance",
    placeholder: "Eg. Dairy",
    fetchUrl: "intolerances",
  },
  {
    id: "cuisine",
    label: "Cuisine",
    placeholder: "Eg. Argentinian",
    fetchUrl: "cuisine",
  },
];

export const RecipeModal: React.FC<CreateRecipeModalProps> = ({
  calories,
  cookingTime,
  id,
  isEditing = false,
  url,
  name,
  tag,
  closeModal,
  visible,
}) => {
  const [view, setView] = useState<number>(0);
  const { recipe, setRecipe } = useRecipeContext();
  const { data: chipList, isLoading } = useGetTypes({
    url: "/tags",
    enabled: true,
  });

  const addValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [id]: value }));
  }, []);

  const setTypes = useCallback(
    (key: string, value: Array<ListItem>) => {
      setRecipe({ ...recipe, [key]: value });
    },
    [recipe]
  );

  const handleNext = useCallback(() => {
    if (view === 4) {
      console.log("create recipe", recipe);
    } else {
      setView(view + 1);
    }
  }, [view, recipe]);

  const handleBack = useCallback(() => {
    setView((prevView) => Math.max(prevView - 1, 0));
  }, []);

  const handleDisabledButton = useMemo(() => {
    switch (view) {
      case 0:
        return (
          !recipe.name ||
          isEmpty(recipe.diet) ||
          isEmpty(recipe.intolerance) ||
          isEmpty(recipe.cuisine)
        );
      case 1:
        return (
          !recipe.caloriesPerServing || !recipe.servingSize || !recipe.prepTime
        );
      case 2:
        return isEmpty(recipe.tags);
      case 3:
        return isEmpty(recipe.ingredients);
      default:
        return false;
    }
  }, [view, recipe]);

  const renderView = useCallback(() => {
    switch (view) {
      case 0:
        return (
          <>
            <TextInput
              id="name"
              label="Recipe Name"
              onChange={addValue}
              placeholder="Eg. “Spicy Chicken Pasta”"
              value={recipe.name || ""}
            />
            {fields.map((field) => (
              <AutoComplete
                key={field.id}
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                setValues={setTypes}
                fetchUrl={field.fetchUrl}
                styles={{ margin: "12px 0px" }}
                defaultValue={
                  (recipe[field.id as keyof RecipeType] as ListItem[]) || []
                }
              />
            ))}
          </>
        );
      case 1:
        return (
          <>
            <SizeSelectorComponent
              id="servingSize"
              starts={1}
              label="Serving"
              onChange={setTypes}
            />
            <SizeSelectorComponent
              onChange={setTypes}
              id="prepTime"
              starts={30}
              label="Minute"
            />
            <SizeSelectorComponent
              id="caloriesPerServing"
              starts={50}
              label="Calorie"
              onChange={setTypes}
            />
          </>
        );
      case 2:
        return (
          <>
            <InputLabel>Select Recipe Tags</InputLabel>
            <ChipList id="tags" list={chipList} setValues={setTypes} />
          </>
        );
      case 3:
        return (
          <IngredientsView
            defaultValue={recipe.ingredients}
            onChange={setTypes}
          />
        );
      default:
        return null;
    }
  }, [view, recipe, addValue, setTypes, chipList]);

  return (
    <Modal
      closeModal={closeModal}
      key={id}
      visible={visible}
      width="30%"
      styles={{ maxHeight: "85vh" }}
      title="Create Recipe"
    >
      <Body>{renderView()}</Body>
      <Footer>
        <Button disabled={view === 0} variant="text" onClick={handleBack}>
          Back
        </Button>
        <Button
          disabled={handleDisabledButton}
          variant="text"
          onClick={handleNext}
        >
          {view === 3 ? "Preview" : "Next"}
        </Button>
      </Footer>
    </Modal>
  );
};
