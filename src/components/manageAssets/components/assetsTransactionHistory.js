import React from 'react';
import {Box, Divider, Heading, Hide, Stack, Text} from '@chakra-ui/react';
import StaggeredSkeleton from '../../tables/assetTableSkeleton';
import AssetsTransactionTable from '../../tables/assetsTransactionTable';

const TransactionHistory = ({
  arrayData,
  shouldScroll,
  infiniteData,
  scrollToTop,
  isFetchingNextPage,
  numberOfTransactions,
  isLoading,
  Column,
  isError,
  error,
  children,
  ...rest
}) => {
  return (
     <Stack zIndex={1} w="full" spacing={{base: '2.33px', md: '4px'}}>
       <Text
         position="sticky"
         top="-1px"
         zIndex={1}
         backdropFilter="blur(3px)"
         as="h2"
         fontSize={{base: '14.326px', md: '16px'}}
         lineHeight="39px"
         fontWeight="700"
         fontFamily="Open Sans"
         color="matador_text.500"
       >
         TRANSACTION HISTORY
       </Text>
      {children}
      <Box>
        <StaggeredSkeleton isLoading={isLoading}>
          <AssetsTransactionTable
            shouldScroll={shouldScroll}
            scrollToTop={scrollToTop}
            isFetchingNextPage={isFetchingNextPage}
            forData={[isFetchingNextPage, infiniteData]}
            isLoading={isLoading}
            isError={isError}
            error={error}
            forColumn={[isFetchingNextPage, infiniteData]}
            pageSize={numberOfTransactions}
            DATA={arrayData}
            COLUMNS={Column}
          />
        </StaggeredSkeleton>
      </Box>
    </Stack>
  );
};

export default TransactionHistory;
