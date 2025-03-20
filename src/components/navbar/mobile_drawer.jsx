import React from "react";
import { Center, Flex, Icon, Image, Text } from "@chakra-ui/react";
import {
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Divider,
} from "@chakra-ui/react";
import logoMobile from "../../images/mobile-logo-white.png";
import { Button } from "../../ui-lib";
import { RxCross1 } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { FaFileLines } from "react-icons/fa6";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { useRouter } from "next/router";
import ProfileIcon from "../../images/icons/user-profile.svg";

import feedbackIcon from "../../images/navar/feedback.svg";
import suggestIcon from "../../images/navar/suggest.svg";
import reportBugIcon from "../../images/navar/reportBug.svg";
import termsIcon from "../../images/navar/terms.svg";
import logoutIcon from "../../images/navar/logout.svg";
import settingIcon from "../../images/navar/settings.svg";

import { BiMessageAltAdd, BiSolidMessageDetail } from "react-icons/bi";
import useGetSession from "utils/hooks/getSession";
import { deleteCookies } from "utils/sessionmanagers";

export const MobileDrawerComp = ({
  feedBackModal,
  reportBugModal,
  suggestModal,
  onNotOpen,
  onAssetOpen,
  onWatchOpen,
  onWalOpen,
  isDrawerOpen,
  onDrawerClose,
  avatar,
  TERMS,
  PRIVACY_POLICY,
}) => {
  const router = useRouter();
  const { sessionData: LoggedinUser } = useGetSession("loggedIn");

  const auth_data = [
    {
      key: "myAssets",
      title: "Portfolio",
      onClick: () => {
        onDrawerClose();
        onAssetOpen();
      },
    },
    // {
    //   key: "wallet",
    //   title: "Wallet",
    //   onClick: () => {
    //     onDrawerClose();
    //     onWalOpen();
    //   },
    // },
  ];

  const dropdown_data = [
    {
      key: "settings",
      title: "Settings",
      icon: <IoMdSettings />,
      image: settingIcon,
      onClick: () => {
        onDrawerClose();
        router.push("/settings");
      },
    },
    {
      key: "terms",
      title: "Terms & Services",
      onClick: () => window.open(`${TERMS ? TERMS : ""}`, "_blank"),
    },
    {
      key: "privacy",
      title: "Privacy Policy",
      onClick: () =>
        window.open(`${PRIVACY_POLICY ? PRIVACY_POLICY : ""}`, "_blank"),
    },
  ];

  const handleLogout = () => {
    deleteCookies(["token", "loggedIn"]);
    window.location = '/'
  };

  return (
    <Drawer
      placement="right"
      isCentered={false}
      scrollBehavior="inside"
      isOpen={isDrawerOpen}
      onClose={onDrawerClose}
    >
      <DrawerOverlay />
      <DrawerContent
        top="56px !important"
        right="12px !important"
        maxH="max-content"
        bg="card_bg"
        maxW="250px"
      >
        {LoggedinUser ? (
          <>
            <VStack gap={0} align={"flex-start"} w="full">
              {auth_data.map((data) => (
                <Flex
                  align={"center"}
                  gap="0 !important"
                  key={data.key}
                  borderBottom="5px solid"
                  borderColor="background"
                  p="16px"
                  w="full"
                  cursor="pointer"
                  onClick={data.onClick}
                >
                  {/* <Image w='18px' h='18px' src={data.image?.src} /> */}
                  <Text
                    key={data.key}
                    color="text"
                    fontSize={"16px"}
                    fontWeight={400}
                  >
                    {data.title}
                  </Text>
                </Flex>
              ))}
            </VStack>
            <VStack gap={0} align={"flex-start"} w="full">
              {dropdown_data.map((data) => (
                <Flex
                  align={"center"}
                  gap="12px"
                  key={data.key}
                  borderBottom="5px solid"
                  borderColor="background"
                  p="16px"
                  w="full"
                  onClick={data.onClick}
                >
                  {/* <Center color={`primary`} fontSize={`16px`}>
                    {data.icon || <Image src={data.image?.src} />}
                  </Center> */}
                  <Text
                    key={data.key}
                    color="text"
                    fontSize={"16px"}
                    fontWeight={400}
                  >
                    {data.title}
                  </Text>
                </Flex>
              ))}

              {/* <Flex align={'center'} gap='12px' mt='50px'>
                <Image h='full' src={reportBugIcon?.src} />
                <Text
                  cursor={'pointer'} onClick={() => router.push('/theme-toggler')}
                  color='text' fontSize={'16px'} fontWeight={400}
                >
                  Change Theme
                </Text>
              </Flex> */}
            </VStack>

            <Flex align={"center"} gap="12px" p="16px">
              {/* <Image h="full" src={logoutIcon?.src} /> */}
              <Text
                cursor={"pointer"}
                onClick={handleLogout}
                color="#E6192A"
                fontSize={"16px"}
                fontWeight={400}
              >
                Sign Out
              </Text>
            </Flex>
          </>
        ) : (
          <>
            <Flex
              w="full"
              h="50px"
              bg={"white"}
              justify={"space-between"}
              align={"center"}
            >
              <Image
                cursor={"pointer"}
                src={logoMobile.src}
                maxH={"45.882px"}
                h="full"
                w="full"
                maxW={"120px"}
                alt={"app-logo"}
              />
              <RxCross1 size={25} color="text" onClick={onDrawerClose} />
            </Flex>
            <VStack align={"flex-start"} mt="60px" spacing={"33px"}>
              <Text color="text" fontSize={"20px"} fontWeight={500}>
                Home
              </Text>
              <Text color="text" fontSize={"20px"} fontWeight={500}>
                Our Projects
              </Text>
              <Text color="text" fontSize={"20px"} fontWeight={500}>
                About{" "}
              </Text>
              <Text color="text" fontSize={"20px"} fontWeight={500}>
                Contact
              </Text>
            </VStack>

            <Button
              mt="50px"
              borderRadius="6px"
              color="white"
              bg="primary"
              px="28px"
              py="24px"
              onClick={() => router.push("/auth/login")}
            >
              <Text lineHeight={"28px"} fontWeight={"600"} fontSize={"18px"}>
                Get Started
              </Text>
            </Button>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawerComp;
