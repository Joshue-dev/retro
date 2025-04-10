import {
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Image as ChakraImage,
} from "@chakra-ui/react";
import PhoneImage from "images/landing-page/veritasi-phone.png";
import veritasiLogo from "images/landing-page/veritasi-light.png";
import Image from "next/image";
import moment from "moment";
import { useEffect, useState } from "react";
import useLocalStorage from "utils/hooks/useLocalStorage";
export const VeritasiBanner = () => {
  const [count, setCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenHeight(window.innerHeight);
    }

    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      let index = 0;
      setInterval(() => {
        index++;
        setCount(index);
      }, 2000);
    }
  }, [imageLoaded]);

  return (
    <Stack
      bg="#FFE6E6"
      w="full"
      flex={1}
      align="center"
      justify={
        screenHeight <= 720 || screenHeight >= 1200
          ? "center"
          : { base: "center", xl: "space-between" }
      }
      display={{ base: "none", lg: "flex" }}
      gap="16px"
    >
      <Stack
        w="full"
        align="center"
        textAlign="start"
        mt={
          screenHeight <= 720 || screenHeight >= 1200
            ? 0
            : { base: 0, xl: "96.5px" }
        }
        px={{ base: 8, xl: 0 }}
      >
        <Heading
          fontWeight={600}
          w="full"
          maxW="607px"
          fontFamily="Noto Sans"
          fontSize={{ lg: "48px", xl: "56px" }}
          lineHeight="64px"
          textTransform="uppercase"
          letterSpacing="-2%"
        >
          One Interface,
          <br />
          <Text as="span" color="primary">
            All Things Veritasi
          </Text>
        </Heading>
        <Text
          maxW={"605px"}
          fontFamily="League Spartan"
          fontSize="20px"
          color="#606060"
        >
          Get updates on your projects, track payments, and access all documents
          — all in one place.{" "}
        </Text>
      </Stack>
      <Stack
        w="full"
        align="center"
        justify="center"
        maxW={screenHeight <= 768 ? "415px" : "539px"}
        h="full"
        pos="relative"
        display={
          screenHeight <= 720 || screenHeight >= 1200
            ? "none"
            : { base: "none", xl: "flex" }
        }
      >
        <Image
          src={PhoneImage.src}
          alt="phone image"
          fill
          objectFit="cover"
          style={{
            objectFit: "cover",
            objectPosition: "top",
          }}
          onLoad={() => setImageLoaded(true)}
        />
        <Stack
          position={`absolute`}
          bottom={screenHeight <= 800 ? "80px" : `100px`}
          left={screenHeight <= 768 ? "-24px" : `14px`}
          zIndex={`1`}
          gap={`24px`}
        >
          <Flex
            borderRadius="12px"
            background="var(--Live-Activities-Apple-Music-Auto-Tint, linear-gradient(0deg, #848484 0%, #848484 100%), linear-gradient(0deg, #351111 0%, #351111 100%), #B2B2B2);"
            backgroundBlendMode="hard-light, luminosity, overlay"
            backdropFilter={{ base: `blur(45.50810623168945px)` }}
            gap={`16px`}
            p={`10px`}
            align={`center`}
            w={{ base: "421.02px", lg: "100%" }}
            opacity={count >= 2 ? `1` : `0`}
            transition={`.5s`}
            h="106.2px"
          >
            <Flex w="max-content">
              <NotifIcon />
            </Flex>
            <Stack gap={`1.3px`} fontFamily="SF Pro Display" color="#FFF">
              <HStack justify={`space-between`} gap={`10px`}>
                <Text
                  fontSize={`16.992px`}
                  fontWeight={`600`}
                  lineHeight={`142%`} /*  */
                  letterSpacing={`0.36px`}
                >
                  Realtime portfolio tracking
                </Text>
                <Text
                  color={`#F7F7F7`}
                  fontSize={`15.758px`}
                  fontWeight={`400`}
                  lineHeight={`170%`}
                  opacity={`.65`}
                  textAlign={`right`}
                >
                  {moment().format("HH:mm")}
                </Text>
              </HStack>
              <Text
                fontSize={`14.868px`}
                lineHeight={`16.992px;`}
                letterSpacing={`0.12px`}
                color="#D1D1D6"
              >
                Great news! Your Veritasi Homes real estate portfolio is all set
                up and synced. You can easily keep an eye on your portfolio in
                real time tracking your progress
              </Text>
            </Stack>
          </Flex>
          <Flex
            borderRadius="12px"
            background="var(--Live-Activities-Apple-Music-Auto-Tint, linear-gradient(0deg, #848484 0%, #848484 100%), linear-gradient(0deg, #351111 0%, #351111 100%), #B2B2B2);"
            backgroundBlendMode="hard-light, luminosity, overlay"
            backdropFilter={{ base: `blur(45.50810623168945px)` }}
            gap={`16px`}
            p={`10px`}
            align={`center`}
            w={{ base: "421.02px", lg: "475px", xl: "80%" }}
            opacity={count >= 1 ? `1` : `0`}
            transition={`.5s`}
            h="106.2px"
            ml="50px"
          >
            <Flex w="max-content">
              <NotifIcon />
            </Flex>
            <Stack gap={`1.3px`} fontFamily="SF Pro Display" color="#FFF">
              <HStack justify={`space-between`} gap={`10px`}>
                <Text
                  fontSize={`16.992px`}
                  fontWeight={`600`}
                  lineHeight={`142%`} /*  */
                  letterSpacing={`0.36px`}
                >
                  Protection Activated
                </Text>
                <Text
                  color={`#F7F7F7`}
                  fontSize={`15.758px`}
                  fontWeight={`400`}
                  lineHeight={`170%`}
                  opacity={`.65`}
                  textAlign={`right`}
                >
                  {moment().format("HH:mm")}
                </Text>
              </HStack>
              <Text
                fontSize={`14.868px`}
                lineHeight={`16.992px;`}
                letterSpacing={`0.12px`}
                color="#D1D1D6"
              >
                You're covered! Your home insurance for Camberwall Advantage 5
                is officially in place. Rest easy!
              </Text>
            </Stack>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
};

const NotifIcon = () => {
  return (
    <Stack
      bg="#000"
      boxSize="46.02px"
      align="center"
      justify="center"
      rounded="12px"
    >
      <ChakraImage
        src={veritasiLogo.src}
        w=" 32.982px"
        height="15.515px"
        alt={"Company Image"}
        objectFit="contain"
        transition="0.3s ease-in-out"
      />
    </Stack>
  );
};
