import React, { useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  VStack,
  Divider,
  useTheme,
  ModalFooter,
  Link,
  ModalBody,
} from "@chakra-ui/react";
import { Button } from "../../ui-lib";
import { formatToCurrency } from "../../utils";
import { useQuery } from "react-query";
import {
  fetchCustomPlanSummary,
  fetchInvestorPackets,
} from "../../api/payment";
import ThreeDots from "../loaders/ThreeDots";
import { getOrdinal } from "../../utils/getOrdinal";
import { CloseIcon } from "@chakra-ui/icons";
import MobileHeader from "../navbar/mobile_header";
import { useLightenHex } from "utils/lightenColorShade";
import moment from "moment";

const SummaryDrawer = ({
  asset,
  setType,
  customScrollbarStyles,
  setAmountToPay,
  drawer,
  type,
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  const customPlanBreakDown = useQuery(
    ["customPLansummary", asset?.payment_plan?.id],
    () => fetchCustomPlanSummary(asset?.payment_plan?.id),
    {
      enabled: !!asset?.payment_plan,
    }
  );

  const HOME__OWNERS__PACKETS = useQuery(
    ["fetchInvestorPackets", asset?.id],
    () => fetchInvestorPackets(asset?.id)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];

  useEffect(() => {
    if (
      asset?.type == "WHOLE" &&
      !asset?.payment_plan &&
      !asset?.co_owners?.length
    ) {
      setAmountToPay(Number(asset?.total_unit_price));
    }
    if (
      asset?.type == "WHOLE" &&
      asset?.payment_plan &&
      !asset?.co_owners?.length
    ) {
      setAmountToPay(asset?.payment_plan?.initial_deposit_in_value);
    }
  }, [asset]);

  return (
    <>
      <MobileHeader
        onDrawerClose={drawer?.onClose}
        activePage={asset?.unit?.unit_title}
        noIcons
      />
      <Box
        px={{ base: "14px", md: "21px" }}
        py={{ base: "18px", md: "32px" }}
        mb="10px"
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
        display={{ base: "none", md: "flex" }}
      >
        <Flex w="full" h="20px" justify={"space-between"} align={"center"}>
          <Text
            color="text"
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight={600}
            textTransform={"uppercase"}
            fontFamily="Open Sans"
            letterSpacing="1.44px"
            maxW="80rem"
          >
            {asset?.unit?.unit_title}
          </Text>
          <CloseIcon
            cursor={"pointer"}
            fontSize={"14px"}
            color="text"
            onClick={drawer?.onClose}
          />
        </Flex>
      </Box>
      <ModalBody
        direction={"column"}
        w="full"
        h="full"
        justify={"space-between"}
        px="24px"
        pb="18px"
        overflowY={"auto"}
        css={customScrollbarStyles}
      >
        <Flex
          color={"white"}
          fontSize={"16px"}
          fontWeight={600}
          justify={"space-between"}
          align={"center"}
          p={{ base: "26.154px 24.291px", md: "22.632px 15.876px" }}
          bg="primary"
        >
          <Text textTransform={"uppercase"}>PURCHASE PRICE</Text>
          <Text textAlign="end" maxW="80%">
            {asset?.payment_plan
              ? formatToCurrency(asset?.payment_plan?.purchase_price)
              : formatToCurrency(asset?.total_unit_price)}
          </Text>
        </Flex>
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
            theme.theme_name !== "light" ? "matador_background.100" : "card_bg"
          }
        >
          <Flex justify={"space-between"} align={"center"}>
            <Text
              color={'matador_text.500'}
              fontWeight={400}
              fontSize={{ base: "12px", md: "14px" }}
            >
              Offer Date
            </Text>
            <Text
              color={
                theme.theme_name !== "light"
                  ? "matador_text.100"
                  : "matador_text.500"
              }
              fontSize={{ base: "14px", md: "16px" }}
              fontWeight={600}
            >
              {moment(asset?.created_at).format("MMM D, YYYY")}
            </Text>
          </Flex>

          <Flex justify={"space-between"} align={"center"}>
            <Text
              color={'matador_text.500'}
              fontWeight={400}
              fontSize={{ base: "12px", md: "14px" }}
            >
              Offer Expiration Date
            </Text>
            <Text
              color={
                theme.theme_name !== "light"
                  ? "matador_text.100"
                  : "matador_text.500"
              }
              fontSize={{ base: "14px", md: "16px" }}
              fontWeight={600}
            >
              {moment(asset?.offer_expires).format("MMM D, YYYY")}
            </Text>
          </Flex>
        </VStack>
        {asset?.payment_plan && (
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
                color={'matador_text.500'}
                fontWeight={400}
                fontSize={{ base: "12px", md: "14px" }}
              >
                Initial Deposit
              </Text>
              <Text
                color={
                  theme.theme_name !== "light"
                    ? "matador_text.100"
                    : "matador_text.500"
                }
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={600}
              >
                {formatToCurrency(
                  asset?.payment_plan?.initial_deposit_in_value
                )}
              </Text>
            </Flex>

            {asset?.payment_plan?.plan_type === "manual" &&
              asset?.payment_plan?.payment_frequency !== "flexible" && (
                <Flex justify={"space-between"} align={"center"}>
                  <Text
                    color={'matador_text.500'}
                    fontWeight={400}
                    fontSize={{ base: "12px", md: "14px" }}
                  >
                    {asset?.payment_plan
                      ? asset?.payment_plan?.payment_frequency
                          ?.charAt(0)
                          .toUpperCase() +
                        asset?.payment_plan?.payment_frequency?.slice(1) +
                        " Payment"
                      : "Periodic Payment"}
                  </Text>
                  <Text
                    color={
                      theme.theme_name !== "light"
                        ? "matador_text.100"
                        : "matador_text.500"
                    }
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight={600}
                  >
                    {asset?.payment_plan?.payment_frequency !== "flexible"
                      ? formatToCurrency(asset?.payment_plan?.periodic_payment)
                      : "-"}
                  </Text>
                </Flex>
              )}

            {asset?.payment_plan?.plan_type === "custom" &&
              customPlanBreakDown.data?.data?.data?.map((item, idx) => (
                <Flex justify={"space-between"} align={"center"} key={idx}>
                  <Text
                    color={'matador_text.500'}
                    fontWeight={400}
                    fontSize={{ base: "12px", md: "14px" }}
                  >
                    {getOrdinal(idx + 1)} payment
                  </Text>
                  <Text
                    color={
                      theme.theme_name !== "light"
                        ? "matador_text.100"
                        : "matador_text.500"
                    }
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight={600}
                    whiteSpace="nowrap"
                  >
                    {item?.amount ? formatToCurrency(item?.amount) : "-"}
                  </Text>
                </Flex>
              ))}
          </VStack>
        )}
        {asset?.equity_fees?.length > 0 ? (
          <VStack
            align={"stretch"}
            mt="13px"
            gap="6px"
            fontWeight={500}
            className="montserrat-regular"
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
            {asset?.equity_fees?.map((fee, idx) => (
              <Flex key={idx} justify={"space-between"} align={"center"}>
                <Text
                  color={'matador_text.500'}
                  fontWeight={400}
                  fontSize={{ base: "12px", md: "14px" }}
                  maxW="60%"
                >
                  {fee.name}
                </Text>
                <Text
                  color={
                    theme.theme_name !== "light"
                      ? "matador_text.100"
                      : "matador_text.500"
                  }
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={600}
                  whiteSpace="nowrap"
                >
                  {formatToCurrency(fee.amount)}
                </Text>
              </Flex>
            ))}
          </VStack>
        ) : null}

        {!packet?.packet && !HOME__OWNERS__PACKETS?.isLoading ? null : (
          <VStack
            align={"stretch"}
            mt="13px"
            gap="6px"
            fontWeight={500}
            className="montserrat-regular"
            p={{
              base: "10.592px 28.245px 10.592px 21.184px",
              md: "17.596px 30.921px 17.596px 23.191px",
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
                color={theme.theme_name !== "light" ? "#A6A6A6" : "#292929"}
                fontSize={{ base: "14px", md: "15px" }}
                fontWeight={600}
                fontFamily={"Myriad Pro"}
              >
                Terms of agreement
              </Text>
              {HOME__OWNERS__PACKETS?.isLoading ? (
                <ThreeDots
                  color={theme.theme_name === "light" ? primaryColor : `#fff`}
                />
              ) : (
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  rel="noreferrer"
                  target="_blank"
                  href={packet?.packet}
                >
                  <Text
                    color={
                      theme.theme_name !== "light" ? lightenHex(80) : "primary"
                    }
                    fontWeight={500}
                    fontSize={"14px"}
                  >
                    View
                  </Text>
                </Link>
              )}
            </Flex>
          </VStack>
        )}
      </ModalBody>
      <ModalFooter pb="3rem" w="full">
        <Flex gap="8px" align="center" mx={"auto"} w="full">
          <Button
            h="52px"
            fontSize="16px"
            fontWeight="500"
            w="full"
            bg={"primary"}
            color="#FFF"
            onClick={() => setType("payment")}
            textTransform="uppercase"
          >
            Make payment
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
};

export default SummaryDrawer;
