import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import backArrow from "/src/images/icons/back-arrow.png";

import {
  useToast,
  Box,
  Flex,
  Image,
  HStack,
  Button,
  VStack,
  Heading,
  Text,
  Spinner,
  SkeletonText,
  Center,
  Show,
  Hide,
} from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import downloadIcon from "/src/images/icons/download-icon.svg";
import AgentsLayoutView from "/src/page.components/agents_components/AgentLayout/View";
import SortBy from "/src/components/assets/SortBy";
import { LISTINGS_TRANSACTIONS } from "/src/constants/listings";
import { MatadorCustomTable } from "/src/page.components/agents_components/Table/Table";
import { unitTransactions } from "api/agents";
import { changeDateFormat } from "utils/formatDate";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import useLocalStorage from "utils/hooks/useLocalStorage";

export const UnitTransactionHistory = () => {
  const [addedParam, setAddedParam] = useState("");
  const toast = useToast();
  const router = useRouter();
  const id = router?.query?.id;
  const name = router?.query?.name;
  const [value, setValue] = useState("1");

  const LISTING_DATA = useQuery(["unit-listing", id && parseInt(id)], () =>
    unitTransactions(id && parseInt(id))
  );

  const customersList = LISTING_DATA?.data && LISTING_DATA?.data?.data?.data;

  const sort_params = [
    "A-Z",
    "Z-A",
    "Date Joined Oldest to Newest",
    "Date Joined Newest to Oldest",
  ];

  useEffect(() => {
    LISTING_DATA?.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getDataFromJSON = (data) => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: `${data[i]?.customer?.first_name} ${data[i]?.customer?.last_name}`,
          purchase_price: data[i]?.purchase_price,
          total_paid: data[i]?.total_paid,
          outstanding_balance: data[i]?.outstanding_balance,
          date: changeDateFormat(data[i]?.date),
          status: data[i]?.status,
        });
    }
    return result;
  };

  if (LISTING_DATA?.isError) {
    toast({
      title: "Oops ...",
      description: `${
        LISTING_DATA?.error?.response?.data?.message ??
        LISTING_DATA?.error?.response?.message ??
        LISTING_DATA?.error?.message ??
        "Something went wrong,we are working on resolving it"
      }`,
      status: "error",
      duration: 8000,
      isClosable: true,
      position: "top-right",
    });
    return (
      <AgentsLayoutView activePage={"Listings"}>
        <Box mt="20px">{/* <BackArrowWithText text="Back" /> */}</Box>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }
  const handleBack = () => {
    router.back();
  };

  return (
    <AgentsLayoutView activePage={"Listings"}>
      <Box
        h="full"
        mt={{ base: `50px`, lg: 0 }}
        w={{ base: "90vw", md: "full" }}
      >
        <Flex w="full" justify="space-between">
          <HStack mb="10px" zIndex={10}>
            <Image
              onClick={handleBack}
              style={{ cursor: "pointer" }}
              mr={2}
              boxSize="50px"
              src={backArrow.src}
              alt="back_arrow"
            />
            <Heading fontSize="20px" fontWeight="600">
              {name ?? "Back"}
            </Heading>
          </HStack>
        </Flex>
        {LISTING_DATA?.isFetching ? (
          <Center h="50vh" w="100%">
            <Show above="md">
              <OvalLoader />
            </Show>
            <Hide above="md">
              <Spinner />
            </Hide>{" "}
          </Center>
        ) : LISTING_DATA?.isError ? (
          <></>
        ) : LISTING_DATA?.data ? (
          <>
            <HStack
              mb="18px"
              mt="45px"
              w="full"
              justify="flex-end"
              gap="12px"
            ></HStack>

            {/* Table */}
            <Box
              padding="0"
              border={LISTING_DATA?.isFetching && "solid 1px #f4f4f4"}
              borderRadius={LISTING_DATA?.isFetching && "8px"}
              overflow={LISTING_DATA?.isFetching && "hidden"}
              bg={LISTING_DATA?.isFetching && "white"}
            >
              <SkeletonText
                isLoaded={!LISTING_DATA?.isFetching}
                skeletonHeight="60px"
                noOfLines={1}
              />
              <SkeletonText
                isLoaded={!LISTING_DATA?.isFetching}
                mt="4"
                noOfLines={6}
                spacing="10px"
                skeletonHeight="20px"
              >
                {!LISTING_DATA?.isLoading && (
                  <MatadorCustomTable
                    // isManageAgentEmpty="Oops you don't have any data yet"
                    isManageAgentEmpty="Looks like there is no transaction yet"
                    downloadcsv={
                      <CSVLink
                        filename="unit-transactions"
                        data={getDataFromJSON(customersList)}
                      >
                        <Button
                          display={{ base: "none", md: "flex" }}
                          gap="3px"
                          w="177px"
                          height="46px"
                          border="1px solid #4545FE"
                          borderRadius="12px"
                          fontWeight="500"
                          fontSize="12px"
                          lineHeight="15px"
                          textAlign="center"
                          color="#4545FE"
                          bg="transparent"
                        >
                          <Image
                            w="18px"
                            h="18px"
                            src={downloadIcon.src}
                            alt=""
                          />
                          Download as CSV
                        </Button>
                      </CSVLink>
                    }
                    sortBy={
                      <SortBy
                        url={addedParam}
                        setUrl={setAddedParam}
                        sortFor="outstanding_balance_id"
                        sort_params={sort_params}
                        display={{ base: "none", md: "flex" }}
                      />
                    }
                    isRefetching={LISTING_DATA?.isFetching}
                    nextPageUrl={
                      "/agents/users/user_payment_breakdown_fractional"
                    }
                    minW="full"
                    dontExpand
                    headerSpace="evenly"
                    DATA={customersList}
                    COLUMNS={LISTINGS_TRANSACTIONS(customersList)}
                    linkText={""}
                    border={{ base: "solid 1px #e4e4e4" }}
                    overflow={`hidden`}
                  />
                )}
              </SkeletonText>
            </Box>
          </>
        ) : null}
      </Box>
    </AgentsLayoutView>
  );
};

export default UnitTransactionHistory;
