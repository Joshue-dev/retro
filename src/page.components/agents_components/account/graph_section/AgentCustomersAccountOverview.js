import React from 'react';
import {formatToCurrency} from '../../../../utils';
import Link from 'next/link';

import overviewIcon from '/src/images/icons/house.svg';
import {Stack, VStack, Image, Text, HStack} from '@chakra-ui/react';

export const AgentCustomersAccountOverview = ({data}) => {
  const allPurchases = data?.all_purchases;
  const allOutsanding = data?.all_outstanding;

  return (
    <Stack
      borderRadius="16px"
      w="407px"
      spacing="none"
      px="22px"
      pt="17.5px"
      pb="34px"
      bg="#ffffff"
    >
      <HStack>
        {' '}
        <Image boxSize="38px" src={overviewIcon.src} alt="overview icon" />
        <Text fontSize="14px">Overview</Text>
      </HStack>

      <VStack py="8px" spacing="12px" mt="17px" border="1px solid #f5f5f5" borderRadius="12px">
        <Text as="span" fontSize="16px" fontWeight="600">
          {allPurchases ? formatToCurrency(allPurchases)?.split('.')[0] : '-'}
          <Text as="span" color="#CBCBCB">
            {allPurchases ? `.${formatToCurrency(allPurchases)?.split('.')[1]}` : ''}
          </Text>
        </Text>
        <Text as="span" color="#606060" fontSize="10px" fontWeight="400">
          Total purchase
        </Text>
        <Link href="account/total-purchase">
          <Text as="span" fontSize="10px" color="#919191" fontWeight="300" cursor="pointer">
            View details
          </Text>
        </Link>
      </VStack>
      <VStack mt="28px" py="8px" spacing="12px" border="1px solid #f5f5f5" borderRadius="12px">
        <Text as="span" fontSize="16px" fontWeight="600">
          {allOutsanding ? formatToCurrency(allOutsanding)?.split('.')[0] : '-'}
          <Text as="span" color="#CBCBCB">
            {allOutsanding ? `.${formatToCurrency(allOutsanding)?.split('.')[1]}` : ''}
          </Text>
        </Text>
        <Text as="span" color="#606060" fontSize="10px" fontWeight="400">
          Outstanding Balance
        </Text>
        <Link href="account/outStanding-balance">
          <Text as="span" fontSize="10px" color="#919191" fontWeight="300" cursor="pointer">
            View details
          </Text>
        </Link>
      </VStack>
    </Stack>
  );
};

export default AgentCustomersAccountOverview;
