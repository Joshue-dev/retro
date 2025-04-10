import React, { useState } from "react";
import {
  Center,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Image,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { mobile_top_menu } from "constants/dummy/layout";
import { themeStyles } from "../../../theme";
import { MobileNavTab } from "./MobileNavTab";
import { useQuery } from "react-query";
import { fetchTermsAndConditionsPDF } from "api/agents";
import { mobile_sub_menus } from "constants/dummy/layout";
import mobile_logout_icon from "/src/images/icons/mobile_nav/mobile_logout_icon.svg";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { deleteCookies } from "utils/sessionmanagers";
import useGetSession from "utils/hooks/getSession";

export default function MobileNavigation({
  mobileNavigationDrawer,
  activePage,
}) {
  const [showProgress, setShowProgress] = useState(false);
  const router = useRouter();

  const TERMS_PDF = useQuery(["terms_conditions_pdf"], () =>
    fetchTermsAndConditionsPDF()
  );

  const handleNav = (linkText) => {
    if (linkText === "Terms") {
      return window.open(TERMS_PDF?.data?.data?.message?.document);
    }
    const link = linkText.toLowerCase();
    // setTabIndex(dashboardNavs.indexOf(link));
    return router.push(`/agents/${link === "referrals" ? "users" : link}`);
  };
  const handleExternalNav = (linkText) => {
    const link = linkText.toLowerCase();
    switch (link) {
      case "help": {
        return window.open("https://veerge-support.myxellia.io");
      }
      case "terms": {
        return window.open("https://veerge-support.myxellia.io/terms");
      }
      case "suggest": {
        return window.open("https://www.myxellia.io/suggest_idea");
      }
      case "feedback": {
        return window.open("https://www.myxellia.io/feedback");
      }
      case "report-bug": {
        return window.open("");
      }
      default: {
        return router.push(`/agents/${link}`);
      }
    }
  };

  const { sessionData: user } = useGetSession("a_details");

  const handleLogout = () => {
    setShowProgress(true);

    deleteCookies(["a_token", "a_details"]);

    router.push("/agents");
  };

  return (
    <Drawer
      size="sm"
      placement={"right"}
      onClose={mobileNavigationDrawer.onClose}
      isOpen={mobileNavigationDrawer.isOpen}
      // style={{position: 'fixed', height: '100vh', zIndex: 10500, top: 0, left: 0}}
    >
      <DrawerOverlay bg="rgba(52, 64, 84, 0.7)" />
      <DrawerContent maxW={`280px`}>
        <DrawerCloseButton />
        <HStack justifyContent="space-between" mt="48px">
          <HStack gap="12px" alignItems="center" p="16px 20px">
            <Center
              h="40px"
              w="40px"
              minH="40px"
              minW="40px"
              bg="#f5f5f5"
              borderRadius={"50%"}
              overflow="hidden"
              position="relative"
            >
              <Image alt="" objectFit="cover" src={user?.avatar} />
            </Center>
            <VStack alignItems={"flex-start"}>
              <Text
                textTransform="capitalize"
                color="#344054"
                fontSize="14px"
                fontWeight="600"
                lineHeight="20px"
              >
                {user?.first_name} {user?.last_name}
              </Text>
              <Text
                color="#475467"
                fontSize="14px"
                fontWeight="600"
                lineHeight="20px"
              >
                {user?.email}
              </Text>
            </VStack>
          </HStack>
        </HStack>

        <VStack
          overflowY={"auto"}
          p={`16px`}
          alignItems={`stretch`}
          gap={`24px`}
        >
          <VStack width="100%" gap={`4px`} alignItems={"flex-start"}>
            {mobile_top_menu.map((link, index) =>
              link.component ? (
                link.component
              ) : (
                <MobileNavTab
                  key={index}
                  link={link}
                  handleClick={() => handleNav(link.linkText)}
                />
              )
            )}
            <Divider my={`7px`} border={`1px solid #EAECF0`} />
            {mobile_sub_menus.map((link, index) => {
              const isActive =
                activePage.toLowerCase() === link?.linkText.toLocaleLowerCase();
              if (link.component) {
                return link.component;
              } else {
                return (
                  <MobileNavTab
                    sub_menu
                    key={index}
                    link={link}
                    handleClick={() => handleNav(link.linkText)}
                  />
                );
              }
            })}
            <MobileNavTab
              color="#FF6A6A"
              link={{
                iconSrc: mobile_logout_icon,
                linkText: "Logout",
                name: "Logout",
              }}
              handleClick={handleLogout}
            />
          </VStack>
        </VStack>
      </DrawerContent>
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
    </Drawer>
  );
}
