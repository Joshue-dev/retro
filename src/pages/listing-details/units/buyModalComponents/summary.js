import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  VStack,
  Divider,
  HStack,
  Center,
  useTheme,
  ModalFooter,
  Stack,
  ModalBody,
  Link,
} from "@chakra-ui/react";
import { Button } from "../../../../ui-lib";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { formatToCurrency } from "../../../../utils";
import { useQuery } from "react-query";
import { fetchCustomPlanSummary } from "../../../../api/payment";
import ThreeDots from "../../../../components/loaders/ThreeDots";
import { getOrdinal } from "../../../../utils/getOrdinal";
import { fetchPaymentPlanDoc } from "../../../../api/listings";
import { useRouter } from "next/router";
import PurchaseImageCarousel from "@/components/assetCarousel/purchaseImageCarousel";
import { useLightenHex } from "utils/lightenColorShade";

const customScrollbarStyles = {
  "&::-webkit-scrollbar": {
    width: "4px",
    borderRadius: "16px",
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "16px",
    WebkitBoxShadow: "inset 0 0 6px rgba(255, 255, 255, 0.1)",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    // outline: "1px solid slategrey", // You can include this line if needed
  },
};
const Summary = ({
  setStep,
  setAmountToPay,
  selectedPlan,
  fullPayment,
  unitData,
  buyModal,
  onCloseModal,
  PAYMENT_PLAN_DATA,
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  const [accepted, setAccepted] = useState(false);
  const customPlanBreakDown = useQuery(
    ["customPLansummary", selectedPlan?.id],
    () => fetchCustomPlanSummary(selectedPlan?.id),
    { enabled: !!selectedPlan }
  );

  const param = fullPayment
    ? `unit=${unitData?.id}&purpose=outright`
    : `plan=${selectedPlan?.id}&purpose=paymentplan`;

  const projectDocQuery = useQuery(["fetchPaymentPlanDoc", param], () =>
    fetchPaymentPlanDoc(param)
  );
  const projectDocument =
    projectDocQuery.data?.data?.results?.[0]?.document_file ||
    projectDocQuery.data?.data?.results?.[0]?.document_url;

  const handleProceed = () => {
    if (selectedPlan) {
      setAmountToPay(selectedPlan?.initial_deposit_in_value);
    } else {
      let totalFee = Number(unitData?.price);
      unitData?.fees?.forEach((fee) => {
        totalFee = totalFee + Number(fee?.amount);
      });
      setAmountToPay(totalFee);
    }
    setStep("payment");
  };

  const showAsetImages =
    fullPayment &&
    PAYMENT_PLAN_DATA?.[0] &&
    !PAYMENT_PLAN_DATA?.[0]?.payment_period_in_months;

  return (
    <>
      <Box
        px={"21px"}
        py={{ base: "21px", md: "32px" }}
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
        mb="15px"
      >
        <Flex w="full" h="20px" justify={"space-between"} align={"center"}>
          <Text
            color="text"
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight={600}
            textTransform={"uppercase"}
            fontFamily="Open Sans"
          >
            {fullPayment
              ? "OUTRIGHT PAYMENT"
              : `${selectedPlan?.payment_period_in_months} MONTH${
                  selectedPlan?.payment_period_in_months > 1 ? "S" : ""
                } PAYMENT PLAN`}
          </Text>
          <CloseIcon
            cursor={"pointer"}
            fontSize={"14px"}
            color="text"
            onClick={buyModal?.onClose}
          />
        </Flex>
      </Box>
      <ModalBody
        p="0px"
        m="0px"
        overflowY="auto"
        sx={customScrollbarStyles}
        mr="2px"
        flex={2}
      >
        <Stack justify="space-between" flex={1} w="full" h={"full"}>
          <Flex
            direction={"column"}
            w="full"
            h="full"
            justify={{ base: "unset", md: "space-between" }}
            px="24px"
            pb="18px"
            overflowY="auto"
            __css={customScrollbarStyles}
          >
            {showAsetImages && <PurchaseImageCarousel unitData={unitData} />}
            <Flex
              color={"white"}
              fontSize={{ base: "16px", md: "17px" }}
              fontWeight={600}
              justify={"space-between"}
              align={"center"}
              p={{ base: "26.154px 27.291px", md: "20.632px 17.876px" }}
              bg="primary"
            >
              <Text textTransform={"uppercase"}>PURCHASE PRICE</Text>
              <Text textAlign="end" maxW="80%">
                {selectedPlan
                  ? formatToCurrency(selectedPlan?.purchase_price)
                  : formatToCurrency(unitData?.price)}
              </Text>
            </Flex>

            {selectedPlan && (
              <VStack
                align={"stretch"}
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
              >
                <Flex justify={"space-between"} align={"center"}>
                  <Text
                    color="matador_text.500"
                    fontWeight={400}
                    fontSize={{ base: "12px", md: "14px" }}
                  >
                    Initial Deposit
                  </Text>
                  <Text
                    color="matador_text.600"
                    fontSize={{ base: "14px", md: "15px" }}
                    fontWeight={600}
                  >
                    {formatToCurrency(selectedPlan?.initial_deposit_in_value)}
                  </Text>
                </Flex>

                {selectedPlan?.plan_type === "manual" &&
                  selectedPlan?.payment_frequency !== "flexible" && (
                    <Flex justify={"space-between"} align={"center"}>
                      <Text
                        color="matador_text.500"
                        fontWeight={400}
                        fontSize={{ base: "12px", md: "14px" }}
                      >
                        {selectedPlan
                          ? selectedPlan?.payment_frequency
                              ?.charAt(0)
                              .toUpperCase() +
                            selectedPlan?.payment_frequency?.slice(1) +
                            " Payment"
                          : "Periodic Payment"}
                      </Text>
                      <Text
                        color="matador_text.600"
                        fontSize={{ base: "14px", md: "15px" }}
                        fontWeight={600}
                      >
                        {selectedPlan?.payment_frequency !== "flexible"
                          ? formatToCurrency(selectedPlan?.periodic_payment)
                          : "-"}
                      </Text>
                    </Flex>
                  )}

                {selectedPlan?.plan_type === "custom" &&
                  customPlanBreakDown.data?.data?.data?.map((item, idx) => (
                    <Flex justify={"space-between"} align={"center"} key={idx}>
                      <Text
                        color="matador_text.500"
                        fontWeight={400}
                        fontSize={{ base: "12px", md: "14px" }}
                      >
                        {getOrdinal(idx + 1)} payment
                      </Text>
                      <Text
                        color="matador_text.600"
                        fontSize={{ base: "14px", md: "15px" }}
                        fontWeight={600}
                      >
                        {item?.amount ? formatToCurrency(item?.amount) : "-"}
                      </Text>
                    </Flex>
                  ))}
              </VStack>
            )}

            {selectedPlan?.bundle?.fees?.length || unitData?.fees?.length ? (
              <VStack
                align={"stretch"}
                mt="13px"
                gap="6px"
                fontWeight={500}
                className="montserrat-regular"
                //10.592px 28.245px 10.592px 21.184px;
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
              >
                {selectedPlan
                  ? selectedPlan?.bundle?.fees?.map((fee, idx) => (
                      <Flex
                        key={idx}
                        justify={"space-between"}
                        align={"center"}
                      >
                        <Text
                          color="matador_text.500"
                          fontWeight={400}
                          fontSize={{ base: "12px", md: "14px" }}
                        >
                          {fee.name}
                        </Text>
                        <Text
                          color="matador_text.200"
                          fontSize={{ base: "14px", md: "15px" }}
                          fontWeight={600}
                          whiteSpace="nowrap"
                        >
                          {formatToCurrency(fee.amount)}
                        </Text>
                      </Flex>
                    ))
                  : unitData?.fees?.map((fee, idx) => (
                      <Flex
                        key={idx}
                        justify={"space-between"}
                        align={"center"}
                      >
                        <Text
                          color="matador_text.500"
                          fontWeight={400}
                          fontSize={{ base: "12px", md: "14px" }}
                          maxW="75%"
                        >
                          {fee.name}
                        </Text>
                        <Text
                          color="matador_text.600"
                          fontSize={{ base: "14px", md: "15px" }}
                          fontWeight={600}
                          whiteSpace="nowrap"
                        >
                          {formatToCurrency(fee.amount)}
                        </Text>
                      </Flex>
                    ))}
              </VStack>
            ) : null}

            {!projectDocument && !projectDocQuery?.isLoading ? null : (
              <Flex
                align={"center"}
                h="74px"
                mt="13px"
                gap="6px"
                fontWeight={500}
                className="open-sans-regular"
                p={{
                  base: "10.592px 28.245px 10.592px 21.184px",
                  md: "11.596px 25.921px 11.596px 23.191px",
                }}
                border="1.2px solid"
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.100"
                }
                justify={"space-between"}
                bg={
                  theme.theme_name !== "light"
                    ? "matador_background.100"
                    : "card_bg"
                }
              >
                <Text
                  color="matador_text.200"
                  fontSize={{ base: "14px", md: "15px" }}
                  fontWeight={600}
                >
                  Terms of service
                </Text>
                {projectDocQuery?.isLoading ? (
                  <ThreeDots
                    color={theme.theme_name === "light" ? "primary" : "#fff"}
                  />
                ) : (
                  <Link href={projectDocument} target="_blank">
                    <Text
                      color={theme.theme_name === "light" ? "primary" : "#fff"}
                      fontSize={"14px"}
                    >
                      View
                    </Text>
                  </Link>
                )}
              </Flex>
            )}
          </Flex>
        </Stack>
      </ModalBody>
      <ModalFooter alignItems="end" flex={1} px={12} pb="3rem" m="0px" w="full">
        <Flex
          direction={"column"}
          gap="18px"
          align="center"
          mx={"auto"}
          w="full"
        >
          <HStack
            w="full"
            spacing="10px"
            onClick={() => setAccepted(!accepted)}
            cursor={"pointer"}
            align={"center"}
          >
            <Center
              w={{ base: "16px", md: "24px" }}
              h={{ base: "16px", md: "24px" }}
              borderRadius={"5px"}
              border={"1px solid"}
              borderColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "#D6D6D6"
              }
              bg={
                accepted
                  ? "primary"
                  : theme.theme_name !== "light"
                  ? "background"
                  : "#E5E5E5"
              }
            >
              {accepted && (
                <CheckIcon
                  w="12px"
                  h="12px"
                  borderRadius={"full"}
                  color="white"
                />
              )}
            </Center>
            <Text
              w="fit-content"
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight={400}
              color={
                theme.theme_name !== "light"
                  ? "matador_text.500"
                  : "matador_text.300"
              }
            >
              I have thoroughly reviewed the Terms of service
            </Text>
          </HStack>
          <Button
            h="52px"
            fontSize="16px"
            fontWeight="500"
            w="full"
            bg="primary"
            color="white"
            disabled={!accepted}
            isDisabled={!accepted}
            onClick={handleProceed}
            rounded={0}
            _disabled={{
              bg:
                theme.theme_name !== "light"
                  ? "matador_background.100"
                  : "#D6D6D6",
              border: "1px solid",
              borderColor:
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "#D6D6D6",
            }}
          >
            PROCEED
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
};

export default Summary;