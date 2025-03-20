import React from "react";
import {
  Flex,
  Text,
  Box,
  HStack,
  VStack,
  ModalCloseButton,
  Stack,
  Divider,
  useTheme,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { formatToCurrency } from "../../../../utils";
import { Spinner } from "@/components/loaders/AnimatedLoader";
import { useLightenHex } from "utils/lightenColorShade";

const Price = ({
  fractionalData,
  isBuildingTypeSingleFamilyResidential,
  setStep,
  fractionDetail,
  customScrollbarStyles,
  info,
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);

  const unitData = fractionalData?.fraction_data?.unit;
  const fractionalPercent = Math.ceil(
    (Number(unitData?.total_purchased_fractions) /
      (Number(unitData?.total_fractions) + Number(unitData?.total_purchased_fractions))) *
      100
  )

  const leftFractions = Number(unitData?.total_fractions) 

  return (
    <Stack maxH='73rem' flex={1} h={"full"}>
      {fractionDetail?.isLoading ? (
        <Spinner />
      ) : fractionDetail?.isError ? (
        <Text>An error occured</Text>
      ) : (
        <>
          <Flex
            direction={"row"}
            w="full"
            borderBottom={"1px solid"}
            borderColor={
              theme.theme_name !== "light"
                ? "matador_border_color.200"
                : "matador_border_color.300"
            }
            justify={"space-between"}
            p="24px"
            align="center"
          >
            <Text
              fontWeight={600}
              textAlign={"center"}
              fontSize={"20px"}
              color={"text"}
              textTransform={"uppercase"}
              fontFamily={"Open Sans"}
              letterSpacing={"1.44px"}
            >
              {unitData?.project?.name}
            </Text>
            <ModalCloseButton
              position="initial"
              fontSize="14px"
              color={"matador_text.100"}
            />
          </Flex>
          <Stack flex={1} w="full" h="full" justify="space-between">
            <Stack
              w="full"
              px="18px"
              pt="1rem"
              minH={{ base: "unset", md: "40rem" }}
              overflowY={"auto"}
              __css={customScrollbarStyles}
              maxH="52.5rem"
              gap="1.5rem"
            >
              <Stack gap={0}>
                <Flex
                  direction={"row"}
                  w="full"
                  justify={"space-between"}
                  p="24px"
                  display={{ base: "none", md: "flex" }}
                  align="center"
                  bg="primary"
                  color="#FFF"
                >
                  <Text
                    fontWeight={600}
                    textAlign={"start"}
                    color={"#fff"}
                    textTransform={"uppercase"}
                    letterSpacing={"1.44px"}
                    fontSize="15px"
                  >
                    price per fraction
                  </Text>
                  <Text
                    fontWeight={600}
                    textAlign={"end"}
                    color={"#fff"}
                    textTransform={"uppercase"}
                    letterSpacing={"1.44px"}
                    fontSize="18px"
                  >
                    {formatToCurrency(unitData?.price_per_fraction)}
                  </Text>
                </Flex>
                {info?.fractions_progress_bar && (
                  <Box
                    w="full"
                    bg={
                      theme.theme_name !== "light"
                        ? "matador_background.100"
                        : lightenHex(97.5)
                    }
                    border=".2rem solid"
                    borderColor={
                      theme.theme_name !== "light"
                        ? "matador_border_color.200"
                        : lightenHex(90)
                    }
                    px="3rem"
                    py="1rem"
                  >
                    <Box
                      bg={fractionalPercent < 100 && "#FFF"}
                      mt="3.9rem"
                      w="full"
                      h="1.0rem"
                      borderRadius={"full"}
                      position={"relative"}
                    >
                      {fractionalPercent < 100 && (
                        <Box
                          position={"absolute"}
                          h="2.0rem"
                          w=".2rem"
                          bg="primary"
                          left={`${parseInt(fractionalPercent)}%`}
                          top="-.5rem"
                        />
                      )}
                      <Text
                        position={"absolute"}
                        color="#737373"
                        left={`${
                          fractionalPercent - (fractionalPercent > 90 ? 10 : 3)
                        }%`}
                        top="-3.0rem"
                      >
                        {`${fractionalPercent}%`}
                      </Text>
                      <Box
                        w={`${fractionalPercent}%`}
                        h="full"
                        bg="primary"
                        borderLeftRadius={"full"}
                        borderRightRadius={fractionalPercent < 100 ? 0 : "full"}
                      />
                    </Box>
                    <HStack
                      w="full"
                      align="center"
                      justify={"space-between"}
                      mt="2rem"
                    >
                      <Text
                        fontSize={{ base: "1.45rem", md: "1.6rem" }}
                        fontWeight={400}
                        color="#737373"
                      >
                        {unitData?.total_purchased_fractions?.toLocaleString()} fraction{unitData?.total_purchased_fractions > 1 ? 's' : ''} sold
                      </Text>
                      <Text
                        fontSize={{ base: "1.45rem", md: "1.6rem" }}
                        fontWeight={400}
                        color="#737373"
                      >
                        {leftFractions.toLocaleString()} fraction{leftFractions > 1 ? 's' : ''} left
                      </Text>
                    </HStack>
                  </Box>
                )}
              </Stack>
              <VStack
                w="full"
                justify={"space-between"}
                gap="1.0rem"
                divider={
                  <Divider
                    borderColor={
                      theme.theme_name !== "light"
                        ? "matador_border_color.200"
                        : "shade"
                    }
                  />
                }
                bg={
                  theme.theme_name !== "light"
                    ? "matador_background.100"
                    : "matador_background.200"
                }
                p="11.596px 30.921px 11.596px 23.191px"
                border="1.3px solid"
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "shade"
                }
              >
                {unitData?.unit_type && !isBuildingTypeSingleFamilyResidential ? (
                  <HStack justify="space-between" w="full">
                    <Text
                      fontSize={{ base: "1.4rem", md: "1.55rem" }}
                      fontWeight={500}
                      color="#606060"
                    >
                      Unit Type
                    </Text>
                    <Text
                      fontWeight={500}
                      color="matador_text.100"
                      textTransform="capitalize"
                      textAlign="end"
                    >
                      {unitData?.unit_type}
                    </Text>
                  </HStack>
                ): null}
                {fractionalData?.packets?.[0]?.packet && (
                  <HStack justify="space-between" w="full">
                    <Text
                      fontSize={{ base: "1.4rem", md: "1.55rem" }}
                      fontWeight={500}
                      color="#606060"
                    >
                      {`Investor's Packet`}
                    </Text>
                    <Text
                      fontSize={{ base: "1.45rem", md: "1.6rem" }}
                      fontWeight={400}
                      color={theme.theme_name !== "light" ? "text" : "primary"}
                      cursor={"pointer"}
                      onClick={() =>
                        window.open(
                          `${
                            fractionalData?.packets?.[0]?.packet
                              ? fractionalData?.packets?.[0]?.packet
                              : ""
                          }`,
                          "_blank"
                        )
                      }
                    >
                      View
                    </Text>
                  </HStack>
                )}
                {unitData?.dividend_payout && (
                  <HStack justify="space-between" w="full">
                    <Text
                      fontSize={{ base: "1.4rem", md: "1.55rem" }}
                      fontWeight={500}
                      color="#606060"
                    >
                      Dividend Payout
                    </Text>
                    <Text
                      fontSize={{ base: "1.45rem", md: "1.6rem" }}
                      fontWeight={600}
                      color="matador_text.100"
                      textTransform="capitalize"
                      textAlign="end"
                    >
                      {unitData?.dividend_payout}
                    </Text>
                  </HStack>
                )}
                {unitData?.strategy && (
                  <HStack justify="space-between" w="full">
                    <Text
                      fontSize={{ base: "1.4rem", md: "1.55rem" }}
                      fontWeight={500}
                      color="#606060"
                    >
                      Strategy
                    </Text>
                    <Text
                      fontSize={{ base: "1.45rem", md: "1.6rem" }}
                      fontWeight={600}
                      color="matador_text.100"
                      textTransform="capitalize"
                      textAlign="end"
                    >
                      {unitData?.strategy?.replace(/_/g, " ")}
                    </Text>
                  </HStack>
                )}
                {unitData?.holding_period && (
                  <HStack justify="space-between" w="full">
                    <Text
                      fontSize={{ base: "1.4rem", md: "1.55rem" }}
                      fontWeight={500}
                      color="#606060"
                    >
                      Holding Period
                    </Text>
                    <Text
                      fontSize={{ base: "1.45rem", md: "1.6rem" }}
                      fontWeight={600}
                      color="matador_text.100"
                      textTransform="capitalize"
                      textAlign="end"
                    >
                      {unitData?.holding_period} month{Number(unitData.holding_period) > 1 ? "s" : ""}
                    </Text>
                  </HStack>
                )}
                {fractionalData?.partners?.length
                  ? fractionalData?.partners?.map((partner) => {
                      return (
                        <HStack
                          align="center"
                          justify="space-between"
                          h="full"
                          w="full"
                        >
                          <Text
                            textTransform="capitalize"
                            fontSize={{ base: "1.4rem", md: "1.55rem" }}
                            fontWeight={500}
                            color="#606060"
                            textAlign="left"
                          >
                            {partner?.stakeholder_type}
                          </Text>
                          <Text
                            fontSize={{ base: "1.45rem", md: "1.6rem" }}
                            fontWeight={600}
                            color="text"
                            textAlign="end"
                          >
                            {partner?.stakeholder_name}
                          </Text>
                        </HStack>
                      );
                    })
                  : null}
              </VStack>
            </Stack>
            <ModalFooter px={6} w="full">
              <Button
                bg="primary"
                w="full"
                textTransform="uppercase"
                color="#FFFFFF"
                fontSize="16px"
                h="56px"
                p="13px 24px"
                _hover={{ bg: "" }}
                onClick={() => setStep("summary")}
                rounded={0}
                _active={{
                  opacity: 1
                }}
              >
                Proceed
              </Button>
            </ModalFooter>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Price;