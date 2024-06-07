import styled from "styled-components";
import { Icons } from "./Icons.js";

interface IconProps {
  icon: string;
  styles?: React.CSSProperties;
  onClick?: () => void;
}

const StyledIcon = styled.img<{ styles: any }>(({ styles }) => ({
  width: 32,
  height: 32,
  ...styles,
}));

export const Icon = ({ icon, styles, onClick, ...props }: IconProps) => (
  <StyledIcon onClick={onClick} src={Icons[icon]} styles={styles} {...props} />
);
