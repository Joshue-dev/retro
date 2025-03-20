import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  VStack,
  Image,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import commission_icon from "/src/images/icons/commission_icon.svg";
import { fetch_user_payment_breakdown_autopay } from "api/agents";
import UserPaymentIncomingPayment from "page.components/agents_components/users/user_payment/user-payment-incoming-payment";
import { AnimatedLoader } from "components/common/loaders";
import { useRouter } from "next/router";
import { fetch_user_payment_breakdown_past_payments } from "api/agents";
import { fetch_user_payment_breakdown_upcoming_payments } from "api/agents";
import UserPaymentPreviousPayment from "page.components/agents_components/users/user_payment/user-payment-previous-payment";
import UserPaymentHeader from "page.components/agents_components/users/user_payment/user-payment-header";
import UserPaymentListingInfo from "page.components/agents_components/users/user_payment/user-payment-listing-info";
import UserPaymentNumberPart from "page.components/agents_components/users/user_payment/user-payment-number-part";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import useLocalStorage from "utils/hooks/useLocalStorage";

const TransactionDetailsDrawer = ({ modalDisclosure, equityId, userId }) => {
  const handleClose = () => {
    return modalDisclosure.onClose();
  };
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const EQUITY_PAYMENT_DETAILS = useQuery(
    [
      "outstanding-balance-customers-autopay",
      equityId,
      userId && parseInt(userId),
    ],
    () =>
      fetch_user_payment_breakdown_autopay(
        equityId,
        userId && parseInt(userId)
      ),
    { enabled: !!equityId }
  );

  const UPCOMING_PAYMENTS = useQuery(
    [
      "outstanding-balance-customers-upcoming-payments",
      equityId,
      userId && parseInt(userId),
    ],
    () =>
      fetch_user_payment_breakdown_upcoming_payments(
        equityId,
        userId && parseInt(userId)
      ),
    { enabled: !!equityId }
  );
  const PAST_PAYMENTS = useQuery(
    [
      "outstanding-balance-customers-past-payments",
      equityId && parseInt(equityId),
    ],
    () =>
      fetch_user_payment_breakdown_past_payments(
        equityId && parseInt(equityId)
      ),
    { enabled: !!equityId }
  );

  return (
    <Drawer
      isOpen={modalDisclosure.isOpen}
      onClose={handleClose}
      borderRadius="16px"
      placement={screenWidth <= 992 ? "bottom" : "right"}
    >
      <DrawerOverlay bg="rgba(0,0,0,0.07)" />
      <DrawerContent
        position="relative"
        zIndex={100}
        maxW="450px"
        bg="#FBFCFC"
        p="0px"
        mt={{ lg: "75px" }}
        maxH={{ base: `80vh`, lg: `100%` }}
        boxShadow="none"
        borderRadius={{ base: "12.9px 12.9px 0px 0px", lg: "0px" }}
        fontFamily="Euclid Circular B"
      >
        <HStack
          boxShadow={{
            base: `none`,
            lg: "4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)",
          }}
          mb="10px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
        >
          <Flex width="full" justifyContent="space-between" alignItems="center">
            <Text fontSize="20px" fontWeight={600} color="#191919">
              Transaction Details
            </Text>
          </Flex>
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

        <Box
          display="flex"
          flexDirection="column"
          gap="16px"
          pt="0px"
          pb="20px"
          px="25px"
          overflowY={"scroll"}
        >
          {EQUITY_PAYMENT_DETAILS?.isLoading ? (
            <VStack w="full" justify="center" align="center" h="20vh">
              <OvalLoader />
            </VStack>
          ) : EQUITY_PAYMENT_DETAILS?.isError ? (
            <VStack w="full" justify="center" align="center" h="40vh">
              <Text
                fontSize="14px"
                fontWeight="400"
                textAlign="center"
                w="300px"
                color="#000"
              >
                {`${
                  EQUITY_PAYMENT_DETAILS?.error?.response?.status === 500
                    ? "Apologies for the inconvenience. We're working on it. Please try again later."
                    : EQUITY_PAYMENT_DETAILS?.error?.response?.status === 401
                    ? "Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue."
                    : EQUITY_PAYMENT_DETAILS?.error?.response?.data?.message ??
                      EQUITY_PAYMENT_DETAILS?.error?.response?.message ??
                      EQUITY_PAYMENT_DETAILS?.error?.message ??
                      "Something went wrong"
                }`}
              </Text>
            </VStack>
          ) : (
            <>
              <UserPaymentHeader data={EQUITY_PAYMENT_DETAILS?.data?.data} />
              <UserPaymentNumberPart
                data={EQUITY_PAYMENT_DETAILS?.data?.data}
              />
              {PAST_PAYMENTS?.data?.data ? (
                <UserPaymentPreviousPayment
                  payment={PAST_PAYMENTS?.data?.data}
                />
              ) : null}

              {UPCOMING_PAYMENTS?.data &&
              EQUITY_PAYMENT_DETAILS?.data?.data?.next_due_balance > 0 ? (
                <UserPaymentIncomingPayment
                  payment={UPCOMING_PAYMENTS?.data?.data?.message}
                  equityInfo={EQUITY_PAYMENT_DETAILS?.data?.data}
                />
              ) : null}
            </>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default TransactionDetailsDrawer;
