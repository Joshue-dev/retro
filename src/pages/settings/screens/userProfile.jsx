import {
  Box,
  FormLabel,
  GridItem,
  Heading,
  HStack,
  Image,
  InputGroup,
  SimpleGrid,
  Stack,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  Button,
  FormInput,
  FormSelect,
  PhoneInput,
  UploadProfilePicture,
} from "ui-lib/ui-lib.components";
import { dayMonthYearSlash, formatDateStringDayFirst, isValidDate } from "utils/formatDate";
import UtilityBill from "../sections/UtilityBill";
import Documents from "../sections/Documents";
import pencil from "../../../images/icons/pencil.svg";
import { useMutation } from "react-query";
import { updateSettings } from "@/api/Settings";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "utils/capitalizeFirstLetter";
import useFormHasChanged from "utils/hooks/useFormHasChanged";

const UserProfile = ({ profileQuery }) => {
  const theme = useTheme();
  const [initialValues, setInitialValues] = useState({});
  const toast = useToastForRequest();
  const isDarkMode = theme.theme_name !== "light";

  useEffect(() => {
    if (profileQuery?.isSuccess) {
      const values = {
        date_of_birth: profileQuery?.data?.data?.data?.date_of_birth
          ? dayMonthYearSlash(profileQuery.data?.data?.data?.date_of_birth)
          : "",
        gender: profileQuery.data?.data?.data?.gender
          ? capitalizeFirstLetter(profileQuery?.data?.data?.data?.gender)
          : "",
        email: profileQuery.data?.data?.data?.email || "",
        marital_status: profileQuery.data?.data?.data?.marital_status || "",
        phone: profileQuery.data?.data?.data?.phone || "",
        highest_education:
          profileQuery.data?.data?.data?.highest_education ?? "",
        employment_status:
          profileQuery.data?.data?.data?.employment_status || "",
        company_name: profileQuery.data?.data?.data?.company_name || "",
        occupation: profileQuery.data?.data?.data?.occupation || "",
        monthly_income:
          profileQuery.data?.data?.data?.monthly_income?.toLocaleString() || "",
        address: profileQuery.data?.data?.data?.address || "",
        company_address: profileQuery.data?.data?.data?.company_address || "",
        currency: profileQuery.data?.data?.currency || "",
      };
      setInitialValues(values);
      formik.setValues(values);
    }
  }, [profileQuery?.isSuccess, profileQuery?.isLoading]);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let exp = {};
      for (const [key, value] of Object.entries(values)) {
        if (
          [
            "first_name",
            "last_name",
            "email",
            "avatar",
            "phone",
            "date_of_birth",
          ].includes(key)
        ) {
          continue; // Skip these keys
        }
        let val = value?.toString();
        if (val.trim() !== "") {
          exp[key] = value;
        }
      }

      if (exp?.monthly_income) {
        exp.monthly_income = parseFloat(exp.monthly_income.replace(/,/g, ""));
      }
      exp = { profile_details: true, ...exp };
      mutation.mutate(exp);
    },
    // validate: validateForm,
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,
  });

  const handleInput = (e) => {
    const inputValue = e.target?.value?.replace(/,/g, "");
    const parsedValue = parseInt(inputValue, 10);

    if (!isNaN(parsedValue)) {
      const formatNumber = parsedValue.toLocaleString();
      formik.setFieldError("monthly_income", "");
      formik.setFieldValue("monthly_income", formatNumber);
    } else {
      formik.setFieldValue("monthly_income", "");
    }
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

  const handleDate = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");

    const formattedValue = formatDateStringDayFirst(numericValue);

    if (!inputValue.trim()) {
      formik.setValues({
        ...formik.values,
        date_of_birth: "", // Set to empty string when input is cleared
      });
    } else {
      formik.setValues({
        ...formik.values,
        date_of_birth: formattedValue,
      });

      // Validate the formatted date
      const [d, m, y] = formattedValue.split("/");
      if (!isValidDate(d, m, y)) {
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
    }

    formik.setFieldTouched("date_of_birth");
  };

  const mutation = useMutation((forlgata) => updateSettings(forlgata), {
    onSuccess: async () => {
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
      toastForError(err, toast, mutation?.isError);
    },
  });

  const hasChanged = useFormHasChanged(initialValues, formik.values);

  return (
    <Stack w="full" gap={{ base: "32px", md: "24px" }}>
    <SimpleGrid
      columns={{ base: 1, lg: 3 }}
      spacing={{ base: "5px", lg: "19px" }}
      justifyContent={"space-between"}
    >
      <GridItem colSpan={1} mb={{ base: "7px", lg: "30px" }}>
        <Text
          fontFamily="Noto Sans"
          fontSize={{ base: "16px", md: "20px", lg: "23px" }}
          fontWeight={"600"}
          textTransform={"uppercase"}
        >
          tell us more about you
        </Text>
      </GridItem>
      <GridItem
        colSpan={{ base: 1, lg: 2 }}
        p={{ md: "24px" }}
        border={{ md: "1.3px solid" }}
        borderColor={{
          md: isDarkMode
            ? "matador_border_color.200"
            : "matador_border_color.300",
        }}
        borderRadius={"16px"}
        bg={{ md: isDarkMode ? "matador_background.200" : "card_bg" }}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: "24px", lg: "18px" }}
        >
          <PhoneInput
            label="Phone number"
            type="phone"
            onChange={formik.handleChange("phone")}
            value={formik.values.phone}
            placeholder={"Enter phone number"}
            disabled
            formik={formik}
            borderColor={
              isDarkMode
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
          />
          <FormSelect
            options={["Male", "Female", "Rather not say"]}
            label="Gender"
            type="text"
            onChange={formik.handleChange("gender")}
            value={formik.values.gender}
            place="Gender"
            borderColor={
              isDarkMode
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
            disabled
          />
          <FormSelect
            options={[
              "Married",
              "Single",
              "Divorced",
              "Widowed",
              "Rather not say",
            ]}
            label="Marital Status"
            type="text"
            onChange={formik.handleChange("marital_status")}
            value={formik.values.marital_status}
            place="Marital Status"
            borderColor={
              isDarkMode
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
          />
          <FormInput
            label="Date of Birth"
            type="text"
            onChange={handleDate}
            onBlur={handleBlur}
            placeholder="DD/MM/YYYY"
            value={formik.values.date_of_birth}
            disabled={profileQuery?.data?.data?.data?.date_of_birth}
            borderColor={
              isDarkMode
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
          />
          <InputGroup>
            <FormInput
              label="Residential Address"
              type="text"
              onChange={formik.handleChange("address")}
              value={formik.values.address}
              placeholder="Residential Address"
              borderColor={
                isDarkMode
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
            />
            <Image
              boxSize="20px"
              position="absolute"
              right={{ base: 4, lg: 10 }}
              top={{ base: "3.5rem", lg: "4.5rem" }}
              src={pencil.src}
              alt=""
            />
          </InputGroup>
          <FormSelect
            label="Highest Education Level"
            type="text"
            onChange={formik.handleChange("highest_education")}
            value={formik.values.highest_education}
            place="Highest Education Level"
            options={[
              "High School Diploma",
              `Bachelor's Degree`,
              "Post-Secondary Certificate",
              "Some college",
              `Master's Degree`,
              "PHD",
            ]}
            borderColor={
              isDarkMode
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
          />
          <FormSelect
            label="Employment Status"
            type="text"
            onChange={formik.handleChange("employment_status")}
            value={formik.values.employment_status}
            place="Employment Status"
            options={["Employed", "Unemployed", "Self employed"]}
            borderColor={
              isDarkMode
                ? "matador_border_color.200"
                : "matador_border_color.100"
            }
          />
          <InputGroup>
            <FormInput
              label="Company Name"
              type="text"
              onChange={formik.handleChange("company_name")}
              value={formik.values.company_name}
              placeholder="Company's Name"
              borderColor={
                isDarkMode
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
            />
            <Image
              boxSize="20px"
              position="absolute"
              right={{ base: 4, lg: 10 }}
              top={{ base: "3.5rem", lg: "4.5rem" }}
              src={pencil.src}
              alt=""
            />
          </InputGroup>
          <InputGroup>
            <FormInput
              label="Occupation"
              type="text"
              onChange={formik.handleChange("occupation")}
              value={formik.values.occupation}
              placeholder="Occupation"
              borderColor={
                isDarkMode
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
            />
            <Image
              boxSize="20px"
              position="absolute"
              right={{ base: 4, lg: 10 }}
              top={{ base: "3.5rem", lg: "4.5rem" }}
              src={pencil.src}
              alt=""
            />
          </InputGroup>
          <InputGroup>
            <FormInput
              label="Monthly Income"
              type="amount"
              onChange={handleInput}
              value={formik.values.monthly_income}
              placeholder="Monthly Income"
              borderColor={
                isDarkMode
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
              formik={formik}
            />
            <Image
              boxSize="20px"
              position="absolute"
              right={{ base: 4, lg: 10 }}
              top={{ base: "3.5rem", lg: "4.5rem" }}
              src={pencil.src}
              alt=""
            />
          </InputGroup>
          <GridItem colSpan={{ md: 2 }}>
            <InputGroup>
              <FormInput
                label="Company Address"
                type="text"
                onChange={formik.handleChange("company_address")}
                value={formik.values.company_address}
                placeholder="Company Address"
                borderColor={
                  isDarkMode
                    ? "matador_border_color.200"
                    : "matador_border_color.100"
                }
              />
              <Image
                boxSize="20px"
                position="absolute"
                right={{ base: 4, lg: 10 }}
                top={{ base: "3.5rem", lg: "4.5rem" }}
                src={pencil.src}
                alt=""
              />
            </InputGroup>
          </GridItem>
          <GridItem colSpan={{ md: 2 }}>
            <FormLabel fontSize={{ base: "14px", md: "16px" }} color="text" fontWeight={500}>
              Upload Utility Bill
            </FormLabel>
            <UtilityBill />
          </GridItem>
          <GridItem colSpan={{ md: 2 }}>
            <FormLabel fontSize={{ base: "14px", md: "16px" }} color="text" fontWeight={500}>
              Upload ID
            </FormLabel>
            <Documents />
          </GridItem>
        </SimpleGrid>
      </GridItem>
    </SimpleGrid>
    <Button
      alignSelf="end"
      onClick={formik.handleSubmit}
      isLoading={mutation.isLoading || profileQuery?.isLoading}
      isDisabled={!hasChanged}
      color="white"
      bg="primary"
      w={{ base: "full", lg: "200px" }}
      type="submit"
      h="48px"
      fontSize={{ base: '14px', md: '16px' }}
      fontWeight={400}
      textTransform={"uppercase"}
    >
      Update
    </Button>
  </Stack>
  );
};

export default UserProfile;
