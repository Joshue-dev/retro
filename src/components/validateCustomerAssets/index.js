import { useEffect, useState } from "react";
import Summary from "./summary";
import ConfirmValidate from "./confirmValidate";
import Dispute from "./dispute";
import AssetsList from "./assetsList";
import Breakdown from "./Breakdown";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

export const ValidateCustomerEquity = ({
  equitiesData,
  isError,
  drawer,
  refetch,
  isLoading,
}) => {
  const [type, setType] = useState("list");
  const [equityData, setEquityData] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    if (equitiesData?.length === 1) {
      setEquityData(equitiesData?.[0]);
      setType("summary");
    } else {
      setType("list");
    }
  }, [equitiesData]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);
 

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

  const handleClose = () => {
    if (equitiesData?.length === 1) {
      drawer?.onClose()
    } else {
      setType("list");
    }
    refetch()
  };

  const validationRequestArray = equityData?.validation_requests || [];
  const validation_requestsId =
    validationRequestArray?.[validationRequestArray?.length - 1]?.id;


  const displayTransactionSteps = (step) => {
    switch (step) {
      case "summary":
        return (
          <Summary
            equityData={equityData}
            setType={setType}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
            type={type}
            drawer={drawer}
          />
        );
      case "validate":
        return (
          <ConfirmValidate
            refetch={refetch}
            validation_requestsId={validation_requestsId}
            equityData={equityData}
            setType={setType}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
            type={type}
            drawer={drawer}
          />
        );
      case "dispute":
        return (
          <Dispute
            drawer={drawer}
            validation_requestsId={validation_requestsId}
            equityData={equityData}
            setType={setType}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
            type={type}
          />
        );
        case "breakdown":
        return (
          <Breakdown
            equityData={equityData}
            drawer={drawer}
            isError={isError}
            isLoading={isLoading}
            type={type}
            setType={setType}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
          />
        );
      default:
        return (
          <AssetsList
            equitiesData={equitiesData}
            equityData={equityData}
            setEquityData={setEquityData}
            isLoading={isLoading}
            drawer={drawer}
            validation_requestsId={validation_requestsId}
            setType={setType}
            customScrollbarStyles={customScrollbarStyles}
            handleClose={handleClose}
            type={type}
            isError={isError}
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
          onCloseComplete={handleClose}
          isCentered
          onClose={drawer?.onClose}
          isOpen={drawer?.isOpen}
        >
          <DrawerOverlay />
          <DrawerContent bg='card_bg' maxW="full" w="full" h="full">
            {displayTransactionSteps(type)}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={handleClose}
          isCentered
          onClose={drawer?.onClose}
          isOpen={drawer?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW={{ base: '40rem',  lg: '48rem' }}
            minH="calc(90vh - 10rem)"
            px="0"
            py="0"
            position={`fixed`}
            right={`9.3rem`}
            bottom={'calc(10vh - 4rem)'}
            h="fit-content"
            maxH="calc(90vh - 10rem)"
          >
            {displayTransactionSteps(type)}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ValidateCustomerEquity;