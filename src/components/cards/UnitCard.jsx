import React from "react";
import {
  Image,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { formatToCurrency } from "utils";
import BuyModal from "../../pages/listing-details/units/buyModal";

export const UnitCard = ({ data }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const buyModal = useDisclosure();
  const isSoldOut = data?.quantity < 1
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
          maxW={{ base: '95vw', md: 'max-content' }}
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
        <Stack cursor='pointer' onClick={isSoldOut ? null : buyModal.onOpen} gap='20px'>
          <Image
            src={data?.photos[0]?.photo}
            alt="listing image"
            aspectRatio={"352 / 450"}
            maxW="348.815px"
            objectFit='cover'
            objectPosition='center'
          />
          <Stack align={`start`}>
            <Text color="text" fontSize="21.41px" textTransform={`capitalize`}>
              {data?.unit_title || `Unit`}
            </Text>
            {data?.quantity < 1 ? (
              <Text
                color="text"
                fontSize="25.311px"
                lineHeight={{ base: `1.8rem`, md: `4.0rem` }}
                fontWeight={500}
              >
                Sold out
              </Text>
            ) : (
              <Text
                color="text"
                fontSize="25.311px"
                lineHeight={{ base: `1.8rem`, md: `4.0rem` }}
                fontWeight={500}
              >
                {formatToCurrency(data?.price || 0)}
              </Text>
            )}
          </Stack>
        </Stack>
      )}
      <BuyModal unitData={data} buyModal={buyModal} />
    </>
  );
};
