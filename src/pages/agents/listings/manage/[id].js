import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
  useDisclosure,
  Spinner,
  useBreakpointValue,
  Center,
  Show,
  Hide,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import backArrow from "/src/images/icons/back-arrow.png";
import { Button } from "/src/ui-lib";
import AdditionalInfo from "/src/page.components/agents_components/listings/ListingInfo.components/ListingInfo.details/AdditionalInfo";
import ListingInfoDocuments from "/src/page.components/agents_components/listings/ListingInfo.components/ListingInfoDocuments";
import ListingInfoAmenities from "/src/page.components/agents_components/listings/ListingInfo.components/ListingInfoAmenities";
import { SetOpenHouseDate } from "/src/components/Modals/SetOpenHouseData";
import BasicInfo from "/src/page.components/agents_components/listings/ListingInfo.components/ListingInfo.details/BasicInfo";
import AgentsLayoutView from "/src/page.components/agents_components/AgentLayout/View";
import { themeStyles } from "/src/theme";
import { AgentSingleListing } from "../../../../api/agents";
import ListingInfoWholeUnits from "page.components/agents_components/listings/ListingInfo.components/ListingInfoWholeUnits";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { toastForError } from "utils/toastForErrors";

export const SingleListingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const ShowCalendar = useDisclosure();

  const singleListing = useQuery(["Singlelistings", id], () =>
    AgentSingleListing(id)
  );
  const toast = useToast();
  toastForError(singleListing.error, singleListing.isError, toast);
  const listingDetail = singleListing?.data?.data?.project;

  const handleBack = () => {
    router.back();
  };

  const buttonResponsiveText = useBreakpointValue({
    base: "View Transactions",
    lg: "Transactions",
  });

  return (
    <div style={{ background: "#FAFAFA" }}>
      <AgentsLayoutView
        activePage="listings"
        padding={{ base: "0px", lg: `10px 20px` }}
      >
        {singleListing.isLoading ? (
          <Center h="60vh" w="100%">
            <Show above="md">
              <OvalLoader />
            </Show>
            <Hide above="md">
              <Spinner />
            </Hide>{" "}
          </Center>
        ) : singleListing.isError ? (
          <Fragment>
            <Box mt="20px"></Box>
            <Text mt="50px">Oops something went wrong</Text>
          </Fragment>
        ) : (
          <Box
            maxW={{ lg: "1280px" }}
            mx="auto"
            pb={{ base: "105px", lg: "80px" }}
            overflowY={"auto"}
          >
            <HStack w="100%" justify="space-between" my={{ lg: "0px" }}>
              <HStack zIndex={10} display={{ base: "none", lg: "flex" }}>
                <Image
                  onClick={handleBack}
                  style={{ cursor: "pointer" }}
                  mr={2}
                  boxSize="50px"
                  src={backArrow.src}
                  alt="back_arrow"
                />
                <Heading
                  fontFamily="Euclid Circular B"
                  fontWeight="600"
                  color="#191919"
                  fontSize="24px"
                >
                  Back
                </Heading>
              </HStack>
              <Flex
                position={{ base: "fixed", lg: "static" }}
                bottom={{ base: 0, lg: "unset" }}
                height={{ base: "105px", lg: "unset" }}
                bg={{ base: "#F8F8F8", lg: "unset" }}
                w={{ base: "full", lg: "unset" }}
                justify={{ base: "center", lg: "space-between" }}
                columnGap="28px"
                align="center"
                zIndex={{ base: `1001`, lg: `0` }}
                p={{ base: `24px`, lg: "0px" }}
              >
                <Show above="lg">
                  <Link
                    prefetch={false}
                    href={`/agents/listings/manage/transactions/${id}?name=${listingDetail?.name}&isFractional=${listingDetail?.is_fractionalized}`}
                  >
                    <Button
                      bg={"transparent"}
                      border="1px solid #4545FE"
                      mt={0}
                      variant="primary"
                      w={"218px"}
                      h={"52px"}
                      color={"#4545FE"}
                      _hover={{
                        bg: "transparent",
                        color: "#4545FE",
                      }}
                      fontWeight={400}
                      fontSize={18}
                    >
                      {buttonResponsiveText}
                    </Button>
                  </Link>
                </Show>
                <Hide above="lg">
                  <Link
                    prefetch={false}
                    href={`/agents/listings/manage/transactions/${id}?name=${listingDetail?.name}&isFractional=${listingDetail?.is_fractionalized}`}
                  >
                    <Button
                      bg={"#4545FE"}
                      border="1px solid #4545FE"
                      mt={0}
                      variant="primary"
                      w={`100%`}
                      h={"52px"}
                      color={"#fff"}
                      _hover={{
                        bg: "#4545FE",
                        color: "#fff",
                      }}
                      fontWeight={600}
                      fontSize={18}
                    >
                      {buttonResponsiveText}
                    </Button>
                  </Link>
                </Hide>
              </Flex>
            </HStack>
            <Container
              {...themeStyles.containerStyles}
              maxW={{ lg: "1284px" }}
              padding={{ lg: "19px 36px" }}
              mt={{ lg: "25px" }}
              mx={{ base: 0, lg: "auto" }}
              px={{ base: 0, lg: "auto" }}
              bg={{ base: "#F9FAFB", lg: `#ffffff` }}
            >
              <Flex direction={{ base: "column", lg: "row" }}>
                <BasicInfo listingDetail={listingDetail} />
                <AdditionalInfo listingDetail={listingDetail} />
              </Flex>
            </Container>

            {listingDetail?.description ? (
              <Box mt={{ base: "30px", lg: "60px" }} p={{ base: 4, lg: 0 }}>
                <Text
                  display={"flex"}
                  gap="15px"
                  alignContent="center"
                  fontWeight={500}
                  fontSize={{ base: "18px", lg: "26px" }}
                  lineHeight="41px"
                  color="#191919"
                  m={`0px`}
                  // mb={`12px`}
                >
                  Listing Description
                </Text>
                <HStack
                  border={{ lg: "1px solid #e4e4e4" }}
                  justify="start"
                  bg={{ lg: "#FFFFFF" }}
                  borderRadius="16px"
                  mx="0px"
                  w="full"
                >
                  <VStack justify={"start"} align="start" w="full" h="full">
                    <Text
                      p={{ lg: "23px" }}
                      fontWeight={300}
                      fontSize="14px"
                      color="#191919"
                      lineHeight={{ base: `150%`, lg: `28px` }}
                    >
                      {listingDetail?.description}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ) : null}
            <VStack align={"flex-start"} gap={0} w={`100%`}>
              <Flex
                order={{ base: 3, lg: 0 }}
                px={{ base: 6, lg: 0 }}
                w={"full"}
              >
                <ListingInfoWholeUnits listingDetail={listingDetail} />
              </Flex>
              <Flex
                order={{ base: 1, lg: 0 }}
                px={{ base: 6, lg: 0 }}
                w={"full"}
              >
                <ListingInfoDocuments />
              </Flex>
              <Flex px={{ base: 6, lg: 0 }} w={"full"}>
                {listingDetail?.amenities && (
                  <ListingInfoAmenities data={listingDetail?.amenities} />
                )}
              </Flex>
            </VStack>
            <SetOpenHouseDate ShowCalendar={ShowCalendar} />
          </Box>
        )}
      </AgentsLayoutView>
    </div>
  );
};

export default SingleListingPage;
