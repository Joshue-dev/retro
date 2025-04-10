import React, { useEffect } from "react";
import { Flex, Box, Text, VStack, Center, useTheme, Stack } from "@chakra-ui/react";
import { Spinner } from "../../../../ui-lib";
import PurchaseImageCarousel from "../../../../components/assetCarousel/purchaseImageCarousel";
import { CloseIcon } from "@chakra-ui/icons";
import MobileHeader from "@/components/navbar/mobile_header";
import { useLightenHex } from "utils/lightenColorShade";

const Plan = ({
  PAYMENT_PLAN_DATA,
  planLoading,
  setSelectedPlan,
  setStep,
  unitData,
  setFullPayment,
  buyModal,
  onCloseModal,
  customScrollbarStyles
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const {lightenHex} = useLightenHex(primaryColor)

  useEffect(() => {
    if (
      PAYMENT_PLAN_DATA?.[0] &&
      !PAYMENT_PLAN_DATA?.[0]?.payment_period_in_months
    ) {
      setStep("summary");
      setSelectedPlan(null);
      setFullPayment(true);
    }
  }, [PAYMENT_PLAN_DATA]);

  return (
    <>
      <MobileHeader
        onDrawerClose={buyModal?.onClose}
        activePage={unitData?.unit_title}
        noIcons
      />
      <Box
        px={{ base: "14px", md: "21px" }}
        py={{ base: "18px", md: "32px" }}
        mb="18px"
        top="0"
        right={0}
        w="full"
        zIndex={200}
        borderBottom={"1px solid"}
        borderBottomColor={
          theme.theme_name !== "light"
            ? "matador_border_color.200"
            : "matador_border_color.300"
        }
        display={{ base: "none", md: "flex" }}
      >
        <Flex
          w="full"
          h="20px"
          justify={"space-between"}
          align={"center"}
          fontFamily="Open Sans"
        >
          <Text
            color="text"
            fontSize={"21px"}
            fontWeight={600}
            textTransform={"uppercase"}
            letterSpacing="1.44px"
            maxW='80rem'
            textAlign='start'
          >
            {unitData?.unit_title}
          </Text>
          <CloseIcon
            cursor={"pointer"}
            fontSize={"14px"}
            color="text"
            onClick={buyModal?.onClose}
          />
        </Flex>
      </Box>
      <Box w="full" h={"full"} maxH='60rem' overflowY={"auto"} sx={customScrollbarStyles}>
        <Flex
          direction={"column"}
          w="full"
          h="full"
          gap='12px'
          px="24px"
          pb="38px"
          
        >
          <PurchaseImageCarousel unitData={unitData} />
          <Stack>
            <Text
              fontWeight={"700"}
              fontSize={"20px"}
              color={'primary'}
              letterSpacing="-0.4px"
              fontFamily={"Open Sans"}
            >
              HOW WOULD YOU LIKE TO PAY?
            </Text>
            {planLoading ? (
              <Spinner />
            ) : (
              <VStack mt="10px" gap="20px">
                {PAYMENT_PLAN_DATA?.[0]?.payment_period_in_months ?
                  PAYMENT_PLAN_DATA?.map((plan, i) => (
                    <Center
                      key={i}
                      cursor={"pointer"}
                      onClick={() => {
                        setSelectedPlan(plan);
                        setStep("summary");
                        setFullPayment(false);
                      }}
                      w="full"
                      h="72px"
                      fontWeight={700}
                      fontSize={"17px"}
                      border="1px solid"
                      borderColor={theme.theme_name !== 'light' ? 'matador_border_color.200' : `text`}
                      _hover={{ bg: `#00000010` }}
                      fontFamily="Liberation Sans"
                      letterSpacing="3.2px"
                      color='text'
                    >
                      {plan?.payment_period_in_months}{" "}
                      {`MONTH${
                        Number(plan?.payment_period_in_months) > 1 ? "S" : ''
                      }`}{" "}
                      PAYMENT PLAN
                    </Center>
                  )): null}
                <Center
                  cursor={"pointer"}
                  onClick={() => {
                    setStep("summary");
                    setSelectedPlan(null);
                    setFullPayment(true);
                  }}
                  w="full"
                  h="72px"
                  fontWeight={700}
                  fontSize={"18px"}
                  border="1px solid"
                  borderColor={
                    theme.theme_name === "light" ? `primary` : lightenHex(75)
                  }
                  _hover={{ bg: `${primaryColor}10` }}
                  color={theme.theme_name !== 'light' ? lightenHex(75) : "primary"}
                  fontFamily="Liberation Sans"
                  letterSpacing="3.2px"
                >
                  OUTRIGHT PAYMENT
                </Center>
              </VStack>
            )}
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Plan;