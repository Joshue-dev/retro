import { Icon, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { BiMenu } from "react-icons/bi";
import MobileDrawer from "./mobile_drawer";

import { useQuery } from "react-query";
import { getSettingsData } from "../../api/Settings";
import { fetchAgentTerms } from "../../api/agents";
import { Notification } from "../notification_drawer";
import { Wallet } from "../wallet_drawer";
import Feedback from "../feedback/feedback";
import { ReportBug } from "../report_bug";
import { SuggestIdea } from "../suggest_idea";
import { MyAssets } from "../my_asset";
import { Watchlist } from "../watchlist_drawer";
import { Flex, Text, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { FaRegBell } from "react-icons/fa";
import useGetSession from "utils/hooks/getSession";

// import Feedback from '../feedback/feedback';
// import {SuggestIdea} from '../drawers/suggest_idea';
// import {Notification} from '../notification';
// import {MyAssets} from '../drawers/my_asset';
// import {Watchlist} from '../watchlist_drawer';
// import {ReportBug} from '../drawers/report_bug';
// import {Wallet} from '../wallet_drawer';

export const MobileHamburgerModal = ({ activePage, handleClose }) => {
  const { sessionData: LoggedinUser } = useGetSession("loggedIn");
  const settingsQuery = useQuery(
    ["getSettingsData", "profile"],
    () => getSettingsData({ profile: true }),
    {
      enabled: !!LoggedinUser,
    }
  );
  const avatar = settingsQuery?.data?.data?.data?.avatar;
  const TERMS = useQuery(["Terms"], fetchAgentTerms, {
    enabled: !!LoggedinUser,
  });

  const {
    isOpen: isAssetOpen,
    onOpen: onAssetOpen,
    onClose: onAssetClose,
  } = useDisclosure();
  const {
    isOpen: isNotOpen,
    onOpen: onNotOpen,
    onClose: onNotClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isWalOpen,
    onOpen: onWalOpen,
    onClose: onWalClose,
  } = useDisclosure();
  const {
    isOpen: isWatchOpen,
    onOpen: onWatchOpen,
    onClose: onWatchClose,
  } = useDisclosure();
  const feedBackModal = useDisclosure();
  const reportBugModal = useDisclosure();
  const suggestModal = useDisclosure();
  return (
    <>
      <Flex
        display={{ base: "flex", md: "none" }}
        mb="10px"
        px={"48px"}
        w="full"
        bg={"card_bg"}
        justify={"space-between"}
        align={"center"}
        p="20px"
        direction={"row"}
      >
        <Flex align={"center"} gap="10px" justify={"center"}>
          <ChevronLeftIcon
            cursor={"pointer"}
            onClick={handleClose}
            fontSize={"30px"}
            color={"text"}
          />
          <Text
            color="text"
            fontFamily="Open Sans"
            letterSpacing="0.96px"
            fontSize={"18px"}
            textTransform="uppercase"
            fontWeight={600}
          >
            {activePage}
          </Text>
        </Flex>
        <HStack gap="24px">
          <Icon
            as={FaRegBell}
            color="text"
            onClick={onNotOpen}
            fontSize={"25px"}
          />
          <Icon
            as={BiMenu}
            color="text"
            onClick={onDrawerOpen}
            fontSize={"30px"}
          />
        </HStack>
      </Flex>
      <MobileDrawer
        TERMS={TERMS}
        feedBackModal={feedBackModal}
        reportBugModal={reportBugModal}
        suggestModal={suggestModal}
        onNotOpen={onNotOpen}
        onAssetOpen={onAssetOpen}
        onWatchOpen={onWatchOpen}
        onWalOpen={onWalOpen}
        avatar={avatar}
        isDrawerOpen={isDrawerOpen}
        onDrawerClose={onDrawerClose}
        onDrawerOpen={onDrawerOpen}
      />
      <Notification
        onDrawerOpen={onDrawerOpen}
        isNotOpen={isNotOpen}
        onNotClose={onNotClose}
      />
      <Wallet
        onDrawerOpen={onDrawerOpen}
        avatar={avatar}
        isWalOpen={isWalOpen}
        onWalClose={onWalClose}
      />
      <Feedback onDrawerOpen={onDrawerOpen} feedModal={feedBackModal} />
      <ReportBug onDrawerOpen={onDrawerOpen} reportBugModal={reportBugModal} />
      <SuggestIdea onDrawerOpen={onDrawerOpen} suggestModal={suggestModal} />
      <MyAssets
        onDrawerOpen={onDrawerOpen}
        isAssetOpen={isAssetOpen}
        onAssetClose={onAssetClose}
      />
      <Watchlist
        onDrawerOpen={onDrawerOpen}
        isWatchOpen={isWatchOpen}
        onWatchClose={onWatchClose}
      />
    </>
  );
};

export default MobileHamburgerModal;
