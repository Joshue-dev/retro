import React from "react";
import {
  Box,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { formatToCurrency } from "utils";
import BuyModal from "../../pages/listing-details/units/buyModal";
import Image from "next/image";

export const UnitCard = ({ data }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const buyModal = useDisclosure();
  const isSoldOut = data?.quantity < 1;
  const DISPLAY_IMAGE = data?.profile_image
    ? data?.profile_image
    : data?.photos?.[0]?.photo ?? data?.photos[0]?.photo?.[0];
  return (
    <>
      {isMobile ? (
        <VStack
          w={"full"}
          onClick={buyModal.onOpen}
          cursor="pointer"
          align="center"
          border={"1px solid"}
          borderColor="primary"
          pt="6px"
          pb="12px"
          justify="center"
          px="6px"
          minH={{ base: "92px", md: "72px" }}
          textAlign="center"
          maxW={{ base: "95vw", md: "max-content" }}
        >
          <Text
            fontSize={{ base: "15.907px", md: "18px" }}
            fontWeight="700"
            fontFamily={"Liberation Sans"}
            color="primary"
            letterSpacing="3.2px"
            textTransform="uppercase"
            whiteSpace="normal"
          >
            {data?.unit_title}
          </Text>
          <Text
            fontSize={{ base: "12.372px", md: "14px" }}
            fontWeight="400"
            letterSpacing="2.8px"
            textTransform="uppercase"
            color="matador_text.400"
            fontFamily="Liberation Sans"
          >
            {formatToCurrency(data?.price || 0)}
          </Text>
        </VStack>
      ) : (
        <Stack
          cursor="pointer"
          onClick={isSoldOut ? null : buyModal.onOpen}
          gap="20px"
        >
          <Stack
            w="full"
            h="679.048px"
            pos="relative"
            align="center"
            justify="end"
            px="4rem"
          >
            <Image
              src={DISPLAY_IMAGE}
              alt={data?.unit_title || "unit image"}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Box
              pos="absolute"
              bg="linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%)"
              h="full"
              w="full"
            />
            <Stack
              justify="center"
              textAlign="center"
              pos="relative"
              zIndex={5}
              pb="48px"
              color="#FFF"
            >
              <Text
                fontSize="30.46px"
                fontWeight={600}
                textTransform={`capitalize`}
                lineHeight="36.664px"
              >
                {data?.unit_title || `Unit`}
              </Text>
              {data?.quantity < 1 ? (
                <Text
                  color="text"
                  fontSize="20px"
                  lineHeight={{ base: `1.8rem`, md: `4.0rem` }}
                  fontWeight={500}
                >
                  Sold out
                </Text>
              ) : (
                <Text
                  fontSize="16px"
                  lineHeight={{ base: `1.8rem`, md: `4.0rem` }}
                  fontWeight={500}
                  textTransform="uppercase"
                >
                  Starting from:{" "}
                  <Text as="span" fontSize="20px">
                    {formatToCurrency(data?.price || 0)}
                  </Text>
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
      )}
      <BuyModal unitData={data} buyModal={buyModal} />
    </>
  );
};
