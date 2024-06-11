import styled from "styled-components";
import { Label } from "components/UI/Texts";
import { AutoComplete } from "components/autocomplete/Autocomplete";
import { TextInput } from "components/text-input/TextInput";
import { Dropdown } from "components/dropdown/Dropdown";
import { Icon } from "components/icon/Icon";
import { useCallback, useState } from "react";

interface InstructionsViewProps {
  onChange: (key: string, value: any) => void;
  defaultValue: Array<{ _id: string; name: string }>;
}

const StyledIngredient = styled.div(({ theme: { colors } }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const InnerWrapper = styled.div({
  display: "flex",
});

const FlexBox = styled.div({
  display: "flex",
  alignItems: "center",
});

const unitOptions = [
  { name: "Grams", id: "grams" },
  { name: "Unit", id: "unit" },
];

export const IngredientsView: React.FC<InstructionsViewProps> = ({
  onChange,
  defaultValue: ingredients,
}) => {
  const addUnit = useCallback(
    (optionValue, ingredientValue) => {
      const add = ingredients.map((ingredient) => {
        if (ingredient._id === ingredientValue._id) {
          return {
            ...ingredient,
            unit: optionValue.id,
          };
        } else return ingredient;
      });

      onChange("ingredients", add);
    },
    [ingredients]
  );

  const addSize = useCallback(
    (e, ingredientValue) => {
      const value = e.target.value;
      const add = ingredients.map((ingredient) => {
        if (ingredient._id === ingredientValue._id) {
          return {
            ...ingredient,
            size: value,
          };
        } else return ingredient;
      });

      onChange("ingredients", add);
    },
    [ingredients]
  );

  const removeIngredient = useCallback(
    (ingredientValue) => {
      const remove = ingredients.filter(
        (ingredient) => ingredient._id !== ingredientValue._id
      );
      onChange("ingredients", remove);
    },
    [ingredients]
  );

  return (
    <div>
      <AutoComplete
        id="ingredients"
        label="Ingredients"
        placeholder="Eg. cheese"
        setValues={onChange}
        fetchUrl="ingredients"
        styles={{ margin: "12px 0px" }}
        defaultValue={ingredients || []}
        hideSelected
      />
      {ingredients?.map((ingredient) => {
        return (
          <StyledIngredient key={ingredient._id}>
            <FlexBox>
              <Icon
                icon="closed"
                styles={{ width: 12, height: 12, marginRight: 4 }}
                onClick={() => removeIngredient(ingredient)}
              />
              <Label>{ingredient.name}</Label>
            </FlexBox>
            <InnerWrapper>
              <TextInput
                onChange={(e) => addSize(e, ingredient)}
                inputStyles={{
                  height: 30,
                  width: "40px",
                  borderRadius: 4,
                  marginRight: 8,
                }}
                value={ingredient.size}
              />
              <Dropdown
                options={unitOptions}
                onSelect={(option) => addUnit(option, ingredient)}
                placeholder="Unit"
                boxStyles={{
                  padding: 6,
                  borderRadius: 4,
                  width: 120,
                  height: 30,
                }}
              />
            </InnerWrapper>
          </StyledIngredient>
        );
      })}
    </div>
  );
};
