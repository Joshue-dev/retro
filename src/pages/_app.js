/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import { currentTheme } from "../theme";
import { ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import "./globals.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NoSSR from "react-no-ssr";
import Preloader from "../components/common/preloader";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { setItemInLS } from "../utils/localStorage";
import { MY_PREFERRED_THEME } from "../constants/names";
import axios from "axios";
import { BaseURL_TWO, STORE__DOMAIN, storeName } from "../constants/routes";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { Spinner } from "../ui-lib";
import { setSession, setUnEncryptedSession } from "utils/sessionmanagers";
import { setCookie } from "cookies-next";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAgentPage = router.pathname.includes("/agents/");
  const [objForLocalStorage, setValueForLocalStorage] = useLocalStorage([
    "storeThemeInfo",
    "companyImage",
  ]);
  const storeThemeInfo = objForLocalStorage?.storeThemeInfo;
  const companyImage = objForLocalStorage?.companyImage;

  const customColors = {
    primary: storeThemeInfo?.theme_color || "#2F2F2F",
  };

  const theme = storeThemeInfo?.theme_mode || "light";

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    setItemInLS(MY_PREFERRED_THEME, newTheme);
  };

  const changeColors = (colorObj) => {
    // setCustomColors({...customColors, ...colorObj});
  };

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        // v2/store/domain-check/
        const storeInfo = await axios.get(
          // `${BaseURL_TWO}/store/store_info/?store_name=${storeName}`
          `${BaseURL_TWO}/store/domain-check/${STORE__DOMAIN}`
        );
        const storeInfoData = storeInfo?.data?.store;
        const defaultCurrency = storeInfo?.data?.currency
        const defaultCountry = storeInfo?.data?.country

        if (storeInfoData) {
          const {
            company_image: storeInfoImage,
            store_name,
            agent_features: agentActive,
            fractional_features: isFractionalEnabled,
            auto_pay_features: autoPayEnabled,
            co_ownership_features: isCoownershipEnabled,
            wallet_features: isWalletEnabled,
            theme_color,
            theme_mode,
            sub_theme: subTheme
            
          } = storeInfoData;

          const businessId = storeInfo?.data?.store?.business?.business_id;
          const businessName = storeInfo?.data?.store?.owner?.company_name;

          const themeColor = theme_color ? theme_color : "#2F2F2F";
          const themeMode = theme_mode ? theme_mode : "light";

          const newStoreThemeInfo = {
            agentActive,
            isFractionalEnabled,
            autoPayEnabled,
            isCoownershipEnabled,
            isWalletEnabled,
            theme_color: themeColor,
            theme_mode: themeMode,
            subTheme,
          };

          const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          setUnEncryptedSession(agentActive, "agentActive", expires);

          if (businessId) {
            setSession(JSON.stringify(businessId), "businessId", expires);
          }

          if (typeof window !== "undefined") {
            if (businessName)
              localStorage.setItem(
                "businessName",
                JSON.stringify(businessName)
              );
            if (storeInfoImage)
              localStorage.setItem(
                "companyImage",
                JSON.stringify(storeInfoImage)
              );
            localStorage.setItem("storeName", JSON.stringify(store_name));

            localStorage.setItem(
              "storeThemeInfo",
              JSON.stringify(newStoreThemeInfo)
            );
            localStorage.setItem(
              "my_preferred_colors",
              JSON.stringify(themeColor)
            );
            localStorage.setItem(
              "my_preferred_theme",
              JSON.stringify(themeMode)
            );

            setValueForLocalStorage(
              "storeThemeInfo",
              JSON.stringify(newStoreThemeInfo)
            );
            setValueForLocalStorage(
              "companyImage",
              JSON.stringify(storeInfoImage)
            );
            setValueForLocalStorage(
              "defaultCurrency",
              JSON.stringify(defaultCurrency)
            );
            setValueForLocalStorage(
              "defaultCountry",
              JSON.stringify(defaultCountry)
            );
          }
        }
      } catch (err) {
        console.log({ err });
      }
    };

    fetchStoreInfo();
  }, []);

  const CURRENT_THEME = currentTheme(theme);
  // const CURRENT_THEME = currentTheme(`dark`);

  return (
    <ChakraProvider
      theme={extendTheme({
        ...CURRENT_THEME,
        theme_name: theme,
        colors: {
          ...CURRENT_THEME.colors,
          ...customColors,
          theme_name: theme,
        },
      })}
    >
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>
            {`${
              storeName
                ? storeName?.charAt(0)?.toUpperCase() + storeName?.slice(1)
                : ""
            } - Luxury Properties for Discerning Buyers`}
          </title>
          <meta
            name="description"
            content={`A development company with a clear vision to create contemporary and urban living for discerning individuals within small communities / Estates.`}
          />
          <link rel="icon" href={companyImage} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=League+Spartan:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
            rel="stylesheet"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
            rel="stylesheet"
          />
          {!isAgentPage && <style>{appCSS}</style>}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <NoSSR onSSR={<Preloader />}>
          <Hydrate state={pageProps.dehydratedState}>
            <React.StrictMode>
              {!storeThemeInfo?.theme_color ? (
                <Flex
                  justify="center"
                  align="center"
                  minH="100vh"
                  h="100vh"
                  w="100vw"
                >
                  <Spinner />
                </Flex>
              ) : (
                <Component
                  {...pageProps}
                  currentTheme={theme}
                  changeTheme={changeTheme}
                  changeColors={changeColors}
                />
              )}
            </React.StrictMode>
          </Hydrate>
        </NoSSR>

        {/* <SupportMenu isOpen={isOpen} onClose={onClose} onOpen={onOpen} /> */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ChakraProvider>
  );
}
export default MyApp;

const appCSS = `
  html {
  font-size: 50%;
}
:root {
  --chakra-fontSizes-md: 1.6rem !important;
}

body,
button {
  font-size: 1.6rem;
}

@media screen and (max-width: 992px) {
  html {
    font-size: 62.5%;
  }
  :root {
    --chakra-fontSizes-md: 2rem !important;
  }
}
`;
