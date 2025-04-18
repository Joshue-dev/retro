import React, {useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {faAngleLeft, faLandmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Heading,
  HStack,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {AgentsLayoutView} from '../../../page.components/agents_components/AgentLayout/View';
import {useMutation, useQuery} from 'react-query';
import {fetchWithdrawAccounts, withDrawForAgent} from '../../../api/agents';
import AddPayment from './AddPayment';
import {STORENAMEFROMDOMAIN} from '../../../constants/routes';
import {OvalLoader} from 'components/common/loaders/AnimatedLoader';

export const WithdrawalsProceed = () => {
  const router = useRouter();
  const [idError, setIdNumError] = useState('');

  const isANumber = input => {
    const numericPattern = /^\d+$/;
    if (!numericPattern.test(input)) {
      setIdNumError('hmm,invalid format');
    } else if (~~input < 50) {
      setIdNumError('Withdrawal amount must be at least ₦50.');
    } else {
      setIdNumError('');
    }
  };

  const store_name = STORENAMEFROMDOMAIN;

  const [check, setCheck] = useState();
  const [withDrawInfo, setWithDrawInfo] = useState({});

  const {data, isError, isLoading, error, refetch} = useQuery(
    ['withdrawaccounts'],
    fetchWithdrawAccounts
  );

  const toast = useToast();

  const mutation = useMutation(formData => withDrawForAgent(formData), {
    onSuccess: async res => {
      toast({
        title: 'changes updated successfully',
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: res => {
      return toast({
        title: res?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
        description: `${
          res?.response?.data?.message ??
          res?.response?.message ??
          res?.message ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const RECIPIENT_INFO = data?.data?.data?.[0];

  const withdraw = () => {
    return mutation.mutate({
      account_number: Number(RECIPIENT_INFO.account_number),
      bank_code: RECIPIENT_INFO.bank_code,
      store_name,
      amount: Number(withDrawInfo.amount),
    });
  };

  const handleChange = e => {
    return setWithDrawInfo({
      ...withDrawInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AgentsLayoutView pb="0px" activePage={'account'}>
      <Box h="100%" className="relative">
        <Head>
          <title>Matador | Withdrawals proceed</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="theme-color" content="#723fe2" />
          {/* <Link prefetch={false} rel="icon" href="/favicon.ico" /> */}
        </Head>
        {isLoading ? (
          <Center h="70vh" w="100%">
            <OvalLoader />
          </Center>
        ) : (
          <main className=" text-[#333]">
            <div className=" flex flex-row items-center">
              <div
                onClick={() => router.back()}
                className="w-12 cursor-pointer   h-12 rounded-full bg-[#ddd] justify-center items-center flex mr-1"
              >
                <FontAwesomeIcon icon={faAngleLeft} className="w-6 h-6" />
              </div>
              <div className="font-medium text-lg">Back</div>
            </div>
            <Heading as="h1" my="30px" textAlign="start" fontWeight="600" fontSize="18px">
              Withdrawal
            </Heading>
            <Box
              bg="#ffffff"
              pt="20px"
              pb="30px"
              borderTopRightRadius="16px"
              borderTopLeftRadius="16px"
            >
              <HStack
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
                borderBottomRightRadius="16px"
                borderBottomLeftRadius="16px"
                pb="24px"
              >
                <div className="w-full flex flex-row  items-center justify-start">
                  <div className="w-full flex flex-col px-6 py-2">
                    <input
                      name="amount"
                      className="border-b py-2 px-1 border-[#999] w-1/2"
                      placeholder="Withdrawal amount"
                      onBlur={e => isANumber(e.target.value)}
                      onChange={handleChange}
                      value={withDrawInfo.amount}
                    />
                    <Text fontSize="10px" textAlign="start" mt="10px" color="red">
                      {idError}
                    </Text>
                    <input
                      name="desc"
                      className="border-b py-2 px-1 border-[#999] w-1/2 mt-6"
                      placeholder="Description"
                      onChange={handleChange}
                      value={withDrawInfo.desc}
                    />

                    <VStack w="full" mt="50px" align="start">
                      <Heading mb="46px" fontWeight="500" fontSize="18px">
                        Receipient
                      </Heading>
                      <HStack w="full" justify="space-between" align="center">
                        <div className="flex h-fit-content flex-row items-center justify-start ">
                          <FontAwesomeIcon icon={faLandmark} className="w-16 h-16 mr-8" />
                          <div className="flex flex-col items-start justify-center">
                            <span className="font-medium ">{RECIPIENT_INFO.account_name}</span>
                            <span className="mt-3 ">{RECIPIENT_INFO.bank_name}</span>
                          </div>
                        </div>
                        <Checkbox
                          // border="solid 2px #CBCBCB"
                          boxShadow=" 0px 4px 8px rgba(0, 0, 0, 0.02)"
                          isChecked={check}
                          onChange={e =>
                            // setBankdetails(RECIPIENT_INFO.account_number),
                            setCheck(e.target.checked)
                          }
                        />
                      </HStack>
                    </VStack>
                  </div>
                </div>
              </HStack>
              <HStack w="full" justify="end" px="24px">
                <AddPayment />
              </HStack>
              <HStack w="full" px="24px" align="center" justify="end" my="48px">
                <Button
                  fontSize="18px"
                  fontWeight="400"
                  h="55px"
                  borderRadius="12px"
                  bg="transparent"
                  border="solid 1px #FF3636"
                  color="#FF3636"
                  w="217px"
                >
                  Discard
                </Button>
                <Button
                  onClick={withdraw}
                  bg="#4545FE"
                  fontSize="18px"
                  fontWeight="400"
                  h="55px"
                  borderRadius="12px"
                  color="#ffffff"
                  w="217px"
                  position="relative"
                >
                  {mutation.isLoading ? <Spinner color="black" /> : 'Proceed'}
                </Button>
              </HStack>
            </Box>
          </main>
        )}
      </Box>
    </AgentsLayoutView>
  );
};

export default WithdrawalsProceed;
