import React, { useEffect, useState } from "react";
import LandingWrapper from "../hoc/LandingWrapper";
import Register from "../components/auth/register";
import { Box, Flex, HStack, Link, Text, useTheme } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Spinner } from "@/components/loaders/AnimatedLoader";
import { bgImages } from "constants/background";
import { storeDetails } from "@/api/auth";

function Home() {
  const STOREINFO = useQuery(["storeInfo"], storeDetails);
  const store_data = STOREINFO.data?.data?.data;
  const TERMS = store_data?.customer_document;
  const PRIVACY_POLICY = store_data?.customer_privacy_policy;
  const theme = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setRandomNumber(parseInt(Math.random() * 12));
  }, []);

  return (
    <>
      <img
        src={bgImages[randomNumber]?.src}
        alt="Background"
        style={{ display: "none" }} // Hide the image, but still trigger the load event
        onLoad={handleImageLoad}
      />
      {imageLoaded ? (
        <Flex
          w="full"
          minH="100vh"
          bgImage={{ md: bgImages[randomNumber]?.src }}
          backgroundPosition={{ md: "center" }}
          position={`relative`}
          color={`matador_text.100`}
          backgroundSize={{ md: "cover" }}
          direction={`column`}
          bg="card_bg"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            w="full"
            h="full"
            bg="black"
            opacity={{ base: 0, md: 0.15 }}
            bgBlendMode="multiply"
          />
          <Flex
            flex="1"
            h={`100%`}
            alignItems={{ base: "flex-start", md: `center` }}
            bg={{
              base:
                theme.theme_name !== "light"
                  ? "matador_background.100"
                  : "background",
              md: "none",
            }}
            overflow="hidden"
          >
            <Register isAuthOpen={true} onAuthClose={() => {}} />
          </Flex>
          <HStack
            w="full"
            justify="space-between"
            borderTop="0.5px solid"
            borderTopColor={
              theme.theme_name !== "light"
                ? "matador_border_color.200"
                : "shade"
            }
            pt="16px"
            p={{ base: "12px 20px", md: "12px 100px" }}
            fontSize={{ base: 12, md: 15 }}
            alignSelf="end"
            justifySelf="end"
            position="fixed"
            bottom={`0px`}
            left={`0px`}
            width={`100%`}
            zIndex={1}
            // bottom={0}
            color={`matador_text.400`}
            bg="card_bg"
          >
            <Text
              fontWeight="400"
              fontSize={{ base: "12px", md: "16px" }}
              opacity={".6"}
              fontFamily={"Open Sans"}
              as={Link}
              href="https://www.myxellia.io"
              textDecor="none"
              _hover={{
                textDecor: "none",
              }}
            >
              Created by myxellia.io
            </Text>
            <HStack gap={{ base: "16px", md: "40px" }} fontFamily={"Open Sans"}>
              <Link
                onClick={!TERMS ? (e) => e.preventDefault() : null}
                href={`${TERMS ? TERMS : ""}`}
                target={TERMS ? "_blank" : ""}
                fontWeight="600"
              >
                Terms of service
              </Link>
              <Link
                onClick={!PRIVACY_POLICY ? (e) => e.preventDefault() : null}
                href={PRIVACY_POLICY ? PRIVACY_POLICY : "#"}
                target={PRIVACY_POLICY ? "_blank" : ""}
                fontWeight="600"
              >
                Privacy Policy
              </Link>{" "}
            </HStack>
          </HStack>
        </Flex>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default LandingWrapper(Home);
