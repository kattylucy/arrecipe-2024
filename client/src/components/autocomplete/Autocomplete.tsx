import React, { useCallback, useMemo, useState, useRef } from "react";
import styled from "styled-components";
import { Label } from "components/UI/Texts";
import { Chip } from "components/chip/Chip";
import { InputLabel } from "components/UI/Texts";
import { useGetTypes } from "queries/useGetTypes";
import { useDebounce } from "hooks/useDebounce";
import useOutsideClick from "hooks/useOutsideClick";

interface ListItem {
  name: string;
  _id: string;
}

interface AutocompleteProps {
  id: string;
  label: string;
  placeholder: string;
  setValues: (key: string, value: Array<ListItem>) => void;
  styles?: React.CSSProperties;
  fetchUrl: string;
  defaultValue?: Array<ListItem>;
}

const Container = styled.div({
  position: "relative",
  width: "100%",
});

const InputWrapper = styled.div(({ theme: { colors } }) => ({
  background: "rgba(21, 21, 21, 0.01)",
  border: colors.border,
  borderRadius: 12,
  height: 56,
  marginTop: 6,
  paddingLeft: 8,
  display: "flex",
  alignItems: "center",
  position: "relative",
  "::placeholder": {
    color: colors.black,
    opacity: 0.25,
  },
}));

const Input = styled.input(({ theme: { colors } }) => ({
  border: "none",
  height: 50,
  outline: "none",
  marginLeft: 10,
  backgroundColor: "transparent",
  "::placeholder": {
    color: colors.black,
    opacity: 0.25,
  },
}));

const DropdownWrapper = styled.div(({ theme: { colors } }) => ({
  background: colors.white,
  border: `1px solid #e2e8f0a8`,
  borderRadius: 8,
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  position: "absolute",
  left: 0,
  top: "90px",
  width: "100%",
  zIndex: 9,
  maxHeight: 120,
  overflowY: "scroll",
  "& > button:first-of-type": {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  "& > button:last-of-type": {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
}));

const ListContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  marginTop: 4,
});

export const AutoComplete: React.FC<AutocompleteProps> = ({
  id,
  label,
  placeholder,
  setValues,
  styles,
  fetchUrl,
  defaultValue,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [list, setList] = useState<ListItem[]>(defaultValue || []);
  const [visible, setVisible] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const { data = [], isLoading } = useGetTypes({
    url: fetchUrl,
    search: debouncedSearchTerm,
    enabled: !!fetchUrl && !!debouncedSearchTerm,
  });

  useOutsideClick(ref, () => setVisible(false));

  const foundItems = useMemo(
    () =>
      inputValue && !isLoading
        ? data.filter((item: ListItem) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase())
          )
        : [],
    [inputValue, data, isLoading]
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    setVisible(true);
  }, []);

  const addToList = useCallback(
    (value: ListItem) => {
      if (!list.some((listItem) => listItem._id === value._id)) {
        const add = [...list, value];
        setList(add);
        setInputValue("");
        setValues(id, add);
      }
    },
    [list, setValues, id]
  );

  const onDelete = useCallback(
    (value: ListItem) => {
      const filteredList = list.filter((item) => item._id !== value._id);
      setList(filteredList);
      setValues(id, filteredList);
    },
    [list, setValues, id]
  );

  return (
    <Container style={styles}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputWrapper>
        <Input
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          value={inputValue}
        />
      </InputWrapper>
      {list.length > 0 && (
        <ListContainer>
          {list.map((item, index) =>
            item.name ? (
              <Chip
                onDelete={() => onDelete(item)}
                title={item.name}
                key={`list-${item._id}-${index}`}
                styles={{ marginTop: 4, marginBottom: 4, marginRight: 4 }}
              />
            ) : null
          )}
        </ListContainer>
      )}
      {visible && foundItems.length > 0 && (
        <DropdownWrapper ref={ref}>
          {foundItems.map((item, index) => (
            <Label
              onClick={() => addToList(item)}
              key={`${item._id}-${index}`}
              cursor="pointer"
              padding="8px"
            >
              {item.name}
            </Label>
          ))}
        </DropdownWrapper>
      )}
    </Container>
  );
};
