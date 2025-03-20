import {
  Image,
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
import ErrorState from "../appState/error-state";
import { Spinner } from "../../ui-lib";
import { formatDateToString } from "../../utils/formatDate";
import { CloseIcon } from "@chakra-ui/icons";
import { useLightenHex } from "utils/lightenColorShade";

const TransactionsList = ({
  assetData,
  drawer,
  isError,
  isLoading,
  setType,
  customScrollbarStyles,
  setAsset,
  setAmountToPay,
  handleClose,
  type,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.theme_name !== "light";
  const { lightenHex, reduceOpacity } = useLightenHex(theme.colors.primary);
  const handleManageAssets = (property) => {
    setAsset(property);
    if (
      property?.type == "WHOLE" &&
      !property?.payment_plan &&
      !property?.co_owners?.length
    ) {
      setAmountToPay(Number(property?.total_unit_price));
    }
    if (
      property?.type == "WHOLE" &&
      property?.payment_plan &&
      !property?.co_owners?.length
    ) {
      setAmountToPay(property?.payment_plan?.initial_deposit_in_value);
    }
    setType("summary");
  };

  return (
    <>
      <Box
        px={{ base: "14px", md: "21px" }}
        py={{ base: "18px", md: "32px" }}
        mb="18px"
        top="0"
        bg="card_bg"
        right={0}
        w="full"
        zIndex={200}
        borderBottom="0.4px solid"
        borderBottomColor={
          isDarkMode ? "matador_border_color.200" : "matador_border_color.300"
        }
      >
        <Flex w="full" h="20px" justify={"space-between"} align={"center"}>
          <Text
            color="text"
            fontSize={"23px"}
            fontWeight={600}
            textTransform={"uppercase"}
            fontFamily="Open Sans"
            letterSpacing="1.44px"
          >
            Offers
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
        maxH={{ base: "100vh", md: "590px" }}
        w="full"
        h={"fit-content"}
        overflowY={"auto"}
        __css={customScrollbarStyles}
      >
        <Box px="24px" pb="38px" h={"fit-content"} overflowY={"auto"}>
          {isLoading ? (
            <VStack w="80vw">
              <Spinner />
            </VStack>
          ) : isError ? (
            <ErrorState />
          ) : (
            <>
              {assetData?.length > 0 ? (
                <VStack align="stretch" spacing={"12px"}>
                  {(assetData || [])?.map((equity, idx) => (
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
                      <Stack
                        px="8px"
                        bg={reduceOpacity(0.1)}
                        h="28px"
                        w="full"
                        maxW="180px"
                        align="center"
                        justify="center"
                      >
                        <Text
                          fontSize={"12px"}
                          fontWeight={400}
                          color={lightenHex(40)}
                          letterSpacing="-0.24px"
                          textAlign="center"
                        >{`Expiration Date: ${formatDateToString(
                          equity?.offer_expires
                        )}`}</Text>
                      </Stack>
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

export default TransactionsList;