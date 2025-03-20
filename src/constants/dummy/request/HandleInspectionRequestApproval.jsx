import {Spinner, useToast} from '@chakra-ui/react';
import {useMutation} from 'react-query';
import React, {useState} from 'react';
import {approveScheduledTour} from 'src/api/requests';
import {Button} from '/src/ui-lib';

export const HandleInspectionRequestApproval = ({requestId, supervisorId}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const mutation = useMutation(formData => approveScheduledTour(requestId, formData), {
    onSuccess: res => {
      setIsLoading(false);
      toast({
        title: 'Approved Successfully!',
        description: `Tour request has been approved!!`,
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    onError: err => {
      setIsLoading(false);
      toast({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleTourRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      mutation.mutate({
        status: 'Accepted',
        supervisor: supervisorId,
      });
    }, 1200);
  };
  return (
    <div>
      <Button mt={0} onClick={handleTourRequest} variant="primary" w="139px">
        {isLoading ? <Spinner color="whitesmoke" /> : 'Accept'}
      </Button>
    </div>
  );
};
