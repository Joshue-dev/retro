import {
  Box,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import React, { useState } from "react";
import chatIcon from "../../images/icons/chatIconForInspectionFeedback.svg";
import { useQuery } from "react-query";
import { fetchpendingInspectionFeedbaack } from "../../api/navbarMenu";
import FeedbackEquity from "./feedbackEquity";
import { Button } from "../../ui-lib";
import cancelICon from "/src/images/icons/closeIcon.svg";
import { CloseIcon } from "@chakra-ui/icons";
import { ChatIconForInspectionFeedback } from "../assets/svgs";

export const InspectionFeedBack = () => {
  const theme = useTheme()
  const [willDisplay, setWillDisplay] = useState(true);
  const drawerDisclosure = useDisclosure();

  const { data, refetch } = useQuery(
    ["fetchpendingInspectionFeedbaack"],
    fetchpendingInspectionFeedbaack
  );

  return (
    <Box w="full">
      {data?.data?.data?.length ? (
        <>
          {willDisplay && (
            <HStack
              w="full"
              bg={theme.theme_name !== 'light' ? "card_bg" : "#FCFCFD"}
              mx="auto"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              justify="space-between"
              p={{ base: "10px", md: "8px" }}
              h="full"
              maxH={{ base: "48px", md: "72px" }}
              // mb={{base: '8px', md: '15px'}}
              borderRadius={{ base: "6px", md: "12px" }}
              border="1px solid"
              borderColor={theme.theme_name !== 'light' ? "matador_border_color.200" : "matador_border_color.100"}
            >
              <HStack w="80%" spacing={{ base: "8px", md: "16px" }}>
                <HStack
                  p={{ base: "3px", md: "10px" }}
                  justify="center"
                  align="center"
                  rounded="10px"
                  border="1px solid"
                  borderColor={theme.theme_name !== 'light' ? "matador_border_color.200" : "#E4E7EC"}
                  boxShadow="0px 0px 0px 1px rgba(16, 24, 40, 0.18) inset, 0px -2px 0px 0px rgba(16, 24, 40, 0.05) inset, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                >
                  {/* <Image boxSize={{base: '30px', md: 'unset'}} src={chatIcon.src} alt="home Icon" /> */}
                  <ChatIconForInspectionFeedback color={theme.theme_name !== 'light' ? "#FFF" : "#344054"} boxSize="20px" />
                </HStack>

                <Text color="text">
                  <Text
                    fontSize={{ base: "12px", md: "16px" }}
                    fontWeight={{ base: 500, md: 600 }}
                  >
                    How was your inspection?{" "}
                    <Text
                      as="span"
                      fontSize={{ base: "11px", md: "16px" }}
                      fontWeight={600}
                    >
                      {" We'll"} like to know how it was. Kindly give feedback.
                    </Text>
                  </Text>
                </Text>
              </HStack>

              <HStack spacing={{ base: "8px", md: "18px" }} pr="10px">
                <Button
                  color="#FFF"
                  bg="primary"
                  onClick={drawerDisclosure.onOpen}
                  _hover={{ opacity: 1 }}
                  _active={{ opacity: 1 }}
                  fontSize={{ base: "11px", md: "16px" }}
                  fontWeight={{ base: "500", md: 600 }}
                  px={{ base: "8px", md: "16px" }}
                  py="13px"
                  h={{ base: "23px", md: "44px" }}
                  fontFamily="Inter"
                  rounded="8px"
                >
                  View
                </Button>
                <CloseIcon
                  fontSize="14px"
                  display={{ base: "none", md: "block" }}
                  color={theme.theme_name !== 'light' ? "#FFF" : "#98A2B3"}
                  onClick={() => setWillDisplay(false)}
                  cursor="pointer"
                  src={cancelICon.src}
                />
              </HStack>
            </HStack>
          )}
        </>
      ) : null}
      <FeedbackEquity
        equity={data?.data?.data?.[0]}
        refetch={refetch}
        feedModal={drawerDisclosure}
      />
    </Box>
  );
};

export default InspectionFeedBack;
