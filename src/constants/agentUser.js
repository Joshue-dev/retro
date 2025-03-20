import {
  HStack,
  Image,
  Text,
  Button,
  Tag,
  TagLabel,
  Show,
  Hide,
  VStack,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import {changeDateFormat} from '../utils/formatDate';
import {Fragment} from 'react';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {truncateLongText} from 'utils/truncateLongText';

export const AGENT_USERS_COLUMN = [
  {
    Header: 'Name',
    accessor: row => {
      return <TableCellContent row={row} />;
    },
  },

  {
    Header: 'Email',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => (
      <HStack maxW="250px" justify="flex-start">
        <Text
          as="span"
          maxW="250px"
          fontSize="14px"
          wordWrap="break-word"
          whiteSpace="break-spaces"
          textAlign="left"
          fontWeight="400"
          color="#4545FE"
        >
          <a style={{background: '', width: '150px'}} href={`mailto:${row.email}`}>
            {row.email}
          </a>
        </Text>
      </HStack>
    ),
  },
  {
    Header: 'Phone',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => (
      <HStack justify="start" w="full">
        <Text
          as="span"
          wordBreak="break-all"
          textAlign="start"
          color="#191919"
          fontSize="16px"
          fontWeight="400"
          textTransform="capitalize"
        >
          {row?.phone}
        </Text>
      </HStack>
    ),
  },
  {
    Header: 'Joined Date',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => (
      <HStack justify="start" w="full">
        <Text
          w="full"
          as="span"
          wordBreak="break-all"
          textAlign="start"
          color="#191919"
          fontSize="16px"
          fontWeight="400"
          textTransform="capitalize"
        >
          {changeDateFormat(row?.date_joined)}
        </Text>
      </HStack>
    ),
  },
  {
    Header: 'Status',
    accessor: row => {
      const bgScheme = row?.status ? '#DBFFF5' : '#F5F5F5';
      const colorScheme = row?.status ? '#08C38F' : '#606060';

      return (
        <Tag
          px="13px"
          py="8px"
          size="lg"
          color={colorScheme}
          bg={bgScheme}
          borderRadius="48px"
          fontSize="16px"
          fontWeight="500"
        >
          <TagLabel mx="auto">{row?.status ? 'Active' : 'Inactive'}</TagLabel>
        </Tag>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => <TableLink row={row} />,
  },
];

const TableLink = ({row}) => {
  return (
    <Fragment>
      <Show breakpoint="(min-width: 768px)">
        <Link prefetch={false} href={`/agents/users/customer_profile/${row?.id}`}>
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
        <Link
          display={'contents'}
          prefetch={false}
          href={`/agents/users/customer_profile/${row?.id}`}
        >
          <Box pr={3}>
            <ChevronRightIcon fontSize={20} color={'#4545FE'} />
          </Box>
        </Link>
      </Hide>
    </Fragment>
  );
};

const TableCellContent = ({row}) => {
  const userName = useBreakpointValue({
    base: truncateLongText(row?.name, 10).truncatedText,
    lg: row?.name,
  });
  return (
    <HStack mx="auto" spacing="21px" width={{base: '125px', lg: 'auto'}}>
      <Image
        alt=""
        height={{base: '40px', lg: '48px'}}
        width={{base: '40px', lg: '48px'}}
        borderRadius="12px"
        src={row?.img ?? row?.img[0]}
      />
      <VStack align={'flex-start'} spacing={1}>
        <Text
          fontWeight={{base: 500, lg: 400}}
          fontSize={{base: '14px', lg: 'md'}}
          textTransform={'capitalize'}
          color={'#191919'}
          textAlign={'left'}
        >
          {userName}
        </Text>
        <Text
          color={'#4545FE'}
          textAlign={'left'}
          fontSize={{base: '12px', lg: 'md'}}
          whiteSpace={{base: 'normal', lg: 'nowrap'}}
          display={{base: 'block', lg: 'none'}}
          width={'100px'}
        >
          {truncateLongText(row?.email, 12).truncatedText}
        </Text>
      </VStack>
    </HStack>
  );
};
