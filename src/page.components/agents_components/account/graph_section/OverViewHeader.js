import React from 'react';
import {RiDownloadCloudLine} from 'react-icons/ri';
import {ChevronDownIcon} from '@chakra-ui/icons';

import {
  Box,
  Button,
  Divider,
  extendTheme,
  Flex,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {getAccountGraphDetails} from '../../../../api/agents';

export const OverViewHeader = ({showing, setFilterByVal, filterByVal}) => {
  const router = useRouter();

  const DASHBOARD_GRAPH_OVERVIEW = useQuery(
    ['dashboard-graph-overview', 'account_transaction'],
    () => getAccountGraphDetails(3)
  );

  const data = DASHBOARD_GRAPH_OVERVIEW && DASHBOARD_GRAPH_OVERVIEW?.data?.data?.data?.card_data;

  const isAllAccountTransactionsZero = () => {
    return (
      data?.balance === 0 &&
      data?.graph_item_commission === 0 &&
      data?.graph_item_revenue === 0 &&
      data?.graph_item_withdrawal === 0
    );
  };

  return (
    <Box>
      <HStack justify="space-between" maxW="5xl">
        <Stack>
          <Heading fontFamily='Euclid Circular B' fontSize="18px" fontWeight={600} align="left">
            Sales Overview
          </Heading>
          {showing && (
            <Text fontSize="14px" fontWeight={400} color="grey">
              Showing overview - {showing}
            </Text>
          )}
        </Stack>
        <Button
          bg={'transparent'}
          border="1px solid #4545FE"
          color="#4545FE"
          borderRadius="12px"
          px="46px"
          py="14px"
          mb="5px"
          isDisabled={isAllAccountTransactionsZero()}
          _disabled={{
            cursor: 'not-allowed',
          }}
          onClick={() =>
            isAllAccountTransactionsZero() ? null : router.push('account/account_transactions')
          }
          _hover={{bg: 'transparent'}}
        >
          Transactions
        </Button>
      </HStack>
      <RadioGroup w="full" onChange={setFilterByVal} value={filterByVal}>
        <Flex justify="flex-end" mt={1} align="center">
          <HStack spacing={4} align="center" h="35px">
            <Radio value="2" hidden>
              <Text
                py="5px"
                textAlign="center"
                borderRadius="8px"
                w="80px"
                fontWeight={filterByVal == '2' ? '600' : '400'}
                bg={filterByVal == '2' ? '#E9E9E9' : 'transparent'}
              >
                Weekly
              </Text>
            </Radio>

            <Radio value="3" hidden>
              <Text
                py="5px"
                textAlign="center"
                borderRadius="8px"
                w="80px"
                fontWeight={filterByVal == '3' ? '600' : '400'}
                bg={filterByVal == '3' ? '#E9E9E9' : 'transparent'}
              >
                Monthly
              </Text>
            </Radio>
            <Radio value="4" hidden>
              <Text
                py="5px"
                textAlign="center"
                borderRadius="8px"
                w="80px"
                fontWeight={filterByVal == '4' ? '600' : '400'}
                bg={filterByVal == '4' ? '#E9E9E9' : 'transparent'}
              >
                Yearly
              </Text>
            </Radio>
          </HStack>
        </Flex>
      </RadioGroup>
      <Divider color="#E4E4E4" my={2} mt={1} />
    </Box>
  );
};

export default OverViewHeader;
