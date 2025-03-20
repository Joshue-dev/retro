import {
  Box,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Grid,
  GridItem,
  Stack,
  Text,
  VStack,
  Button,
  useMediaQuery,
} from '@chakra-ui/react';
import Carousel from 'react-elastic-carousel';
import carrouselArrow from '/src/images/icons/carrouselArrow.svg';
import twoCards from '/src/images/icons/twocards.svg';
import {formatAmount} from '/src/utils';

export const PaymentPlan = ({PAYMENT_PLAN_DATA}) => {
  const breakPoints = [
    {width: 1, itemsToShow: 2},
    {width: 768, itemsToShow: 3},
  ];

  const capitalizeFirstLetter = string => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  };
  const [isNotMobile] = useMediaQuery('(min-width: 992px)');

  const PlanCard = ({unit, index}) => {
    return (
      <Stack
        // mr={{lg: '25px'}}
        key={index}
        bg="#fff"
        // py="28px"
        // px="26.4px"
        p={{base: '16px 15px', md: '28px 26px'}}
        // minH="385px"
        h="fit-content"
        spacing="35.2px"
        borderRadius="8px"
        border="1px solid #EAECF0"
        minW={'max-content`'}
        maxW={{base: `250px`, md: '411px'}}
      >
        <HStack justify="space-between" w="full" align="center">
          <Stack spacing="1.7px" align={'start'}>
            <Text
              textTransform="capitalize"
              fontSize={{base: `18px`, md: '30.8px'}}
              fontWeight="600"
              color="#191919"
            >
              {unit?.payment_period_in_months} Months
            </Text>
            <Text fontSize={{base: `9px`, md: '15.4px'}} fontWeight="400" color="#606060">
              Duration
            </Text>
          </Stack>
          <Image src={twoCards.src} alt="paymentlan icon" />
        </HStack>
        <SimpleGrid columns={2} w="full" spacing={{base: `20px`, md: '35.2px'}}>
          <Stack spacing="4.2px" align={'start'}>
            <Text fontSize={{base: '10px', md: '15.4px'}} fontWeight="400" color="#606060">
              Purchase Price
            </Text>
            <Text fontSize={{base: '12px', md: '19.8px'}} fontWeight="500">
              ₦ {formatAmount(unit?.purchase_price)}
            </Text>
          </Stack>
          <Stack align={'start'}>
            <Text fontSize={{base: '10px', md: '15.4px'}} fontWeight="400" color="#606060">
              Initial Deposit
            </Text>
            <Text fontSize={{base: '12px', md: '19.8px'}} fontWeight="500">
              ₦ {formatAmount(unit?.initial_deposit_in_value)}
            </Text>
          </Stack>
          {unit.plan_type == 'custom' ||
          unit?.payment_frequency?.toLowerCase() == 'flexible' ? null : (
            <Stack align={'start'}>
              <Text
                fontSize={{base: '10px', md: '15.4px'}}
                w={'full'}
                whiteSpace={'nowrap'}
                fontWeight="400"
                color="#606060"
              >
                Installment payment
              </Text>
              <Text fontSize={{base: '12px', md: '19.8px'}} fontWeight="500">
                ₦ {formatAmount(unit?.periodic_payment)}
              </Text>
            </Stack>
          )}
          {unit.plan_type !== 'custom' && unit?.payment_frequency !== null ? (
            <Stack align="start">
              <Text
                fontSize={{base: '10px', md: '15.4px'}}
                w={'full'}
                whiteSpace={'nowrap'}
                fontWeight="400"
                color="#606060"
              >
                Payment Frequency
              </Text>
              <Text fontSize={{base: '12px', md: '19.8px'}} fontWeight="500">
                {capitalizeFirstLetter(unit?.payment_frequency)}
              </Text>
            </Stack>
          ) : null}
        </SimpleGrid>
        <Stack>
          <Button
            bg="transparent"
            border="1px solid #191919"
            fontSize="14px"
            fontWeight="500"
            onClick={() =>
              window.open(`${unit?.contract?.length ? unit?.contract?.[0] : ''}`, '_blank')
            }
            color="#191919"
            w="118px"
            h="39px"
            px="10px"
            borderRadius="10px"
          >
            View contract
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <Stack spacing="20px" px={{base: 4, lg: 0}}>
      <Text
        mt="41px"
        fontSize={{base: '18px', lg: '32px'}}
        fontWeight="500"
        color="#191919"
        lineHeight="41px"
        textAlign="start"
      >
        Payment Plan
      </Text>

      <Box
        w={'100%'}
        maxW={'100%'}
        overflowX={'auto'}
        css={{
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <HStack gap="20px" minWidth="max-content">
          {PAYMENT_PLAN_DATA?.length > 0 &&
            PAYMENT_PLAN_DATA?.map((unit, index) => (
              <PlanCard unit={unit} index={index} key={index} />
            ))}
        </HStack>
      </Box>
      {/* <Box display={{base: 'none', lg: 'block'}}>
        <Carousel
          pagination={false}
          autoPlaySpeed={1500}
          itemPadding={[0, 1]}
          enableAutoPlay={false}
          breakPoints={breakPoints}
          showEmptySlots={true}
          disableArrowsOnEnd={true}
          renderArrow={props => {
            return (
              <Image
                boxSize={'20px'}
                style={{cursor: 'pointer'}}
                display={props.isEdge || !isNotMobile ? 'none' : 'flex'}
                alignSelf={'center'}
                transform={props.type === 'PREV' ? '' : 'rotate(180deg)'}
                onClick={props.onClick}
                src={carrouselArrow.src}
                alt={props.type === 'PREV' ? 'left arrow' : 'right arrow'}
              />
            );
          }}
        >
          {PAYMENT_PLAN_DATA?.length > 0 &&
            PAYMENT_PLAN_DATA.map((unit, index) => (
              <PlanCard unit={unit} index={index} key={index} />
            ))}
        </Carousel>
      </Box> */}
    </Stack>
  );
};

export default PaymentPlan;
