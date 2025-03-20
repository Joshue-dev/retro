import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Text,
  Box,
  Image,
  Center,
  Textarea,
  useToast,
  HStack,
  Stack,
  DrawerFooter,
  useTheme,
} from "@chakra-ui/react";
import processingLoader from "../../images/processing-transaction.gif";
import successfulLoader from "../../images/successful-transaction.gif";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "/src/ui-lib";
import { useMutation } from "react-query";
import UploadImages from "../uploadImages";
import { scrollBarStyles } from "../common/ScrollBarStyles";
import { reportABug } from "../../api/navbarMenu";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";

export const ReportBug = ({ reportBugModal, onDrawerOpen }) => {
  const [message, setMessage] = useState("");
  const toast = useToastForRequest();
  const theme = useTheme();
  const [document, setDocument] = useState([]);
  const toDateFormat = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  console.log(document);
  const reportMutation = useMutation(reportABug, {
    onSuccess: async (res) => {
      toast({
        title: "Success",
        description: "Your report has been submitted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      reportMutation.reset();
      setMessage("");
      setDocument([]);
      reportBugModal.onClose()
    },
    onError: (err) => {
      toast({
        title: "Oops...",
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          "Something went wrong"
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const handleSubmit = () => {
    const image = document.map((item) =>
      item?.image.replace("data:", "").replace(/^.+,/, "")
    );
    const body = { image, message, error: "" };
    return reportMutation.mutate(body);
  };

  const handleResetModal = () => {
    setMessage("");
    setDocument([]);
    reportMutation.reset();
    reportBugModal.onClose();
  };

  return (
    <Drawer
      autoFocus={false}
      placement="bottom"
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={reportBugModal?.onClose}
      isOpen={reportBugModal?.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent
        top="unset !important"
        bottom={{ base: "0", md: "24px !important" }}
        right={{ base: "0", md: "24px !important" }}
        w="full"
        h={"full"}
        px={0}
        maxW={{ base: "100vw", md: "475px" }}
        maxH={"410px"}
        bg={"card_bg"}
        roundedTop="1rem"
      >
        <Box
          py="16px"
          px="20px"
          borderBottom="1px solid"
          borderBottomColor={
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.300"
          }
        >
          <Flex direction="row" justify="space-between" align={"center"}>
            <Text
              fontFamily="Open Sans"
              textTransform="uppercase"
              fontWeight={600}
              color={"text"}
              letterSpacing="0.96px"
            >
              Report a bug
            </Text>
            <CloseIcon
              color={"text"}
              cursor="pointer"
              fontSize="13px"
              onClick={reportBugModal?.onClose}
            />
          </Flex>
        </Box>
        <Stack gap='24px' p={'16px'} pb={0}>
          <Box>
            <Text
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight={500}
              color="text_two"
              mb='5px'
            >
              Comment
            </Text>
            <Textarea
              color={"text"}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              resize="none"
              border="1px solid"
              borderColor={
              theme.theme_name !== "light"
                ? "matador_border_color.200"
                : "matador_border_color.300"
            }
              borderRadius={"5px"}
              w="full"
              bg="rgba(217, 217, 217, 0.10)"
              h="105px"
              _focus={{
                outline: ".3px solid ",
                outlineColor: "matador_text.400",
              }}
              fontSize='14px'
            />
          </Box>
          <UploadImages
              maxFiles={5}
              id="document"
              name="document"
              files={document}
              setFiles={setDocument}
              w="full"
              h="80px"
              mt={0}
              displayText={
                reportMutation?.isLoading
                  ? "Uploading..."
                  : document?.length
                  ? `Uploaded: ${toDateFormat(new Date())}`
                  : "Upload Image"
              }
            />
        </Stack>
        <DrawerFooter w='full'>
          <Button
            h="52px"
            fontWeight="500"
            isDisabled={!message.trim()}
            isLoading={reportMutation.isLoading}
            onClick={handleSubmit}
            w="full"
            align="right"
            color="white"
            bg="primary"
            fontSize={"14px"}
            mt='40px'
            textTransform='uppercase'
            letterSpacing='0.28px'
            rounded='0'
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ReportBug;
