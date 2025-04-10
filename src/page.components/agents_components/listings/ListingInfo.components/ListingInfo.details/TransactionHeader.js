import React from 'react';
import {Box, Flex, Text, VStack, RadioGroup, Radio, SimpleGrid, Stack} from '@chakra-ui/react';
import {handleLastTwoDigits, removeLasttTwoDigits} from '/src/utils';
import {themeStyles} from '/src/theme';

export const TransactionHeader = ({customersMetaData, value, setValue}) => {
  return (
    <Stack pt={{base: 4, lg: 0}} flexDirection={{base: 'column', lg: 'row'}} spacing="21px">
      <Flex
        {...themeStyles.containerStyles}
        w="full"
        padding={{lg: '20px 31px'}}
        maxW={{lg: '846px'}}
        justifyContent={'center'}
        mx={{lg: 'auto'}}
        bg={{base: `transparent`, lg: '#fff'}}
        // border={{base: `none`}}
        border={{lg: `1px solid #e4e4e4`}}
        boxShadow={{base: `none`, lg: `0px 4px 8px 0px rgba(0, 0, 0, 0.02)`}}
      >
        <RadioGroup w="full" onChange={setValue} value={value}>
          <Flex align="stretch" justify={'space-between'} w="full" gap="18px 24px">
            <SimpleGrid
              gridAutoRows={'auto'}
              columns={2}
              gap={{base: '30px 4px', lg: '30px'}}
              w={'full'}
            >
              <Radio
                display={'grid'}
                value="1"
                hidden
                gridColumn={{base: 'span 2', lg: 'unset'}}
                w={'full'}
                ml={0}
              >
                <Box
                  {...themeStyles.md_Box}
                  border={{
                    base: `1px solid ${value == '1' ? '#4545FE' : '#CBCBCB'}`,
                    // lg: `1px solid ${value == '1' ? '#4545FE' : '#f5f5f5'}`,
                    lg: `1px solid ${value == '1' ? '#4545FE' : '#e4e4e4'}`,
                  }}
                  gridColumn={{base: 'span 2', lg: 'unset'}}
                  w={{lg: '380px'}}
                  h={{base: '100px', lg: '125px'}}
                  py={2}
                >
                  <Text fontWeight="600" fontSize={'24px'}>
                    {customersMetaData?.total_customers ?? 0}
                  </Text>
                  <Text py="17px" fontSize="12px" fontWeight={'400'} color="#606060">
                    Total referrals
                  </Text>
                </Box>
              </Radio>
              <Radio display={'grid'} value="2" hidden>
                <Box
                  {...themeStyles.md_Box}
                  border={{
                    base: `1px solid ${value == '2' ? '#4545FE' : '#CBCBCB'}`,
                    // lg: `1px solid ${value == '2' ? '#4545FE' : '#F5F5F5'}`,
                    lg: `1px solid ${value == '2' ? '#4545FE' : '#e4e4e4'}`,
                  }}
                  w={{lg: '380px'}}
                  h={{base: '100px', lg: '125px'}}
                  py={2}
                >
                  <Text fontWeight="600" fontSize={'24px'}>
                    {customersMetaData?.customer_with_outstanding ?? 0}
                  </Text>
                  <Text
                    maxW={197}
                    mx="auto"
                    py="17px"
                    fontSize="12px"
                    fontWeight={'400'}
                    color="#606060"
                  >
                    Subscribers with outstanding payment
                  </Text>
                </Box>
              </Radio>
              <Radio display={'grid'} value="3" hidden>
                <Box
                  {...themeStyles.md_Box}
                  border={{
                    base: `1px solid ${value == '3' ? '#4545FE' : '#CBCBCB'}`,
                    // lg: `1px solid ${value == '3' ? '#4545FE' : '#F5F5F5'}`,
                    lg: `1px solid ${value == '3' ? '#4545FE' : '#e4e4e4'}`,
                  }}
                  w={{lg: '380px'}}
                  h={{base: '100px', lg: '125px'}}
                  py={2}
                >
                  <Text fontWeight="600" fontSize={'24px'}>
                    {customersMetaData?.customer_without_outstanding ?? 0}
                  </Text>
                  <Text
                    maxW={215}
                    mx="auto"
                    py="17px"
                    fontSize="12px"
                    fontWeight={'400'}
                    color="#606060"
                  >
                    Subscribers without outstanding payment
                  </Text>
                </Box>
              </Radio>
              <Radio display={'grid'} value="4" hidden gridColumn={{base: 'span 2', lg: 'unset'}}>
                <Box
                  {...themeStyles.md_Box}
                  border={{
                    base: `1px solid ${value == '4' ? '#4545FE' : '#CBCBCB'}`,
                    // lg: `1px solid ${value == '4' ? '#4545FE' : '#F5F5F5'}`,
                    lg: `1px solid ${value == '4' ? '#4545FE' : '#e4e4e4'}`,
                  }}
                  w={{lg: '380px'}}
                  gridColumn={{base: 'span 2', lg: 'unset'}}
                  h={{base: '100px', lg: '125px'}}
                  py={2}
                >
                  <Text fontWeight="600" fontSize={'24px'}>
                    {customersMetaData?.defaulting_customers ?? 0}
                  </Text>
                  <Text py="17px" fontSize="12px" fontWeight={'400'} color="#606060">
                    Defaulting subscribers
                  </Text>
                </Box>
              </Radio>
            </SimpleGrid>
          </Flex>
        </RadioGroup>
      </Flex>

      <SimpleGrid
        {...themeStyles.containerStyles}
        gridAutoRows={'auto'}
        columns={{base: 2, lg: 1}}
        px={{base: `0px`, lg: '23px'}}
        h="full"
        borderRadius="16px"
        py="17px"
        gap={{base: '17px 13px', lg: '10px'}}
        bg={{base: `transparent`, lg: '#fff'}}
        // border={{base: `none`}}
        border={{lg: `1px solid #e4e4e4`}}
      >
        <Box
          {...themeStyles.md_Box}
          border={{
            base: `1px solid #CBCBCB`,
            // lg: `1px solid #F5F5F5`,
            lg: `1px solid #e4e4e4`,
          }}
          gridColumn={{base: 'span 2', lg: 'unset'}}
          w={{lg: '380px'}}
          h="90px"
          py={2}
        >
          <Text color={'#4545FE'} fontWeight="600" fontSize={'24px'}>
            {` ${
              customersMetaData?.total_purchases
                ? removeLasttTwoDigits(customersMetaData?.total_purchases)
                : '0.0'
            }`}
            {customersMetaData?.total_purchases &&
              handleLastTwoDigits(customersMetaData?.total_purchases)}
          </Text>
          <Text py="10px" fontSize="12px" fontWeight={'400'} color="#606060">
            Total Purchase Price
          </Text>
        </Box>
        <Box
          {...themeStyles.md_Box}
          border={{
            base: `1px solid #CBCBCB`,
            // lg: `1px solid #F5F5F5`,
            lg: `1px solid #e4e4e4`,
          }}
          w={{lg: '380px'}}
          h="90px"
          py={2}
        >
          <Text color={'#12D8A0'} fontWeight="600" fontSize={'24px'}>
            {` ${
              customersMetaData?.total_paid
                ? removeLasttTwoDigits(customersMetaData?.total_paid)
                : '0.0'
            }`}
            {customersMetaData?.total_paid && handleLastTwoDigits(customersMetaData?.total_paid)}
          </Text>
          <Text py="10px" fontSize="12px" fontWeight={'400'} color="#606060">
            Total Paid
          </Text>
        </Box>
        <Box
          {...themeStyles.md_Box}
          border={{
            base: `1px solid #CBCBCB`,
            // lg: `1px solid #F5F5F5`,
            lg: `1px solid #e4e4e4`,
          }}
          w={{lg: '380px'}}
          h="90px"
          py={2}
        >
          <Text color={'#FF6A6A'} fontWeight="600" fontSize={'24px'}>
            {` ${
              customersMetaData?.total_outstanding
                ? removeLasttTwoDigits(customersMetaData?.total_outstanding)
                : '0.0'
            }`}
            {customersMetaData?.total_outstanding &&
              handleLastTwoDigits(customersMetaData?.total_outstanding)}
          </Text>
          <Text py="10px" fontSize="12px" fontWeight={'400'} color="#606060">
            Total Outstanding Balance
          </Text>
        </Box>
      </SimpleGrid>
    </Stack>
  );
};

export default TransactionHeader;
