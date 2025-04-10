import {
  Drawer,
  DrawerContent,
  Modal,
  ModalContent,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { NotificationList } from "./NotificationList";
import MobileHeader from "../navbar/mobile_header";

const Notification = ({
  notifications,
  isNotOpen,
  onNotClose,
  onNotOpen,
  onDrawerOpen,
}) => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  return (
    <>
      {isMobile ? (
        <Drawer
          placement={"right"}
          isOpen={isNotOpen}
          onClose={onNotClose}
          autoFocus={false}
        >
          <DrawerContent
            maxW="full"
            p="0 !important"
            bg="card_bg"
            w="full"
            h={"full"}
          >
            <MobileHeader
              activePage={"Notification Center"}
              onNotOpen={onNotOpen}
              onDrawerClose={onNotClose}
              onDrawerOpen={onDrawerOpen}
            />
            <NotificationList notifications={notifications} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          placement={"right"}
          isOpen={isNotOpen}
          onClose={onNotClose}
          autofocus={false}
          scrollBehavior="outside"
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW={{ base: "40rem", lg: "48rem" }}
            minH="calc(90vh - 10rem)"
            px="0"
            py="0"
            position={`fixed`}
            right={`9.3rem`}
            bottom={"calc(10vh - 7.5rem)"}
            h="fit-content"
            maxH="calc(90vh - 10rem)"
            rounded={0}
          >
            <NotificationList notifications={notifications} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Notification;
