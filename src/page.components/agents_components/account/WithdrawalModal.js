import { useState } from "react";
import withdrawIcon from "/src/images/icons/withdrawIcon.svg";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CustomSelect } from "../Select";
import { fetchWithdrawAccounts, withDrawForAgent } from "/src/api/agents";
import { STORENAMEFROMDOMAIN } from "/src/constants/routes";
import infoIcon from "/src/images/icons/info.svg";
import nairaIcon from "/src/images/icons/nairaIcon.svg";
import successTick from "/src/images/successTick.png";
import checkIcon from "/src/images/animated_icons/check-icon-unscreen.gif";
import backArrow from "/src/images/icons/backArrow.svg";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { store_name } from "constants/routes";

export const WithdrawalModal = ({ drawerDisclosure, walletDrawer }) => {
  const [idError, setIdNumError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const queryClient = useQueryClient();
  const storeName = store_name();

  const isANumber = (input) => {
    const numericPattern = /^\d+$/;
    if (!input.trim()) {
      setIdNumError("Field can't be empty");
    } else if (!numericPattern.test(input)) {
      setIdNumError("hmm,invalid format");
    } else if (~~input < 50) {
      setIdNumError("Withdrawal amount must be at least ₦100.");
    } else {
      setIdNumError("");
    }
  };

  const bankDisclosure = useDisclosure();


  const [withDrawInfo, setWithDrawInfo] = useState({});

  const { data, isError, isLoading, error, refetch } = useQuery(
    ["withdrawaccounts"],
    () => fetchWithdrawAccounts()
  );

  const toast = useToast();

  const { mutate, isLoading: withdrawIsLoading } = useMutation(
    (formData) => withDrawForAgent(formData),
    {
      onSuccess: () => {
        setWithDrawInfo({});
        setSuccess(true);
        toast({
          title: "changes updated successfully",
          status: "success",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });

        queryClient.invalidateQueries("account-agent-overview");
        queryClient.invalidateQueries("dashboard-graph-overview");
        queryClient.invalidateQueries("agent-commission");
        queryClient.invalidateQueries("agent-incoming-payment");
        queryClient.invalidateQueries("dashboard-graph-overview");
      },
      onError: (res) => {
        return toast({
          title:
            res?.message === "Network Error"
              ? "Network Error"
              : "Oops something went wrong",
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            "Something went wrong"
          }`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  const RECIPIENTS = data?.data?.data;

  const handleSelectChange = (e) => {
    const selectedBankCode = e.target.value;
    const selectedRecipient = RECIPIENTS.find(
      (recipient) => recipient.bank_code === selectedBankCode
    );
    setSelectedRecipient(selectedRecipient);
  };

  const withdraw = () => {
    return mutate({
      account_number: Number(selectedRecipient?.account_number),
      bank_code: selectedRecipient?.bank_code,
      store_name: storeName,
      amount: Number(withDrawInfo?.amount),
    });
  };

  const handleChange = (e) => {
    return setWithDrawInfo({
      ...withDrawInfo,
      [e.target.name]: e.target.value,
    });
  };
  const isValid =
    !idError && withDrawInfo.amount && withDrawInfo.desc && selectedRecipient;

  const handleBack = () => {
    drawerDisclosure.onClose();
  };

  return (
    <>
      <Drawer
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onClose}
        closeOnSelect={false}
        size="sm"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          position="relative"
          zIndex={100}
          mt={{ lg: "70px" }}
          // minW={{base: 'full', md: '500px'}}
          bg="#fff"
          p="0px"
        >
          {!success ? (
            <>
              <HStack
                mb="20px"
                pb="12px"
                pt="14px"
                h="49.699px"
                bg="#F5F5F5"
                px="25px"
                justify="space-between"
                align="center"
                position="relative"
              >
                <Heading
                  fontFamily="Euclid Circular B"
                  fontSize="18.9px"
                  fontWeight="700"
                  display={"flex"}
                  gap="5"
                >
                  <Image
                    src={backArrow.src}
                    alt="back button"
                    onClick={handleBack}
                    cursor="pointer"
                  />
                  Withdrawal
                </Heading>
                <HStack spacing="15px">
                  <VStack
                    position="relative"
                    justify="center"
                    align="center"
                    w="30px"
                    h="30px"
                    borderRadius="5px"
                    transition="0.3s ease-in-out"
                    _hover={{
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    <DrawerCloseButton
                      right="0px"
                      left="0px"
                      my="auto"
                      color="#000"
                      top="0"
                      bottom="0"
                      border={"none"}
                      boxShadow="none"
                      _focus={{ boxShadow: "none", border: " none" }}
                    />
                  </VStack>
                </HStack>
              </HStack>
              <DrawerBody>
                <Stack spacing="none">
                  <Stack spacing="1.5">
                    <label>Amount</label>
                    <HStack px="0" spacing="none" position="relative">
                      <Image
                        src={nairaIcon.src}
                        position="absolute"
                        left="10px"
                        alt="naira icon"
                      />
                      <Input
                        focusBorderColor="#4545FE"
                        name="amount"
                        type="number"
                        paddingLeft="2.5rem"
                        paddingRight="1rem"
                        border="1px solid #E4E4E4"
                        borderRadius="5px"
                        placeholder="Amount"
                        onBlur={(e) => isANumber(e.target.value)}
                        onChange={handleChange}
                        value={withDrawInfo.amount}
                      />
                    </HStack>
                    <Text
                      fontSize="10px"
                      textAlign="start"
                      mt="10px"
                      color="red"
                    >
                      {idError}
                    </Text>
                  </Stack>
                  <Stack>
                    <label>Description</label>
                    <Input
                      px="1rem"
                      focusBorderColor="#4545FE"
                      borderRadius="5px"
                      border="1px solid #E4E4E4"
                      name="desc"
                      placeholder="Description"
                      onChange={handleChange}
                      value={withDrawInfo.desc}
                    />
                  </Stack>
                  <Stack marginTop="8">
                    <CustomSelect
                      placeholder="Recipient"
                      value={selectedRecipient?.bank_code || ""}
                      onChange={handleSelectChange}
                    >
                      {RECIPIENTS?.map((recipient) => (
                        <option
                          key={recipient.bank_code}
                          value={recipient.bank_code}
                        >
                          {recipient.bank_name} - {recipient.account_number}
                        </option>
                      ))}
                    </CustomSelect>
                  </Stack>
                </Stack>
                <Stack marginTop="1rem">
                  <HStack alignItems="flex-start">
                    <img src={infoIcon.src} />
                    <Text marginTop="-3px" fontSize="12px">
                      Standard processing fees will apply. While most
                      withdrawals reflect almost immediately, please note that
                      in certain cases, it may take longer for the withdrawal to
                      be processed.
                    </Text>
                  </HStack>
                </Stack>
              </DrawerBody>
              <DrawerFooter>
                <HStack w="full" px="0" align="center" justify="end">
                  {/* <Button
                    fontSize="18px"
                    fontWeight="400"
                    h="55px"
                    borderRadius="12px"
                    onClick={drawerDisclosure.onClose}
                    bg="transparent"
                    border="solid 1px #FF3636"
                    color="#FF3636"
                    w="217px"
                  >
                    Discard
                  </Button> */}
                  <Button
                    onClick={withdraw}
                    bg="#0D0D0D"
                    fontSize="18px"
                    fontWeight="400"
                    h="55px"
                    borderRadius="12px"
                    color="#ffffff"
                    // w="217px"
                    w={"100%"}
                    position="relative"
                    isDisabled={!isValid}
                    _hover={{
                      background: "#0D0D0D",
                    }}
                  >
                    {withdrawIsLoading ? <Spinner color="white" /> : "Proceed"}
                  </Button>
                </HStack>
              </DrawerFooter>
            </>
          ) : (
            <>
              <HStack
                mb="20px"
                py="12px"
                h="49.699px"
                bg="#F5F5F5"
                px="25px"
                justify="space-between"
                align="center"
                position="relative"
              >
                <Heading
                  fontFamily="Euclid Circular B"
                  fontSize="18.9px"
                  fontWeight="700"
                >
                  Withdrawal
                </Heading>
                <HStack spacing="15px">
                  <VStack
                    position="relative"
                    justify="center"
                    align="center"
                    w="30px"
                    h="30px"
                    borderRadius="5px"
                    transition="0.3s ease-in-out"
                    _hover={{
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    <DrawerCloseButton
                      right="0px"
                      left="0px"
                      my="auto"
                      color="#000"
                      top="0"
                      bottom="0"
                    />
                  </VStack>
                </HStack>
              </HStack>
              <DrawerBody>
                <VStack marginTop="4rem">
                  <Image src={checkIcon?.src} alt={"success"} />
                  <Text fontSize="18px" fontWeight="500">
                    Withdrawal Successful
                  </Text>
                  <Stack marginTop="1rem" w="100%">
                    <Button
                      onClick={() => onClose()}
                      bg="#0D0D0D"
                      fontSize="18px"
                      fontWeight="400"
                      h="55px"
                      borderRadius="12px"
                      color="#ffffff"
                      w="100%"
                      position="relative"
                      _hover={{
                        background: "#0D0D0D",
                      }}
                    >
                      Ok
                    </Button>
                  </Stack>
                </VStack>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default WithdrawalModal;
