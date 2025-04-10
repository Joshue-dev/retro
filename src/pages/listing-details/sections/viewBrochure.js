import React from 'react';
import {Box, HStack, Image, Link, Text, useMediaQuery, useToast} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {fetchWatchlist} from '../../../api/watchlist';
import {MdOutlineFileDownload} from 'react-icons/md';
import brochureIcon from '/src/images/icons/brochure_icon.svg'

const ViewBrochure = ({file, color}) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  return (
    <Link href={file} target="_blank" textDecoration="none" _hover={{border: 'none'}}>
      <Box
        cursor="pointer"
        p={{ base: "8.408px", md: "10.667px"}}
        boxShadow={`0rem .0889rem .1778rem 0rem rgba(16, 24, 40, 0.05)`}
        color="#ffffff"
        bg={`#FCFCFD66`}
        textDecor={`none`}
      >
        <HStack gap={`1rem`}>
          <Image src={brochureIcon.src} alt='' boxSize={'2.4rem'} />
          <Text letterSpacing="0.14px" fontFamily="Liberation Sans" textTransform="uppercase">
            View Brochure
          </Text>
        </HStack>
      </Box>
    </Link>
  );
};

export default ViewBrochure;
