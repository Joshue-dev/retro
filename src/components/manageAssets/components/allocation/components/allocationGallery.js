import {AspectRatio, Box, HStack, Image, Stack, useDisclosure} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Carousel} from 'react-responsive-carousel';
import maximizeIcon from '/src/images/icons/maximizeIcon.svg';
import AssetImagePreview from '@/components/assetCarousel/assetImagePreview';

const AllocationGallery = ({uploads}) => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const showPreview = useDisclosure()

  return (
    <Stack spacing={{base: '7.16px', md: '8px'}}>
      <Carousel
        showStatus={false}
        useKeyboardArrows
        selectedItem={selectedSlide}
        w="full"
        renderIndicator={false}
        showThumbs={false}
        onChange={index => setSelectedSlide(index)}
      >
        {uploads?.map((upload, index) => (
          <React.Fragment key={index}>
            <AspectRatio key={index} w="full" ratio={1.79}>
              <Box w="full" h="auto" bg="#f5f5f5" borderRadius="9px" border="1.125px solid #E4E4E4">
                <Image w="full" src={upload?.image_file} objectFit="cover" borderRadius="9px" />
              </Box>
            </AspectRatio>
            <HStack
              pos="absolute"
              role="button"
              bottom="14px"
              right="18px"
              p="5.37px"
              borderRadius="3.582px"
              bg="rgba(0, 0, 0, 0.20)"
              onClick={showPreview.onOpen}
            >
              <Image src={maximizeIcon.src} boxSize="16px" w="16px !important" />
            </HStack>
          </React.Fragment>
        ))}
      </Carousel>

      <AssetImagePreview slideImages={uploads || []} showPreview={showPreview} currentImageIndex={selectedSlide}
        setCurrentImageIndex={setSelectedSlide} />
    </Stack>
  );
};

export default AllocationGallery;
