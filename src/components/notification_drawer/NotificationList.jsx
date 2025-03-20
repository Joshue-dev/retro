import React from "react";
import { Flex, Image, Text, useTheme } from "@chakra-ui/react";
import { Center, Box } from "@chakra-ui/react";
import EmptyState from "../appState/empty-state";
import { NOTIFICATION } from "../../constants/icon_images";
import { useMutation } from "react-query";
import { UpdateSingleNotif } from "@/api/FetchNotif";

export const NotificationList = ({ notifications, data, dateOrTimeAgo }) => {
  const theme = useTheme();
  const updateNotifStatus = useMutation(formData => UpdateSingleNotif(formData), {
    onSuccess: async res => {
      await notifications.refetch();
    },
    onError: err => {
      console.error(err);
    },
  });

  const handleUpdateNotifStatus = (notif) => {
    updateNotifStatus.mutate(notif?.id)
  }

  return (
    <>
      {data?.data?.data?.length ? (
        <>
          {data?.data?.data?.map((notif, idx) => {
            return (
              <Flex
                cursor="pointer"
                w="100%"
                px="15px"
                py="10px"
                
                key={notif.title}
                borderTop={
                  idx < 1 || idx === data?.data?.data?.length - 1
                    ? "none"
                    : "0.8px solid"
                }
                borderBottom={
                  idx === data?.data?.data?.length - 1 ? "none" : "0.8px solid"
                }
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.500"
                }
                onClick={() => handleUpdateNotifStatus(notif)}
              >
                <Flex gap="20px">
                  <Center w="29px" h="29px" borderRadius={"full"}>
                    {NOTIFICATION[notif.topic.toLowerCase().replace(" ", "_")] ||
                      NOTIFICATION.wallet_transaction}
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
                      <Text fontSize={"14px"} color="text_two" fontWeight={400}>
                        {notif.message}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
                {notif?.status && <Box w='max-content'><Flex boxSize='7.5px' bg='primary' rounded='full' /></Box>}
              </Flex>
            );
          })}
        </>
      ) : (
        <EmptyState
          icon
          fontFamily="Euclid Circular B"
          text="No notification yet"
          textSize={16}
          headerStyle={{ fontSize: 18, fontWeight: 700 }}
        />
      )}
    </>
  );
};

export default NotificationList;