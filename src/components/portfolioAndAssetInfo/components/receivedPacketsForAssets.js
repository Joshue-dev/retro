import React from "react";
import { changeDateFormat } from "../../../utils/formatDate";
import {
  Center,
  Flex,
  Link,
  Stack,
  StackDivider,
  Text,
  useTheme,
} from "@chakra-ui/react";
import EmptyState from "../../appState/empty-state";
import { customScrollbarStyles } from "../screens/assetInfoScreens/makeADepositToAnAsset";
import { removeFileExtension } from "utils/removeFileExtension";

const ReceivedPacketsForAssets = ({ packetData, isLoading }) => {
  const theme = useTheme();
  return (
    <Stack w="full" px={{ base: "21.76px", md: "23px" }}>
      {packetData?.received?.length ? (
        <Stack
          mt={{ base: "14.33px", md: "16px" }}
          p={{
            base: "10.383px 27.687px 10.383px 20.765px",
            md: "16px",
          }}
          border="1.288px solid"
          borderColor={
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.100"
          }
          spacing="10.38px"
          w="full"
          divider={
            <StackDivider
              my="0px"
              h="0.8px"
              borderColor={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
            />
          }
          overflowY={"auto"}
          maxH={isLoading ? "30rem" : "40rem"}
          css={customScrollbarStyles}
          bg={theme.theme_name !== "light" ? "background" : "transparent"}
        >
          {packetData?.received?.map((item, index) => (
            <Flex
              key={index}
              align={"center"}
              justify={"space-between"}
              w="full"
              minH={{ base: "55.5.7px", md: "61.7px" }}
            >
              <Flex w="full"  align={"center"} gap="10px">
                <Stack
                  align={"flex-start"}
                  spacing={{ base: "7.79px", md: "4px" }}
                  textAlign="start"
                  w="full"
                >
                  <Text
                    fontFamily="Open Sans"
                    textAlign="start"
                    color="matador_text.100"
                    fontSize={{ base: "14.326px", md: "16px" }}
                    fontWeight={600}
                    textTransform="uppercase"
                    letterSpacing="0.96px"
                    whiteSpace='normal'
                    maxW='25rem'
                  >
                    {item?.packet_name ? removeFileExtension(item?.packet_name) : "document"}
                  </Text>
                  <Text
                    color="text"
                    fontSize={{ base: "12.536px", md: "14px" }}
                    fontWeight={400}
                  >
                    {changeDateFormat(item?.added_at)}
                  </Text>
                </Stack>
              </Flex>
              <Link rel="noreferrer" target="_blank" href={item?.packet}>
                <Text
                  fontSize={{ base: "12.824px", md: "14px" }}
                  color="primary"
                  fontFamily="Open Sans"
                  fontWeight={400}
                >
                  View
                </Text>
              </Link>
            </Flex>
          ))}
        </Stack>
      ) : (
        <Center mt="40%">
          <EmptyState
            icon={<></>}
            fontFamily="Segoe UI"
            h="fit-content"
            text="Looks like you’ve not uploaded any document yet."
            textSize="14px"
            headerStyle={{
              textTransform: "uppercase",
              fontWeight: 700,
              fontFamily: "Liberation Sans",
              letterSpacing: "1.2px",
            }}
          />
        </Center>
      )}
    </Stack>
  );
};

export default ReceivedPacketsForAssets;
