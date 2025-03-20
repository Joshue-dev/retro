import React, { useRef } from "react";
import {
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const useToastForRequest = () => {
  const toast = useToast();
  const toastIdRef = useRef();
  const renderToastObj = ({
    title,
    description,
    status,
    error,
    duration
  }) => {
    switch (status) {
      case "error":
        return {
          text: title || "Oops...",
          subText:
            description ||
            `${
              error?.response?.status === 500
                ? "Apologies for the inconvenience. We're working on it. Please try again later."
                : error?.response?.status === 401
                  ? "Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue."
                  : (error?.response?.data?.message ??
                    error?.response?.message ??
                    error?.message ??
                    "Something went wrong")
            }`,
          primary: "#CA1611",
          secondary: "#F4B0A1",
          primaryLight: "#FFF5F3",
          duration: duration
        };
      case "success":
        return {
          text: title,
          subText: description,
          primary: "#2F855A",
          secondary: "#48C1B5",
          primaryLight: "#F6FFF9",
          duration: duration
        };
      default:
        return {
          text: title || "An Error occurred",
          subText:
            error ? 
            `${
              error?.response?.status === 500
                ? "Apologies for the inconvenience. We're working on it. Please try again later."
                : error?.response?.status === 401
                  ? "Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue."
                  : (error?.response?.data?.message ??
                    error?.response?.message ??
                    error?.message ??
                    "Something went wrong")
            }` : description,
          primary: "#2c5282",
          secondary: "#F4B0A1",
          primaryLight: "#FFF5F3",
          duration: duration
        };
    }
  };
  const close = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current)
    }
  };
  const addToast = ({
    description,
    error,
    title,
    status,
    duration,
    ...toastPropObj
  }) =>
    {
      toastIdRef.current = toast({
        position: "top-right",
        containerStyle: {
          bg: `${renderToastObj({ status }).primary}`,
          p: '12px'
        },
        // isClosable: true,
        duration: duration ?? 5000,
        render: () => (
          <Box position="relative" w="full">
            <HStack w='full' justify='space-between' alignItems="center" mr="10px">
              <Stack spacing="4px">
                <Text fontSize="16px" fontWeight="600" color="#FFF">
                  {renderToastObj({ title, status }).text}{" "}
                </Text>
                <Text fontSize="13px" fontWeight="400" color="#fff">
                  {renderToastObj({ error, description, status }).subText}
                </Text>
              </Stack>
              <CloseIcon cursor='pointer' onClick={close} color='#FFF' />
            </HStack>
          </Box>
        ),
        title,
        description,
        status,
        duration,
        ...toastPropObj,
      })
    };
  return addToast;
};