import styled from "styled-components";
import { Label } from "components/UI/Texts";
import { Icon } from "components/icon/Icon";

interface ChipProps {
  title: string;
  onDelete?: () => void;
  styles?: any;
}

const Container = styled.div(({ theme: { colors } }) => ({
  backgroundColor: colors.gray,
  opacity: 0.3,
  padding: "8px 12px",
  margin: "0px 8px",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
}));

export const Chip = ({ title, onDelete, styles }: ChipProps) => (
  <Container style={{ ...styles }}>
    <Label extraSmall color="black">
      {title}
    </Label>
    {onDelete && (
      <Icon
        onClick={onDelete}
        icon="closed"
        styles={{ width: 16, height: 16, marginLeft: 4, cursor: "pointer" }}
      />
    )}
  </Container>
);
