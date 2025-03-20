import { useState } from "react";
import {
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Box,
  Center,
  useClipboard,
  useToast,
  Stack,
  Heading,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Divider,
  useTheme,
  Spinner,
} from "@chakra-ui/react";
import { Button, FormInput } from "../../ui-lib/ui-lib.components";
import cardImg from "../../images/icons/card.svg";
import { CheckIcon, CloseIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useMutation, useQuery } from "react-query";
import {
  fetchVirtualAccountNumber,
  makeeDepositToWallet,
} from "../../api/Wallet";
import { storeName } from "../../constants/routes";
import { formatToCurrency } from "../../utils";
import { fetchSavedCards, makePaymentWithSavedCard } from "../../api/payment";
import openExternalUrl from "../../utils/openExternalLink";
import { scrollBarStyles } from "../common/ScrollBarStyles";
import copyIcon from "/src/images/icons/copyIcon.svg";
import copiedIcon from "/src/images/icons/copied_icon.svg";
import depositCIcon from "../../images/icons/deposit-wallet-button.svg";
import isMobile from "../../utils/extras";
import EmptyState from "../appState/empty-state";
import useGetSession from "utils/hooks/getSession";

export const DepositWallet = ({ setPage, onWalClose, onClose }) => {
  const [step, setStep] = useState("method");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const VIRTUAL_ACCOUNT_NUMBER = useQuery(
    ["fetchVirtualAccountNumber"],
    fetchVirtualAccountNumber
  );
  const bankDetails = VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data;
  const { hasCopied, onCopy } = useClipboard(bankDetails?.account_number ?? "");

  const { data: savedCards } = useQuery(["cardSaved"], fetchSavedCards);

  const handleInput = (e) => {
    const input = e.target;
    let val = input.value;

    const cleanedString = val.replace(/[^\d]/g, ""); // Remove non-numeric characters
    val = cleanedString.replace(/^0+(?=\d)/, "");

    const length = val.length;

    if (length <= 2) {
      val = "0." + val.padStart(2, "0");
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + "." + decimalPart;
    }

    setAmount(val);
  };

  const handleClose = () => {
    setStep("method");
    onWalClose();
  };

  const theme = useTheme();
  const isDarkMode = theme.theme_name !== "light";

  return (
    <Stack
      justify="space-between"
      bg="card_bg"
      overflowY={"auto"}
      css={scrollBarStyles}
      roundedTop={{ base: "16px", lg: 0 }}
      w="full"
    >
      <Stack w='full'>
        <Stack
          w="full"
          spacing={{ md:"14px"}}
          pb={{ md: step === "card" ? "0" : "8px" }}
          pt={6}
          px={6}
          h="full"
        >
          <HStack
            // display={{ base: "none", md: "flex" }}
            py={{ base: 2, md: 4 }}
            w="full"
            align="center"
            justify="space-between"
          >
            <ChevronLeftIcon
              cursor={"pointer"}
              onClick={
                step === "card"
                  ? () => setStep("method")
                  : () => setPage("wallet")
              }
              fontSize={"40px"}
              color={"text"}
              pb="4px"
              display={{ base: "none", md: "flex" }}
            />
            <Heading
              fontFamily="Open Sans"
              letterSpacing="1.2px"
              fontWeight={600}
              fontSize={"20px"}
              textTransform="uppercase"
              pb={{
                base: "10px",
                md: VIRTUAL_ACCOUNT_NUMBER?.isLoading ? "0px" : "15px",
              }}
              color="text"
              pl={{ base: 2, md: 4 }}
              display={{ md: "none" }}
            >
              Make a Deposit
            </Heading>
            <CloseIcon
              fontSize={"13px"}
              cursor="pointer"
              color="text"
              onClick={isMobile ? onClose : handleClose}
              mr={4}
              _hover={{
                bg: "",
              }}
            />
          </HStack>
          <Stack>
            {step === "card" ? (
              <Heading
                fontFamily="Open Sans"
                letterSpacing="1.2px"
                fontWeight={600}
                fontSize={"20px"}
                textTransform="uppercase"
                pb="12px"
                color="text"
                pl={4}
              >
                Select Card
              </Heading>
            ) : (
              <Box>
                <Heading
                  fontFamily="Open Sans"
                  letterSpacing="1.2px"
                  fontWeight={600}
                  fontSize={"20px"}
                  textTransform="uppercase"
                  pb={{
                    base: "10px",
                    md: VIRTUAL_ACCOUNT_NUMBER?.isLoading ? "0px" : "15px",
                  }}
                  color="text"
                  pl={{ base: 2, md: 4 }}
                  display={{ base: "none", md: "flex" }}
                >
                  Make a Deposit
                </Heading>
              </Box>
            )}
          </Stack>
        </Stack>
        {step === "method" && (
          <Stack>
            {VIRTUAL_ACCOUNT_NUMBER?.isLoading ? (
              <Flex mb="13px" align={"center"} gap="8px" pt={3} px={8}>
                <Spinner color="#757373" />
                <Text fontSize={"16px"} fontWeight={400} color="#757373">
                  Generating account number, please wait a moment...
                </Text>
              </Flex>
            ) : null}
            <Stack
              border="1.3px solid"
              borderColor={
                isDarkMode
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
              p="11.596px 30.921px 11.596px 23.191px"
              divider={
                <Divider
                  borderColor={
                    isDarkMode
                      ? "matador_border_color.200"
                      : "matador_border_color.100"
                  }
                />
              }
              gap="6px"
              mb="2rem"
              mx="2rem"
            >
              <Flex w="full" justify="space-between">
                <Text
                  color="text"
                  fontFamily="Open Sans"
                  fontSize={14}
                >{`Bank`}</Text>
                <Text
                  fontFamily="Open Sans"
                  color="text"
                  fontSize={16}
                  fontWeight="600"
                >
                  {bankDetails?.bank_name ?? "-"}
                </Text>
              </Flex>
              <Flex w="full" justify="space-between">
                <Text color="text" fontSize={14}>{`Account number`}</Text>
                <Flex align="center" gap={2}>
                  <Text
                    color="text"
                    fontFamily="Open Sans"
                    fontSize={16}
                    fontWeight="600"
                  >
                    {bankDetails?.account_number ?? "_"}
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
              <Flex w="full" justify="space-between">
                <Text color="text" fontSize={14}>{`Account Name`}</Text>
                <Text
                  textAlign="right"
                  maxW="125px"
                  lineHeight="15.5px"
                  fontFamily="Open Sans"
                  color="text"
                  fontSize={15}
                  fontWeight="600"
                >
                  {bankDetails?.account_name ?? "_"}
                </Text>
              </Flex>
            </Stack>
            {/* <Stack
              justify="space-between"
              flex={1}
              h="full"
              w="full"
              py="2rem"
              px={12}
            >
              <Stack>
                <Text color="text" fontSize={16}>{`Amount to deposit`}</Text>
                <HStack position="relative" w="full" h="fit-content">
                  <Text
                    w="60px"
                    pl="14px"
                    fontSize="16px"
                    pb="5px"
                    position="absolute"
                    fontWeight="400"
                    color="text"
                    zIndex={20}
                  >
                    NGN
                  </Text>
                  <FormInput
                    color="text"
                    onChange={handleInput}
                    value={
                      amount ? formatToCurrency(amount).replace("₦", "") : ""
                    }
                    error={amountError}
                    w="100%"
                    h="45px"
                    boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                    pl="60px"
                    fontSize={16}
                    group={{
                      justifyContent: "center",
                    }}
                  />
                </HStack>
              </Stack>
              <Stack w="full" justify="space-between" gap="12px">
                <Button
                  isDisabled={!amount || Number(amount) <= 0}
                  onClick={() => setStep("card")}
                  w="full"
                  color="white"
                  mt="10px !important"
                  h={{ base: "48px", md: "64px" }}
                  fontWeight={400}
                  bg="primary"
                  letterSpacing="0.18px"
                  textTransform="uppercase"
                  fontSize={{ base: "14px", lg: "16px" }}
                >
                  Proceed with card
                </Button>
              </Stack>
            </Stack> */}
          </Stack>
        )}
        {step === "card" && (
          <Card step={step} savedCards={savedCards} amount={amount} />
        )}
      </Stack>
    </Stack>
  );
};

export default DepositWallet;

export const HandleDepositWallet = ({ setPage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleScreen = () => {
    if (isMobile) {
      return onOpen();
    }
    return setPage("deposit");
  };
  return (
    <>
      <Button
        w={"142px"}
        h={"50px"}
        color="white"
        bg="primary"
        fontSize="16px"
        fontWeight={{ base: 500, lg: 400 }}
        onClick={handleScreen}
        border="1px solid white !important"
        rounded={0}
        p="15px 30px"
        leftIcon={
          <Image
            alt="next_image"
            boxSize={{ base: "16px", xl: "22px" }}
            src={depositCIcon.src}
          />
        }
        _hover={{
          bg: "",
        }}
        _active={{
          opacity: 1
        }}
      >
        <Text fontSize={"16px"}>Deposit</Text>
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent bottom={"0"} w="full" roundedTop="16px">
          <DepositWallet onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Card = ({ step, savedCards, setPage, amount }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const toast = useToast();
  const handleAddNewCard = () => {
    const body = {
      amount: Number(amount),
      channel: "card",
      store: storeName,
    };
    MAKE_DEPOSITS_MUTATION.mutate(body);
  };
  const MAKE_DEPOSITS_MUTATION = useMutation(
    (formData) => makeeDepositToWallet(formData),
    {
      onSuccess: (res) => {
        const link = res?.data?.data?.data?.link;
        if (link) openExternalUrl(link, "_blank");
      },
      onError: (err) => {
        toast({
          title: "Oops...",
          description: `${
            err?.response?.data?.message ??
            err?.response?.message ??
            err?.response?.data[0] ??
            "Something went wrong"
          }`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );
  const { sessionData: businessId } = useGetSession("businessId");
  const handleMakeDeposits = () => {
    if (!businessId) return;

    if (!selectedCard?.authorization_code)
      return toast({
        description: "Please select a card",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

    const paymentDetailsObj = {
      auth_code: selectedCard?.authorization_code,
      amount: Number(amount.replaceAll(",", "")),
      payment_data: { payment_type: "wallet" },
      business_id: businessId,
    };

    payWithSavedCardMutation.mutate(paymentDetailsObj);
  };

  const payWithSavedCardMutation = useMutation(
    (formData) => makePaymentWithSavedCard(formData),
    {
      onSuccess: (res) => {
        toast({
          title: "Deposit successful👍🏻",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setPage("wallet");
      },
      onError: (err) => {
        toast({
          title: "Oops...",
          description: `${
            err?.response?.data?.message ??
            err?.response?.message ??
            err?.response?.data[0] ??
            "Something went wrong"
          }`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );
  return (
    <Stack gap="16px" w="full" pt={0}>
      <VStack spacing="10px">
        <Box>
          <VStack
            maxH="350px"
            overflowY="auto"
            spacing={{ base: "6px", md: "10px" }}
            align={"stretch"}
          >
            {savedCards?.data?.results?.length ? (
              savedCards?.data?.results?.map((card) => (
                <Flex
                  key={card?.id}
                  onClick={() => setSelectedCard(card)}
                  cursor="pointer"
                  gap="5px"
                  justify="space-between"
                  direction={"row"}
                  px={{ base: "10px", md: "14px" }}
                  py={{ base: "12px", md: "16px" }}
                  w="full"
                  p={{ base: "12px", md: "16px" }}
                  border={
                    selectedCard?.id === card.id ? "1px solid" : "1px solid"
                  }
                  borderColor={
                    selectedCard?.id === card.id
                      ? "text"
                      : "matador_border_color.300"
                  }
                  rounded="8px"
                  align="center"
                >
                  <HStack spacing={{ base: "10px", md: "14px" }}>
                    <Image
                      boxSize={{ base: "25px", md: "22px" }}
                      alt="next_image"
                      src={cardImg.src}
                    />
                    <VStack align={"stretch"} spacing={0}>
                      <Text
                        fontSize={{ base: "14px", md: "16px" }}
                        color="text"
                      >
                        {card?.bank}
                      </Text>
                      <Text
                        fontSize={"14px"}
                        fontWeight={{ base: "400", md: "500" }}
                        color="text"
                      >
                        **** ****{card?.last4}
                      </Text>
                    </VStack>
                  </HStack>

                  <Center
                    w="21px"
                    h="21px"
                    borderRadius={"full"}
                    border="1px solid"
                    borderColor={"matador_border_color.200"}
                  >
                    {selectedCard?.id === card.id && (
                      <CheckIcon color={"text"} fontSize={"10px"} />
                    )}
                  </Center>
                </Flex>
              ))
            ) : (
              <EmptyState
                icon={<Image alt="" w="auto" h="50px" src={cardImg.src} />}
                noHeader
                text={"No Card Added Yet"}
                height={"200px"}
                gap={0}
                fontWeight={600}
              />
            )}
          </VStack>
        </Box>
      </VStack>
      <Stack direction={{ base: "column", md: "row" }} align="start" gap="16px">
        <Button
          h={{ base: "48px", md: "64px" }}
          w="full"
          color="matador_text.500"
          fontWeight={400}
          bg={"transparent"}
          border="1px solid"
          borderColor={"matador_text.500"}
          onClick={handleAddNewCard}
          disabled={MAKE_DEPOSITS_MUTATION?.isLoading}
          isLoading={MAKE_DEPOSITS_MUTATION?.isLoading}
          letterSpacing="0.18px"
          textTransform="uppercase"
          fontSize={{ base: "14px", lg: "16px" }}
        >
          Add Card
        </Button>
        <Button
          w="full"
          color="white"
          bg="primary"
          h={{ base: "48px", md: "64px" }}
          fontWeight={400}
          onClick={handleMakeDeposits}
          letterSpacing="0.18px"
          textTransform="uppercase"
          isLoading={payWithSavedCardMutation.isLoading}
          isDisabled={!selectedCard || payWithSavedCardMutation.isLoading}
          fontSize={{ base: "14px", lg: "16px" }}
          _active={{
            opacity: 1
          }}
        >
          Proceed with card
        </Button>
      </Stack>
    </Stack>
  );
};
