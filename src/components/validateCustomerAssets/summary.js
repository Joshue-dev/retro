import orangeAlertIcon from "../../images/icons/orange-alert-icon.svg";
import {
  Flex,
  Box,
  Text,
  VStack,
  Divider,
  HStack,
  Image,
  useTheme,
  Stack,
  ModalFooter,
  Link,
} from "@chakra-ui/react";
// import { Button, CustomizableButton, Spinner } from "../../ui-lib";
import { formatToCurrency } from "../../utils";
import { fetchInvestorPackets, fetchUpcomingPayments } from "../../api/payment";
import { useQuery } from "react-query";
import ThreeDots from "../loaders/ThreeDots";
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { useLightenHex } from "utils/lightenColorShade";
import moment from "moment";
import { formatAreaString } from "utils/formatUnitSize";
import { Button, CustomizableButton, Spinner } from "ui-lib/ui-lib.components";

const Summary = ({
  equityData,
  setType,
  customScrollbarStyles,
  drawer,
  handleClose,
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex, reduceOpacity } = useLightenHex(primaryColor);
  const HOME__OWNERS__PACKETS = useQuery(
    ["fetchInvestorPackets", equityData?.id],
    () => fetchInvestorPackets(equityData?.id)
  );

  const upcomingPayments = useQuery(
    ["fetchUpcomingPayments", equityData?.id],
    () => fetchUpcomingPayments(equityData?.id),
    { enabled: !!equityData }
  );

  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];
  const isAssetOutright =
    equityData?.type === "WHOLE" && !equityData?.payment_plan;

  const showOutstandingBalance =
    !isAssetOutright && upcomingPayments.data?.data?.data?.length > 0;

  return (
    <>
      {upcomingPayments?.isLoading ? (
        <Spinner />
      ) : (
        <Stack flex={1}>
          <Box
            px={{ base: "14px", md: "21px" }}
            py={{ base: "18px", md: "32px" }}
            mb="10px"
            top="0"
            right={0}
            w="full"
            zIndex={200}
            borderTopRadius={{ base: "16px", md: "unset" }}
            borderBottom="0.4px solid"
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
                  onClick={handleClose}
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
                  maxW="80rem"
                >
                  {equityData?.unit?.unit_title}
                </Text>
              </HStack>
              <CloseIcon
                cursor={"pointer"}
                fontSize={"14px"}
                color="text"
                onClick={drawer?.onClose}
              />
            </Flex>
          </Box>
          <Stack w="full" h={"full"} flex={1} justify={"space-between"}>
            <Flex
              direction={"column"}
              w="full"
              h="full"
              justify={"space-between"}
              px="24px"
              pb="18px"
              minH={{ base: "unset", md: "40rem" }}
              overflowY={"auto"}
              __css={customScrollbarStyles}
              maxH="52.5rem"
            >
              <Box w="full">
                <HStack
                  align="start"
                  spacing="7.42px"
                  p="10px"
                  w="full"
                  borderRadius="8px"
                  border="0.5px solid"
                  borderColor={lightenHex(50)}
                  bg={
                    theme.theme_name !== "light"
                      ? reduceOpacity(0.05)
                      : lightenHex(90)
                  }
                >
                  <Image src={orangeAlertIcon.src} alt="orange alert icon" />
                  <Text
                    mt="-2px"
                    fontSize="11.448px"
                    color={theme.theme_name !== "light" ? "text" : "#4B4B4B"}
                  >
                    We kindly request your confirmation regarding the property,
                    amount paid{""}
                    {packet
                      ? ", transaction date, and the ownership of the uploaded documents"
                      : ", and transaction date"}
                    . If any information is inaccurate, please initiate a
                    dispute. However, if all details are accurate, we kindly ask
                    you to proceed with validation.
                  </Text>
                </HStack>
                <Flex
                  mt="18px"
                  color={"white"}
                  fontSize={"16px"}
                  fontWeight={600}
                  justify={"space-between"}
                  align={"center"}
                  p={{ base: "26.154px 24.291px", md: "22.632px 15.876px" }}
                  bg="primary"
                  textTransform="uppercase"
                >
                  <Text textTransform={"uppercase"}>{"total paid"}</Text>
                  <Text>{formatToCurrency(equityData?.amount_paid)}</Text>
                </Flex>
                {Boolean(showOutstandingBalance) && (
                  <Flex
                    color={"white"}
                    fontSize={{ base: "17px", md: "18.673px" }}
                    fontWeight={600}
                    justify={"space-between"}
                    align={"center"}
                    p={{ base: "26.154px 27.291px", md: "28.632px 29.876px" }}
                    bg={lightenHex(90)}
                    border="1px solid"
                    borderColor="primary"
                  >
                    <VStack gap="0" align={"flex-start"}>
                      <Text fontSize={"16px"} fontWeight={600} color="#000">
                        {formatToCurrency(equityData?.next_due_balance)}
                      </Text>
                      <Text fontSize={"14px"} fontWeight={400} color="#525252">
                        Due{" "}
                        {moment(equityData?.next_due_date).format(
                          "MMM D, YYYY"
                        )}
                      </Text>
                    </VStack>
                    <VStack gap="0" align={"flex-end"}>
                      <Text fontSize={"16px"} fontWeight={600} color="#000">
                        {formatToCurrency(
                          equityData?.current_outstanding_balance
                        )}
                      </Text>
                      <Text fontSize={"14px"} fontWeight={400} color="#525252">
                        Outstanding Balance
                      </Text>
                    </VStack>
                  </Flex>
                )}
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
                  border="1px solid"
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
                      letterSpacing={"0.84px"}
                    >
                      Offer Price
                    </Text>
                    <Text
                      color="text"
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight={600}
                    >
                      {formatToCurrency(equityData?.offer_price)}
                    </Text>
                  </Flex>
                  {equityData?.unit?.unit_size ? (
                    <Flex justify={"space-between"} align={"center"}>
                      <Text
                        color="matador_text.500"
                        fontWeight={400}
                        fontSize={{ base: "12px", md: "14px" }}
                        letterSpacing={"0.84px"}
                      >
                        Unit Size
                      </Text>
                      <Text
                        color="text"
                        fontSize={{ base: "14px", md: "16px" }}
                        fontWeight={600}
                      >
                        {formatAreaString(equityData?.unit?.unit_size)}
                      </Text>
                    </Flex>
                  ) : null}
                  {equityData?.purchase_date ? (
                    <Flex justify={"space-between"} align={"center"}>
                      <Text
                        color="matador_text.500"
                        fontWeight={400}
                        fontSize={{ base: "12px", md: "14px" }}
                        letterSpacing={"0.84px"}
                      >
                        Purchase Date
                      </Text>
                      <Text
                        color="text"
                        fontSize={{ base: "14px", md: "16px" }}
                        fontWeight={600}
                      >
                        {moment(equityData?.purchase_date).format(
                          "MMM D, YYYY"
                        )}
                      </Text>
                    </Flex>
                  ) : null}
                  {equityData?.payment_plan?.plan_type === "custom" && (
                    <Flex justify={"space-between"} align={"center"}>
                      <Text
                        color="matador_text.500"
                        fontWeight={400}
                        fontSize={{ base: "12px", md: "14px" }}
                        letterSpacing={"0.84px"}
                      >
                        Payment Breakdown
                      </Text>
                      <Text
                        cursor="pointer"
                        onClick={() => setType("breakdown")}
                        color={
                          theme.theme_name !== "light"
                            ? lightenHex(80)
                            : "primary"
                        }
                        fontWeight={500}
                        fontSize={"14px"}
                      >
                        View
                      </Text>
                    </Flex>
                  )}
                </VStack>
                {equityData?.equity_fees?.length > 0 ? (
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
                    maxH="20rem"
                    overflowY="auto"
                    sx={customScrollbarStyles}
                  >
                    {equityData?.equity_fees?.map((fee, idx) => (
                      <Flex
                        key={idx}
                        justify={"space-between"}
                        align={"center"}
                      >
                        <Text
                          color={
                            theme.theme_name !== "light" ? "#A6A6A6" : "#424242"
                          }
                          fontWeight={400}
                          fontSize={{ base: "12px", md: "14px" }}
                          maxW="60%"
                        >
                          {fee?.name}
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
                          {formatToCurrency(fee?.amount)}
                        </Text>
                      </Flex>
                    ))}
                  </VStack>
                ) : null}
                {packet ? (
                  <VStack
                    align={"stretch"}
                    mt="13px"
                    gap="6px"
                    fontWeight={500}
                    p={{
                      base: "10.592px 28.245px 10.592px 21.184px",
                      md: "17.596px 30.921px 17.596px 23.191px",
                    }}
                    border="1px solid"
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
                        color={
                          theme.theme_name !== "light" ? "#A6A6A6" : "#292929"
                        }
                        fontSize={{ base: "14px", md: "15px" }}
                        fontWeight={600}
                        fontFamily={"Myriad Pro"}
                      >
                        Terms of agreement
                      </Text>
                      {HOME__OWNERS__PACKETS?.isLoading ? (
                        <ThreeDots
                          color={
                            theme.theme_name === "light" ? primaryColor : `#fff`
                          }
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
                              theme.theme_name !== "light"
                                ? lightenHex(80)
                                : "primary"
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
                ) : null}
              </Box>
            </Flex>
            <ModalFooter pb={"3rem"} w="full">
              <Flex gap="8px" align="center" mx={"auto"} w="full">
                <CustomizableButton
                  h="54px"
                  fontSize="16px"
                  fontWeight="500"
                  border="1px solid"
                  borderColor={
                    theme.theme_name !== "light"
                      ? "matador_border_color.200"
                      : "matador_border_color.100"
                  }
                  bg={
                    theme.theme_name !== "light"
                      ? "matador_background.100"
                      : "card_bg"
                  }
                  w="50%"
                  color="matador_text.500"
                  onClick={() => setType("dispute")}
                >
                  DISPUTE
                </CustomizableButton>
                <Button
                  h="54px"
                  fontSize="16px"
                  fontWeight="500"
                  onClick={() => setType("validate")}
                  bg="primary"
                  borderColor="primary"
                  color="white"
                  w="50%"
                  letterSpacing="0.18px"
                  _active={{
                    opacity: 1,
                  }}
                >
                  PROCEED
                </Button>
              </Flex>
            </ModalFooter>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Summary;
