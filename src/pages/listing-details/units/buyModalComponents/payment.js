import React, { useEffect, useState } from "react";
import {
  Image,
  Flex,
  Box,
  Text,
  VStack,
  Divider,
  useClipboard,
  Spinner,
  useTheme,
  ModalFooter,
  Stack,
} from "@chakra-ui/react";
import { useAssetPayment } from "../../../../ui-lib/ui-lib.hooks";
import { Button } from "../../../../ui-lib";
import { CloseIcon } from "@chakra-ui/icons";
import copyIcon from "/src/images/icons/copyIcon.svg";
import copiedIcon from "/src/images/icons/copied_icon.svg";
import { calculateFee } from "utils/calculateFee";
import ErrorState from "@/components/appState/error-state";
import NoAccountIcon from "/src/images/icons/no_account.svg";
import { useQuery } from "react-query";
import { fetchBankDetails } from "@/api/payment";
import EmptyState from "@/components/appState/empty-state";
import { customScrollbarStyles } from "@/components/portfolioAndAssetInfo/screens/assetInfoScreens/makeADepositToAnAsset";
import { AccountErrorState } from "@/components/appState/account-state";
import useLocalStorage from "utils/hooks/useLocalStorage";

const PaymentDrawer = ({
  buyModal,
  drawer,
  paymentDetails,
  amount,
  selectedPlan,
  fullPayment,
  unitData,
  isFractional,
}) => {
  const paymentType = "asset";
  const theme = useTheme();
  const isDarkMode = theme.theme_name !== "light";
  const {
    handleBankTransfer,
    handlePayFromWallet,
    isLoading,
    transferDetails,
    isError,
  } = useAssetPayment({
    paymentType,
    amountToPay: amount,
    modal: buyModal,
    paymentDetails,
    asset_id: unitData?.project?.id,
  });

  let hasRendered = false;
  useEffect(() => {
    if (!hasRendered) {
      handleBankTransfer();
      hasRendered = true;
    }
  }, []);

  const { hasCopied, onCopy } = useClipboard(transferDetails?.account_number);
  const hasMultiAccounts = Array.isArray(transferDetails);

  return (
    <Stack flex={1} h="full">
      <Box
        px={"21px"}
        py={{ base: "22.5px", md: "32px" }}
        mb="1px"
        top="0"
        right={0}
        w="full"
        zIndex={200}
        borderTopRadius={{ base: "16px", md: "unset" }}
        borderBottom={{ md: "1px solid" }}
        borderBottomColor={{
          md:
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.300",
        }}
      >
        <Flex w="full" h="20px" justify={"space-between"} align={"center"}>
          <Text
            color="text"
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight={600}
            textTransform={"uppercase"}
            fontFamily="Open Sans"
          >
            {isFractional
              ? "Payment method"
              : fullPayment
              ? "OUTRIGHT PAYMENT"
              : `${selectedPlan?.payment_period_in_months} MONTH${
                  selectedPlan?.payment_period_in_months > 1 ? "S" : ""
                } PAYMENT PLAN`}
          </Text>
          <CloseIcon
            cursor={"pointer"}
            fontSize={"14px"}
            color="text"
            onClick={buyModal?.onClose}
          />
        </Flex>
      </Box>
      {isLoading ? (
        <Flex px="20px" my="13px" align={"center"} gap="8px">
          <Spinner color={theme.theme_name !== "light" ? "text" : "#757373"} />
          <Text
            fontSize={"16px"}
            fontWeight={400}
            color={theme.theme_name !== "light" ? "text" : "#757373"}
          >
            Generating account number, please wait a moment...
          </Text>
        </Flex>
      ) : null}
      <Stack flex={1} w="full" h={"full"}>
        <Flex
          direction={"column"}
          w="full"
          h="full"
          justify={"space-between"}
          px="24px"
          pb="18px"
          flex={1}
          gap="16px"
        >
          <Stack flex={1} h='full'>
            <Flex
              color={"white"}
              fontSize={"16px"}
              fontWeight={600}
              justify={"space-between"}
              align={"center"}
              p={{ base: "26.154px 24.291px", md: "22.632px 15.876px" }}
              bg="primary"
            >
              <Text textTransform={"uppercase"}>You will Pay</Text>
              <Text>{calculateFee(amount)}</Text>
            </Flex>

            {hasMultiAccounts && (
              <Text
                py={6}
                fontFamily={"Open Sans"}
                letterSpacing="0.96px"
                fontWeight={600}
                fontSize="16px"
                color="text"
              >
                Choose the bank of your preference
              </Text>
            )}
            {hasMultiAccounts ? (
              transferDetails?.length > 0 ? (
                <Stack
                  overflowY="scroll"
                  h='full'
                  maxH={{
                      base: isLoading ? "47.5vh" : "55vh",
                      md: isLoading ? "30rem" : "40.5rem",
                    }}
                  sx={customScrollbarStyles()}
                  gap="12px"
                  flex={1}
                >
                  {transferDetails?.map((detail, idx) => {
                    return (
                      <VStack
                        align={"stretch"}
                        gap="6px"
                        fontWeight={500}
                        p={{
                          base: "10.592px 28.245px 10.592px 21.184px",
                          md: "11.596px 30.921px 11.596px 23.191px",
                        }}
                        border={"1.2px solid"}
                        borderColor={
                          theme.theme_name !== "light"
                            ? "matador_border_color.200"
                            : "matador_border_color.300"
                        }
                        divider={<Divider />}
                        bg={
                          theme.theme_name !== "light"
                            ? "matador_background.100"
                            : "card_bg"
                        }
                        key={idx}
                      >
                        <Flex justify={"space-between"} align={"center"}>
                          <Text
                            color="matador_text.500"
                            fontWeight={400}
                            fontSize={{ base: "12px", md: "14px" }}
                            letterSpacing="0.84px"
                            fontFamily="Open Sans"
                          >
                            Bank
                          </Text>
                          <Text
                            color="matador_text.600"
                            fontSize={{ base: "14px", md: "16px" }}
                            fontWeight={600}
                          >
                            {detail?.account_bank_name ?? "-"}
                          </Text>
                        </Flex>
                        <Flex justify={"space-between"} align={"center"}>
                          <Text
                            color="matador_text.500"
                            fontWeight={400}
                            fontSize={{ base: "12px", md: "14px" }}
                            letterSpacing="0.84px"
                            fontFamily="Open Sans"
                          >
                            Account number
                          </Text>
                          <Flex align={"center"} gap="10px">
                            <Text
                              color="matador_text.600"
                              fontSize={{ base: "14px", md: "16px" }}
                              fontWeight={600}
                            >
                              {detail?.account_number ?? "-"}
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex justify={"space-between"} align={"center"}>
                          <Text
                            color="matador_text.500"
                            fontWeight={400}
                            fontSize={{ base: "12px", md: "14px" }}
                            letterSpacing="0.84px"
                            fontFamily="Open Sans"
                          >
                            Account Name
                          </Text>
                          <Text
                            color="matador_text.600"
                            fontSize={{ base: "14px", md: "16px" }}
                            fontWeight={600}
                            maxW={"20rem"}
                            textAlign="end"
                          >
                            {detail?.account_name ?? "-"}
                          </Text>
                        </Flex>
                      </VStack>
                    );
                  })}
                </Stack>
              ) : (
                <AccountErrorState isError={isError} />
              )
            ) : transferDetails ? (
              <VStack
                align={"stretch"}
                mt="1px"
                gap="6px"
                fontWeight={500}
                p={{
                  base: "10.592px 28.245px 10.592px 21.184px",
                  md: "11.596px 30.921px 11.596px 23.191px",
                }}
                border={"1.2px solid"}
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.300"
                }
                divider={<Divider />}
                bg={
                  theme.theme_name !== "light"
                    ? "matador_background.100"
                    : "card_bg"
                }
              >
                <Flex justify={"space-between"} align={"center"}>
                  <Text
                    color="matador_text.500"
                    fontWeight={400}
                    fontSize={{ base: "12px", md: "14px" }}
                    letterSpacing="0.84px"
                    fontFamily="Open Sans"
                  >
                    Bank
                  </Text>
                  <Text
                    color="matador_text.600"
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight={600}
                  >
                    {transferDetails?.bank_name ?? "-"}
                  </Text>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                  <Text
                    color="matador_text.500"
                    fontWeight={400}
                    fontSize={{ base: "12px", md: "14px" }}
                    letterSpacing="0.84px"
                    fontFamily="Open Sans"
                  >
                    Account number
                  </Text>
                  <Flex align={"center"} gap="10px">
                    <Text
                      color="matador_text.600"
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight={600}
                    >
                      {transferDetails?.account_number ?? "-"}
                    </Text>
                    {hasCopied ? (
                      <Image
                        src={copiedIcon.src}
                        alt=""
                        filter={isDarkMode ? "invert(1)" : ""}
                        cursor="pointer"
                        boxSize={"18px"}
                      />
                    ) : (
                      <Image
                        src={copyIcon.src}
                        onClick={onCopy}
                        filter={isDarkMode ? "invert(1)" : ""}
                        cursor="pointer"
                        boxSize={"18px"}
                      />
                    )}
                  </Flex>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                  <Text
                    color="matador_text.500"
                    fontWeight={400}
                    fontSize={{ base: "12px", md: "14px" }}
                    letterSpacing="0.84px"
                    fontFamily="Open Sans"
                  >
                    Account Name
                  </Text>
                  <Text
                    color="matador_text.600"
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight={600}
                    maxW={"20rem"}
                    textAlign="end"
                  >
                    {transferDetails?.account_name ?? "-"}
                  </Text>
                </Flex>
              </VStack>
            ) : (
              <AccountErrorState isError={isError} />
            )}
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default PaymentDrawer;
