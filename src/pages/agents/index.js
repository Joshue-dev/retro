import React, { useEffect, useState } from "react";
import { Box, Flex, HStack, Link, Text, useTheme } from "@chakra-ui/react";
import { useQuery } from "react-query";
import Register from "@/components/auth/register";
import { VerifyTokenAgents } from "@/api/auth";
import { Spinner } from "ui-lib";
import { bgImages } from "constants/background";
import { toastForError } from "utils/toastForErrors";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { useRouter } from "next/router";
import { setSession } from "utils/sessionmanagers";
import { fetchTermsAndConditionsPDF, storeDetails } from "@/api/agents";

function Home() {
  const router = useRouter();
  const STOREINFO = useQuery(["storeInfo"], storeDetails);
  const store_data = STOREINFO.data?.data?.data;
  const STOREDOCUMENTS = useQuery(["terms"], fetchTermsAndConditionsPDF);
  const TERMS = STOREDOCUMENTS?.data?.data?.message?.document;
  const PRIVACY_POLICY = STOREDOCUMENTS?.data?.data?.policy;
  const theme = useTheme();
  const toast = useToastForRequest();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const { magic } = router.query;

  useEffect(() => {
    setRandomNumber(parseInt(Math.random() * 12));
  }, []);

  const magicQuery = useQuery(
    ["verifyTokenAgent", magic],
    () => VerifyTokenAgents({ token: magic }),
    {
      onSuccess: (res) => {
        if (res?.data?.valid === "true" || res?.data?.valid === true) {
          if (typeof window !== null) {
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

            const { owner, store_name } = res?.data?.store;

            const {
              email,
              first_name,
              last_name,
              avatar,
              initial_status,
              sign_up_time,
              id,
              agent_id,
            } = res?.data?.user;

            const userDetails = {
              email,
              first_name,
              last_name,
              avatar,
              initial_status,
              sign_up_time,
              id,
              agent_id,
              storeName: store_name,
              companyName: owner?.company_name,
            };
            setSession(res?.data?.user_tokens?.token, "a_token", expires);
            setSession(userDetails, "a_details", expires);
            window.location = `${window.location.origin}/agents/listings`;
          }
        }
      },
      onError: (err) => {
        toastForError(err, true, toast);
        setTimeout(() => router.push("/agents"), 3000);
      },
      enabled: Boolean(magic),
    }
  );

  if (magicQuery?.isLoading) {
    return <Spinner />;
  }

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
          >
            <Register isAgent={true} isAuthOpen={true} onAuthClose={() => {}} />
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
              fontSize={{ base: "11px", md: "16px" }}
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

export default Home;

export async function getServerSideProps(context) {
  const { query } = context;
  const magic = query.magic;

  return {
    props: {
      magic: magic ? `${magic}` : null,
    },
  };
}
