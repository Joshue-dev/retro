import {Stack} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {AdditionalInfo} from './Additional_info';
import {UserAddress} from './User_address';
import {Inspection} from './inspection';
import { UserEquities } from './User_equity';

const UserProperties = ({customerInfo}) => {
  const {query} = useRouter();

  return (
    <Stack minH="100vh" pb={`40px`} gap={`10px`}>
      <UserEquities customerInfo={customerInfo?.customer_investments} />
      <Inspection
        id={query.id}
        customerInfo={customerInfo}
        data={customerInfo?.inspection_requests?.ongoing}
        isClosed={customerInfo?.inspection_requests?.closed?.length > 0}
        closedRequests={customerInfo?.inspection_requests?.closed}
      />
      <UserAddress customerInfo={customerInfo?.user_info} />
      <AdditionalInfo customerInfo={customerInfo && customerInfo} />
    </Stack>
  );
}

export default UserProperties;