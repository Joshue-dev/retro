import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {IoChevronBack, IoChevronForward} from 'react-icons/io5';
import imageFallback from '/src/images/image-fallback.png';
import EmbedVideoForFullScreenView from 'ui-lib/ui-lib.components/EmbedVideo/EmbedVideoForFullScreenView';

export const ListingImageCarousel = ({
  images = [],
  show_bottom_gallery = true,
  show_Slider_buttons = true,
  video_url,
  ...rest
}) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [current_image, set_current_image] = useState(0);
  const disclosure = useDisclosure();
  const breakpoint = 996;

  const images_to_show = screenWidth < breakpoint ? 4 : 5;

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const expand_image = () => {
    disclosure.onOpen();
  };

  const select_photo = index => {
    set_current_image(index);
  };

  const BackArrow = () => {
    return (
      <VStack
        h={`100%`}
        position="absolute"
        top={'0px'}
        left={`0px`}
        bg={`transparent`}
        alignItems={`flex-end`}
        justifyContent={`center`}
        p={`20px`}
        zIndex={`1`}
        onClick={() => {
          set_current_image(current_image - 1);
        }}
        cursor={`pointer`}
        display={current_image <= 0 ? 'none' : `flex`}
      >
        <Center
          w={`40px`}
          h={`40px`}
          minW={`40px`}
          minH={`40px`}
          borderRadius={`50%`}
          bg={`rgba(255, 255, 255, .7)`}
        >
          <IoChevronBack fontSize={`20px`} />
        </Center>
      </VStack>
    );
  };
  const ForwardArrow = () => {
    return (
      <VStack
        h={`100%`}
        position="absolute"
        top={'0px'}
        right={`0px`}
        bg={`transparent`}
        alignItems={`flex-end`}
        justifyContent={`center`}
        p={`20px`}
        zIndex={`1`}
        onClick={() => {
          set_current_image(current_image + 1);
        }}
        cursor={`pointer`}
        display={current_image >= images.length - 1 ? 'none' : `flex`}
      >
        <Center
          w={`40px`}
          h={`40px`}
          minW={`40px`}
          minH={`40px`}
          borderRadius={`50%`}
          bg={`rgba(255, 255, 255, .7)`}
        >
          <IoChevronForward fontSize={`20px`} />
        </Center>
      </VStack>
    );
  };

  return (
    <Box maxW={{lg: rest.maxWidth || rest.maxW || '465px'}} w={`100%`}>
      <Center
        position="relative"
        w="100%"
        aspectRatio={'430 / 364'}
        overflow={'hidden'}
        cursor={'pointer'}
        maxW={{lg: '465px'}}
        minW={{lg: '465px'}}
        borderRadius={{lg: '36px'}}
        {...rest}
      >
        <Image
          src={images[current_image] || imageFallback.src}
          alt="image"
          minW={'100%'}
          minH="100%"
          fill
          style={{objectFit: 'cover'}}
          onClick={expand_image}
        />

        {video_url ? <EmbedVideoForFullScreenView videoId={video_url?.slice(-11)} /> : null}
      </Center>
      {show_bottom_gallery && (
        <Grid
          gridTemplateColumns={`repeat(${images_to_show}, 1fr)`}
          gap={`8px`}
          mt={'10px'}
          padding={{base: `8px`, lg: `0px`}}
        >
          {images?.slice(0, images_to_show - 1)?.map((item, idx) => (
            <Center
              key={idx}
              aspectRatio={'1 / 1'}
              borderRadius="16px"
              overflow={'hidden'}
              cursor="pointer"
              w={`100%`}
              onClick={() => select_photo(idx)}
            >
              <Image
                src={item || imageFallback.src}
                alt="image"
                minW={'100%'}

                minH="100%"
                objectFit={'cover'}
              />
            </Center>
          ))}
          {images?.length >= images_to_show && (
            <Center
              aspectRatio={'1 / 1'}
              borderRadius="16px"
              overflow={'hidden'}
              cursor="pointer"
              w={`100%`}
              onClick={() => {
                select_photo(images_to_show - 1);
                expand_image();
              }}
              position={`relative`}
            >
              <Center
                pos={`absolute`}
                top={`0px`}
                left={`0px`}
                bottom={`0px`}
                right={`0px`}
                bg={`rgba(0,0,0, .7)`}
                color={`#fff`}
                fontSize={'20px'}
              >
                +
                {images?.length - (images_to_show - 1) < 100
                  ? images?.length - (images_to_show - 1)
                  : `99`}
              </Center>
              <Image
                src={images[images_to_show - 1] || imageFallback.src}
                alt="image"
                minW={'100%'}
                minH="100%"
                w="100%"
                objectFit={'cover'}
              />
            </Center>
          )}
        </Grid>
      )}
      {/* this is for mobile */}
      {screenWidth < breakpoint ? (
        <Drawer isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={'full'} dark>
          <DrawerOverlay />
          <DrawerContent bg="#222222" position={`relative`}>
            <DrawerCloseButton fontSize={`20px`} color="#FFFFFF" zIndex={`800000`} />
            <DrawerBody p="0px">
              <BackArrow />
              <Center position="relative" w="100%" overflow={'hidden'} h={`100%`}>
                <Image
                  alt=""
                  src={images[current_image] || imageFallback.src}
                  objectFit={'cover'}
                />
              </Center>
              <ForwardArrow />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          isOpen={disclosure.isOpen}
          onClose={disclosure.onClose}
          isCentered
          // zIndex="2000"
          size={'2xl'}
        >
          <ModalOverlay />
          <ModalContent bg="transparent" boxShadow={'none'}>
            <ModalBody maxW="80vw" minW={'300px'} p="0px" mx="auto">
              <BackArrow />
              <Center position="relative" w="100%" overflow={'hidden'}>
                <Image
                  alt=""
                  src={images[current_image] || imageFallback.src}
                  objectFit={'cover'}
                />
              </Center>
              <ForwardArrow />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};
