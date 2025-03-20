import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  VStack,
  Text,
  Box,
  HStack,
  useClipboard,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  ModalHeader,
  Center,
  useTheme,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { CopiedIcon, CopyIcon } from "assets/notifications";

const ContactPersonContent = ({ info, disclosure, contactPersons }) => {
  const theme = useTheme();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);
  const isMobile = screenWidth < 768;

  const { onCopy, hasCopied, setValue } = useClipboard(
    selectedPerson?.phone_number || ""
  );

  const handleCopy = (person) => {
    setSelectedPerson(person);
    if (isMobile) {
      window.location.href = `tel:${person?.phone_number}`;
    } else {
      if (selectedPerson?.phone_number) {
        onCopy(); // Trigger the copy action
      }
    }
  };

  useEffect(() => {
    if (selectedPerson) {
      setValue(selectedPerson?.phone_number);
    }
  }, [selectedPerson, setValue]);

  return (
    <Box>
      <ModalHeader p={`0rem`}>
        <HStack
          justify="space-between"
          p={{ base: "2.4rem", md: `3rem 2.4rem` }}
          borderBottom="0.4px solid"
          borderBottomColor={
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.300"
          }
        >
          <Text
            color="text"
            fontSize={{ base: `1.75rem`, lg: "2.15rem" }}
            fontWeight={600}
            textTransform={`uppercase`}
            textAlign={`left`}
            letterSpacing={`.144rem`}
          >
            Contact Person
          </Text>
          <Center
            onClick={() => disclosure.onClose()}
            cursor={`pointer`}
            color="text"
          >
            <IoMdClose color="text" fontSize={isMobile ? "2.5rem" : "3rem"} />
          </Center>
        </HStack>
      </ModalHeader>

      <VStack
        align={"stretch"}
        gap={{ base: "1.6rem", md: "2.0rem" }}
        p={{ base: `2.4rem` }}
      >
         {contactPersons?.length > 0 ? contactPersons?.map((person) => (
          <VStack
            onClick={() => handleCopy(person)}
            key={person?.id}
            gap={"1.2rem"}
            cursor="pointer"
            color={"matador_text.100"}
            borderRadius={"0rem"}
            border={`.1rem solid`}
            borderColor={
              theme.theme_name === "light" ? `primary` : `matador_text.100`
            }
            w="full"
            py={`1.0rem`}
            justify={"space-between"}
            letterSpacing={`.32rem`}
          >
            <VStack
              position="absolute"
              display={{ base: "none", md: "flex" }}
              mx={3}
              mt={"0.25rem"}
              alignSelf={"end"}
            >
              {hasCopied ? (
                <CopiedIcon boxSize="20px" />
              ) : (
                <CopyIcon boxSize="20px" />
              )}
            </VStack>
            <Text
              color={
                theme.theme_name === "light" ? `primary` : `matador_text.100`
              }
              fontSize={"1.8rem"}
              fontWeight={700}
              textAlign={`center`}
              fontFamily={"Liberation Sans"}
              textTransform={`uppercase`}
              letterSpacing={`.32rem`}
            >
              {person?.name}
              {/* PETER JOHN */}
            </Text>
            <Text
              color="matador_text.500"
              fontSize={"1.4rem"}
              fontWeight={400}
              textAlign={`center`}
              fontFamily={"Liberation Sans"}
              letterSpacing={`.32rem`}
            >
              {person?.phone_number}
            </Text>
          </VStack>
        )): info?.contact_persons?.map((person) => (
          <VStack
            onClick={() => handleCopy(person)}
            key={person?.id}
            gap={"1.2rem"}
            cursor="pointer"
            color={"matador_text.100"}
            borderRadius={"0rem"}
            border={`.1rem solid`}
            borderColor={
              theme.theme_name === "light" ? `primary` : `matador_text.100`
            }
            w="full"
            py={`1.0rem`}
            justify={"space-between"}
            letterSpacing={`.32rem`}
          >
            <VStack
              position="absolute"
              display={{ base: "none", md: "flex" }}
              mx={3}
              mt={"0.25rem"}
              alignSelf={"end"}
            >
              {hasCopied ? (
                <CopiedIcon boxSize="20px" />
              ) : (
                <CopyIcon boxSize="20px" />
              )}
            </VStack>
            <Text
              color={
                theme.theme_name === "light" ? `primary` : `matador_text.100`
              }
              fontSize={"1.8rem"}
              fontWeight={700}
              textAlign={`center`}
              fontFamily={"Liberation Sans"}
              textTransform={`uppercase`}
              letterSpacing={`.32rem`}
            >
              {person?.name}
              {/* PETER JOHN */}
            </Text>
            <Text
              color="matador_text.500"
              fontSize={"1.4rem"}
              fontWeight={400}
              textAlign={`center`}
              fontFamily={"Liberation Sans"}
              letterSpacing={`.32rem`}
            >
              {person?.phone_number}
            </Text>
          </VStack>
        ))}
      </VStack>
    </Box>
  );
};
const ContactPerson = ({ info, contactModal, contactPersons }) => {
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
      onClose={contactModal?.onClose}
      isOpen={contactModal?.isOpen}
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
        maxH="75rem"
      >
        <ContactPersonContent
          contactPersons={contactPersons}
          disclosure={contactModal}
          info={info}
        />
      </ModalContent>
    </Modal>
  ) : (
    <Drawer
      autoFocus={false}
      isCentered
      onClose={contactModal?.onClose}
      isOpen={contactModal?.isOpen}
      placement="bottom"
    >
      <DrawerOverlay />
      <DrawerContent
        bg="card_bg"
        w={{ md: "50.0rem" }}
        minH={`30.1rem`}
        borderRadius={{ base: "1.6rem 1.6rem 0rem 0rem", md: "0rem" }}
        mb={{ md: "6.0rem" }}
        ml={{ md: `auto` }}
        mr={{ md: `12.2rem` }}
        fontFamily={`Open Sans`}
        color={`#424242`}
      >
        <ContactPersonContent
          contactPersons={contactPersons}
          disclosure={contactModal}
          info={info}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default ContactPerson;
