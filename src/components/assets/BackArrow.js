import React from 'react';
import backArrow from '../../images/icons/backArrowCircle.png';
import {extendTheme, Heading, HStack, Image} from '@chakra-ui/react';
import {useRouter} from 'next/router';

import {themeStyles} from '../../theme';

export const BackArrowWithText = ({text}) => {
  const router = useRouter();
  return (
    <HStack onClick={() => router.back()}>
      <Image
        zIndex={10}
        style={{cursor: 'pointer'}}
        mr={2}
        height="50px"
        w="50px"
        src={backArrow.src}
        alt="back_arrow"
      />
      <Heading {...themeStyles.textStyles.h3}>{text}</Heading>
    </HStack>
  );
};
