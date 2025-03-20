import {Button} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';

const ViewButton = ({rowData}) => {
  const {push} = useRouter();
  const linkTo = () => {
    push(
      `/agents/listings/manage/transactions/${rowData?.project_info?.id}?name=${rowData?.project_name}&isFractional=${rowData?.is_fractionalized}`
    );
  };
  return (
    <Button
      fontSize="16px"
      fontWeight="500"
      border="1px solid #4545FE"
      color="#4545FE"
      _hover={{opacity: 1}}
      bg="transparent"
      borderRadius="12px"
      h="40px"
      w="115px"
      onClick={linkTo}
    >
      View
    </Button>
  );
};

export default ViewButton;
