import { Image, Text, useTheme, VStack } from "@chakra-ui/react";
import React from "react";
import empty from "../../images/icons/empty-icon.svg";
import emptyLight from "../../images/icons/empty-icon-light.svg";

const ErrorState = ({ text, height, icon, ...rest }) => {
  const theme = useTheme();
  return (
    <VStack
      h={height || { base: "300px", md: "450px" }}
      borderRadius="5px"
      w="full"
      justify="center"
      my={{ base: "10px", md: "13px" }}
      mb={{ base: "18px", md: "24px" }}
      {...rest}
    >
     {!icon && <Image
        w="auto"
        h={{ base: "30px", md: "50px" }}
        src={theme.theme_name === "light" ? empty.src : emptyLight.src}
        alt="notification empty state"
      />}
      <Text
        fontWeight={rest.fontWeight || "400"}
        color="text"
        fontSize={rest.textSize || { base: "12px", md: "16px" }}
        textAlign="center"
      >
        {text || "An error occurred"}
      </Text>
    </VStack>
  );
};

export default ErrorState;
