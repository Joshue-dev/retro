import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image as ChakraImage,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import GetStarted from "./sections/getStarted";
import SuccessLink from "./sections/successLink";
import RegisterForm from "./sections/registerForm";
import ThankYou from "./sections/thankYou";
import { storeDetails } from "../../api/auth";
import { useQuery } from "react-query";
import PersonalInfo from "./sections/personalInfo";
import ApprovalPending from "./sections/approvalPending";
import { VeritasiBanner } from "./components/banner";


const Register = ({ onAuthClose, isAgent }) => {
  const [page, setPage] = useState("getStarted");
  const [email, setEmail] = useState("");

  const STOREINFO = useQuery(["storeInfo"], storeDetails);
  const store_data = STOREINFO.data?.data?.data;

  const handle_click = (e) => {
    e.preventDefault();
    window.open('https://www.veritasihomes.com/')
  }

  return (
    <Flex w="full" h="100%" flex={1} flexDirection="column" position="relative">
      <Flex
        flexDir={`column`}
        w={`100%`}
        gap={{ base: "10px", lg: "40px" }}
        h="full"
        flex={1}
        align="start"
      >
        <HStack
          gap={{ base: "16px", lg: "9px" }}
          py={{ base: "15px", lg: "25.25px" }}
          px={{ base: "15px", lg: "7rem" }}
          borderBottom={{ base: "1px solid", lg: "unset" }}
          borderBottomColor="matador_border_color.200"
          w="full"
          position={{ lg: "absolute" }}
        >
          <Box
            maxW="75px"
            h="46px"
            maxH="48px"
            minWidth={`48px`}
            position={`relative`}
            cursor='pointer'
            onClick={handle_click}
          >
            {store_data?.company_image && (
              <ChakraImage
                src={store_data?.company_image}
                w="100%"
                height="100%"
                alt={"Company Image"}
                objectFit="contain"
                transition="0.3s ease-in-out"
              />
            )}
          </Box>
        </HStack>
        <Stack
          direction={{ base: "column-reverse", lg: "row" }}
          h="100%"
          px={{ base: "2rem", lg: 0 }}
          pt={{ base: 0, lg: 0 }}
          w="full"
          flex={1}
        >
         <VeritasiBanner/>
          <Stack w="full" flex={1} align="center" justify={{ lg: "center" }}>
            {page === "getStarted" && (
              <GetStarted
                isAgent={isAgent}
                setEmail={setEmail}
                setPage={setPage}
                onAuthClose={onAuthClose}
              />
            )}
            {page === "successLink" && (
              <SuccessLink
                isAgent={isAgent}
                email={email}
                setEmail={setEmail}
                setPage={setPage}
              />
            )}
            {page === "register" && (
              <RegisterForm
                email={email}
                setEmail={setEmail}
                setPage={setPage}
                onAuthClose={onAuthClose}
                isAgent={isAgent}
              />
            )}
            {page === "personalInfo" && isAgent && (
              <PersonalInfo
                setPage={setPage}
                onAuthClose={onAuthClose}
                isAgent={isAgent}
                email={email}
              />
            )}
            {page === "thankYou" && (
              <ThankYou
                isAgent={isAgent}
                email={email}
                setEmail={setEmail}
                setPage={setPage}
                onAuthClose={onAuthClose}
              />
            )}
            {page === "approvalPending" && isAgent && <ApprovalPending />}
            {store_data?.whatsapp_url && (
              <Link
                color="primary"
                fontWeight={500}
                display={{ lg: "none" }}
                pt="1rem"
                textAlign="end"
                alignSelf="end"
                cursor="pointer"
                href={store_data?.whatsapp_url}
                target="_blank"
                textDecoration="none"
              >
                Contact Support
              </Link>
            )}
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Register;
