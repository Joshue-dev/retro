import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Hide,
  HStack,
  Image,
  Show,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import AgentsLayoutView from "/src/page.components/agents_components/AgentLayout/View";
import PaymentPlan from "/src/page.components/agents_components/listings/unit_info/PaymentPlan";
import { themeStyles } from "/src/theme";
import { Button } from "/src/ui-lib";
import backArrow from "/src/images/icons/back-arrow.png";
import imageFallback from "/src/images/image-fallback.png";
import UnitPropertyInformation from "/src/page.components/agents_components/listings/unit_info/UnitPropertyInformation";
import AgentsUnitDescription from "../../../../../page.components/agents_components/listings/unit_info/AgentsUnitDescription";
import { toastForError } from "../../../../../utils/toastForErrors";
import { fetchAllBundlePaymentPlanForAgents } from "../../../../../api/agents";
import { handleLastTwoDigits, removeLasttTwoDigits } from "/src/utils";
import ViewImage from "page.components/agents_components/listings/ListingInfo.components/ListingInfo.details/ViewImage";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import { ListingImageCarousel } from "page.components/agents_components/listings/ListingsImageCarousel";
import useLocalStorage from "utils/hooks/useLocalStorage";

export const UnitInformation = () => {
  const router = useRouter();
  const { query } = useRouter();

  const bundleId = query && query?.id;
  const toast = useToast();
  const { data, isError, isLoading, error } = useQuery(
    ["payment_plan", bundleId],
    () => fetchAllBundlePaymentPlanForAgents(bundleId)
  );
  const PAYMENT_PLAN_DATA = data && data?.data?.results;
  const UNIT_INFO = data && data?.data?.results[0].bundle;
  const [photoViewSrc, setPhotoViewSrc] = useState(null);
  const [bigPhotoViewSrc, setBigPhotoViewSrc] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const VIEW_IMAGE = useDisclosure();

  useEffect(
    () => setBigPhotoViewSrc(UNIT_INFO?.photos[0]?.photo ?? imageFallback.src),
    [UNIT_INFO?.photos[0]]
  );

  const [direction, setDirection] = useState(0);
  const [viewId, setViewId] = useState(0);

  toastForError(error, isError, toast);

  const handlePhotoView = (src, idx) => {
    setPhotoViewSrc(src);
    setBigPhotoViewSrc(src);
    setViewId(idx);
    setCurrentImageIndex(idx);
    idx <= direction ? setDirection(-1) : setDirection(1);
  };

  const resetCurrentImageIndex = () => {
    setPhotoViewSrc(bigPhotoViewSrc);
  };

  const handleBack = () => {
    router.back();
  };

  const hasContract = PAYMENT_PLAN_DATA?.some((item) =>
    item.hasOwnProperty("contract")
  );
  const buttonResponsiveText = useBreakpointValue({
    base: "View Transactions",
    lg: "Transactions",
  });
  const itemsToShow = 5;
  const breakPoints = [{ width: 1, itemsToShow }];
  return (
    <div style={{ background: "#FAFAFA" }}>
      <AgentsLayoutView
        activePage="listings"
        padding={{ base: "0px", lg: `10px 20px` }}
      >
        {isLoading ? (
          <Center h="60vh" w="100%">
            <Show above="md">
              <OvalLoader />
            </Show>
            <Hide above="md">
              <Spinner />
            </Hide>{" "}
          </Center>
        ) : isError ? (
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
            <HStack w="100%" justify="space-between" my={{ lg: 4 }}>
              <HStack
                onClick={handleBack}
                zIndex={10}
                display={{ base: "none", lg: "flex" }}
              >
                <Image
                  cursor="pointer"
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
                align={"center"}
                zIndex={{ base: `1001`, lg: `0` }}
                p={{ base: `24px`, lg: "0px" }}
              >
                <Show above="lg">
                  <Link
                    prefetch={false}
                    href={`/agents/listings/manage/unit_info/transactions/${bundleId}`}
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
                    href={`/agents/listings/manage/unit_info/transactions/${bundleId}`}
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
              maxW="1284px"
              padding={{ lg: "29px 36px" }}
              mt={{ lg: "25px" }}
              border={"1px solid #E4E4E4"}
              paddingInline={{ base: 0, lg: 4 }}
              bg={{ base: "transparent", lg: "#fff" }}
            >
              <Flex direction={{ base: "column", lg: "row" }} gap="33px">
                <ListingImageCarousel
                  images={UNIT_INFO?.photos.map((el) => el.photo) || []}
                  video_url={UNIT_INFO?.youtube_url}
                  maxW={`100%`}
                />
                <UnitPropertyInformation unitDetail={UNIT_INFO} />
              </Flex>
            </Container>
            <AgentsUnitDescription description={UNIT_INFO?.unit_description} />
            {hasContract ? (
              <PaymentPlan
                PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
                unitDetail={UNIT_INFO}
              />
            ) : null}
            {UNIT_INFO?.fees.length > 0 ? (
              <Text
                mt={{ base: "20px", lg: "30px" }}
                mb={{ base: "10px", lg: "26px" }}
                fontSize={{ base: "18px", lg: "32px" }}
                fontWeight="500"
                color="#191919"
                textAlign="start"
                lineHeight="41px"
                px={{ base: 4, lg: 0 }}
              >
                Closing Cost
              </Text>
            ) : null}
            <Stack
              direction={{ base: "column", lg: "row" }}
              px={{ base: 4, lg: 0 }}
            >
              {UNIT_INFO?.fees.length > 0
                ? UNIT_INFO?.fees.map((data, idx) => (
                    <Box
                      key={idx}
                      maxW={{ lg: "411px" }}
                      width="100%"
                      background="white"
                      borderRadius="0.9rem"
                      border="1px solid #F5F5F5"
                      textAlign="start"
                      padding="24px"
                    >
                      <Text
                        fontWeight="400"
                        fontSize="14px"
                        color="#475467"
                        lineHeight="20px"
                      >
                        {data?.name}
                      </Text>
                      <Text fontWeight="600" fontSize="24px" color="black">
                        {removeLasttTwoDigits(Number(parseInt(data?.amount)))}
                        {handleLastTwoDigits(Number(parseInt(data?.amount)))}
                      </Text>
                    </Box>
                  ))
                : null}
            </Stack>
            <ViewImage
              modal={VIEW_IMAGE}
              src={photoViewSrc}
              currentImageIndex={currentImageIndex}
              photos={UNIT_INFO?.photos}
              setPhotoViewSrc={setPhotoViewSrc}
              setCurrentImageIndex={setCurrentImageIndex}
              resetCurrentImageIndex={resetCurrentImageIndex}
            />
          </Box>
        )}
      </AgentsLayoutView>
    </div>
  );
};

export default UnitInformation;
