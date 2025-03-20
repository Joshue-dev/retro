import React, {useState} from 'react';
import {AssetImagePreviewIcon} from '../../components/assets/svgs';
import Carousel from 'react-elastic-carousel';
import {Box, Flex, useDisclosure} from '@chakra-ui/react';
import AssetImagePreview from './assetImagePreview';

const PurchaseImageCarousel = ({unitData}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const showPreview = useDisclosure()
  const slideImages =
    unitData?.photos?.map(image => ({
      original: image.photo,
      thumbnail: image.photo,
    })) || [];


  return (
    <>
      <Carousel
        showArrows={false}
        renderPagination={dotProp => (
          <Flex w="full" justify={'center'} gap="10px" p="11px">
            {dotProp.pages.map((dot, i) => (
              <Box
                key={i}
                bg="primary"
                cursor={'pointer'}
                onClick={() => dotProp.onClick(dot)}
                w="8px"
                h="8px"
                borderRadius={'full'}
                opacity={dotProp.activePage === i ? 1 : 0.3}
              />
            ))}
          </Flex>
        )}
      >
        {unitData?.photos?.map(photo => (
          <Flex
            h="220px"
            w="full"
            borderRadius={'8px'}
            bgImage={photo?.photo}
            bgPos='center'
            bgSize='cover'
            p="8.4px"
            justify={'flex-end'}
            align={'flex-end'}
            onClick={showPreview.onOpen}
          >
            <AssetImagePreviewIcon cursor="pointer"  boxSize="23px" />
          </Flex>
        ))}
      </Carousel>

      <AssetImagePreview slideImages={slideImages || []} showPreview={showPreview} currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex} />
    </>
  );
};

export default PurchaseImageCarousel;
