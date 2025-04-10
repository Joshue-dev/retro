import {HStack, Heading, Image, Stack, Text, VStack} from '@chakra-ui/react';
import backArrow from '/src/images/icons/back-arrow.png';
import {useRouter} from 'next/router';
import React from 'react';
import {handleLastTwoDigits, removeLasttTwoDigits} from '../../../utils';

const AccountTransactionHeader = ({details}) => {
  const router = useRouter();

  const cssForHeaders = {
    head_wrap: {
      borderRadius: '12px',
      border: '1px solid #F5F5F5',
      paddingTop: '34px',
      height: '120px',
      width: '290px',
      paddingBottom: '34px',
    },
    text_Bold: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#191919',
    },
    text_light: {
      lineHeight: '18px',
      fontSize: '14px',
      fontWeight: '400',
      color: '#606060',
    },
  };
  const handleBack = () => {
    return router.back();
  };

  return (
    <Stack w="full" mb="17px">
      <HStack alignSelf="start" mb="18px" zIndex={10}>
        <Image
          onClick={handleBack}
          style={{cursor: 'pointer'}}
          mr={2}
          boxSize="50px"
          src={backArrow.src}
          alt="back_arrow"
        />
        <Heading fontFamily='Euclid Circular B' fontSize="24px" fontWeight="600">
          Account Transactions
        </Heading>
      </HStack>
      <HStack w="full" bg="#ffffff" p="19px 26px" mb="30px" spacing="26px" borderRadius="16px">
        <VStack spacing="14px" sx={cssForHeaders.head_wrap}>
          <Text sx={cssForHeaders.text_Bold}>
            {' '}
            <Text as="span" textAlign="center" color="#4545FE">
              {removeLasttTwoDigits(details?.opening_balance)}
            </Text>{' '}
            {handleLastTwoDigits(details?.opening_balance)}
          </Text>
          <Text sx={cssForHeaders.text_light}>Opening Balance</Text>
        </VStack>
        <VStack spacing="14px" sx={cssForHeaders.head_wrap}>
          <Text sx={cssForHeaders.text_Bold}>
            <Text as="span" textAlign="center" color="#12D8A0">
              {removeLasttTwoDigits(details?.total_debits)}
            </Text>{' '}
            {handleLastTwoDigits(details?.total_debits)}
          </Text>
          <Text sx={cssForHeaders.text_light} w="197px">
            Total Debits
          </Text>
        </VStack>
        <VStack spacing="14px" sx={cssForHeaders.head_wrap}>
          <Text sx={cssForHeaders.text_Bold}>
            <Text as="span" textAlign="center" color="#12D8A0">
              {removeLasttTwoDigits(details?.total_deposit)}
            </Text>{' '}
            {handleLastTwoDigits(details?.total_deposit)}
          </Text>
          <Text sx={cssForHeaders.text_light} w="205px">
            Total Deposit
          </Text>
        </VStack>
        <VStack spacing="14px" sx={cssForHeaders.head_wrap}>
          <Text sx={cssForHeaders.text_Bold}>
            {' '}
            <Text as="span" textAlign="center" color="#FF9103">
              {removeLasttTwoDigits(details?.closing_balance)}
            </Text>{' '}
            {handleLastTwoDigits(details?.closing_balance)}
          </Text>
          <Text sx={cssForHeaders.text_light}>Closing Balance</Text>
        </VStack>
      </HStack>
    </Stack>
  );
};

export default AccountTransactionHeader;
