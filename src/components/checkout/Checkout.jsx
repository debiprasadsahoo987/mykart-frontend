import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect } from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/actions";
import toast from "react-hot-toast";

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const raw = useSelector((s) => s.auth?.address); // whatever the slice stores
  const addresses = Array.isArray(raw) ? raw : []; // normalize to []
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { address, selectedUserCheckoutAddress } = useSelector((s) => s.auth);
  const paymentMethod = false;

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please select an address to proceed");
      return;
    }
    if (activeStep === 0 && (!selectedUserCheckoutAddress || !paymentMethod)) {
      toast.error("Please select a payment method to proceed");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

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
      <div className="mt-5">
        {activeStep === 0 && <AddressInfo addresses={addresses} />}
      </div>
      <div
        className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200"
        style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}
      >
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep !== steps.length - 1 && (
          <button
            disabled={
              errorMessage ||
              (activeStep === 0
                ? !selectedUserCheckoutAddress
                : activeStep === 1
                ? !paymentMethod
                : false)
            }
            className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white ${
              errorMessage ||
              (activeStep === 0 && !selectedUserCheckoutAddress) ||
              (activeStep === 1 && !paymentMethod)
                ? "opacity-60"
                : ""
            }`}
            onClick={handleNext}
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
