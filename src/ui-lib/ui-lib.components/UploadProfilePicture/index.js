import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import { Image, Flex, Stack, Box } from "@chakra-ui/react";
import fallbackSrc from "../../../images/avatar.jpeg";
import Camera from "../../../images/icons/camera.svg";
import { encodeFileToBase64 } from "../../../utils";
import { Spinner } from "../Spinner";
import isMobile from "../../../utils/extras";

export const UploadProfilePicture = ({
  files,
  setFiles,
  profileFallback,
  containerStyle,
  isLoading,
  isAvatarLoading,
  avatar,
  numOfFiles,
  ...restProps
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: numOfFiles || "",
    onDrop: useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) =>
        encodeFileToBase64(file)
          .then((res) => {
            setFiles([
              Object.assign(
                { image: res },
                { preview: URL.createObjectURL(file), }
              ),
            ]);
          })
          .catch((err) => {
            return err;
          })
      );
    }, []),
  });

  return (
    <section>
      <Stack
        align="center" direction="row" as="div"
        justify={{ base: 'center', md: 'start'}}
        {...restProps}
      >
        {isAvatarLoading ? (
          <Spinner noAbsolute />
        ) : (
          <Flex align={"start"}  {...getRootProps({ className: "dropzone" })} >
       
            <Image
              src={avatar ?? (profileFallback?.src || fallbackSrc.src)}
              objectFit="cover" boxSize={{ base: '95px', md: '175px' }}
              borderRadius="full" cursor="pointer" alt=""
              border={isMobile ? '3px solid' : '7px solid'} borderColor='background'
              boxShadow='0px 16px 21.333px -5.333px rgba(16, 24, 40, 0.08), 0px 5.333px 8px -2.667px rgba(16, 24, 40, 0.03)'
              {...restProps.imageStyle}
            />
            <Box position='absolute'  ml={{ base: '65px', md: '120px' }} mt={{ base: '65px', md: '125px'}} {...restProps.camera}>
              <Image
                borderRadius="full" src={Camera.src}
                boxSize={restProps.isProfilePic ? { base: '25px', md: '30px'} : { base: '25px', md: '45px'}} alt=""
              />
            </Box>
          </Flex>
        )}
        <input {...getInputProps()} />
      </Stack>
    </section>
  );
};
