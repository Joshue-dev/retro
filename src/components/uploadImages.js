import {
  Box,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
  useToast,
  Center,
  useTheme,
  Button,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import uploadIcon from "./../images/icons/Upload_settings.svg";
import { CloseIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";
import { encodeFileToBase64 } from "../utils";
import { useLightenHex } from "utils/lightenColorShade";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";

const UploadImages = (props) => {
  const {
    setFieldValue,
    files,
    setFiles,
    values,
    maxFiles,
    index,
    displayText,
    ...rest
  } = props;
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  const toast = useToastForRequest();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxSize: 2 * 1024 * 1024,
    maxFiles: 1,
    multiple: false,
    onDrop: useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) =>
        encodeFileToBase64(file).then((res) => {
          setFiles((prevValue) => [
            ...prevValue,
            Object.assign({ image: res }, file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  });
  const removeFile = (index) => {
    const copy = [...files];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    setFiles(copy);
  };

  useEffect(() => {
    if (files.length > maxFiles) {
      setFiles(files.slice(0, maxFiles));
      toast({
        description: `Sorry, you're limited to ${maxFiles} image uploads.`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [files, setFiles, toast, maxFiles]);

  const thumbs =
    files &&
    files?.slice(0, maxFiles)?.map((file, index) => (
      <Flex maxW="680px" wrap="flex-wrap" key={index} align="center" h="full">
        <Box pos="relative" h="full" pr="14.9px">
          {/* <Icon
            as={}
            cursor="pointer"
            onClick={() => removeFile(index)}
            pos="absolute"
            right="-20%"
            zIndex={1000}
            top="0"
            width="30px"
            height="30px"
            alt="cancel_icon"
            color="red"
          /> */}

          <Center
            pos="absolute"
            right="50%"
            mx="0 auto"
            left="50%"
            transform="translateX(-50%)"
            zIndex={1000}
            bottom="0"
            cursor="pointer"
            bg="#d1d1d1"
            w="25px"
            h="25px"
            borderRadius="full"
            onClick={() => removeFile(index)}
          >
            <CloseIcon fontSize={10} />
          </Center>

          <Image
            alt="image preview"
            w="70px"
            maxW="70px"
            objectFit="cover"
            maxH="70px"
            h="70px"
            borderRadius="10px"
            src={file.preview}
            onLoad={() => {
              URL.revokeObjectURL(file.image);
            }}
          />
        </Box>
      </Flex>
    ));

  useEffect(() => {
    return () =>
      files && files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Flex
      w="full"
      px="12px"
      py="8px"
      border={"2px solid"}
      borderColor={lightenHex(80)}
      borderStyle={"dashed"}
      bg={theme.theme_name !== "light" ? "background" : lightenHex(95)}
      align={"center"}
      gap="7px"
      justify="space-between"
      {...getRootProps({ className: "dropzone" })}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <Text
          color="text"
          letterSpacing="0.52px"
          fontWeight={500}
          fontSize={13}
        >
          Drop the files here ...
        </Text>
      ) : (
        <Text
          color={files?.length ? "text" : '#667085'}
          letterSpacing="0.52px"
          fontWeight={500}
          fontSize={{ base: "14px", md: "16px" }}
        >
          {displayText}
        </Text>
      )}
      <Button
        w={{ base: "102px", md: "130px" }}
        h={{ base: "32px", md: "41px" }}
        _hover={{ bg: "" }}
        p="10px"
        bg="primary"
        color="#fff"
        borderRadius="0"
      >
        <Text fontSize={{ base: "12px", md: "16px" }} fontWeight={600}>
          Upload
        </Text>
      </Button>
    </Flex>
  );
};

export default UploadImages;
