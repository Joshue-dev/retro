import React from "react";

import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  HStack,
  Image,
  Stack,
  Text,
  useTheme,
} from "@chakra-ui/react";

import { HomeIconForAllocation } from "../../../../images/icons/homeForAllocation";

const ConfirmSelectedAllocation = ({
  handleScreen,
  mutation,
  allocationVal,
  handleSubmitAllocation,
}) => {
  const theme = useTheme();
  return (
    <>
      <HStack
        p={{ base: "22px 17px 22px 16px", md: "32px 32px 0px" }}
        w="full"
        justify="end"
        display={{ base: "flex", md: "none" }}
      >
        <DrawerCloseButton fontSize={14} color="text" position="initial" />
      </HStack>
      <DrawerBody
        display="flex"
        h="full"
        alignItems="center"
        justifyContent="center"
        p={{ base: "0px 23.9px 23.9px", md: "26.7px" }}
        maxH='55rem'
      >
        <Stack mt={{ md: "15vh" }} align="center" w="full" spacing="none">
          <HomeIconForAllocation
            mb={{ base: "38px", md: "29px" }}
            mx="auto"
            width={{ base: "64px", md: "96px" }}
            height={{ base: "64px", md: "96px" }}
          />
          <Text
            fontSize={{ base: "20px", md: "24px" }}
            fontWeight="600"
            textAlign="center"
            color="matador_text.100"
            textTransform="uppercase"
          >
            Are you sure you want {allocationVal}?
          </Text>
          <HStack
            mt={{ base: "38.8px", md: "35.6px" }}
            justify="space-between"
            spacing="20px"
            w="full"
          >
            <Button
              color="text"
              borderRadius="0px"
              p={{ base: "14px 17.93px", md: " 11.125px 20.025px" }}
              h={{ base: "52px", md: "62px" }}
              fontSize={{ base: "14px", md: "18px" }}
              fontWeight="400"
              _hover={{
                bg: "transparent",
              }}
              onClick={handleScreen("select allocation")}
              _focus={{
                bg: "transparent",
                border: "0.75px solid #606060 !important",
              }}
              _active={{
                bg: "transparent",
                border: "0.75px solid #606060 !important",
              }}
              variant="outline"
              w="full"
              border="1px solid"
              borderColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
              bg={theme.theme_name !== "light" ? "background" : "transparent"}
            >
              NO, GO BACK
            </Button>{" "}
            <Button
              p={{ base: "14px 17.93px", md: " 11.125px 20.025px" }}
              borderRadius="0px"
              h={{ base: "52px", md: "64px" }}
              fontSize={{ base: "14px", md: "18px" }}
              fontWeight="400"
              bg="primary"
              color="#FFF"
              isLoading={mutation?.isLoading}
              onClick={handleSubmitAllocation}
              _hover={{
                opacity: 1,
              }}
              _focus={{
                opacity: 1,
              }}
              _active={{
                opacity: 1,
              }}
              w="full"
              textTransform="uppercase"
            >
              Yes
            </Button>
          </HStack>
        </Stack>
      </DrawerBody>
    </>
  );
};

export default ConfirmSelectedAllocation;
