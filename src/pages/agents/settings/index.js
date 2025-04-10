/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import AgentsLayoutView from "../../../page.components/agents_components/AgentLayout/View";
import {
  HStack,
  Image,
  Heading,
  Spinner,
  useToast,
  Center,
  Show,
  Hide,
} from "@chakra-ui/react";
import backArrow from "/src/images/icons/back-arrow.png";
import ProfileUpdate from "../../../page.components/agents_components/settings/ProfileUpdate";
import UpdateBankDetails from "../../../page.components/agents_components/settings/UpdateBankDetails";
import { useQuery } from "react-query";
import { fetchAgentSettingsInfo } from "../../../api/agents";
import router from "next/router";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import useLocalStorage from "utils/hooks/useLocalStorage";

export const Settings = () => {
  const handleBack = () => {
    return router.back();
  };

  const toast = useToast();

  const SETTINGS_INFO = useQuery(
    ["agents_settings_data"],

    () => fetchAgentSettingsInfo()
  );

  if (SETTINGS_INFO?.isError) {
    toast({
      title: "Oops ...",
      description: `${
        SETTINGS_INFO?.error?.response?.data?.message ??
        SETTINGS_INFO?.error?.response?.message ??
        SETTINGS_INFO?.error?.message ??
        "Something went wrong"
      }`,
      status: "error",
      duration: 8000,
      isClosable: true,
      position: "top-right",
    });
  }

  return (
    <AgentsLayoutView activePage={""}>
      {SETTINGS_INFO.isLoading ? (
        <Center h="70vh" w="100%">
          <Show above="md">
            <OvalLoader />
          </Show>
          <Hide above="md">
            <Spinner />
          </Hide>{" "}
        </Center>
      ) : (
        <>
          <HStack mb="20px" mt={{ base: `50px`, lg: `0px` }}>
            <Image
              onClick={handleBack}
              style={{ cursor: "pointer" }}
              mr={2}
              boxSize="50px"
              src={backArrow.src}
              alt="back_arrow"
            />
            <Heading fontSize="20px" fontWeight="600">
              Settings
            </Heading>
          </HStack>
          <ProfileUpdate
            Data={SETTINGS_INFO.data?.data?.message?.user}
            refetch={SETTINGS_INFO.refetch}
          />

          <UpdateBankDetails
            bank={SETTINGS_INFO.data?.data?.message?.banks[0]}
            refetch={SETTINGS_INFO.refetch}
          />
        </>
      )}
    </AgentsLayoutView>
  );
};

export default Settings;
