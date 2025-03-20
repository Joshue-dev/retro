import React, {useEffect, useRef, useState} from 'react';
import {Box, Center, HStack, Image, useDisclosure} from '@chakra-ui/react';
import AssetImagePreview from './assetImagePreview';
import {IoArrowBack, IoArrowForward} from 'react-icons/io5';

let timer;
const AssetCarousel = ({slideImages, showArrows = false, ...rest}) => {
  const showPreview = useDisclosure()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slide, setSlide] = useState(1);

  return (
    <>
      <Box
        w="full"
        //  h="540px"
        aspectRatio={{md: `166 / 54`}}
        position={`relative`}
        {...rest}
      >
        {slideImages?.map((slideImage, i) => (
          <Box
            key={i}
            display={`${slide === i + 1 ? 'block' : 'none'}`}
            alt="next_image"
            w="full"
            aspectRatio={{md: `166 / 54`}}
            onClick={showPreview.onOpen}
            position={`relative`}
            cursor={'zoom-in'}
          >
            <Box
              position={'absolute'}
              h="full"
              w="full"
              zIndex={0}
              background="#0000004D"
            />
            <Image
              cursor={'pointer'}
              objectFit={'cover'}
              w="full"
              h="full"
              src={slideImage?.original}
              alt={`Image`}
              minH={{ base: '325px', md: 'unset'}}
            />
          </Box>
        ))}
        {showArrows && (
          <HStack>
            {slide > 1 && (
              <Center
                position={`absolute`}
                top={`calc(50% - 2.5rem)`}
                left={{ base: '2rem', md: '5rem' }}
                borderRadius={`50%`}
                cursor="pointer"
                p={{ base: '0.65rem', md: '1rem' }}
                boxSize={{ base: '3rem', md: '5rem'}}
                boxShadow={`0rem .0889rem .1778rem 0rem rgba(16, 24, 40, 0.05)`}
                color="text"
                bg={`#FCFCFD66`}
                zIndex={`1`}
                onClick={() => setSlide(slide - 1)}
              >
                <IoArrowBack fontSize={`2rem`} />
              </Center>
            )}
            {slide < slideImages?.length && (
              <Center
                position={`absolute`}
                top={`calc(50% - 2.5rem)`}
                right={{ base: '2rem', md: '5rem' }}
                borderRadius={`50%`}
                cursor="pointer"
                p={{ base: '0.65rem', md: '1rem' }}
                boxSize={{ base: '3rem', md: '5rem'}}
                boxShadow={`0rem .0889rem .1778rem 0rem rgba(16, 24, 40, 0.05)`}
                color="text"
                bg={`#FCFCFD66`}
                zIndex={`1`}
                onClick={() => setSlide(slide + 1)}
              >
                <IoArrowForward fontSize={`2rem`} />
              </Center>
            )}
          </HStack>
        )}
      </Box>

      <AssetImagePreview slideImages={slideImages || []} showPreview={showPreview} currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex} />
    </>
  );
};

export default AssetCarousel;
