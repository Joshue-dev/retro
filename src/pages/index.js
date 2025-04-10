import React, { useEffect } from "react";
import LandingWrapper from "../hoc/LandingWrapper";
import Register from "../components/auth/register";
import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import AppleStoreIcon from "images/landing-page/apple-store.svg";
import PlayStoreIcon from "images/landing-page/play-store.svg";
import { QRCode, QRInfo } from "@/components/auth/components/qrcode";
function Home() {
  const theme = useTheme();
  const { isOpen, onClose, onToggle, onOpen } = useDisclosure();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [])

  return (
    <>
      <Flex
        h="100%"
        w="full"
        flexDirection="column"
        minH="100vh"
        position="relative"
      >
        <Register isAuthOpen={true} onAuthClose={() => {}} />
      </Flex>
      <Box w="full" pos="relative">
        <Box display={{ base: 'none', md: 'block' }} pos="fixed" right="6vw" bottom="12rem">
          <QRInfo isOpen={isOpen} onClose={onClose} />
        </Box>
        <HStack
          w="full"
          justify="space-between"
          borderTop="0.5px solid"
          borderTopColor={
            theme.theme_name !== "light" ? "matador_border_color.200" : "shade"
          }
          p={{ base: "8px 20px", md: "12px 100px" }}
          fontSize={{ base: 12, md: 15 }}
          alignSelf="end"
          justifySelf="end"
          position="fixed"
          bottom={`0px`}
          left={`0px`}
          width={`100%`}
          zIndex={1}
          color={`matador_text.400`}
          bg="card_bg"
        >
          <Text
            fontWeight="400"
            fontSize={{ base: "12px", md: "16px" }}
            opacity={".6"}
            fontFamily={"Open Sans"}
            as={Link}
            href="https://www.myxellia.io"
            textDecor="none"
            _hover={{
              textDecor: "none",
            }}
          >
            Created with myxellia.io
          </Text>
          <HStack gap="12.505px">
            <Flex
              rounded="8px"
              border="1px solid"
              borderColor={isOpen ? "#FFE6E6" : "#E4E4E7"}
              _hover={{ borderColor: "#FFE6E6" }}
              p="8px"
              cursor="pointer"
              onClick={onToggle}
              display={{ base: "none", md: "flex" }}
            >
              <QRCode boxSize="24px" color={isOpen ? "#CA1611" : "#000"} />
            </Flex>
            <Link
              href="https://apps.apple.com/au/app/my-veritasi/id6478011265"
              target="_blank"
            >
              <Image maxW={{ base: '80px', md: '111px'}} src={AppleStoreIcon.src} alt="apple store" />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.matadortrust.veritasi"
              target="_blank"
            >
              <Image maxW={{ base: '80px', md: '111px'}} src={PlayStoreIcon.src} alt="play store" />
            </Link>
          </HStack>
        </HStack>
      </Box>
    </>
  );
}

export default LandingWrapper(Home);
