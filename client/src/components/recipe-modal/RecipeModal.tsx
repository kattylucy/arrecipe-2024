import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Modal } from "components/modal/Modal";
import { TextInput } from "components/text-input/TextInput";
import { AutoComplete } from "components/autocomplete/Autocomplete";
import { ChipList } from "components/chip-list/ChipList";
import { useGetTypes } from "queries/useGetTypes";

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

interface RecipeType {
  calories_count?: string;
  cooking_time?: string;
  url?: string;
  name?: string;
  thumbnail?: string;
  tag?: string;
}

const Body = styled.div({
  padding: 14,
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
  {
    id: "ingredients",
    label: "Ingredients",
    placeholder: "Eg. cheese",
    fetchUrl: "ingredients",
  },
];

export const RecipeModal = ({
  calories,
  cookingTime,
  id,
  isEditing = false,
  url,
  name,
  tag,
  closeModal,
  visible,
}: CreateRecipeModalProps) => {
  const [recipe, setRecipe] = useState<RecipeType>({});
  const { data: chipList, isLoading } = useGetTypes({
    url: "/tags",
    enabled: true,
  });

  const addValue = useCallback(
    (e: any) => {
      const { id, value } = e.target;
      setRecipe({ ...recipe, [id]: value });
    },
    [setRecipe, recipe]
  );

  const setTypes = useCallback(
    (key: string, value: Array<string>) => {
      setRecipe({ ...recipe, [key]: value });
    },
    [setRecipe, recipe]
  );

  return (
    <Modal
      closeModal={closeModal}
      key={id}
      visible={visible}
      styles={{ height: "90vh" }}
      width="30%"
    >
      <Body>
        <TextInput
          id="name"
          label="Recipe Name"
          onChange={addValue}
          placeholder="Eg. “Spicy Chicken Pasta”"
          value={recipe.name}
        />
        {fields.map((field) => {
          return (
            <AutoComplete
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              setValues={setTypes}
              fetchUrl={field.fetchUrl}
              styles={{ margin: "12px 0px" }}
            />
          );
        })}
        <ChipList list={chipList} />
      </Body>
    </Modal>
  );
};
