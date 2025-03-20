/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Center,
  HStack,
  Heading,
  Hide,
  Image,
  Show,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchCustomers } from "../../../../api/agents";
import { AGENT_USERS_COLUMN } from "../../../../constants/agentUser";
import AgentsLayoutView from "../../../../page.components/agents_components/AgentLayout/View";
import { MatadorCustomTable } from "../../../../page.components/agents_components/Table/Table";
import UsersHeader from "./users_header";
import Filter from "../../../../page.components/agents_components/users/filter";
import { toastForError } from "../../../../utils/toastForErrors";
import SortBy from "../../../../components/assets/SortBy";
import backArrow from "/src/images/icons/back-arrow.png";
import router from "next/router";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import useLocalStorage from "utils/hooks/useLocalStorage";

const index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [value, setValue] = useState("1");

  const columns = useMemo(() => AGENT_USERS_COLUMN, []);
  const [addedParam, setAddedParam] = useState({
    sort: "",
    filter: "",
    param: "",
  });

  const QUERY_PARAMS =
    value == "2"
      ? "asset_holders=true"
      : value == "3"
      ? "defaulting=true"
      : value == "4"
      ? "outstanding=true"
      : value == "5"
      ? "outstanding=false"
      : value == "6"
      ? "fractions=true"
      : "";

  const mainParam =
    (addedParam.param && addedParam.param) +
    (QUERY_PARAMS && "&") +
    QUERY_PARAMS;

  const customers = useQuery(["users_for_agentis", mainParam], () =>
    fetchCustomers(mainParam)
  );

  const handleCollapsed = () => {
    return setIsCollapsed(!isCollapsed);
  };

  const toast = useToast();

  useEffect(() => {
    const fetch = async () => await customers.refetch();
    fetch();
    // eslint-disable-next-line
  }, [value, addedParam]);

  const sort_params = [
    "A-Z",
    "Z-A",
    "Date joined oldest to newest",
    "Date joined newest to oldest",
  ];
  toastForError(customers.error, customers.isError, toast);

  return (
    <AgentsLayoutView activePage="customers">
      {!isCollapsed ? (
        <VStack align={"flex-start"} mt={{ base: 4, lg: 0 }} pt="20px">
          <Heading
            display={{ base: "flex", lg: "none" }}
            fontSize="20px"
            fontWeight="600"
          >
            Subscribers
          </Heading>
          <UsersHeader
            value={value}
            setValue={setValue}
            number_of_customers={customers?.data?.data?.total_customers}
            customers_with_outstanding_payment={
              customers?.data?.data?.customers_with_outstanding
            }
            customers_without_outstanding_payment={
              customers?.data?.data?.customers_without_outstanding
            }
            defaulters={customers?.data?.data?.total_defaulters}
          />
        </VStack>
      ) : null}

      {customers.isLoading ? (
        <Center h="60vh" w="100%">
          <Show above="md">
            <OvalLoader />
          </Show>
          <Hide above="md">
            <Spinner />
          </Hide>
        </Center>
      ) : customers.isError ? (
        <></>
      ) : (
        <MatadorCustomTable
          noTopPaginate
          isRefetching={customers.isLoading}
          forData={[addedParam, value]}
          DATA={customers.data?.data?.data}
          isCollapsed={isCollapsed}
          COLUMNS={columns}
          sortBy={
            <SortBy
              sortFor="users"
              setUrl={setAddedParam}
              url={addedParam}
              sort_params={sort_params}
            />
          }
          filter={
            <Filter
              setUrl={setAddedParam}
              url={addedParam}
              listings={customers?.data?.data?.listings_available}
              isFractional={customers?.data?.data?.total_fractions_holders}
            />
          }
          handleExpand={handleCollapsed}
          headerSpace="evenly"
          // isManageAgentEmpty="No subscribers yet."
          isManageAgentEmpty="Looks like there are no subscribers yet"
          collapseText={
            <HStack
              display={{ base: "flex", lg: "none" }}
              mb="10px"
              zIndex={10}
              mt="-5"
            >
              <Image
                onClick={() => router.back()}
                style={{ cursor: "pointer" }}
                mr={2}
                boxSize="50px"
                src={backArrow.src}
                alt="back_arrow"
              />
              <Heading fontSize="20px" fontWeight="600">
                Subscribers
              </Heading>
            </HStack>
          }
          border={"1px solid #E4E4E4"}
          minW={`100%`}
        />
      )}
    </AgentsLayoutView>
  );
};

export default index;
