import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  Button,
  useTheme,
  useDisclosure,
} from "@chakra-ui/react";
import { FormInput } from "../../../ui-lib/ui-lib.components";
import { AttemptLogin, agentLogin, storeDetails } from "../../../api/auth";
import { store_name } from "../../../constants/routes";
import { useMutation, useQuery } from "react-query";
import { useFormik } from "formik";
import uncheckIcon from "/src/images/icons/emptyCheckIcon.svg";
import { CheckTermsSVG } from "@/components/assets/svgs";
import { useLightenHex } from "utils/lightenColorShade";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import HelpCenterDrawer from "../modals/HelpCenter";
import { fetchTermsAndConditionsPDF } from "@/api/agents";

const GetStarted = ({ onAuthClose, setPage, setEmail, ...rest }) => {
  const toast = useToastForRequest();
  const STOREINFO = useQuery(["storeInfo"], storeDetails);
  const store_data = STOREINFO.data?.data?.data;
  const storeName = store_name();
  const TERMS = store_data?.customer_document;
  const PRIVACY_POLICY = store_data?.customer_privacy_policy;
  const STOREDOCUMENTS = useQuery(['terms'], fetchTermsAndConditionsPDF)
  const AGENTTERMS = STOREDOCUMENTS?.data?.data?.message?.document;
  const AGENT_PRIVACY_POLICY = STOREDOCUMENTS?.data?.data?.policy;
  const [checked, setChecked] = useState(false);

  const privacyPolicy = rest?.isAgent ? AGENT_PRIVACY_POLICY : PRIVACY_POLICY
  const termsAndConditions = rest?.isAgent ? AGENTTERMS : TERMS

  const validateForm = (values) => {
    const errors = {};

    if (!values.email) errors.email = "Please enter the email address";
    else if (
      !values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      errors.email = "Please enter valid email address";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      if (rest.isAgent) {
        agentAuth.mutate({
          email: values?.email,
          store_name: storeName,
        });
      } else {
        mutate({
          email: values?.email,
          store_name: storeName,
        });
      }
    },
    validateOnChange: true,
    validateOnMount: true,
    validate: validateForm,
  });

  const { mutate, isLoading } = useMutation(
    (formData) => AttemptLogin(formData),
    {
      onSuccess: (res) => {
        if (
          res?.response?.data?.action == "signup" ||
          res?.response?.data?.action == "not_customer"
        ) {
          setPage("register");
          setEmail(formik.values.email);
        } else if (res?.data?.action == "login") {
          setPage("successLink");
          setEmail(formik.values.email);
        } else {
          return toast({
            title: `Oops...`,
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
        const data = err?.response?.data;
        if (data?.action == "signup" || data?.action == "not_customer") {
          setPage("register");
          setEmail(formik.values.email);
        } else if (data?.action == "login") {
          setPage("successLink");
          setEmail(formik.values.email);
        } else {
          return toast({
            title: `Oops...`,
            description: `${
              data?.message ||
              "Something went wrong,we are working to resolve it"
            }`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      },
    }
  );

  const agentAuth = useMutation((formData) => agentLogin(formData), {
    onSuccess: (res) => {
      formik.resetForm();
      if (res?.response?.data?.action === "Pending") {
        toast({
          title: `hmm...`,
          description: `${res?.response?.data?.message}`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
        setPage("approvalPending");
      }
      if (
        res?.response?.data?.action === "signup" ||
        res?.response?.data?.action === "not_customer" ||
        res?.response?.data?.action === "Not Agent"
      ) {
        formik.resetForm();
        setPage("register");
        setEmail(formik.values.email);
      } else if (res?.data?.action == "login") {
        setPage("successLink");
        setEmail(formik.values.email);
        return formik.resetForm();
      } else {
        formik.resetForm();
        return toastForError(res, true, toast);
      }
    },
    onError: (err) => {
      formik.resetForm();
      if (err?.response?.data?.action === "signup") {
        setPage("register");
        setEmail(formik.values.email);
      } else {
        toast({
          description: `${err?.response?.data?.message}`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
      }
    },
  });
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  const isDarkMode = theme.theme_name !== "light";

  return (
    <Box
      maxW={{ lg: "475px" }}
      w={`100%`}
      bg={{ lg: "card_bg" }}
      p={{ lg: "24px" }}
      {...rest}
      boxShadow={{
        lg: "0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
      }}
    >
      <Flex h="full" direction="column" align="start">
        <Text
          fontSize={"20px"}
          pb="20px"
          fontWeight={600}
          color="text"
          fontFamily="Open Sans"
          textTransform={"uppercase"}
          letterSpacing={"0.24px"}
        >
          {rest.isAgent ? `Realtor's Portal` : "Enter your email address"}
        </Text>
        <Stack
          w={`100%`}
          gap={{ base: `24px`, lg: `16px` }}
          mt={`8px`}
          textAlign={`center`}
          align={`start`}
        >
          <FormInput
            // mt="24px"
            type="email"
            name="email"
            id="email"
            lable={"Email address"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            placeholder="Enter your email"
            _placeholder={{ fontSize: "16px", letterSpacing: "0.18px" }}
            fontSize="16px"
            padding={{ base: `12px 14px`, lg: "14px 15px" }}
            height="100%"
            lineHeight="140%"
          />
          <HStack align="start" spacing="0">
            {!checked ? (
              <Image
                src={uncheckIcon.src}
                mr="7px"
                onClick={() => setChecked(true)}
                cursor="pointer"
                alt="uncheck icon"
                boxSize={{ base: "22px", lg: "28px" }}
              />
            ) : (
              <CheckTermsSVG
                mr="7px"
                onClick={() => setChecked(false)}
                cursor="pointer"
                alt="check icon"
                width={{ base: "40px", lg: "48px" }}
              />
            )}
            <Text
              textAlign="left"
              fontWeight="400"
              fontSize={{ base: 14, lg: 16 }}
              color={theme.theme_name !== 'light' ? "matador_text.500" : "matador_text.300"}
              letterSpacing={"-0.32px"}
              lineHeight={"19.2px"}
            >
              By commencing usage, you hereby acknowledge and agree to abide by
              the
              <Link
                cursor="pointer"
                onClick={!privacyPolicy ? (e) => e.preventDefault() : null}
                href={privacyPolicy ? privacyPolicy : "#"}
                target={privacyPolicy ? "_blank" : ""}
                color="primary"
                textDecoration="none"
                _hover={{
                  textDecoration: "none",
                }}
              >
                {" "}
                Privacy Policy
              </Link>{" "}
              &
              <Link
                onClick={!termsAndConditions ? (e) => e.preventDefault() : null}
                href={`${termsAndConditions ? termsAndConditions : ""}`}
                target={termsAndConditions ? "_blank" : ""}
                color="primary"
                _hover={{
                  textDecoration: "none",
                }}
              >
                {" "}
                Terms of Service
              </Link>
            </Text>
          </HStack>
          <Button
            type="submit"
            color="white"
            bg="primary"
            w="full"
            fontSize={{ base: "14px", lg: "16px" }}
            onClick={formik.handleSubmit}
            isLoading={isLoading}
            p="26px"
            isDisabled={!checked || !formik.isValid}
            h="56px"
            _hover={{
              bg: lightenHex(15),
            }}
            rounded={0}
            _active={{
              opacity: 1,
            }}
          >
            <Text
              lineHeight={"28px"}
              letterSpacing="0.18px"
              textTransform="uppercase"
              fontWeight={400}
            >
              Proceed
            </Text>
          </Button>
          {store_data?.agent_active ? (
            <Link display={"contents"} href={rest.isAgent ? "/" : "/agents"}>
              <Button
                type="submit"
                w="full"
                border={`1px solid`}
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : "matador_border_color.100"
                }
                p="21px"
                h="56px"
                bg={isDarkMode ? "matador_background.100" : "card_bg"}
                rounded={0}
                _hover={{
                  bg: "",
                  transform: "none",
                  color: "primary",
                }}
                color={isDarkMode ? "text" : "#344054"}
                fontSize={{ base: "14px", lg: "16px" }}
              >
                <Text
                  letterSpacing="-0.32px"
                  textTransform="uppercase"
                  fontWeight={400}
                >
                  {rest.isAgent
                    ? `sign in as a client`
                    : `Go to realtor's portal`}
                </Text>
              </Button>
            </Link>
          ) : null}
        </Stack>
      </Flex>
    </Box>
  );
};

export default GetStarted;
