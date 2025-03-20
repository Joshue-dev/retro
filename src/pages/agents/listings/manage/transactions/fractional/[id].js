import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  Heading,
  VStack,
  useToast,
  Button,
  Spinner,
  Center,
} from "@chakra-ui/react";
import backArrow from "/src/images/icons/back-arrow.png";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";
import downloadIcon from "/src/images/icons/download-icon.svg";
import { ImFilesEmpty } from "react-icons/im";
import { FRACTIONAL_TXNS_COLUMNS } from "/src/constants/listings";
import FractionalTxnHeader from "/src/page.components/agents_components/listings/ListingInfo.components/ListingInfo.details/FractionalTxnHeader";
import AgentsLayoutView from "/src/page.components/agents_components/AgentLayout/View";
import { Fractional } from "/src/api/agents";
import { MatadorCustomTable } from "/src/page.components/agents_components/Table/Table";
import SortBy from "/src/components/assets/SortBy";
import { changeDateFormat } from "/src/utils/formatDate";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import useLocalStorage from "utils/hooks/useLocalStorage";

export const TransactionFractionalBreakdown = () => {
  const toast = useToast();
  const { query } = useRouter();
  const [addedParam, setAddedParam] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleExpand = () => {
    return setIsCollapsed(!isCollapsed);
  };

  const param = query.id + addedParam;

  const TRANSACTIONS = useQuery(["fractional_listings_agents", param], () =>
    Fractional(param)
  );
  const FractionalTxns = TRANSACTIONS && TRANSACTIONS?.data?.data?.data;
  const router = useRouter();

  const getDataFromJSON = (data) => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: `${data[i].owner?.first_name} ${data[i].owner.last_name}`,
          "No. of fractional": data[i]?.amount,
          "Purchase Price": data[i]?.purchase_price,
          "Fractional value": data[i]?.equity_value,
          Date: changeDateFormat(data[i]?.created_at),
        });
    }
    return result;
  };

  const sort_params = [
    "Total Purchase Highest to Lowest",
    "Total Purchase Lowest to Highest",
    "Highest no. of Fractions to Lowest",
    "Lowest no. of Fractions to Highest",
  ];

  const handleBack = () => {
    return router.back();
  };

  if (TRANSACTIONS?.isError) {
    toast({
      title: "Oops ...",
      description: `${
        TRANSACTIONS?.error?.response?.data?.message ??
        TRANSACTIONS?.error?.response?.message ??
        TRANSACTIONS?.error?.message ??
        "Something went wrong,kindly check your network connection"
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

  return (
    <div>
      <AgentsLayoutView activePage="Listings">
        {TRANSACTIONS?.isError ? (
          toast({
            title: "An error occured",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          })
        ) : TRANSACTIONS?.isFetching ? (
          <Center h="70vh" w="100%">
            <OvalLoader />
          </Center>
        ) : (
          <Box mt={{ base: 4, md: 0 }} h="full">
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
                {query?.name ? query?.name + ", Fractional" : "Back"}
              </Heading>
            </HStack>
            {!isCollapsed && (
              <FractionalTxnHeader data={TRANSACTIONS?.data?.data?.overview} />
            )}
            <HStack mb="18px" mt="25px" w="full"></HStack>
            <MatadorCustomTable
              isManageAgentEmpty="Oops! you don't have any data yet."
              handleExpand={handleExpand}
              isCollapsed={isCollapsed}
              // dontExpand
              downloadcsv={
                <CSVLink data={getDataFromJSON(FractionalTxns)}>
                  <Button
                    bg="#ffffff"
                    mt={0}
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
                  >
                    <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
                    Download as CSV
                  </Button>
                </CSVLink>
              }
              nextPageUrl={"/agents/users/user_payment_breakdown_autopay"}
              sortBy={
                <SortBy
                  sort_params={sort_params}
                  url={addedParam}
                  display={{ base: "none", md: "flex" }}
                  setUrl={setAddedParam}
                  sortFor="fractional"
                />
              }
              headerSpace="evenly"
              DATA={FractionalTxns}
              COLUMNS={FRACTIONAL_TXNS_COLUMNS(FractionalTxns)}
              border={{ base: "solid 1px #e4e4e4" }}
              overflow={`hidden`}
            />
          </Box>
        )}
      </AgentsLayoutView>
    </div>
  );
};

export default TransactionFractionalBreakdown;
