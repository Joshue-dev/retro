import { Stack, Box, Grid, Center, useTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LayoutView } from "@/components/page_layout";
import { fetchProjectsWithFilters } from "@/api/listing";
import { useInfiniteQuery } from "react-query";
import EmptyState from "../../components/appState/empty-state";
import Auth from "../../hoc/Auth";
import { ListingCard } from "@/components/cards/ListingCard";
import { OvalLoader } from "ui-lib/ui-lib.components/Spinner/spinner";
import { ScrollToTop } from "@/components/portfolioAndAssetInfo/screens/Portfolio";
import { ErrorPage } from "@/components/appState/error-page";
import ProjectBanners from "./projectBanner";

const Properties = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const [shouldScroll, setScrollDirection] = useState("down");

  const {
    data: infiniteData,
    error,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects", ""],
    queryFn: ({ pageParam = `&page=1&limit=4` }) => {
      return fetchProjectsWithFilters(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      const maxPageNumber = Math.ceil(lastPage?.data?.count / 4);
      const nextPageNumber = pages.length + 1;
      return nextPageNumber <= maxPageNumber
        ? `&page=${nextPageNumber}&limit=4`
        : undefined;
    },
  });

  const numberOfListings =
    infiniteData?.pages?.flatMap((assetsData) =>
      assetsData?.data?.project?.map(() => 0)
    )?.length ?? 0;

  const projectData = infiniteData?.pages?.flatMap((assetsData) =>
    assetsData?.data?.project?.map((item) => item)
  );

  const wrap = document?.getElementById("projectWrap");

  const handleAnimation = () => {
    const currentScrollY = wrap?.scrollTop;
    if (currentScrollY > 540 && numberOfListings > 10) {
      setScrollDirection("up");
    } else {
      setScrollDirection("down");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      handleAnimation();
      if (
        !isFetchingNextPage &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 10
      ) {
        return hasNextPage ? fetchNextPage() : null;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <LayoutView noPadding>
      <Box
        w="full"
        px={{ base: "2.5rem", lg: "3rem", xl: "5rem" }}
        pt={{ base: "16px", md: "20px" }}
        id="projectWrap"
      >
        {isLoading ? (
          <Center h={`70vh`}>
            <OvalLoader />
          </Center>
        ) : isError ? (
          <ErrorPage error={error} />
        ) : (
          <Box w='full'>
            <ProjectBanners/>
            {projectData?.length > 0 ? (
              <Grid
                gap={{ base: `24px`, md: "32px" }}
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                justify={"center"}
                alignItems={"center"}
                maxW={`169.2rem`}
                mx={`auto`}
              >
                {projectData?.map((data, index) => (
                  <Stack align="center" justify="center" w="full" key={index}>
                    <ListingCard
                      data={data}
                      key={data?.id}
                      onClickCard={() =>
                        router.push(`/listing-details/${data?.id}`)
                      }
                    />
                  </Stack>
                ))}
              </Grid>
            ) : (
              <EmptyState
                heading={"Nothing found"}
                text={`No property was found`}
              />
            )}
            <ScrollToTop
              shouldScroll={shouldScroll}
              scrollToTop={ScrollToTop}
            />
          </Box>
        )}
      </Box>
    </LayoutView>
  );
};

export default Auth(Properties);
