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

export const ChipList = ({ id, list, setValues }) => {
  const [selected, setSelected] = useState<object>({});

  const addToList = useCallback(
    (item) => {
      if (selected[item._id]) {
        const remove = { ...selected, [item._id]: undefined };
        setSelected(remove);
        setValues(id, remove);
      } else {
        const add = { ...selected, [item._id]: { ...item } };
        setSelected(add);
        setValues(id, add);
      }
    },
    [selected, id]
  );

  if (isEmpty(list)) return <></>;

  return (
    <ListWrapper>
      {list.map((item) => {
        return (
          <Container key={item.name} onClick={() => addToList(item)}>
            <Chip
              title={item.name}
              styles={{
                border: selected[item._id] && "1px solid #FF9254",
                margin: 4,
                opacity: selected[item] ? 10 : 0.4,
              }}
            />
          </Container>
        );
      })}
    </ListWrapper>
  );
};
