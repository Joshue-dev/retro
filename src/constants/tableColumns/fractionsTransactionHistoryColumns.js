import {HStack, Image, Text} from '@chakra-ui/react';
import React from 'react';
import {formatToCurrency} from 'utils';
import {changeDateFormat} from 'utils/formatDate';
import txnIcon from '/src/images/icons/txn_icon.svg';

const FRACTIONTRANSACTIONHISTORYCOLUMN = [
  {
    Header: 'Icon',
    accessor: row => {
      return (
        <HStack w="full" px="24px" pl="18px" bg="#fff" borderLeftRadius="5px" h="64px">
          <Image src={txnIcon.src} alt="transaction icon" />
        </HStack>
      );
    },
  },

  {
    Header: 'Amount',
    accessor: row => {
      return (
        <HStack w="full" justify="center" px="24px" h="64px" bg="#fff">
          <Text color="#191919" fontSize="14px" fontWeight="600">
            {formatToCurrency(row.equity_value)}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'no of fraction',
    accessor: row => {
      return (
        <HStack w="full" justify="center" px="24px" h="64px" bg="#fff">
          <HStack p="8px 16px " bg="#E4EFFF" borderRadius="32px">
            <Text fontSize="16px" fontWeight="400" color="#5451FF">
              {row.amount}
            </Text>
          </HStack>
        </HStack>
      );
    },
  },

  {
    Header: 'Date',
    accessor: row => {
      return (
        <HStack
          w="full"
          px="24px"
          justify="end"
          pr="18px"
          bg="#fff"
          borderRightRadius="5px"
          h="64px"
        >
          <Text color="#191919" fontSize="14px" fontWeight="400">
            {changeDateFormat(row.created_at)}
          </Text>
        </HStack>
      );
    },
  },
];

export default FRACTIONTRANSACTIONHISTORYCOLUMN;
