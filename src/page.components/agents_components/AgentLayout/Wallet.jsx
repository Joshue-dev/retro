import React from "react";
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import walletIcon from "../../../images/icons/wallet.svg";
import withdrawIcon from "../../../images/icons/withdraw.svg";
import commissionIcon from "../../../images/icons/commission.svg";
import withdrawalIcon from "../../../images/icons/withdrawal.svg";
import WithdrawalModal from "../account/WithdrawalModal";
import { useQuery } from "react-query";
import { accountTransactions, fetchAccountInfo } from "../../../api/agents";
import { formatToCurrency } from "utils";
import backArrow from "/src/images/icons/backArrow.svg";
import useLocalStorage from "utils/hooks/useLocalStorage";

export default function Wallet({ children }) {
  const WALLET_DRAWER = useDisclosure();
  const WITHDRAWAL_DRAWER = useDisclosure();

  const { data, isLoading, isError } = useQuery("account-transactions", () =>
    accountTransactions()
  );
  const { data: accountInfo } = useQuery("account-info", () =>
    fetchAccountInfo()
  );
  const openWithdraw = () => {
    WITHDRAWAL_DRAWER.onOpen();
  };

  const transactions = data?.data?.data.filter(
    (nullTrans) =>
      nullTrans?.transaction_type === "commission" &&
      nullTrans?.connected_request !== null
  );

  return (
    <>
      <Box>
        {children ? (
          <Flex as="span" onClick={WALLET_DRAWER.onOpen}>
            {children}
          </Flex>
        ) : (
          <Center
            position="relative"
            h={{ base: "24px", md: "35px" }}
            w={{ base: "24px", md: "35px" }}
            minH={{ base: "24px", md: "35px" }}
            minW={{ base: "24px", md: "35px" }}
          >
            <Image
              src={walletIcon.src}
              alt="wallet icon"
              cursor="pointer"
              onClick={WALLET_DRAWER.onOpen}
              objectFit={`cover`}
              minH={`100%`}
              minW={`100%`}
            />
          </Center>
        )}
        <Drawer
          isOpen={WALLET_DRAWER.isOpen}
          onClose={WALLET_DRAWER.onClose}
          closeOnSelect={false}
          size="sm"
        >
          <DrawerOverlay bg="rgba(0,0,0,0.1)" />
          <DrawerContent
            position="relative"
            zIndex={100}
            mt={{ base: "0px", lg: "75px" }} // minW={{base: 'full', md: '500px'}}
            bg="#fff"
            p="0px"
          >
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
                {/* <Image
                  src={backArrow.src}
                  alt="back button"
                  onClick={WALLET_DRAWER.onClose}
                  cursor="pointer"
                /> */}
                Wallet
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

            <VStack
              border={"0.5px solid #D1D1D6"}
              w="full"
              mt="-5"
              py="7"
              bg="#fff"
            >
              <Text color={"#606060"} fontSize="12px">
                Wallet Balance
              </Text>
              <Text color={"#606060"} fontSize={"32px"} fontWeight={600} mb="2">
                {formatToCurrency(accountInfo?.data?.naira_balance)}
              </Text>
              <Button
                onClick={openWithdraw}
                rightIcon={<Image src={withdrawIcon.src} alt="wallet icon" />}
                borderRadius={"full"}
                bg="#191919"
                width={"70%"}
                color="#fff"
                py="6"
                height={"40px"}
                _hover={{ bg: "#191919" }}
              >
                Withdraw
              </Button>
            </VStack>
            <Box bg="#f5f5f5" p="5">
              <Text>Transaction History</Text>
            </Box>
            <VStack overflow={"auto"} pt="2">
              {transactions?.map((trans) => (
                <Flex
                  key={trans?.id}
                  width={"85%"}
                  height={"76px"}
                  borderBottom={"0.5px solid #D1D1D6"}
                  pt="5"
                  pb="10"
                  alignItems={"center"}
                >
                  <Image
                    src={
                      trans?.transaction_type === "commission"
                        ? commissionIcon.src
                        : withdrawalIcon.src
                    }
                    height="6"
                    alt="commission icon"
                  />
                  <Flex justifyContent={"space-between"} w="full">
                    <Box ml="3">
                      <Text color={"#000"} fontSize="16px">
                        {trans?.transaction_type === "commission"
                          ? "Commission received"
                          : "Withdrawal"}
                      </Text>
                      <Text color={"#606060"}>
                        {trans?.transaction_type === "commission"
                          ? trans?.connected_request?.unit?.unit_title
                          : `To ${trans?.bank_name}`}
                      </Text>
                    </Box>
                    <Box mt="2" fontSize={"16px"} fontWeight="bold">
                      <Text>{formatToCurrency(trans?.amount)}</Text>
                    </Box>
                  </Flex>
                </Flex>
              ))}
            </VStack>
          </DrawerContent>
        </Drawer>
      </Box>
      <WithdrawalModal
        drawerDisclosure={WITHDRAWAL_DRAWER}
        walletDrawer={WALLET_DRAWER}
      />
    </>
  );
}
