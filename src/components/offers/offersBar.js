import {
  HStack,
  Image,
  Text,
  useDisclosure,
  Box,
  VStack,
  useTheme,
} from "@chakra-ui/react";
import React, { useState } from "react";
import cancelICon from "/src/images/icons/closeIcon.svg";
import { useQuery } from "react-query";
import { fetchOffers } from "../../api/listing";
import DrawerForOffers from ".";
import offerIcon from "../../images/icons/offers-icons.svg";
import { Button } from "../../ui-lib";
import { CloseIcon } from "@chakra-ui/icons";
import { OffersIcon } from "../assets/svgs";

export const OffersBar = () => {
  const theme = useTheme();
  const [willDisplay, setWillDisplay] = useState(true);
  const pendingQuery = useQuery(["fetchUserEquity", "OFFERS"], fetchOffers, {
    refetchOnMount: true,
  });
  const assetData = pendingQuery?.data?.data?.data;
  const drawerDisclosure = useDisclosure();

  return (
    <Box w="full">
      {assetData?.length ? (
        <>
          {willDisplay && (
            <HStack
              w="full"
              bg={theme.theme_name !== "light" ? "card_bg" : "#FCFCFD"}
              mx="auto"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              justify="space-between"
              p={{ base: "10px", md: "12px" }}
              minH={{ base: "48px", md: "72px" }}
              maxH="72px"
              mb={{ base: "8px", md: "15px" }}
              borderRadius={{ base: "6px", md: "12px" }}
              border="1px solid"
              borderColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
            >
              <HStack spacing={"16px"}>
                <HStack
                  rounded="10px"
                  p={{ base: "4px", md: "10px" }}
                  justify="center"
                  align="center"
                  border="1px solid"
                  borderColor={
                    theme.theme_name !== "light"
                      ? "matador_border_color.200"
                      : "#E4E7EC"
                  }
                  boxShadow="0px 0px 0px 1px rgba(16, 24, 40, 0.18) inset, 0px -2px 0px 0px rgba(16, 24, 40, 0.05) inset, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                >
                  <OffersIcon
                    color={theme.theme_name !== "light" ? "#FFF" : "#344054"}
                    boxSize="24px"
                  />
                </HStack>

                <Text color="text">
                  <Text
                    as="span"
                    fontSize={{ base: "12px", md: "16px" }}
                    fontWeight={600}
                  >
                    You have{" "}
                    {assetData?.length > 1
                      ? `${assetData?.length} offers`
                      : "an offer"}
                    .
                  </Text>
                  <Text
                    as="span"
                    fontSize={{ base: "11px", md: "16px" }}
                    fontWeight={600}
                  >
                    {" "}
                    Check out the offer{assetData?.length > 1
                      ? "s"
                      : ""} before {assetData?.length > 1 ? "they" : "it"}{" "}
                    expire{assetData?.length > 1 ? "" : "s"}.
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
                  color={theme.theme_name !== "light" ? "#FFF" : "#98A2B3"}
                  onClick={() => setWillDisplay(false)}
                  cursor="pointer"
                  src={cancelICon.src}
                />
              </HStack>
            </HStack>
          )}
          <DrawerForOffers
            refetch={pendingQuery?.refetch}
            assetData={assetData}
            isLoading={pendingQuery?.assetLoading}
            isOpen={drawerDisclosure.isOpen}
            drawer={drawerDisclosure}
            isError={pendingQuery?.isError}
          />
        </>
      ) : null}
    </Box>
  );
};

export default OffersBar;
