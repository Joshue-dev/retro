import {
  Button,
  Divider,
  DrawerCloseButton,
  DrawerFooter,
  Flex,
  HStack,
  Spinner,
  Stack,
  Image,
  Text,
  useClipboard,
  useMediaQuery,
  useTheme,
  Box,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { formatToCurrency } from "../../../../utils";
import { useAssetPayment } from "../../../../ui-lib/ui-lib.hooks";
import angledArrow from "/src/images/icons/backIconForAsset.svg";
import copyIcon from "/src/images/icons/copyIcon.svg";
import copiedIcon from "/src/images/icons/copied_icon.svg";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { AccountErrorState } from "@/components/appState/account-state";
import ListCards from "pages/listing-details/units/buyModalComponents/cardsScreen";
import { fetchSavedCards } from "@/api/payment";
import { useQuery } from "react-query";

const MakeADepositToAnAsset = ({
  info,
  drawerDisClosure,
  handleScreen,
  refetch,
  amountToPay,
}) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [walletPay, setWalletPay] = useState(false);
  const [cardPay, setCardPay] = useState(false)
  const theme = useTheme();
  const isDarkMode = theme.theme_name !== "light";
  const [isBelowMd] = useMediaQuery("(max-width:540px)");
  const [storeThemeInfo] = useLocalStorage("storeThemeInfo");
  const isWalletEnabled = storeThemeInfo?.isWalletEnabled;
  const isGatewayEnabled = storeThemeInfo?.isGatewayEnabled;
  const { data, isLoading: fetchingCard } = useQuery(
    ["cardSaved"],
    fetchSavedCards
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const paymentType = "deposit";

  const paymentDetails = {
    equity_id: info && info?.id,
    amount_to_pay: Number(inputValue) > 0 ? inputValue : amountToPay,
    is_coown: false,
    pending: true,
  };

  const {
    handlePayFromWallet,
    handleBankTransfer,
    isLoading,
    transferDetails,
    setTransferDetails,
    handlePaywithCard,
    isError,
    isAboveLimit
  } = useAssetPayment({
    paymentType,
    refetch,
    amountToPay: Number(inputValue) > 0 ? inputValue : amountToPay,
    modal: null,
    paymentDetails,
    asset_id: info?.project?.id,
    walletPay,
  });

  const { hasCopied, onCopy } = useClipboard(
    transferDetails?.data?.account_number
  );

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [inputRef]);

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

  const handleBackNavigation = () => {
    const navigateToAssetInfo = handleScreen("asset info");

    if (isBelowMd) {
      drawerDisClosure?.onClose();
    } else {
      navigateToAssetInfo();
    }
    setInputValue("");
    setTransferDetails(null);
  };

  const handleWalletPay = () => {
    setWalletPay(true);
    handlePayFromWallet();
  };

  const handleCardPay = () => {
    setCardPay(true);
    handlePaywithCard();
  };

  const allowCardPay = !isAboveLimit && data?.data?.results?.length > 0;

  return (
    <>
      <HStack
        p={{ base: "30.501px 21.49px 30.039px 21.49px", md: "24px" }}
        w="full"
        maxH={{ base: "89.5px", md: "100px" }}
        justify="space-between"
        align="center"
        borderBottom={{ md: "1px solid" }}
        borderBottomColor={{
          md:
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.100",
        }}
        mb="10px"
      >
        <HStack spacing="8px" role="button" onClick={handleBackNavigation}>
          <Image
            src={angledArrow.src}
            boxSize="28px"
            alt="back icon"
            filter={isDarkMode ? "invert(1)" : ""}
          />
          <Text
            as="h1"
            fontSize={{ base: " 21.49px", md: "22px" }}
            fontFamily="Open Sans"
            lineHeight={{ base: "22px", md: "33px" }}
            fontWeight="600"
            color="matador_text.600"
            letterSpacing="1.44px"
          >
            MAKE DEPOSIT
          </Text>
        </HStack>

        <DrawerCloseButton size={14} color="text" position="initial" />
      </HStack>
      {isLoading ? (
        <Flex px="20px" my="13px" align={"center"} gap="8px">
          <Spinner color={theme.theme_name !== "light" ? "text" : "#757373"} />
          <Text
            fontSize={"16px"}
            fontWeight={400}
            color={theme.theme_name !== "light" ? "text" : "#757373"}
          >
            {!walletPay || !cardPay
              ? `Generating account number, please wait a moment...`
              : `Processing Transaction, please wait a moment...`}
          </Text>
        </Flex>
      ) : null}
      <Stack justify="space-between" flex={1} w="full" h={"full"}>
        <Stack
          w="full"
          h="full"
          justify={"space-between"}
          pt="14px"
          pb="24px"
          divider={
            <StackDivider
              borderColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
            />
          }
          gap="10px"
        >
          <Box px="24px">
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
              <Text>{formatToCurrency(amountToPay)}</Text>
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
                  maxH={{ base: "25vh", md: "17.5rem" }}
                  sx={customScrollbarStyles()}
                  gap="12px"
                >
                  {transferDetails?.map((detail, idx) => {
                    const bankName =
                      detail?.bank_name ?? detail?.account_bank_name;
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
                            {bankName ?? "-"}
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
                            maxW={"65%"}
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
                mt="13px"
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
                    maxW={"65%"}
                    textAlign="end"
                  >
                    {transferDetails?.account_name ?? "-"}
                  </Text>
                </Flex>
              </VStack>
            ) : (
              <AccountErrorState isError={isError} />
            )}
          </Box>
          {isGatewayEnabled && <ListCards
            data={data}
            fetchingCard={fetchingCard}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            isLoading={isLoading}
          />}
        </Stack>
      </Stack>
      {isGatewayEnabled ? (
        <DrawerFooter
          p={{ md: "1.6px 26.7px 26.7px", base: "0px 23.9px 23.9px" }}
          gap={4}
        >
          {isWalletEnabled && <Button
            w='full'
            h={{ base: "48px", md: "54px" }}
            fontSize='14px'
            borderRadius="0px"
            bg={
              theme.theme_name !== "light"
                ? "matador_background.100"
                : "card_bg"
            }
            fontWeight="400"
            color="#FFFFFF"
            _hover={{
              opacity: 1,
            }}
            _focus={{
              opacity: 1,
            }}
            _active={{
              opacity: 1,
            }}
            onClick={handleWalletPay}
            borderColor={
              theme.theme_name !== "light"
                ? "matador_border_color.200"
                : "matador_border_color.300"
            }
          >
            PAY WITH WALLET
          </Button>}
          {Boolean(allowCardPay) && (
            <Button
              h={{ base: "48px", md: "54px" }}
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
              color="text"
              textTransform="uppercase"
              isDisabled={!selectedCard}
              onClick={handleCardPay}
              rounded={0}
              _hover={{ bg: "primary" }}
            >
              Pay With Card
            </Button>
          )}
        </DrawerFooter>
      ) : null}
    </>
  );
};

export default MakeADepositToAnAsset;

export const customScrollbarStyles = (
  trackColor = "#fff",
  thumbColor = "#cbcbcb"
) => ({
  "&::-webkit-scrollbar": {
    width: "4px",
    borderRadius: "16px",
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "16px",
    WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "16px",
    backgroundColor: thumbColor,
  },
});
