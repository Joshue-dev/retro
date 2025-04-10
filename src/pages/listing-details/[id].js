import React, { useRef } from "react";
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Show,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LayoutView } from "/src/components/page_layout";
import { Spinner } from "/src/ui-lib";
import { useRouter } from "next/router";
import { fetchProjectsById } from "/src/api/listing";
import { useQuery } from "react-query";
import Amenities from "./sections/amenities";
import MapViewBox from "./sections/mapView";
import PropertyInfo from "./sections/propertyInfo";
import AllUnits from "./sections/allUnits";
import { formatToCurrency } from "/src/utils";
import Auth from "../../hoc/Auth";
import AssetCarousel from "/src/components/assetCarousel";
import ViewBrochure from "./sections/viewBrochure";
import BuyModal from "./units/buyModal";
import { fetchAllUnits } from "@/api/listing";
import videoIcon from "/src/images/icons/videoIcon.svg";
import { ErrorPage } from "@/components/appState/error-page";

const ListingDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  const allUnitsRef = useRef();

  const { data, isError, isLoading, refetch, error } = useQuery(
    ["fetchProjectById", id],
    () => fetchProjectsById(parseInt(id)),
    { enabled: !!id }
  );

  const info = data?.data?.project;

  const slideImages =
    info?.photos?.map((image) => ({
      original: image.photo,
      thumbnail: image.photo,
    })) || [];
  const isBuildingTypeSingleFamilyResidential =
    info?.building_type == "Detached" || info?.building_type == "Semi Detached";
  const buyModal = useDisclosure();
  const unitInfo = useQuery(
    ["fetchAllUnits", info?.id],
    () => fetchAllUnits(parseInt(info?.id)),
    { enabled: !!info?.id }
  );
  const unitData = unitInfo?.data?.data?.results;
  const videoDisclosure = useDisclosure();
  const brochure_url =
    info?.property_document?.find((el) => el.purpose === `brochure`)
      ?.document_url ||
    info?.property_document?.find((el) => el.purpose === `brochure`)
      ?.document_file ||
    info?.property_document?.[0]?.document_url ||
    info?.property_document?.[0]?.document_file;

  return (
    <LayoutView>
      {isLoading ? (
        <Flex
          align="center"
          justify="center"
          w="full"
            h='calc(100vh - 100px)'
        >
          <Spinner noAbsolute />
        </Flex>
      ) : isError ? (
        <ErrorPage error={error} />
      ) : (
        <>
          {info && (
            <Stack
              w="full"
              mx="auto"
              borderRadius={"1.0rem"}
              gap={{ base: `4.0rem`, md: `5.2rem` }}
            >
              <Stack gap={`3.2rem`}>
                <Box position={`relative`}>
                  <AssetCarousel slideImages={slideImages} showArrows />
                  {info?.youtube_url ? (
                    <HStack
                      gap={{ base: `.8rem`, lg: `1.6rem` }}
                      position={`absolute`}
                      left={`0rem`}
                      bottom={"50%"}
                      width={`100%`}
                      justify={`center`}
                      cursor="pointer"
                      onClick={videoDisclosure.onOpen}
                    >
                      <Box p={6} bg="rgba(0, 0,0,0.3)" rounded="full">
                        <Image
                          boxSize={{ base: "28px", md: "40px" }}
                          src={videoIcon.src}
                          alt="youtube icon"
                        />
                      </Box>
                    </HStack>
                  ) : null}
                  {brochure_url ? (
                    <HStack
                      gap={{ base: `.8rem`, lg: `1.6rem` }}
                      position={`absolute`}
                      left={`0rem`}
                      bottom={{ base: `1.5rem`, lg: `3.5rem` }}
                      width={`100%`}
                      justify={`center`}
                    >
                      <ViewBrochure file={brochure_url} />
                    </HStack>
                  ) : null}
                </Box>

                <Stack
                  justify={"space-between"}
                  gap={{ base: `1.2rem`, md: `.8rem` }}
                  mt=".8rem"
                >
                  <Text
                    fontWeight={600}
                    fontFamily={`Open Sans`}
                    fontSize={{ base: `2.4rem`, md: "6.0rem" }}
                    lineHeight={{ base: `2.0rem`, md: "6.4rem" }}
                    textTransform={"capitalize"}
                    textAlign={`center`}
                  >
                    {info.name}
                  </Text>

                  <Text
                    fontSize={{ base: `1.4rem`, md: "2.4rem" }}
                    lineHeight={{ base: `100%`, md: `3.2rem` }}
                    textTransform={"capitalize"}
                    color="matador_text.400"
                    fontWeight={`400`}
                    textAlign={`center`}
                  >
                    {info?.address}
                  </Text>
                  {info?.starting_from && (
                    <Text
                      mt={{ md: `.8rem` }}
                      fontSize={{ base: `1.8rem`, md: "3.2rem" }}
                      lineHeight={{ base: `100%`, md: `125%` }}
                      color="matador_text.500"
                      fontWeight={`600`}
                      textAlign={`center`}
                    >
                      {formatToCurrency(info?.starting_from)}
                    </Text>
                  )}
                </Stack>
                <PropertyInfo
                  isBuildingTypeSingleFamilyResidential={
                    isBuildingTypeSingleFamilyResidential
                  }
                  allUnitsRef={allUnitsRef}
                  refetch={refetch}
                  info={info}
                  buyModal={buyModal}
                  unitsInfo={unitInfo}
                />
              </Stack>

              <Flex direction="column" gap={{ base: `1.0rem`, md: `2.4rem` }}>
                <Text
                  fontSize={{ base: "1.6rem", lg: "3.2rem" }}
                  lineHeight={{ base: "2.0rem", lg: "4.0rem" }}
                  fontWeight={600}
                  color="matador_text.200"
                  m={`0rem`}
                >
                  Description
                </Text>
                <Text
                  lineHeight={{ base: `2.8rem`, lg: "3.2rem" }}
                  color="matador_text.100"
                  fontSize={{ base: `1.6rem`, lg: "2.4rem" }}
                  fontWeight={400}
                  letterSpacing={`0.18px`}
                  m={`0rem`}
                  whiteSpace="pre-wrap"
                >
                  {info?.description}
                </Text>
              </Flex>

              {info?.amenities?.length && <Amenities info={info} />}
              {info?.maps_view && (
                <Box>
                  <Text
                    fontSize={{ base: "1.6rem", lg: "3.2rem" }}
                    lineHeight={{ base: "2.0rem", lg: "4.0rem" }}
                    fontWeight={600}
                    color="matador_text.200"
                    mb={{ base: `1.0rem`, md: `4.0rem` }}
                  >
                    Map View
                  </Text>
                  <Show above="md">
                    <MapViewBox
                      lat={info?.latitude}
                      lng={info?.longitude}
                      width={{ base: `100%`, lg: `100%` }}
                      height={"70.8rem"}
                    />
                  </Show>
                  <Show below="md">
                    <MapViewBox
                      lat={info?.latitude}
                      lng={info?.longitude}
                      width={`100%`}
                      height={`17.1rem`}
                    />
                  </Show>
                </Box>
              )}
              {!isBuildingTypeSingleFamilyResidential && (
                <Box w="full" ref={allUnitsRef}>
                  <AllUnits info={info} />
                </Box>
              )}
            </Stack>
          )}
          <BuyModal unitData={unitData?.[0]} buyModal={buyModal} />
        </>
      )}
      <OpenVideoURL url={info?.youtube_url} videoDisclosure={videoDisclosure} />
    </LayoutView>
  );
};

export default Auth(ListingDetails);

const OpenVideoURL = ({ url, videoDisclosure }) => {
  var rx =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  const r = url?.match(rx);
  const videoId = r?.[1];

  return (
    <Modal isOpen={videoDisclosure.isOpen} onClose={videoDisclosure.onClose}>
      <ModalOverlay />
      <ModalContent
        bg="rgba(255, 255, 255, 0.20)"
        textAlign="center"
        maxW="60vw"
        justifyContent={"center"}
        p={32}
      >
        <ModalCloseButton
          m={6}
          fontSize={{ base: 14, md: 16 }}
          p={8}
          rounded={"4px"}
          bg="rgba(0,0,0,0.3)"
          color="#FFF"
        />

        <AspectRatio ratio={16 / 9}>
          <iframe
            width={"100%"}
            title="youtube video"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            align="center"
            allowFullScreen
          />
        </AspectRatio>
      </ModalContent>
    </Modal>
  );
};
