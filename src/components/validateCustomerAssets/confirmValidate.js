import {
  Box,
  Flex,
  Text,
  HStack,
  useTheme,
} from "@chakra-ui/react";
// import { Button, CustomizableButton } from "../../ui-lib";
import { useMutation } from "react-query";
import { PostForCustomerEquityValidationoOrDispute } from "../../api/listing";
import { toastForError } from "../../utils/toastForErrors";
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { ValidateIcon } from "assets/notifications";
import { Button, CustomizableButton } from "ui-lib/ui-lib.components";

const ConfirmValidate = ({
  validation_requestsId,
  handleClose,
  refetch,
  setType,
  drawer,
  type,
}) => {
  const theme = useTheme();
  const toast = useToastForRequest();
  const validateEquity = useMutation(
    (formData) => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: async (res) => {
        await refetch();
        toast({
          title: `Thank you for your feedback`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        drawer?.onClose()
      },
      onError: (err) => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleValidation = () => {
    const obj = {
      action: "accept",
      validation_request_id: validation_requestsId,
    };

    return validateEquity.mutate(obj);
  };

  return (
    <>
      <Box
        px={"21px"}
        py={{ base: "21px", md: "32px" }}
        mb="18px"
        top="0"
        right={0}
        w="full"
        zIndex={200}
        borderTopRadius={{ base: "16px", md: "unset" }}
        borderBottom="1px solid"
        borderBottomColor={
          theme.theme_name !== "light"
            ? "matador_border_color.200"
            : "matador_border_color.300"
        }
      >
        <Flex w="full" h="20px" justify={"space-between"} align={"center"}>
          <HStack align={"center"}>
            <ChevronLeftIcon
              cursor={"pointer"}
              onClick={() => setType("summary")}
              fontSize={"35px"}
              color={"text"}
            />
            <Text
              color="text"
              fontSize={{ base: "18px", md: "20px" }}
              fontWeight={600}
              textTransform={"uppercase"}
              fontFamily="Open Sans"
              letterSpacing="1.44px"
            >
              Validate
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
      <Box
        maxH={{ base: "100vh", md: "70vh" }}
        w="full"
        h={"fit-content"}
        overflowY={"auto"}
      >
        <Flex
          w="full"
          h={{ base: "35vh", md: "50vh" }}
          direction="column"
          justify={"center"}
          align={"center"}
          px={{ base: "18px", md: "24px" }}
          pb="38px"
          gap='12px'
        >
          <ValidateIcon boxSize='80px' />
          <Text
            fontWeight={600}
            fontSize="24px"
            lineHeight={"36px"}
            color="text"
            textTransform='uppercase'
            letterSpacing='1.44px'
          >
            Are you sure?
          </Text>
          <Text
            color="matador_text.500"
            fontWeight={400}
            fontSize="16px"
            lineHeight={"24px"}
            letterSpacing='0.16px'
            textAlign='center'
          >
            Before proceeding, please ensure that all important details have been verified.
          </Text>

          <Flex mt="10px" gap="8px" align="center" mx={"auto"} w="full">
            <CustomizableButton
              border="1.1px solid"
              borderColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.300"
              }
              color="matador_text.500"
              bg={theme.theme_name !== 'light' ? "matador_background.100" : "card_bg"}
              h="54px"
              w="50%"
              onClick={() => setType("summary")}
              textTransform="uppercase"
              letterSpacing="0.18px"
              fontSize={`16px`}
              outline="1.1px solid"
              outlineColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
            >
              No, Go back
            </CustomizableButton>
            <Button
              onClick={handleValidation}
              bg="primary"
              borderColor="primary"
              color="white"
              h="54px"
              w="50%"
              isLoading={validateEquity?.isLoading}
              textTransform="uppercase"
              letterSpacing="0.18px"
              fontSize={`16px`}
              _active={{
                opacity: 1
              }}
            >
              Yes, Validate
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default ConfirmValidate;