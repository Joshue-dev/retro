import {
  Box,
  Divider,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import backArrow from "/src/images/icons/back-arrow.png";

import AgentsLayoutView from "/src/page.components/agents_components/AgentLayout/View";
import {
  handleLastTwoDigits,
  priceString,
  removeLasttTwoDigits,
} from "/src/utils";
import {
  fetch_user_payment_breakdown_autopay,
  fetch_user_payment_breakdown_past_payments,
  fetch_user_payment_breakdown_upcoming_payments,
} from "/src/api/agents";
import { useQuery } from "react-query";
import { UserPaymentHeader } from "/src/page.components/agents_components/users/user_payment/user-payment-header";
import { UserPaymentListingInfo } from "/src/page.components/agents_components/users/user_payment/user-payment-listing-info";
import { UserPaymentPreviousPayment } from "/src/page.components/agents_components/users/user_payment/user-payment-previous-payment";
import { UserPaymentIncomingPayment } from "/src/page.components/agents_components/users/user_payment/user-payment-incoming-payment";
import { changeDateFormat } from "/src/utils/formatDate";
import PaymentBreakdownTable from "../../../../page.components/agents_components/Table/PaymentBreakdownTable";
import { toastForError } from "../../../../utils/toastForErrors";
import useLocalStorage from "utils/hooks/useLocalStorage";

export const UserPaymentBreakdownAutoPay = () => {
  const router = useRouter();
  const { id: equity_id, user, type } = router.query;
  const toast = useToast();

  // const columns = useMemo(() => BREAKDOWN_AUTOPAY);

  const EQUITY_PAYMENT_DETAILS = useQuery(
    [
      "outstanding-balance-customers-autopay",
      equity_id && parseInt(equity_id),
      user && parseInt(user),
    ],
    () =>
      fetch_user_payment_breakdown_autopay(
        equity_id && parseInt(equity_id),
        user && parseInt(user)
      )
  );

  const UPCOMING_PAYMENTS = useQuery(
    [
      "outstanding-balance-customers-upcoming-payments",
      equity_id && parseInt(equity_id),
      user && parseInt(user),
    ],
    () =>
      fetch_user_payment_breakdown_upcoming_payments(
        equity_id && parseInt(equity_id),
        user && parseInt(user)
      )
  );
  const PAST_PAYMENTS = useQuery(
    [
      "outstanding-balance-customers-past-payments",
      equity_id && parseInt(equity_id),
    ],

    () =>
      fetch_user_payment_breakdown_past_payments(
        equity_id && parseInt(equity_id)
      )
  );

  if (
    // EQUITY_PAYMENT_DETAILS?.isError
    false
  ) {
    toastForError(
      EQUITY_PAYMENT_DETAILS?.error,
      EQUITY_PAYMENT_DETAILS?.isError,
      toast
    );
    return (
      <AgentsLayoutView activePage={"customers"}>
        <Box mt="20px">{/* <BackArrowWithText text="Back" /> */}</Box>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }

  const handleBack = () => {
    return router.back();
  };
  return (
    <AgentsLayoutView activePage={"customers"}>
      {
        //   EQUITY_PAYMENT_DETAILS.isLoading
        false ? (
          <Spinner />
        ) : (
          <>
            <Box h="full" w="full">
              <HStack mb="10px" zIndex={10}>
                <Image
                  onClick={handleBack}
                  style={{ cursor: "pointer" }}
                  mr={2}
                  boxSize="50px"
                  src={backArrow.src}
                  alt="back_arrow"
                />
                <Heading fontSize="20px" fontWeight="600">
                  Back
                </Heading>
              </HStack>
              <VStack
                mt="10px"
                bg="#ffffff"
                spacing="none"
                borderTopLeftRadius="16px"
                borderTopRightRadius="16px"
                pb="20px"
                px="42px"
                w="full"
              >
                <UserPaymentHeader
                  autopay
                  owner={EQUITY_PAYMENT_DETAILS?.data?.data?.owner}
                />

                <UserPaymentListingInfo
                  autopay
                  for_allocation={EQUITY_PAYMENT_DETAILS?.data?.data}
                  listings_info={EQUITY_PAYMENT_DETAILS?.data?.data?.project}
                  unit_info={EQUITY_PAYMENT_DETAILS?.data?.data?.unit}
                />
                <HStack w="full" mt="35px" justify="space-between">
                  <Stack
                    border="1px solid #E4E4E4"
                    borderRadius="12px"
                    justify="center"
                    align="center"
                    w="full"
                    h="111px"
                  >
                    <Text
                      fontSize="24px"
                      fontWeight="600"
                      // minW="1px"
                      w="full"
                      color="#191919"
                    >
                      <Text as="span" textAlign="center" color="#4545fe">
                        {removeLasttTwoDigits(
                          EQUITY_PAYMENT_DETAILS?.data?.data?.total_unit_price
                        )}
                      </Text>{" "}
                      {handleLastTwoDigits(
                        EQUITY_PAYMENT_DETAILS?.data?.data?.total_unit_price
                      )}
                    </Text>

                    <Text fontSize="14px" fontWeight="400" color="#606060">
                      Purchase Price
                    </Text>
                  </Stack>
                  <Stack
                    border="1px solid #E4E4E4"
                    borderRadius="12px"
                    justify="center"
                    align="center"
                    w="full"
                    h="111px"
                  >
                    <Text
                      fontSize="24px"
                      fontWeight="600"
                      // minW="1px"
                      w="full"
                      color="#191919"
                    >
                      <Text as="span" textAlign="center" color="#12D8A0">
                        {removeLasttTwoDigits(
                          EQUITY_PAYMENT_DETAILS?.data?.data?.amount_paid
                        )}
                      </Text>{" "}
                      {handleLastTwoDigits(
                        EQUITY_PAYMENT_DETAILS?.data?.data?.amount_paid
                      )}
                    </Text>

                    <Text fontSize="14px" fontWeight="400" color="#606060">
                      Total Amount Paid
                    </Text>
                  </Stack>{" "}
                  <Stack
                    border="1px solid #E4E4E4"
                    borderRadius="12px"
                    justify="center"
                    align="center"
                    w="full"
                    h="111px"
                  >
                    <Text
                      fontSize="24px"
                      fontWeight="600"
                      // minW="1px"
                      w="full"
                      color="#191919"
                    >
                      <Text as="span" textAlign="center" color="#FF6A6A">
                        {removeLasttTwoDigits(
                          EQUITY_PAYMENT_DETAILS?.data?.data
                            ?.current_outstanding_balance
                        )}
                      </Text>{" "}
                      {handleLastTwoDigits(
                        EQUITY_PAYMENT_DETAILS?.data?.data
                          ?.current_outstanding_balance
                      )}
                    </Text>

                    <Text fontSize="14px" fontWeight="400" color="#606060">
                      Outstanding Balance
                    </Text>
                  </Stack>{" "}
                  <Stack
                    border="1px solid #E4E4E4"
                    borderRadius="12px"
                    justify="center"
                    align="center"
                    w="full"
                    h="111px"
                  >
                    <Text
                      fontSize="24px"
                      fontWeight="600"
                      // minW="1px"
                      w="full"
                      color="#191919"
                    >
                      <Text as="span" textAlign="center" color="#FF6A6A">
                        {removeLasttTwoDigits(
                          EQUITY_PAYMENT_DETAILS?.data?.data?.next_due_balance
                        )}
                      </Text>{" "}
                      {handleLastTwoDigits(
                        EQUITY_PAYMENT_DETAILS?.data?.data?.next_due_balance
                      )}
                    </Text>

                    <Text fontSize="14px" fontWeight="400" color="#606060">
                      Due Balance
                    </Text>
                    <Text fontSize="14px" fontWeight="400" color="#606060">
                      {EQUITY_PAYMENT_DETAILS?.data?.data?.next_due_date
                        ? changeDateFormat(
                            EQUITY_PAYMENT_DETAILS?.data?.data?.next_due_date
                          )
                        : null}
                    </Text>
                  </Stack>
                </HStack>
                {PAST_PAYMENTS.isLoading ? (
                  <HStack justify="center" align="center" mt="30px" w="full">
                    <Spinner />
                  </HStack>
                ) : (
                  <UserPaymentPreviousPayment
                    past_payment_info={PAST_PAYMENTS?.data?.data}
                  />
                )}
                {UPCOMING_PAYMENTS.isLoading ? (
                  <HStack justify="center" align="center" mt="30px" w="full">
                    <Spinner />
                  </HStack>
                ) : type === "completed" ? null : (
                  <UserPaymentIncomingPayment
                    equityInfo={EQUITY_PAYMENT_DETAILS?.data?.data}
                    incoming_payment_info={
                      UPCOMING_PAYMENTS?.data?.data?.message
                    }
                  />
                )}
              </VStack>
            </Box>
          </>
        )
      }
    </AgentsLayoutView>
  );
};

export default UserPaymentBreakdownAutoPay;
