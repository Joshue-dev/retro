import {
  FormControl,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import bgForAuth from "/src/images/bg_pattern_store.svg";
import { store_name } from "constants/routes";

export const Form = ({ noBackground, children, ...rest }) => {
  const storeName = store_name();

  return (
    <Flex
      h={"100vh"}
      align={"center"}
      position="relative"
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      {...rest}
    >
      {!noBackground && (
        <Image
          src={storeName?.header_image ?? bgForAuth.src}
          loading="eager"
          w={"100vw"}
          h={"100vh"}
          opacity={"0.8"}
          alt="background"
          position="absolute"
        />
      )}
      <Stack
        p={6}
        pb={10}
        my={12}
        w={"full"}
        spacing={4}
        maxW={"md"}
        rounded={"xl"}
        color="#191919"
        zIndex="1000"
        bg="#ffffff"
      >
        {/* This children is any extra form info asides 'FormHeader', 'FormDescription', 'FormBody', and 'FormFooter'  */}
        {children}
      </Stack>
    </Flex>
  );
};

const FormHeader = ({ children }) => {
  return (
    <Heading
      fontFamily="Euclid Circular B"
      fontWeight="700"
      align="left"
      lineHeight="35.5px"
      fontSize={{ base: "xl", md: "28px" }}
    >
      {children}
    </Heading>
  );
};

const FormDescription = ({ children }) => {
  return (
    <Text
      align="center"
      fontWeight={500}
      fontSize={{ base: "sm", sm: "18px" }}
      lineHeight="22.82px"
      color={useColorModeValue("#919191", "gray.400")}
    >
      {children}
    </Text>
  );
};

const FormBody = ({ children }) => {
  return (
    <FormControl as="form" align="center" id="email" w={"100%"}>
      {children}
    </FormControl>
  );
};

const FormFooter = ({ pageUrl, children }) => {
  return (
    <Stack spacing={6}>
      {pageUrl ? (
        <Link prefetch={false} href={pageUrl}>
          {children}
        </Link>
      ) : (
        children
      )}
    </Stack>
  );
};

Form.Header = FormHeader;
Form.Description = FormDescription;
Form.Body = FormBody;
Form.Footer = FormFooter;
