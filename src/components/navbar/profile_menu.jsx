import React from "react";
import {
  Flex,
  Text,
  MenuList,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalContent,
  ModalOverlay,
  useTheme,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { appCurrentTheme } from "../../utils/localStorage";
import { deleteCookies } from "utils/sessionmanagers";

export const ProfileMenu = ({ TERMS, PRIVACY_POLICY, profileModal }) => {
  const theme = useTheme();
  const router = useRouter();
  const handleSettings = () => {
    router.push("/settings");
  };
  const handleLogout = () => {
    deleteCookies(["token", "loggedIn"]);
    window.location = '/'
  };

  return (
    <Modal isOpen={profileModal.isOpen} onClose={profileModal.onClose} scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent
        top={"6rem"}
        left={{ base: "37.5%", xl: "39.5%", "2xl": "42.5%" }}
      >
        <Menu isOpen={profileModal.isOpen} onClose={profileModal.onClose}>
          <MenuList
            zIndex={200}
            bg={theme.theme_name !== 'light' ? 'background' : "card_bg"}
            rounded={0}
            p={0}
            fontFamily={"Noto Sans"}
            _hover={{
              border: 'none'
            }}
            _focusVisible={{
              border: 'none'
            }}
          >
            <MenuItem
              borderBottom={theme.theme_name === 'light' && "5px solid !important"}
              borderColor={
                theme.theme_name === 'light'
                  ? "background !important"
                  : "matador_border_color.200 !important"
              }
              onClick={() => router.push("/settings")}
              bg={theme.theme_name !== 'light' ? 'background' : "card_bg"}
              p="16px"
              pb={0}
            >
              <Flex gap={3} align="center" onClick={handleSettings}>
                <Text color="text" fontWeight="400">
                  Settings
                </Text>
              </Flex>
            </MenuItem>
            <MenuItem
              onClick={() =>
                window.open(
                  `${TERMS ? TERMS : ''}`,
                  "_blank"
                )
              }
              bg={theme.theme_name !== 'light' ? 'background' : "card_bg"}
              borderBottom={theme.theme_name === 'light' && "5px solid !important"}
              borderColor={
                theme.theme_name === 'light'
                  ? "background !important"
                  : "matador_border_color.200 !important"
              }
              p="16px"
            >
              <Flex gap={3} align="center">
                <Text color="text" fontWeight="400">
                  Terms of Services
                </Text>
              </Flex>
            </MenuItem>
            <MenuItem
              onClick={() =>
                window.open(
                  `${PRIVACY_POLICY ? PRIVACY_POLICY : ''}`,
                  "_blank"
                )
              }
              bg={theme.theme_name !== 'light' ? 'background' : "card_bg"}
              borderBottom={theme.theme_name === 'light' && "5px solid !important"}
              borderColor={
                theme.theme_name === 'light'
                  ? "background !important"
                  : "matador_border_color.200 !important"
              }
              p="16px"
            >
              <Flex gap={3} align="center">
                <Text color="text" fontWeight="400">
                  Privacy Policy
                </Text>
              </Flex>
            </MenuItem>
            <MenuItem onClick={handleLogout} bg={theme.theme_name !== 'light' ? 'background' : "card_bg"} p="16px">
              <Flex gap={3} align="center">
                <Text color="#E6192A" fontWeight="400">
                  Sign Out
                </Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </ModalContent>
    </Modal>
  );
};

export default ProfileMenu;
