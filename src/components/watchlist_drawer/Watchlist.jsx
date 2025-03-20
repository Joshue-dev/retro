/* eslint-disable react/jsx-key */
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
import {formatToCurrency} from '/src/utils';
import {Spinner} from '/src/ui-lib';
import {Drawer, DrawerOverlay, DrawerContent, Box} from '@chakra-ui/react';
import {ArrowBackIcon, ArrowForwardIcon, CloseIcon} from '@chakra-ui/icons';
import {fetchWatchlist} from '../../api/watchlist';
import EmptyState from '../appState/empty-state';
import ErrorState from '../appState/error-state';

export const Watchlist = ({isWatchOpen, onWatchClose, onDrawerOpen}) => {
  const router = useRouter();
  const toast = useToast();
  const [scrollPosition1, setScrollPosition1] = useState(0);
  const {data, isError, isLoading} = useQuery(['waitlistipoiid'], fetchWatchlist);
  const dataToUse = data?.data?.watchlist;
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

  const [isNotMobile] = useMediaQuery('(min-width: 768px)');
  const drawerHeight = dataToUse?.length > 2 ? '600px' : '430px'
  console.log(dataToUse)
  return (
    <Drawer
      autoFocus={false}
      placement="right"
      scrollBehavior="inside"
      isOpen={isWatchOpen}
      onClose={onWatchClose}
    >
      {isNotMobile && <DrawerOverlay />}
      <DrawerContent
        top={{ base: 'unset !important', lg: "24px !important" }}
        right={{base: '0', md: '24px !important'}}
        bottom={{ base: '0', md: 'unset !important'}}
        w="full"
        // h={'full'}
        p="16px"
        maxW={{base: '100vw', md: '450px'}}
        maxH={drawerHeight}
        bg={'card_bg'}
        boxShadow={{base: 'none', md: 'md'}}
      >
        <Flex
          px="10px"
          w="full"
          justify={'space-between'}
          align={'center'}
        >
          <Text
            fontSize={'25px'}
            fontWeight={400}
            className="gilda-display-regular"
            color={'matador_text.100'}
          >
            Watchlist
          </Text>

          <CloseIcon
            alignSelf={'flex-start'}
            cursor="pointer"
            fontSize={14}
            color={'#000'}
            onClick={onWatchClose}
            mt={{md: 2}}
          />
        </Flex>

        {isLoading ? (
          <VStack w="full" h="300px">
            <Spinner noAbsolute />
          </VStack>
        ) : isError ? (
          <ErrorState />
        ) : (
          <Box px={3} mt={{ base: '10px', md: "15px"}} h='full' overflowY='auto'>
            {dataToUse?.length > 0 ? (
              <>
                <Stack
                  overflowY={'auto'}
                  scrollBehavior={'smooth'}
                  className="hide_scroll"
                  ref={readScollToRef1}
                >
                  <Stack
                    spacing="14px"
                    alignItems={'center'}
                  >
                    {(dataToUse || [])?.map((equity, idx) => (
                      <Flex
                        key={idx}
                        boxShadow={'0px 3.138px 6.276px 0px rgba(0, 0, 0, 0.07)'}
                        w={'full'}
                        maxW='405px'
                        h={{base: '98px', md: '104px'}}
                        bg="white"
                        onClick={() => handleManageWatchs(equity)}
                        cursor="pointer"
                        align={'center'}
                        gap={4}
                        rounded={'2px'}
                        border={'1px solid #E4E4E4'}
                        p={'16px'}
                      >
                        <Image
                          boxSize={{base: '64px', md: '68px'}}
                          alt="next_image"
                          src={equity?.project?.photos[0]?.photo}
                        />
                        <VStack align="center" spacing={'4px'} px="8px" py="9px">
                          <Text
                            fontSize={18}
                            fontWeight="400"
                            fontFamily={'Gilda Display'}
                            color="matador_text.100"
                          >
                            {equity?.project?.name}
                          </Text>
                          <Text
                            fontSize={{base: 14, md: 12}}
                            fontWeight="400"
                            fontFamily={'Montserrat'}
                            color="matador_text.400"
                          >
                            {equity?.project?.landmark}
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
                textSize={12}
                headerStyle={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '14px' }}
                height={{ base: '200px', md: '300px' }}
                text={`Looks like you haven't bought anything yet.`}
              />
            )}
          </Box>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default Watchlist;
