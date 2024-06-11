import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Label } from "components/UI/Texts";

interface SizeSelectorComponentProps {
  onChange: (id: string, value: any) => void;
  label: string;
  starts: number;
  id: string;
}

const Container = styled.div({
  display: "flex",
  // justifyContent: "center",
  alignItems: "center",
  margin: 18,
});

const SizeButton = styled(Label)<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray : theme.colors.main};
  user-select: none;
`;

export const SizeSelectorComponent: React.FC<SizeSelectorComponentProps> = ({
  onChange,
  label,
  starts,
  id,
}) => {
  const [size, setSize] = useState<number>(starts);

  const decrementSize = useCallback(() => {
    setSize((prevSize) => {
      const newSize = Math.max(1, prevSize - starts);
      onChange(id, newSize);
      return newSize;
    });
  }, []);

  const incrementSize = useCallback(() => {
    setSize((prevSize) => {
      const newSize = prevSize + starts;
      onChange(id, newSize);
      return newSize;
    });
  }, []);

  return (
    <Container>
      <SizeButton onClick={decrementSize} disabled={size <= 1} large>
        -
      </SizeButton>
      <Label marginLeft={8} marginRight={8}>
        {size} {label}
        {size > 1 ? "s" : ""}
      </Label>
      <SizeButton onClick={incrementSize} large>
        +
      </SizeButton>
    </Container>
  );
};
