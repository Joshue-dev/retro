import React, { useMemo } from "react";
import AgentsLayoutView from "../../../page.components/agents_components/AgentLayout/View";
import AccountTransactionHeader from "../../../page.components/agents_components/account/AccountTransactionHeader";
import MatadorCustomTable from "../../../page.components/agents_components/Table/Table";
import downloadIcon from "/src/images/icons/download-icon.svg";
import { CSVLink } from "react-csv";
import csv_down_arrow_icon from "/src/images/icons/downloadcsvdownarrow.svg";
import { ACCOUNT_TRANSACTIONS_COLUMN } from "../../../constants/agents_account";
import { Button, Center, Image, Text, useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { accountTransactions } from "api/agents";
import { priceString } from "utils/formatAmount";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";

const Account_transactions = () => {
  const columns = useMemo(() => ACCOUNT_TRANSACTIONS_COLUMN, []);
  const toast = useToast();

  const { data, isLoading, isError } = useQuery(
    "account-transactions",
    () => accountTransactions(),
    {
      onError: (error) => {
        toast({
          title: "Oops ...",
          description: `${
            error?.response?.status === 500
              ? "Apologies for the inconvenience. We're working on it. Please try again later."
              : error?.response?.data?.message ??
                error?.response?.message ??
                error?.message ??
                "Something went wrong,we are working on resolving it"
          }`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  const transactions = data?.data;

  const getDataFromJSON = (data) => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          Date: data[i]?.date,
          Description: data[i]?.description,
          Reference: data[i]?.reference,
          Debit: priceString("naira", data[i]?.debit),
          Deposit: priceString("naira", data[i]?.deposit),
          Balance: priceString("naira", data[i]?.balance),
        });
    }
    return result;
  };
  if (isError) {
    return (
      <AgentsLayoutView activePage={"account"}>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }
  return (
    <AgentsLayoutView activePage="account">
      <AccountTransactionHeader details={transactions} />

      {isLoading ? (
        <Center h="50vh" w="100%">
          <OvalLoader />
        </Center>
      ) : (
        <MatadorCustomTable
          dontExpand
          downloadcsv={
            <CSVLink
              filename="trnasactions"
              data={getDataFromJSON(transactions?.data)}
            >
              <Button
                display="flex"
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
                bg="#ffffff"
              >
                <Image w="18px" h="18px" src={downloadIcon.src} alt="icon" />
                Download Report
                <Image
                  w="18px"
                  h="18px"
                  src={csv_down_arrow_icon.src}
                  alt="icon"
                />
              </Button>
            </CSVLink>
          }
          isRefetching={isLoading}
          DATA={transactions?.data}
          // isCollapsed={isCollapsed}
          noTopPaginate
          COLUMNS={columns}
          // handleExpand={handleCollapsed}
          headerSpace="evenly"
          isManageAgentEmpty="Oops! no data yet....."
        />
      )}
    </AgentsLayoutView>
  );
};

export default Account_transactions;
