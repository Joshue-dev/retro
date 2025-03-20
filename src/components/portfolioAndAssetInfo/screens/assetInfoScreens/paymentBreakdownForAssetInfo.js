import { fetchAllPurchaseHistory, fetchUpcomingPayments } from "@/api/payment";
import EmptyState from "@/components/appState/empty-state";
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Center, Divider, Flex, HStack, ModalFooter, Stack, Text, useTheme, VStack } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CustomizableButton, Spinner } from "ui-lib";
import { formatToCurrency } from "utils";
import { useLightenHex } from "utils/lightenColorShade";

const PaymentBreakdownForAssetInfo = ({
  info,
  customScrollbarStyles,
  handleScreen,
  onClose,
}) => {
  const [isPreviousPayment, setIsPreviousPayment] = useState(true);
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);

  const TRANSACTIONS_HISTORY = useQuery(
    ["fetchAllPurchaseHistory", info?.id],
    () => fetchAllPurchaseHistory(info?.id)
  );

    const upcomingPayments = useQuery(
      ["fetchUpcomingPayments", info?.id],
      () => fetchUpcomingPayments(info?.id)
    );

  return (
    <Stack flex={1} h="full">
      <Box
        px={"21px"}
        py={{ base: "21px", md: "32px" }}
        mb="18px"
        top="0"
        right={0}
        w="full"
        zIndex={200}
        borderTopRadius={{ base: "16px", md: "unset" }}
        borderBottom="1px solid"
        borderBottomColor={
          theme.theme_name !== "light"
            ? "matador_border_color.200"
            : "matador_border_color.300"
        }
      >
        <Flex w="full" h="20px" justify={"space-between"} align={"center"}>
          <HStack align={"center"}>
            <ChevronLeftIcon
              cursor={"pointer"}
              onClick={handleScreen("asset info")}
              fontSize={"35px"}
              color={"text"}
            />
            <Text
              color="text"
              fontSize={{ base: "18px", md: "20px" }}
              fontWeight={600}
              textTransform={"uppercase"}
              fontFamily="Open Sans"
              letterSpacing="1.44px"
            >
              {info?.unit?.unit_title}
            </Text>
          </HStack>
          <CloseIcon
            cursor={"pointer"}
            fontSize={"14px"}
            color="text"
            onClick={onClose}
          />
        </Flex>
      </Box>

      <Stack justify="space-between" flex={1} w="full" h={"full"} px="20px">
        <Box pb="38px" h={"fit-content"}>
          <Flex
            bg={
              theme.theme_name !== "light"
                ? "matador_background.100"
                : lightenHex(90)
            }
            align={"center"}
            p="8px"
            gap="8px"
            border="1px solid"
            borderColor={
              theme.theme_name !== "light"
                ? "matador_border_color.200"
                : lightenHex(50)
            }
            mb='6px'
          >
            <Center
              h="48px"
              w="full"
              color={
                isPreviousPayment
                  ? "white"
                  : theme.theme_name !== "light"
                  ? "#A6A6A6"
                  : "text"
              }
              bg={isPreviousPayment ? "primary" : "transparent"}
              onClick={() => setIsPreviousPayment(true)}
              cursor={"pointer"}
              fontWeight={600}
              fontSize={"13.5px"}
            >
              PAST PAYMENTS
            </Center>
            <Center
              h="48px"
              w="full"
              color={
                !isPreviousPayment
                  ? "white"
                  : theme.theme_name !== "light"
                  ? "#A6A6A6"
                  : "text"
              }
              bg={!isPreviousPayment ? "primary" : "transparent"}
              onClick={() => setIsPreviousPayment(false)}
              cursor={"pointer"}
              fontWeight={600}
              fontSize={"13.5px"}
            >
              FUTURE PAYMENTS
            </Center>
          </Flex>

          <Box maxH="70rem" overflowY={"auto"} __css={customScrollbarStyles}>
            {isPreviousPayment ? (
              TRANSACTIONS_HISTORY?.isLoading ? (
                <Center w="full" h="full">
                  <Spinner size="50px" noAbsolute />
                </Center>
              ) : TRANSACTIONS_HISTORY.data?.data?.length > 0 ? (
                <VStack
                  align="stretch"
                  mt="13px"
                  gap="6px"
                  fontWeight={500}
                  p={{
                    base: "10.592px 28.245px 10.592px 21.184px",
                    md: "11.596px 30.921px 11.596px 23.191px",
                  }}
                  border="1.2px solid"
                  borderColor={
                    theme.theme_name !== "light"
                      ? "matador_border_color.200"
                      : "matador_border_color.100"
                  }
                  divider={<Divider />}
                  bg={
                    theme.theme_name !== "light"
                      ? "matador_background.100"
                      : "card_bg"
                  }
                  maxH="35rem"
                  overflowY="auto"
                  sx={customScrollbarStyles}
                >
                  {TRANSACTIONS_HISTORY.data?.data?.map((item, index) => (
                    <Flex justify="space-between" align="center" key={index}>
                      <Text
                        color={
                          theme.theme_name !== "light" ? "#A6A6A6" : "#424242"
                        }
                        fontWeight={400}
                        fontSize={{ base: "12px", md: "14px" }}
                      >
                        {item?.created_at
                          ? moment(item?.created_at).format("MMM D, YYYY")
                          : "-"}
                      </Text>
                      <Text
                        color="text"
                        fontSize={{ base: "14px", md: "16px" }}
                        fontWeight={600}
                      >
                        {item?.amount ? formatToCurrency(item?.amount) : "-"}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              ) : (
                <EmptyState h='250px' icon text='No previous payments yet' />
              )
            ) : upcomingPayments?.isLoading ? (
              <Center w="full" h="full">
                <Spinner size="50px" noAbsolute />
              </Center>
            ) : upcomingPayments.data?.data?.data?.length > 0 ? (
              <VStack
                align="stretch"
                mt="13px"
                gap="6px"
                fontWeight={500}
                p={{
                  base: "10.592px 28.245px 10.592px 21.184px",
                  md: "11.596px 30.921px 11.596px 23.191px",
                }}
                border="1.2px solid"
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.100"
                }
                divider={<Divider />}
                bg={
                  theme.theme_name !== "light"
                    ? "matador_background.100"
                    : "card_bg"
                }
                maxH="35rem"
                overflowY="auto"
                sx={customScrollbarStyles}
              >
                {upcomingPayments.data?.data?.data?.map((item, index) => (
                  <Flex justify="space-between" align="center" key={index}>
                    <Text
                      color={
                        theme.theme_name !== "light" ? "#A6A6A6" : "#424242"
                      }
                      fontWeight={400}
                      fontSize={{ base: "12px", md: "14px" }}
                    >
                      {item?.due_date
                        ? moment(item?.due_date).format("MMM D, YYYY")
                        : "Closing cost"}
                    </Text>
                    <Text
                      color="text"
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight={600}
                    >
                      {item?.amount ? formatToCurrency(item?.amount) : "-"}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            ) : (
              <EmptyState height='200px' icon text='No upcoming payments yet' />
            )}
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PaymentBreakdownForAssetInfo;
