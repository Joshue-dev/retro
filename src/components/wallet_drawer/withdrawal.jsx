import { useEffect, useRef, useState } from "react";
import {
  Flex,
  HStack,
  Text,
  Select,
  useToast,
  FormControl,
  Stack,
  Heading,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Box,
  useTheme,
} from "@chakra-ui/react";
import { themeStyles } from "../../theme";
import { Button, FormInput } from "../../ui-lib/ui-lib.components";
import { useFormik } from "formik";
import { storeName } from "../../constants/routes";
import { useMutation, useQuery } from "react-query";
import { fetchSupportedBanks, walletWithdrawal } from "../../api/Wallet";
import * as Yup from "yup";
import { CloseIcon } from "@chakra-ui/icons";
import { formatToCurrency } from "../../utils";
import { scrollBarStyles } from "../common/ScrollBarStyles";
import cardShieldIcon from "../../images/icons/cardSheildIconForWallet.svg";
import withdrawIcon from "../../images/icons/withdraw-wallet-button.svg";
import isMobile from "../../utils/extras";
import { WithdrawalIconSVG } from "../assets/svgs";
import dropdownIcon from "../../images/icons/dropdown_wallet.svg";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";

const formSchema = Yup.object().shape({
  account_number: Yup.string()
    .min(10, "Account number should be 10 digits")
    .max(10, "Account number should be 10 digits")
    .required("Please enter your account number"),
  amount: Yup.string().required("Please enter an amount"),
  bank_code: Yup.string().required("Please select a bank"),
});

export const WithdrawalWallet = ({ setPage, onWalClose, onClose }) => {
  const toast = useToastForRequest();
  const [bankName, setBank] = useState("");
  const inputRef = useRef()
  const LIST_ALL_BANKS = useQuery(["fetchSupportedBanks"], fetchSupportedBanks);

  const SUPPORTED_OFFICIAL_BANKS = LIST_ALL_BANKS?.data?.data?.message?.length
    ? LIST_ALL_BANKS?.data?.data?.message
    : [];

  const mutation = useMutation((formData) => walletWithdrawal(formData), {
    onSuccess: (res) => {
      onWalClose();
      toast({
        description: `Withdrawal successful`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (err) => {
      toast({
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
  });

  const formik = useFormik({
    initialValues: {
      store_name: storeName,
      account_number: "",
      amount: "",
      description: "",
      bank_code: "",
    },
    validationSchema: formSchema,
    // validateOnChange: false,
    onSubmit: (values) => {
      let withdrawalPayload = {
        ...values,
        account_number: `${values.account_number}`,
        amount: Number(values.amount.replace(",", "")),
      };
      mutation.mutate(withdrawalPayload);
    },
    validateOnMount: true,
    validateOnChange: true,
  });

  const handleSelectBank = (e) => {
    const bank_ = SUPPORTED_OFFICIAL_BANKS?.find(
      (bank) => bank?.code === e.target.value
    );
    if (bank_) {
      setBank(bank_?.name);
      formik.setFieldValue("bank_code", bank_?.code);
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [inputRef]);

  const handleInput = (e) => {
    e.preventDefault()
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

    formik.setFieldValue('amount', val);
  };

  const theme = useTheme();
  const isDarkMode = theme.theme_name !== "light";
  return (
    <Stack
      roundedTop={{ base: "16px", lg: 0 }}
      bg="card_bg"
      p={{ base: "15px", lg: "20px" }}
      css={scrollBarStyles}
      autoFocus={false}
      w='full'
    >
      <Stack w="full" spacing="8px" pb="8px">
        <HStack w="full" justify="space-between">
          <Flex
            justify="center"
            align="center"
            h="48px"
            w="48px"
            border="0.4px solid"
            borderColor={
              theme.theme_name !== "light"
                ? "matador_border_color.200"
                : "matador_border_color.300"
            }
            borderRadius="10px"
            boxShadow="0px 0.996px 1.992px 0px rgba(16, 24, 40, 0.05)"
            bg="card_bg"
          >
            <Image
              src={cardShieldIcon.src}
              alt="card shield icon"
              boxSize="24px"
              filter={isDarkMode ? "invert(1)" : ""}
            />
          </Flex>
          <CloseIcon
            fontSize={"13px"}
            cursor="pointer"
            color="text"
            onClick={isMobile ? onClose : onWalClose}
            mr={2}
          />
        </HStack>
        <Stack>
          <Heading
            fontFamily="Open Sans"
            textAlign="start"
            fontSize="18px"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="1.2px"
            color="text"
          >
            Make a withdrawal
          </Heading>
          <Text
            textAlign="start"
            fontSize="14px"
            fontWeight="400"
            color="matador_text.500"
          >
            Withdraw money from your wallet
          </Text>
        </Stack>
      </Stack>
      <Flex gap="8px" direction="column" align={"start"} mb="28px" w='full'>
          <Box w='full'>
            
            <Stack align="start">
              <Text color="text" fontSize={14}>{`Amount to withdraw`}</Text>
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
                  bg={isDarkMode ? "background" : "white"}
                  onChange={handleInput}
                  value={formik.values.amount}
                  error={formik.touched.amount && formik.errors.amount}
                  w="100%"
                  h="45px"
                  boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  pl="60px"
                  fontSize={16}
                  group={{
                    justifyContent: "center",
                  }}
                  rounded={{ base: "7px", md: "0" }}
                  autoFocus={false}
                  placeholder='0.00'
                  ref={inputRef}
                />
              </HStack>
            </Stack>
            <Text
              mt={"10px"}
              color="text"
              fontSize={12}
              fontWeight={500}
            >{`Account Number`}</Text>
            <FormInput
              color="text"
              bg={isDarkMode ? "background" : "white"}
              error={
                formik.touched.account_number && formik.errors.account_number
              }
              onChange={formik.handleChange("account_number")}
              value={formik.values.account_number}
              h="45px"
              placeholder="Enter Account Number"
              _placeholder={{
                color: "text",
              }}
              rounded={{ base: "7px", md: "0" }}
              paddingInline={7}
            />
            <Text
              color="text"
              mt={"15px"}
              fontSize={12}
              fontWeight={500}
            >{`Select Bank`}</Text>
            <Select
              border="1px solid"
              borderColor={
                formik.touched.bank_code && formik.errors.bank_code
                  ? `${themeStyles.color.matador__red} !important`
                  : isDarkMode
                  ? "matador_border_color.200 !important"
                  : `matador_border_color.100 !important`
              }
              placeholder={bankName || "Select bank name"}
              color="text"
              bg={isDarkMode ? "background" : "white"}
              value={bankName}
              rounded={{ base: "7px", md: "0" }}
              onChange={handleSelectBank}
              h="45px"
              fontSize={16}
              _placeholder={{
                letterSpacing: "0.52px",
                fontWeight: 500,
                fontFamily: 'Noto Sans',
                color: 'text'
              }}
              sx={{
                '> option': {
                  background: 'background'
                },
                paddingInline: 6
              }}
              icon={<Image src={dropdownIcon.src} boxSize={'40px'} alt=""/>}
              iconSize="40"
            >
              {SUPPORTED_OFFICIAL_BANKS?.length ? (
                SUPPORTED_OFFICIAL_BANKS.map((bank, index) => (
                  <option key={index} value={bank?.code}>
                    {bank?.name}
                  </option>
                ))
              ) : (
                <option value={""}>Fetching supported banks...</option>
              )}
            </Select>
            <Text
              color={themeStyles.color.matador__red}
              my={"5px"}
              fontSize={"11px"}
            >
              {formik.touched.bank_code && formik.errors.bank_code}
            </Text>
          </Box>
          <Text
            mt={"8px"}
            textAlign={"center"}
            color="text"
            fontSize={14}
            fontWeight={500}
          >{`Description`}</Text>
          <FormInput
            color="text"
            bg={isDarkMode ? "background" : "card_bg"}
            type="text"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
            h="45px"
            placeholder="Optional"
            _placeholder={{
              color: "text",
            }}
            rounded={{ base: "7px", md: "0" }}
          />
        </Flex>
        <HStack gap="16px">
          <Button
            onClick={() => setPage("wallet")}
            w="full"
            mt={{ base: "5px", md: "2px" }}
            h={{ base: "42px", md: "64px" }}
            fontSize={{ base: 14, md: 16 }}
            fontWeight={400}
            bg={isDarkMode ? "background" : "white"}
            border="1px solid"
            borderColor={theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.100"}
            color="matador_text.500"
            letterSpacing="0.18px"
            textTransform="uppercase"
          >
            back
          </Button>
          <Button
            w="full"
            color="white"
            mt={{ base: "5px", md: "2px" }}
            h={{ base: "42px", md: "64px" }}
            fontSize={{ base: 14, md: 16 }}
            fontWeight={400}
            bg="primary"
            letterSpacing="0.18px"
            textTransform="uppercase"
            onClick={formik.handleSubmit}
            isDisabled={!formik.isValid}
            _active={{
              opacity: 1
            }}
          >
            Proceed
          </Button>
        </HStack>
    </Stack>
  );
};

export default WithdrawalWallet;

export const HandleWithdrawalWallet = ({ setPage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleScreen = () => {
    if (isMobile) {
      return onOpen();
    }
    return setPage("withdrawal");
  };
  return (
    <>
      <Button
        w={"142px"}
        h={"50px"}
        color="primary"
        bg="white"
        fontSize="16px"
        fontWeight={{ base: 500, lg: 400 }}
        onClick={handleScreen}
        border="1px solid"
        borderColor="primary"
        align="center"
        leftIcon={
          <WithdrawalIconSVG
            boxSize={{ base: "16px", xl: "22px" }}
            src={withdrawIcon.src}
          />
        }
        rounded={0}
        _hover={{
          bg: "",
        }}
      >
        <Text fontSize={"16px"}>Withdraw</Text>
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent bottom={"0"} w="full" roundedTop="16px">
          <WithdrawalWallet onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};
