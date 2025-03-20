import { useRouter } from "next/router";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";
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
  useBreakpointValue,
  Show,
  Hide,
} from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import downloadIcon from "/src/images/icons/download-icon.svg";
import TransactionHeader from "/src/page.components/agents_components/listings/ListingInfo.components/ListingInfo.details/TransactionHeader";
import AgentsLayoutView from "/src/page.components/agents_components/AgentLayout/View";
import SortBy from "/src/components/assets/SortBy";
import { LISTINGS_TRANSACTIONS } from "/src/constants/listings";
import { fetchListingTransactions } from "/src/api/agents";
import { MatadorCustomTable } from "/src/page.components/agents_components/Table/Table";
import { toastForError } from "../../../../../utils/toastForErrors";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import useLocalStorage from "utils/hooks/useLocalStorage";

export const OutstandingBalanceCustomersForSingleListing = ({ id }) => {
  const [addedParam, setAddedParam] = useState("");
  const toast = useToast();
  const router = useRouter();

  const isFractional = router?.query?.isFractional;
  const name = router?.query?.name;
  const [value, setValue] = useState("1");

  const CUSTOMERS_DATA = useQuery(
    ["outstanding-balance-customers", id, value, addedParam],
    () => fetchListingTransactions(id, value, addedParam),
    {
      refetchOnWindowFocus: true,
    }
  );

  const customersList =
    CUSTOMERS_DATA?.data && CUSTOMERS_DATA?.data?.data?.customer_list;
  const customersMetaData = CUSTOMERS_DATA?.data && CUSTOMERS_DATA?.data?.data;
  const buttonResponsiveText = useBreakpointValue({
    base: "View Fractional",
    lg: "Fractional",
  });

  const sort_params = [
    "A-Z",
    "Z-A",
    "Date Joined Oldest to Newest",
    "Date Joined Newest to Oldest",
  ];

  useEffect(() => {
    CUSTOMERS_DATA?.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getDataFromJSON = (data) => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: data[i]?.name,
          unit: data[i]?.unit,
          purchase_price: data[i]?.purchase_price,
          total_paid: data[i]?.total_paid,
          outstanding_balance: data[i]?.outstanding_balance,
          date: data[i]?.created_at,
          status: data[i]?.status,
        });
    }
    return result;
  };

  const handleNextPage = (arg) => {
    arg == "fractional" &&
      router.push(
        `/agents/listings/manage/transactions/fractional/${parseInt(
          id
        )}?name=${name}`
      );
  };

  if (CUSTOMERS_DATA?.isError) {
    toastForError(CUSTOMERS_DATA?.error, CUSTOMERS_DATA?.isError, toast);
    return (
      <AgentsLayoutView activePage={"Listings"}>
        <Box mt="20px"></Box>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }
  const handleBack = () => {
    router.back();
  };

  return (
    <AgentsLayoutView activePage={"Listings"}>
      <Box h="full" mt={{ base: `50px`, lg: 0 }}>
        <Flex w="full" justify="space-between" mb="20px">
          <HStack zIndex={10}>
            <Image
              onClick={handleBack}
              style={{ cursor: "pointer" }}
              mr={2}
              boxSize="50px"
              src={backArrow.src}
              alt="back_arrow"
            />
            <Heading fontSize="20px" fontWeight="600">
              {name}
            </Heading>
          </HStack>
          <HStack spacing="20px">
            {isFractional == "true" ? (
              <Flex
                position={{ base: "absolute", lg: "static" }}
                bottom={{ base: 0, lg: "unset" }}
                left={{ base: "0", lg: "unset" }}
                height={{ base: "105px", lg: "unset" }}
                bg={{ base: "#fff", lg: "unset" }}
                w={{ base: "full", lg: "unset" }}
                justify={{ base: "center", lg: "space-between" }}
                columnGap="28px"
                zIndex={10}
                align="center"
              >
                <Button
                  bg={{ base: "#4545FE", lg: "transparent" }}
                  border="1px solid #4545FE"
                  mt={0}
                  variant="primary"
                  w={{ base: "350px", lg: "218px" }}
                  h={{ base: "56px", lg: "52px" }}
                  color={{ base: "white", lg: "#4545FE" }}
                  _hover={{
                    bg: "#4545FE",
                    color: "white",
                  }}
                  fontWeight={{ base: 600, lg: 400 }}
                  fontSize={18}
                  onClick={() => handleNextPage("fractional")}
                >
                  {buttonResponsiveText}
                </Button>
              </Flex>
            ) : null}
          </HStack>
        </Flex>
        {CUSTOMERS_DATA?.isLoading ? (
          <Center h="70vh" w="100%">
            <Show above="md">
              <OvalLoader />
            </Show>
            <Hide above="md">
              <Spinner />
            </Hide>{" "}
          </Center>
        ) : CUSTOMERS_DATA?.isError ? (
          <></>
        ) : CUSTOMERS_DATA?.data ? (
          <>
            {/* Meta data */}
            <TransactionHeader
              customersMetaData={customersMetaData}
              value={value}
              setValue={setValue}
            />

            {/* Table */}
            <Box
              padding="0"
              borderRadius={CUSTOMERS_DATA?.isLoading && "8px"}
              overflow={CUSTOMERS_DATA?.isLoading && "hidden"}
              bg={CUSTOMERS_DATA?.isLoading && "white"}
              width={{ base: "full", lg: "fit-content" }}
            >
              <SkeletonText
                isLoaded={!CUSTOMERS_DATA?.isLoading}
                skeletonHeight="60px"
                noOfLines={1}
              />
              <SkeletonText
                isLoaded={!CUSTOMERS_DATA?.isLoading}
                mt="4"
                noOfLines={6}
                spacing="10px"
                skeletonHeight="20px"
              >
                {!CUSTOMERS_DATA?.isLoading && (
                  <MatadorCustomTable
                    // isManageAgentEmpty="Oops you don't have any data yet"
                    isManageAgentEmpty="Looks like there is no transaction yet"
                    downloadcsv={
                      <CSVLink data={getDataFromJSON(customersList)}>
                        <Button
                          display={{ base: "none", lg: "flex" }}
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
                        display={{ base: "none", lg: "flex" }}
                      />
                    }
                    isRefetching={CUSTOMERS_DATA?.isLoading}
                    nextPageUrl={"/agents/users/user_payment_breakdown"}
                    minW="full"
                    dontExpand
                    headerSpace="evenly"
                    DATA={customersList}
                    forData={[value, addedParam]}
                    forColumn={[value, addedParam]}
                    COLUMNS={LISTINGS_TRANSACTIONS(customersList)}
                    // border={{base: 'solid 1px #EAECF0', lg: `none`}}
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

export async function getServerSideProps(context) {
  const { query } = context;
  const id = query.id;

  return {
    props: {
      id,
    },
  };
}

export default OutstandingBalanceCustomersForSingleListing;
