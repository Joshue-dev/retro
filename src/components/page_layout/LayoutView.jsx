import {
  Box,
  Center,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { Navbar } from "../navbar";
import { storeDetails } from "@/api/auth";
import { useQuery } from "react-query";
import WhatsappIcon from "/src/images/icons/whatsapp_icon.svg";
import { Footer } from "./footer";

export const LayoutView = ({
  children,
  noPadding,
  navBarStyle,
  activePage,
  noFooter,
  ...rest
}) => {
  const theme = useTheme();
  const STOREINFO = useQuery(["storeInfo"], storeDetails);
  const store_data = STOREINFO.data?.data?.data;
  const TERMS = store_data?.customer_document;
  const PRIVACY_POLICY = store_data?.customer_privacy_policy;

  const handle_whatsapp = () => {
    if (STOREINFO?.data?.data?.data?.whatsapp_url) {
      window.open(STOREINFO?.data?.data?.data?.whatsapp_url, '_blank');
    }
  };
  return (
    <Stack
      bg="background"
      minH="100vh"
      minInlineSize={"fit-content"}
      justify="space-between"
      color={`text`}
      gap={`0px`}
      mx={`auto`}
      fontFamily={`Noto Sans`}
    >
      <Navbar navBarStyle={navBarStyle} activePage={activePage} />
      <Box
        flex={1}
        h="full"
        w={"100%"}
        px={noPadding ? "0" : { base: "20px", lg: "100px" }}
        pb={{ base: "50px", xl: "51.5px" }}
        mt={`0px !important `}
        pt={{ base: `60px`, lg: `97px` }}
        {...rest}
      >
        {children}
      </Box>
      {STOREINFO?.data?.data?.data?.whatsapp_url && <Box
        right={"3vw"}
        bottom="5vh"
        position="fixed"
        p={'1.6rem'}
        rounded="full"
        bg="primary"
        cursor='pointer'
        onClick={handle_whatsapp}
        zIndex={999}
      >
        <Image boxSize={'24px'} src={WhatsappIcon.src} alt="whatsapp icon" />
      </Box>}
      {!noFooter && (
        <Footer TERMS={TERMS} PRIVACY_POLICY={PRIVACY_POLICY} />
      )}{" "}
    </Stack>
  );
};

export default LayoutView;
