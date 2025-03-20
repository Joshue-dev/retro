import {
  DrawerCloseButton,
  HStack,
  Stack,
  StackDivider,
  Image,
  Text,
  Skeleton,
  ModalBody,
  ModalFooter,
  useTheme,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import HoverText from "../../../../ui-lib/ui-lib.components/hover/hoverOnText";
import { formatToCurrency } from "../../../../utils";
import { HandleAllocation } from "./allocationForAssetInfo";
import GeneralTransactionHistory from "../../components/transactionsHistory/generalTransactionHistory";
import { changeDateFormat } from "../../../../utils/formatDate";
import { useLightenHex } from "../../../../utils/lightenColorShade";
import angledArrow from "/src/images/icons/backIconForAsset.svg";
import { Spinner } from "ui-lib";
import MobileHeader from "@/components/navbar/mobile_header";
import { fetchUpcomingPayments } from "@/api/payment";
import { useQuery } from "react-query";
import FractionalTransactionInfo from "@/components/manageAssets/fractionalTransactionInfo";

const EquityInfo = ({
  info,
  isLoading,
  setEquityId,
  setAmountToPay,
  handleScreen,
  refetch,
  onDrawerOpen,
  onNotOpen,
  arrayData,
  onClose,
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const isDarkMode = theme.theme_name !== "light";
  const { lightenHex } = useLightenHex(primaryColor);

  const upcomingPayments = useQuery(
    ["fetchUpcomingPayments", info?.id],
    () => fetchUpcomingPayments(info?.id),
    { enabled: !!info }
  );

  const customScrollbarStyles = (
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

  const shouldShowEligibleAt =
    info?.unit?.allocation_type === "auto" &&
    !info?.allocation &&
    !info?.can_allocate;
  const isAssetFractional = info?.type === "FRACTIONAL";

  const OVERVIEWINFO = [
    ...(info?.payment_plan
      ? [
          {
            label: "Payment Breakdown",

            component: (
              <Text
                fontSize={{ base: "12.824px", md: "15px" }}
                color={
                  theme.theme_name !== "light" ? lightenHex(80) : "primary"
                }
                fontFamily="Open Sans"
                fontWeight={500}
                onClick={handleScreen("payment breakdown")}
                cursor="pointer"
              >
                View
              </Text>
            ),
          },
        ]
      : []),
    ...(info?.payment_plan
      ? [
          {
            label: "Offer Price",
            value: `${formatToCurrency(info?.total_unit_price)}`,
          },
        ]
      : []),
    ...(info?.can_allocate || shouldShowEligibleAt
      ? [
          {
            label: "Allocated Unit",
            component: (
              <HandleAllocation
                equity={info}
                refetch={refetch}
                handleScreen={handleScreen}
              />
            ),
          },
        ]
      : []),
    {
      label: "Documents",
      component: (
        <Text
          fontSize={{ base: "12.824px", md: "15px" }}
          color={theme.theme_name !== "light" ? lightenHex(80) : "primary"}
          fontFamily="Open Sans"
          fontWeight={500}
          onClick={handleScreen("home owners packet")}
          cursor="pointer"
        >
          View
        </Text>
      ),
    },
  ];

  const FRACTIONALINFO = [
    { label: "Total Fractions", value: info?.amount_of_fractions ?? "-" },
    ...(info?.can_allocate || (shouldShowEligibleAt && !isAssetFractional)
      ? [
          {
            label: "Allocated Unit",
            component: (
              <HandleAllocation
                equity={info}
                refetch={refetch}
                handleScreen={handleScreen}
              />
            ),
          },
        ]
      : []),
    {
      label: "Holding Period",
      component: (
        <Text
          fontSize={{ base: " 12.536px", md: "15px" }}
          lineHeight={{ base: "14px", md: "16px" }}
          fontWeight="600"
          color="matador_text.200"
        >
          {info?.unit?.holding_period} month
          {Number(info?.unit?.holding_period) > 1 ? "s" : ""}
        </Text>
      ),
    },
    {
      label: "Investor's Packet",
      component: (
        <Text
          fontSize={{ base: "12.824px", md: "15px" }}
          color={theme.theme_name !== "light" ? lightenHex(80) : "primary"}
          fontFamily="Open Sans"
          fontWeight={500}
          onClick={handleScreen("home owners packet")}
          cursor="pointer"
        >
          View
        </Text>
      ),
    },
  ];

  const navigateToPortfolio = () => {
    if (arrayData?.length === 1) {
      onClose();
    } else {
      const callScreen = handleScreen("portfolio");
      callScreen();
      return setEquityId("");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setAmountToPay(info?.current_outstanding_balance);
    }
  }, [isLoading]);

  const showOutstandingBalance =
    info?.payment_plan && upcomingPayments.data?.data?.data?.length > 0;

  const ASSETINFO = isAssetFractional ? FRACTIONALINFO : OVERVIEWINFO;

  return (
    <>
      <HStack
        p={{ base: "12px 25.309px 12px 26px", md: " 22px 24px" }}
        w="full"
        minH={{ base: "48px", md: "75px" }}
        justify="space-between"
        align="center"
        borderBottom="1px solid"
        borderBottomColor={
          theme.theme_name !== "light"
            ? "matador_border_color.200"
            : "matador_border_color.300"
        }
        display={{ base: "none", md: "flex" }}
      >
        <HStack spacing="16px" role="button" onClick={navigateToPortfolio}>
          <Image
            h={{ md: "31px", base: "20px" }}
            src={angledArrow.src}
            alt="back icon"
            role="button"
            filter={isDarkMode ? "invert(1)" : ""}
          />

          <Stack spacing="2px">
            <Text
              as="h1"
              fontSize={{ base: "16px", md: "20px" }}
              fontFamily="Open Sans"
              lineHeight={{ base: "22px", md: "26px" }}
              fontWeight="600"
              color="text"
              letterSpacing="1.44px"
              textTransform="uppercase"
              maxW="80rem"
            >
              {info?.unit?.unit_title ?? ""}
            </Text>
          </Stack>
        </HStack>
        <DrawerCloseButton
          fontSize={{ base: "10px", md: "14px" }}
          color="text"
          position="initial"
        />
      </HStack>
      <MobileHeader
        activePage={info?.unit?.unit_title ?? ""}
        onDrawerOpen={onDrawerOpen}
        onDrawerClose={navigateToPortfolio}
        onNotOpen={onNotOpen}
      />
      <ModalBody
        overflowY={"auto"}
        mr="8px"
        sx={customScrollbarStyles()}
        p="0px"
        mb={
          info?.payment_plan && Number(info?.current_outstanding_balance) > 0
            ? "0px"
            : "10px"
        }
        overflowX="hidden"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack
            w="full"
            px={{ base: "27.3px", md: "24px" }}
            pr={{ base: "15.3px", md: "12px" }}
            spacing={{ base: "14.33px", md: "16px" }}
          >
            <Stack w="full" spacing={{ base: "14.33px", md: "16px" }}>
              <Stack
                pt={{ base: 0, md: "28px" }}
                zIndex={1}
                top="-1px"
                spacing="none"
                w="full"
              >
                <HStack
                  bg="primary"
                  p={{ base: "25.637px 26.751px", md: " 28.632px 20.876px" }}
                  justify="space-between"
                  w="full"
                  maxH={{ md: "71.89px", base: "64.37px" }}
                >
                  <Text
                    fontSize={{ base: "14.048px", md: "15.805px" }}
                    lineHeight={{ base: "16.72px", md: "18.673px" }}
                    fontWeight="600"
                    color="#ffffff"
                  >
                    {isAssetFractional ? "FRACTIONAL VALUE" : "TOTAL PAID"}
                  </Text>
                  <Text color="#ffffff" fontSize={{ base: "14px", md: "16px" }}>
                    {formatToCurrency(
                      isAssetFractional
                        ? info?.fractional_equity_value
                        : info?.amount_paid
                    )}
                  </Text>
                </HStack>
                {showOutstandingBalance ? (
                  <HStack
                    w="full"
                    h={{ base: "85.958px", md: "86px" }}
                    borderBottom="1px solid"
                    borderRight="1px solid"
                    borderLeft="1px solid "
                    borderColor={lightenHex(75)}
                    bg={lightenHex(95)}
                    p={{ md: "22.5px 16px", base: "20.19px 14.33px" }}
                    justify="space-between"
                  >
                    <Stack spacing={{ base: "3.58px", md: "4px" }}>
                      <HoverText
                        as="h2"
                        fontSize={{ base: " 14.72px", md: "16.673px" }}
                        fontFamily="Open Sans"
                        lineHeight={{ base: "22px", md: "25px" }}
                        fontWeight="600"
                        color="#191919"
                        text={formatToCurrency(info?.total_due_balance)}
                      />
                      <Text
                        as="h2"
                        fontSize={{ base: "10.326px", md: "12px" }}
                        fontFamily="Open Sans"
                        lineHeight={{ base: "20px", md: "22px" }}
                        fontWeight="400"
                        color="#525252"
                      >
                        Due {changeDateFormat(info?.next_due_date)}
                      </Text>
                    </Stack>
                    <Stack align="end" spacing={{ base: "3.58px", md: "4px" }}>
                      <HoverText
                        as="h2"
                        fontSize={{ base: " 14.72px", md: "16.673px" }}
                        fontFamily="Open Sans"
                        lineHeight={{ base: "22px", md: "25px" }}
                        fontWeight="600"
                        textAlign="right"
                        color="#191919"
                        text={formatToCurrency(
                          info?.current_outstanding_balance
                        )}
                      />
                      <Text
                        as="h2"
                        fontSize={{ base: "10.326px", md: "12px" }}
                        fontFamily="Open Sans"
                        lineHeight={{ base: "20px", md: "22px" }}
                        fontWeight="400"
                        textAlign="right"
                        color="#525252"
                      >
                        Outstanding Balance
                      </Text>
                    </Stack>
                  </HStack>
                ) : null}
              </Stack>
              <Stack
                p={{
                  base: "10.383px 27.687px 10.383px 20.765px",
                  md: "11.596px 30.921px 11.596px 23.191px",
                }}
                border="1.288px solid"
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.100"
                }
                spacing="none"
                divider={
                  <StackDivider
                    mb={{ base: "10.38px", md: "11.6px" }}
                    border="none"
                    h="0.8px"
                    bg={
                      theme.theme_name !== "light"
                        ? "matador_border_color.200"
                        : "matador_border_color.100"
                    }
                  />
                }
                w="full"
                bg={
                  theme.theme_name !== "light"
                    ? "matador_background.100"
                    : "card_bg"
                }
              >
                {ASSETINFO.map((info, idx) => {
                  return (
                    <HStack
                      py={{ base: "9.85px", md: "11px" }}
                      key={idx}
                      justify="space-between"
                      w="full"
                      maxH="20rem"
                      overflowY="auto"
                      sx={customScrollbarStyles}
                    >
                      <Text
                        fontSize={{ base: "12px", md: "13px" }}
                        fontFamily="Open Sans"
                        lineHeight={{ base: "17px", md: "19px" }}
                        fontWeight="400"
                        color="matador_text.500"
                        letterSpacing="0.84px"
                      >
                        {info.label}
                      </Text>
                      <Skeleton
                        startColor="#E4E4E4"
                        endColor="#f4f4f4"
                        minW="30px"
                        isLoaded={!isLoading}
                      >
                        {info?.component || (
                          <Text
                            fontSize={{ base: " 12.536px", md: "15px" }}
                            lineHeight={{ base: "14px", md: "16px" }}
                            fontWeight="600"
                            color="matador_text.200"
                          >
                            {info?.value}
                          </Text>
                        )}
                      </Skeleton>
                    </HStack>
                  );
                })}
              </Stack>
            </Stack>

            {isAssetFractional ? (
              <FractionalTransactionInfo info={info} />
            ) : (
              <GeneralTransactionHistory isLoading={isLoading} info={info} />
            )}
          </Stack>
        )}
      </ModalBody>
      {info?.payment_plan && Number(info?.current_outstanding_balance) > 0 ? (
        <ModalFooter
          p={{ md: "16px 24px 16px", base: " 14.326px 21.49px 14.326px" }}
        >
          <Button
            p={{ base: "9.75px 24px" }}
            border="0.75px solid"
            h={{ base: "57.305px", md: "64px" }}
            borderColor={
              theme.theme_name !== "light"
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
            borderRadius="0px"
            fontSize={{ base: "16.117px", md: "18px" }}
            fontWeight="400"
            color={isDarkMode ? "matador_text.100" : "#344054"}
            onClick={handleScreen("make a deposit")}
            _hover={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
              border: "0.75px solid !important",
              borderColor: "matador_border_color.100 !important",
            }}
            _active={{
              bg: "transparent",
              border: "0.75px solid !important",
              borderColor: "matador_border_color.100 !important",
            }}
            variant="outline"
            w="full"
            bg={
              theme.theme_name !== "light"
                ? "matador_background.100"
                : "card_bg"
            }
          >
            MAKE A DEPOSIT
          </Button>
        </ModalFooter>
      ) : null}
    </>
  );
};

export default EquityInfo;
