import { useCallback, useState } from "react";
import { Chip } from "components/chip/Chip";
import { isEmpty } from "lodash";
import styled from "styled-components";

const Container = styled.div({
  cursor: "pointer",
});

const ListWrapper = styled.div({
  display: "flex",
  flexWrap: "wrap",
});

export const ChipList = ({ list }) => {
  const [selected, setSelected] = useState([]);

  const addToList = useCallback((item) => {
    const exist = selected.filter(
      (selectedItem) => selectedItem.id === item.id
    );
  }, []);

  if (isEmpty(list)) return <></>;

  return (
    <ListWrapper>
      {list.map((item) => {
        return (
          <Container key={item.name} onClick={() => addToList(item)}>
            <Chip
              title={item.name}
              styles={{ border: "1px solid #FF9254", margin: 4 }}
            />
          </Container>
        );
      })}
    </ListWrapper>
  );
};
