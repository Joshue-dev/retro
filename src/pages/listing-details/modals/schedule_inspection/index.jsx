import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import ScheduleInspectionContent from "./content";

const ScheduleInspection = ({
  disclosure,
  info,
  refetch,
  inspectionDetails,
}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return screenWidth >= 768 ? (
    <Modal
      autoFocus={false}
      isCentered
      onClose={disclosure?.onClose}
      isOpen={disclosure?.isOpen}
    >
      <ModalOverlay />
      <ModalContent
        bg="card_bg"
        maxW={{ base: "40rem", lg: "48rem" }}
        minH="30.1rem"
        px="0"
        py="0"
        borderRadius={{ base: "1.0rem", md: ".2rem" }}
        position={`fixed`}
        right={`9.3rem`}
        bottom={"calc(10vh - 6.3rem)"}
        h="full"
        maxH="75rem"
      >
        <ScheduleInspectionContent
          disclosure={disclosure}
          info={info}
          refetch={refetch}
          inspectionDetails={inspectionDetails}
        />
      </ModalContent>
    </Modal>
  ) : (
    <Drawer
      autoFocus={false}
      isCentered
      onClose={disclosure?.onClose}
      isOpen={disclosure?.isOpen}
      placement="bottom"
    >
      <DrawerOverlay />
      <DrawerContent
        bg="card_bg"
        w={{ md: "52.0rem" }}
        borderRadius={{ base: "1.0rem 1.0rem 0rem 0rem", md: "0rem" }}
        mb={{ md: "6rem" }}
        ml={{ md: `auto` }}
        mr={{ md: `12.2rem` }}
        fontFamily={`Open Sans`}
        color={`#424242`}
      >
        <ScheduleInspectionContent
          disclosure={disclosure}
          info={info}
          refetch={refetch}
          inspectionDetails={inspectionDetails}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default ScheduleInspection