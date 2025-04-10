import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Box,
  Textarea,
  Flex,
  HStack,
  useTheme,
  Stack,
  ModalFooter,
} from "@chakra-ui/react";
import { Button, CustomizableButton } from "../../ui-lib";
import { useMutation } from "react-query";
import { PostForCustomerEquityValidationoOrDispute } from "../../api/listing";
import { toastForError } from "../../utils/toastForErrors";
import { CloseIcon } from "@chakra-ui/icons";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";

const Dispute = ({
  setType,
  customScrollbarStyles,
  validation_requestsId,
  drawer,
}) => {
  const [message, setMessage] = useState("");
  const toast = useToastForRequest();
  const theme = useTheme();
  const textRef = useRef()
  const disputeEquity = useMutation(
    (formData) => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: () => {
        toast({
          title: `Thank you for the feedback`,
          description: "We’ll get back to you as soon as possible.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        drawer.onClose();
      },
      onError: (err) => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleDispute = () => {
    const obj = {
      action: 'reject',
      reason: message,
      validation_request_id: validation_requestsId,
    };
    return disputeEquity.mutate(obj);
  }

  const isValid = !!message.trim();
  const isDarkMode = theme.theme_name !== "light";

  useEffect(() => {
    if (!textRef.current) return;
    textRef.current.focus();
  }, [textRef]);
  
  return (
    <Stack flex={1}>
      <Box
        px={{ base: "14px", md: "21px" }}
        py={{ base: "18px", md: "32px" }}
        mb="10px"
        top="0"
        bg="card_bg"
        right={0}
        w="full"
        zIndex={200}
        borderTopRadius={{ base: "16px", md: "unset" }}
        borderBottom="0.4px solid"
        borderBottomColor={
          isDarkMode ? "matador_border_color.200" : "matador_border_color.300"
        }
      >
        <Flex w="full" h="20px" justify={"space-between"} align={"center"}>
          <HStack align={"center"}>
            <Text
              color="text"
              fontSize={"20px"}
              fontWeight={600}
              textTransform={"uppercase"}
              fontFamily="Open Sans"
              letterSpacing="1.44px"
            >
              Dispute
            </Text>
          </HStack>
          <CloseIcon
            cursor={"pointer"}
            fontSize={"14px"}
            color="text"
            onClick={drawer?.onClose}
          />
        </Flex>
      </Box>
      <Flex
          direction={"column"}
          w="full"
          h="full"
          justify={'space-between'}
          px="24px"
          // pb="38px"
          flex={1}
        >
          <Box w="full">
            <Text
              color="text"
              fontSize='14px'
              fontWeight={400}
              mb="20px"
              lineHeight="26.7px"
              fontFamily='Noto Sans'
            >
              Is there any mistake in the information provided? Kindly let us
              know.
            </Text>

            <Textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              resize="none"
              border="0.5px solid"
              borderColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
              borderRadius={"2px"}
              w="full"
              h="155px"
              outline="0.5px solid"
              outlineColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
              _focus={{
                border: "0.5px solid",
                borderColor:
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.100"
                
              }}
              autoFocus={false}
              ref={textRef}
              p={4}
              fontFamily='Noto Sans'
            />
          </Box>
          <ModalFooter pb='3rem' px={0}>
            <Flex gap="8px" align="center" mx={"auto"} w="full">
              <CustomizableButton
                h="54px"
                fontSize="16px"
                fontWeight="500"
                border="1px solid"
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.100"
                }
                bg="transparent"
                w="50%"
                color="text"
                onClick={() => setType("summary")}
              >
                BACK
              </CustomizableButton>
              <Button
                h="54px"
                fontSize="16px"
                fontWeight="500"
                bg="primary"
                borderColor="primary"
                color="white"
                w="50%"
                isDisabled={!message || !isValid}
                isLoading={disputeEquity.isLoading}
                onClick={handleDispute}
                _active={{
                  opacity: 1
                }}
              >
                SUBMIT
              </Button>
            </Flex>
          </ModalFooter>
        </Flex>
    </Stack>
  );
};

export default Dispute;
