import {HStack, Heading, Image, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import backArrow from '/src/images/icons/back-arrow.png';
import FilterHeader from './FilterHeader';
import {useRouter} from 'next/router';
import {handleLastTwoDigits, removeLasttTwoDigits} from '../../../utils';

const UpcomingPaymentHeader = ({total, setDate}) => {
  const router = useRouter();

  const handleBack = () => {
    return router.back();
  };
  return (
    <VStack mb="20px" spacing="none" w="full">
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
          Upcoming Payment
        </Heading>
      </HStack>
      <FilterHeader setDate={setDate} />
      <Stack
        w="660px"
        bg="#FFFFFF"
        mt="25px"
        align="center"
        h="111px"
        justify="center"
        spacing="14px"
        borderRadius="12px"
        border="1px solid #E4E4E4"
      >
        <Text w="full" fontSize="24px" fontWeight="600px">
          {removeLasttTwoDigits(total?.total)}
          <Text as="span" color="#919191">
            {handleLastTwoDigits(total?.total)}
          </Text>
        </Text>
        <Text fontSize="14px" color="#606060" fontWeight="400px">
          Total Upcoming Deposit
        </Text>
      </Stack>
    </VStack>
  );
};
export default UpcomingPaymentHeader;
