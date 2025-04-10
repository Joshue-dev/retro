import React, {useMemo, useState, useEffect} from 'react';
import AgentsLayoutView from '../../../page.components/agents_components/AgentLayout/View';
import UpcomingPaymentHeader from '../../../page.components/agents_components/account/UpcomingPaymentHeader';
import MatadorCustomTable from '../../../page.components/agents_components/Table/Table';
import SortBy from '/src/components/assets/SortBy';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {CSVLink} from 'react-csv';
import csv_down_arrow_icon from '/src/images/icons/downloadcsvdownarrow.svg';
import {UPCOMING_PAYMENTS_COLUMN} from '../../../constants/agents_account';
import {Button, Image, useToast, Box, Text, Center} from '@chakra-ui/react';
import {changeDateFormat} from '../../../utils/formatDate';
import {useQuery} from 'react-query';
import {priceString} from '../../../utils/formatAmount';
import {fetchAgentsAccountUpcomingPayments} from '../../../api/agents';
import {OvalLoader} from 'components/common/loaders/AnimatedLoader';

const UpcomingPayments = () => {
  const columns = useMemo(() => UPCOMING_PAYMENTS_COLUMN, []);
  const [addedParam, setAddedParam] = useState('');
  const [date, setDate] = useState('0');
  const toast = useToast();

  const sort_params = ['A-Z', 'Z-A', 'Highest Amount to Lowest', 'Lowest Amount to Highest'];

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          Name: `${data[i]?.owner?.first_name} ${data[i]?.owner?.last_name}`,
          Property: `${data[i]?.project_name},${data[i]?.project_name}`,
          // 'Payment type': data[i]?.purchase_price,
          Amount: priceString('naira', data[i]?.amount),
          Date: changeDateFormat(data[i]?.created_at),
        });
    }
    return result;
  };

  const {data, isLoading, isError, refetch} = useQuery(
    ['agent-incoming-payment', date],
    () => fetchAgentsAccountUpcomingPayments({date}),
    {
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
    }
  );

  useEffect(() => {
    if (date) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  if (isError) {
    return (
      <AgentsLayoutView activePage={'account'}>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }

  const upcomingData = data?.data.data;

  return (
    <AgentsLayoutView activePage="account">
      <UpcomingPaymentHeader setDate={setDate} total={data?.data} />
      {isLoading ? (
        <Center h="50vh" w="100%">
          <OvalLoader />
        </Center>
      ) : (
        <MatadorCustomTable
          dontExpand
          downloadcsv={
            <CSVLink filename="upcoming-payments" data={getDataFromJSON(upcomingData)}>
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
          isRefetching={isLoading}
          DATA={upcomingData}
          COLUMNS={columns}
          forData={[date, data]}
          headerSpace="evenly"
          isManageAgentEmpty="No Upcoming Payment at this time"
        />
      )}
    </AgentsLayoutView>
  );
};

export default UpcomingPayments;
