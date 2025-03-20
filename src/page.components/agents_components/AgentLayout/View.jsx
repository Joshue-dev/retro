import { Box, Stack, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { AgentsLayoutNavbar } from "./Navbar";
import { AgentsLayoutNavigation } from "./Navigation";
import { STORE__DOMAIN } from "../../../constants/routes";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { storeDetails } from "api/auth";
import useLocalStorage from "utils/hooks/useLocalStorage";
import SupportMenu from "components/support/SupportMenu";

export const AgentsLayoutView = ({
  activePage,
  loading,
  children,
  ...restProps
}) => {
  const name = STORE__DOMAIN?.split(".")[0];
  const router = useRouter();
  const [objOfkeyValues] = useLocalStorage(["a_Token", "companyImage"]);

  const agentToken = objOfkeyValues?.a_Token;
  const companyImage = objOfkeyValues?.companyImage;
  const STOREINFO = useQuery(["storeInfo"], storeDetails, {
    enabled: !companyImage,
  });
  const storeInfo = STOREINFO.data?.data?.data;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthPage = router.pathname.indexOf("auth") !== -1;

  // useEffect(() => {
  //   if (!agentToken) {
  //     router.push('/agents');
  //   }
  //   // eslint-disable-next-line
  // }, [agentToken]);

  return (
    <Stack
      w="100%"
      minH="100vh"
      spacing={10}
      bg="#FAFAFA"
      fontFamily="Euclid Circular B"
    >
      <Head>
        <link rel="icon" href={companyImage ?? storeInfo?.company_image} />
        <title>{name}</title>
        <meta property="og:title" content="My page title" key="title" />
       <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap" rel="stylesheet"/>
        
      </Head>
      <Box w="full">
        <AgentsLayoutNavbar
          activePage={activePage}
          company_image={companyImage ?? storeInfo?.company_image}
        />
        <AgentsLayoutNavigation activePage={activePage} {...restProps}>
          {children}
        </AgentsLayoutNavigation>
      </Box>
      {isAuthPage ? null : (
        <SupportMenu
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          isAgent
        />
      )}
    </Stack>
  );
};

export default AgentsLayoutView;