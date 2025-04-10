import Head from 'next/head';
import {useRouter} from 'next/router';
import {Button, Heading, HStack, Image, Spinner, Text, useToast, VStack} from '@chakra-ui/react';

import {AgentsLayoutView} from '/src/page.components/agents_components/AgentLayout/View';
import {MatadorCustomTable} from '/src/page.components/agents_components/Table/Table';
import downloadIcon from '/src/images/icons/download-icon.svg';
import csv_down_arrow_icon from '/src/images/icons/downloadcsvdownarrow.svg';

import {CSVLink} from 'react-csv';
import backArrow from '/src/images/icons/back-arrow.png';
import {useMemo} from 'react';
import {useQuery} from 'react-query';
import {totalOutstanding} from '/src/api/agents';

import {OUTSTANDING_BALANCE_ACCOUNT} from '../../../constants/agents_account';
import {STORENAMEFROMDOMAIN} from '../../../constants/routes';
import {handleLastTwoDigits, removeLasttTwoDigits} from '../../../utils';

export const OutstandingBalanceForAccount = () => {
  const router = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => OUTSTANDING_BALANCE_ACCOUNT);

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

  const outstanding = data?.data?.customer_list;

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          Name: data[i]?.name,
          Property: data[i]?.project_name,
          'Total paid': `N ${data[i]?.total_paid}`,
          'Outstanding balance': `N ${data[i]?.outstanding_balance}`,
          Date: data[i]?.created_at,
          Status: data[i]?.status,
        });
    }
    return result;
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <AgentsLayoutView activePage={'account'}>
      {false ? (
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
              Outstanding Balance
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
              justify="center"
            >
              <Text fontSize="24px" fontWeight="600" color="">
                {removeLasttTwoDigits(data?.total_outstanding)}
                {handleLastTwoDigits(data?.total_outstanding)}
              </Text>
              <Text fontSize="14px" fontWeight="400" color="#606060">
                Total Outstanding Balance
              </Text>
            </VStack>
            <MatadorCustomTable
              dontExpand
              downloadcsv={
                <CSVLink filename="outstanding-balace" data={getDataFromJSON(outstanding)}>
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
              DATA={outstanding}
              isRefetching={isLoading}
              COLUMNS={columns}
              headerSpace="evenly"
              isManageAgentEmpty="Oops! there are no transactions available yet....."
            />
          </main>
        </div>
      )}
    </AgentsLayoutView>
  );
};

export default OutstandingBalanceForAccount;
