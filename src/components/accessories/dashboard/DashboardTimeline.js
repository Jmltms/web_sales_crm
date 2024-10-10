import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { FaHouseMedicalCircleExclamation } from "react-icons/fa6";
import { PiUserCircleDuotone } from "react-icons/pi";
import { SiCodemagic } from "react-icons/si";

const DashboardTimeline = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <FaHouseMedicalCircleExclamation className="h-5 w-5" />
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <PiUserCircleDuotone className="h-5 w-5" />
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <SiCodemagic className="h-5 w-5" />
        </Step>
      </Stepper>
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
};
export default DashboardTimeline;
