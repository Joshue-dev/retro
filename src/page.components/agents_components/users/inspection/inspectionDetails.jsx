import {
  HStack,
  VStack,
  Stack,
  Text,
  Avatar,
  Spinner as Loader,
  FormControl,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import RatingIcon from "../rating";
import send from "/src/images/icons/send.svg";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { respondToInspectionFeedBack } from "@/api/agents";

const InspectionDetails = ({ inspectionData }) => {
  const [showInput, setShowInput] = useState(false);
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: (values) => {
      mutation.mutate({ response: values.text });
      setShowInput(false);
    },
  });

  const mutation = useMutation(
    (formBody) => respondToInspectionFeedBack(formBody, inspectionData?.id),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries("inspectionHistoryagent");
      },
    }
  );

  return (
    <VStack padding="1rem">
      <Stack
        borderRadius="12px"
        border="1px solid #E4E4E4"
        padding="1rem"
        width="100%"
      >
        <VStack align="start" marginBottom="1rem">
          <Text fontSize="18px" marginBottom="0.5rem" fontWeight="400">
            Assignee’s details
          </Text>
          <HStack>
            <Avatar
              size="md"
              src={
                inspectionData?.supervisor?.avatar ||
                inspectionData?.supervisor_avatar
              }
            />
            <VStack align="start" gap="0">
              <Text fontSize="15px" fontWeight="500">
                {inspectionData?.supervisor?.first_name &&
                inspectionData?.supervisor?.last_name
                  ? `${inspectionData?.supervisor?.first_name} ${inspectionData?.supervisor?.last_name}`
                  : inspectionData?.supervisor_full_name}
              </Text>
              <Text fontSize="14px" color="#4545FE">
                {inspectionData?.supervisor?.email ||
                  inspectionData?.supervisor_email}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <Stack background="#F5F5F5" borderRadius="12px" padding="12px 16px">
          <Text size="13.002px" fontWeight="500">
            Note
          </Text>
          <Text size="12px">{inspectionData?.supervisor_notes}</Text>
        </Stack>
      </Stack>
      {(inspectionData?.user_feedback || inspectionData.star_rating) && (
        <Stack
          borderRadius="12px"
          border="1px solid #E4E4E4"
          padding="1rem"
          width="100%"
        >
          <VStack align="start" marginBottom="1rem">
            <Text fontSize="18px" marginBottom="0.5rem" fontWeight="400">
              Rating & Feedback
            </Text>
            <HStack>
              {[...Array(5)].map((_, index) => (
                <RatingIcon
                  key={index}
                  fill={
                    index < inspectionData?.star_rating ? "#FF9103" : "#CBCBCB"
                  }
                />
              ))}
            </HStack>
          </VStack>
          {inspectionData.user_feedback && (
            <Stack
              background="#F5F5F5"
              borderRadius="12px"
              padding="12px 16px"
              width="100%"
            >
              <Text size="13.002px" fontWeight="500">
                Feedback
              </Text>
              <Text size="12px">{inspectionData.user_feedback}</Text>
              {inspectionData?.response === null && (
                <div>
                  {!showInput && (
                    <HStack justifyContent="end">
                      <HStack
                        as="button"
                        variant="default"
                        bg="#000"
                        w="fit-content"
                        justify="center"
                        my="auto"
                        borderRadius="6px"
                        padding="6.656px 6.209px"
                        onClick={() => setShowInput(true)}
                      >
                        <Text color="#ffffff" fontSize="12px" fontWeight="300">
                          Respond to Feedback
                        </Text>
                      </HStack>
                    </HStack>
                  )}
                </div>
              )}
              {showInput && (
                <FormControl
                  as="form"
                  mt="15px"
                  display="flex"
                  onSubmit={formik.handleSubmit}
                  gap="12px"
                  align="center"
                >
                  <Input
                    required
                    type="input"
                    id="text_for_inspection_feedback"
                    name="text"
                    onChange={formik.handleChange}
                    value={formik.values.text}
                    noLabel
                    notes
                    placeholder="Type in your message"
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                  <Button
                    alignSelf="center"
                    background="#4545FE"
                    borderRadius="10px"
                    _hover={{ bg: "#4545FE" }}
                    notes
                    w="fit-content"
                    p="0"
                    m="0"
                    type="submit"
                    isDisabled={!formik.values.text}
                    _disabled={{
                      cursor: "not-allowed",
                      pointerEvents: "all",
                    }}
                  >
                    {mutation.isLoading ? (
                      <Loader color="white" size="xs" />
                    ) : (
                      <Image
                        borderRadius="full"
                        alt="send image icon"
                        src={send.src}
                      />
                    )}
                  </Button>
                </FormControl>
              )}
            </Stack>
          )}

          {inspectionData?.response && (
            <Stack background="#F5F5F5" borderRadius="12px" padding="12px 16px">
              <HStack>
                <Avatar size="md" src={inspectionData?.respondent?.avatar} />
                <VStack align="start" gap="0">
                  <Text fontSize="14px">
                    {inspectionData?.respondent.first_name}{" "}
                    {inspectionData?.respondent.last_name}
                  </Text>
                </VStack>
              </HStack>
              <Text size="13.002px" fontWeight="500">
                Response
              </Text>
              <Text size="12px">{inspectionData.response}</Text>
            </Stack>
          )}
        </Stack>
      )}
    </VStack>
  );
};

export default InspectionDetails;
