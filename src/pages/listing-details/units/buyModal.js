import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchAllBundlePaymentPlan } from "../../../api/listing";
import Summary from "./buyModalComponents/summary";
import Plan from "./buyModalComponents/plan";
import PaymentDrawer from "./buyModalComponents/payment";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

const BuyModal = ({ buyModal, unitData }) => {
  const [step, setStep] = useState("plan");
  const [amountToPay, setAmountToPay] = useState(0);
  const [fullPayment, setFullPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { data, isLoading } = useQuery(["payment_plan", unitData?.id], () =>
    fetchAllBundlePaymentPlan(unitData?.id)
  );
  const PAYMENT_PLAN_DATA = data && data?.data?.results;
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);
  useEffect(() => {
    if (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) {
      setFullPayment(true);
    }
  }, [PAYMENT_PLAN_DATA]);

  const onCloseModal = () => {
    setSelectedPlan(null);
    buyModal?.onClose();
    setStep("plan");
    setFullPayment(false);

    if (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) {
      setFullPayment(true);
    }
  };

  const paymentDetails = {
    paymentplan_id: selectedPlan?.id,
    bundle_id: selectedPlan?.bundle?.id || unitData?.id,
    type: "WHOLE",
  };

  const customScrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "4px",
      borderRadius: "16px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "16px",
      WebkitBoxShadow: "inset 0 0 6px rgba(255, 255, 255, 0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "16px",
      backgroundColor: "#ffffff",
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const displayBuyModeSteps = (step) => {
    switch (step) {
      case "plan":
        return (
          <Plan
            planLoading={isLoading}
            PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
            fullPayment={fullPayment}
            setFullPayment={setFullPayment}
            setSelectedPlan={setSelectedPlan}
            setStep={setStep}
            selectedPlan={selectedPlan}
            buyModal={buyModal}
            unitData={unitData}
            onCloseModal={onCloseModal}
            customScrollbarStyles={customScrollbarStyles}
          />
        );
      case "summary":
        return (
          <Summary
            unitData={unitData}
            setAmountToPay={setAmountToPay}
            PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
            fullPayment={fullPayment}
            setFullPayment={setFullPayment}
            setSelectedPlan={setSelectedPlan}
            setStep={setStep}
            selectedPlan={selectedPlan}
            buyModal={buyModal}
            onCloseModal={onCloseModal}
          />
        );
      case 'payment':
        return (
          <PaymentDrawer
            onCloseModal={onCloseModal}
            selectedPlan={selectedPlan}
            modal={buyModal}
            paymentDetails={paymentDetails}
            buyModal={buyModal}
            unitData={unitData}
            amount={amountToPay}
            fullPayment={fullPayment}
            PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
          />
        );
      default:
        return (
          <Plan
            planLoading={isLoading}
            PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
            fullPayment={fullPayment}
            setFullPayment={setFullPayment}
            setSelectedPlan={setSelectedPlan}
            setStep={setStep}
            selectedPlan={selectedPlan}
            buyModal={buyModal}
            unitData={unitData}
            onCloseModal={onCloseModal}
            customScrollbarStyles={customScrollbarStyles}
          />
        );
    }
  };

  return (
    <>
      {screenWidth < 768 ? (
        <Drawer
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={buyModal?.onClose}
          isOpen={buyModal?.isOpen}
        >
          <DrawerOverlay />
          <DrawerContent bg='card_bg' maxW="full" w="full" >
            {displayBuyModeSteps(step)}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={buyModal?.onClose}
          isOpen={buyModal?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW={{ base: '40rem',  lg: '48rem' }}
            minH={"75rem"}
            px="0"
            py="0"
            position={`fixed`}
            right={`9.3rem`}
            bottom={'calc(10vh - 4rem)'}
            h="fit-content"
            maxH='75rem'
            rounded='0px'
          >
            {displayBuyModeSteps(step)}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default BuyModal;
