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
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import AgentsLayoutView from '../../../page.components/agents_components/AgentLayout/View';
import {WITHDRAWALS} from '../../../constants/agents_account';
import MatadorCustomTable from '../../../page.components/agents_components/Table/Table';
import downloadIcon from '/src/images/icons/download-icon.svg';
import csv_down_arrow_icon from '/src/images/icons/downloadcsvdownarrow.svg';

import {CSVLink} from 'react-csv';
import backArrow from '/src/images/icons/back-arrow.png';
import {useMemo} from 'react';
import {useQuery} from 'react-query';
import {fetchWithdrawal} from '../../../api/agents';
import {OvalLoader} from 'components/common/loaders/AnimatedLoader';

export const PayOut = () => {
  const router = useRouter();
  const columns = useMemo(() => WITHDRAWALS);

  const ACCOUNT__WITHDRAWAL = useQuery(
    ['agent-withdrawaL'],

    fetchWithdrawal
  );

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          Amount: data[i]?.amount,
          'Balance before': data[i]?.current_balance,
          Date: data[i]?.date,
          Bank: data[i]?.bank_name,
          Reference: data[i]?.reference,
        });
    }
    return result;
  };

  const handleBack = () => {
    router.back();
  };

  if (ACCOUNT__WITHDRAWAL?.isError) {
    toast({
      title: 'Oops ...',
      description: `${
        ACCOUNT__WITHDRAWAL?.error?.response?.data?.message ??
        ACCOUNT__WITHDRAWAL?.error?.response?.message ??
        ACCOUNT__WITHDRAWAL?.error?.message ??
        'Something went wrong,we are working on resolving it'
      }`,
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
    return (
      <AgentsLayoutView activePage={'account'}>
        <Box mt="20px">{/* <BackArrowWithText text="Back" /> */}</Box>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }
  // const tableInstance = useTable({columns, data});

  // const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;

  return (
    <AgentsLayoutView activePage={'account'}>
      {ACCOUNT__WITHDRAWAL.isLoading ? (
        <Center h="70vh" w="100%">
          <OvalLoader />
        </Center>
      ) : (
        <div className="relative">
          <Head>
            <title>Matador | agents</title>
            <meta name="description" content="" />
            <meta name="theme-color" content="#723fe2" />
            {/* <Link prefetch={false} rel="icon" href="/favicon.ico" /> */}
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
              Payout
            </Heading>
          </HStack>
          <main className="text-[#333]">
            <MatadorCustomTable
              dontExpand
              downloadcsv={
                <CSVLink data={getDataFromJSON(ACCOUNT__WITHDRAWAL?.data?.data)}>
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
                    <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
                    Download Report
                    <Image w="18px" h="18px" src={csv_down_arrow_icon.src} alt="icon" />
                  </Button>
                </CSVLink>
              }
              // DATA={ACCOUNT__WITHDRAWAL?.data?.data}
              DATA={ACCOUNT__WITHDRAWAL?.data?.data?.data}
              isRefetching={ACCOUNT__WITHDRAWAL.isLoading}
              COLUMNS={columns}
              headerSpace="evenly"
              isManageAgentEmpty="You haven’t made any withdrawal yet"
            />
          </main>
        </div>
      )}
    </AgentsLayoutView>
  );
};

export default PayOut;
