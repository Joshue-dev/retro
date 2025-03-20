import React from 'react';
import {Box, VStack, Flex, Text, Center, Divider} from '@chakra-ui/react';
import {fetchCustomPlanSummary} from '../../api/payment';
import {useQuery} from 'react-query';
import {formatToCurrency} from '../../utils';
import {Button, Spinner} from '../../ui-lib';

const Breakdown = ({asset, customScrollbarStyles, setType}) => {
  const customPlanBreakDown = useQuery(
    ['customPLansummary', asset?.payment_plan?.id],
    () => fetchCustomPlanSummary(asset?.payment_plan?.id),
    {
      enabled: !!asset?.payment_plan,
    }
  );

  function getOrdinal(number) {
    if (typeof number !== 'number') {
      return ''; // Return an empty string for invalid inputs
    }

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    // Special cases for 11, 12, and 13, as they don't follow the usual pattern
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
      return number + 'th';
    }

    // Use the appropriate suffix based on the last digit
    const suffix = suffixes[lastDigit] || 'th';

    return number + suffix;
  }

  return (
    <Box px="24px" pb="38px" h={'fit-content'} overflowY={'scroll'} __css={customScrollbarStyles}>
      <Flex
        color={'white'}
        fontSize={{base: '17px', md: '18.673px'}}
        fontWeight={600}
        justify={'space-between'}
        align={'center'}
        p={{base: '26.154px 27.291px', md: '28.632px 29.876px'}}
        bg="primary"
      >
        <Text textTransform={'uppercase'}>PURCHASE PRICE</Text>
        <Text>
          {asset?.payment_plan
            ? formatToCurrency(asset?.payment_plan?.purchase_price)
            : formatToCurrency(asset?.total_unit_price)}
        </Text>
      </Flex>

      <VStack
        align={'stretch'}
        mt="13px"
        gap="6px"
        fontWeight={500}
        p={{base: '10.592px 28.245px 10.592px 21.184px', md: '11.596px 30.921px 11.596px 23.191px'}}
        border={'1.2px solid #E5E5E5'}
        divider={<Divider />}
      >
        <Flex justify={'space-between'} align={'center'}>
          <Text color="#424242" fontWeight={400} fontSize={{base: '12px', md: '14px'}}>
            Initial Deposit
          </Text>
          <Text color="#141414" fontSize={{base: '14px', md: '16px'}} fontWeight={600}>
            {formatToCurrency(asset?.payment_plan?.initial_deposit_in_value)}
          </Text>
        </Flex>

        {customPlanBreakDown?.isLoading ? (
          <Center w="full" h="full">
            <Spinner noAbsolute />
          </Center>
        ) : (
          customPlanBreakDown.data?.data?.data?.map((item, idx) => (
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#424242" fontWeight={400} fontSize={{base: '12px', md: '14px'}}>
                {getOrdinal(idx + 1)} payment
              </Text>
              <Text color="#141414" fontSize={{base: '14px', md: '16px'}} fontWeight={600}>
                {item?.amount ? formatToCurrency(item?.amount) : '-'}
              </Text>
            </Flex>
          ))
        )}
      </VStack>

      <Flex
        position={'fixed'}
        bottom={0}
        right={0}
        py="27px"
        gap="8px"
        align="center"
        mx={'auto'}
        w="full"
        bg="white"
        px={{base: '18px', md: '24px'}}
      >
        <Button
          h="48px"
          fontSize="16px"
          fontWeight="500"
          w="full"
          mt="16px"
          bg="transparent"
          border="1px solid #D0D5DD !important"
          color="text"
          onClick={() => setType('summary')}
          whileHover={{scale: 1}}
        >
          Back
        </Button>

        <Button
          h="48px"
          fontSize="16px"
          fontWeight="500"
          w="full"
          mt="16px"
          bg="primary"
          color="white"
          onClick={() => setType('payment')}
        >
          Make Payment
        </Button>
      </Flex>
    </Box>
  );
};

export default Breakdown;
