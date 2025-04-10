import {
  fetchForCustomerEquityValidation,
  fetchOffers,
  fetchUserEquity,
} from "@/api/listing";
import { getSettingsData } from "@/api/Settings";
import { ChatIconForInspectionFeedback } from "@/components/assets/svgs";
import InspectionFeedBack from "@/components/feedback";
import OffersBar from "@/components/offers/offersBar";
import PendingTransactionsBar from "@/components/pendingTransactions/pendingTransactionsBar";
import ValidateCustomerEquityBar from "@/components/validateCustomerAssets/ValidateCustomerEquityBar";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Text,
  useDisclosure,
  useMediaQuery,
  useTheme,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import SettingsBar from "pages/settings/settingsBar";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Button } from "ui-lib/ui-lib.components";
import useGetSession from "utils/hooks/getSession";
import { pluralizeWord } from "utils/pluralizeWord";
import { capitalizeTextFormat } from "utils/truncateLongText";
import PendingTransactionsDrawer from "@/components/pendingTransactions";
import OffersDrawer from "@/components/offers";
import ValidateCustomerEquity from "@/components/validateCustomerAssets";
import FeedbackEquity from "@/components/feedback/feedbackEquity";
import { fetchpendingInspectionFeedbaack } from "@/api/navbarMenu";

const ProjectBanners = () => {
  const theme = useTheme();
  const { sessionData: user } = useGetSession("loggedIn");
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const [currentConditionIndex, setCurrentConditionIndex] = useState(null);
  const router = useRouter();
  const validateModal = useDisclosure();
  const offersModal = useDisclosure();
  const pendingModal = useDisclosure();
  const inspectionModal = useDisclosure();
  const profileQuery = useQuery(["getSettingsData", "profile"], () =>
    getSettingsData({ profile: true })
  );

  const fetchcustomeQuery = useQuery(
    ["fetchcustomervalidationEquity"],
    fetchForCustomerEquityValidation,
    { refetchOnMount: true }
  );

  const pendingOffers = useQuery(["fetchUserEquity", "OFFERS"], fetchOffers, {
    refetchOnMount: true,
  });

  const pendingQuery = useQuery(
    ["fetchUserEquity", "PENDING"],
    () => fetchUserEquity("PENDING"),
    {
      refetchOnMount: true,
    }
  );

  const { data, refetch, isLoading } = useQuery(
    ["fetchpendingInspectionFeedbaack"],
    fetchpendingInspectionFeedbaack
  );

  const pendingTransactions = pendingQuery?.data?.data?.results;
  const listOffers = pendingOffers?.data?.data?.data;
  const datasToUse = fetchcustomeQuery?.data?.data?.all_pending_requests;
  const { marital_status, highest_education, monthly_income, address } = {
    ...profileQuery?.data?.data?.data,
  };

  const showSettingsBar =
    !marital_status && !highest_education && !monthly_income && !address;

  const showModal = currentConditionIndex !== null;

  const conditions = [
    datasToUse?.length > 0,
    listOffers?.length > 0,
    pendingTransactions?.length > 0,
    data?.data?.data?.length > 0,
    showSettingsBar,
  ];

  const firstTrueIndex = conditions.findIndex(Boolean);

  useEffect(() => {
    if (firstTrueIndex !== -1) {
        setCurrentConditionIndex(firstTrueIndex)
    }
  }, [])

  const bannerProps = [
    {
      description: `Hello ${capitalizeTextFormat(
        user?.first_name
      )}! Your attention is needed to validate ${
        datasToUse?.length > 1 ? "some transactions" : "a transaction"
      }.`,
      onClick: validateModal.onOpen,
    },
    {
      description: `Hello ${capitalizeTextFormat(user?.first_name)}! You have ${
        listOffers?.length > 1 ? listOffers?.length : "an"
      } ${pluralizeWord(
        listOffers?.length > 1,
        "offer"
      )}. Check out the ${pluralizeWord(
        listOffers?.length > 1,
        "offer"
      )} before it expires.`,
      onClick: offersModal.onOpen,
    },
    {
      description: `Hello ${capitalizeTextFormat(user?.first_name)}! You have ${
        pendingTransactions?.length
      } pending ${pluralizeWord(
        pendingTransactions?.length > 1,
        "transaction"
      )}. Kindly proceed to make payment`,
      onClick: pendingModal.onOpen,
    },
    {
      description:
        "How was your inspection? We'll like to know how it was. Kindly give feedback.",
      onClick: inspectionModal.onOpen,
    },
    {
      description:
        "Welcome onboard! Thank you for signing up. Please complete the rest of your profile in settings",
      onClick: () => router.push("/settings"),
    },
  ];

  const currentBanner = bannerProps[currentConditionIndex];

  return (
    <Box
      w="full"
      mb={{ base: "20px", md: "30px" }}
      maxW={`169.2rem`}
      mx={`auto`}
    >
      {isMobile ? (
        <>
          {showModal && (
            <HStack
              w="full"
              bg={theme.theme_name !== "light" ? "card_bg" : "#FCFCFD"}
              mx="auto"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              justify="space-between"
              p={{ base: "10px", md: "12px" }}
              minH={{ base: "48px", md: "72px" }}
              maxH="max-content"
              mt={{ base: "8px", md: "15px" }}
              borderRadius={{ base: "6px", md: "12px" }}
              border="1px solid"
              borderColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
            >
              <HStack w="full" gap="8px">
                <HStack
                  p={{ base: "4px", md: "10px" }}
                  justify="center"
                  align="center"
                  rounded="10px"
                  border="1px solid"
                  borderColor={
                    theme.theme_name !== "light"
                      ? "matador_border_color.200"
                      : "#E4E7EC"
                  }
                  boxShadow="0px 0px 0px 1px rgba(16, 24, 40, 0.18) inset, 0px -2px 0px 0px rgba(16, 24, 40, 0.05) inset, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  w="full"
                  maxW="32px"
                  h="32px"
                >
                  <ChatIconForInspectionFeedback
                    color={theme.theme_name !== "light" ? "#FFF" : "#344054"}
                    boxSize="16px"
                  />
                </HStack>
                <Text fontSize={{ base: "12px", md: "16px" }} color="text">
                  <Text fontWeight={600} as="span">
                    {currentBanner?.description}
                  </Text>
                </Text>
              </HStack>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={{ base: "8px", md: "18px" }}
                pr="4px"
              >

                <Button
                  color="#FFF"
                  bg="primary"
                  h={{ base: "23px", md: "44px" }}
                  w={{ base: "47px", md: "75px" }}
                  _hover={{ opacity: 1, textDecoration: "none" }}
                  _active={{ opacity: 1 }}
                  fontSize={{ base: "13px", md: "16px" }}
                  fontWeight={{ base: "500", md: 600 }}
                  px="32px"
                  py="13px"
                  fontFamily="Inter"
                  rounded="8px"
                  onClick={currentBanner?.onClick}
                >
                  View
                </Button>
              </Stack>
            </HStack>
          )}
        </>
      ) : (
        <>
          <ValidateCustomerEquityBar />
          <PendingTransactionsBar />
          <InspectionFeedBack />
          <OffersBar />
          <SettingsBar />
        </>
      )}
      <ValidateCustomerEquity
        equitiesData={datasToUse}
        drawer={validateModal}
        refetch={fetchcustomeQuery?.refetch}
        isLoading={fetchcustomeQuery?.isLoading}
        isError={fetchcustomeQuery?.isError}
      />
      <OffersDrawer
        refetch={pendingOffers?.refetch}
        assetData={listOffers}
        isLoading={pendingOffers?.isLoading}
        isOpen={offersModal?.isOpen}
        drawer={offersModal}
        isError={pendingOffers?.isError}
      />
      <FeedbackEquity
        equity={data?.data?.data?.[0]}
        refetch={refetch}
        feedModal={inspectionModal}
      />
      <PendingTransactionsDrawer
        refetch={pendingQuery?.refetch}
        assetData={pendingTransactions}
        isLoading={pendingQuery?.isLoading}
        isOpen={pendingModal?.isOpen}
        drawer={pendingModal}
        isError={pendingQuery?.isError}
      />
    </Box>
  );
};

export default ProjectBanners;
