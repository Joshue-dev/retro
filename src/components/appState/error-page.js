import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Button } from "ui-lib";
import alertIcon from "images/icons/alert-circle.svg";
import errorBG from "images/bg_pattern.png"

export const ErrorPage = ({ error }) => {
  const router = useRouter();
  const errorMsg = error?.response?.status === 500
  ? "Apologies for the inconvenience. We're working on it. Please try again later."
  : error?.response?.status === 401
  ? "Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue."
  : error?.response?.data?.message ??
    error?.response?.message ??
    error?.message ??
    "Something went wrong..."

  return (
    <VStack minH='80rem' align="center" justify='center' gap="16px" bgImage={errorBG.src} bgRepeat='no-repeat' bgPos='top'>
      <Box bg="#FEE4E2" p="12px" rounded="full" boxSize="48px">
        <Image src={alertIcon.src} alt="error icon" />
      </Box>
      <VStack textAlign="center" w="full">
        <Text
          fontWeight={700}
          fontSize="16px"
          fontFamily="Liberation Sans"
          color="text"
        >
          {errorMsg}
        </Text>
        <Text maxW="50rem" fontSize="14px" color="matador_text.500">
          We had some trouble loading this page. Please refresh the page or{" "}
          <Text as="span" textDecoration="underline">
            get in touch
          </Text>{" "}
          for support.
        </Text>
      </VStack>
      <Button
        onClick={() => router?.reload()}
        color="white"
        bg="primary"
        w={"147px"}
        type="submit"
        h="48px"
        fontSize={{ base: 12, md: 16 }}
        fontWeight={400}
        textTransform={"uppercase"}
        mt={{ base: "1.75rem", md: 0 }}
      >
        Refresh page
      </Button>
    </VStack>
  );
};
