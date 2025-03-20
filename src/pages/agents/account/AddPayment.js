import React, {useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Heading,
  FormControl,
  VStack,
  Box,
  SlideFade,
  Text,
  Select,
  useDisclosure,
  useToast,
  Input,
  Button,
} from '@chakra-ui/react';
import {motion} from 'framer-motion';

import {ErrorMessage, useFormik} from 'formik';
// import { Button, Input, Popup2 } from "../../../../ui-lib";
import {useMutation, useQuery} from 'react-query';
import {addBankDetails, fetchBanks} from '../../../api/agents';
// import {
//   addBankAccount,
//   BankList,
//   fetchBanks,
//   updateSettings,
// } from "../../../api/Settings";

// import { BankList } from "../../../../apis/settings";

export const AddPayment = ({refetch}) => {
  const toast = useToast();

  const [isClicked, setIsClicked] = useState(false);
  const {isOpen, onClose, onOpen} = useDisclosure();

  const handleAdd = () => {
    setIsClicked(!isClicked);
    return formik.handleSubmit();
  };

  const {data, isError, error, isLoading: loading} = useQuery(['agentsBanks'], fetchBanks);

  const validateForm = values => {
    const errors = {};

    if (!Boolean(values.bank_code)) {
      errors.bank_code = 'Please Select The Bank !';
    }

    if (!values.account_number || values.account_number.length != 10) {
      errors.account_number = 'Please Enter the 10 digit Account Number !';
    } else if (!/^[0-9]+$/.test(values.account_number)) {
      errors.account_number = 'Please Enter the Digit Only !';
    }
    return errors;
  };

  const displayError = () =>
    formik.touched.account_number && formik.errors.account_number
      ? formik.errors.account_number
      : null;

  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      mutate(values);
    },
    validate: validateForm,
    validateOnChange: true,
  });

  const {mutate, isLoading} = useMutation(
    values => {
      return addBankDetails(values);
    },
    {
      onSuccess: res => {
        formik.resetForm();
        setIsClicked(false);

        onClose();
        refetch();
      },
      onError: err => {
        formik.resetForm();
        onClose();
        setIsClicked(false);

        toast({
          title: 'An error occured',
          description: `Please try again...`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  return (
    <>
      <Button
        _hover={{
          boxShadow: '0 10px 20px rgba(27, 27, 27, .5)',
          transform: 'translateY(-5px)',
        }}
        fontStyle="normal"
        fontWeight=" 400"
        fontSize="18px"
        lineHeight="23px"
        color=" #FFFFFF"
        width="270px"
        height="53px"
        bg="#000000"
        alignSelf="flex-end"
        borderRadius="5px"
        mt="20px"
        onClick={() => onOpen(true)}
      >
        <span style={{marginRight: '12px', fontSize: '20px'}}>+</span> Add a Payment Method
      </Button>
      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={() => {
          formik.resetForm();
          onClose();
        }}
        scrollBehavior="inside"
        blockScrollOnMount={true}
        size={'lg'}
        h={'550px'}
      >
        <ModalOverlay bg="rgba(0,0,0,0.85)" />
        <ModalContent
          px={'38px'}
          py={'15px'}
          shadow="lg"
          borderRadius="2xl"
          boxShadow="0px 40px 80px -1px rgba(31, 91, 242, 0.27)"
        >
          <ModalCloseButton
            onClose={() => {
              formik.resetForm();
              onClose();
            }}
          />

          <ModalHeader px={'0px'} pb={'0px'}>
            <Text
              fontSize={'24px'}
              lineHeight={'30px'}
              fontWeight={'600'}
              textAlign="left"
              fontFamily={'Euclid Circular B'}
            >
              New Recipient
            </Text>
          </ModalHeader>
          <ModalBody pl={'0px'} my={'10px'} py={'5px'}>
            <VStack>
              <Box
                bg="rgba(18, 216, 160, 0.2)"
                borderRadius="16px"
                px={'10px'}
                pt={'24px'}
                pb={'50px'}
                mb={'10px'}
              >
                <Text size="16px" lineHeight="20px" fontWeight="300" color={'#3D3D3D'} m="5px">
                  Matador only accept Corperate bank account and Coperate Mobile Money Accounts for
                  Registered Businesses
                </Text>
              </Box>
              <FormControl as="form" onSubmit={formik.handleSubmit}>
                {loading ? (
                  'loading'
                ) : (
                  <Select
                    id="bank_code"
                    name="bank_code"
                    onChange={formik.handleChange}
                    value={formik.values.bank_code}
                    onBlur={formik.handleBlur}
                    placeholder="Bank Name"
                    _placeholder={{
                      color: 'gray.400',
                    }}
                    border="none"
                    borderBottom="1px solid #CBCBCB"
                    fontSize="16px"
                  >
                    {data?.data?.message.map(item => (
                      <option value={item.code} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                )}
                {formik.errors.bank_code && formik.touched.bank_code ? (
                  <Text color={'red'} fontSize={'14px'} my={'10px'}>
                    {formik.errors.bank_code}
                  </Text>
                ) : null}

                <VStack alignItems="flex-start" my={2} w="100%">
                  <Text color="#191919" textStyle="p" textAlign="left" opacity={0.9} w="100%">
                    Corperate bank account
                  </Text>

                  <Input
                    as="input"
                    color="#191919"
                    px="4"
                    py="6"
                    outline="none"
                    borderRadius="lg"
                    _placeholder={{
                      fontSize: '14px',
                      color: 'gray.500',
                    }}
                    _active={{
                      borderColor: 'grey',
                    }}
                    _visited={{
                      borderColor: 'grey',
                    }}
                    type="input"
                    id="account_number"
                    name="account_number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.account_number}
                    placeholder="Corperate bank account"
                    fontSize={'16px'}
                    borderColor={!!displayError() && 'red'}
                    variant={'outline'}
                  />

                  <SlideFade in={!!displayError()} offsetY="20px">
                    <Text textStyle="p-sm" color="red">
                      {displayError()}
                    </Text>
                  </SlideFade>
                </VStack>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter pb={'90px'} px={'0px'}>
            <VStack w={'100%'}>
              <Button
                borderRadius="12px"
                bg={'#4545FE'}
                disabled={isClicked}
                w={'100%'}
                color={'#FFFFFF'}
                fontWeight={'400'}
                fontSize={'18px'}
                lineHeight={'23px'}
                alignSelf="stretch"
                type="submit"
                isLoading={isLoading}
                onClick={handleAdd}
                _hover={{
                  shadow: 'md',
                }}
                _active={{
                  opacity: 0.8,
                }}
                minH={'55px'}
              >
                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                  Add
                </motion.button>
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddPayment;
