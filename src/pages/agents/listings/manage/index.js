import {
  Box,
  Center,
  Hide,
  Show,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import SortBy from "/src/components/assets/SortBy";
import LISTINGSVIEWCOLUMN from "/src/constants/listings";
import { MatadorCustomTable } from "/src/page.components/agents_components/Table/Table";
import Filter from "/src/page.components/agents_components/listings/filter";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import { toastForError } from "utils/toastForErrors";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { STORENAMEFROMDOMAIN } from "constants/routes";
import { AgentListings } from "@/api/agents";

export const ListingsTable = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [addedParam, setAddedParam] = useState({
    sort: "",
    filter: "",
    param: "",
  });

  const toast = useToast();
  const param = addedParam;

  const sort_params = [
    "Most sold to least sold",
    "Least sold  to most sold",
    "Highest price to lowest price",
    "Lowest price to highest price",
    "Highest rating to lowest rating",
    "Lowest rating to highest rating",
  ];

  const defaultValue = "most_sold_to_least_sold";

  const {
    data,
    isLoading: loading,
    error,
    isError: isErr,
  } = useQuery(["agent_listings", param?.param], () =>
    AgentListings(param?.param)
  );

  console.log(data);

  toastForError(error, isErr, toast);

  const forFilter = data && {
    max_price: data?.data?.max_price,
    min_price: data?.data?.min_price,
  };

  const listingData = data?.data?.listings;

  const handleCollapsed = (prop) => {
    setIsCollapsed(!isCollapsed);
    if (prop === "expand") {
      return window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      return window.scrollTo({
        top: document.body.scrollHeight + 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box pb="1.5em" overflow="auto" mt={{ base: `50px`, lg: 0 }}>
      {loading ? (
        <>
          <Center h="70vh" w="100%">
            <Show above="md">
              <OvalLoader />
            </Show>
            <Hide above="md">
              <Spinner />
            </Hide>{" "}
          </Center>
        </>
      ) : isErr ? (
        <Center h="70vh" w="100%">
          <Text>An Error Occured!</Text>
        </Center>
      ) : (
        <MatadorCustomTable
          noTopPaginate
          dontExpand
          columnHeight
          sortBy={
            <SortBy
              setUrl={setAddedParam}
              url={addedParam}
              defaultValue={defaultValue}
              sortFor="listing"
              sort_params={sort_params}
            />
          }
          filter={
            <Filter
              forFilter={forFilter}
              setUrl={setAddedParam}
              url={addedParam}
            />
          }
          DATA={listingData}
          forData={[data?.data, addedParam.filter]}
          isRefetching={loading}
          isCollapsed={isCollapsed}
          COLUMNS={LISTINGSVIEWCOLUMN([listingData])}
          cellPadding={{ base: "12px 8px", md: "16px 24px" }}
          headerCellPadding={{ base: "12px 8px", md: "16px 24px" }}
          handleExpand={handleCollapsed}
          headerSpace="evenly"
          isManageAgentEmpty="Oops! you don't have any listing yet....."
          linkText={<Text fontWeight={600}>Listings</Text>}
          border={`1px solid #e4e4e4`}
          overflow={`hidden`}
        />
      )}
    </Box>
  );
};

export default ListingsTable;
