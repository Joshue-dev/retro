import React, {useEffect, useRef, useState} from 'react';
import {Box, Flex, Image} from '@chakra-ui/react';
import ImageGallery from 'react-image-gallery';
import backIcon from '../../images/navar/backIconMobile.svg';
import {useRouter} from 'next/router';
import AssetImagePreview from './assetImagePreview';

const AssetCarouselMobile = ({leftItem, rightItem, slideImages, noBorderRadius = false}) => {
  const [showPreview, setShowPreview] = useState(false);
  const galleryRef = useRef();
  const router = useRouter();

  useEffect(() => {
    galleryRef.current?.play();
  }, []);

  const handleImageExpansion = index => {
    galleryRef.current?.pause();
    setShowPreview(true);
  };

  const buttonStyles = {
    zIndex: 2,
    top: '45%',
    display: 'flex',
    aspectRatio: 1 / 1,
    position: 'absolute',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'xl',
    border: '.1rem solid #EAEAEA',
    backgroundColor: '#FFFFFFB2',
  };

  return (
    <>
      <Box w="full" h="25.0rem">
        <Box w="full" h="full">
          <ImageGallery
            onClick={() => handleImageExpansion()}
            showPlayButton={false}
            disableKeyDown
            ref={galleryRef}
            showNav={false}
            slideInterval={3000}
            showThumbnails={false}
            items={slideImages}
            showFullscreenButton={false}
            renderItem={item => (
              <Image
                borderRadius={noBorderRadius ? 'none' : '1.6rem'}
                src={item?.original}
                objectFit={'cover'}
                w="full"
                h="25.0rem"
              />
            )}
          />
        </Box>
      </Box>

      <AssetImagePreview
        slideImages={slideImages}
        setShowPreview={setShowPreview}
        showPreview={showPreview}
      />
    </>
  );
};

export default AssetCarouselMobile;
