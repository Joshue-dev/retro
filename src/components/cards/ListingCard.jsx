import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useMediaQuery,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import { formatToCurrency } from "../../utils";
import { useRouter } from "next/router";
import AssetImagePreview from "../assetCarousel/assetImagePreview";
import { useLightenHex } from "utils/lightenColorShade";
import useLocalStorage from "utils/hooks/useLocalStorage";

const CardLoadingState = () => {
  return (
    <Flex
      overflow="hidden"
      flexDir={`column`}
      gap={`22px`}
      w="full"
      maxW={`815px`}
      borderRadius={`18px`}
    >
      <Skeleton
        minH={{ base: '240.9px', md: "389.785px"}}
        maxH={{ base: '240.9px', md: "389.785px"}}
        // aspectRatio={{ base: "815  / 277" }}
        w="full"
        startColor="rgba(0,0,0,.3)"
        endColor="rgba(0,0,0,.5)"
      />
    </Flex>
  );
};

export const ListingCard = ({ is_loading, data }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [storeThemeInfo] = useLocalStorage("storeThemeInfo");
  const {
    id,
    name,
    starting_from,
    photos = [],
    address,
    maps_view,
    is_sold_out,
    display_price,
  } = data;

  const showPreview = useDisclosure();
  const [current_photo, set_current_photo] = useState(photos[0]?.photo || "");
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 768px");
  return is_loading ? (
    <CardLoadingState />
  ) : (
    <>
<Stack
      w="full"
      gap="20px"
      onClick={() => router.push(`/listing-details/${id}`)}
      cursor="pointer"
    >
      <Box w="full" position="relative" overflow="hidden">
        <Box
          bgImage={`linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(${photos[0]?.photo})`}
          bgSize='cover'
          bgPos='center'
          w="full"
          h="full"
          minH={{ base: '240.9px', md: "389.785px"}}
          maxH={{ base: '240.9px', md: "389.785px"}}
          loading="lazy"
          objectFit="cover"
        />
        <Stack
          align="start"
          justify="center"
          gap="12px"
          position="absolute"
          bottom={0}
          p="20px"
          color="#FFF"
          w="full"
          divider={<StackDivider m="0 !important" />}
        >
          <Text fontSize="24px" letterSpacing='0.24px' textTransform="uppercase">
            {name}
          </Text>
          <HStack divider={<StackDivider />} gap="20px">
            {maps_view && (
              <Text letterSpacing="0.16px" fontSize="16px">
                {address}
              </Text>
            )}
            <Text letterSpacing="0.16px" fontSize="16px">
              {is_sold_out
                ? "Sold out"
                : display_price
                ? `Starting from ${formatToCurrency(starting_from)}`
                : "Contact for price"}
            </Text>
          </HStack>
        </Stack>
      </Box>
    </Stack>
      <AssetImagePreview
        slideImages={photos || []}
        showPreview={showPreview}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />
    </>
  );
};
