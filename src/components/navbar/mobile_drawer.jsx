import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import {
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import logoMobile from "../../images/mobile-logo-white.png";
import { Button } from "../../ui-lib";
import { RxCross1 } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/router";
import settingIcon from "../../images/navar/settings.svg";
import useGetSession from "utils/hooks/getSession";
import { deleteCookies } from "utils/sessionmanagers";
import useLocalStorage from "utils/hooks/useLocalStorage";

export const MobileDrawerComp = ({
  onAssetOpen,
  onWalOpen,
  isDrawerOpen,
  onDrawerClose,
  TERMS,
  PRIVACY_POLICY,
}) => {
  const router = useRouter();
  const { sessionData: LoggedinUser } = useGetSession("loggedIn");
  const [storeThemeInfo] = useLocalStorage('storeThemeInfo');
  const isGatewayEnabled = storeThemeInfo?.isGatewayEnabled && storeThemeInfo?.isWalletEnabled
  const auth_data = [
    {
      key: "myAssets",
      title: "Portfolio",
      onClick: () => {
        onDrawerClose();
        onAssetOpen();
      },
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
            </VStack>
            <Flex align={"center"} gap="12px" p="16px">
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
