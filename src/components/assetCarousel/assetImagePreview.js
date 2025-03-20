import React from "react";
import {
  Image,
  Flex,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import { Popup } from "ui-lib";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const AssetImagePreview = ({
  showPreview,
  slideImages,
  src,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  
  const slideImagesrc = slideImages?.[currentImageIndex]?.original || slideImages?.[currentImageIndex]?.photo || slideImages?.[currentImageIndex]?.image_file;

  return (
    <Popup
      mt="6vh"
      size="full"
      minH="679px"
      color="#191919"
      overflow="hidden"
      isOpen={showPreview.isOpen}
      onClose={showPreview.onClose}
      minW={{ base: "90%", md: "1190px" }}
      bg="gray"
      style={{ ...glassmorphicBg }}
    >
      <Popup.Body overflow='hidden' h="auto">
        <Flex
          height="600px"
          width={"100%"}
          justifyContent="center"
          alignItems={"center"}
        >
          {currentImageIndex > 0 && (
            <button onClick={() => setCurrentImageIndex(currentImageIndex - 1)}>
              <IoChevronBack size={30} />
            </button>
          )}

          <Box width={"max-content"} maxH='600px' position={"relative"} p='2rem'>
            <Image
              src={slideImagesrc}
              layout="fill"
              objectFit='contain'
              loading="lazy"
              maxH='600px'
            />
          </Box>
          {currentImageIndex < slideImages?.length - 1 && (
            <button onClick={() => setCurrentImageIndex(currentImageIndex + 1)}>
              <IoChevronForward size={30} />
            </button>
          )}
        </Flex>
      </Popup.Body>
    </Popup>
  );
};

export default AssetImagePreview;

const glassmorphicBg = {
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};
