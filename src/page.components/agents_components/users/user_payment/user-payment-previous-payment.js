import {
  Box,
  Flex,
  ListItem,
  OrderedList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { formatAmountWithDecimal } from 'utils';
import { monthDayYear } from 'utils/formatDate';

export const UserPaymentPreviousPayment = ({payment}) => {
  return (
    <Box display="flex" flexDirection="column" gap="12px">
      <Text color="#3D3D3D" fontSize="12px" fontWeight="300" wordBreak="break-word">
        Previous Payments
      </Text>
      <Box bg="#F5F5F5" p="12px" width="full" borderRadius="12px">
        <OrderedList display="flex" flexDirection="column" gap="16px">
          {payment?.map((single, index) => (
            <Flex key={index} width="full" justifyContent="space-between">
              <ListItem color="#3D3D3D" fontSize="14px" fontWeight="400">
                {index === 0 ? 'Initial Deposit' : 'Instalment'}
              </ListItem>
              <Box display="flex" flexDirection="column" gap="4px">
                <Text color="#191919" fontSize="14px" fontWeight="600">
                  {single?.amount ? formatAmountWithDecimal(single?.amount) : <BsDashLg />}
                </Text>
                <Text color="#606060" fontSize="10px" fontWeight="400" textAlign="end">
                  {single?.created_at ? monthDayYear(single?.created_at) : <BsDashLg />}
                </Text>
              </Box>
            </Flex>
          ))}
        </OrderedList>
      </Box>
    </Box>
  );
};

export default UserPaymentPreviousPayment;
