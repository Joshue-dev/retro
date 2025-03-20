import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Center,
  Image,
  Text,
  Badge,
  Progress,
  Show,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

import settingsIcon from "/src/images/icons/agentsSettingsIcon.svg";
import feedbackIcon from "/src/images/icons/feedback.svg";
import suggestIcon from "/src/images/icons/suggest.svg";
import reportBugIcon from "/src/images/icons/reportBug.svg";
import termsIcon from "/src/images/icons/terms.svg";
import logoutIcon from "/src/images/icons/logout.svg";
import menuIcon from "/src/images/icons/menuIcon.svg";
import { themeStyles } from "../../../theme";
import { ShareAgentLink } from "../ShareAgentLink";
import LayoutNotifications from "./Notification";
import RequestCommission from "../requestCommission/RequestCommission";
import { useQuery } from "react-query";
import { fetchAgentSettingsInfo } from "api/agents";
import Wallet from "./Wallet";
import MobileNavigation from "./MobileNavigation";
import { SuggestAnIdeaDrawer } from "./drawers/SuggestIdeaDrawer";
import { FeedbackDrawer } from "./drawers/FeedbackDrawer";
import { ReportABugDrawer } from "./drawers/ReportABugDrawer";
import { fetchTermsAndConditionsPDF } from "api/agents";
import useLocalStorage from "utils/hooks/useLocalStorage";
import useGetSession from "utils/hooks/getSession";
import { deleteCookies } from "utils/sessionmanagers";
import { store_name } from "constants/routes";

const VeergeLogo = ({ mobile = false }) => {
  return mobile ? (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.6501 12.4997L24.6495 0.5V12.4997H12.6501Z" fill="white" />
      <path d="M0.649658 0.5L12.6501 12.4997H0.649658V0.5Z" fill="white" />
      <path d="M12.6501 12.4997L0.649658 0.5H12.6501V12.4997Z" fill="white" />
      <path d="M12.6501 24.5008V12.5H24.6495L12.6501 24.5008Z" fill="white" />
    </svg>
  ) : (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.001 19.9995L40 0V19.9995H20.001Z" fill="white" />
      <path d="M0 0L20.0008 19.9995H0V0Z" fill="white" />
      <path d="M20.0008 19.9995L0 0H20.0008V19.9995Z" fill="white" />
      <path d="M20.001 39.9999V19.9985H40L20.001 39.9999Z" fill="white" />
    </svg>
  );
};

export function AgentsLayoutNavbar({ activePage, company_image }) {
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const MOBILE_NAVIGATION_DRAWER = useDisclosure();

  const { sessionData: user } = useGetSession("a_details");

  const companyName = store_name();

  const SETTINGS_INFO = useQuery(
    ["agents_settings_data"],

    () => fetchAgentSettingsInfo()
  );

  const userDetails = SETTINGS_INFO?.data?.data?.message?.user;

  const TERMS_PDF = useQuery(["terms_conditions_pdf"], () =>
    fetchTermsAndConditionsPDF()
  );
  const open_terms = () => {
    window.open(TERMS_PDF?.data?.data?.message?.document);
  };

  const handleLogout = () => {
    setShowProgress(true);

    deleteCookies(["a_token", "a_details"]);

    router.push("/agents");
  };

  const handleSettings = () => {
    router.push("/agents/settings");
  };

  return (
    <>
      <Stack position="fixed" zIndex={1400} w="100%">
        <Box bg={"#191919"} px={{ base: "20px", lg: "78px" }} py="11px">
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <HStack spacing="8px" alignItems={"center"}>
              <Center
                w={"40px"}
                h={"40px"}
                minW={"40px"}
                minH={"40px"}
                position={"relative"}
                overflow={"hidden"}
                display={{ base: "none", lg: "flex" }}
              >
                <VeergeLogo />
              </Center>
              <Center
                w={"24px"}
                h={"24px"}
                minW={"24px"}
                minH={"24px"}
                position={"relative"}
                overflow={"hidden"}
                display={{ base: "flex", lg: "none" }}
              >
                <VeergeLogo mobile />
              </Center>
              <Text
                cursor={"pointer"}
                lineHeight={"30px"}
                fontFamily={"Syne"}
                fontSize={{ base: "16px", lg: "30px" }}
                fontWeight={"500"}
                textAlign={"left"}
                color="#FFFFFF"
                textTransform={"capitalize"}
              >
                {companyName || "store"}
              </Text>
            </HStack>
            <Flex align="center">
              {user?.initial_status == "Pending" && (
                <Badge
                  borderRadius="md"
                  variant="outline"
                  mr={4}
                  px={3}
                  py={2}
                  colorScheme="yellow"
                >
                  ACCOUNT PENDING
                </Badge>
              )}
              <HStack
                spacing="15px"
                alignItems={"center"}
                mr="20px"
                display={{ base: "none", md: "none", lg: "flex" }}
              >
                <ShareAgentLink />
                <RequestCommission />
              </HStack>
              <HStack gap="20px" align="center" ml="76px" mr={{ lg: "53px" }}>
                <Show above="lg">
                  <Wallet />
                </Show>
                <LayoutNotifications />
                <Image
                  alt="settings Icon"
                  onClick={handleSettings}
                  cursor="pointer"
                  src={settingsIcon.src}
                  display={{ base: "none", md: "none", lg: "flex" }}
                />
                <Center>
                  <IconButton
                    size={"md"}
                    bg="transparent"
                    _focus={{ bg: "transparent" }}
                    icon={
                      <HamburgerIcon
                        color={"#fff"}
                        height="23px"
                        width={"23px"}
                      />
                    }
                    aria-label={"Open Menu"}
                    display={{ lg: "none" }}
                    _hover={{ bg: "transparent", color: "#fff" }}
                    onClick={
                      MOBILE_NAVIGATION_DRAWER.isOpen
                        ? MOBILE_NAVIGATION_DRAWER.onClose
                        : MOBILE_NAVIGATION_DRAWER.onOpen
                    }
                  />
                </Center>
              </HStack>
              <Flex
                alignItems={"center"}
                display={{ base: "none", md: "none", lg: "flex" }}
              >
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        alignItems="center"
                        h="48px"
                        w="178px"
                        color="white"
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        textTransform={"capitalize"}
                        rightIcon={
                          <img
                            src={menuIcon.src}
                            style={
                              !isOpen
                                ? {
                                    transform: "rotate(180deg)",
                                    transition: ".3s",
                                  }
                                : { transition: ".3s" }
                            }
                          />
                        }
                        _active={{ color: "white" }}
                      >
                        <Center gap={"14px"}>
                          <Image
                            alt=""
                            h="34px"
                            w="34px"
                            objectFit="cover"
                            borderRadius="full"
                            src={userDetails?.avatar}
                            // src={ SETTINGS_INFO?.data?.data?.message?.user?.avatar}
                          />
                          <Text color="#fff">
                            {" "}
                            {user?.first_name} {user?.last_name?.slice(0, 1)}
                          </Text>
                        </Center>
                      </MenuButton>
                      <MenuList alignItems={"center"}>
                        <MenuItem>
                          <FeedbackDrawer>
                            <HStack
                              w="full"
                              fontWeight={400}
                              justify="space-between"
                            >
                              <Flex gap={3} align="center">
                                <img src={feedbackIcon.src} />
                                <Text color="#606060" fontSize="14px">
                                  Feedback
                                </Text>
                              </Flex>
                              <ChevronRightIcon />
                            </HStack>
                          </FeedbackDrawer>
                        </MenuItem>
                        <MenuItem>
                          <SuggestAnIdeaDrawer>
                            <HStack
                              w="full"
                              fontWeight={400}
                              justify="space-between"
                            >
                              <Flex gap={3} align="center">
                                <img src={suggestIcon.src} />
                                <Text color="#606060" fontSize="14px">
                                  Suggest an idea
                                </Text>
                              </Flex>
                              <ChevronRightIcon />
                            </HStack>
                          </SuggestAnIdeaDrawer>
                        </MenuItem>
                        <MenuItem>
                          <ReportABugDrawer>
                            <HStack
                              w="full"
                              fontWeight={400}
                              justify="space-between"
                            >
                              <Flex gap={3} align="center">
                                <img src={reportBugIcon.src} />
                                <Text color="#606060" fontSize="14px">
                                  Report a bug
                                </Text>
                              </Flex>
                              <ChevronRightIcon />
                            </HStack>
                          </ReportABugDrawer>
                        </MenuItem>
                        {/* <MenuItem>
                          <a
                            href="https://veerge-support.myxellia.io"
                            target="_blank"
                            rel="noreferrer noopener"
                            style={{width: '100%'}}
                          >
                            <HStack w="full" fontWeight={400} justify="space-between">
                              <Flex gap={3} align="center">
                                <img src={helpCenterIcon.src} />
                                <Text color="#606060" fontSize="14px">
                                  Help center
                                </Text>
                              </Flex>
                              <ChevronRightIcon />
                            </HStack>
                          </a>
                        </MenuItem> */}
                        <MenuItem onClick={open_terms}>
                          <HStack
                            w="full"
                            fontWeight={400}
                            justify="space-between"
                          >
                            <Flex gap={3} align="center">
                              <img src={termsIcon.src} />
                              <Text color="#606060" fontSize="14px">
                                Terms of Use
                              </Text>
                            </Flex>
                            <ChevronRightIcon />
                          </HStack>
                        </MenuItem>
                        <MenuItem>
                          <HStack
                            w="full"
                            fontWeight={400}
                            justify="space-between"
                          >
                            <Flex gap={3} align="center">
                              <img src={termsIcon.src} />
                              <Text color="#606060" fontSize="14px">
                                Privacy Policy
                              </Text>
                            </Flex>
                            <ChevronRightIcon />
                          </HStack>
                        </MenuItem>

                        <MenuItem onClick={handleLogout}>
                          <HStack
                            w="full"
                            fontWeight={400}
                            justify="space-between"
                          >
                            <Flex gap={3} align="center">
                              <img src={logoutIcon.src} />
                              <Text color="#606060" fontSize="14px">
                                Logout
                              </Text>
                            </Flex>
                            <ChevronRightIcon />
                          </HStack>
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Flex>
            </Flex>
          </Flex>
          {showProgress && (
            <Progress
              w="full"
              size="xs"
              color={themeStyles.color.primary}
              borderColor={themeStyles.color.primary}
              top="9.27rem"
              position="fixed"
              isIndeterminate
            />
          )}
        </Box>
      </Stack>
      <MobileNavigation
        mobileNavigationDrawer={MOBILE_NAVIGATION_DRAWER}
        activePage={activePage}
      />
    </>
  );
}

const links = ["Listings", "Users", "Account", "Request"];
