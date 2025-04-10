import React from 'react';
import {Box, Flex, Container, Image, Text, HStack, Heading} from '@chakra-ui/react';
import {themeStyles} from '/src/theme';
import {AMENITIES} from '/src/constants/icons_image_url';

export const ListingInfoAmenities = ({data}) => {
  return (
    <Box my="60px" w="100%">
      <Heading fontFamily='Euclid Circular B'
        fontSize={{base: `18px`, lg: '28px'}}
        fontWeight="500"
        color="#191919"
        lineHeight="31px"
      >
        Amenities
      </Heading>
      <Container
        {...themeStyles.containerStyles}
        // maxW="1284px"
        padding="19px 36px"
        w={`100%`}
        mt="10px"
        border={{base: 'none', lg: `1px solid #E4E4E4`}}
      >
        <Flex gap="18px 30px" wrap="wrap" justify={{base: 'center', lg: `left`}}>
          {data.map((amenity, index) => (
            <HStack
              key={index}
              bg={{base: `transparent`, lg: '#FAFAFA'}}
              borderRadius="20px"
              p="14px"
            >
              <Image
                alt=""
                src={AMENITIES[amenity.name.toLowerCase().replace(/ |\/+/g, '_', '_')]?.src}
                boxSize="24px"
              />
              <Text>{amenity.name}</Text>
            </HStack>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default ListingInfoAmenities;
