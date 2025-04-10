import {
  Flex,
  Image,
  Text,
  HStack,
  useDisclosure,
  Box,
  Icon,
  Button,
  useTheme,
  Stack,
  Progress,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileDrawer from "./mobile_drawer";
import { useQuery } from "react-query";
import { BiMenu } from "react-icons/bi";
import { storeDetails } from "../../api/auth";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { getSettingsData } from "../../api/Settings";
import { useLightenHex } from "utils/lightenColorShade";
import { LuDot } from "react-icons/lu";
import dropdownIcon from "../../images/icons/dropdown_icon.svg";
import notificationIcon from "../../images/icons/notification.svg";
import moment from "moment";
import { fetchNotifs } from "@/api/FetchNotif";
import ProfileMenu from "./profile_menu";
import { Wallet } from "../wallet_drawer";
import isMobile from "../../utils/extras";
import PortfolioAndAssetProfile from "../portfolioAndAssetInfo";
import { motion } from "framer-motion";
import useGetSession from "utils/hooks/getSession";
import { fetchProjectsWithFilters } from "@/api/listing";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { useEffect, useMemo, useState } from "react";
import Notification from "../notification_drawer";

export const Navbar = ({ navBarStyle, activePage }) => {
  const { sessionData: LoggedinUser } = useGetSession("loggedIn");
  const [showProgress, setShowProgress] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 991px)')
  const [time, setTime] = useState("");
  const settingsQuery = useQuery(
    ["getSettingsData", "profile"],
    () => getSettingsData({ profile: true }),
    {
      enabled: !!LoggedinUser,
    }
  );
  const avatar = settingsQuery?.data?.data?.data?.avatar;
  const [storeThemeInfo] = useLocalStorage("storeThemeInfo");
  const isGatewayEnabled =
    storeThemeInfo?.isGatewayEnabled && storeThemeInfo?.isWalletEnabled;
  const STOREINFO = useQuery(["storeInfo"], storeDetails);
  const store_data = STOREINFO.data?.data?.data;

  const TERMS = store_data?.customer_document;
  const PRIVACY_POLICY = store_data?.customer_privacy_policy;
  const notifications = useQuery(["notifs"], fetchNotifs);

  const projects = useQuery(
    ["projects", "&page=1&limit=4"],
    () => fetchProjectsWithFilters("&page=1&limit=4"),
    {
      enabled: !!LoggedinUser, // Only run the query if LoggedinUser is available
      staleTime: Infinity, // Keep the data fresh indefinitely
    }
  );

  const singleListing = projects?.data?.project?.[0];
  const hasSingleListing = projects?.data?.count === 1;

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
  const { onOpen: onWatchOpen } = useDisclosure();
  const profileModal = useDisclosure();
  const propertiesPage = hasSingleListing
    ? `/listing-details/${singleListing?.id}`
    : "/properties";
  const openOnLaunch = router.pathname === propertiesPage;

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
    ...(isGatewayEnabled
      ? [
          {
            key: "wallet",
            title: "Wallet",
            onClick: () => onWalOpen(),
          },
        ]
      : []),
    {
      key: "notification",
      component: notifBox,
    },
  ];

  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("HH:mm"));
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return; // ✅ only run in browser
  
    if (window.innerWidth > 991 && router.pathname === propertiesPage) {
      onAssetOpen();
    }
  }, []);  

  const mainLink = useMemo(() => {
    if (!LoggedinUser) {
      return "/";
    }
    if (hasSingleListing) {
      return `/listing-details/${singleListing?.id}`;
    }
    return "/properties";
  }, [LoggedinUser, hasSingleListing, projects?.isLoading]);

  useEffect(() => {
    router?.events?.on("routeChangeStart", (url) => {
      setShowProgress(true);
    });
    router?.events?.on("routeChangeComplete", (url) => {
      setShowProgress(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        display={{ base: "none", lg: "block" }}
        color="text"
        mr="auto"
        alignItems={"center"}
        justify={"space-between"}
        w="full"
        zIndex={100}
        {...navBarStyle?.desktop}
        position={"fixed"}
        top={`0px`}
        mb=".5rem"
      >
        <Flex
          justify="space-between"
          align="center"
          w="full"
          pos="relative"
          borderBottom="1px solid"
          borderBottomColor={
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.300"
          }
          bg={theme.theme_name !== "light" ? "background" : "card_bg"}
          px={"100px"}
          py={`25px`}
        >
          <HStack
            gap={"20px"}
            onClick={projects?.isLoading ? null : () => router.push(mainLink)}
            cursor="pointer"
          >
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
                  <Text fontSize="15px">{time}</Text>
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
                        color="#FFF"
                        textTransform="uppercase"
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
            </>
          )}
          {showProgress && (
            <Progress
              w="full"
              variant={`main_store`}
              size="xs"
              left={"0"}
              top={`0px`}
              position="fixed"
              isIndeterminate
              zIndex={"10"}
              bg={`transparent`}
            />
          )}
        </Flex>
      </Box>
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
          py="12px"
          pos="relative"
        >
          <Flex align={"center"} gap="20px">
            {router.pathname === "/properties" ||
            router.pathname === "/settings" ? (
              <Link href={mainLink}>
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
          {showProgress && (
            <Progress
              w="full"
              variant={`main_store`}
              size="xs"
              left={"0"}
              top={`0px`}
              position="fixed"
              isIndeterminate
              zIndex={"10"}
              bg={`transparent`}
            />
          )}
        </Flex>
        <MobileDrawer
          TERMS={TERMS}
          PRIVACY_POLICY={PRIVACY_POLICY}
          onNotOpen={onNotOpen}
          onAssetOpen={onAssetOpen}
          onWatchOpen={onWatchOpen}
          onWalOpen={onWalOpen}
          avatar={avatar}
          isDrawerOpen={mobileModal.isOpen}
          onDrawerClose={mobileModal.onClose}
        />
      </Box>
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
  );
};

export default Navbar;
