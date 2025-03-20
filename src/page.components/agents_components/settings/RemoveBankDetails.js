import {useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
  useToast,
  HStack,
  Button,
  Image,
} from '@chakra-ui/react';
import Right from '/src/images/icons/check-icon-unscreen.gif';
import Cross from '/src/images/icons/cancleBig.png';
import Delete from '/src/images/icons/deleteAccount.svg';
import {useMutation, useQueryClient} from 'react-query';
import {deleteAgentsBankDetail} from '../../../api/agents';

export const RemoveBankDetails = ({isOpen, onClose, id, refetch}) => {
  const [isRemoved, setRemoved] = useState(false);
  const queryClient = useQueryClient();

  const toast = useToast();

  const {mutate, isLoading, isSuccess} = useMutation(
    id => {
      return deleteAgentsBankDetail(id);
    },
    {
      onSuccess: () => {
        setRemoved(!isRemoved);
        queryClient.invalidateQueries(['agents_settings_data']);
      },
      onError: err => {
        onClose();
        toast({
          title: 'Oops ...',
          description: `${
            err?.response?.data?.message ??
            err?.response?.message ??
            err?.message ??
            'Something went wrong,kindly check your network connection'
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const OnClickButton = async () => {
    if (isRemoved) {
      setRemoved(!isRemoved);
      await refetch();
    } else {
      await mutate(id);
    }
  };

  return (
    <Modal
      isCentered
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={() => onClose()}
      scrollBehavior="inside"
      blockScrollOnMount={'true'}
      w={'486px'}
      h={'370px'}
    >
      <ModalOverlay bg="rgba(0,0,0,0.65)" />
      <ModalContent shadow="lg" borderRadius="2xl">
        <ModalCloseButton onClose={() => onClose()} />

        <ModalBody padding="30px 0">
          <VStack>
            <Image
              src={isRemoved ? Right.src : Delete.src}
              width={'48px'}
              alt="icon"
              height={'48px'}
              objectFit="cover"
              mt="10"
            />
            <Text
              fontSize="24px"
              lineHeight="30px"
              fontWeight="600"
              color={'#191919'}
              m="10px"
              textAlign={'center'}
            >
              {isRemoved ? 'Account Removed Successfully' : 'Remove Account'}
            </Text>
            <Text fontSize="16px" lineHeight="20px" fontWeight="400" color={'#191919'}>
              {isRemoved ? '' : 'Are you sure you want to remove this account'}
            </Text>
          </VStack>
        </ModalBody>
        {!isSuccess && (
          <ModalFooter padding="0" mb="5">
            <Button
              bg="#FF3636"
              width="90%"
              mx="auto"
              mb="2"
              padding="25px 168px"
              isLoading={isLoading}
              onClick={OnClickButton}
              borderRadius="12px"
              color={'#fff'}
            >
              Remove Account
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
