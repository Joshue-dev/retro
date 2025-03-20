import {
  Image,
  VStack,
  HStack,
  Text,
  Stack,
  SlideFade,
  ModalCloseButton,
  ModalBody,
  useTheme,
} from "@chakra-ui/react";
import angledIcon from "/src/images/icons/angledArrow.svg";
import React, { useEffect, useState } from "react";
import { fetchUserEquity } from "../../../api/listing";
import { useInfiniteQuery } from "react-query";
import { Spinner } from "../../../ui-lib";
import EmptyState from "../../appState/empty-state";
import { css, keyframes } from "@emotion/react";
import { useLightenHex } from "utils/lightenColorShade";
import ErrorState from "@/components/appState/error-state";

const Portfolio = ({ LIST_OF_PORTFOLIO, handleScreen, setEquityId }) => {
  const [shouldScroll, setScrollDirection] = useState("down");
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);

  const wrap = document?.getElementById("assetsWrap");
  const scrollToTop = () => {
    wrap.scrollTop = 0;
  };
  const numberOfAssets =
    LIST_OF_PORTFOLIO?.data?.pages?.flatMap((assetsData) =>
      assetsData?.data?.results?.map(() => 0)
    )?.length ?? 0;

  const handleAnimation = () => {
    const currentScrollY = wrap?.scrollTop;

    if (currentScrollY > 540 && numberOfAssets > 10) {
      setScrollDirection("up");
    } else {
      setScrollDirection("down");
    }
  };

  const handleScroll = () => {
    const wrap = document?.getElementById("assetsWrap");
    handleAnimation();
    if (
      !LIST_OF_PORTFOLIO?.isFetchingNextPage &&
      wrap?.clientHeight + wrap?.scrollTop >= wrap?.scrollHeight
    ) {
      return LIST_OF_PORTFOLIO?.hasNextPage
        ? LIST_OF_PORTFOLIO?.fetchNextPage()
        : null;
    }
  };
  const arrayData = LIST_OF_PORTFOLIO?.data?.pages?.flatMap((assetsData) =>
    assetsData?.data?.results?.map((item) => item)
  );

  const customScrollbarStyles = (
    trackColor = "#fff",
    thumbColor = "#cbcbcb"
  ) => ({
    "&::-webkit-scrollbar": {
      width: "4px",
      borderRadius: "16px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "16px",
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "16px",
      backgroundColor: thumbColor,
    },
  });

  useEffect(() => {
    if (arrayData?.length === 1) {
      setEquityId(arrayData?.[0]?.id);
      handleScreen("asset info");
    } else {
      handleScreen("list");
    }
  }, [arrayData]);

  const handleManageAssets = (property) => {
    setEquityId(property?.id);
    return handleScreen("asset info");
  };

  return (
    <>
      <HStack
        p={{ base: "20px", md: "24px" }}
        w="full"
        maxH={{ base: "89.5px", md: "100px" }}
        justify="space-between"
        align="center"
        id="assetsWrap"
        borderBottom={{ md: "1px solid" }}
        borderBottomColor={{
          md:
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.300",
        }}
      >
        <Text
          as="h1"
          fontSize={{ base: "18px", md: "22px" }}
          fontFamily="Open Sans"
          lineHeight={{ base: "22px", md: "33px" }}
          fontWeight="600"
          color="text"
          letterSpacing={"1.44px"}
        >
          PORTFOLIO
        </Text>

        <ModalCloseButton
          position="initial"
          size={12}
          color={"matador_text.100"}
          _hover={{
            bg: "",
            border: "none",
          }}
        />
      </HStack>
      {LIST_OF_PORTFOLIO?.isLoading ? (
        <VStack mt="40%" w="full" h="300px">
          <Spinner noAbsolute />
        </VStack>
      ) : LIST_OF_PORTFOLIO?.isError ? (
        <ErrorState error={LIST_OF_PORTFOLIO?.error} />
      ) : (
        <ModalBody
          px={{ base: "10px", md: "16px" }}
          sx={customScrollbarStyles()}
          scrollBehavior="smooth"
          onScroll={handleScroll}
          overflowY="auto"
          pt={3}
          mx={4}
        >
          {arrayData?.length > 0 ? (
            <>
              <Stack spacing="14px" alignItems={"center"}>
                {(arrayData || [])?.map((equity, idx) => (
                  <VStack
                    key={idx}
                    w={"full"}
                    onClick={() => handleManageAssets(equity)}
                    cursor="pointer"
                    align="center"
                    border={"1px solid"}
                    borderColor={
                      theme.theme_name !== "light"
                        ? "matador_border_color.200"
                        : "primary"
                    }
                    pt="8px"
                    pb="12px"
                    px="4px"
                    minH={{ base: "92px", md: "72px" }}
                    justify="center"
                    bg="background"
                  >
                    <Text
                      fontSize={{ base: "15.907px", md: "18px" }}
                      fontWeight="700"
                      fontFamily={"Liberation Sans"}
                      color={
                        theme.theme_name !== "light"
                          ? lightenHex(80)
                          : "primary"
                      }
                      letterSpacing="3.2px"
                      textTransform="uppercase"
                      textAlign="center"
                    >
                      {equity?.type === "FRACTIONAL"
                        ? `${equity?.amount_of_fractions} fraction${
                            equity?.amount_of_fractions > 1 ? `s` : ""
                          }`
                        : equity?.unit?.unit_title}
                    </Text>
                    <Text
                      fontSize={{ base: "12.372px", md: "14px" }}
                      fontWeight="400"
                      letterSpacing="3.2px"
                      textTransform="uppercase"
                      color="matador_text.400"
                      textAlign="center"
                    >
                      {equity?.project?.name}
                    </Text>
                  </VStack>
                ))}
              </Stack>
            </>
          ) : (
            <EmptyState
              icon
              textSize={14}
              headerStyle={{
                fontSize: "16px",
                letterSpacing: { base: "0.96px", md: "normal" },
                textTransform: { base: "uppercase", md: "none" },
              }}
              height={{ base: "200px", md: "300px" }}
              text={`You haven't purchased any property yet.`}
              gap={0}
            />
          )}
          {/* <SlideFade in={isFetchingNextPage}>
            <Text
              color={theme.theme_name !== 'light' ? "matador_text.500" : "matador_text.300"}
              fontSize="12px"
              css={isFetchingNextPage ? loadingAnimation : null}
              textAlign="center"
            >
              Just a sec ...
            </Text>
          </SlideFade> */}
          <ScrollToTop shouldScroll={shouldScroll} scrollToTop={scrollToTop} />
        </ModalBody>
      )}
    </>
  );
};

export default Portfolio;

const colorChange = keyframes`
  0% {
    color: #606060; /* Start color */
  }
  100% {
    color: #fff; /* End color */
  }
`;

// Define CSS for loading animation
export const loadingAnimation = css`
  animation: ${colorChange} 1s infinite alternate; /* Apply animation only when loading */
`;

export const ScrollToTop = ({ shouldScroll, scrollToTop }) => {
  return (
    <HStack
      justify="center"
      opacity={shouldScroll === "up" ? 1 : 0}
      visibility={shouldScroll === "up" ? "visible" : "hidden"}
      transition="ease-in-out 0.3s"
      transform={`translateY(${shouldScroll === "up" ? "0px" : "20px"}) scale(${
        shouldScroll === "up" ? 1 : 0.8
      })`}
      position="fixed"
      bottom="10"
      right={{ base: "3%", md: "10" }}
      align="center"
      p="5px"
      role="button"
      onClick={scrollToTop}
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.6)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
    >
      <Image
        src={angledIcon.src}
        boxSize="20px"
        transform="rotate(90deg)"
        alt="right arrow"
      />
    </HStack>
  );
};
