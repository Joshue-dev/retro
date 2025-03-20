import React, { useState } from "react";
import {
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Box,
  Center,
  Stack,
  Icon,
  useTheme,
} from "@chakra-ui/react";
import withdrawalIcon from "../../images/withdrawal-transaction.svg";
import withdrawalIconLight from "../../images/withdrawal-transaction-light.svg";
import { Spinner } from "../../ui-lib/ui-lib.components";
import { useQuery, useQueryClient } from "react-query";
import {
  fetchStoreWalletTxns,
  fetchWalletCurrentBalance,
} from "../../api/Wallet";
import { formatDateToString } from "../../utils/formatDate";
import { formatToCurrency } from "../../utils";
import { appCurrentTheme } from "../../utils/localStorage";
import { LIGHT } from "../../constants/names";
import { CloseIcon } from "@chakra-ui/icons";
import EmptyState from "../appState/empty-state";
import { scrollBarStyles } from "../common/ScrollBarStyles";
import ErrorState from "../appState/error-state";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { BiMenu } from "react-icons/bi";
import { HandleWithdrawalWallet } from "./withdrawal";
import { HandleDepositWallet } from "./deposit";
import { useLightenHex } from "utils/lightenColorShade";
import MobileHeader from "../navbar/mobile_header";
import MobileWalletHeader from "./mobile_w_header";

export const WalletContent = ({ setPage, onWalClose, onDrawerOpen }) => {
  const WALLET__ACCOUNT_BALANCE = useQuery(
    ["fetchWalletCurrentBalance"],
    fetchWalletCurrentBalance
  );
  const { lightenHex } = useLightenHex();
  const Account_balance =
    WALLET__ACCOUNT_BALANCE?.data?.data?.data?.naira_balance;
  const WALLET__TXNS = useQuery(["fetchStoreWalletTxns"], fetchStoreWalletTxns);
  const [showPrice, setShowPrice] = useState(false);
  const theme = useTheme();

  let TIME_OF_DAY = "";

  let time = new Date().getHours();

  if (time >= 5 && time < 12) {
    TIME_OF_DAY = "morning";
  } else if (time >= 12 && time < 17) {
    TIME_OF_DAY = "afternoon";
  } else if (time >= 17 || time < 5) {
    TIME_OF_DAY = "evening";
  }

  return (
    <Box
      p={0}
      bg="card_bg"
      minH={"fit-content"}
      // overflowY={'auto'}
    >
      <MobileWalletHeader activePage='Wallet' onDrawerClose={onWalClose} onDrawerOpen={onDrawerOpen} />
      <Center
        flexDirection="column"
        bg="primary"
        w="full"
        h="300px"
        px="25px"
        pt="15px"
        pb="32px"
        gap="20px"
        color="#FFF"
      >
        <CloseIcon
          fontWeight={"200"}
          fontSize={"12px"}
          cursor="pointer"
          display={{ base: "none", lg: "flex" }}
          onClick={onWalClose}
          alignSelf={"end"}
          color="#FFF"
        />
        <Flex
          align="center"
          w="full"
          justify={"space-between"}
          maxW="160px"
          bg={lightenHex(10)}
          p="16px"
          rounded="full"
        >
          <Text textAlign={"center"} fontSize={"14px"} letterSpacing="0.52px">
            Wallet Balance
          </Text>
          <Box
            cursor="pointer"
            onClick={() => setShowPrice(!showPrice)}
            fontSize={20}
          >
            {showPrice ? <RiEyeFill /> : <RiEyeOffFill />}
          </Box>
        </Flex>
        <HStack align="center" spacing={"10px"}>
          {showPrice ? (
            <Text fontSize={{ base: "40px", lg: "32px" }} noOfLines={1}>
              {Account_balance ? formatToCurrency(Account_balance) : "0.00"}
            </Text>
          ) : (
            <Text fontSize={{ base: "40px", lg: "32px" }} noOfLines={1}>
              ******
            </Text>
          )}
        </HStack>
        <HStack justify="center" align={"center"} w="full" gap="16px">
          <HandleDepositWallet setPage={setPage} />
          <HandleWithdrawalWallet setPage={setPage} />
        </HStack>
      </Center>
      <Stack
        pt={{ base: 0, lg: 1 }}
        bg="card_bg"
        w="full"
        alignSelf={"end"}
        justifySelf={"end"}
      >
        <Box>
          <Text
            fontSize={16}
            color="text"
            letterSpacing="1.2px"
            fontWeight={600}
            textTransform={"uppercase"}
            pl="20px"
            mt="10px"
            fontFamily={"Open Sans"}
          >
            Transaction History
          </Text>
          <VStack
            css={scrollBarStyles}
            spacing={0}
            align="stretch"
            mt="7.5px"
            minH="200px"
            maxH="200px"
            overflowY={"auto"}
          >
            {WALLET__TXNS?.isLoading ? (
              <Center h="200px" w="full">
                <Spinner noAbsolute />
              </Center>
            ) : WALLET__TXNS?.isError ? (
              <ErrorState />
            ) : (
              <>
                {WALLET__TXNS?.data?.data?.message?.length > 0 ? (
                  <>
                    {WALLET__TXNS?.data?.data?.message.map((item, idx) => {
                      let type = item.direction;
                      return (
                        <Flex
                          direction="row"
                          justify={"space-between"}
                          align="center"
                          key={item?.id}
                          py="12px"
                          px="20px"
                          borderTop={"0.8px solid"}
                          borderColor={
                            theme.theme_name !== "light"
                              ? "matador_border_color.200"
                              : "matador_border_color.300"
                          }
                        >
                          <HStack spacing="14px">
                            <Flex
                              justify="center"
                              align="center"
                              boxSize="34px"
                              borderRadius={"full"}
                              border="0.3px solid"
                              borderColor={
                                theme.theme_name !== "light"
                                  ? "matador_border_color.200"
                                  : "matador_border_color.300"
                              }
                            >
                              <Image
                                alt="next_image"
                                transform={
                                  type === "credit" ? "rotate(180deg)" : ""
                                }
                                src={
                                  theme.theme_name === "light"
                                    ? withdrawalIcon.src
                                    : withdrawalIconLight.src
                                }
                              />
                            </Flex>
                            <VStack
                              align="stretch"
                              spacing="0px"
                              direction={"column"}
                            >
                              <Text
                                color="text"
                                fontSize={"16px"}
                                fontWeight={600}
                              >
                                {type == "debit"
                                  ? "Withdrawal"
                                  : type == "credit"
                                  ? "Deposit"
                                  : null}
                              </Text>
                              <Text
                                fontSize={"12px"}
                                fontWeight={400}
                                color="text_two"
                                opacity={0.6}
                              >
                                {item?.successful_at &&
                                  formatDateToString(item?.successful_at)}
                              </Text>
                            </VStack>
                          </HStack>

                          <VStack
                            align="flex-end"
                            spacing="0px"
                            direction={"column"}
                          >
                            <Text
                              color="text"
                              fontSize={{ base: "12px", lg: "14px" }}
                              fontWeight={600}
                            >
                              {type == "debit"
                                ? "-"
                                : type == "credit"
                                ? "+"
                                : null}{" "}
                              {formatToCurrency(item?.amount) || "0"}
                            </Text>
                            <Text
                              color="text_two"
                              fontSize={{ base: "10px", lg: "11px" }}
                              fontWeight={400}
                              opacity={0.6}
                            >
                              {formatToCurrency(
                                item?.balance_before_transaction
                              ) || "0"}
                            </Text>
                          </VStack>
                        </Flex>
                      );
                    })}
                  </>
                ) : (
                  <EmptyState
                    icon
                    textSize={14}
                    headerStyle={{
                      fontSize: "16px",
                      letterSpacing: { base: "0.96px", md: "normal" },
                      textTransform: { base: "uppercase", md: "none" },
                    }}
                    height={{ base: "200px", md: "300px" }}
                    text={`No transactions yet`}
                    gap={0}
                  />
                )}
              </>
            )}
          </VStack>
        </Box>
      </Stack>
    </Box>
  );
};

export default WalletContent;