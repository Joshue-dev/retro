import {
  Flex,
  Image,
  Text,
  HStack,
  useDisclosure,
  Box,
  Icon,
  Center,
  Button,
  useTheme,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileDrawer from "./mobile_drawer";
import { useQuery } from "react-query";
import { BiMenu } from "react-icons/bi";
import { storeDetails } from "../../api/auth";
import { LIGHT } from "../../constants/names";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { getSettingsData } from "../../api/Settings";
import { appCurrentTheme } from "../../utils/localStorage";
import { useLightenHex } from "utils/lightenColorShade";
import { LuDot } from "react-icons/lu";
import dropdownIcon from "../../images/icons/dropdown_icon.svg";
import notificationIcon from "../../images/icons/notification.svg";
import moment from "moment";
import { fetchNotifs } from "@/api/FetchNotif";
import ProfileMenu from "./profile_menu";
import { Notification } from "../notification_drawer";
import { Wallet } from "../wallet_drawer";
import Feedback from "../feedback/feedback";
import { ReportBug } from "../report_bug";
import { SuggestIdea } from "../suggest_idea";
import isMobile from "../../utils/extras";
import PortfolioAndAssetProfile from "../portfolioAndAssetInfo";
import { useState } from "react";
import ProfileIcon from "../../images/icons/user-profile.svg";
import ProfileIconLight from "../../images/icons/user-profile-light.png";
import { motion } from "framer-motion";
import useGetSession from "utils/hooks/getSession";

export const Navbar = ({ navBarStyle, activePage }) => {
  const { sessionData: LoggedinUser } = useGetSession("loggedIn");
  const settingsQuery = useQuery(
    ["getSettingsData", "profile"],
    () => getSettingsData({ profile: true }),
    {
      enabled: !!LoggedinUser,
    }
  );
  const avatar = settingsQuery?.data?.data?.data?.avatar;
  const STOREINFO = useQuery(["storeInfo"], storeDetails);
  const store_data = STOREINFO.data?.data?.data;

  const TERMS = store_data?.customer_document;
  const PRIVACY_POLICY = store_data?.customer_privacy_policy;
  const notifications = useQuery(["notifs"], fetchNotifs);

  const useLightItems = appCurrentTheme == LIGHT;

  const router = useRouter();
  const {
    isOpen: isNotOpen,
    onOpen: onNotOpen,
    onClose: onNotClose,
  } = useDisclosure();
  const mobileModal = useDisclosure();
  const {
    isOpen: isWalOpen,
    onOpen: onWalOpen,
    onClose: onWalClose,
  } = useDisclosure();
  const {
    isOpen: isAssetOpen,
    onOpen: onAssetOpen,
    onClose: onAssetClose,
  } = useDisclosure();
  const {
    isOpen: isWatchOpen,
    onOpen: onWatchOpen,
    onClose: onWatchClose,
  } = useDisclosure();
  const feedBackModal = useDisclosure();
  const reportBugModal = useDisclosure();
  const suggestModal = useDisclosure();
  const profileModal = useDisclosure();

  const notifBox = () => {
    return (
      <Flex align="center" gap="8px" cursor="pointer" onClick={onNotOpen}>
        <Text fontSize="14px" color="text">
          Notifications
        </Text>
        {notifications?.data?.data?.unread_count > 0 && (
          <Flex
            align={"center"}
            justify={"center"}
            bg={lightenHex(90)}
            boxSize={"24px"}
            p={"9px 10px"}
            rounded={"full"}
          >
            <Text fontSize="12px" color="primary">
              {notifications?.data?.data?.unread_count > 99
                ? "99+"
                : notifications?.data?.data?.unread_count}
            </Text>
          </Flex>
        )}
      </Flex>
    );
  };

  const auth_data = [
    {
      key: "myAssets",
      title: "Portfolio",
      onClick: () => onAssetOpen(),
    },
    // {
    //   key: "wallet",
    //   title: "Wallet",
    //   onClick: () => onWalOpen(),
    // },
    {
      key: "notification",
      component: notifBox,
    },
  ];

  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);

  return (
    <>
      <Flex
        display={{ base: "none", lg: "flex" }}
        color="text"
        mr="auto"
        alignItems={"center"}
        justify={"space-between"}
        w="full"
        bg={theme.theme_name !== "light" ? "background" : "card_bg"}
        px={"100px"}
        py={`25px`}
        zIndex={100}
        {...navBarStyle?.desktop}
        position={"fixed"}
        top={`0px`}
        borderBottom="1px solid"
        borderBottomColor={
          theme.theme_name !== "light"
            ? "matador_border_color.200"
            : "matador_border_color.300"
        }
        mb=".5rem"
      >
        <Link href={LoggedinUser ? "/properties" : "/"}>
          <HStack gap={"20px"}>
            <Box
              maxW="90px"
              h="46px"
              maxH="48px"
              minWidth={`48px`}
              position={`relative`}
            >
              {store_data?.company_image && (
                <Image
                  src={store_data?.company_image}
                  w="100%"
                  height="100%"
                  alt={"Company Image"}
                  objectFit="contain"
                  transition="0.3s ease-in-out"
                />
              )}
            </Box>
          </HStack>
        </Link>
        {LoggedinUser && (
          <>
            <Flex pl="10vw" align={"center"} justify={"center"} gap={`42px`}>
              {auth_data.map((item) =>
                item.component ? (
                  item.component()
                ) : (
                  <Text
                    fontFamily={"Noto Sans"}
                    key={item.key}
                    cursor="pointer"
                    onClick={item.onClick}
                    fontSize="14px"
                    textTransform={"capitalize"}
                    fontWeight={400}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    color={"text"}
                  >
                    {item.title}
                  </Text>
                )
              )}
            </Flex>
            <Flex justify="center" align="center" gap={"20px"}>
              <Flex gap="4px" align="center">
                <Text fontSize="15px">{moment().format("HH:mm")}</Text>
                <LuDot fontSize={32} color="text" />
                <Text whiteSpace="nowrap" fontSize="15px">
                  {moment().format("ddd, MMM DD")}
                </Text>
              </Flex>
              <Button
                borderRadius={"full"}
                bg={
                  theme.theme_name !== "light"
                    ? "listing_card.background"
                    : "background"
                }
                p={3}
                color={"primary"}
                gap={0}
                as={motion.div}
                align={"center"}
                justifyContent={"center"}
                cursor={"pointer"}
                fontWeight={600}
                onClick={profileModal.onOpen}
                h="full"
                _hover={{
                  bg: "",
                }}
                leftIcon={
                  <Stack
                    align="center"
                    justifyContent="center"
                    boxSize="35px"
                    rounded="full"
                    bg="primary"
                    textAlign="center"
                  >
                    <Text
                      textAlign="center"
                      textTransform="capitalize"
                      fontSize="20px"
                      color="#FFF"
                    >
                      {LoggedinUser?.first_name?.charAt(0)}
                    </Text>
                  </Stack>
                }
                rightIcon={
                  <Image
                    src={dropdownIcon.src}
                    alt=""
                    filter={theme.theme_name !== "light" ? "invert(1)" : ""}
                  />
                }
                border="1px solid"
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.300"
                }
              />
            </Flex>
            <Notification
              onDrawerOpen={mobileModal.onOpen}
              isNotOpen={isNotOpen}
              onNotClose={onNotClose}
              notifications={notifications}
            />
            <Wallet
              onDrawerOpen={mobileModal.onOpen}
              avatar={avatar}
              isWalOpen={isWalOpen}
              onWalClose={onWalClose}
            />
            <Feedback
              onDrawerOpen={mobileModal.onOpen}
              feedModal={feedBackModal}
            />
            <ReportBug
              onDrawerOpen={mobileModal.onOpen}
              reportBugModal={reportBugModal}
            />
            <SuggestIdea
              onDrawerOpen={mobileModal.onOpen}
              suggestModal={suggestModal}
            />
            <PortfolioAndAssetProfile
              isOpen={isAssetOpen}
              onClose={onAssetClose}
              onNotOpen={onNotOpen}
              onDrawerOpen={mobileModal.onOpen}
            />
            <ProfileMenu
              TERMS={TERMS}
              PRIVACY_POLICY={PRIVACY_POLICY}
              avatar={avatar}
              profileModal={profileModal}
            />
          </>
        )}
      </Flex>
      <Box
        display={{ base: "flex", lg: "none" }}
        {...navBarStyle?.mobile}
        mt={`0px !important`}
        position={"fixed"}
        top={`0px`}
        zIndex={100}
        w={`100%`}
      >
        <Flex
          px={"20px"}
          zIndex={100}
          w="full"
          bg={"card_bg"}
          justify={"space-between"}
          align={"center"}
          // h='48px'
          py="12px"
        >
          <Flex align={"center"} gap="20px">
            {router.pathname === "/properties" ||
            router.pathname === "/settings" ? (
              <Link href={LoggedinUser ? "/properties" : "/"}>
                <Box
                  maxW="90px"
                  h="46px"
                  maxH="48px"
                  minWidth={`48px`}
                  position={`relative`}
                >
                  {store_data?.company_image && (
                    <Image
                      src={store_data?.company_image}
                      w="100%"
                      height="100%"
                      alt={"Company Image"}
                      objectFit="contain"
                      transition="0.3s ease-in-out"
                    />
                  )}
                </Box>
              </Link>
            ) : (
              <Box cursor={"pointer"} onClick={() => router.back()}>
                <ChevronLeftIcon fontSize={"38px"} color={"text"} />
              </Box>
            )}
            <Text color="text" fontSize={"20px"} fontWeight={500}>
              {activePage}
            </Text>
          </Flex>

          <HStack gap="24px">
            <Image
              src={notificationIcon.src}
              alt=""
              boxSize="25px"
              filter={theme.theme_name !== "light" ? "invert(1)" : ""}
              onClick={onNotOpen}
            />
            <Icon
              as={BiMenu}
              color="text"
              onClick={mobileModal.onOpen}
              fontSize={"30px"}
            />
          </HStack>
        </Flex>
        {isMobile && (
          <>
            <Notification
              onDrawerOpen={mobileModal.onOpen}
              isNotOpen={isNotOpen}
              onNotClose={onNotClose}
              onNotOpen={onNotOpen}
              notifications={notifications}
            />
          </>
        )}
        <MobileDrawer
          TERMS={TERMS}
          PRIVACY_POLICY={PRIVACY_POLICY}
          feedBackModal={feedBackModal}
          reportBugModal={reportBugModal}
          suggestModal={suggestModal}
          onNotOpen={onNotOpen}
          onAssetOpen={onAssetOpen}
          onWatchOpen={onWatchOpen}
          onWalOpen={onWalOpen}
          avatar={avatar}
          isDrawerOpen={mobileModal.isOpen}
          onDrawerClose={mobileModal.onClose}
        />
      </Box>
    </>
  );
};

export default Navbar;
