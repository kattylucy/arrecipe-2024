import { useCallback, useState } from "react";
import styled from "styled-components";
import { TextInput } from "components/text-input/TextInput";

interface Step {
  label: string;
  text: string;
}

interface InstructionsViewProps {
  onChange: (field: string, value: Step[]) => void;
}

const StepContainer = styled.div({
  marginTop: 18,
});

const StyledPlus = styled.p(({ theme: { colors, media } }) => ({
  color: colors.main,
  fontSize: 12,
  marginRight: 8,
  textAlign: "right",
}));

export const InstructionsView: React.FC<InstructionsViewProps> = ({
  onChange,
}) => {
  const [numberOfSteps, setNumberOfSteps] = useState<Step[]>([
    {
      label: "Step 1",
      text: "",
    },
  ]);

  const addValue = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
      const { value } = e.target;
      setNumberOfSteps((prevSteps) => {
        const updatedSteps = prevSteps.map((stepItem, i) =>
          i === index ? { ...stepItem, text: value } : stepItem
        );
        onChange("instructions", updatedSteps);
        return updatedSteps;
      });
    },
    [onChange]
  );

  const addStep = useCallback(() => {
    setNumberOfSteps((prevSteps) => [
      ...prevSteps,
      { label: `Step ${prevSteps.length + 1}`, text: "" },
    ]);
  }, []);

  return (
    <div>
      <StyledPlus onClick={addStep}>Add Step</StyledPlus>
      {numberOfSteps.map((step, index) => (
        <StepContainer key={`${step.label}-${index}`}>
          <TextInput
            value={step.text}
            multiline
            onChange={(e) => addValue(e, index)}
            label={step.label}
            id={`${step.label}-${index}`}
          />
        </StepContainer>
      ))}
    </div>
  );
};
