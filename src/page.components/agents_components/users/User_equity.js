import React, {useState} from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Grid,
  Stack,
  Tag,
  TagLabel,
  Text,
  VStack,
  useDisclosure,
  Center,
  Hide,
  Show,
} from '@chakra-ui/react';
import emptyIcon from '/src/images/icons/emptyIcon.png';
import {useRouter} from 'next/router';
import See_review from './See_review';
import {CoOwners} from './co_owners';
import {truncateLongText} from 'utils/truncateLongText';
import TransactionDetailsDrawer from 'components/Drawers/transactionDetails/transactionDetails';
import { EmptyState } from '@/components/common/Table';
import { formatAmountWithDecimal } from 'utils';

// NOTE: Customer equities === investments made by customer
export const UserEquities = ({customerInfo}) => {
  const {query} = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedData, setSelectedData] = useState(null);
  const handleSeeReviewClick = data => {
    setSelectedData(data);
    onOpen();
  };
  const transactionDrawer = useDisclosure();
  const [equityId, setEquityId] = useState();
  const [unit, setUnit] = useState();
  const [runQuery, setRunQuery] = useState(false);

  const OpenDrawer = item => {
    transactionDrawer.onOpen();
    setEquityId(item?.equity_id);
    setUnit(item?.unit);
    setRunQuery(true);
  };

  return (
    <div>
      <Text align={'start'} mb="15px" fontWeight={'500'}>
        Portfolio
      </Text>
      <VStack
        alignItems={'flex-start'}
        pb={4}
        minH={{lg: '230px'}}
        maxW="888px"
        maxH='550px'
        borderRadius="16px"
        background={{base: 'transparent', lg: '#FFFFFF'}}
        overflowY={'auto'}
        p={{base: '0px', lg: '0px'}}
        gap={{base: '11px', lg: '0px'}}
        w='full'
      >
        {customerInfo?.length == 0 ? (
          <EmptyState
            text="No asset found"
            description="No asset has been Purchased"
            p={{base: '24px', md: '52px'}}
            bg="#fff"
            borderRadius="9px"
          />
        ) : (
          customerInfo?.map((propInfo, index) => (
            <Flex
              key={propInfo?.id || index}
              pt={4}
              pb={2}
              gap={{base: '14px', md: '25px'}}
              // direction={{base: 'column', lg: 'row'}}
              direction={'row'}
              bg="#fff"
              p={{base: '20px'}}
              w="100%"
            >
              <Stack spacing={'19px'} gap={0} w={'max-content'}>
                <Center
                  h={{base: '76px', md: '214px'}}
                  w={{base: '76px', md: '283px'}}
                  minH={{base: '76px', md: '214px'}}
                  minW={{base: '76px', md: '283px'}}
                  borderRadius={'24px'}
                  overflow="hidden"
                >
                  <Image
                    src={propInfo.project?.project?.photos[0]?.photo}
                    alt={propInfo.project?.project?.name}
                    fill
                    minW="100%"
                    minH="100%"
                    objectFit={{base: 'cover', md: 'unset'}}
                  />
                </Center>
              </Stack>
              <Stack gap={{base: '15px'}} flex={{md: 1}}>
                <HStack justify="space-between">
                  <Box>
                    <Text
                      fontWeight="600"
                      fontSize={{base: '16px', md: '24px'}}
                      color="#191919"
                      textAlign={'left'}
                    >
                      {propInfo.project?.project?.name}
                    </Text>
                    <Text
                      textTransform={'capitalize'}
                      fontWeight="400"
                      fontSize={{base: '10px', md: '14px'}}
                      color="#606060"
                    >
                      {propInfo?.project?.status}
                    </Text>
                  </Box>
                  <HStack align={'center'} gap={2}>
                    {propInfo?.co_owners.length !== 0 ? (
                      <CoOwners
                        display={{base: 'flex', md: 'none'}}
                        propInfo={propInfo?.co_owners}
                      />
                    ) : null}
                    <StatusCard val={propInfo?.defaulting} />
                  </HStack>
                </HStack>
                <Grid
                  templateColumns={{
                    base: 'repeat(3, 1fr)',
                    md: `repeat(${propInfo?.co_owners?.length ? 4 : 3}, 1fr)`,
                  }}
                  // spacing={'18px'}
                  gap="20px"
                  justifyItems="flex-start"
                >
                  <VStack spacing="7px" align="left">
                    <Text
                      textAlign="start"
                      fontWeight="400"
                      fontSize={{base: '10px', md: '12px'}}
                      lineHeight="15px"
                      color="#606060"
                      whiteSpace={{md: 'nowrap'}}
                    >
                      Purchase Price
                    </Text>
                    <Text
                      textAlign="left"
                      fontWeight="500"
                      fontSize={{base: '12px', md: '14px'}}
                      lineHeight="18px"
                      color="#191919"
                      whiteSpace={'nowrap'}
                    >
                      {formatAmountWithDecimal(propInfo.purchase_price)}
                    </Text>
                  </VStack>
                  {!propInfo?.total_fractions ? (
                    <VStack display={{base: 'none', md: 'flex'}} spacing="7px" align="left">
                      <Text
                        textAlign="start"
                        fontWeight="400"
                        fontSize={{base: '10px', md: '12px'}}
                        lineHeight="15px"
                        color="#606060"
                      >
                        Outstanding balance
                      </Text>
                      <Text
                        display={'flex'}
                        gap="10px"
                        fontWeight="500"
                        fontSize={{base: '12px', md: '14px'}}
                        lineHeight="18px"
                        color="#191919"
                      >
                        {formatAmountWithDecimal(propInfo?.current_outstanding_balance)}
                      </Text>
                    </VStack>
                  ) : null}
                  <VStack spacing="7px" align="left">
                    <Text
                      fontWeight="400"
                      fontSize={{base: '10px', md: '12px'}}
                      lineHeight="15px"
                      textAlign="left"
                      color="#606060"
                    >
                      Unit type
                    </Text>
                    <Show above="md">
                      <Text
                        fontWeight="500"
                        fontSize={{base: '12px', md: '14px'}}
                        textAlign="left"
                        lineHeight="18px"
                        color="#191919"
                        minW="max-content"
                      >
                        {propInfo?.unit_type}
                      </Text>
                    </Show>
                    <Hide above="md">
                      <Text
                        fontWeight="500"
                        fontSize={{base: '12px', md: '14px'}}
                        textAlign="left"
                        lineHeight="18px"
                        color="#191919"
                        minW="max-content"
                      >
                        {truncateLongText(propInfo?.unit_type, 10)
                          ?.truncatedText.replace('...', '')
                          .trim()}
                      </Text>
                    </Hide>
                  </VStack>
                  {propInfo?.project?.payment_plan ? (
                    <VStack
                      display={{
                        base: propInfo?.defaulting === 'fractional' ? 'none' : 'flex',
                        md: 'flex',
                      }}
                      spacing="7px"
                      align="left"
                    >
                      <Text
                        fontWeight="400"
                        fontSize={{base: '10px', md: '12px'}}
                        lineHeight="15px"
                        textAlign="start"
                        color="#606060"
                      >
                        Payment
                      </Text>
                      <Text
                        fontWeight="500"
                        fontSize={{base: '12px', md: '14px'}}
                        textAlign="start"
                        lineHeight="18px"
                        color="#191919"
                        whiteSpace={'nowrap'}
                      >
                        {propInfo?.project?.payment_plan}
                      </Text>
                    </VStack>
                  ) : null}
                  {!propInfo?.total_fractions ? (
                    <VStack
                      display={{base: 'none', md: 'flex'}}
                      width="auto"
                      spacing="7px"
                      align="left"
                    >
                      <Text
                        textAlign="start"
                        fontWeight="400"
                        fontSize={{base: '10px', md: '12px'}}
                        lineHeight="15px"
                        color="#606060"
                      >
                        Total paid
                      </Text>
                      <Text
                        fontWeight="500"
                        fontSize={{base: '12px', md: '14px'}}
                        textAlign="start"
                        lineHeight="18px"
                        color="#191919"
                      >
                        {formatAmountWithDecimal(propInfo?.total_paid)}
                      </Text>
                    </VStack>
                  ) : null}
                  {!propInfo?.total_fractions ? (
                    <VStack
                      display={{base: 'none', md: 'flex'}}
                      width="auto"
                      spacing="7px"
                      align="left"
                    >
                      <Text
                        fontWeight="400"
                        fontSize={{base: '10px', md: '12px'}}
                        lineHeight="15px"
                        textAlign="start"
                        color="#606060"
                      >
                        Unit size
                      </Text>
                      <Text
                        fontWeight="500"
                        fontSize={{base: '12px', md: '14px'}}
                        lineHeight="18px"
                        color="#191919"
                      >
                        {`${propInfo.project?.unit_size}`}
                      </Text>
                    </VStack>
                  ) : null}
                  {propInfo?.co_owners.length !== 0 ? (
                    <CoOwners display={{base: 'none', md: 'flex'}} propInfo={propInfo?.co_owners} />
                  ) : null}
                  {propInfo?.total_fractions ? (
                    <VStack
                      display={{
                        base: propInfo?.defaulting === 'fractional' ? 'flex' : 'none',
                        md: 'flex',
                      }}
                      width="auto"
                      spacing="7px"
                      align="left"
                    >
                      <Text
                        fontWeight="400"
                        fontSize={{base: '10px', md: '12px'}}
                        textAlign="start"
                        lineHeight="15px"
                        color="#606060"
                      >
                        Total No. of Fractions
                      </Text>
                      <Text
                        fontWeight="500"
                        fontSize={{base: '12px', md: '14px'}}
                        textAlign="start"
                        lineHeight="18px"
                        color="#191919"
                      >
                        {`${propInfo?.total_fractions}`}
                      </Text>
                    </VStack>
                  ) : null}
                </Grid>
                <HStack justifySelf="flex-end" alignItems="center" spacing={{base: 2, md: 4}}>
                  <Button
                    mt={0}
                    minH="48px"
                    variant="secondary"
                    border="1px solid #4545FE"
                    py={'12px'}
                    px={'24px'}
                    color="#4545FE"
                    borderRadius={{base: '45px', lg: '12px'}}
                    fontWeight={500}
                    fontSize={{base: '11px', lg: 'md'}}
                    w={{base: 'max-content', lg: '205px'}}
                    onClick={() => OpenDrawer(propInfo)}
                  >
                    View Transactions
                    {/* View Details */}
                  </Button>
                  {propInfo?.feedback.feedback.length > 0 ? (
                    <Button
                      minH="48px"
                      onClick={() => handleSeeReviewClick(propInfo)}
                      variant="default"
                      py={'12px'}
                      px={'24px'}
                      height="48px"
                      border="1px solid #12D8A0"
                      borderRadius={{base: '45px', lg: '12px'}}
                      fontWeight={500}
                      lineHeight="20px"
                      textAlign="center"
                      color="#12D8A0"
                      fontSize={{base: '11px', lg: 'md'}}
                      w={{base: 'max-content', lg: '205px'}}
                    >
                      See review
                    </Button>
                  ) : null}
                </HStack>
              </Stack>
            </Flex>
          ))
        )}
        <TransactionDetailsDrawer
          modalDisclosure={transactionDrawer}
          runQuery={runQuery}
          equityId={equityId}
          userId={query?.id}
          unit={unit}
        />
        <See_review isOpen={isOpen} onClose={onClose} data={selectedData} />
      </VStack>
    </div>
  );
};

export const StatusCard = ({val}) => {
  let statusValue = val?.toLowerCase();
  let color =
    statusValue == 'completed'
      ? '#4545FE'
      : statusValue == 'defaulting'
      ? '#FF9103'
      : statusValue == 'terminated'
      ? '#FF3636'
      : statusValue == 'not defaulting'
      ? '#064B38'
      : statusValue == 'fractional'
      ? '#4545FE'
      : 'lightgray';
  let bg =
    statusValue == 'completed'
      ? 'rgba(69, 69, 254, 0.10)'
      : statusValue == 'defaulting'
      ? 'rgba(255, 145, 3, 0.10)'
      : statusValue == 'suspended'
      ? 'rgba(255, 54, 54, 0.1)'
      : statusValue == 'terminated'
      ? 'rgba(255, 54, 54, 0.10)'
      : statusValue == 'not defaulting'
      ? '#E7FBF5'
      : statusValue == 'fractional'
      ? 'rgba(69, 69, 254, 0.10)'
      : '#FFFFFF';
  return (
    <Tag p={'8px 13px'} w="fit-content" color={color} bg={bg} borderRadius="48px">
      <TagLabel fontSize={{base: 'xs', md: 'md'}} mx="auto">
        {val}
      </TagLabel>
    </Tag>
  );
};

export const EmptyStateView = ({text}) => {
  return (
    <VStack
      align="center"
      justify="center"
      // width="888px"
      w="full"
      height="276px"
      background="#FFFFFF"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      borderRadius="16px"
    >
      <Image src={emptyIcon?.src} alt="empty_state" />
      <Text fontSize="20px" fontWeight="700">
        Nothing Found
      </Text>
      <Text pt="20px" fontWeight="400" fontSize="14px" lineHeight="18px" color="#606060">
        {text ?? 'Empty data'}
      </Text>
    </VStack>
  );
};
