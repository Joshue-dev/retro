import {
  Image,
  VStack,
  HStack,
  Text,
  useToast,
  Flex,
  Center,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {useRef, useState} from 'react';
import {Drawer, DrawerOverlay, DrawerContent, Box} from '@chakra-ui/react';
import {ArrowBackIcon, ArrowForwardIcon, CloseIcon} from '@chakra-ui/icons';
import {Spinner} from '/src/ui-lib';
import {fetchUserEquity} from '../../api/listing';
import ErrorState from '../appState/error-state';
import EmptyState from '../appState/empty-state';

export const MyAssets = ({isAssetOpen, onAssetClose, onDrawerOpen}) => {
  const router = useRouter();
  const toast = useToast();
  const [paymentStatus, setPaymentStatus] = useState('PAID');
  const [scrollPosition1, setScrollPosition1] = useState(0);
  const {data, isLoading, isError} = useQuery(['fetchUserEquity', paymentStatus], () =>
    fetchUserEquity(paymentStatus)
  );
  const USER_EQUITY = data && data?.data?.results;
  const readScollToRef1 = useRef();

  const handleMostReadScroll = scrollAmount => {
    const newScrollPosition = scrollPosition1 + scrollAmount;
    setScrollPosition1(newScrollPosition);
    readScollToRef1.current.scrollLeft = newScrollPosition;
  };

  if (data?.code === 'ERR_NETWORK') {
    toast({
      title: `${data?.message}`,
      description: ` please check your network connection`,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }

  const handleManageAssets = property => {
    property?.type == 'WHOLE' &&
      !property?.payment_plan &&
      !property?.co_owners?.length &&
      router.push(`/asset/outright/${property?.id}?status=${paymentStatus}`);

    property?.type == 'WHOLE' &&
      property?.payment_plan &&
      !property?.co_owners?.length &&
      router.push(`/asset/payment_plan/${property?.id}?status=${paymentStatus}`);

    property?.type == 'WHOLE' &&
      property?.co_owners?.length &&
      router.push(`/asset/co_ownership/${property?.id}?status=${paymentStatus}`);

    property?.type == 'FRACTIONAL' &&
      property?.co_owners?.length > 0 &&
      router.push(`/asset/fractional/${property?.id}?status=${paymentStatus}`);

    property?.type == 'FRACTIONAL' &&
      router.push(`/asset/fractional/${property?.id}?status=${paymentStatus}`);
    onAssetClose();
  };
  const [isNotMobile] = useMediaQuery('(min-width: 768px)');


  return (
    <Drawer
      autoFocus={false}
      placement="right"
      scrollBehavior="inside"
      isOpen={isAssetOpen}
      onClose={onAssetClose}
    >
      <DrawerOverlay />
      <DrawerContent
        top={{base: 'unset !important', lg: '24px !important'}}
        right={{base: '0', md: '24px !important'}}
        bottom={{base: '0', md: 'unset !important'}}
        w="full"
        // h={'full'}
        p="16px"
        maxW={{base: '100vw', md: '450px'}}
        maxH={{base: '370px', md: '600px'}}
        bg={'card_bg'}
        boxShadow={{base: 'none', md: 'md'}}
        roundedTop={{base: '16px', md: 0}}
      >
        <Flex
          borderBottom={{md: '1px solid #EAECF0'}}
          pb="15px"
          px="10px"
          w="full"
          justify={'space-between'}
          align={'center'}
        >
          <Text
            fontSize={{base: '16px', md: '24px'}}
            fontWeight={600}
            fontFamily="Open Sans"
            color={'matador_text.100'}
            letterSpacing="1.44px"
            textTransform={'uppercase'}

          >
            Portfolio
          </Text>

          <CloseIcon
            alignSelf={'flex-start'}
            cursor="pointer"
            fontSize={14}

            color={'matador_text.100'}

            onClick={onAssetClose}
            mt={2}
          />
        </Flex>

        {isLoading ? (
          <VStack w="full" h="300px">
            <Spinner noAbsolute />
          </VStack>
        ) : isError ? (
          <ErrorState />
        ) : (

          <Box px={3} mt={{base: '10px', md: '15px'}} overflowY="auto">

            {USER_EQUITY?.length > 0 ? (
              <>
                <Stack
                  overflowY={'auto'}
                  scrollBehavior={'smooth'}
                  className="hide_scroll"
                  ref={readScollToRef1}
                >

                  <Stack height={'600px'} spacing="14px" alignItems={'center'}>
                    {(USER_EQUITY || [])?.map((equity, idx) => (
                      <Flex
                        key={idx}
                        w={'full'}
                        maxW="405px"
                        h="72px"

                        bg="white"
                        onClick={() => handleManageAssets(equity)}
                        cursor="pointer"
                        align={'center'}
                        justify="center"
                        gap={4}
                        rounded={'2px'}
                        border={'1px solid'}
                        borderColor="primary"
                        p={'16px'}
                      >
                        {/* <Image

                          boxSize={{base: '64px', md: '68px'}}
                          alt="next_image"
                          src={equity?.project?.photos[0]?.photo}
                        /> */}
                        <VStack align="center" spacing={'4px'} px="8px" py="9px">
                          <Text
                            fontSize={18}
                            fontWeight="400"

                            fontFamily={'Liberation Sans'}
                            color="primary"
                            letterSpacing="3.2px"
                            textTransform="uppercase"

                          >
                            {equity?.project?.name}
                          </Text>
                          <Text
                            fontSize={13}
                            fontWeight="400"

                            letterSpacing="3.2px"
                            textTransform="uppercase"

                            color="matador_text.400"
                          >
                            {equity?.type === 'FRACTIONAL'
                              ? `${
                                  equity?.fractions_distributed - equity?.fractions_left
                                } fractions sold`
                              : equity?.unit?.unit_title}
                          </Text>
                        </VStack>
                      </Flex>
                    ))}
                  </Stack>
                </Stack>
              </>
            ) : (
              <EmptyState
                icon
                textSize={14}
                headerStyle={{
                  fontSize: '16px',
                  letterSpacing: {base: '0.96px', md: 'normal'},
                  textTransform: {base: 'uppercase', md: 'none'},
                }}
                height={{base: '200px', md: '300px'}}
                text={`You haven't purchased any property yet.`}
                gap={0}
              />
            )}
          </Box>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MyAssets;
