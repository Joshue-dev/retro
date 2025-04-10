import { Button, Flex, Text, useMediaQuery, useTheme, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { encodeFileToBase64 } from "../../../utils";
import { useLightenHex } from "../../../utils/lightenColorShade";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { Spinner } from "ui-lib";
import { truncateLongText } from "utils/truncateLongText";

export const UploadUserDocuments = ({
  handleDocument,
  displayText,
  type,
  isLoading,
}) => {
  const extractBase64 = (arr) => arr.map((file) => file.image);
  const [files, setFiles] = useState([]);
  const toast = useToastForRequest();
  const theme = useTheme();
  const { lightenHex } = useLightenHex();
  const [isMobile] = useMediaQuery('(max-width: 767px)');
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: type ?? { "image/*": [], "application/pdf": [] },
    maxSize: 2 * 1024 * 1024,
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
    }),
  });

  useEffect(() => {
    if (fileRejections.length) {
      toast({
        description: `${fileRejections[0].errors[0].code}: file is larger than 2MB`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [fileRejections, acceptedFiles]);

  useEffect(() => {
    if (files.length) {
      handleDocument(extractBase64(files));
    }
  }, [files]);

  useEffect(() => {
    return () =>
      files && files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  const isDarkMode = theme.theme_name !== "light";

  return (
    <Flex
      w="full"
      px="18px"
      py="8px"
      border={"2px solid"}
      borderColor={lightenHex(80)}
      borderStyle={"dashed"}
      bg={isDarkMode ? "background" : lightenHex(95)}
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
          color="text"
          letterSpacing="0.52px"
          fontWeight={500}
          fontSize={{ base: "15px", md: "16px" }}
        >
          {isLoading ? truncateLongText(files[0]?.path, isMobile ? 30 : 50).truncatedText : displayText}
        </Text>
      )}
      {isLoading ? (
        <Spinner size={'30px'} noAbsolute />
      ) : (
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
            Upload File
          </Text>
        </Button>
      )}
    </Flex>
  );
};

export default UploadUserDocuments;
