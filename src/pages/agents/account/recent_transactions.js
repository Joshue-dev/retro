import Head from 'next/head';
import {useRouter} from 'next/router';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';

import {AgentsLayoutView} from '/src/page.components/agents_components/AgentLayout/View';
import {RECENT_TRANSACTIONS} from '/src/constants/agents_account';
import {MatadorCustomTable} from '/src/page.components/agents_components/Table/Table';
import downloadIcon from '/src/images/icons/download-icon.svg';
import csv_down_arrow_icon from '/src/images/icons/downloadcsvdownarrow.svg';

import {CSVLink} from 'react-csv';
import backArrow from '/src/images/icons/back-arrow.png';
import {useMemo} from 'react';
import {useQuery} from 'react-query';
import {fetchRecentCommissions} from '/src/api/agents';

import {changeDateFormat} from '../../../utils/formatDate';
import {priceString} from '../../../utils/formatAmount';
import {OvalLoader} from 'components/common/loaders/AnimatedLoader';

export const RecentTransactions = () => {
  const router = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => RECENT_TRANSACTIONS);

  const toast = useToast();

  const {data, isLoading, isError} = useQuery(['agent-commission'], fetchRecentCommissions, {
    onError: error => {
      toast({
        title: 'Oops ...',
        description: `${
          error?.response?.data?.message ??
          error?.response?.message ??
          error?.error?.message ??
          'Something went wrong,kindly check your network connection'
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          Client: `${data[i]?.customer?.user?.first_name} ${data[i]?.customer?.user?.last_name}`,
          Property: `${data[i]?.unit?.project?.name},${data[i]?.unit?.unit_title}`,
          // "Commission rate": data[i]?.purchase_price,
          Amount: priceString('naira', data[i]?.amount_paid),
          'Date received ': `${changeDateFormat(data[i]?.created_at, 'add_time').split('|')[0]} | ${
            changeDateFormat(data[i]?.created_at, 'add_time').split('|')[1]
          }`,
        });
    }
    return result;
  };

  const handleBack = () => {
    router.back();
  };

  if (isError) {
    return (
      <AgentsLayoutView activePage={'account'}>
        <Box mt="20px"></Box>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }

  const recentTransactions = data?.data?.data;

  return (
    <AgentsLayoutView activePage={'account'}>
      {isLoading ? (
        <Center h="70vh" w="100%">
          <OvalLoader />
        </Center>
      ) : (
        <div className="relative">
          <Head>
            <title>Matador | agents</title>
            <meta name="description" content="" />
            <meta name="theme-color" content="#723fe2" />
          </Head>
          <HStack mb="10px" zIndex={10}>
            <Image
              onClick={handleBack}
              style={{cursor: 'pointer'}}
              mr={2}
              boxSize="50px"
              src={backArrow.src}
              alt="back_arrow"
            />
            <Heading fontSize="20px" fontWeight="600">
              Recent Transactions
            </Heading>
          </HStack>
          <main className="text-[#333]">
            <MatadorCustomTable
              dontExpand
              downloadcsv={
                <CSVLink filename="recent-transctions" data={getDataFromJSON(recentTransactions)}>
                  <Button
                    display="flex"
                    gap="3px"
                    w="177px"
                    height="46px"
                    border="1px solid #4545FE"
                    borderRadius="12px"
                    fontWeight="500"
                    fontSize="12px"
                    lineHeight="15px"
                    textAlign="center"
                    color="#4545FE"
                    bg="#ffffff"
                  >
                    <Image w="18px" h="18px" src={downloadIcon.src} alt="icon" />
                    Download Report
                    <Image w="18px" h="18px" src={csv_down_arrow_icon.src} alt="icon" />
                  </Button>
                </CSVLink>
              }
              DATA={recentTransactions}
              isRefetching={isLoading}
              COLUMNS={columns}
              headerSpace="evenly"
              isManageAgentEmpty="No deposit has been made yet"
            />
          </main>
        </div>
      )}
    </AgentsLayoutView>
  );
};

export default RecentTransactions;
