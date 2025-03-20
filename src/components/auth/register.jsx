import React, { useLayoutEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import GetStarted from "./sections/getStarted";
import SuccessLink from "./sections/successLink";
import RegisterForm from "./sections/registerForm";
import ThankYou from "./sections/thankYou";
import { storeDetails } from "../../api/auth";
import { useQuery } from "react-query";
import PersonalInfo from "./sections/personalInfo";
import ApprovalPending from "./sections/approvalPending";
import PhoneImage from "images/landing-page/veritasi-phone.png";
import AppleStoreIcon from "images/landing-page/apple-store.svg";
import PlayStoreIcon from "images/landing-page/play-store.svg";

const Register = ({ onAuthClose, isAgent }) => {
  const [page, setPage] = useState("getStarted");
  const [email, setEmail] = useState("");
  const [screenHeight, setScreenHeight] = useState(0);

  const STOREINFO = useQuery(["storeInfo"], storeDetails);
  const store_data = STOREINFO.data?.data?.data;
  useLayoutEffect(() => {
    setScreenHeight(window.innerHeight);
    window.addEventListener("resize", () => {
      setScreenHeight(window.innerHeight);
    });
  }, []);
  return (
    <Flex
      w="full"
      h="full"
      justify={{ base: "center", lg: "flex-end" }}
      align={{ base: `flex-start`, lg: "center" }}
      zIndex={2}
      overflow="hidden"
      maxH={{ base: '75rem', lg: 'full' }}
    >
      <Flex
        flexDir={`column`}
        w={`100%`}
        gap={{ base: "10px", lg: "40px" }}
        align={{ base: `start`, lg: "flex-end" }}
        h={`fit-content`}
      >
        <HStack
          gap={{ base: "16px", lg: "9px" }}
          display={{ base: `flex` }}
          py={{ base: "15px", lg: "25.25px" }}
          px={{ base: "15px", lg: "7rem" }}
          borderBottom={{ base: "1px solid", lg: "unset" }}
          borderBottomColor="matador_border_color.200"
          bg="card_bg"
          w="full"
          position="relative"
          zIndex={999}
        >
          <Box
            maxW="75px"
            h="46px"
            maxH="48px"
            minWidth={`48px`}
            position={`relative`}
          >
            {store_data?.company_image && (
              <Image
                src={store_data?.company_image}
                w="100%"
                height="100%"
                alt={"Company Image"}
                objectFit="contain"
                transition="0.3s ease-in-out"
              />
            )}
          </Box>
        </HStack>
        <Stack
          direction={{ base: "column-reverse", lg: "row" }}
          h="full"
          align={{ lg: "center" }}
          justify={{ lg: "flex-end" }}
          px={{ base: "2rem", lg: "10rem" }}
          pt={{ base: 0, lg: 0 }}
          w="full"
          minH={{ lg: "calc(75vh - 50px)" }}
        >
          <Stack
            position="absolute"
            justify="end"
            align="start"
            left="3vw"
            bottom={"5rem"}
            display={{
              base: "none",
              lg:
                (screenHeight <= 750 && screenHeight >= 500) ||
                screenHeight >= 1200
                  ? "none"
                  : "flex",
            }}
          >
            <Stack position='relative' mb='-5rem'   gap='16px'>
              <Stack>
                <Heading
                  fontWeight={500}
                  maxW="626px"
                  fontFamily="Noto Sans"
                  fontSize="72px"
                  lineHeight="85px"
                >
                  One Interface,
                  <br />
                  <Text as="span" color="primary">
                    All Things Veritasi
                  </Text>
                </Heading>
                <Text maxW={"607px"} fontSize="20px" color="#606060">
                  Get updates on your projects, track payments, and access all
                  documents — all in one place.{" "}
                </Text>
              </Stack>
              <HStack gap="12.505px">
                <Link href="https://apps.apple.com/au/app/my-veritasi/id6478011265" target="_blank">
                  <Image src={AppleStoreIcon.src} alt="apple store" />
                </Link>
                <Link href="https://play.google.com/store/apps/details?id=com.matadortrust.veritasi" target="_blank">
                  <Image src={PlayStoreIcon.src} alt="play store" />
                </Link>
              </HStack>
            </Stack>
            <Stack w="full" align="center" justify="center">
              <Image
                src={PhoneImage.src}
                alt=""
                w="full"
                maxW="26.75em"
                h="full"
                maxH={"47.25em"}
                objectFit="cover"
                align="center"
                justifySelf="center"
                position='relative'
                top='4rem'
              />
            </Stack>
          </Stack>
          <Stack position="relative" zIndex={999} justify={{ lg: "center" }}>
            {page === "getStarted" && (
              <GetStarted
                isAgent={isAgent}
                setEmail={setEmail}
                setPage={setPage}
                onAuthClose={onAuthClose}
              />
            )}
            {page === "successLink" && (
              <SuccessLink
                isAgent={isAgent}
                email={email}
                setEmail={setEmail}
                setPage={setPage}
              />
            )}
            {page === "register" && (
              <RegisterForm
                email={email}
                setEmail={setEmail}
                setPage={setPage}
                onAuthClose={onAuthClose}
                isAgent={isAgent}
              />
            )}
            {page === "personalInfo" && isAgent && (
              <PersonalInfo
                setPage={setPage}
                onAuthClose={onAuthClose}
                isAgent={isAgent}
                email={email}
              />
            )}
            {page === "thankYou" && (
              <ThankYou
                isAgent={isAgent}
                email={email}
                setEmail={setEmail}
                setPage={setPage}
                onAuthClose={onAuthClose}
              />
            )}
            {page === "approvalPending" && isAgent && <ApprovalPending />}
            {store_data?.whatsapp_url && (
              <Link
                color="primary"
                fontWeight={500}
                display={{ lg: "none" }}
                pt="1rem"
                textAlign="end"
                alignSelf="end"
                cursor="pointer"
                href={store_data?.whatsapp_url}
                target="_blank"
                textDecoration="none"
              >
                Contact Support
              </Link>
            )}
          </Stack>
        </Stack>
      </Flex>
      
    </Flex>
  );
};

export default Register;
