import { customScrollbarStyles } from "@/components/portfolioAndAssetInfo/screens/assetInfoScreens/makeADepositToAnAsset";
import {
  Box,
  Divider,
  HStack,
  Skeleton,
  Stack,
  StackDivider,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import useLocalStorage from "utils/hooks/useLocalStorage";

const ListCards = ({
  data,
  isLoading,
  fetchingCard,
  selectedCard,
  setSelectedCard,
}) => {
  const theme = useTheme();
  const [storeThemeInfo] = useLocalStorage('storeThemeInfo');
  const isGatewayEnabled = storeThemeInfo?.isGatewayEnabled
  return (
    <>
      {isGatewayEnabled ? <Stack gap="12px" px="24px">
        <Text fontSize="16px" color="text" letterSpacing="0.464px">
          Select your preferred payment method
        </Text>
        {fetchingCard ? (
          <Skeleton w="full" minH="64px" />
        ) : (
          <VStack
            align={"stretch"}
            gap="6px"
            fontWeight={500}
            p={{
              base: "10.592px 28.245px 10.592px 21.184px",
              md: "11.596px 30.921px 11.596px 23.191px",
            }}
            border={"1.2px solid"}
            borderColor={
              theme.theme_name !== "light"
                ? "matador_border_color.200"
                : "matador_border_color.300"
            }
            divider={<Divider />}
            bg={
              theme.theme_name !== "light" ? "matador_background.100" : "card_bg"
            }
            maxH={{ base: "200px", xl: isLoading ? "80px" : "100px" }}
            overflowY="auto"
            sx={customScrollbarStyles()}
          >
            {data?.data?.results?.length > 0 ? (
              <Stack
                gap="16px"
                divider={
                  <StackDivider
                    borderColor={
                      theme.theme_name !== "light"
                        ? "matador_border_color.200"
                        : "matador_border_color.300"
                    }
                  />
                }
              >
                {data?.data?.results?.map((card, index) => {
                  return (
                    <HStack w="full" justify="space-between" key={index}>
                      <Stack>
                        <Text
                          fontSize={{ base: "16px", md: "16px" }}
                          fontFamily="Noto Sans"
                          fontWeight={500}
                          color="text"
                        >
                          {card?.bank}
                        </Text>
                        <Text
                          fontSize={{ base: "12px", md: "14px" }}
                          textTransform="uppercase"
                          color="matador_text.500"
                        >
                          Savings **** **** {card?.last4}
                        </Text>
                      </Stack>
                      <Stack
                        align="center"
                        justify="center"
                        boxSize="24px"
                        border="2px solid"
                        borderColor={
                          selectedCard?.id === card?.id
                            ? "primary"
                            : theme.theme_name !== "light"
                            ? "matador_border_color.200"
                            : "matador_border_color.100"
                        }
                        borderRadius="50%"
                        onClick={() => setSelectedCard(card)}
                        cursor="pointer"
                      >
                        <Box
                          boxSize="16px"
                          borderRadius="50%"
                          bg={
                            selectedCard?.id === card?.id
                              ? "primary"
                              : "transparent"
                          }
                        />
                      </Stack>
                    </HStack>
                  );
                })}
              </Stack>
            ) : (
              <Stack w="full" justify="center" align="center" minH="75px">
                <Text
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={600}
                  textTransform={"uppercase"}
                  fontFamily="Liberation Sans"
                  color="text"
                >
                  nothing found
                </Text>
                <Text
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight={400}
                  color="matador_text.500"
                >
                  No payment method added yet
                </Text>
              </Stack>
            )}
          </VStack>
        )}
      </Stack>: null}
    </>
  );
};

export default ListCards