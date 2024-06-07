import styled from "styled-components";
import { motion } from "framer-motion";
import { Label } from "components/UI/Texts";

interface CardProps {
  id: number;
  image: string;
  title: string;
  isMobileView?: boolean;
}

const CardContainer = styled(motion.div)<{ mobile?: boolean }>(
  ({ mobile }) => ({
    borderRadius: 16,
    margin: mobile ? 20 : "18px 0px 0px 18px",
    width: mobile ? "100%" : "31%",
  })
);

const Thumbnail = styled.div<{ url: string }>(({ url }) => ({
  borderRadius: 0,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
  height: 250,
  "&:hover": {
    opacity: 0.8,
  },
}));

const TopRow = styled.div(({ theme: { colors } }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  backgroundColor: colors.white,
  padding: 12,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
}));

export const Card = ({
  id,
  image,
  title,
  isMobileView,
  ...props
}: CardProps) => {
  return (
    <CardContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      mobile={isMobileView}
      {...props}
    >
      <Thumbnail url={image} />
      <TopRow>
        <Label size="normal" fontWeight="600" opacity="0.7">
          {title}
        </Label>
      </TopRow>
    </CardContainer>
  );
};
