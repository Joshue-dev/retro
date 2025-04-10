import React, { useEffect, useState } from "react";
import {
  GridItem,
  Image,
  SimpleGrid,
  Text,
  Stack,
  useTheme,
  InputGroup,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Button, FormInput, FormSelect, PhoneInput } from "../../../ui-lib";
import pencil from "../../../images/pencil.png";
import { updateSettings } from "../../../api/Settings";
import { useMutation } from "react-query";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { toastForError } from "utils/toastForErrors";
import useFormHasChanged from "utils/hooks/useFormHasChanged";

const NextOfKin = ({ next_of_kinQuery }) => {
  const theme = useTheme();
  const isDarkMode = theme.theme_name !== "light";
  const [initialValues, setInitialValues] = useState({});
  const toast = useToastForRequest();

  useEffect(() => {
    if (next_of_kinQuery?.isSuccess) {
      const values = {
        first_name: next_of_kinQuery?.data?.data?.data?.first_name || "",
        last_name: next_of_kinQuery?.data?.data?.data?.last_name || "",
        email: next_of_kinQuery?.data?.data?.data?.email || "",
        phone: next_of_kinQuery?.data?.data?.data?.phone || "",
        relationship: next_of_kinQuery?.data?.data?.data?.relationship || "",
        residential_address: next_of_kinQuery?.data?.data?.data?.residential_address || "",
      };
      setInitialValues(values);
      formik.setValues(values);
    }
  }, [next_of_kinQuery?.isSuccess]);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let exp = {};
      for (const [key, value] of Object.entries(values)) {
        let val = value.toString();
        if (val.trim() !== "") {
          exp[key] = value;
        }
      }
      exp = { next_of_kin: true, ...exp };
      mutation.mutate(exp);
    },
    validateOnChange: true,
  });

  const mutation = useMutation((forlgata) => updateSettings(forlgata), {
    onSuccess: async (res) => {
      toast({
        title: "changes updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      next_of_kinQuery?.refetch();
    },
    onError: (err) => {
      toastForError(err, toast, mutation?.isError);
    },
  });

  const hasChanged = useFormHasChanged(initialValues, formik.values)

  return (
    <Stack w='full' gap='24px'>
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        spacing={{ base: "5px", lg: "19px" }}
        justifyContent={"space-between"}
      >
        <GridItem colSpan={1} mb={{ base: "7px", lg: "30px" }} maxW="413px">
          <Text
            fontSize={{ base: "16px", md: "20px", lg: "23px" }}
            fontWeight={600}
            textTransform={"uppercase"}
          >
            next of kin
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
          bg={{ md: isDarkMode ? "matador_background.200" : "none" }}
        >
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: "24px", lg: "18px" }}
          >
            <InputGroup>
              <FormInput
                type="text"
                label="First Name"
                value={formik.values.first_name}
                onChange={formik.handleChange("first_name")}
                placeholder="First Name"
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
                type="text"
                label="Last Name"
                value={formik.values.last_name}
                onChange={formik.handleChange("last_name")}
                placeholder="Last Name"
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
                label="Email address"
                type="email"
                onChange={formik.handleChange("email")}
                value={formik.values.email}
                placeholder={"Email Address"}
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
            <PhoneInput
                        label="Phone number"
                        type="phone"
                        onChange={formik.handleChange("phone")}
                        value={formik.values.phone}
                        placeholder={"Enter phone number"}
                        formik={formik}
                        borderColor={
                          isDarkMode
                            ? "matador_border_color.200"
                            : "matador_border_color.100"
                        }
                      />
            <FormSelect
              options={["Father", "Mother", "Brother", "Sister", "Partner"]}
              label="Relationship"
              type="text"
              onChange={formik.handleChange("relationship")}
              value={formik.values.relationship}
              placeholder="Relationship"
              borderColor={
                isDarkMode
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
            />
            <GridItem colSpan={{ md: 2 }}>
              <InputGroup>
                <FormInput
                  label="Residential Address"
                  type="text"
                  onChange={formik.handleChange("residential_address")}
                  value={formik.values.residential_address}
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
            </GridItem>
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
      <Button
        float="right"
        onClick={formik.handleSubmit}
        isLoading={mutation?.isLoading || next_of_kinQuery?.isLoading}
        isDisabled={!hasChanged}
        color="white"
        bg="primary"
        w={{ base: "full", lg: "200px" }}
        type="submit"
        h="48px"
        fontSize={{ base: '14px', md: '16px' }}
        alignSelf="end"
        fontWeight={400}
        textTransform={"uppercase"}
      >
        Update
      </Button>
    </Stack>
  );
};

export default NextOfKin;
