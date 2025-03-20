import { HStack, Text, Box, useTheme, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { CloseIcon } from "@chakra-ui/icons";
import cancelICon from "/src/images/icons/closeIcon.svg";
import { getSettingsData } from "@/api/Settings";
import { Button } from "ui-lib/ui-lib.components";
import { ChatIconForInspectionFeedback } from "@/components/assets/svgs";

const SettingsBar = () => {
  const theme = useTheme()
  const [willDisplay, setWillDisplay] = useState(true);
  const profileQuery = useQuery(["getSettingsData", "profile"], () =>
    getSettingsData({ profile: true })
  );
  const {
    date_of_birth,
    marital_status,
    highest_education,
    monthly_income,
    address,
  } = { ...profileQuery?.data?.data?.data };

  const showSettingsBar =
    !date_of_birth &&
    !marital_status &&
    !highest_education &&
    !monthly_income &&
    !address;

  return (
    <Box w="full">
      {showSettingsBar ? (
        <>
          {willDisplay && (
            <HStack
              w="full"
              bg={theme.theme_name !== 'light' ? "card_bg" : "#FCFCFD"}
              mx="auto"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              justify="space-between"
              p={{ base: "10px", md: "12px" }}
              minH={{ base: "48px", md: "72px" }}
              maxH="72px"
              mt={{ base: "8px", md: "15px" }}
              borderRadius={{ base: "6px", md: "12px" }}
              border="1px solid"
              borderColor={theme.theme_name !== 'light' ? "matador_border_color.200" : "matador_border_color.100"}
            >
              <HStack w="80%" spacing='16px'>
                <HStack
                  p={{ base: "4px", md: "10px" }}
                  justify="center"
                  align="center"
                  rounded="10px"
                  border="1px solid"
                  borderColor={theme.theme_name !== 'light' ? "matador_border_color.200" : "#E4E7EC"}
                  boxShadow="0px 0px 0px 1px rgba(16, 24, 40, 0.18) inset, 0px -2px 0px 0px rgba(16, 24, 40, 0.05) inset, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                >
                  <ChatIconForInspectionFeedback color={theme.theme_name !== 'light' ? "#FFF" : "#344054"} boxSize="20px" />
                </HStack>

                <Text fontSize={{ base: "12px", md: "16px" }} color="text">
                  <Text
                    fontWeight={600}
                    as="span"
                  >
                    Welcome Onboard!
                  </Text>
                  <Text
                    fontWeight={600}
                    as="span"
                  >
                    {" "}Thank you for signing up. Please complete the
                    rest of your profile in settings
                  </Text>
                </Text>
              </HStack>

              <HStack spacing={{ base: "8px", md: "18px" }} pr="4px">
                <Button
                  color="#FFF"
                  bg="primary"
                  as={Link}
                  h={{ base: "23px", md: "44px" }}
                  w={{ base: "47px", md: "75px" }}
                  _hover={{ opacity: 1, textDecoration: "none" }}
                  _active={{ opacity: 1 }}
                  fontSize={{ base: "13px", md: "16px" }}
                  fontWeight={{ base: "500", md: 600 }}
                  px="32px"
                  py="13px"
                  fontFamily="Inter"
                  rounded="8px"
                  href='/settings'
                >
                  View
                </Button>
                <CloseIcon
                  display={{ base: "none", md: "block" }}
                  fontSize="14px"
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
    </Box>
  );
};

export default SettingsBar;
