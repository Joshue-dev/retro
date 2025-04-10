import houseIcon from '/src/images/icons/bankhouse.svg';
import {HiOutlinePlus} from 'react-icons/hi';
import {Button, HStack, Image, Text, useDisclosure, VStack} from '@chakra-ui/react';
import AddBankDetailsForAgents from './AddBankDetailsForAgents';
import {BankActionMenu} from './bankActionMenu';
import {IoMdAdd} from 'react-icons/io';

const UpdateBankDetails = ({refetch, bank}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();

  return (
    <VStack mt={'30px'}>
      <Text textAlign={'start'} fontWeight={'600'} fontSize={'18px'} lineHeight={'23px'} w="full">
        Bank Account
      </Text>
      <HStack
        px="26px"
        w="full"
        py="23px"
        mb="14px"
        maxW="100%"
        background="#FFFFFF"
        border="1px solid #E4E4E4"
        borderRadius={'16px'}
        spacing={5}
      >
        <Image src={houseIcon.src} alt="doc icon" />

        <VStack width={'100%'}>
          {!bank ? (
            <Text
              fontWeight="600"
              fontSize={{base: '14px', md: '1rem'}}
              lineHeight="23px"
              color="#191919"
              textTransform="capitalize"
              textAlign={'start'}
              w="full"
            >
              No account added yet
            </Text>
          ) : (
            <>
              <Text
                fontWeight="500"
                fontSize="16px"
                lineHeight="23px"
                color="#191919"
                textTransform="capitalize"
                textAlign={'start'}
                w="full"
              >
                {bank.account_name}
              </Text>
              <Text
                fontWeight="400"
                fontSize="14px"
                lineHeight="18px"
                color="#191919"
                textAlign={'start'}
                w="full"
              >
                {bank.bank_name}
              </Text>
            </>
          )}
        </VStack>
        {!bank ? (
          <Button
            onClick={onOpen}
            p="2"
            bg="transparent"
            _hover={{bg: 'transparent'}}
            fontSize={{base: '14px', md: '1rem'}}
          >
            <IoMdAdd fontSize={`20px`} />
          </Button>
        ) : (
          <BankActionMenu refetch={refetch} id={bank.id} />
        )}
      </HStack>
      <AddBankDetailsForAgents
        isOpen={isOpen}
        onClose={onClose}
        type
        refetch={refetch}
        bank={bank}
      />
    </VStack>
  );
};

export default UpdateBankDetails;
