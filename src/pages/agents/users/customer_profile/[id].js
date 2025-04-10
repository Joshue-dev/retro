import React from "react";

import { useRouter } from "next/router";
import {
  Heading,
  HStack,
  Stack,
  Spinner,
  Image,
  Box,
  useToast,
  Center,
  Show,
  Hide,
  Flex,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchCustomerInfo } from "../../../../api/agents";
import UserProperties from "/src/page.components/agents_components/users/UserProperties";
import AgentsLayoutView from "../../../../page.components/agents_components/AgentLayout/View";
import User_profile_info from "../../../../page.components/agents_components/users/User_profile_info";
import { toastForError } from "../../../../utils/toastForErrors";
import backArrow from "/src/images/icons/back-arrow.png";
import { themeStyles } from "theme";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { User_referral } from "page.components/agents_components/users/User_referral";

export default function SingleCustomerPage() {
  const router = useRouter();
  const toast = useToast();
  const { id } = router?.query;

  const {
    data: UniqueCustomer,
    isError,
    error,
    isLoading,
  } = useQuery(["customer-profile-id", id], () => fetchCustomerInfo(id));

  toastForError(error, isError, toast);

  const handleBack = () => {
    router.back();
  };

  return (
    <Box bg="#FAFAFA" mx="auto" minH="100vh">
      <AgentsLayoutView
        activePage="customers"
        py="0px"
        pt={{ base: "60px", lg: "0px" }}
      >
        {isLoading ? (
          <Center h="60vh" w="100%">
            <Show above="md">
              <OvalLoader />
            </Show>
            <Hide above="md">
              <Spinner />
            </Hide>
          </Center>
        ) : isError ? (
          toast({
            title: "An error occured fetching user profile",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          })
        ) : UniqueCustomer?.data ? (
          <Stack
            // zIndex={1200}
            mx="auto"
            // mt={{lg: '54px'}}
            maxW={{ lg: "1284px" }}
            spacing={{ base: "20px", lg: "56px" }}
            justify="flex-end"
            direction={{ base: "column", lg: "row" }}
            gap={{ base: `26px`, lg: `26px` }}
          >
            <Box
              pr={{ lg: 3 }}
              pb={{ lg: "67px" }}
              position={{ lg: "fixed" }}
              // top={{lg: '25%', '2xl': '20%'}}
              top={{ base: "50px", lg: "20%", "2xl": "16%" }}
              left="6%"
              overflowY={{ lg: "auto" }}
              css={scrollBarStyles}
              // bottom="0"
            >
              <HStack onClick={handleBack} mb={4}>
                <Image
                  style={{ cursor: "pointer" }}
                  mr={2}
                  height="50px"
                  src={backArrow.src}
                  alt="back_arrow"
                  zIndex={1200}
                />
                <Heading
                  fontFamily="Euclid Circular B"
                  fontSize={20}
                  {...themeStyles.textStyles.h3}
                >
                  Back
                </Heading>
              </HStack>
              <User_profile_info
                referral={UniqueCustomer?.data?.referred_by}
                customerInfo={UniqueCustomer?.data?.user_info}
              />
              {UniqueCustomer?.data?.referred_by && (
                <User_referral refData={UniqueCustomer?.data?.referred_by} />
              )}
            </Box>
            <Flex maxW="888px" pl={{ lg: "31px" }} minH="100vh">
              <UserProperties id={id} customerInfo={UniqueCustomer?.data} />
            </Flex>
          </Stack>
        ) : null}
      </AgentsLayoutView>
    </Box>
  );
}

export const scrollBarStyles = {
  "&::-webkit-scrollbar": {
    width: "4px",
    marginRight: "10px",
  },
  "&::-webkit-scrollbar-track": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: "24px",
  },
};
