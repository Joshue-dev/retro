import {Box, useToast} from '@chakra-ui/react';
import {useMutation, useQuery} from 'react-query';
import {fetchWatchlist, toggleWatchlist} from '../../../api/watchlist';
import {WatchlistBookmark} from '../../../components/cards/watchlistBookmark';

const BookmarkProperty = ({info, refetch, color}) => {
  const toast = useToast();
  const {data: watchlistData, refetch: watchlistRefetch} = useQuery(
    ['waitlistipoiid'],
    fetchWatchlist
  );
  const watchlist = watchlistData?.data?.watchlist;

  const isWatchlisted = watchlist?.find(ppt => ppt?.project?.id === info?.id);

  const toggleWatchlistMutation = useMutation(body => toggleWatchlist(body.id), {
    onSuccess: async res => {
      toast({
        description: `${info?.name} in your watchlist has been updated`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      await refetch();
      await watchlistRefetch();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleWatchlist = e => {
    if (toggleWatchlistMutation.isLoading) return;
    e.stopPropagation();
    return toggleWatchlistMutation.mutate({id: info?.id});
  };

  return (
    <Box
      cursor="pointer"
      borderRadius=".4444rem"
      px="1rem"
      py=".8rem"
      border="0.1rem solid"
      borderColor={'#D0D5DD'}
      boxShadow={`0rem .0889rem .1778rem 0rem rgba(16, 24, 40, 0.05)`}
      onClick={handleWatchlist}
      bg={`#FCFCFD66`}
    >
      <WatchlistBookmark
        color="#ffffff"
        // color='red'
        bg={'white'}
        cursor="pointer"
        border=".05rem solid"
        borderColor={'text'}
        is_watchlist={isWatchlisted}
        handleWatchlist={handleWatchlist}
      />
    </Box>
  );
};

export default BookmarkProperty;
