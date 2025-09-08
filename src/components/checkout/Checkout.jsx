import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect } from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch } from "react-redux";
import { getUserAddresses } from "../../store/actions";

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();

  const steps = ["Address", "Payment Method", "Order Summary", "Place Order"];

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="p-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-5">{activeStep === 0 && <AddressInfo />}</div>
    </div>
  );
};

export default Checkout;
