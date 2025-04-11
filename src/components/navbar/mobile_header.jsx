import React from "react";
import { Flex, Text, Icon, HStack, Image, useTheme } from "@chakra-ui/react";
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { BiMenu } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import notificationIcon from "../../images/icons/notification.svg";

const MobileHeader = ({
  activePage,
  onDrawerOpen,
  onDrawerClose,
  onNotOpen,
  noIcons,
  noBack,
  ...rest
}) => {
  const theme = useTheme()
  return (
    <Flex
      display={{ base: "flex", md: "none" }}
      mb="10px"
      px={"32px"}
      w="full"
      bg='card_bg'
      justify={"space-between"}
      align={"center"}
      p="20px"
      direction={"row"}
      borderBottom='0.4px solid'
      borderBottomColor={theme.theme_name !== 'light' ? 'matador_border_color.200' : "matador_border_color.300"}
      
      {...rest}
    >
      <Flex align={"center"} maxW='90%' gap="10px" justify={"center"}>
        {noBack || noIcons ? null : <ChevronLeftIcon
          cursor={"pointer"}
          onClick={onDrawerClose}
          fontSize={"30px"}
          color={"text"}
        />}
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
      {noIcons ? 
        <CloseIcon color='text' fontSize={14} onClick={onDrawerClose} />
      : <HStack gap="24px">
        <Icon
          as={BiMenu}
          color="text"
          onClick={onDrawerOpen}
          fontSize={"30px"}
        />
      </HStack>}
    </Flex>
  );
};

export default MobileHeader;
