import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchAllUnits, fetchFractionalInfo } from "../../../api/listing";
import Price from "./fractionalModalComponents/price";
import PaymentModal from "../../../components/payment";
import PaymentSummary from "./fractionalModalComponents/paymentSummary";
import PaymentDrawer from "../units/buyModalComponents/payment";
import { Drawer, DrawerContent, DrawerOverlay, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const FractionalModal = ({ fractionalModal, info }) => {
  const [step, setStep] = useState("price");
  const [amountToPay, setAmountToPay] = useState(0);
  const [fractions, setFractions] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);
  const { data: allUnits } = useQuery(
    ["fetchAllUnits", info?.id],
    () => fetchAllUnits(parseInt(info?.id)),
    { enabled: !!info?.id }
  );

  const unitsData = allUnits?.data?.results;
  const unitThatWasFractionalized = unitsData?.find(
    (item) => item?.is_fraction_sale_available
  );

  const fractionalDetail = useQuery(
    ["fractional", unitThatWasFractionalized?.id],
    () => fetchFractionalInfo(unitThatWasFractionalized?.id),
    { enabled: !!unitThatWasFractionalized?.id }
  );
  const fractionalData = fractionalDetail?.data?.data;
  const unitData = fractionalData?.fraction_data?.unit;

  const onCloseModal = () => {
    fractionalModal?.onClose();
    setFractions("");
    setStep("price");
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

  const displayFractionStep = (step) => {
    switch (step) {
      case "price":
        return <Price
          step={step}
          setStep={setStep}
          fractionDetail={fractionalDetail}
          fractionalData={fractionalData}
          unitData={unitData}
          info={info}
          fractionalModal={fractionalModal}
          customScrollbarStyles={customScrollbarStyles}
        />;
      case "summary":
        return <PaymentSummary
          amountToPay={amountToPay}
          setAmountToPay={setAmountToPay}
          fractionalData={fractionalData}
          setFractions={setFractions}
          fractions={fractions}
          paymentDetails={paymentDetails}
          onCloseModal={onCloseModal}
          setStep={setStep}
          fractionalModal={fractionalModal}
        />;
      default:
        return <PaymentDrawer
          onCloseModal={onCloseModal}
          selectedPlan={null}
          modal={fractionalModal}
          paymentDetails={paymentDetails}
          buyModal={fractionalModal}
          unitData={unitData}
          amount={amountToPay}
          fullPayment
          isFractional
          // PAYMENT_PLAN_DATA={paymentDetails}
        />;
    }
  };

  const paymentDetails = {
    bundle_id: unitThatWasFractionalized?.id,
    amount_to_pay: Number(fractions * unitData?.price_per_fraction),
    no_of_fractions: Number(fractions),
  };

  return (
    <>
      {screenWidth < 768 ? (
        <Drawer
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={fractionalModal?.onClose}
          isOpen={fractionalModal?.isOpen}
        >
          <DrawerOverlay />
          <DrawerContent maxW="full" w="full" h="full">
            {displayFractionStep(step)}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={fractionalModal?.onClose}
          isOpen={fractionalModal?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW={{ base: '40rem',  lg: '48rem' }}
            h="fit-content"
            minH={'75rem'}
            maxH={'75rem'}
            right={`9.3rem`}
            bottom={'calc(10vh - 7.5rem)'}
            borderRadius={0}
            position='fixed'
          >
            {displayFractionStep(step)}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default FractionalModal;