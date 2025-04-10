/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  useToast,
  useColorModeValue,
  useToken,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { Formik, useFormik } from "formik";
import { motion } from "framer-motion";
import { DropDown, EditPen } from "../../../components/profileStyles";
import { UploadProfilePicture } from "../../../ui-lib";
import useFormError from "../../../utils/hooks/useFormError";
import { updateAgentSettingsInfo } from "../../../api/agents";
import useLocalStorage from "utils/hooks/useLocalStorage";

const ProfileUpdate = ({ Data, refetch }) => {
  const { handleError, formError } = useFormError();
  const toast = useToast();
  const [active, setActive] = useState("");
  const [gray600, gray500] = useToken("colors", ["gray.600", "gray.500"]);
  const secondaryHoverBorder = useColorModeValue("0", `1px solid ${gray500}`);
  const [isClicked, setIsClicked] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (formData) => updateAgentSettingsInfo(formData),
    {
      onSuccess: async (res) => {
        // await refetch();
        queryClient.invalidateQueries(["agents_settings_data"]);
        await queryClient.refetchQueries(["agents_settings_data"]);
        toast({
          title: "changes updated successfully",
          status: "success",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
        formik.resetForm();

        return setIsClicked(false);
      },
      onError: (res) => {
        // setIsClicked(false);
        // formik.resetForm();
        return toast({
          title:
            res?.message === "Network Error"
              ? "Network Error"
              : "Oops something went wrong",
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            "Something went wrong, we are working on resolving it."
          }`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  const mutation_avatar = useMutation(
    (formData) => updateAgentSettingsInfo(formData),
    {
      onSuccess: async (res) => {
        setIsClicked(false);

        toast({
          title: "changes updated successfully",
          status: "success",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
        return refetch();
      },
      onError: (res) => {
        return toast({
          title:
            res?.message === "Network Error"
              ? "Network Error"
              : "Oops something went wrong",
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            "Something went wrong, we are working on resolving it."
          }`,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  const validateForm = (values) => {
    const errors = {};

    if (
      !values.phone ||
      !(values.phone.length >= 10 && values.phone.length <= 15)
    ) {
      errors.phone = "Invalid input length !";
    } else if (!/^[0-9]+$/.test(values.phone)) {
      errors.phone = "Please Enter Digits Only !";
    } else if (!/^\d+$/.test(values.monthly_income)) {
      errors.monthly_income = "please Enter  Digits only";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      let exp = {};
      for (const [key, value] of Object.entries(values)) {
        let val = value.toString();
        if (val.trim() !== "") {
          exp[key] = value;
        }
      }
      exp = { profile_update: true, ...exp };
      mutation.mutate(exp);
    },
    validate: validateForm,
    validateOnChange: true,
  });

  const handleUpdate = () => {
    setIsClicked(true);
    // return formik.handleSubmit();
    let exp = {};
    for (const [key, value] of Object.entries(formik.values)) {
      let val = value.toString();
      if (val.trim() !== "") {
        exp[key] = value;
      }
    }
    exp = { profile_update: true, ...exp };
    mutation.mutate(exp);
    return formik.handleReset();
  };

  const handleChange = (e, name) => {
    formik.setFieldError(e.target.name, "");
    // handleError(name, e.target.value);
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const handleEdit = (opt) => {
    if (active === opt) {
      return setActive("");
    }

    return setActive(opt);
  };

  const onAvatarChange = async (file) => {
    mutation_avatar.mutate({
      avatar_update: true,
      avatar: file[0]?.image.replace("data:", "").replace(/^.+,/, ""),
    });
    await refetch();
    return;
  };
  const handleBack = () => {
    return router.back();
  };
  const displayNumErr = () =>
    formik.touched.monthly_income && formik.errors.monthly_income
      ? formik.errors.monthly_income
      : null;

  return (
    <Flex
      minW={{ xl: "1200px" }}
      w="100%"
      margin="0 auto"
      direction="column"
      borderRadius="16px"
      border="1px solid #E4E4E4"
      overflow={`hidden`}
    >
      <Formik>
        <FormControl
          as="form"
          bg="#ffffff"
          pb="22px"
          px="22px"
          onSubmit={formik.handleSubmit}
          w="100%"
        >
          <VStack
            width="100%"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            mt="36px"
          >
            <UploadProfilePicture
              containerStyle={{
                width: "max-content",
                margin: "14px",
              }}
              id="avatar"
              name="avatar"
              setFiles={onAvatarChange}
              isAvatarLoading={mutation_avatar.isLoading}
              avatar={Data?.avatar}
              numOfFiles={1}
              isProfilePic
            />
          </VStack>

          <Grid
            gap="20px"
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            spacing="20px"
            columns={{ base: 1, md: 3 }}
          >
            <GridItem colSpan={{ base: 2, md: 1 }} w="full">
              <FormLabel>Full Name</FormLabel>
              <Flex
                height="50px"
                border="0.5px solid #747474"
                borderRadius="5px"
                align="center"
              >
                <Input
                  placeholder={`${Data?.first_name ?? "Full Name"} ${
                    Data?.middle_name ?? ""
                  } ${Data?.last_name ?? ""}`}
                  type="text"
                  w="100%"
                  border="none"
                  fontWeight="400"
                  fontSize="20px"
                  lineHeight=" 25px "
                  required
                  color="black"
                  disabled={true}
                  _placeholder={{ textTransform: `capitalize` }}
                />
              </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }} w="full">
              <FormLabel>Email Address</FormLabel>
              <Flex
                height="50px"
                border="0.5px solid #747474"
                borderRadius="5px"
                align="center"
              >
                <Input
                  placeholder={Data?.email ?? "email"}
                  type="email"
                  required
                  w="100%"
                  border="none"
                  fontWeight="400"
                  fontSize="20px"
                  lineHeight=" 25px "
                  color="black"
                  disabled={true}
                />
              </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }} w="full">
              <FormLabel>Phone Number</FormLabel>

              <Flex
                px="20px"
                height="50px"
                border="0.5px solid #747474"
                borderRadius="5px"
                align="center"
              >
                <Input
                  px="0"
                  placeholder={Data?.phone || "phone number"}
                  onChange={(e) => handleChange(e, "phone")}
                  onBlur={(e) => {
                    if (!e.target.value.trim()) {
                      const { phone, ...rest } = formik.values;
                      formik.setValues(rest);
                    }
                    handleError("phone", e.target.value);
                  }}
                  type="number"
                  name="phone"
                  _placeholder={{ color: "#CBCBCB" }}
                  _disabled={{
                    color: "#000000",
                    "&::placeholder": { color: "#000000" },
                  }}
                  _focus={{
                    outline: "none",
                    border: "none",
                    boxShadow: "none",
                  }}
                  value={formik.values.phone}
                  required
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  border="none"
                  fontWeight="400"
                  fontSize="20px"
                  lineHeight=" 25px "
                  color="black"
                  onFocus={() => handleEdit("phone number")}
                  bg={"transparent"}
                  id="phone number"
                />

                <EditPen name="phone number" />
              </Flex>
              <Text
                textStyle="p-sm"
                textAlign="start"
                fontSize={"14px"}
                color="red"
              >
                {formError.phone ?? ""}
              </Text>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }} w="full">
              <FormLabel>Date of Birth</FormLabel>
              <Box
                px="20px"
                w="100%"
                height="50px"
                border="0.5px solid #747474"
                borderRadius="5px"
              >
                <Input
                  px="0"
                  onChange={formik.handleChange}
                  type="date"
                  value={Data?.date_of_birth}
                  required
                  border="none"
                  fontWeight="400"
                  fontSize="20px"
                  lineHeight=" 25px"
                  color="black"
                  disabled={true}
                />
              </Box>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }} w="full">
              <FormLabel>Marital Status</FormLabel>
              <Box
                height="50px"
                border="0.5px solid #747474"
                onClick={() => setActive("marital status")}
                borderRadius="5px"
              >
                <Select
                  name="marital_status"
                  defaultValue={Data?.marital_status}
                  onChange={formik.handleChange}
                  h="50px"
                  type="number"
                  value={formik.values.marital_status}
                  border="none"
                  required
                  fontWeight="400"
                  fontSize="20px"
                  icon={<DropDown />}
                  lineHeight=" 25px "
                  color="black"
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="domestic partnership">
                    Domestic Partnership
                  </option>
                  <option value="widowed">Widowed</option>
                  <option value="divorced">Divorced</option>
                </Select>
              </Box>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }} w="full">
              <FormLabel>Highest Education Level</FormLabel>
              <Box
                w="100%"
                height="50px"
                border="0.5px solid #747474"
                borderRadius="5px"
                onClick={() => setActive("Education")}
              >
                <Select
                  defaultValue={Data?.highest_education ?? "Highest Education"}
                  _placeholder={{ color: "#CBCBCB" }}
                  _disabled={{
                    color: "black",
                    "&::placeholder": { color: "#000000" },
                  }}
                  name="highest_education"
                  onChange={formik.handleChange}
                  border="none"
                  fontWeight="400"
                  fontSize="20px"
                  lineHeight=" 25px "
                  h="50px"
                  icon={<DropDown />}
                  value={formik.values.highest_education}
                  color="black"
                  onFocus={() => handleEdit("Education")}
                >
                  <option disabled value="Highest Education">
                    Highest Education
                  </option>

                  <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                  <option value="Masters Degree">Masters Degree</option>
                  <option value="High School Diploma">
                    High School Diploma
                  </option>
                  <option value="Post - Secondary Certificate">
                    Post - Secondary Certificate
                  </option>
                  <option value="PHD">PHD</option>
                </Select>
              </Box>
            </GridItem>
            <GridItem colSpan={2} w="full">
              <FormLabel>Residential Address</FormLabel>
              <Flex
                px="20px"
                w="100%"
                height="50px"
                border="0.5px solid #747474"
                borderRadius="5px"
                align="center"
              >
                <Input
                  px="0"
                  placeholder={Data?.address || "residential address"}
                  _placeholder={{ color: "#CBCBCB" }}
                  _disabled={{
                    color: "#000000",
                    "&::placeholder": { color: "#000000" },
                  }}
                  name="address"
                  onChange={formik.handleChange}
                  type="text"
                  bg={"transparent"}
                  border="none"
                  _focus={{
                    outline: "none",
                    border: "none",
                    boxShadow: "none",
                  }}
                  onBlur={(e) => {
                    if (!e.target.value.trim()) {
                      const { address, ...rest } = formik.values;
                      formik.setValues(rest);
                    }
                  }}
                  required
                  fontWeight="400"
                  fontSize="20px"
                  value={formik.values.address}
                  lineHeight=" 25px "
                  color="#000000"
                  onFocus={() => handleEdit("address")}
                />

                <EditPen name="address" />
              </Flex>
            </GridItem>{" "}
            <GridItem colSpan={{ base: 2, md: 1 }} w="full">
              <FormLabel>Company Name</FormLabel>
              <Flex
                px="20px"
                height="50px"
                border="0.5px solid #747474"
                borderRadius="5px"
                align="center"
              >
                <Input
                  placeholder={Data?.company_name || "Company Name"}
                  _placeholder={{
                    color: "#CBCBCB",
                    textTransform: "capitalize",
                  }}
                  _disabled={{
                    color: "#000000",
                    "&::placeholder": { color: "#000000" },
                  }}
                  onChange={formik.handleChange}
                  type="text"
                  name="company_name"
                  px="0"
                  bg={"transparent"}
                  border="none"
                  value={formik.values.company_name}
                  fontWeight="400"
                  required
                  fontSize="20px"
                  lineHeight=" 25px "
                  color="black"
                  onFocus={() => handleEdit("company")}
                  outline="none"
                  _focus={{
                    outline: "none",
                    border: "none",
                    boxShadow: "none",
                  }}
                  onBlur={(e) => {
                    if (!e.target.value.trim()) {
                      const { company_name, ...rest } = formik.values;
                      formik.setValues(rest);
                    }
                  }}
                />

                <EditPen name="company" />
              </Flex>
            </GridItem>
            <GridItem colSpan={2} w="full">
              <FormLabel>Company Address</FormLabel>
              <Flex
                px="20px"
                height="50px"
                border="0.5px solid #747474"
                borderRadius="5px"
                align="center"
              >
                <Input
                  placeholder={Data?.company_address || "Company address"}
                  _placeholder={{
                    color: "#CBCBCB",
                    textTransform: `capitalize`,
                  }}
                  _disabled={{
                    color: "#000000",
                    "&::placeholder": { color: "#000000" },
                  }}
                  onChange={formik.handleChange}
                  type="text"
                  px="0"
                  name="company_address"
                  bg={"transparent"}
                  border="none"
                  value={formik.values.company_address}
                  fontWeight="400"
                  fontSize="20px"
                  required
                  lineHeight=" 25px "
                  color="black"
                  onFocus={() => handleEdit("com address")}
                  _focus={{
                    outline: "none",
                    border: "none",
                    boxShadow: "none",
                  }}
                  onBlur={(e) => {
                    if (!e.target.value.trim()) {
                      const { company_address, ...rest } = formik.values;
                      formik.setValues(rest);
                    }
                  }}
                />
                <EditPen name="com address" />
              </Flex>
            </GridItem>
          </Grid>

          <HStack justify="flex-end">
            <Button
              mt="15px"
              minH={"47px"}
              maxW={391}
              type="submit"
              fontWeight={600}
              fontSize="16px"
              _active={{
                opacity: 0.8,
              }}
              color="white"
              bg="black"
              w="183px"
              isDisabled={
                formError.phone ||
                !Object.keys(formik.values).length ||
                isClicked
              }
              borderRadius={"10px"}
              _hover={{
                shadow: "md",
                border: secondaryHoverBorder,
              }}
              isLoading={mutation.isLoading}
              onClick={handleUpdate}
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Update
              </motion.button>
            </Button>
          </HStack>
        </FormControl>
      </Formik>
    </Flex>
  );
};

export default ProfileUpdate;
