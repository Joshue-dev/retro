import { Box, Stack, Text } from "@chakra-ui/react";
import { BsDashLg } from "react-icons/bs";
import { formatAmountWithDecimal } from "utils";
import { monthDayYear } from "utils/formatDate";

const UserPaymentNumberPart = ({data}) => {
  const equityInfo = data;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="start"
      justifyItems="start"
      gap="16px"
      width="full"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        gap="16px"
        alignItems="stretch"
        width="full"
        alignSelf="flex-start"
        justifySelf="start"
      >
        <Stack
          p="16px"
          alignContent="center"
          justifyContent="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          borderRadius="12px"
          border="1px solid #E4E4E4"
          width="50%"
        >
          <Text
            color="#4545FE"
            fontSize="14px"
            fontWeight="600"
            alignItems="center"
            textAlign="center"
          >
            {equityInfo?.total_unit_price ? (
              formatAmountWithDecimal(equityInfo?.total_unit_price)
            ) : (
              <BsDashLg />
            )}
          </Text>
          <Text fontSize="8px" fontWeight="400" alignItems="center" textAlign="center">
            Purchase Price
          </Text>
        </Stack>

        <Stack
          p="16px"
          alignContent="center"
          justifyContent="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          borderRadius="12px"
          border="1px solid #E4E4E4"
          width="50%"
        >
          <Text
            color="#12D8A0"
            fontSize="14px"
            fontWeight="600"
            alignItems="center"
            textAlign="center"
          >
            {equityInfo?.amount_paid ? (
              formatAmountWithDecimal(equityInfo?.amount_paid)
            ) : (
              <BsDashLg />
            )}
          </Text>
          <Text fontSize="8px" fontWeight="400" alignItems="center" textAlign="center">
            Total Amount Paid
          </Text>
        </Stack>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        gap="16px"
        alignItems="stretch"
        width="full"
      >
        <Stack
          p="16px"
          alignContent="center"
          justifyContent="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          borderRadius="12px"
          border="1px solid #E4E4E4"
          width="50%"
        >
          <Text
            color="#FF6A6A"
            fontSize="14px"
            fontWeight="600"
            alignItems="center"
            textAlign="center"
          >
            {equityInfo?.current_outstanding_balance ? (
              formatAmountWithDecimal(equityInfo?.current_outstanding_balance)
            ) : (
              <BsDashLg />
            )}
          </Text>
          <Text fontSize="8px" fontWeight="400" alignItems="center" textAlign="center">
            Outstanding Balance
          </Text>
        </Stack>

        <Stack
          p="16px"
          alignContent="center"
          justifyContent="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          borderRadius="12px"
          border="1px solid #E4E4E4"
          width="50%"
        >
          <Text
            color="#FF6A6A"
            fontSize="14px"
            fontWeight="600"
            alignItems="center"
            textAlign="center"
          >
            {equityInfo?.next_due_balance ? (
              formatAmountWithDecimal(equityInfo?.next_due_balance)
            ) : (
              <BsDashLg />
            )}
          </Text>
          <Text fontSize="8px" fontWeight="400" alignItems="center" textAlign="center">
            Due Balance
          </Text>
          <Text fontSize="8px" fontWeight="300" alignItems="center" textAlign="center">
            {equityInfo?.next_due_date ? monthDayYear(equityInfo?.next_due_date) : <BsDashLg />}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserPaymentNumberPart;
