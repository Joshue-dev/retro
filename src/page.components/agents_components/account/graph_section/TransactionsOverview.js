import React from 'react';
import {Box, SimpleGrid, Image, Text} from '@chakra-ui/react';

import upArrowRed from '/src/images/icons/upArrowRed.png';
import upArrowGreen from '/src/images/icons/upArrowGreen.png';
import {formatToCurrency} from '../../../../utils';

export const TransactionsOverview = ({data}) => {
  return (
    <SimpleGrid
      h="100%"
      columns={2}
      spacingY="10px"
      spacingX="10px"
      justifyContent="flex-end"
      alignSelf="center"
    >
      {data && (
        <Box
          bg="#fff"
          borderRadius="12px"
          w="189px"
          textAlign="left"
          px="10px"
          py="8px"
          border="1px solid #e4e4e4"
          h="fit-content"
        >
          <Text
            fontSize="18px"
            fontWeight={700}
            lineHeight="25px"
            color="#12D8A0"
            wordBreak="break-word"
          >
            {formatToCurrency(data?.balance)?.split('.')[0]}
            <Text as="span" color="#CBCBCB">
              .{formatToCurrency(data?.balance)?.split('.')[1]}
            </Text>

            {/* {`₦ ${data?.balance ? data?.balance : "0.0"}`} */}
          </Text>
          <Text as="span" fontSize="10px" display="flex" gap={2} mt={2}>
            Balance
            {/* {!!data?.balance && (
              <Text color="#12D8A0" display="flex" align="center" gap={1.2}>
                <Image src={upArrowGreen.src} width="14px" height="14px" /> 2.5%
              </Text>
            )} */}
          </Text>
        </Box>
      )}
      {data && (
        <Box
          bg="#fff"
          borderRadius="12px"
          w="189px"
          textAlign="left"
          px="10px"
          py="8px"
          border="1px solid #e4e4e4"
          h="fit-content"
        >
          <Text
            color="red"
            fontSize="18px"
            fontWeight={700}
            lineHeight="25px"
            wordBreak="break-word"
          >
            {formatToCurrency(data?.graph_item_revenue)?.split('.')[0]}
            <Text as="span" color="#CBCBCB">
              .{formatToCurrency(data?.graph_item_revenue)?.split('.')[1]}
            </Text>
          </Text>
          <Text as="small" fontSize="10px" display="flex" gap={2} mt={2}>
            Revenue
            {/* {data.graph_item_revenue && (
              <Text
                color="#FF6A6A"
                my="auto"
                display="flex"
                align="center"
                gap={1.2}
              >
                <Image src={upArrowRed.src} width="14px" height="14px" /> 0.5%
              </Text>
            )} */}
          </Text>
        </Box>
      )}

      {data && (
        <Box
          bg="#fff"
          borderRadius="12px"
          w="189px"
          textAlign="left"
          px="10px"
          py="8px"
          border="1px solid #e4e4e4"
          h="fit-content"
        >
          <Text
            fontSize="16px"
            fontWeight={700}
            lineHeight="25px"
            color="#FF9103"
            wordBreak="break-word"
          >
            {formatToCurrency(data?.graph_item_commission)?.split('.')[0]}
            <Text as="span" color="#CBCBCB">
              .{formatToCurrency(data?.graph_item_commission)?.split('.')[1]}
            </Text>

            {/* {`₦ ${
              data.graph_item_commission ? data?.graph_item_commission : "0.0"
            }`} */}
          </Text>
          <Text as="small" fontSize="10px" display="flex" gap={2} mt={2}>
            Commission
            {/* {data?.purchases.total && (
							<Text color="#12D8A0" display='flex' align='center' gap={1.2}>
								<Image src={upArrowGreen.src} width='14px' height='14px' /> 2.5%
							</Text>
						)} */}
          </Text>
        </Box>
      )}

      {data && (
        <Box
          bg="#fff"
          borderRadius="12px"
          w="189px"
          textAlign="left"
          px="10px"
          py="8px"
          border="1px solid #e4e4e4"
          h="fit-content"
        >
          <Text
            display="flex"
            color="#4545fe"
            fontSize="18px"
            fontWeight={700}
            lineHeight="25px"
            wordBreak="break-word"
          >
            {formatToCurrency(data?.graph_item_withdrawal)?.split('.')[0]}
            <Text as="span" color="#CBCBCB">
              .{formatToCurrency(data?.graph_item_withdrawal)?.split('.')[1]}
            </Text>

            {/* {`₦ ${
              data?.graph_item_withdrawal ? data?.graph_item_withdrawal : "0.00"
            }`} */}
          </Text>
          <Text as="small" fontSize="10px" display="flex" gap={2} mt={2}>
            Withdrawal
            {/* {data?.graph_item_withdrawal && (
              <Text gap={1.2} display="flex" align="center" color="#12D8A0">
                <Image src={upArrowGreen.src} width="14px" height="14px" />
                2.5%
              </Text>
            )} */}
          </Text>
        </Box>
      )}
    </SimpleGrid>
  );
};

export default TransactionsOverview;
