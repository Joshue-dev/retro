import { Space } from "./Space";
import React, { useEffect } from "react";
import { ModalCloseButton, useTheme, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Spinner } from "../../ui-lib";
import NotificationList from "./NotificationList";
import { fetchNotifs, fetchSpace } from "../../api/FetchNotif";
import { Flex, DrawerCloseButton, Text, Box } from "@chakra-ui/react";

export const Main = ({
  onNotClose,
  onDrawerOpen,
  setRequestInfo,
  setType,
  isSpace,
  setIsSpace,
  notifications,
}) => {
  const { data: spaceData, isLoading: spaceLoading } = useQuery(
    ["spaces"],
    fetchSpace
  );
  const theme = useTheme();
  const dateOrTimeAgo = (ts, data) => {
    const d = new Date(); // Gets the current time
    const nowTs = Math.floor(d.getTime() / 1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    const seconds = nowTs - Math.floor(new Date(ts).getTime() / 1000);

    // more that two days
    if (seconds >= 2 * 24 * 3600) {
      let datee = "";
      data
        ? (datee = data)
        : (datee = `${new Date(ts).getDate().toString().padStart(2, "0")}/${(
            new Date(ts).getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}/${new Date(ts).getFullYear().toString()}`);
      return datee;
    }
    // a day
    if (seconds > 24 * 3600) {
      return "Yesterday";
    }

    if (seconds >= 3600) {
      const h = seconds / 3600;
      return `${parseInt(h)} hour${parseInt(h) > 1 ? "s" : ""} ago`;
    }

    if (seconds > 60) {
      const m = seconds / 60;
      return `${Math.floor(m)} minute${m > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <Box w="full">
      <Flex
        direction={"row"}
        w="full"
        borderBottom="1px solid"
        borderBottomColor={
          theme.theme_name !== "light"
            ? "matador_border_color.200"
            : "matador_border_color.300"
        }
        justify={"space-between"}
        p="24px"
        display={{ base: "none", md: "flex" }}
        align="center"
      >
        <Text
          fontWeight={600}
          textAlign={"center"}
          fontSize={"16px"}
          color={"text"}
          textTransform={"uppercase"}
          fontFamily={"Open Sans"}
          letterSpacing={"1.44px"}
        >
          Notification Center
        </Text>
        <ModalCloseButton
          position="initial"
          fontSize="12px"
          color={"matador_text.100"}
          _hover={{
            bg: '',
            border: 'none'
          }}
        />
      </Flex>

      <VStack
        spacing={0}
        stretch
        maxH={{ base: "88vh", md: "65rem" }}
        overflowY={"auto"}
      >
        {isSpace ? (
          <>
            {spaceLoading ? (
              <Spinner />
            ) : (
              <Space
                setType={setType}
                setRequestInfo={setRequestInfo}
                dateOrTimeAgo={dateOrTimeAgo}
                spaceData={spaceData}
              />
            )}
          </>
        ) : (
          <>
            {notifications?.isLoading ? (
              <Spinner />
            ) : (
              <NotificationList
                dateOrTimeAgo={dateOrTimeAgo}
                data={notifications?.data}
                notifications={notifications}
              />
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Main;
