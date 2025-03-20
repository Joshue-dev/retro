import {
  Box,
  Flex,
  Image,
  Button,
  HStack,
  Tag,
  TagLabel,
  Text,
  VStack,
  Show,
  Hide,
  Stack,
  useBreakpointValue,
  Center,
} from '@chakra-ui/react';
import Link from 'next/link';
import {themeStyles} from '/src/theme';
import {changeDateFormat} from '../utils/formatDate';
import defaultImage from '/src/images/image-fallback.png';
import {priceString} from '../utils/formatAmount';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {Fragment} from 'react';
import {truncateLongText} from 'utils/truncateLongText';

export const FRACTIONAL_TXNS_COLUMNS = data => [
  {
    Header: 'Name',
    accessor: row => {
      return (
        <>
          <HStack textAlign={'left'} align="center" spacing="11px">
            <Image
              borderRadius="full"
              height="48px"
              alt="avatar"
              width="47.29px"
              src={row?.owner?.avatar ?? avatarFallback.src}
            />
            <Text
              pr="7px"
              fontSize="14px"
              maxW="156px"
              whiteSpace="break-spaces"
              wordWrap={'break-word'}
            >
              {`${row.owner.first_name} ${row.owner.last_name}`}
            </Text>
          </HStack>
        </>
      );
    },
  },
  {
    Header: 'No. of Fraction',
    accessor: row => {
      return (
        <Text fontSize={'14px'} textAlign={'left'} pl="7px" wordWrap="break-word">
          {row?.amount}
        </Text>
      );
    },
  },
  {
    Header: 'Purchase price',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text
          textAlign={'left'}
          pl={2}
          fontWeight="600"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
        >
          {priceString('naira', row?.purchase_price)}
        </Text>
      );
    },
  },
  {
    Header: 'Fractional value',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text
          textAlign={'left'}
          pl={2}
          fontWeight="600"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
        >
          {priceString('naira', row?.equity_value)}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign={'left'} fontWeight="400" fontSize="12px" lineHeight="18px" color="#191919">
          {changeDateFormat(row?.created_at)}
        </Text>
      );
    },
  },
];

export const LISTINGS_TRANSACTIONS = data => [
  {
    Header: 'Name',
    accessor: row => {
      return (
        <>
          {row?.co_owners?.length ? (
            <HStack textAlign={'left'} spacing="11px">
              <Box position="relative">
                <Box
                  px="5px"
                  fontSize={'10px'}
                  borderRadius={'full'}
                  bg="#4545FE"
                  color="#FFFFFF"
                  position={'absolute'}
                  right={'-1.7%'}
                >
                  {'+' + row?.co_owners?.length}
                </Box>
                <Image
                  borderRadius="full"
                  height="48px"
                  alt="avatar"
                  width="47.29px"
                  src={row.avatar}
                />
              </Box>
              <Flex pr="7px">
                <Text fontSize="14px" wordWrap={'break-word'}>
                  {row?.name?.split(' ')[0] + ' & '}
                </Text>
                <Text color={'#4545FE'} fontSize="14px">
                  {` ${row?.co_owners?.length} others`}
                </Text>
              </Flex>
            </HStack>
          ) : (
            <HStack textAlign={'left'} spacing="11px">
              <Image
                borderRadius="full"
                height="48px"
                alt="avatar"
                width="47.29px"
                src={row.customer?.avatar}
              />
              <Text pr="7px" fontSize="14px" wordWrap={'break-word'}>
                {row?.customer?.first_name} {row?.customer?.last_name}
              </Text>
            </HStack>
          )}
        </>
      );
    },
  },

  {
    Header: 'Purchase Price',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign="start" fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {priceString('naira', row?.purchase_price)}
        </Text>
      );
    },
  },
  {
    Header: 'Total Paid',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign="start" fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {priceString('naira', row?.total_paid)}
        </Text>
      );
    },
  },
  {
    Header: 'Outstanding balance',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text fontWeight="600" fontSize="14px" textAlign="start" lineHeight="18px" color="#191919">
          {priceString('naira', row?.outstanding_balance)}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign={'left'} fontWeight="400" fontSize="12px" lineHeight="18px" color="#191919">
          {/* {a + year} */}
          {changeDateFormat(row?.date)}
        </Text>
      );
    },
  },
  {
    Header: 'Status',
    accessor: row => {
      let statusValue = row?.status?.toLowerCase();
      let color =
        statusValue == 'completed'
          ? '#381E87'
          : statusValue == 'defaulting'
          ? '#FF9103'
          : statusValue == 'suspended'
          ? '#FF3636'
          : statusValue == 'not defaulting'
          ? '#08C48F'
          : statusValue == 'transfered'
          ? '#606060'
          : 'lightgray';
      let bg =
        statusValue == 'completed'
          ? 'rgba(103, 169, 210, 0.2)'
          : statusValue == 'defaulting'
          ? 'rgba(255, 145, 3, 0.1)'
          : statusValue == 'suspended'
          ? 'rgba(255, 54, 54, 0.1)'
          : statusValue == 'not defaulting'
          ? '#DBFFF5'
          : statusValue == 'transfered'
          ? '#F5F5F5'
          : 'lightgray';
      return (
        <HStack alignItems="flex-start">
          <Tag p={'8px 13px'} w="fit-content" color={color} bg={bg} borderRadius="48px">
            <TagLabel mx="auto">{row?.status}</TagLabel>
          </Tag>
        </HStack>
      );
    },
  },
];

export const LISTINGSVIEWCOLUMN = data => [
  {
    Header: 'Listings',
    accessor: row => {
      return <TableCellContent row={row} />;
    },
  },
  {
    Header: 'Location',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign={'left'} pr={3} wordBreak="break-word" 
        textOverflow={`ellipsis`}
        maxW={`157px`}
              whiteSpace={`nowrap`}
        overflow={`hidden`}>
          {row?.landmark ?? row?.address}
        </Text>
      );
    },
  },
  {
    Header: 'Sold Units',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      const sold = row?.units_sold;
      const noSoldOutUnits = sold == 0;
      const total_available_units = row?.units_available;
      const noAvailableUnits = total_available_units == sold;
      const soldPercentage = row ? (sold / total_available_units) * 100 : 0;
      const totalPercentage = 100 - soldPercentage;

      return (
        <Flex direction="column" gap="11px" align="center">
          <Text
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            color="#191919"
          >{`${sold}/${total_available_units}`}</Text>
          <HStack mx="auto" w="157px" gap={'0.8px'} spacing={0} borderRadius={'30px'}>
            <Box
              w={`${soldPercentage}%`}
              borderRadius={noAvailableUnits ? '30px' : '30px 0 0 30px'}
              h="10px"
              bg={themeStyles.color.matador__red}
            />
            <Box
              w={`${totalPercentage}%`}
              borderRadius={noSoldOutUnits ? '30px' : '0 30px 30px 0'}
              h="10px"
              bg={'teal.400'}
            />
          </HStack>
        </Flex>
      );
    },
  },
  {
    Header: 'Created Date',
    display: {base: 'none', lg: 'table-cell'},
    textAlign: 'center',
    accessor: row => {
      return (
        <Text fontWeight="400" fontSize="14px" lineHeight="20px" color="#191919">
          {row && changeDateFormat(row?.created_at)}
        </Text>
      );
    },
  },
  {
    Header: 'Commission',
    // hideHeader: true,
    accessor: row => {
      return (
        <Text
          textAlign={{lg: 'start'}}
          fontSize={{base: '12px', lg: '16px'}}
          fontWeight={{base: '600', lg: '400'}}
          color={{base: '#191919'}}
        >
          {row.external_commission_rate}%
        </Text>
      );
    },
  },
  {
    Header: 'Action',
    paddingInlineEnd: 0,
    hideHeader: true,
    accessor: row => {
      return <TableLink row={row} />;
    },
  },
];
export default LISTINGSVIEWCOLUMN;

const TableLink = ({row}) => {
  return (
    <Fragment>
      <Show breakpoint="(min-width: 768px)">
        <Link prefetch={false} href={`/agents/listings/manage/${row?.id}`}>
          <Button
            borderRadius="12px"
            w="115px"
            h="40px"
            color={'#4545FE' || themeStyles.color.primary}
            borderColor={'#4545FE' || themeStyles.color.primary}
            variant="outline"
            fontWeight={400}
          >
            View
          </Button>
        </Link>
      </Show>
      <Hide breakpoint="(min-width: 768px)">
        <Flex justifyContent={`flex-end`}>
          <Link display={'contents'} prefetch={false} href={`/agents/listings/manage/${row?.id}`}>
            <ChevronRightIcon fontSize={20} color={'#4545FE'} marginLeft={-10} />
          </Link>
        </Flex>
      </Hide>
    </Fragment>
  );
};

const TableCellContent = ({row, cell}) => {
  const listingName = useBreakpointValue({
    base: truncateLongText(row?.name, 14).truncatedText,
    lg:truncateLongText(row?.name, 20).truncatedText,
  });
  return (
    <HStack mx="auto" spacing="21px" flex="1">
      <Stack gap={0} w={'max-content'}>
        <Center
          position={'relative'}
          height={{base: '40px', lg: '48px'}}
          width={{base: '40px', lg: '48px'}}
          borderRadius="12px"
          overflow={'hidden'}
        >
          <Image
            alt=""
            src={row?.photos[0]?.photo ?? defaultImage?.src}
            minH="100%"
            minW="100%"
            objectFit={'cover'}
            fill
          />
        </Center>
      </Stack>
      <VStack align={'flex-start'} spacing={1} width={{base: '50%', lg: 'unset'}}>
        <Text
          fontWeight={{base: 500, lg: 400}}
          fontSize={{base: '14px', lg: 'md'}}
          textTransform={'capitalize'}
          color={'#191919'}
          textAlign={'left'}
          w={`max-content`}
          
        >
          {listingName}
          {/* {row?.name} */}
        </Text>
        <Text
          color={'#475467'}
          textAlign={'left'}
          fontSize={{base: '14px', lg: 'md'}}
          display={{base: 'flex', lg: 'none'}}
          w={`max-content`}
        >
          {truncateLongText(row?.landmark ?? row?.address, 14).truncatedText}
          {/* {row?.address} */}
        </Text>
      </VStack>
    </HStack>
  );
};
