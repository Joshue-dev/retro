import {useQuery} from 'react-query';
import {useToast} from '@chakra-ui/react';

import {fetchAgentRequest, fetchAgentsAccountUpcomingPayments} from '../../../api/agents';

import AgentsLayoutView from '../../../page.components/agents_components/AgentLayout/View';
import RequestOverview from './overview';
import RequestTypes from '/src/page.components/agents_components/request/types';
import {useEffect, useState} from 'react';
import {toastForError} from '../../../utils/toastForErrors';

const Request = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [value, setValue] = useState('0');

  const param = value == 0 ? '' : '?status=pending';

  const {data, isError, isLoading, refetch, error} = useQuery(['agent_request', param], () =>
    fetchAgentRequest(param)
  );

  useEffect(() => {
    const fetch = async () => await refetch();
    fetch();
    // eslint-disable-next-line
  }, [value]);

  const forData = [value];

  const toast = useToast();

  // if (isError) {
  //   toast({
  //     title: "Oops ...",
  //     description: `${
  //       error?.response?.data?.message ??
  //       error?.response?.message ??
  //       error?.message ??
  //       "Something went wrong"
  //     }`,
  //     status: "error",
  //     duration: 8000,
  //     isClosable: true,
  //     position: "top-right",
  //   });
  // }
  toastForError(error, isError, toast);

  return (
    <AgentsLayoutView activePage="request">
      <RequestOverview
        value={value}
        setValue={setValue}
        total_request={data?.data?.total_requests}
        pending_request={data?.data?.pending_requests}
        closed_request={data?.data?.closed_requests}
      />
      {isError ? (
        <></>
      ) : (
        <RequestTypes
          forData={forData}
          setTabIndex={setTabIndex}
          isRefetching={isLoading}
          inspection_info={data?.data?.inspection_requests}
          commission_info={data?.data?.commission_requests}
        />
      )}
    </AgentsLayoutView>
  );
};

export default Request;
