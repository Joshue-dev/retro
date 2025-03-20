import {
  VStack,
  Text,
  Flex,
  Box,
  Center,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  HStack,
  useTheme,
  Stack,
} from "@chakra-ui/react";
import EmptyState from "../appState/empty-state";
import { Spinner } from "../../ui-lib";
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import MobileHeader from "../navbar/mobile_header";
import { useLightenHex } from "utils/lightenColorShade";

const AssetsList = ({
  equitiesData,
  drawer,
  handleClose,
  setEquityData,
  setType,
  customScrollbarStyles,
  isLoading,
  type,
  isError,
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex, reduceOpacity } = useLightenHex(primaryColor);
  const handleManageAssets = (property) => {
    setEquityData(property);
    setType("summary");
  };

  return (
    <>
      <MobileHeader
        onDrawerClose={drawer?.onClose}
        activePage={"Validate Transaction"}
        noIcons
        noBack
      />
      <Box
        px={{ base: "14px", md: "21px" }}
        py={{ base: "18px", md: "32px" }}
        mb="18px"
        top="0"
        bg="card_bg"
        right={0}
        w="full"
        zIndex={200}
        borderBottom={{ md: "1px solid" }}
        borderBottomColor={{
          md:
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.300",
        }}
        display={{ base: "none", md: "flex" }}
      >
        <Flex w="full" h="20px" justify={"space-between"} align={"center"}>
          <Text
            color="text"
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight={600}
            textTransform={"uppercase"}
            fontFamily="Open Sans"
            letterSpacing="1.44px"
          >
            Validate Transaction
          </Text>
          <CloseIcon
            cursor={"pointer"}
            fontSize={"14px"}
            color="text"
            onClick={drawer?.onClose}
          />
        </Flex>
      </Box>
      <Box
        maxH={{ base: "100vh", md: "70vh" }}
        w="full"
        h={"fit-content"}
        overflowY={"auto"}
        __css={customScrollbarStyles}
      >
        <Box px="24px" pb="38px" h={"fit-content"}>
          {isLoading ? (
            <VStack w="80vw">
              <Spinner />
            </VStack>
          ) : isError ? (
            <ErrorState />
          ) : (
            <>
              {equitiesData?.length > 0 ? (
                <VStack align="stretch" spacing={"16px"}>
                  {(equitiesData || [])?.map((equity, idx) => (
                    <Center
                      key={idx}
                      flexDirection={"column"}
                      onClick={() => handleManageAssets(equity)}
                      cursor="pointer"
                      w="full"
                      px="24px"
                      bg="background"
                      py="12px"
                      gap="8px"
                      align={"center"}
                      border="1px solid"
                      borderColor={
                        theme.theme_name !== "light"
                          ? lightenHex(87.5)
                          : "primary"
                      }
                      maxW={{ md: "375px" }}
                      // maxH="117px"
                    >
                      <Text
                        fontSize={"18px"}
                        fontWeight="700"
                        color={
                          theme.theme_name !== "light"
                            ? lightenHex(82.5)
                            : "primary"
                        }
                        textTransform={"uppercase"}
                        fontFamily="Liberation Sans"
                        letterSpacing="2.828px"
                      >
                        {equity?.unit?.unit_title}
                      </Text>
                      <Text
                        textTransform={"uppercase"}
                        fontSize={"14px"}
                        fontWeight="400"
                        color="text_two"
                        fontFamily="Liberation Sans"
                        letterSpacing="2.828px"
                      >
                        {equity?.project?.name}
                      </Text>
                    </Center>
                  ))}
                </VStack>
              ) : (
                <EmptyState text={`No pending transactions yet`} />
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AssetsList;