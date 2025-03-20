import {GridItem, HStack, Text, Stack, Box, Divider, useMediaQuery} from '@chakra-ui/react';
import React, {useState} from 'react';
import {formatToCurrency} from '../../utils';
import {changeDateFormat} from '../../utils/formatDate';
import TransactionHistory from './components/assetsTransactionHistory';
import FRACTIONTRANSACTIONHISTORYCOLUMN from '../../constants/tables/fractionsTransactionHistoryColumns';
import {useInfiniteQuery} from 'react-query';
import {fractionalEquityTransactionHistory} from '../../api/listing';
import {useRouter} from 'next/router';

const FractionalTransactionInfo = ({info}) => {
  const [isBelowXl] = useMediaQuery('(max-width: 1270px)');
  const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: thumbColor,
    },
  });

  const {query} = useRouter();

  const [shouldScroll, setScrollDirection] = useState('down');

  const {
    data: infiniteData,
    error,
    isError,

    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fraction transaction', info?.id],
    queryFn: ({pageParam = `${info?.id}&page=1`}) => {
      return fractionalEquityTransactionHistory(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      const maxPageNumber = Math.ceil(lastPage?.data?.count / 10);
      const nextPageNumber = pages.length + 1;

      return nextPageNumber <= maxPageNumber ? `${query.id}&page=${nextPageNumber}` : undefined;
    },
  });

  const scrollToTop = () => {
    const wrap = document?.getElementById('tnxsHistory');

    wrap.scrollTop = 0;
  };
  const numberOfTransactions =
    infiniteData?.pages?.flatMap(trnx => trnx?.data?.results?.map(() => 0))?.length ?? 0;

  const handleAnimation = wrap => {
    const currentScrollY = wrap?.scrollTop;

    if (currentScrollY > 840 && numberOfTransactions > 10) {
      setScrollDirection('up');
    } else {
      setScrollDirection !== 'down' ? setScrollDirection('down') : null;
    }
  };

  const handleScroll = () => {
    const wrap = document?.getElementById('tnxsHistory');

    handleAnimation(wrap);

    if (
      !isFetchingNextPage &&
      numberOfTransactions >= 10 &&
      wrap?.clientHeight + wrap?.scrollTop >= wrap?.scrollHeight
    ) {
      return hasNextPage ? fetchNextPage() : null;
    }
  };
  const arrayData = infiniteData?.pages?.flatMap(transHistory =>
    transHistory?.data?.results?.map(item => item)
  );

  return (
    <Stack
      onScroll={handleScroll}
      sx={customScrollbarStyles()}
      id="tnxsHistory"
      overflowY="auto"
      scrollBehavior="smooth"
    >

      <TransactionHistory
        arrayData={arrayData || []}
        isLoading={isLoading}
        Column={FRACTIONTRANSACTIONHISTORYCOLUMN}
        isError={isError}
        error={error}
        infiniteData={infiniteData}
        shouldScroll={shouldScroll}
        scrollToTop={scrollToTop}
        isFetchingNextPage={isFetchingNextPage}
        numberOfTransactions={numberOfTransactions}
        spacing={{xl: '15.66px', base: '10.68px'}}
      />
    </Stack>
  );
};

export default FractionalTransactionInfo;
