import React from 'react';
import {Stack, Text, VStack, Wrap, Container, Center, Flex, Box} from '@chakra-ui/react';

import {NextOfKinDetails} from './NextOfKinDetails';
import {formatToCurrency} from '../../../../utils/formatAmount';
import {changeDateFormat} from '../../../../utils/formatDate';
import BankDetails from './BankDetails';
import {BsDashLg} from 'react-icons/bs';

const styles = {
  boxShadow: 'sm',
  borderRadius: '16px',
  border: '1px solid #F5F5F5',
  align: 'center',
  paddingTop: '32px',
  height: 117,
  justify: 'center',
};
const InfoBox = ({title, text}) => {
  return (
    <VStack
      textAlign={{base: 'left', md: 'center'}}
      alignItems={{base: 'flex-start', md: 'center'}}
      w={{base: '100%', md: '229px'}}
      boxShadow={{base: 'none', md: 'sm'}}
      borderRadius={'16px'}
      border={{base: 'none', md: '1px solid #F5F5F5'}}
      paddingTop={{base: 'none', md: '32px'}}
      minH={{base: 'none', md: '117px'}}
      justify={{base: 'flex-start', md: 'center'}}
    >
      <Text
        fontWeight="400"
        fontSize="14px"
        lineHeight="20px"
        color={{base: `#9D9D9D`, lg: '#606060'}}
      >
        {title}
      </Text>
      <Text fontWeight="500" fontSize="18px" lineHeight="24px" color="#191919">
        {text || <BsDashLg />}
      </Text>
    </VStack>
  );
};

export const AdditionalInfo = ({customerInfo}) => {
  return (
    <Stack>
      <Text w="full" textAlign="start" fontSize="16px" fontWeight="500" mt={`20px`}>
        Additional Information
      </Text>
      <Box
        maxW="888px"
        borderRadius="16px"
        background={{base: 'transparent', md: '#FFFFFF'}}
        border={'none'}
        p={{base: '0px', md: 22}}
      >
        <Flex
          flexWrap="wrap"
          justifyContent={{base: 'flex-start', md: 'center'}}
          gap="24px"
          spacingX="24px"
          spacingY="19px"
          mb="25px"
          bg="#ffffff"
          borderRadius={'12px'}
          padding={{base: '16px', md: '0px'}}
        >
          <InfoBox
            title="Annual Income"
            text={
              customerInfo?.user_info?.yearly_income
                ? `₦ ${customerInfo?.user_info?.yearly_income}`
                : null
            }
          />
          <InfoBox title="Occupation" text={customerInfo?.user_info?.occupation} />
          <InfoBox title="Marital Status" text={customerInfo?.user_info?.marital_status} />
          <InfoBox title="Company Name" text={customerInfo?.user_info?.company_name} />
          <InfoBox title="Education" text={customerInfo?.user_info?.highest_education} />
          <InfoBox
            title="Birth Date"
            text={changeDateFormat(customerInfo?.user_info?.date_of_birth)}
          />
          <InfoBox
            title="Joined Date"
            text={changeDateFormat(customerInfo?.user_info?.sign_up_time)}
          />
        </Flex>
        <BankDetails bankDetails={customerInfo?.saved_banks} />
        <NextOfKinDetails
          customerInfo={
            customerInfo && customerInfo?.next_of_kin?.length > 0 && customerInfo?.next_of_kin[0]
          }
        />
      </Box>
    </Stack>
  );
};
