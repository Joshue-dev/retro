import React from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Show,
  Hide,
  Link,
  useToast,
  Center,
} from '@chakra-ui/react';
import calling from '/src/images/icons/Calling.png';
import {useRouter} from 'next/router';
import phoneIcon from '/src/images/icons/Calling.svg';
import messageIcon from '/src/images/icons/Message.svg';
import addPhoneIcon from '/src/images/icons/add-phone-icon.svg';
import {User_referral} from './User_referral';
import {themeStyles} from '../../../theme';
import {BsDashLg} from 'react-icons/bs';
import useLocalStorage from 'utils/hooks/useLocalStorage';

export const User_profile_info = ({customerInfo, referral}) => {
  const router = useRouter();
  const {id} = router?.query;

  const toast = useToast();

  const placeACall = () => {
    toast('You are currently ineligible for this feature', {
      position: 'fixed',
      top: '10vh',
      right: '2vw',
      w: '480px',
    });
  };

  return (
    <Stack>
      <Show above="lg">
        <Box
          {...themeStyles.customerProfileCard}
          h="fit-content"
          pb="15px"
          minW={{base: 'auto', xl: '371px'}}
          maxW={'371px'}
          w="100%"
          display={'block'}
          border={'none'}
        >
          <Stack spacing={33}>
            <VStack>
              <Center
                height={120}
                width={120}
                minH={120}
                minW={120}
                borderRadius="50%"
                overflow={'hidden'}
              >
                <Image
                  alt=""
                  objectFit="cover"
                  minW={'100%'}
                  minH={'100%'}
                  src={customerInfo?.avatar ?? ''}
                />
              </Center>
              <Heading fontFamily='Euclid Circular B'  textAlign={'center'}>
                {' '}
                {`${customerInfo?.first_name ?? ''} ${customerInfo?.last_name ?? ''}`}
              </Heading>
            </VStack>
            <Stack w="100%">
              <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={2}>
                <Text
                  alignSelf={'flex-start'}
                  fontWeight="400"
                  fontSize="14px"
                  lineHeight="18px"
                  textAlign="right"
                  color="#191919"
                >
                  Phone
                </Text>
                <VStack spacing="8px">
                  <Text
                    align={'flex-start'}
                    lineHeight="17.75px"
                    as="span"
                    fontWeight="600"
                    fontSize="14px"
                  >
                    {customerInfo?.phone}
                  </Text>
                  <Flex align="center" gap="9px">
                    <Button
                      px="8px"
                      borderRadius="48px"
                      h="23px"
                      alignSelf="flex-end"
                      onClick={placeACall}
                      bg="rgba(69, 69, 254, 0.1)"
                    >
                      <Flex gap="10px">
                        <Image src={calling.src} boxSize="12px" alt="" />
                        <Text color="#4545FE" fontSize="12px" borderRadius="48px" as="span">
                          Call now
                        </Text>
                      </Flex>
                    </Button>
                  </Flex>
                </VStack>
              </HStack>
              <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={2}>
                <Text
                  fontWeight="400"
                  fontSize="14px"
                  lineHeight="18px"
                  textAlign="right"
                  color="#191919"
                >
                  Email
                </Text>
                <Link href={customerInfo?.email ? `mailto:${customerInfo?.email}` : null}>
                  <Text
                    fontWeight="600"
                    fontSize="14px"
                    lineHeight="18px"
                    textAlign="right"
                    color={customerInfo?.email ? '#4545FE' : '#191919'}
                  >
                    {customerInfo?.email ?? <BsDashLg />}
                  </Text>
                </Link>
              </HStack>
              <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={2}>
                <Text
                  fontWeight="400"
                  fontSize="14px"
                  lineHeight="18px"
                  textAlign="right"
                  color="#191919"
                >
                  Gender
                </Text>
                <Text
                  fontWeight="600"
                  fontSize="14px"
                  lineHeight="18px"
                  textAlign="right"
                  color="#191919"
                >
                  {customerInfo?.gender ?? <BsDashLg />}
                </Text>
              </HStack>
              {/* <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={2}>
                <Text
                  fontWeight="400"
                  fontSize="14px"
                  lineHeight="18px"
                  textAlign="right"
                  color="#191919"
                >
                  {referral?.type == 'created' ? 'Created by' : 'Referred by'}
                </Text>
                <HStack
                  spacing="4px"
                  p="6px 0px"
                  align="center"
                  h="full"
                  cursor={referral?.id && referral?.id !== loggedInUser?.id ? 'pointer' : ''}
                >
                  <Image
                    alt=""
                    boxSize="18px"
                    src={referral?.avatar}
                    w="fit-content"
                    maxW="20px"
                    borderRadius="full"
                  />
                  <VStack>
                    <Text
                      fontWeight="500"
                      fontSize="14px"
                      color="#191919"
                      textTransform="capitalize"
                      _hover={{textDecoration: referral?.id ? 'underline' : 'none'}}
                    >
                      {referral?.name ?? <BsDashLg />}
                    </Text>
                  </VStack>
                </HStack>
              </HStack> */}
            </Stack>
          </Stack>
        </Box>
      </Show>
      <Hide above="lg">
        <Box
          bg={'#fff'}
          w={'full'}
          // border={'1px solid #EEEEEE'}
          // boxShadow={'sm'}
          p={'22px'}
          borderRadius={'lg'}
        >
          <HStack align={'center'} spacing={8} justifyContent={'space-between'}>
            <HStack gap={'10px'} align={'flex-start'} flex={'1'}>
              <Center
                height={50}
                width={50}
                minH={50}
                minW={50}
                borderRadius="50%"
                overflow={'hidden'}
              >
                <Image
                  alt=""
                  objectFit="cover"
                  minW={'100%'}
                  minH={'100%'}
                  src={customerInfo?.avatar ?? ''}
                />
              </Center>
              <VStack fontSize={14} align={'start'} gap="4px">
                <Text fontWeight={500} textTransform={'capitalize'}>
                  {`${customerInfo?.first_name ?? ''} ${customerInfo?.last_name ?? ''}`}
                </Text>
                <Text align={'flex-start'} fontWeight="500" color={'#919191'}>
                  {customerInfo?.phone}
                </Text>
                <Text
                  fontWeight="600"
                  lineHeight="18px"
                  textAlign="left"
                  wordBreak={'break-word'}
                  color="#4545FE"
                >
                  {customerInfo?.email ?? 'N/A'}
                </Text>
              </VStack>
            </HStack>
            <HStack align={'center'} gap="10px">
              <Center
                as={Link}
                href={customerInfo?.email ?? `mailto:${customerInfo?.email}`}
                background={'#E0E0FC'}
                borderRadius={'50%'}
                h={'48px'}
                w="48px"
              >
                <Image objectFit="contain" fill src={messageIcon.src} alt="" />
              </Center>
              <Center background={'#E0E0FC'} borderRadius={'50%'} h={'48px'} w="48px">
                <Image objectFit="contain" fill src={phoneIcon.src} alt="" />
              </Center>
            </HStack>
          </HStack>
        </Box>
      </Hide>
    </Stack>
  );
};

export default User_profile_info;
