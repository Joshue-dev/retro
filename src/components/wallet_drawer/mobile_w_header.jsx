import React from "react";
import { Flex, Text, Icon, HStack, useTheme } from "@chakra-ui/react";
import { ArrowBackIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { BiMenu } from "react-icons/bi";

export const MobileWalletHeader = ({
  activePage,
  onDrawerOpen,
  onDrawerClose,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <Flex
      display={{ base: "flex", md: "none" }}
      px={"48px"}
      w="full"
      bg="card_bg"
      justify={"space-between"}
      align={"center"}
      p="20px"
      direction={"row"}
      borderBottom="0.4px solid"
      borderBottomColor={
        theme.theme_name !== "light"
          ? "matador_border_color.200"
          : "matador_border_color.300"
      }
      {...rest}
    >
      <Flex align={"center"} maxW="90%" gap="10px" justify={"center"}>
        <ChevronLeftIcon
          cursor={"pointer"}
          onClick={onDrawerClose}
          fontSize={"30px"}
          color={"text"}
        />
        <Text
          color="text"
          fontFamily="Open Sans"
          letterSpacing="0.96px"
          fontSize={"16px"}
          textTransform="uppercase"
          fontWeight={600}
        >
          {activePage}
        </Text>
      </Flex>
      <Icon as={BiMenu} color="text" onClick={onDrawerOpen} fontSize={"30px"} />
    </Flex>
  );
};

export default MobileWalletHeader;
