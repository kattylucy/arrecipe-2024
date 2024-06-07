import { useCallback, useMemo, useState, useRef } from "react";
import styled from "styled-components";
import { Label } from "components/UI/Texts";
import { Chip } from "components/chip/Chip";
import { InputLabel } from "components/UI/Texts";
import { useGetTypes } from "queries/useGetTypes";
import { useDebounce } from "hooks/useDebounce";
import useOutsideClick from "hooks/useOutsideClick";

interface AutocompleteProps {
  id: string;
  label: string;
  placeholder: string;
  setValues: (key: string, value: Array<string>) => void;
  styles?: any;
  fetchUrl: string;
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
  right: 0,
  marginTop: 4,
  width: "100%",
  zIndex: 9,
  marginBottom: 12,
  maxHeight: 120,
  overflow: "scroll",
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
});

export const AutoComplete = ({
  id,
  label,
  placeholder,
  setValues,
  styles,
  fetchUrl,
}: AutocompleteProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>();
  const [list, setList] = useState<string[]>([]);
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
      !!inputValue && !isLoading
        ? data.filter((diet) => diet.name.toLowerCase().includes(inputValue))
        : [],
    [inputValue, data]
  );

  const onChange = useCallback(
    (e: any) => {
      const { value } = e.target;
      setInputValue(value);
      setVisible(true);
    },
    [setInputValue, setVisible]
  );

  const addToList = useCallback(
    (value: string) => {
      if (!list.includes(value)) {
        const add = [...list, value];
        setList(add);
        setInputValue("");
        setVisible(false);
        setValues(id, add);
      }
    },
    [list, setList]
  );

  const onDelete = useCallback(
    (value: string) => {
      const filter = list.filter((item) => item !== value);
      setList(filter);
      setValues(id, filter);
    },
    [setList, list]
  );

  return (
    <Container style={{ ...styles }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputWrapper>
        <Input
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          value={inputValue}
        />
      </InputWrapper>
      {list.length ? (
        <ListContainer>
          {list.map((item, index) => (
            <Chip
              onDelete={() => onDelete(item)}
              title={item}
              key={`list-${item}-${index}`}
              styles={{ marginTop: 4, marginBottom: 4, marginRight: 4 }}
            />
          ))}
        </ListContainer>
      ) : (
        <></>
      )}
      {visible && foundItems.length ? (
        <DropdownWrapper ref={ref}>
          {foundItems?.map((item, index) => (
            <Label
              onClick={() => addToList(item.name)}
              key={`${item.name}-${index}`}
              cursor="pointer"
              padding="8px"
            >
              {item.name}
            </Label>
          ))}
        </DropdownWrapper>
      ) : (
        <></>
      )}
    </Container>
  );
};
