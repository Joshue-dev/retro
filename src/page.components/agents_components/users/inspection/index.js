import {
  HStack,
  Button,
  Tag,
  TagLabel,
  Text,
  VStack,
  useDisclosure,
  useToast,
  useMediaQuery,
  Show,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchInspectionHistoryForAgents } from "api/agents";
import InspectionHistoryDrawer from "./inspectionHistoryDrawer";
import { EmptyState } from "components/common/Table";
import { IoChevronForward } from "react-icons/io5";
import useLocalStorage from "utils/hooks/useLocalStorage";

export const Inspection = ({ id: inspectionId, data, isClosed }) => {
  const router = useRouter();
  const { id } = router.query;
  const [addedParam, setAddedParam] = useState("");
  const inspectionHistoryDisclosure = useDisclosure();
  const toast = useToast();
  const param = { addedParam, id };

  const {
    data: inspectionData,
    isLoading,
    isError,
    error,
  } = useQuery(["inspectionHistoryagent", param], () =>
    fetchInspectionHistoryForAgents(param)
  );

  const inspectionHistory = inspectionData?.data;

  const timeArray = (item) => item.month.split(" ");

  const mode = {
    "in-person": {
      color: "#4545FE",
      bg: "#E7FBF5",
      text: "In Person",
    },
    video: {
      color: "#064B38",
      bg: "#E7FBF5",
      text: "Video Chat",
    },
  };

  if (isError) {
    toast({
      title: "Oops ...",
      description: `${
        error?.response?.data?.message ??
        error?.response?.message ??
        error?.message ??
        "Something went wrong,kindly check your network connection"
      }`,
      status: "error",
      duration: 8000,
      isClosable: true,
      position: "top-right",
    });
  }

  const [isNotMobile] = useMediaQuery("(min-width: 768px)");

  return (
    <div>
      <HStack justifyContent={"space-between"} mb={"16px"} w="100%">
        <Text fontSize="16px" color="#191919" fontWeight="500">
          Inspection
        </Text>
        {isClosed && (
          <Button
            onClick={inspectionHistoryDisclosure.onOpen}
            h="fit-content"
            w="fit-content"
            p="0px"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            _focus={{ bg: "transparent" }}
            fontSize={{ base: "16px", lg: "14px" }}
            color={{ base: "#4545FE", lg: "#191919" }}
            fontWeight={{ base: "400", lg: "600" }}
            variant="ghost"
            iconSpacing="none"
          >
            <HStack gap={"6px"}>
              <Text>
                {isNotMobile ? "View Inspection History" : "Inspection History"}
              </Text>
              <Show above="lg">
                <IoChevronForward fontSize={"18px"} />
              </Show>
            </HStack>
          </Button>
        )}
      </HStack>
      {!data?.length ? (
        <EmptyState
          description="No upcoming inspection"
          p={{ base: "24px", md: "52px" }}
          bg="#fff"
          borderRadius="9px"
          show_image={false}
        />
      ) : data && data?.length ? (
        <HStack
          justify="start"
          w="full"
          bg="#fff"
          borderRadius="16px"
          border=" 0.5px solid  #E4E4E4"
          p="26px 31px"
          spacing="24px"
        >
          {data.map((item, index) => (
            <VStack
              key={index}
              pt="19px"
              pb="18px"
              px="14px"
              border="1px solid #E4E4E4"
              minW="172px"
              borderRadius="12px"
              spacing="none"
            >
              <Text fontSize="14px" fontWeight="400" mb="13px">
                {timeArray(item)[2]}
              </Text>
              <Text fontSize="28px" fontWeight="400" mb="26px" color="#191919">
                {timeArray(item)[1]}
              </Text>
              <Text fontSize="14px" fontWeight="400" mb="16px">{`${
                timeArray(item)[0]
              }`}</Text>
              <Tag
                p="8px 13px"
                minW="97px"
                minH="36px"
                bg={mode[item.tour_method]?.bg}
                color={mode[item.tour_method]?.color}
                borderRadius="full"
              >
                <TagLabel mx="auto" fontSize="16px" fontWeight="400">
                  {mode[item.tour_method]?.text}
                </TagLabel>
              </Tag>
            </VStack>
          ))}
        </HStack>
      ) : null}
      <InspectionHistoryDrawer
        isLoading={isLoading}
        isError={isError}
        drawerDisclosure={inspectionHistoryDisclosure}
        data={inspectionHistory}
        setAddedParam={setAddedParam}
      />
    </div>
  );
};
