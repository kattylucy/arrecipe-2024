import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useCreateRecipe } from "queries/useCreateRecipe";
import { useUpdateRecipe } from "queries/useUpdateRecipe";
import { Modal } from "components/modal/Modal";
import { TextInput } from "components/text-input/TextInput";
import { useToast } from "hooks/useToast";
import { DragAndDrop } from "components/drag-and-drop/DragAndDrop";
import { Dropdown } from "components/dropdown/Dropdown";
import { AutoComplete } from "components/autocomplete/Autocomplete";

const options = [
  { id: "side_dish", name: "Side Dish" },
  { id: "dessert", name: "Dessert" },
  { id: "main_dish", name: "Main Dish" },
  { id: "drinks", name: "Drinks" },
];

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

const InputGroup = styled.div({
  display: "flex",
  justifyContent: "space-between",
  margin: "20px 0px",
});

const Footer = styled.div(({ theme: { colors } }) => ({
  background: colors.white,
  bottom: 0,
  padding: "12px 0px",
  position: "sticky",
  width: "100%",
  marginTop: 20,
}));

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
  const [recipe, setRecipe] = useState<RecipeType>({
    calories_count: calories ?? "",
    cooking_time: cookingTime ?? "",
    url: url ?? "",
    name: name ?? "",
    tag: tag ?? "",
  });
  const [upload, setUpload] = useState("");
  const createRecipe = useCreateRecipe();
  const updateRecipe = useUpdateRecipe();
  const toast = useToast();

  const isDisabled = useMemo(
    () => Object.values(recipe).some((x) => x === ""),
    [recipe]
  );

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

  const newRecipe = useCallback(async () => {
    closeModal();
    if (isEditing) {
      toast.open({ message: "Your recipe is updating", type: "info" });
      await updateRecipe.mutateAsync({ id, recipe });
      toast.open({ message: "Recipe was updated", type: "success" });
    } else {
      try {
        const formData = new FormData();
        for (const key in recipe) {
          if (recipe.hasOwnProperty(key)) {
            const value = recipe[key];
            formData.append(key, value);
          }
        }
        if (upload) {
          formData.append("thumbnail", upload);
        }
        toast.open({ message: "We are creating your recipe", type: "info" });
        await createRecipe.mutateAsync(formData);
        toast.open({ message: "Recipe was created", type: "success" });
      } catch (error) {
        toast.open({ message: error, type: "error" });
      }
    }
    setRecipe({});
  }, [closeModal, recipe, createRecipe, toast, upload, id]);

  console.log(recipe);

  return (
    <Modal
      closeModal={closeModal}
      key={id}
      visible={visible}
      styles={{ height: "90vh" }}
      width={"90%"}
    >
      <Body>
        <TextInput
          id="name"
          label="Recipe Name"
          onChange={addValue}
          placeholder="Eg. “Spicy Chicken Pasta”"
          value={recipe.name}
        />
        <AutoComplete
          id="diet"
          label="Diet Type"
          placeholder="Eg. Gluten-Free"
          setValues={setTypes}
        />
      </Body>
    </Modal>
  );
};
