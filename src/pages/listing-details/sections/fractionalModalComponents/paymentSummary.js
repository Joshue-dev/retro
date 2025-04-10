import React, { useState } from "react";
import {
  Flex,
  Text,
  Box,
  ModalCloseButton,
  Stack,
  useTheme,
  Button,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { formatToCurrency } from "../../../../utils";

const PaymentSummary = ({
  fractionalData,
  onCloseModal,
  fractionalModal,
  fractions,
  setFractions,
  setStep,
  fractionDetail,
  paymentDetails,
  amountToPay,
  setAmountToPay,
  onClose,
}) => {
  const theme = useTheme();
  const [error, setError] = useState("");
  const unitData = fractionalData?.fraction_data?.unit;
  
  const leftFractions = Number(unitData?.total_fractions)

  const handleFractionInput = (e) => {
    setError("");
    const value = e.target.value;
    if (value > leftFractions) {
      setError(
        "Apologies, but you cannot purchase more fractions than are currently available."
      );
    }
    setFractions(value);
    setAmountToPay(Number(value * unitData?.price_per_fraction).toFixed(2))
  };

  return (
    <Stack flex={1} h='full'>
    <Flex
      direction={"row"}
      w="full"
      borderBottom={"1px solid"}
      borderColor={
        theme.theme_name !== "light"
          ? "matador_border_color.200"
          : "matador_border_color.300"
      }
      justify={"space-between"}
      p="24px"
      align="center"
    >
      <Text
        fontWeight={600}
        textAlign={"center"}
        fontSize={"20px"}
        color={"text"}
        textTransform={"uppercase"}
        fontFamily={"Open Sans"}
        letterSpacing={"1.44px"}
      >
        Payment Summary
      </Text>
      <ModalCloseButton
        position="initial"
        fontSize="10px"
        color={"matador_text.100"}
      />
    </Flex>
    <Stack flex={1} h="full" justify="space-between" gap="3rem" p={10}>
      <Stack gap="1.5rem">
        <Flex
          direction={"row"}
          w="full"
          justify={"space-between"}
          p="24px"
          display={{ base: "none", md: "flex" }}
          align="center"
          bg="primary"
          color="#FFF"
        >
          <Text
            fontWeight={600}
            textAlign={"start"}
            color={"#fff"}
            textTransform={"uppercase"}
            letterSpacing={"1.44px"}
            fontSize="15px"
          >
            price per fraction
          </Text>
          <Text
            fontWeight={600}
            textAlign={"end"}
            color={"#fff"}
            textTransform={"uppercase"}
            letterSpacing={"1.44px"}
            fontSize="18px"
          >
            {formatToCurrency(unitData?.price_per_fraction)}
          </Text>
        </Flex>
        <Stack gap="8px">
          <Text
            fontSize={{ base: '1em', md: '1.25em'}}
            color={theme.theme_name !== "light" ? "#A6A6A6" : "#606060"}
          >
            How much fraction would you like to purchase?
          </Text>
          <Box>
            <Input
              type="number"
              value={fractions}
              onChange={handleFractionInput}
              placeholder="0"
              fontSize="16px"
              color={theme.theme_name !== "light" ? "#A6A6A6" : "#606060"}
              h="48px"
              px="2rem"
              border="1px solid !important"
              borderColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200 !important"
                  : "matador_border_color.300 !important"
              }
              _focus={{
                border: "1px solid",
                borderColor:
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.300",
              }}
              rounded="7px"
              bg={theme.theme_name !== 'light' ? "matador_background.100" : "card_bg"}
            />
            <Text fontSize=".9em" color="primary">
              {error && error}
            </Text>
          </Box>
          <Flex justify="space-between">
            <Text
              fontSize="1.25em"
              color={theme.theme_name !== "light" ? "#A6A6A6" : "#606060"}
            >
              Amount
            </Text>
            <Text
              fontSize="1.25em"
              color={theme.theme_name !== "light" ? "#A6A6A6" : "#606060"}
            >
              {formatToCurrency(amountToPay)}
            </Text>
          </Flex>
        </Stack>
      </Stack>
      <ModalFooter w='full' px={0}>
        <Button
          bg="primary"
          w="full"
          textTransform="uppercase"
          color="#FFFFFF"
          fontSize="16px"
          h="54px"
          p="13px 24px"
          _hover={{ bg: "" }}
          onClick={() => setStep('pay')}
          isDisabled={!fractions || error}
          rounded={0}
          _active={{
            opacity: 1
          }}
        >
          Proceed
        </Button>
      </ModalFooter>
    </Stack>
  </Stack>
  )
};

export default PaymentSummary;
