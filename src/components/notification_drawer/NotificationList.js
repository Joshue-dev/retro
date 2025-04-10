import {
  Box,
  Center,
  Flex,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useTheme,
} from "@chakra-ui/react";
import ErrorState from "../appState/error-state";
import EmptyState from "../appState/empty-state";
import { NOTIFICATION } from "constants/icon_images";
import { customScrollbarStyles } from "../portfolioAndAssetInfo/screens/assetInfoScreens/makeADepositToAnAsset";
import { UpdateSingleNotif } from "@/api/FetchNotif";
import { useMutation } from "react-query";

export const NotificationList = ({ notifications }) => {
  const theme = useTheme();
  const updateNotifStatus = useMutation(
    (formData) => UpdateSingleNotif(formData),
    {
      onSuccess: async (res) => {
        await notifications.refetch();
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const handleUpdateNotifStatus = (notif) => {
    updateNotifStatus.mutate(notif?.id);
  };

  return (
    <>
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
            bg: "",
            border: "none",
          }}
        />
      </Flex>
      <ModalBody px={0} overflowY="auto" sx={customScrollbarStyles()}>
        {notifications?.isLoading ? (
          <Spinner />
        ) : notifications?.isError ? (
          <ErrorState error={notifications?.error} />
        ) : notifications?.data?.data?.data?.length > 0 ? (
          <Stack
            spacing="14px"
            w="full"
            divider={
              <StackDivider
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.500"
                }
              />
            }
          >
            {notifications?.data?.data?.data?.map((notif, idx) => {
              return (
                <Flex
                  cursor="pointer"
                  w="100%"
                  px="15px"
                  py="10px"
                  key={notif.title}
                  onClick={() => handleUpdateNotifStatus(notif)}
                >
                  <Flex gap="20px">
                    <Center w="29px" h="29px" borderRadius={"full"}>
                      {NOTIFICATION[
                        notif.topic.toLowerCase().replace(" ", "_")
                      ] || NOTIFICATION.wallet_transaction}
                    </Center>
                    <Box w="100%" pr={"26px"} color={"text"}>
                      <Flex
                        fontFamily="Noto Sans"
                        align="center"
                        color={"text"}
                        gap={"10px"}
                      >
                        <Text
                          fontSize="16px"
                          fontWeight={600}
                          as="h2"
                          noOfLines={1}
                        >
                          {notif.topic}
                        </Text>
                        <Text
                          fontSize={"11px"}
                          borderColor={
                            theme.theme_name !== "light"
                              ? "text"
                              : "matador_border_color.200"
                          }
                          lineHeight="16px"
                          noOfLines={1}
                        >
                          {dateOrTimeAgo(notif.time_ago)}
                        </Text>
                      </Flex>
                      <Flex justify="space-between" align="flex-end" mb="10px">
                        <Text
                          fontSize={"14px"}
                          color="text_two"
                          fontWeight={400}
                        >
                          {notif.message}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                  {notif?.status && (
                    <Box w="max-content">
                      <Flex boxSize="7.5px" bg="primary" rounded="full" />
                    </Box>
                  )}
                </Flex>
              );
            })}
          </Stack>
        ) : (
          <EmptyState
            text="No notifications yet"
            textSize={14}
            headerStyle={{
              fontSize: "16px",
              letterSpacing: { base: "0.96px", md: "normal" },
              textTransform: { base: "uppercase", md: "none" },
            }}
            height={{ base: "200px", md: "300px" }}
            icon
          />
        )}
      </ModalBody>
    </>
  );
};

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
