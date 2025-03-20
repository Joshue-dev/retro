import {Button, HStack, Image, Tag, TagLabel, Text} from '@chakra-ui/react';

import defaultImage from '/src/images/image-fallback.png';

import {changeDateFormat} from '../../utils/formatDate';
import HoverText from '../../page.components/agents_components/account/HoverText';
import {priceString} from '../../utils/formatAmount';
import HoverOnAccountAmount from '../../page.components/agents_components/account/HoverOnAccountAmount';
import ViewButton from 'pages/agents/account/viewButton';

export const RECENT_TRANSACTIONS = [
  {
    Header: 'Client',
    accessor: row => {
      return (
        <HStack mx="auto" spacing="21px">
          <Image
            alt=""
            height="48px"
            textTransform="capitalize"
            width="47.29px"
            borderRadius="full"
            objectFit="cover"
            src={row?.customer?.avatar}
          />
          <Text
            w="79px"
            textTransform="capitalize"
            fontWeight="500"
            fontSize="16px"
            textAlign="start"
          >
            {`${row?.customer?.user?.first_name} ${row?.customer?.user?.last_name}`}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Property',
    accessor: row => {
      return <HoverText text={`${row?.unit?.project?.name},${row?.unit?.unit_title}`} />;
    },
  },
  {
    Header: 'Commission rate',
    accessor: row => {
      return (
        <Text textAlign="left" fontSize="16px" fontWeight="400">
          10%
        </Text>
      );
    },
  },
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          w="150px"
          whiteSpace="break-spaces"
          fontSize="16px"
          fontWeight="400"
          color="#12D8A0"
        >
          {priceString('naira', row.amount_paid)}
        </Text>
      );
    },
  },

  {
    Header: 'Date received ',
    accessor: row => {
      return (
        <HStack spacing="none" justify="start">
          <Text
            as="span"
            textAlign="start"
            color="#191919"
            fontSize="16px"
            w="full"
            fontWeight="400"
          >
            {changeDateFormat(row.created_at, 'add_time').split('|')[0]}
            {' | '}
            <Text
              as="span"
              textAlign="start"
              color="#606060"
              fontSize="16px"
              w="full"
              fontWeight="400"
            >
              {changeDateFormat(row.created_at, 'add_time').split('|')[1]}
            </Text>
          </Text>
        </HStack>
      );
    },
  },
];

export const UPCOMING_PAYMENTS_COLUMN = [
  {
    Header: 'Name',
    accessor: row => {
      return (
        <HStack mx="auto" spacing="21px">
          <Image
            alt=""
            height="48px"
            textTransform="capitalize"
            width="47.29px"
            borderRadius="full"
            objectFit="cover"
            src={row?.owner?.avatar}
          />
          <Text
            w="79px"
            whiteSpace="break-spaces"
            wordBreak="keep-all"
            overflowWrap="normal"
            textTransform="capitalize"
            fontWeight="500"
            fontSize="16px"
            textAlign="start"
          >
            {`${row?.owner?.first_name} ${row?.owner?.last_name}`}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Property',
    accessor: row => {
      return <HoverText text={row?.project_name} />;
    },
  },

  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          w="150px"
          whiteSpace="break-spaces"
          fontSize="16px"
          fontWeight="400"
          color="#191919"
        >
          {priceString('naira', row.amount)}
        </Text>
      );
    },
  },

  {
    Header: 'Date',
    accessor: row => {
      return (
        <HStack spacing="none" justify="start">
          <Text
            as="span"
            textAlign="start"
            color="#191919"
            fontSize="16px"
            w="full"
            fontWeight="400"
          >
            {changeDateFormat(row.created_at)}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'status',
    hideHeader: true,
    accessor: row => {
      return (
        <HStack spacing="none" justify="start">
          <Button
            color="#4545FE"
            fontSize="16px"
            bg="#ffffff"
            borderRadius="12px"
            border="1px solid #4545FE"
            fontWeight="500"
          >
            View Breakdown
          </Button>
        </HStack>
      );
    },
  },
];

export const WITHDRAWALS = [
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="16px"
          color="#FF3636"
          fontWeight="500"
        >
          {priceString('naira', row?.amount)}
        </Text>
      );
    },
  },
  {
    Header: 'Balance before',
    accessor: row => {
      return (
        <Text textAlign="start" whiteSpace="break-spaces" fontSize="16px" fontWeight="500">
          {priceString('naira', row?.balance_before_transaction)}
        </Text>
      );
    },
  },

  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text fontWeight="400" fontSize="16px" textAlign="start">
          {row && changeDateFormat(row?.created_at, 'add_time')}
          {/* 5th August 9:00am */}
        </Text>
      );
    },
  },
  {
    Header: 'Bank',
    accessor: row => {
      return (
        <Text
          fontWeight="400"
          textAlign="start"
          w="100px"
          whiteSpace="break-spaces"
          fontSize="16px"
        >
          {row?.bank_name || '-'}
        </Text>
      );
    },
  },
  {
    Header: 'Reference ID',
    accessor: row => {
      return (
        <Text textAlign="start" fontSize="16px" fontWeight="400">
          {/* 1847494022 */}
          {row?.reference}
        </Text>
      );
    },
  },
];

export const ACCOUNT_TRANSACTIONS_COLUMN = [
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text fontWeight="400" fontSize="16px" textAlign="start">
          {/* {row && changeDateFormat(row?.created_at)} */}
          {row && row?.date}
        </Text>
      );
    },
  },
  {
    Header: 'Description',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="16px"
          color="#191919"
          fontWeight="400"
        >
          {row && row?.description}
        </Text>
      );
    },
  },
  {
    Header: 'Reference',
    accessor: row => {
      return (
        <Text textAlign="start" fontSize="16px" fontWeight="400">
          {row && row?.reference}
        </Text>
      );
    },
  },
  {
    Header: 'Debit',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="14px"
          fontWeight="600"
          color="#FF6A6A"
        >
          {priceString('naira', row?.debit)}
        </Text>
      );
    },
  },
  {
    Header: 'Deposit',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="14px"
          fontWeight="600"
          color="#12D8A0"
        >
          {priceString('naira', row?.deposit)}
        </Text>
      );
    },
  },
  {
    Header: 'Balance',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="14px"
          fontWeight="600"
          color="#191919"
        >
          {priceString('naira', row?.balance)}
        </Text>
      );
    },
  },
];

export const OUTSTANDING_BALANCE_ACCOUNT = [
  {
    Header: 'Listing',
    accessor: row => {
      return (
        <HStack mx="auto" spacing="21px">
          <Image
            alt=""
            height="48px"
            textTransform="capitalize"
            width="47.29px"
            borderRadius="full"
            objectFit="cover"
            src={row?.avatar}
          />
          <Text
            w="79px"
            whiteSpace="break-spaces"
            wordBreak="keep-all"
            overflowWrap="normal"
            textTransform="capitalize"
            fontWeight="500"
            fontSize="16px"
            textAlign="start"
          >
            {row?.name}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Property',
    accessor: row => {
      return <HoverText text={row?.project_name} />;
    },
  },
  {
    Header: 'Purchase price',
    accessor: row => {
      return (
        <Text textAlign="start" fontSize="16px" fontWeight="400">
          {<HoverOnAccountAmount text={row?.purchase_price} />}
        </Text>
      );
    },
  },
  {
    Header: 'Total paid',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          w="150px"
          whiteSpace="break-spaces"
          fontSize="16px"
          fontWeight="400"
          color="#12D8A0"
        >
          {<HoverOnAccountAmount text={row?.total_paid} Textcolor="#12D8A0" />}
        </Text>
      );
    },
  },
  {
    Header: 'Outstanding balance',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          w="150px"
          whiteSpace="break-spaces"
          fontSize="16px"
          fontWeight="400"
          color="#12D8A0"
        >
          {<HoverOnAccountAmount text={row?.outstanding_balance} Textcolor="#FF3636" />}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return (
        <HStack spacing="none" justify="start">
          <Text
            as="span"
            textAlign="start"
            color="#191919"
            fontSize="16px"
            w="full"
            fontWeight="400"
          >
            {row?.created_at}
          </Text>
        </HStack>
      );
    },
  },

  {
    Header: 'Status',
    accessor: row => {
      const colorScheme = {
        Defaulting: {
          color: '#FF9103',
          bg: 'rgba(255, 145, 3, 0.10)',
        },
        'Not defaulting': {
          color: '#08C38F',
          bg: '#DBFFF5',
        },
      };
      return (
        <Tag
          px="13px"
          py="8px"
          borderRadius="48px"
          bg={colorScheme['Not defaulting'].bg}
          color={colorScheme['Not defaulting'].color}
        >
          <TagLabel mx="auto" fontWeight="500" fontSize="16px">
            {row?.status}
          </TagLabel>
        </Tag>
      );
    },
  },
];

export const TOTAL_PURCHASE_FOR_ACCOUNT = [
  {
    Header: 'Listing',
    accessor: row => {
      return (
        <HStack mx="auto" spacing="21px">
          <Image
            alt=""
            height="48px"
            textTransform="capitalize"
            width="47.29px"
            objectFit="cover"
            src={row?.project_info?.photos}
            borderRadius="12px"
          />
          <Text
            w="79px"
            whiteSpace="break-spaces"
            wordBreak="keep-all"
            overflowWrap="normal"
            textTransform="capitalize"
            fontWeight="500"
            fontSize="16px"
            textAlign="start"
          >
            <HoverText text={row?.project_name} />
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Location',
    accessor: row => {
      return (
        <HoverText
          text={`${row?.project_info?.address ?? '-'}
          `}
        />
      );
    },
  },
  {
    Header: 'Total Purchase',
    accessor: row => {
      return (
        <Text textAlign="start" fontSize="16px" fontWeight="400">
          {<HoverOnAccountAmount text={row.purchase_price} />}
        </Text>
      );
    },
  },
  {
    Header: 'Total paid',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          w="150px"
          whiteSpace="break-spaces"
          fontSize="16px"
          fontWeight="400"
          color="#12D8A0"
        >
          {<HoverOnAccountAmount text={row.total_paid} Textcolor="#12D8A0" />}
        </Text>
      );
    },
  },
  {
    Header: 'Outstanding balance',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          w="150px"
          whiteSpace="break-spaces"
          fontSize="16px"
          fontWeight="400"
          color="#12D8A0"
        >
          {<HoverOnAccountAmount text={row.outstanding_balance} Textcolor="#FF3636" />}
        </Text>
      );
    },
  },
  {
    Header: 'status',
    hideHeader: true,
    accessor: row => {
      return <ViewButton rowData={row} />;
    },
  },
];
