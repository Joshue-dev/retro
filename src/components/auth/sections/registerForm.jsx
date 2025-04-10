import React, { useState } from "react";
import { Box, Flex, Stack, Text, useTheme } from "@chakra-ui/react";
import {
  Button,
  FormInput,
  PhoneInput,
} from "../../../ui-lib/ui-lib.components";
import { useMutation } from "react-query";
import { AttemptLogin, registerUser } from "../../../api/auth";
import { useRouter } from "next/router";
import { store_name } from "../../../constants/routes";
import { useFormik } from "formik";
import { formatDateStringDayFirst, isValidDate } from "utils/formatDate";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { useLightenHex } from "utils/lightenColorShade";
import useLocalStorage from "utils/hooks/useLocalStorage";

const RegisterForm = ({ onAuthClose, email, setPage, setEmail, ...rest }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  const isDarkMode = theme.theme_name !== "light";
  const toast = useToastForRequest();
  const router = useRouter();
  const { ref_id } = router.query;
  const [baseCountry] = useLocalStorage("baseCountry");
  const [country, setCountry] = useState(baseCountry);
  const storeName = store_name();
  const loginForRegister = useMutation((formData) => AttemptLogin(formData), {
    onSuccess: (res) => {
      if (res?.response?.data?.action == "signup") {
      } else if (res?.data?.action == "login") {
        setPage("successLink");
        setEmail(email);
        // return
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
    (formData) => {
      const data = ref_id
        ? {
            ref_id: ref_id,
            store_name: storeName,
            email: email,
            ...formData,
          }
        : {
            store_name: storeName,
            email: email,
            ...formData,
          };
      return registerUser(data);
    },
    {
      onSuccess: (res) => {
        if (res?.status == 200) {
          formik.resetForm();
          if (ref_id) {
            return loginForRegister.mutate({
              email: email,
              store_name: storeName,
            });
          } else {
            setPage("thankYou");
            setEmail(email);
          }
        } else {
          toast({
            title: "Oops ...",
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
          title: "Oops ...",
          description: `${
            err?.response?.data?.message ??
            err?.response?.message ??
            err?.message ??
            "Something went wrong,we are working to resolve it"
          }`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return formik.resetForm();
      },
    }
  );

  const handleDate = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");

    const formattedValue = formatDateStringDayFirst(numericValue);

    if (!e.target.value.trim()) {
      const { date_of_birth, ...rest } = formik.values;
      return formik.setValues(rest);
    }
    formik.setValues({
      ...formik.values,
      date_of_birth: formattedValue,
    });
    formik.setErrors({
      ...formik.errors,
      date_of_birth: "",
    });
  };

  const validateForm = (values) => {
    const errors = {};
    const date = new Date();

    if (!values.first_name) {
      errors.first_name = "Please enter your First Name";
    }

    // Validate last_name
    if (!values.last_name) {
      errors.last_name = "Please enter your Last Name";
    }

    if (!values.phone) {
      errors.phone = "Please enter your phone number";
    }

    if (values?.date_of_birth) {
      const [d, m, y] = values?.date_of_birth?.split("/");
      const inputDate = new Date(`${y}-${m}-${d}`);

      if (isNaN(inputDate?.getTime()))
        errors.date_of_birth = "Invalid Date format";

      if (inputDate > date)
        errors.date_of_birth = "Hmm, date selected can't be in the future";

      if (!isValidDate(d, m, y)) errors.date_of_birth = "Invalid date";
    }

    if (!values?.date_of_birth)
      errors.date_of_birth = "Please enter a date of birth";

    if (!values.gender) {
      errors.gender = "Please select a title";
    }
    return errors;
  };

  const handleBlur = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    const month = numericValue.substr(0, 2);
    const day = numericValue.substr(2, 2);
    const year = numericValue.substr(4);

    if (numericValue.length === 10 && !isValidDate(day, month, year)) {
      formik.setErrors({
        ...formik.errors,
        date_of_birth: "Please enter a valid date",
      });
    } else {
      formik.setErrors({
        ...formik.errors,
        date_of_birth: "",
      });
    }

    formik.setFieldTouched("date_of_birth");
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      date_of_birth: "",
    },
    onSubmit: (values) => {
      if (rest.isAgent) {
        localStorage.setItem("agentDetails", JSON.stringify(formik.values));
        setPage("personalInfo");
      } else {
        mutate(values);
      }
    },
    validateOnChange: true,
    validateOnMount: true,
    validate: validateForm,
  });

  return (
    <Box
      maxW={{ md: "533px" }}
      w={`100%`}
      bg={{ md: "card_bg" }}
      p={{ md: "24px" }}
      {...rest}
      mt={{ base: 4, md: 0 }}
    >
      <Flex h="full" direction="column" align="start">
        <Text
          color="text"
          fontSize={{ base: "20px", md: "22px" }}
          fontWeight={600}
          mt="0px"
          letterSpacing="0.24px"
          fontFamily="Open Sans"
          textTransform="uppercase"
          whiteSpace={{ md: "nowrap" }}
          mb="20px"
        >
          {rest.isAgent
            ? `Let's get to know you`
            : `Tell us more about yourself`}
        </Text>
        <Stack
          w={`100%`}
          gap={{ base: `24px`, md: `16px` }}
          mt={`8px`}
          textAlign={`center`}
          align={`center`}
        >
          <FormInput
            h="56px"
            w="full"
            px="18px"
            type="title"
            error={formik.touched.first_name && formik.errors.first_name}
            onChange={formik.handleChange("first_name")}
            value={formik.values.first_name}
            placeholder="Legal First Name"
            _placeholder={{
              fontSize: "16px",
              letterSpacing: "0.18px",
              fontWeight: 400,
            }}
            formik={formik}
            borderColor={
              isDarkMode
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
            flex={1}
          />
          <FormInput
            h="56px"
            w="full"
            px="18px"
            type="text"
            onChange={formik.handleChange("middle_name")}
            value={formik.values.middle_name}
            placeholder="Legal Middle Name (optional)"
            _placeholder={{
              fontSize: "16px",
              letterSpacing: "0.18px",
              fontWeight: 400,
            }}
            borderColor={
              isDarkMode
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
          />
          <FormInput
            h="56px"
            w="full"
            px="18px"
            type="text"
            error={formik.touched.last_name && formik.errors.last_name}
            onChange={formik.handleChange("last_name")}
            value={formik.values.last_name}
            placeholder="Legal Last Name"
            _placeholder={{
              fontSize: "16px",
              letterSpacing: "0.18px",
              fontWeight: 400,
            }}
            borderColor={
              isDarkMode
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
          />
          <PhoneInput
            borderColor={
              isDarkMode
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
            value={country}
            formik={formik}
            h='56px'
            placeholder='Enter Phone Number'
          />
          <Box w="full">
            <FormInput
              type="text"
              onChange={handleDate}
              placeholder="DD/MM/YYYY"
              error={
                formik.touched.date_of_birth && formik.errors.date_of_birth
              }
              value={formik.values.date_of_birth}
              fontSize={15}
              borderColor={
                isDarkMode
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
              h="56px"
              onBlur={handleBlur}
            />
          </Box>
          <Button
            type="submit"
            color="white"
            bg="primary"
            w="full"
            fontSize={{ base: "14px", md: "16px" }}
            onClick={formik.handleSubmit}
            isLoading={isLoading}
            p="26px"
            isDisabled={!formik.isValid}
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
        </Stack>
      </Flex>
    </Box>
  );
};

export default RegisterForm;
