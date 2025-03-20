import {
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
import { useInfiniteQuery, useQuery } from "react-query";
import { fetchProjectsWithFilters } from "@/api/listing";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { FacebookIconSVG, LinkedinIconSVG } from "../assets/svgs";
import { storeDetails } from "@/api/auth";

export const Footer = ({ TERMS, PRIVACY_POLICY }) => {
  const theme = useTheme();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const storeInfo = useQuery(["storeInfo"], storeDetails);
  const { data: infiniteData } = useInfiniteQuery({
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

  const projectData = infiniteData?.pages?.flatMap((assetsData) =>
    assetsData?.data?.project?.map((item) => item)
  );

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
      px={{ base: "25px", md: "60px", lg: "120px" }}
      gap="26px"
      minH="26.75rem"
      divider={
        <StackDivider
          borderColor={
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.300"
          }
        />
      }
    >
      <Grid
        w="full"
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap="24px"
      >
        <Stack w="full" gap="20px">
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
        <Stack w="full" gap="20px">
          <Text fontSize="18px" fontFamily="Liberation Sans" fontWeight={700}>
            Legal
          </Text>
          <Stack gap="16px">
            <Link
              href={PRIVACY_POLICY ? PRIVACY_POLICY : "#"}
              target={PRIVACY_POLICY ? "_blank" : ""}
              fontSize="14px"
              _hover={{
                textDecor: "none",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href={`${TERMS ? TERMS : ""}`}
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
        {storeData?.company_address ? <Stack w="full" gap="20px">
          <Text fontSize="18px" fontFamily="Liberation Sans" fontWeight={700}>
            Location
          </Text>
          <Text fontSize="14px" lineHeight="33px" maxW="20em">
            {storeData?.company_address}
          </Text>
        </Stack>: null}
        {storeData?.email ? (
          <Stack w="full" gap="20px">
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
      </Grid>
      <HStack w="full" justify="space-between">
        <Text as={Link} href="https://www.myxellia.io" textDecor='none' _hover={{ 
          textDecor: "none"
        }} fontSize="16px">Created by myxellia.io</Text>
       {storeData?.social_links ? <HStack gap="26px">
          <Link href={storeData?.social_links?.linkedin} target="_blank">
            <LinkedinIconSVG />
          </Link>
          <Link href={storeData?.social_links?.facebook} target="_blank">
            <FacebookIconSVG />
          </Link>
        </HStack>: null}
      </HStack>
    </Stack>
  );
};
