import {Heading, HStack, Radio, RadioGroup, Text, VStack} from '@chakra-ui/react';

import React from 'react';

const RequestOverview = ({total_request, pending_request, closed_request, value, setValue}) => {
  return (
    <>
      <RadioGroup value={value} onChange={setValue}>
        <HStack p="16px" bg="#ffffff" borderRadius="16px" spacing="25px" justify="center">
          <Radio value={'0'} hidden>
            <VStack
              align="center"
              justify="center"
              py="30px"
              borderRadius="12px"
              w="399px"
              // border="1px solid #F5F5F5"
              border={value === '0' ? `1px solid #4545FE` : '1px solid #F5F5F5'}
            >
              <Text as="span" fontSize="24px" fontWeight="600" color="#195880">
                {total_request ?? '-'}
              </Text>
              <Text mt="13px" as="span" fontSize="14px" fontWeight="400" color="#195880">
                Pending Requests
              </Text>
            </VStack>
          </Radio>
          <Radio value={'1'} hidden>
            <VStack
              align="center"
              justify="center"
              py="30px"
              borderRadius="12px"
              w="399px"
              // border="1px solid #F5F5F5"
              border={value === '1' ? `1px solid #4545FE` : '1px solid #F5F5F5'}
            >
              <Text as="span" fontSize="24px" fontWeight="600" color="#FF6A6A">
                {pending_request ?? '-'}
              </Text>
              <Text mt="13px" as="span" fontSize="14px" fontWeight="400" color="#FF6A6A">
                Closed Requests
              </Text>
            </VStack>
          </Radio>

          {/* <VStack
          align="center"
          justify="center"
          py="30px"
          borderRadius="12px"
          w="full"
          border="1px solid #F5F5F5"
        >
          <Text as="span" fontSize="24px" fontWeight="600" color="#12D8A0">
            {closed_request ?? 0}
          </Text>
          <Text
            mt="13px"
            as="span"
            fontSize="14px"
            fontWeight="400"
            color="#12D8A0"
          >
            Closed Requests
          </Text>
        </VStack> */}
        </HStack>
      </RadioGroup>
    </>
  );
};

export default RequestOverview;
