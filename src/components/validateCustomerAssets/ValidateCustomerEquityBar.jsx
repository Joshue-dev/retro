import { HStack, Text, useDisclosure, Box, useTheme } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Button } from "/src/ui-lib";
import { CloseIcon } from "@chakra-ui/icons";
import cancelICon from "/src/images/icons/closeIcon.svg";
import { fetchForCustomerEquityValidation } from "../../api/listing";
import { ValidateAssetHomeIcon } from "../assets/svgs";
import ValidateCustomerEquity from ".";

const ValidateCustomerEquityBar = () => {
  const theme = useTheme()
  const [willDisplay, setWillDisplay] = useState(true);
  const fetchcustomeQuery = useQuery(
    ["fetchcustomervalidationEquity"],
    fetchForCustomerEquityValidation,
    { refetchOnMount: true }
  );
  const datasToUse = fetchcustomeQuery?.data?.data?.all_pending_requests;
  const drawerDisclosure = useDisclosure();

  return (
    <Box w="full">
      {datasToUse?.length ? (
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
              maxH='max-content'
              mb={{ base: "8px", md: "15px" }}
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
                  <ValidateAssetHomeIcon color={theme.theme_name !== 'light' ? "#FFF" : "#344054"} boxSize={{ base: '16px', md: "24px"}} />
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
                    {" "}We need you to validate {datasToUse?.length > 1 ? "some" : "a"} transaction
                    {datasToUse?.length > 1 ? "s" : ""}
                  </Text>
                </Text>
              </HStack>

              <HStack spacing={{ base: "8px", md: "18px" }} pr="4px">
                <Button
                  color="#FFF"
                  bg="primary"
                  onClick={drawerDisclosure.onOpen}
                  h={{ base: "23px", md: "44px" }}
                  w={{ base: "47px", md: "75px" }}
                  _hover={{ opacity: 1 }}
                  _active={{ opacity: 1 }}
                  fontSize={{ base: "13px", md: "16px" }}
                  fontWeight={{ base: "500", md: 600 }}
                  px="32px"
                  py="13px"
                  fontFamily="Inter"
                  rounded="8px"
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
          <ValidateCustomerEquity
            equitiesData={datasToUse}
            drawer={drawerDisclosure}
            refetch={fetchcustomeQuery?.refetch}
            isLoading={fetchcustomeQuery?.isLoading}
            isError={fetchcustomeQuery?.isError}
          />
        </>
      ) : null}
    </Box>
  );
};

export default ValidateCustomerEquityBar;
