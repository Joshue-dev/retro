import {HStack, Image, Stack, Text, Container, Box} from '@chakra-ui/react';
import React from 'react';

import locationIcon from '../../../images/icons/location_icon_store.svg';
import {BsDashLg} from 'react-icons/bs';
// import { Container2 } from '../../common/containers';

export const UserAddress = ({customerInfo}) => {
  return (
    <Stack>
      <Box
        border={'none'}
        pb={4}
        maxW="888px"
        borderRadius="16px"
        background="#FFFFFF"
        h="171px"
        p={22}
      >
        <Stack mb={4}>
          <HStack>
            <Image alt="" boxSize="24px" src={locationIcon.src} />
            <Text color={customerInfo?.address ? '#191919' : '#606060'} fontWeight="bold">
              House Address
            </Text>
          </HStack>
          <Text textAlign="start">
            {customerInfo?.address ? customerInfo?.address : <BsDashLg />}
          </Text>
        </Stack>
        <Stack>
          <HStack>
            <Image alt="" boxSize="24px" src={locationIcon.src} />
            <Text color={customerInfo?.company_address ? '#191919' : '#606060'} fontWeight="bold">
              Employment Address
            </Text>
          </HStack>
          <Text textAlign="start">
            {customerInfo?.company_address ? customerInfo?.company_address : <BsDashLg />}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
