import React, {Fragment} from 'react';
import {
  Badge,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {themeStyles} from '/src/theme';

// import mostSharedImg from '/src/images/image-fallback.png';
import watchlistIcon from '/src/images/icons/watchlist-icon.png';
import expandIcon from '/src/images/icons/expand-icon.png';
import draftsIcon from '/src/images/icons/drafts-icon.png';
import archiveIcon from '/src/images/icons/archived-icon.png';
// import {Filter} from '../../../../customers/customer_overview/TopHeader/Filters';
import {useQuery} from 'react-query';
import {Button} from '../../../../../../ui-lib/ui-lib.components';
import ListingsPieChart from '../../../../../../components/Charts/ListingsPieChart';
// import { Button } from '../../../../../../ui-lib/ui-lib.components';

export default function ExpandedHeader({handleCollapsed, listingType, setListingType, data}) {
  return (
    <Fragment>
      {/* <Heading fontFamily='Euclid Circular B' {...themeStyles.textStyles.h3}>Listings</Heading> */}

      <Box mb="40px">
        <Flex justify="center" gap="25px" align="center" mt={6}>
          <ListingOverviewDetails
            overviewDetails={data}
            listingType={listingType}
            setListingType={setListingType}
          />
          {/* <ListingOverviewSummary /> */}
        </Flex>
      </Box>
    </Fragment>
  );
}

const ListingOverviewDetails = ({overviewDetails, listingType, setListingType}) => {
  const listingOverviewData = [
    {
      value: overviewDetails?.total_listings ?? 0,
      desc: 'Total Number of listings',
    },
    {
      value: overviewDetails?.available_listings ?? 0,
      desc: 'Total Available listings',
    },
    {
      value: overviewDetails?.soldout_listings ?? 0,
      desc: 'Total Sold-out listings',
    },
    {
      value: overviewDetails?.total_units ?? 0,
      desc: 'Total Number of Units',
    },
    {
      value: overviewDetails?.total_available_units ?? 0,
      desc: 'Total Available units',
    },
    {
      value: overviewDetails?.total_sold_unit_by_agent ?? 0,
      desc: 'Total Sold units',
    },
  ];
  return (
    <Container {...themeStyles.containerStyles} padding="19px" minW="fit-content">
      <Flex gap="22px" mx="auto" align="center" justify="space-between" w="full">
        <VStack
          background="#FFFFFF"
          border="1px solid #F5F5F5"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          borderRadius="16px"
          align="center"
          width="380px"
          px="33px"
          h="fit-content"
          minH="256px"
          py="22px"
        >
          <ListingsPieChart
            title="Total listings"
            A={overviewDetails?.['total_sold-out_listings'] ?? 0}
            B={overviewDetails?.total_available_listings ?? 0}
          />
          <HStack
            align="center"
            fontWeight="400"
            fontSize="18px"
            lineHeight="23px"
            w="full"
            justify="space-between"
          >
            <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
              <Box alignSelf={'center'} bg="#5A3FFF" boxSize={'13.81px'} />
              Total available listings
            </Text>
            <Text color="#191919">{overviewDetails?.total_available_listings ?? 0}</Text>
          </HStack>
          <HStack
            align="center"
            fontWeight="400"
            fontSize="18px"
            lineHeight="23px"
            w="full"
            justify="space-between"
          >
            <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
              <Box alignSelf={'center'} bg="#1ED6FF" boxSize={'13.81px'} />
              Total sold-out listings
            </Text>
            <Text color="#191919">{overviewDetails?.['total_sold-out_listings'] ?? 0}</Text>
          </HStack>
        </VStack>
        <VStack
          background="#FFFFFF"
          border="1px solid #F5F5F5"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          borderRadius="16px"
          align="center"
          width="380px"
          px="33px"
          h="fit-content"
          minH="256px"
          py="22px"
        >
          <ListingsPieChart
            title="Total units"
            A={overviewDetails?.total_sold_units ?? 0}
            B={overviewDetails?.total_available_units ?? 0}
          />
          <HStack
            align="center"
            fontWeight="400"
            fontSize="18px"
            lineHeight="23px"
            w="full"
            justify="space-between"
          >
            <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
              <Box alignSelf={'center'} bg="#5A3FFF" boxSize={'13.81px'} />
              Total available units
            </Text>
            <Text color="#191919">{overviewDetails?.total_available_units ?? 0}</Text>
          </HStack>
          <HStack
            align="center"
            fontWeight="400"
            fontSize="18px"
            lineHeight="23px"
            w="full"
            justify="space-between"
          >
            <Text display={'flex'} gap="11px" color="rgba(25, 25, 25, 0.6)">
              <Box alignSelf={'center'} bg="#1ED6FF" boxSize={'13.81px'} />
              Total sold-out units
            </Text>
            <Text color="#191919">{overviewDetails?.total_sold_unit_by_agent ?? 0}</Text>
          </HStack>
        </VStack>
      </Flex>
    </Container>
  );
};

const ListingOverviewSummary = () => {
  const {data} = useQuery(['dashboard'], fetchDashboardData);

  const DEVELOPER_DASHBOARD_DATA = data && [data][0]?.data?.dashboard_data;
  return (
    // <Box {...themeStyles.lg_Box} w='100%' p={6} textAlign='left'>
    // 	<Text {...themeStyles.textStyles.p_lg_strong}>Overview</Text>
    // 	<HStack justify='space-between'>
    // 		<Box my={4}>
    // 			<Text>Most viewed</Text>
    // 			<Divider />
    // 			<Flex gap={4} pt={3}>
    // 				<Image src={mostSharedImg.src} width='67px' height='68px' />
    // 				<Stack align='flex-start' spacing={1}>
    // 					<Text fontWeight='bold' as='p'>
    // 						Plaza Decan
    // 					</Text>
    // 					<Text as='small'>Construed</Text>
    // 				</Stack>
    // 			</Flex>
    // 		</Box>
    // 		<Box>
    // 			<Text>Most shared</Text>
    // 			<Divider />
    // 			<Flex gap={4} pt={3}>
    // 				<Image src={mostSharedImg.src} width='67px' height='68px' />
    // 				<Stack align='flex-start' spacing={1}>
    // 					<Text fontWeight='bold' as='p'>
    // 						Plaza Decan
    // 					</Text>
    // 					<Text as='small'>Construed</Text>
    // 				</Stack>
    // 			</Flex>
    // 		</Box>
    // 	</HStack>
    // 	<HStack justify='space-between'>
    // 		<Box>
    // 			<Text>Most watchlisted</Text>
    // 			<Divider />
    // 			<Flex gap={4} pt={3}>
    // 				<Image src={mostSharedImg.src} width='67px' height='68px' />
    // 				<Stack align='flex-start' spacing={1}>
    // 					<Text fontWeight='bold' as='p'>
    // 						Plaza Decan
    // 					</Text>
    // 					<Text as='small'>Construed</Text>
    // 				</Stack>
    // 			</Flex>
    // 		</Box>
    // 		<Box {...themeStyles.transactionBox}>
    // 			<HStack justify='space-between'>
    // 				<Text as='h2'>204</Text>
    // 				<Image width='24px' height='24px' src={watchlistIcon.src} />
    // 			</HStack>
    // 			<Text as='small'>Number of watchlists</Text>
    // 		</Box>
    // 	</HStack>
    // </Box>
    <Box {...themeStyles.lg_Box} w="100%" px={8} py={4} align="left">
      <Text {...themeStyles.textStyles.p_lg_strong} mb={4} pb={1}>
        Listing Overview
      </Text>
      <HStack justify="space-between">
        <Box my={4}>
          <Text>Most viewed</Text>
          <Divider />
          <Flex gap={4} pt={3}>
            <Image
              alt=""
              src={
                DEVELOPER_DASHBOARD_DATA?.most_viewed?.project.length
                  ? DEVELOPER_DASHBOARD_DATA?.most_viewed?.project[0]?.photos[0]?.photo
                  : mostSharedImg.src
              }
              width="67px"
              height="68px"
              border="1px solid #F5F5F5"
              borderRadius="xl"
            />
            <Stack align="flex-start" spacing={1}>
              <Text fontWeight="bold" as="p">
                {DEVELOPER_DASHBOARD_DATA?.most_viewed.project &&
                  DEVELOPER_DASHBOARD_DATA?.most_viewed?.project[0]?.name}
              </Text>
              {DEVELOPER_DASHBOARD_DATA?.most_viewed?.project[0]?.created_by && (
                <Text fontSize="10px">
                  Constructed by{' '}
                  <b>
                    {DEVELOPER_DASHBOARD_DATA?.most_viewed?.project[0]?.created_by.company_name}
                  </b>
                </Text>
              )}
              {DEVELOPER_DASHBOARD_DATA?.most_viewed?.most_views && (
                <Text fontSize="10px" color={themeStyles.color.primary}>
                  Viewed <b>{DEVELOPER_DASHBOARD_DATA?.most_viewed?.most_views}</b>{' '}
                  {DEVELOPER_DASHBOARD_DATA?.most_viewed?.most_views > 1 ? 'times' : 'time'}
                </Text>
              )}
            </Stack>
          </Flex>
        </Box>
        <Box my={4}>
          <Text>Most shared</Text>
          <Divider />
          <Flex gap={4} pt={3}>
            <Image
              alt=""
              src={
                DEVELOPER_DASHBOARD_DATA?.most_shared?.project[0]?.photos[0]?.photo ??
                mostSharedImg.src
              }
              width="67px"
              height="68px"
              border="1px solid #F5F5F5"
              borderRadius="xl"
            />
            <Stack align="flex-start" spacing={1}>
              <Text fontWeight="600" as="p" fontSize="16px">
                {DEVELOPER_DASHBOARD_DATA?.most_shared?.project[0]?.name}
              </Text>
              {DEVELOPER_DASHBOARD_DATA?.most_shared?.project[0]?.created_by && (
                <Text fontSize="10px">
                  Constructed by{' '}
                  <b>
                    {DEVELOPER_DASHBOARD_DATA?.most_shared?.project[0]?.created_by.company_name}
                  </b>
                </Text>
              )}
              {DEVELOPER_DASHBOARD_DATA?.most_shared?.times_shared && (
                <Text fontSize="10px" color={themeStyles.color.primary}>
                  Shared {DEVELOPER_DASHBOARD_DATA?.most_shared?.times_shared}{' '}
                  {DEVELOPER_DASHBOARD_DATA?.most_shared?.times_shared > 1 ? 'times' : 'time'}
                </Text>
              )}
            </Stack>
          </Flex>
        </Box>
      </HStack>
      <HStack justify="space-between">
        <Box>
          <Text>Most watchlisted</Text>
          <Divider />
          <Flex gap={4} pt={3}>
            <Image
              alt=""
              src={data?.most_watchlisted?.project[0]?.photos[0]?.photo ?? mostSharedImg.src}
              width="67px"
              height="68px"
              border="1px solid #F5F5F5"
              borderRadius="xl"
            />
            <Stack align="flex-start" spacing={1}>
              <Text fontWeight="600" as="p" fontSize="16px">
                {data?.most_watchlisted?.project[0]?.name}
              </Text>
              {data?.most_watchlisted?.project[0]?.created_by.company_name && (
                <Text fontSize="10px">
                  Constructed by{' '}
                  <b>{data?.most_watchlisted?.project[0]?.created_by.company_name}</b>
                </Text>
              )}
              {data?.most_watchlisted?.times_watchlisted && (
                <Text fontSize="10px" color={themeStyles.color.primary}>
                  Watchlisted <b>{data?.most_watchlisted?.times_watchlisted}</b>{' '}
                  {DEVELOPER_DASHBOARD_DATA?.most_watchlisted?.times_watchlisted > 1
                    ? 'times'
                    : 'time'}
                </Text>
              )}
            </Stack>
          </Flex>
        </Box>
      </HStack>
    </Box>
  );
};
