import React from "react";
import {
  Box,
  Center,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Spinner, UploadProfilePicture } from "../../../ui-lib";
import { getSettingsData, updateSettings } from "../../../api/Settings";
import { useMutation, useQuery } from "react-query";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { ErrorPage } from "@/components/appState/error-page";
import NextOfKin from "./NextOfKin";
import UserProfile from "../screens/userProfile";
import Payments from "./Payments";

const Profile = () => {
  const toast = useToastForRequest();
  const profileQuery = useQuery(["getSettingsData", "profile"], () =>
    getSettingsData({ profile: true })
  );
  
  const AvatarMutation = useMutation((forlgata) => updateSettings(forlgata), {
    onSuccess: () => {
      toast({
        title: "changes updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      profileQuery?.refetch();
    },
    onError: (err) => {
      toast({
        title:
          err?.message === "Network Error"
            ? "Network Error"
            : "Oops something went wrong",
        description: `${
          err?.response?.data?.message ?? "please check your network connection"
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const next_of_kinQuery = useQuery(["getSettingsData", "next_of_kin"], () =>
    getSettingsData({ next_of_kin: true })
  );

  const onAvatarChange = (file) => {
    AvatarMutation.mutate({
      profile_avatar: true,
      avatar: file[0]?.image.replace("data:", "").replace(/^.+,/, ""),
    });
    return profileQuery?.refetch();
  };

  return (
    <Box padding={{ base: "0", lg: "34px" }} pb={3} w="full">
      {profileQuery?.isLoading || next_of_kinQuery?.isLoading ? (
        <Center w="full" h="50vh">
          <Spinner />
        </Center>
      ) : profileQuery?.isError || next_of_kinQuery?.isError ? (
        <ErrorPage error={profileQuery?.error || next_of_kinQuery?.error} />
      ) : (
        <VStack align={"start"} w="full">
          <HStack
            align="center"
            gap={{ base: "20px", md: "24px" }}
            mb={{ md: "28px" }}
          >
            <UploadProfilePicture
              containerStyle={{
                width: "max-content",
                margin: "auto",
              }}
              id="avatar"
              name="avatar"
              setFiles={onAvatarChange}
              isAvatarLoading={AvatarMutation?.isLoading}
              avatar={profileQuery.data?.data?.data?.avatar}
              numOfFiles={1}
              mt={{ base: 6, md: 0 }}
            />
            <Stack mt={{ base: "1rem", md: 0 }} gap={0}>
              <Heading
                fontSize={{ base: "20px", md: "32px" }}
                textTransform="capitalize"
                fontFamily="Open Sans"
              >
                {profileQuery.data?.data?.data?.first_name}{" "}
                {profileQuery.data?.data?.data?.middle_name}{" "}
                {profileQuery.data?.data?.data?.last_name}
              </Heading>
              <Text
                fontSize={{ md: "18px" }}
                color="text_two"
                letterSpacing="0.2px"
              >
                {profileQuery.data?.data?.data?.email}
              </Text>
            </Stack>
          </HStack>
          <UserProfile
            onAvatarChange={onAvatarChange}
            AvatarMutation={AvatarMutation}
            profileQuery={profileQuery}
          />
          <Box w="full" pt={{ base: "20px", lg: "50px" }}>
            <NextOfKin next_of_kinQuery={next_of_kinQuery} />
            <Payments />
          </Box>
        </VStack>
      )}
    </Box>
  );
};

export default Profile;
