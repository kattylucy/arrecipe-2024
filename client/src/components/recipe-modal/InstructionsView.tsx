import { useCallback, useState } from "react";
import styled from "styled-components";
import { TextInput } from "components/text-input/TextInput";
import { Button } from "components/button/Button";

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

const StyledButton = styled(Button)(({ theme: { colors } }) => ({
  color: colors.main,
  fontSize: 12,
  marginLeft: "80%",
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
    if (numberOfSteps.length < 10) {
      setNumberOfSteps((prevSteps) => [
        ...prevSteps,
        { label: `Step ${prevSteps.length + 1}`, text: "" },
      ]);
    }
  }, [numberOfSteps]);

  return (
    <div>
      <StyledButton variant="text" onClick={addStep}>
        Add Step
      </StyledButton>
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
