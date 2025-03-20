import {Box, Flex, Image, Text, useTheme} from '@chakra-ui/react';
import React from 'react';
import {AMENITIES} from '../../../constants/icon_images';

const Amenities = ({info}) => {
  const theme = useTheme()
  const amenities = info?.amenities;

  const getIcon = name => {
    const amenName = name
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll('/', '_')
      .replaceAll('  ', '_');
    const amenity = AMENITIES[amenName];
    return amenity?.src;
  };

  return (
    <Box mt={{base: '2.0rem', lg: '3.9rem'}}>
      <Text
        fontSize={{base: '1.6rem', lg: '3.2rem'}}
        lineHeight={{base: '2.0rem', lg: '4.0rem'}}
        fontWeight={600}
        color="matador_text.200"
        mb={{ base: '1rem', md: '4rem' }}
      >
        Amenities
      </Text>
      <Flex
        flexWrap={'wrap'}
        justifyContent={'start'}
        alignItems={'center'}
        // columnGap={{base: '1.6rem', lg: '8.3rem'}}
        // rowGap={{base: '1.4rem', lg: '6.4rem'}}
        gap={{base: `1.6rem`, lg: '4em'}}
      >
        {amenities?.map(amen => (
          <Flex
            key={amen.name}
            gap={{base: '1.0rem', lg: '2.3rem'}}
            direction={'column'}
            alignItems={'center'}
            justify={'flex-start'}
          >
            <Image
              boxSize={{base: '3.25rem', lg: '4.8rem'}}
              alt="next_image"
              src={getIcon(amen.name)}
              filter={theme.theme_name !== 'light' ? `invert(1)` : ``}
            />
            <Text
              fontWeight={400}
              color={`#7A7A7A`}
              fontSize={{base: '.73rem', lg: '1.8rem'}}
              textAlign={'center'}
              textTransform={'uppercase'}
              letterSpacing={{base: `.15rem`, lg: '.373rem'}}
              maxW={{ base: '75px', md: 'full'}}
            >
              {amen.name}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Amenities;
