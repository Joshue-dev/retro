/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head';
import {useRouter} from 'next/router';
import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
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
import {fetchRecentCommissions, totalOutstanding} from '/src/api/agents';

import {changeDateFormat} from '../../../utils/formatDate';
import {formatToCurrency} from '../../../utils/formatAmount';
import {TOTAL_PURCHASE_FOR_ACCOUNT} from '../../../constants/agents_account';
import {toastForError} from '../../../utils/toastForErrors';
import {STORENAMEFROMDOMAIN} from '../../../constants/routes';
import {handleLastTwoDigits, removeLasttTwoDigits} from '../../../utils';
import {OvalLoader} from 'components/common/loaders/AnimatedLoader';

export const OutstandingBalanceForAccount = () => {
  const router = useRouter();
  const columns = useMemo(() => TOTAL_PURCHASE_FOR_ACCOUNT);

  const toast = useToast();

  const {data, isLoading, isError} = useQuery('total-outstanding', totalOutstanding, {
    onError: error => {
      toast({
        title: 'Oops ...',
        description: `${
          error?.response?.status === 500
            ? "Apologies for the inconvenience. We're working on it. Please try again later."
            : error?.response?.data?.message ??
              error?.response?.message ??
              error?.message ??
              'Something went wrong,we are working on resolving it'
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  if (isError) {
    return (
      <AgentsLayoutView activePage={'account'}>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }

  const totalPurchase = data?.data.customer_list;

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          Name: data[i]?.name,
          Location: data[i]?.location,
          'Total Purchase': `N ${data[i]?.total_purchase}`,
          'Total paid': `N ${data[i]?.total_paid}`,
          'Outstanding balance': data[i]?.outstanding_balance,
        });
    }
    return result;
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <AgentsLayoutView activePage={'account'}>
      {
        //   ACCOUNT__COMMISSION.isLoading
        false ? (
          <Spinner />
        ) : (
          <div className="relative">
            <Head>
              <title>{STORENAMEFROMDOMAIN} | agents</title>
              <meta name="description" content="" />
              <meta name="theme-color" content="#723fe2" />
              {/* <Link prefetch={false} rel="icon" href="/favicon.ico" /> */}
            </Head>
            <HStack mb="10px" zIndex={10} mt="-5">
              <Image
                onClick={handleBack}
                style={{cursor: 'pointer'}}
                mr={2}
                boxSize="50px"
                src={backArrow.src}
                alt="back_arrow"
              />
              <Heading fontSize="20px" fontWeight="600">
                Total Purchase
              </Heading>
            </HStack>
            <main className="text-[#333]">
              <VStack
                mb="20px"
                w="660px"
                h="111px"
                borderRadius="12px"
                border="1px solid #E4E4E4"
                bg="#fff"
                spacing="14px"
                // align="center"
                justify="center"
              >
                <Text fontSize="24px" fontWeight="600" color="">
                  {removeLasttTwoDigits(data?.data?.total_purchases)}
                  {handleLastTwoDigits(data?.data?.total_purchases)}
                </Text>
                <Text fontSize="14px" fontWeight="400" color="#606060">
                  Total Purchase
                </Text>
              </VStack>
              {isLoading ? (
                <Center h="50vh" w="100%">
                  <OvalLoader />
                </Center>
              ) : (
                <MatadorCustomTable
                  dontExpand
                  downloadcsv={
                    <CSVLink filename="total-purchase" data={getDataFromJSON(totalPurchase)}>
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
                  DATA={totalPurchase}
                  isRefetching={isLoading}
                  COLUMNS={columns}
                  headerSpace="evenly"
                  isManageAgentEmpty="None of your subscribers have made a purchase yet"
                />
              )}
            </main>
          </div>
        )
      }
    </AgentsLayoutView>
  );
};

export default OutstandingBalanceForAccount;
