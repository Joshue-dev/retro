import {
  Flex,
  Grid,
  HStack,
  Image,
  Link,
  Stack,
  StackDivider,
  Text,
  useMediaQuery,
  useTheme,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchProjectsWithFilters } from "@/api/listing";
import { storeDetails } from "@/api/auth";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import PhoneIcon from "images/icons/phone-icon.svg";
import EmailIcon from "images/icons/email-icon.svg";
import AppleStoreIcon from "images/landing-page/apple-store.svg";
import PlayStoreIcon from "images/landing-page/play-store.svg";
import React from "react";
export const Footer = ({ TERMS, PRIVACY_POLICY }) => {
  const theme = useTheme();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const storeInfo = useQuery(["storeInfo"], storeDetails);
  const { data: infiniteData } = useQuery({
    queryKey: ["projectsToBeDisplayed", ""],
    queryFn: ({ pageParam = `&page=1&limit=10` }) => {
      return fetchProjectsWithFilters(pageParam);
    },
  });

  const projectData = infiniteData?.data?.project;

  const availableProjects = projectData
    ?.filter((item) => !item?.is_sold_out)
    ?.slice(0, 5);
  const storeData = storeInfo?.data?.data?.data;

  return (
    <Stack
      borderTop="1.333px solid"
      borderTopColor={
        theme.theme_name !== "light"
          ? "matador_border_color.200"
          : "matador_border_color.300"
      }
      bg="background"
      pt="3rem"
      pb="27px"
      px={{ base: "25px", md: "60px", xl: "120px" }}
      gap="26px"
      minH="26.75rem"
      divider={
        <StackDivider
          borderColor={
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.300"
          }
          display={{ base: "none", md: "flex" }}
        />
      }
    >
      <Grid
        w="full"
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: 'repeat(5, 1fr)'
        }}
        gap="24px"
      >
        <Stack display={{ base: "none", md: "flex" }} w="full" gap="20px">
          <Text fontSize="18px" fontFamily="Liberation Sans" fontWeight={700}>
            Projects
          </Text>
          <Stack gap="16px">
            {availableProjects?.map((item) => {
              return (
                <Link
                  _hover={{
                    textDecor: "none",
                  }}
                  href={`/listing-details/${item?.id}`}
                  key={item?.id}
                >
                  <Text fontSize="14px" fontFamily="Noto Sans" color="text">
                    {item?.name}
                  </Text>
                </Link>
              );
            })}
          </Stack>
        </Stack>
        <Stack w="full" gap={{ base: "8px", md: "20px" }}>
          <Text fontSize="18px" fontFamily="Liberation Sans" fontWeight={700}>
            Legal
          </Text>
          <Stack gap="16px">
            <Link
              href={PRIVACY_POLICY}
              target={PRIVACY_POLICY ? "_blank" : ""}
              fontSize="14px"
              _hover={{
                textDecor: "none",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href={TERMS}
              target={TERMS ? "_blank" : ""}
              fontSize="14px"
              _hover={{
                textDecor: "none",
              }}
            >
              Terms of service
            </Link>
          </Stack>
        </Stack>
        {storeData?.company_address ? (
          <Stack w="full" gap={{ base: "8px", md: "20px" }}>
            <Text fontSize="18px" fontFamily="Liberation Sans" fontWeight={700}>
              Location
            </Text>
            <Text fontSize="14px" lineHeight="33px" maxW="20em">
              {storeData?.company_address}
            </Text>
          </Stack>
        ) : null}
        {storeData?.email ? (
          <Stack display={{ base: "none", md: "flex" }} w="full" gap="20px">
            <Text fontSize="18px" fontFamily="Liberation Sans" fontWeight={700}>
              Contact
            </Text>
            <Text
              fontSize="14px"
              as={Link}
              href={`mailto:${storeData?.email}`}
              _hover={{ textDecor: "none" }}
            >
              {storeData?.email}
            </Text>
          </Stack>
        ) : null}
        <Stack gap="16px">
        <Text fontSize="20px" fontWeight={600}>
          Get the app
        </Text>
        <Flex gap="16px" align="center">
          <Link
            href="https://apps.apple.com/au/app/my-veritasi/id6478011265"
            target="_blank"
          >
            <Image maxW="115px" src={AppleStoreIcon.src} alt="apple store" />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.matadortrust.veritasi"
            target="_blank"
          >
            <Image maxW="115px" src={PlayStoreIcon.src} alt="play store" />
          </Link>
        </Flex>
      </Stack>
      </Grid>
      {isMobile ? <Stack display={{ base: "flex", md: "none" }} gap="16px">
        <Text fontSize="20px" fontWeight={600}>
          Get the app
        </Text>
        <Flex gap="16px" align="center">
          <Link
            href="https://apps.apple.com/au/app/my-veritasi/id6478011265"
            target="_blank"
          >
            <Image maxW="115px" src={AppleStoreIcon.src} alt="apple store" />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.matadortrust.veritasi"
            target="_blank"
          >
            <Image maxW="115px" src={PlayStoreIcon.src} alt="play store" />
          </Link>
        </Flex>
      </Stack>: null}
      <Stack
        direction={{ base: "column-reverse", md: "row" }}
        w="full"
        justify="space-between"
        gap={{ base: "24px", md: "0px" }}
        align={{ base: "start", md: "center" }}
      >
        <Text
          as={Link}
          href="https://www.myxellia.io/"
          _hover={{
            textDecor: "none",
          }}
          fontSize={{ base: "14px", sm: "16px" }}
        >
          Created with myxellia.io
        </Text>
        <HStack flexWrap={{ base: "wrap", md: 'nowrap' }} gap={{ base: "24px", md: "26px" }}>
          <Link
            href={`mailto:${storeData?.email}`}
            bg={{ base: "#F4F4F5", md: "transparent" }}
            p={{ base: "12px", md: 0 }}
            border={{ base: "1px solid #E4E4E7", md: "none" }}
            rounded="8px"
            display={{ sm: "none" }}
          >
            <Image src={PhoneIcon.src} boxSize="24px" alt="phone icon" />
          </Link>
          <Link
            href={"tel:+2349030150015"}
            bg={{ base: "#F4F4F5", md: "transparent" }}
            p={{ base: "12px", md: 0 }}
            border={{ base: "1px solid #E4E4E7", md: "none" }}
            rounded="8px"
            display={{ sm: "none" }}
          >
            <Image src={EmailIcon.src} boxSize="24px" alt="email icon" />
          </Link>
          <Link
            href={storeData?.social_links?.facebook}
            fontSize="24px"
            target="_blank"
            bg={{ base: "#F4F4F5", md: "transparent" }}
            p={{ base: "12px", md: 0 }}
            border={{ base: "1px solid #E4E4E7", md: "none" }}
            rounded="8px"
          >
            <FaFacebookSquare />
          </Link>
          <Link
            href={storeData?.social_links?.twitter}
            color="text"
            fontSize="24px"
            target="_blank"
            bg={{ base: "#F4F4F5", md: "transparent" }}
            p={{ base: "12px", md: 0 }}
            border={{ base: "1px solid #E4E4E7", md: "none" }}
            rounded="8px"
          >
            <FaSquareXTwitter />
          </Link>
          <Link
            href={storeData?.social_links?.instagram}
            color="text"
            fontSize="24px"
            target="_blank"
            bg={{ base: "#F4F4F5", md: "transparent" }}
            p={{ base: "12px", md: 0 }}
            border={{ base: "1px solid #E4E4E7", md: "none" }}
            rounded="8px"
          >
            <FaInstagram />
          </Link>
          <Link
            href={storeData?.social_links?.linkedin}
            color="text"
            fontSize="24px"
            target="_blank"
            bg={{ base: "#F4F4F5", md: "transparent" }}
            p={{ base: "12px", md: 0 }}
            border={{ base: "1px solid #E4E4E7", md: "none" }}
            rounded="8px"
          >
            <FaLinkedin />
          </Link>
        </HStack>
      </Stack>
    </Stack>
  );
};
