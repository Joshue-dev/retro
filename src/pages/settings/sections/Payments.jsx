import React from "react";
import {
  Text,
  useToast,
  useMediaQuery,
  Stack,
  GridItem,
  SimpleGrid,
  useTheme,
  HStack,
  StackDivider,
} from "@chakra-ui/react";
import { Button } from "../../../ui-lib";
import { RemoveBankAccount } from "../../../api/Settings";
import { useMutation, useQuery } from "react-query";
import { makeeDepositToWallet } from "../../../api/Wallet";
import { storeName } from "../../../constants/routes";
import { fetchSavedCards } from "../../../api/payment";
import openExternalUrl from "../../../utils/openExternalLink";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { customScrollbarStyles } from "@/components/portfolioAndAssetInfo/screens/assetInfoScreens/makeADepositToAnAsset";

const Payments = () => {
  const theme = useTheme();
  const toast = useToastForRequest();
  const {
    data,
    isLoading: fetchingCard,
    refetch,
  } = useQuery(["cardSaved"], fetchSavedCards);
  const isDarkMode = theme.theme_name !== "light";
  const { mutate: removeCardMutate, isLoading: removingCard } = useMutation(
    (values) => RemoveBankAccount(values),
    {
      onSuccess: async (res) => {
        toast({
          description: `Account removed successfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });

        await refetch();
      },
      onError: (err) => {
        toast({
          title:
            err?.message === "Network Error"
              ? "Network Error"
              : "Oops something went wrong",
          description: `${
            err?.response?.data?.message ??
            "please check your network connection"
          }`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );
  const MAKE_DEPOSITS_MUTATION = useMutation(
    (formData) => makeeDepositToWallet(formData),
    {
      onSuccess: (res) => {
        const link = res?.data?.data?.data?.link;
        if (link) {
          openExternalUrl(link, "_blank");
        }
      },
      onError: (err) => {
        toast({
          title: "Oops...",
          description: `${
            err?.response?.data?.message ??
            err?.response?.message ??
            err?.response?.data[0] ??
            "Something went wrong"
          }`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  const handleRemove = (id) => {
    removeCardMutate(id);
  };

  const handleMakeDeposits = () => {
    const body = {
      amount: 50,
      channel: "card",
      store: storeName,
    };
    MAKE_DEPOSITS_MUTATION.mutate(body);
  };

  return (
    <Stack mt={{ base: "50px", lg: "178px" }}>
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        spacing={{ base: "5px", lg: "19px" }}
        justifyContent={"space-between"}
      >
        <GridItem colSpan={1} mb={{ base: "15px", lg: "30px" }} maxW="413px">
          <Text
            fontSize={{ base: "16px", md: "20px", lg: "23px" }}
            fontWeight={600}
            textTransform={"uppercase"}
          >
            payments
          </Text>
        </GridItem>
        <GridItem
          colSpan={{ base: 1, lg: 2 }}
          mb={{ base: "7px", lg: "30px" }}
          p={{ md: "32px" }}
          border={{ md: "1.3px solid" }}
          borderColor={{
            md: isDarkMode
              ? "matador_border_color.200"
              : "matador_border_color.300",
          }}
          borderRadius={"16px"}
          bg={{ md: isDarkMode ? "matador_background.200" : "none" }}
        >
          {data?.data?.results?.length > 0 ? (
            <Stack
              gap="16px"
              maxH="250px"
              overflowY="auto"
              sx={customScrollbarStyles()}
              divider={
                <StackDivider
                  borderColor={
                    isDarkMode
                      ? "matador_border_color.200"
                      : "matador_border_color.300"
                  }
                />
              }
              pr={4}
            >
              {data?.data?.results?.map((card, index) => {
                return (
                  <HStack key={index} w="full" justify="space-between">
                    <Stack>
                      <Text
                        fontSize={{ base: "16px", md: "16px" }}
                        fontFamily="Noto Sans"
                        fontWeight={500}
                        color='text'
                      >
                        {card?.bank}
                      </Text>
                      <Text color="matador_text.500">
                        Savings **** **** {card?.last4}
                      </Text>
                    </Stack>
                    <Button
                      color="white"
                      bg="primary"
                      h="36px"
                      fontSize={{ base: "12px", md: "14px" }}
                      p="2px 8px"
                      onClick={() => handleRemove(card?.id)}
                    >
                      Remove
                    </Button>
                  </HStack>
                );
              })}
            </Stack>
          ) : (
            <Stack w="full" justify="center" align="center" minH="141px">
              <Text
                fontSize={{ base: "18px", md: "20px" }}
                fontWeight={600}
                textTransform={"uppercase"}
                fontFamily="Liberation Sans"
              >
                nothing found
              </Text>
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="matador_text.500"
              >
                No payment method added yet
              </Text>
            </Stack>
          )}
        </GridItem>
      </SimpleGrid>
      <Button
        float="right"
        isLoading={removingCard}
        onClick={handleMakeDeposits}
        color="white"
        bg="primary"
        w={{ base: "full", lg: "246px" }}
        type="submit"
        h="48px"
        fontSize={{ base: 12, md: 16 }}
        alignSelf="end"
        fontWeight={400}
        textTransform={"uppercase"}
      >
        add payment method
      </Button>
    </Stack>
  );
};

export default Payments;
