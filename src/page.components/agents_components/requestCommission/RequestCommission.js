import React, { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import {
  useToast,
  Input,
  Button,
  Text,
  useDisclosure,
  Box,
  Flex,
  InputGroup,
  Textarea,
  ModalCloseButton,
  HStack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  ModalHeader,
  DrawerHeader,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "react-query";
import { fetchAllListings, requestCommission } from "../../../api/agents";
import ListingInfo from "./ListingInfo";
import RequestSuccess from "./RequestSuccess";
import MenuForListings from "./MenuForListings";
import { RequestWrap } from "./styledForCommission";
import RequestComissionIcon from "/src/images/icons/mobile_nav/mobile_commission_request_icon.svg";
import { isValidDate } from "utils/formatDate";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { formatDateStringDayFirst } from "utils/formatDate";
import useFormError from "utils/hooks/useFormError";

const RequestCommissionContent = ({ onClose = () => {} }) => {
  const { handleError, formError } = useFormError();
  const [listingId, setListingId] = useState("");
  const [listingName, setListingName] = useState("");
  const [willDisplay, setWillDisplay] = useState(false);
  const dateInput = useRef(null);

  const {
    isOpen: successIsOpen = true,
    onOpen: successOnOpen,
    onClose: successOnClose,
  } = useDisclosure();

  const {
    data,
    isError: err,
    isLoading: load,
  } = useQuery(["allListingsAgent", ""], () => fetchAllListings());

  const toast = useToast();

  const mutation = useMutation((formData) => requestCommission(formData), {
    onSuccess: () => {
      setWillDisplay(true);
      setListingId("");
      formik.handleReset();
      onClose();
      // successOnOpen();
      toast({
        title: "Success",
        description: "Commission Request sent successfully!",
        status: "success",
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (error) => {
      toast({
        title: "Oops...",
        description: `${
          error?.response?.data?.message ??
          error?.response?.message ??
          "Something went wrong,we are working on resolving it"
        }`,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const validateForm = (values) => {
    const errors = {};
    const date = new Date();
    console.log(values.inputDate);
    // const input_date_arr = values.inputDate?.split('/');

    const [d, m, y] = values.inputDate.split("/");
    const inputDate = new Date(`${y}-${m}-${d}`);

    if (
      !values?.client_email?.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      )
    )
      errors.client_email = "Please enter a valid email address";

    if (isNaN(inputDate?.getTime())) errors.date_sold = "Invalid Date format";

    if (inputDate > date)
      errors.date_sold = "Hmm, date selected can't be in the future";

    // if (!/^\d+$/.test(formik.values.quantity)) errors.quantity = 'invalid format';
    // const date_arr = date.toLocaleDateString().split('/');

    if (!isValidDate(d, m, y)) errors.date_sold = "Invalid date";

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      search: "",
      client_email: "",
      date_sold: "",
      listingId: "",
      bundle_id: "",
      inputDate: "",
      note: "",
      // quantity: '',
    },

    onSubmit: (values) => {
      // const {date_sold, note, quantity, client_email, bundle_id} = values;
      const { date_sold, note, client_email, bundle_id } = values;
      const new_date_arr = date_sold?.split("/");
      const new_date_string = `${new_date_arr[2]}-${new_date_arr[1]}-${new_date_arr[0]}`;
      return mutation.mutate({
        date_sold: new_date_string,
        note,
        quantity: 1,
        email: client_email,
        bundle_id: ~~bundle_id,
      });
    },
    validateOnChange: true,
    validate: validateForm,
  });

  const isValid =
    !formik.errors.date_sold &&
    formik.values.date_sold &&
    !formError.email &&
    !!formik.values.bundle_id.trim();
  // &&!formError.quantity;

  const handleDate = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");

    const formattedValue = formatDateStringDayFirst(numericValue);

    if (!e.target.value.trim()) {
      const { date_sold, ...rest } = formik.values;
      return formik.setValues(rest);
    }
    formik.setValues({
      ...formik.values,
      date_sold: formattedValue,
      inputDate: formattedValue,
    });
    formik.setErrors({
      ...formik.errors,
      date_sold: "",
    });
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
        date_sold: "Please enter a valid date",
      });
    } else {
      formik.setErrors({
        ...formik.errors,
        date_sold: "",
      });
    }

    formik.setFieldTouched("date_sold");
  };

  const getProject = (projId) =>
    data?.data?.project &&
    data?.data?.project?.filter((item) => item.id == projId);
  const projects = data?.data?.project;

  return (
    <Box fontFamily="Euclid Circular B">
      <Box>
        <Box w="full" spacing="none">
          <Flex
            direction={{ base: "column", md: "row" }}
            w={"full"}
            align={"center"}
            gap={4}
          >
            <Box w="full">
              <Text color="#3D3D3D" textAlign="start" w="full" fontWeight="500">
                Select the listing
              </Text>
              <MenuForListings
                err={err}
                listings={projects}
                isLoading={load}
                setListingId={setListingId}
                listingName={listingName}
                setListingName={setListingName}
              />
            </Box>
            <Box w={"full"}>
              <Text color="#3D3D3D" textAlign="start" w="full" fontWeight="500">
                Select a unit
              </Text>
              <ListingInfo
                listingId={listingId}
                listing={getProject(listingId)}
                formik={formik}
              />
            </Box>
          </Flex>
          <Box
            display={"flex"}
            flexDirection="column"
            gap={4}
            mt="20px"
            as="form"
            w="full"
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              align={"center"}
              gap={6}
            >
              <Flex direction={"column"} gap={2} w={"full"}>
                <Input
                  p={6}
                  onChange={formik.handleChange}
                  value={formik.values.client_email}
                  onBlur={(e) => handleError("email", e.target.value)}
                  name="client_email"
                  border="1px solid #606060"
                  borderRadius="8px"
                  placeHolder="Subscriber’s email address"
                  _placeHolder={{ color: "#919191" }}
                  _hover={{ border: "1px solid #606060" }}
                  _focusVisible={{ outline: "none" }}
                />
                <Text
                  textStyle="p-sm"
                  textAlign="start"
                  fontSize={"12px"}
                  color="red"
                >
                  {formError.email ?? ""}
                </Text>
              </Flex>
              <Flex direction={"column"} gap={2} w={"full"}>
                <InputGroup alignItems={"center"}>
                  <Input
                    ref={dateInput}
                    border="1px solid #606060"
                    borderRadius="8px"
                    p={6}
                    type="text"
                    placeholder="When was the property sold (dd/mm/yyy)"
                    value={formik.values.date_sold}
                    name="date_sold"
                    onChange={handleDate}
                    onBlur={handleBlur}
                    maxLength={10}
                    _hover={{ border: "1px solid #606060" }}
                    _focusVisible={{ outline: "none" }}
                  />
                </InputGroup>
                <Text
                  textStyle="p-sm"
                  textAlign="start"
                  fontSize={"14px"}
                  color="red"
                >
                  {formik.touched.date_sold && formik.errors.date_sold
                    ? formik.errors.date_sold
                    : ""}
                </Text>
              </Flex>
            </Flex>
            <Flex align={"center"} gap={6}>
              <Textarea
                placeholder="Do you want to add any  comment?"
                type=""
                borderRadius="8px"
                borderColor="#606060"
                name="note"
                w="full"
                h="170px"
                resize="none"
                onChange={formik.handleChange}
                value={formik.values.note}
                _hover={{ border: "1px solid #606060" }}
                _focusVisible={{ outline: "none" }}
              />
            </Flex>
          </Box>
        </Box>
      </Box>
      <Flex
        direction={{ base: "column", md: "row" }}
        align={"center"}
        mt={10}
        gap={4}
        justifyContent={"flex-end"}
      >
        <Button
          bg="transparent"
          border="1px solid #FF3636"
          borderRadius="12px"
          color="#FF3636"
          px={"4rem"}
          py={"1.5rem"}
          onClick={onClose}
          w={{ base: "full", md: "unset" }}
          fontWeight={`400`}
          order={{ base: "2", md: "1" }}
        >
          Discard
        </Button>
        <Button
          borderRadius="12px"
          bg="#191919"
          color="white"
          type="submit"
          isDisabled={!isValid}
          px={"4rem"}
          py={"1.5rem"}
          isLoading={mutation.isLoading}
          onClick={() => {
            formik.handleSubmit();
          }}
          _hover={{
            bg: "#191919",
          }}
          w={{ base: "full", md: "unset" }}
          fontWeight={`400`}
          order={{ base: "1", md: "2" }}
        >
          Proceed
        </Button>
      </Flex>
      <RequestSuccess
        isOpen={successIsOpen}
        onClose={() => {
          successOnClose();
          onClose();
        }}
      />
    </Box>
  );
};

const RequestCommission = ({ isMobile, children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <Fragment>
      <RequestWrap>
        {children ? (
          <Flex as="span" onClick={onOpen} w="100%">
            {children}
          </Flex>
        ) : (
          <Button
            onClick={onOpen}
            bg="transparent"
            borderRadius={"12px"}
            border={`1px solid`}
            // borderColor={isMobile ? '#474747' : '#fff'}
            borderColor={"#474747"}
            _hover={{ backgroundColor: "transparent" }}
            _focus={{ backgroundColor: "transparent" }}
            _focusVisible={{ backgroundColor: "transparent" }}
            _active={{ backgroundColor: "transparent" }}
            h="100%"
            p={`11px 16px`}
          >
            <Box display="flex" gap={2} alignItems={"center"} color="#fff">
              <Center
                filter={`invert(1)`}
                h="1.8rem"
                position={"relative"}
                aspectRatio={"1 / 1"}
              >
                <Image
                  src={RequestComissionIcon.src}
                  alt=""
                  layout="fill"
                  objectFit={"contain"}
                />
              </Center>
              <Text
                fontWeight="400"
                color={"#FFFFFF"}
                fontSize={"14px"}
                lineHeight={`18px`}
              >
                Commission Request
              </Text>
            </Box>
          </Button>
        )}
        {screenWidth >= 768 ? (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
              maxH="830px"
              minH={"200px"}
              borderRadius="16px"
              maxW={{ base: "500px", md: "850px" }}
              overflowY={"auto"}
              p="24px"
            >
              <ModalHeader p="0px" mb={`24px`}>
                <HStack align={"center"} justify={"space-between"} p={"0px"}>
                  <Text fontWeight={600} fontSize={"20px"}>
                    Request Commission
                  </Text>
                  <Center>
                    <ModalCloseButton
                      fontSize={"18px"}
                      position={`relative`}
                      top={`0px`}
                      right={`0px`}
                    />
                  </Center>
                </HStack>
              </ModalHeader>
              <ModalBody p="0px">
                <RequestCommissionContent onClose={onClose} />
              </ModalBody>
            </ModalContent>
          </Modal>
        ) : (
          <Drawer
            isOpen={isOpen}
            onClose={onClose}
            // placement="bottom"
            size={"sm"}
          >
            <DrawerOverlay />
            <DrawerContent
            //  maxH="95vh" borderRadius="16px 16px 0px 0px"
            >
              <DrawerHeader>
                <HStack justify={"space-between"} pb="16px" px={{ md: "30px" }}>
                  <Text fontWeight={600} fontSize={"24px"}>
                    Request Commission
                  </Text>
                  <Center p="20px">
                    <DrawerCloseButton fontSize={"18px"} />
                  </Center>
                </HStack>
              </DrawerHeader>
              <DrawerBody p="0px 25px 20px">
                <RequestCommissionContent onClose={onClose} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
      </RequestWrap>
    </Fragment>
  );
};

export default RequestCommission;
