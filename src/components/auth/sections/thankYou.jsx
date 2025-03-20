import React, { useState } from "react";
import { Flex, VStack, Text, Box, Stack } from "@chakra-ui/react";
import { Button, FormInput } from "../../../ui-lib/ui-lib.components";
import { store_name } from "../../../constants/routes";
import { useMutation } from "react-query";
import { AttemptLogin, outreach } from "../../../api/auth";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";

const ThankYou = ({ onAuthClose, setEmail, setPage, email, ...rest }) => {
  const toast = useToastForRequest();
  const [select, setSelect] = useState(null);
  const [other, setOther] = useState(null);
  const storeName = store_name();
  const isAgentorOthers = (name) => name === "Others" || name === "Realtor";
  const loginForRegister = useMutation((formData) => AttemptLogin(formData), {
    onSuccess: (res) => {
      if (res?.response?.data?.action == "signup") {
        formik.resetForm();
        setEmail(email);
        setPage("successLink");
      } else if (res?.data?.action == "login") {
        setPage("successLink");
      } else {
        return toast({
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            "Something went wrong,we are working to resolve it"
          }`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    },
    onError: (err) => {
      toast({
        title: `${err.response.data.resolve ?? "Oops..."}`,
        description: `${err.message ?? err.response.data.message ?? err}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const { mutate, isLoading } = useMutation(
    (body) => {
      const selected = body ?? select;
      return outreach({
        outreach: body,
        ...(selected === "Others" ? { others_field: other.toLowerCase() } : {}),
        ...(selected === "Realtor" ? { agent_name: other.toLowerCase() } : {}),
        store_name: storeName,
        email: email,
      });
    },
    {
      onSuccess: (res) => {
        return loginForRegister.mutate({
          email: email,
          store_name: storeName,
        });
      },
      onError: (error) => {
        return toast({
          title: "Oops ...",
          description: `${
            error?.response?.data?.message ??
            error?.response?.message ??
            error?.message ??
            "Something went wrong,we are working to resolve it"
          }`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  const list = ["Referral", "Facebook", "Linkedin", "Realtor", "Others"];

  const handleChoice = (name) => {
    setSelect(name);
    if (!isAgentorOthers(name)) {
      mutate(name);
    }
    setOther(null);
  };

  const handleFinish = () => {
    mutate(select);
  };

  return (
    <Box
      bg={{ md: "card_bg"}}
      maxW={{ md: "425px" }}
      w={`100%`}
      px={{ base: 0, md: "32px" }}
      pt="20px"
      pb="30px"
      borderRadius={"0px"}
      {...rest}
    >
      <Flex
        h="full"
        direction="column"
        justify={"center"}
        align="center"
        gap={{ base: "24px", md: `16px` }}
        w="full"
      >
        <Stack align={{ md: `center` }} gap="8px" w="full" pb={{ md: "8px" }}>
          <Text
            fontSize={{ base: '18px', md: '20px' }}
            fontWeight={600}
            mt="0px !important"
            letterSpacing={"0.48px"}
            color={`matador_text.600`}
            fontFamily="Open Sans"
            textTransform="uppercase"
            whiteSpace="nowrap"
          >
            Where did you hear about us?
          </Text>
        </Stack>
        <VStack
          mt="0px"
          align="start"
          w="full"
          transition={`.5s`}
          overflow={`hidden`}
          spacing="20px"
        >
          {list.map((name, idx) => (
            <Stack
              key={idx}
              p={isAgentorOthers(name) ? 0 : "14px 12px"}
              onClick={isLoading ? null : () => handleChoice(name)}
              isActive={select === name}
              border="1px solid"
              borderColor="matador_border_color.100"
              w="full"
              h="64px"
              align="center"
              justify="center"
              _hover={{
                bg:
                  select && isAgentorOthers(name) ? "" : "rgba(0, 0, 0, 0.10)",
              }}
              cursor={isLoading ? "not-allowed" : "pointer"}
              bg={
                select === name && !isAgentorOthers(name)
                  ? "rgba(0, 0, 0, 0.10)"
                  : ""
              }
              opacity={isLoading ? "0.6" : "1"}
            >
              {select === name && (name === "Realtor" || name === "Others") ? (
                <FormInput
                  placeholder="Tell us how you heard about us"
                  _placeholder={{ opacity: 0.75, textTransform: "uppercase" }}
                  border="none"
                  h="56px"
                  onChange={(e) => setOther(e.target.value)}
                />
              ) : (
                <Text
                  color="matador_text.200"
                  fontFamily="Liberation Sans"
                  letterSpacing="3.2px"
                  textTransform="uppercase"
                  fontWeight={700}
                >
                  {name}
                </Text>
              )}
            </Stack>
          ))}
        </VStack>
        {(select === "Others" || select === "Realtor") && (
          <Button
            isDisabled={!other?.trim()}
            isLoading={isLoading || loginForRegister.isLoading}
            onClick={handleFinish}
            type="submit"
            bg="primary"
            w="full"
            color="white"
            fontSize={`16px`}
            fontWeight={`500`}
            h="56px"
            letterSpacing="0.18px"
            textTransform="uppercase"
            _active={{
              opacity: 1
            }}
          >
            Finish
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default ThankYou;
