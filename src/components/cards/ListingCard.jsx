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
    <Skeleton
      h="326px"
      w="full"
      startColor="rgba(0,0,0,.3)"
      endColor="rgba(0,0,0,.5)"
    />
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
    fraction_is_available,
    payment_plan_is_available: isPaymentPlanAvailable
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
          <Image
            src={current_photo}
            w="full"
            h="full"
            minH="326px"
            maxH="326px"
            loading="lazy"
            objectFit="cover"
          />
          {fraction_is_available || isPaymentPlanAvailable ? (
            <Stack
              bg="primary"
              p="7.468px 14.861px 9.532px 15.139px"
              h="40px"
              justify="center"
              align="center"
              position="absolute"
              color="#FFF"
              top={0}
            >
              <Text
                textTransform="uppercase"
                fontSize="11.022px"
                letterSpacing="1.781px"
              >
                {fraction_is_available
                  ? "fractional"
                  : "payment plan available"}
              </Text>
            </Stack>
          ) : null}
          {!fraction_is_available && is_sold_out ? (
            <Stack
              bg="primary"
              p="7.468px 14.861px 9.532px 15.139px"
              h="40px"
              justify="center"
              align="center"
              position="absolute"
              color="#FFF"
              top={0}
            >
              <Text
                textTransform="uppercase"
                fontSize="11.022px"
                letterSpacing="1.781px"
              >
                Sold out
              </Text>
            </Stack>
          ) : null}
        </Box>
        <Stack align="start" justify="center" gap="12px" color="text">
          <Text fontSize="20.204px" textTransform="uppercase">
            {name}
          </Text>
          {maps_view && (
            <Text
              textTransform="uppercase"
              letterSpacing="1.781px"
              fontSize="12px"
            >
              {address}
            </Text>
          )}
        </Stack>
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
