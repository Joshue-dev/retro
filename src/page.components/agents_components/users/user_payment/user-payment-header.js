import {Box, Text, Flex} from '@chakra-ui/react';
import React from 'react';
import { BsDashLg } from 'react-icons/bs';

export const UserPaymentHeader = ({data}) => {
  const accountDetails = data?.account_details;
  const equityInfo = data?.project;
  const unitInfo = data?.unit;
  console.log(data, equityInfo)
  return (
    <Flex
      borderRadius="12px"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      border="1px solid #E4E4E4"
      p="16px"
      justifyContent="space-between"
    >
      <Flex
        gap={1}
        color="#191919"
        fontSize="12px"
        fontWeight="600"
        alignItems="center"
        wordBreak="break-word"
      >
        <Text>{unitInfo?.unit_title ?? <BsDashLg />},</Text>
        <Text>{equityInfo?.name ?? <BsDashLg />}</Text>
      </Flex>

      <Box display="flex" flexDirection="column">
        <Text
          color="#191919"
          fontSize="12px"
          fontWeight="600"
          alignItems="center"
          wordBreak="break-word"
        >
          {accountDetails?.account_number ?? <BsDashLg />}
        </Text>
        <Text
          color="#606060"
          fontSize="7.22px"
          fontWeight="400"
          alignItems="center"
          wordBreak="break-word"
        >
          {accountDetails?.bank_name ?? <BsDashLg />}
        </Text>
      </Box>
    </Flex>
  );
};

export default UserPaymentHeader;
