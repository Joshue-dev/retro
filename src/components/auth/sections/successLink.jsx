import React from 'react';
import {Flex, Text, Box, Stack, HStack, Button, useTheme} from '@chakra-ui/react';
import {useMutation} from 'react-query';
import {AttemptLogin, agentLogin} from '../../../api/auth';
import {store_name} from '../../../constants/routes';
import {FormInput} from '../../../ui-lib';
import { useToastForRequest } from 'ui-lib/ui-lib.hooks/useToast';

const SuccessLink = ({setPage, email, ...rest}) => {
  const toast = useToastForRequest();
  const theme = useTheme()
  const isDarkMode = theme.theme_name !== 'light'
  const storeName = store_name();

  const {mutate} = useMutation(formData => AttemptLogin(formData), {
    onSuccess: res => {
      if (
        res?.response?.data?.action === 'signup' ||
        res?.response?.data?.action === 'not_customer'
      ) {
        toast({
          title: `hmm...`,
          description: `${res?.response?.data?.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        // return router.push(`register`);
      } else if (res?.data?.action == 'login') {
        return toast({
          title: `A link was sent to ${email}`,
          description: 'Please check your email address',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      } else if (res?.message === 'Network Error') {
        return toast({
          title: `${res?.message}`,
          description: 'please check your network connection',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.response?.message ?? err?.message ?? err?.code ?? 'An error occured'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const agentAuth = useMutation(formData => agentLogin(formData), {
    onSuccess: res => {
      if (res?.response?.data?.action === 'signup' || res?.response?.data?.action === 'Not Agent') {
        return toast({
          title: `hmm...`,
          description: `${res?.response?.data?.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      } else if (res?.data?.action == 'login') {
        return toast({
          title: `A link was sent to ${email}`,
          description: 'please check your Email',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      } else if (res?.message === 'Network Error') {
        return toast({
          title: `${res?.message}`,
          description: 'please check your network connection',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.response?.message ?? err?.message ?? err?.code ?? 'An error occured'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleResend = () => {
    if (rest.isAgent) {
      agentAuth.mutate({
        email: email,
        store_name: storeName,
      });
    } else {
      mutate({
        email: email,
        store_name: storeName,
      });
    }
  };

  return (
    <Box
      bg={{ md: "card_bg"}}
      maxW={{ md: "420px"}}
      w={`100%`}
      px={{base: `0`, md: '28px'}}
      py={{base: `0`, md: '24px'}}
      borderRadius={'2px'}
      boxShadow={{ md: "0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)"}}
      {...rest}
    >
      <Flex h="full" direction="column" align="start">
        <Text
          fontSize={'20px'}
          pb="10px"
          fontWeight={600}
          color="text"
          fontFamily="Open Sans"
          textTransform={'uppercase'}
          letterSpacing={'0.24px'}
        >
          {rest.isAgent ? `Realtor's Portal` : 'Enter your email address'}
        </Text>
        <Stack
          w={`100%`}
          gap={{base: `24px`, md: `16px`}}
          mt={`8px`}
          textAlign={`start`}
          align={`center`}
        >
          <FormInput
            // mt="24px"
            type="email"
            name="email"
            id="email"
            lable={'Email address'}
            placeholder={email}
            _placeholder={{fontSize: '16px'}}
            fontSize="16px"
            padding={{base: `12px 14px`, md: '14px 15px'}}
            height="100%"
            lineHeight="140%"
            disabled
          />
          <Text color={'matador_text.300'} fontSize={'18px'} lineHeight="24px">
            A link has been sent to your email address. Please check your inbox to confirm the link.
          </Text>
          <HStack w="full" gap="20px">
            <Button
              type="submit"
              w="full"
              onClick={() => setPage('getStarted')}
              border={`1px solid`}
              borderColor={theme.theme_name !== 'light' ? 'matador_border_color.200' : "matador_border_color.100"}
              p="21px"
              h="56px"
              bg={isDarkMode ? 'matador_background.100' : "card_bg"}
              rounded={0}
              _hover={{
                bg: '',
              }}
              fontSize={{ base: '14px', md: '16px'}}
            >
              <Text
                letterSpacing="0.18px"
                textTransform="uppercase"
                fontWeight={400}
                color={isDarkMode ? 'text' : "#344054"}
              >
                Go back
              </Text>
            </Button>
            <Button
              type="submit"
              color="primary"
              border={`1.4px solid`}
              borderColor={"primary !important"}
              w="full"
              onClick={handleResend}
              p="21px"
              h="56px"
              rounded={0}
              _hover={{
                bg: '',
              }}
              fontSize={{ base: '14px', md: '16px'}}
              bg='transparent'
            >
              <Text letterSpacing="0.18px" textTransform="uppercase" fontWeight={400}>
                Resend link
              </Text>
            </Button>
          </HStack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default SuccessLink;
