import {Button, HStack, Image, Text} from '@chakra-ui/react';
import React from 'react';
import {formatToCurrency} from 'utils';
import {changeDateFormat} from 'utils/formatDate';
import txnIcon from '/src/images/icons/txn_icon.svg';
import {handlePaymentTransactionType} from 'utils';
import PaymentTypeTag from 'ui-lib/ui-lib.components/Tag/paymentTypeTag';
import TransactionCard from 'page.components/manageAsset/coownership/transactionCard';

export const COOWNERSHIPTRANSACTIONHISTORYCOLUMN = [
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
            {formatToCurrency(row.amount)}
          </Text>
        </HStack>
      );
    },
  },

  {
    Header: 'payment Type',
    accessor: row => {
      return (
        <HStack justify="center" h="64px" bg="#fff">
          {' '}
          <PaymentTypeTag type={row?.transaction_action_type} />
        </HStack>
      );
    },
  },

  {
    Header: 'Date',
    accessor: row => {
      return (
        <HStack w="full" px="24px" justify="end" bg="#fff" h="64px">
          <Text color="#191919" fontSize="14px" fontWeight="400">
            {changeDateFormat(row.created_at)}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'view',
    accessor: row => {
      return (
        <HStack
          w="full"
          px="24px"
          pr="18px"
          justify="center"
          h="64px"
          borderRightRadius="5px"
          bg="#fff"
          position="relative"
          zIndex={1}
        >
          <TransactionCard info={row} />
        </HStack>
      );
    },
  },
];
