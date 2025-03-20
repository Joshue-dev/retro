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
  Stack,
  ModalFooter,
  StackDivider,
} from "@chakra-ui/react";
import { useAssetPayment } from "../../../ui-lib/ui-lib.hooks";
import copyIcon from "/src/images/icons/copyIcon.svg";
import copiedIcon from "/src/images/icons/copied_icon.svg";
import { CloseIcon } from "@chakra-ui/icons";
import MobileHeader from "@/components/navbar/mobile_header";
import { AccountErrorState } from "@/components/appState/account-state";
import { customScrollbarStyles } from "@/components/portfolioAndAssetInfo/screens/assetInfoScreens/makeADepositToAnAsset";
import { Button } from "ui-lib/ui-lib.components";
import { calculateFee } from "utils/calculateFee";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { useQuery } from "react-query";
import { fetchSavedCards } from "@/api/payment";
import ListCards from "pages/listing-details/units/buyModalComponents/cardsScreen";

const PaymentDrawer = ({ asset, drawer, amountToPay, selectedCard, setSelectedCard }) => {
  const paymentType = "deposit";
  const [storeThemeInfo] = useLocalStorage("storeThemeInfo");
  const isWalletEnabled = storeThemeInfo?.isWalletEnabled;
  const isGatewayEnabled = storeThemeInfo?.isGatewayEnabled;
  const paymentDetails = {
    amount_to_pay: Number(amountToPay),
    equity_id: asset?.id,
    is_coown: false,
    pending: true,
  };
  const [walletPay, setWalletPay] = useState(false);
  const { data, isLoading: fetchingCard } = useQuery(
    ["cardSaved"],
    fetchSavedCards
  );

  const {
    handleBankTransfer,
    handlePayFromWallet,
    handlePaywithCard,
    isLoading,
    transferDetails,
    isError,
    isAboveLimit,
  } = useAssetPayment({
    paymentType,
    amountToPay,
    modal: drawer,
    paymentDetails,
    walletPay,
    asset_id: asset?.project?.id,
    auth_code: selectedCard?.authorization_code
  });
  const theme = useTheme();
  const isDarkMode = theme.theme_name !== "light";
  const { hasCopied, onCopy } = useClipboard(
    transferDetails?.data?.account_number
  );

  let hasRendered = false;
  useEffect(() => {
    if (!hasRendered) {
      handleBankTransfer();
      hasRendered = true;
    }
  }, []);

  useEffect(() => {
    if (walletPay && isError) {
      setWalletPay(false);
    }
  }, [isError, walletPay]);

  const hasMultiAccounts = Array.isArray(transferDetails);
  const handleWalletPay = () => {
    setWalletPay(true);
    handlePayFromWallet();
  };

  const handleCardPay = () => {
    setWalletPay(true);
    handlePaywithCard();
  };

  const allowCardPay = !isAboveLimit && data?.data?.results?.length > 0;
  return (
    <Stack flex={1} h="full">
      <MobileHeader
        activePage={"Payment Method"}
        noIcons
        onDrawerClose={drawer?.onClose}
      />
      <Box
        px={"22px"}
        pt={{ base: "18px", md: "32px" }}
        pb={{ md: "28px" }}
        top="0"
        bg="card_bg"
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
        mb={isLoading ? "15px" : "0px"}
        display={{ base: "none", md: "flex" }}
      >
        <Flex w="full" h="20px" justify={"space-between"} align={"center"}>
          <Text
            color="text"
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight={600}
            textTransform={"uppercase"}
            fontFamily="Open Sans"
          >
            Payment Method
          </Text>
          <CloseIcon
            cursor={"pointer"}
            fontSize={"14px"}
            color="text"
            onClick={drawer?.onClose}
          />
        </Flex>
      </Box>
      {isLoading ? (
        <Flex px="20px" mb="13px" align={"center"} gap="8px">
          <Spinner color={theme.theme_name !== "light" ? "text" : "#757373"} />
          <Text
            fontSize={"16px"}
            fontWeight={400}
            color={theme.theme_name !== "light" ? "text" : "#757373"}
          >
            {!walletPay
              ? `Generating account number, please wait a moment...`
              : `Processing Transaction, please wait a moment...`}
          </Text>
        </Flex>
      ) : null}
      <Stack flex={1} w="full" h={"full"}>
        <Flex
          direction={"column"}
          w="full"
          h="full"
          justify={"space-between"}
          pb="18px"
          flex={1}
          gap="16px"
        >
          <Stack
            divider={
              <StackDivider
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.100"
                }
              />
            }
            gap="20px"
          >
            <Stack px="24px">
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
                <Text>{calculateFee(amountToPay)}</Text>
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
                    overflowY="auto"
                    maxH={{
                      base: isLoading ? "47.5vh" : "55vh",
                      md: isLoading ? "25rem" : "35.5rem",
                    }}
                    sx={customScrollbarStyles()}
                    gap="12px"
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
                  mt="12px"
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
            {isGatewayEnabled && <ListCards
            data={data}
            fetchingCard={fetchingCard}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            isLoading={isLoading}
          />}
          </Stack>
          {isGatewayEnabled && <ModalFooter gap={6} pb={{ base: 4, md: 0 }} px="24px" w="full">
            {isWalletEnabled && (
              <Button
                h="54px"
                fontSize="14px"
                fontWeight="500"
                w="full"
                bg={
                  theme.theme_name !== "light"
                    ? "matador_background.100"
                    : "card_bg"
                }
                border="1px solid"
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.300"
                }
                color="text"
                textTransform="uppercase"
                isDisabled={isLoading}
                onClick={handleWalletPay}
                rounded={0}
                _hover={{ color: "primary" }}
              >
                Pay With Wallet
              </Button>
            )}
            {Boolean(allowCardPay) > 0 && (
              <Button
                h="54px"
                fontSize="14px"
                fontWeight="500"
                w="full"
                bg="primary"
                border="1px solid"
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.300"
                }
                color="#FFF"
                textTransform="uppercase"
                isDisabled={!selectedCard}
                onClick={handleCardPay}
                rounded={0}
                _hover={{ bg: "primary" }}
                isLoading={isLoading}
              >
                Pay With Card
              </Button>
            )}
          </ModalFooter>}
        </Flex>
      </Stack>
    </Stack>
  );
};

export default PaymentDrawer;

