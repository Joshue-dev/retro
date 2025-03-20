import { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Text,
  Box,
  Center,
  Textarea,
  HStack,
  Stack,
  Icon,
  useTheme,
  DrawerFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  useMediaQuery,
  Image,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { feedbackEquity, getfeedbackHistory } from "../../api/navbarMenu";
import { Button } from "../../ui-lib";
import { useMutation, useQuery } from "react-query";
import FeedbackHistory from "./feedbackHistory";
import { scrollBarStyles } from "../common/ScrollBarStyles";
import { BsArrowLeft } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { toastForError } from "utils/toastForErrors";
import historyIcon from "/src/images/icons/feedback_history_Icon.svg"
const FeedbackEquity = ({ feedModal, equity, refetch }) => {
  const theme = useTheme();
  const toast = useToastForRequest();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [message, setMessage] = useState(null);
  const [rating, setRating] = useState(0);
  const [screen, setScreen] = useState("");
  const submitFeedback = useMutation(
    (formData) => feedbackEquity(formData, equity?.id),
    {
      onSuccess: async (res) => {
        await refetch();
        toast({
          title: "Thank You!",
          description: "We appreciate your feedback",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        feedModal.onClose();
      },
      onError: (err) => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleResetModal = () => {
    setMessage(null);
    setRating(0);
    submitFeedback.reset();
    feedModal.onClose();
  };

  return (
    <>
      {isMobile ? (
        <Drawer
          autoFocus={false}
          isCentered
          onCloseComplete={handleResetModal}
          blockScrollOnMount={true}
          onClose={feedModal?.onClose}
          isOpen={feedModal?.isOpen}
        >
          <DrawerOverlay />
          <DrawerContent
            top="unset !important"
            bottom={{ base: "unset", md: "24px !important" }}
            right={{ base: "unset", md: "24px !important" }}
            w="full"
            h={"fit-content"}
            minW='full'
            bg={
              theme.theme_name !== "light"
                ? "matador_background.200"
                : "card_bg"
            }
            px="0"
            roundedTop={{ base: "16px", md: 0 }}
          >
            <InspectionFeedbackContent
              rating={rating}
              setRating={setRating}
              message={message}
              setMessage={setMessage}
              feedModal={feedModal}
              equity={equity}
              refetch={refetch}
              submitFeedback={submitFeedback}
              screen={screen}
              setScreen={setScreen}
            />
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          isCentered
          onCloseComplete={handleResetModal}
          blockScrollOnMount={true}
          onClose={feedModal?.onClose}
          isOpen={feedModal?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW="50.5rem"
            h="fit-content"
            minH={"75rem"}
            maxH={"75rem"}
            right={`9.3rem`}
            bottom={"calc(10vh - 4rem)"}
            borderRadius={0}
            position="fixed"
          >
            <InspectionFeedbackContent
              rating={rating}
              setRating={setRating}
              message={message}
              setMessage={setMessage}
              feedModal={feedModal}
              equity={equity}
              refetch={refetch}
              submitFeedback={submitFeedback}
              screen={screen}
              setScreen={setScreen}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default FeedbackEquity;

const InspectionFeedbackContent = (props) => {
  const {
    rating,
    setRating,
    message,
    setMessage,
    feedModal,
    equity,
    submitFeedback,
    screen,
    setScreen,
  } = props;
  const theme = useTheme();
  const feedbackQuery = useQuery(["feedbackhistory", equity?.id], () =>
    getfeedbackHistory(equity?.id)
  );
  const [hover, setHover] = useState(null)
  const feedbackData = feedbackQuery?.data?.data?.message;
  const isValid = message || rating;
  const handleSubmit = () => {
    const body = {
      feedback: message,
      type: "inspection",
      rating: rating.toFixed(1),
    };
    return submitFeedback.mutate(body);
  };

  return (
    <>
      <Box py="10px">
        <Box
          borderBottom="1px solid"
          borderBottomColor={
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.300"
          }
          px={{ base: "15px", md: "20px" }}
        >
          {screen === "history" ? (
            <Flex
              px={{ base: "8px", md: 0 }}
              pb={{ base: "16px", md: "20px" }}
              pt={{ base: "16px", md: "6px" }}
              direction="row"
              justify="space-between"
              align={"center"}
            >
              <HStack gap='12px'>
                <Icon
                as={BsArrowLeft}
                  style={{ cursor: "pointer" }}
                  onClick={() => setScreen("")}
                  fontSize='20px'
                  color='text'
                />

                <Text
                  fontSize={{ base: "16px", md: "20px" }}
                  fontWeight={600}
                  textTransform={{ base: "uppercase", md: "capitalize" }}
                  fontFamily={{ base: "Open Sans", md: "Noto Sans" }}
                  letterSpacing={{ base: "0.96px", md: "unset" }}
                  color="text"
                >
                  Feedback History
                </Text>
              </HStack>
              <CloseIcon
                color="text"
                cursor="pointer"
                fontSize="12px"
                onClick={feedModal?.onClose}
                mt={{ md: 2 }}
              />
            </Flex>
          ) : (
            <Flex
              px={{ base: "8px", md: 0 }}
              pb={{ base: "16px", md: "20px" }}
              pt={{ base: "16px", md: "6px" }}
              direction="row"
              justify="space-between"
              align={"center"}
            >
              <Text
                fontSize={{ base: "16px", md: "20px" }}
                fontWeight={600}
                textTransform={{ base: "uppercase", md: 'unset' }}
                fontFamily="Noto Sans"
                letterSpacing={{ base: '0.96px', md: '0.2px' }}
                color="text"
              >
                Inspection Feedback
              </Text>
              <HStack gap="20px">
                {feedbackData?.length > 0 && (
                  <Center
                    w="48px"
                    h="48px"
                    borderRadius={"10px"}
                    border={"0.672px solid"}
                    borderColor={
                      theme.theme_name !== "light"
                        ? "matador_border_color.200"
                        : "matador_border_color.300"
                    }
                    bg={
                      theme.theme_name !== "light"
                        ? "matador_background.100"
                        : "matador_border_color.500"
                    }
                  >
                    <Image
                      src={historyIcon.src}
                      filter={theme.theme_name !== 'light' ? 'invert(1)' : '' }
                      boxSize={"22px"}
                      cursor="pointer"
                      onClick={() => setScreen("history")}
                    />
                  </Center>
                )}
                <CloseIcon
                  color="text"
                  cursor="pointer"
                  fontSize="12px"
                  onClick={feedModal?.onClose}
                  mt={{ md: 2 }}
                />
              </HStack>
            </Flex>
          )}
        </Box>
        {screen === "history" ? (
          <FeedbackHistory setScreen={setScreen} feedbacks={feedbackData} />
        ) : (
          <Box overflowY={"auto"} css={scrollBarStyles}>
            <Box px={{ base: "12px", md: "20px" }}>
              <Text
                color={
                  theme.theme_name !== "light"
                    ? "matador_text.500"
                    : "matador_text.300"
                }
                my={{ base: '20px', md: '8px' }}
                fontSize={"14px"}
                lineHeight={"20px"}
              >
                Thank you for choosing us! Kindly rate your experience
              </Text>
              <HStack
                pl="4px"
                pt={{ md: "8px" }}
                align={"center"}
                gap={{ base: "12px", md: "6px" }}
              >
                {[1, 2, 3, 4, 5].map((index) => (
                   <Icon
                   as={FaStar}
                   onClick={() => setRating(index)}
                   style={{ cursor: "pointer" }}
                   onMouseEnter={() => setHover(index)}
                   onMouseLeave={() => setHover(null)}
                   color={((hover || rating) >= index) ? '#FF9D1D' : '#DADADA'}
                   fontSize={{ base: "24px", md: "32px" }}
                 />
                ))}
              </HStack>
              <Text
                color="text"
                fontSize={{ base: "13px", md: "16px" }}
                mt="20px"
                mb='8px'
                letterSpacing="0.18px"
              >
                Tell us more about your experience
              </Text>
              <Textarea
                color="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                resize="none"
                border="1px solid"
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.100"
                }
                borderRadius={"10px"}
                w="full"
                h="140px"
                bg={
                  theme.theme_name !== "light"
                    ? "matador_background.100"
                    : "transparent"
                }
                outline="1px solid"
                outlineColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.100"
                }
                fontSize="16px"
                p={6}
                opacity={0.6}
              />
            </Box>
            <DrawerFooter>
              <Flex justify={"flex-end"} align={"center"} w="full">
                <Button
                  fontWeight="400"
                  h={{ base: "50px", md: "64px" }}
                  isDisabled={!isValid}
                  isLoading={submitFeedback.isLoading}
                  onClick={handleSubmit}
                  w={{ base: "full", md: "175px" }}
                  align="right"
                  color="white"
                  bg="primary"
                  mt="30px"
                  letterSpacing="0.18px"
                  textTransform="uppercase"
                  fontSize='14px'
                  _active={{
                    opacity: 1,
                  }}
                >
                  Submit
                </Button>
              </Flex>
            </DrawerFooter>
          </Box>
        )}
      </Box>
    </>
  );
};
