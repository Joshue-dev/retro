import React, { useState } from "react";
import {
  Box,
  Text,
  Image,
  HStack,
  useToast,
  Stack,
  Avatar,
  Spinner,
  Center,
  Popover,
  PopoverContent,
  PopoverArrow,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  Show,
  Hide,
  useDisclosure,
  PopoverAnchor,
} from "@chakra-ui/react";
import notifUnread2 from "/src/images/icons/notifAgentsUnread2.svg";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UpdateAgentStatus, fetchAgentsNotif } from "../../../api/agents";
import styled from "@emotion/styled";
import { generateID } from "utils/generateId";
import { pastContinuous } from "utils/formatDate";
import useLocalStorage from "utils/hooks/useLocalStorage";

const Notification = ({ data }) => {
  return (
    <HStack alignItems="flex-start" position={"relative"} p={`4px`}>
      {!data.status && (
        <Center
          height="10px"
          width="10px"
          borderRadius={"50%"}
          bg="lightgray"
          position={"absolute"}
          top="5px"
          right="5px"
        ></Center>
      )}
      <Avatar src={data?.img} size={{ base: `sm`, md: `md` }} />
      <Stack marginLeft="1rem">
        {/* <Stack> */}
        <Text fontSize="0.875rem" fontWeight="400" lineHeight="normal">
          {data?.message}
        </Text>
        <Text fontSize="0.75rem" fontWeight="400" color="#606060">
          {pastContinuous(data?.created_at)}
        </Text>
      </Stack>
    </HStack>
  );
};

const NotificationContent = () => {
  return;
};

export const LayoutNotifications = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [olderNotifications, setOldNotifications] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const notif_disclosure = useDisclosure();
  const notif_mobile_disclosure = useDisclosure();

  // const {isLoading} = useQuery(['notif'], fetchAgentsNotif, {
  const { isLoading } = useQuery(["notif"], () => fetchAgentsNotif(), {
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      setRecentNotifications(data?.data?.recent);
      setOldNotifications(data?.data?.older);
      setIsRead(data?.data?.status);
    },
    onError: (error) => {
      toast({
        title: "Oops ...",
        description: `${
          error?.response?.data?.message ??
          error?.response?.message ??
          error?.message ??
          "Something went wrong, we could not get notifications"
        }`,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const mutation = useMutation((data) => UpdateAgentStatus(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["notif"]);
    },
    onError: (err) => {
      toast({
        title: "Oops ...",
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.message ??
          "Something went wrong, kindly check your network connection"
        }`,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const handleStatus = () =>
    mutation.mutate({
      status: false,
    });

  const check_notif_status = () => {
    if (!recentNotifications && !olderNotifications) {
      return false;
    }
    const notif = [...recentNotifications, ...olderNotifications];
    const unread_messages = notif.filter((el) => el.status === false);
    // return notif.some(item => item.status === false);
    return {
      hasUnread: notif.some((item) => item.status === false),
      count: unread_messages.length,
    };
  };

  const isNotifAvailable = () =>
    !!recentNotifications.length || !!olderNotifications.length;

  const open_notifs = () => {
    notif_disclosure.onOpen();
  };

  const open_mobile_notifs = () => {
    notif_mobile_disclosure.onOpen();
  };

  return (
    <Box pos={`relative`}>
      <Hide breakpoint="(min-width: 768px)">
        <Center
          position="relative"
          h={{ base: "24px", md: "35px" }}
          w={{ base: "24px", md: "35px" }}
          minH={{ base: "24px", md: "35px" }}
          minW={{ base: "24px", md: "35px" }}
        >
          {check_notif_status().hasUnread ? (
            <Center
              position="absolute"
              top="-3.5px"
              right="-3.5px"
              color="#fff"
              minW="18px"
              h="18px"
              bg="#FE2822"
              padding={".1rem"}
              borderRadius={"16px"}
            >
              <Text fontSize="10px" color="#fff" fontWeight="600">
                {check_notif_status().count > 99
                  ? "99+"
                  : check_notif_status().count}
              </Text>
            </Center>
          ) : null}
          <Image
            cursor="pointer"
            src={notifUnread2.src}
            alt="notification_icon"
            objectFit={`cover`}
            minH={`100%`}
            minW={`100%`}
            onClick={open_mobile_notifs}
          />
        </Center>
        <Drawer
          isOpen={notif_mobile_disclosure.isOpen}
          onClose={notif_mobile_disclosure.onClose}
          size={`sm`}
        >
          <DrawerContent>
            <HStack
              gap={"2rem"}
              justifyContent={`space-between`}
              p="40px 10px 20px"
            >
              <Heading
                fontFamily="Euclid Circular B"
                p="0px"
                fontWeight={`600`}
              >
                Notifications
              </Heading>
              {check_notif_status().hasUnread && (
                <Text
                  fontSize={"12px"}
                  onClick={handleStatus}
                  minWidth={"max-content"}
                >
                  Mark all as read
                </Text>
              )}
            </HStack>
            <DrawerCloseButton />
            <DrawerBody>
              {isLoading ? (
                <HStack justify="center" align="center" width="100%">
                  <Spinner size="sm" colorScheme="black" />
                </HStack>
              ) : !isNotifAvailable() && !isLoading ? (
                <Center width="100%" marginTop="2rem" minHeight="50vh">
                  <Text fontWeight="semibold">
                    You don&apos;t have any notifications
                  </Text>
                </Center>
              ) : (
                <NotifList>
                  {recentNotifications?.map((data) => (
                    <Notification data={data} key={generateID()} />
                  ))}
                  {olderNotifications?.map((data) => (
                    <Notification data={data} key={generateID()} />
                  ))}
                </NotifList>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Hide>

      <Show breakpoint="(min-width: 768px)">
        <Popover
          isOpen={notif_disclosure.isOpen}
          onClose={notif_disclosure.onClose}
        >
          <PopoverAnchor>
            <Center
              position="relative"
              h={{ base: "24px", md: "35px" }}
              w={{ base: "24px", md: "35px" }}
              minH={{ base: "24px", md: "35px" }}
              minW={{ base: "24px", md: "35px" }}
            >
              {check_notif_status().hasUnread ? (
                <Center
                  position="absolute"
                  top="-3.5px"
                  right="-3.5px"
                  color="#fff"
                  minW="18px"
                  h="18px"
                  bg="#FE2822"
                  padding={".1rem"}
                  borderRadius={"16px"}
                >
                  <Text fontSize="10px" color="#fff" fontWeight="600">
                    {check_notif_status().count > 99
                      ? "99+"
                      : check_notif_status().count}
                  </Text>
                </Center>
              ) : null}
              <Image
                cursor="pointer"
                src={notifUnread2.src}
                alt="notification_icon"
                objectFit={`cover`}
                minH={`100%`}
                minW={`100%`}
                onClick={open_notifs}
              />
            </Center>
          </PopoverAnchor>
          <PopoverContent
            mt="10px"
            minH="570px"
            h="fit-content"
            w={{ base: "90%", md: 467 }}
            borderRadius={"lg"}
            borderColor={"#e4e4e4"}
            boxShadow={"xl"}
          >
            <PopoverArrow />

            {/* <Box
            position={'absolute'}
            zIndex={-100}
            top={'-.8rem'}
            right={'15.7rem'}
            width="0"
            height="0"
            borderLeft="70px solid transparent"
            borderRight="70px solid transparent"
            borderBottom="80px solid #FFFFFF"
          /> */}
            <Heading fontFamily="Euclid Circular B">
              <h1>Notifications</h1>
              {check_notif_status().hasUnread && (
                <span onClick={handleStatus}>Mark all as read</span>
              )}
            </Heading>
            {isLoading ? (
              <HStack justify="center" align="center" width="100%">
                <Spinner size="sm" colorScheme="black" />
              </HStack>
            ) : !isNotifAvailable() && !isLoading ? (
              <HStack
                justify="center"
                align="center"
                width="100%"
                marginTop="2rem"
              >
                <Text fontWeight="semibold">
                  You don&apos;t have any notifications
                </Text>
              </HStack>
            ) : (
              <Box px="5px">
                <NotifList>
                  {recentNotifications?.map((data) => (
                    <DropdownMenuItem key={generateID()}>
                      <Notification data={data} />
                    </DropdownMenuItem>
                  ))}
                  {olderNotifications?.map((data) => (
                    <DropdownMenuItem key={generateID()}>
                      <Notification data={data} />
                    </DropdownMenuItem>
                  ))}
                </NotifList>
              </Box>
            )}
          </PopoverContent>
        </Popover>
      </Show>
    </Box>
  );
};

export default LayoutNotifications;

const Heading = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: flex-end;
  padding: 12px 24px 17px;

  h1 {
    font-size: 20px;
    font-size: clamp(18px, calc(8px + 2vw), 20px);
    font-weight: 600;
  }
  span {
    cursor: pointer;
    font-size: 14px;
    font-size: clamp(12px, calc(5px + 1vw), 14px);
    font-weight: 400;
  }
`;

const NotifList = styled.div`
  height: 490px;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownMenuItem = styled(Box)({
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: "black",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  position: "relative",
  userSelect: "none",
  borderRadius: "6px",
  // width: '100%',

  "[data-disabled]": {
    color: "black",
    pointerEvents: "none",
  },
  "[data-highlighted]": {
    backgroundColor: "black",
    color: "black",
  },

  "&:hover": {
    background: "transparent",
  },
});
