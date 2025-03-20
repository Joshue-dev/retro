import React, { useCallback, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import {
  fetchInvestorPackets,
  sendInvestorPackets,
} from "../../../../api/payment";

import { toastForError } from "../../../../utils/toastForErrors";
import SentPacketForAssets from "../../components/sentPAcketForAssets";
import ReceivedPacketsForAssets from "../../components/receivedPacketsForAssets";
import {
  AbsoluteCenter,
  Box,
  Flex,
  Image,
  TabList,
  Tabs,
  Stack,
  Text,
  HStack,
  Tab,
  TabPanel,
  TabPanels,
  Input,
  DrawerCloseButton,
  Center,
  DrawerBody,
  useTheme,
  Spinner as ChakraSpinner,
} from "@chakra-ui/react";
import warning_icon from "/src/images/icons/warning-alert.svg";
import angledArrow from "/src/images/icons/backIconForAsset.svg";
import { Button, Spinner } from "../../../../ui-lib/ui-lib.components";
import { useLightenHex } from "../../../../utils/lightenColorShade";
import { encodeFileToBase64 } from "../../../../utils";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import MobileHeader from "@/components/navbar/mobile_header";
import { useDropzone } from "react-dropzone";

const PacketsForAsset = ({
  equityId,
  handleScreen,
  onNotOpen,
  onDrawerOpen,
}) => {
  const theme = useTheme();
  const { lightenHex } = useLightenHex();
  const HOME__OWNERS__PACKETS = useQuery(
    ["fetchInvestorPackets", equityId],
    () => fetchInvestorPackets(equityId)
  );
  const { getRootProps, getInputProps, inputRef, fileRejections } = useDropzone(
    {
      accept: { "application/pdf": [] },
      maxFiles: 1,
      multiple: false,
      onDrop: useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => handleUpload(file));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []),
    }
  );
  const toast = useToastForRequest();
  const packetData = HOME__OWNERS__PACKETS?.data?.data;

  const customScrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "4px",
      borderRadius: "16px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "16px",
      WebkitBoxShadow: "inset 0 0 6px rgba(255, 255, 255, 0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "16px",
      backgroundColor: "#ffffff",
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const { mutate, isLoading } = useMutation(
    (formData) => sendInvestorPackets(equityId, formData),
    {
      onSuccess: async (res) => {
        await HOME__OWNERS__PACKETS.refetch();
        toast({
          description: `Document updated successfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        inputRef.current.value = "";
      },
      onError: (err) => {
        inputRef.current.value = "";
        toastForError(err, true, toast);
      },
    }
  );

  const handleUpload = async (file) => {
    let based = [];
    if (fileRejections.length) {
      inputRef.current.value = "";
    }
    const filed = await encodeFileToBase64(file);
    const body = {
      packet: filed.replace("data:", "").replace(/^.+,/, ""),
      packet_name: file.name,
    };
    based.push(body);
    mutate(based);
  };

  const packetTabs = [
    {
      tablist: "Received",
      component: (
        <ReceivedPacketsForAssets
          packetData={packetData}
          isLoading={isLoading}
        />
      ),
    },
    {
      tablist: "Sent",
      component: (
        <SentPacketForAssets packetData={packetData} isLoading={isLoading} />
      ),
    },
  ];

  return (
    <>
      <MobileHeader
        activePage={"Documents"}
        onDrawerOpen={onDrawerOpen}
        onDrawerClose={handleScreen("asset info")}
        onNotOpen={onNotOpen}
      />
      <HStack
        p={{ base: "12px 25.309px 12px 26px", md: "24px" }}
        w="full"
        maxH={{ base: "48px", md: "100px" }}
        justify="space-between"
        align="center"
        borderBottom="1px solid"
        borderBottomColor={
          theme.theme_name !== "light"
            ? "matador_border_color.200"
            : "matador_border_color.300"
        }
        display={{ base: "none", md: "flex" }}
      >
        <HStack
          spacing="16px"
          role="button"
          onClick={handleScreen("asset info")}
        >
          <Image
            h={{ md: "26px", base: "20px" }}
            filter={theme.theme_name !== "light" ? "invert(1)" : ""}
            src={angledArrow.src}
            alt="back icon"
          />
          <Text
            as="h1"
            fontSize={{ base: "16px", md: "20px" }}
            fontFamily="Open Sans"
            lineHeight={{ base: "22px", md: "33px" }}
            fontWeight="600"
            color="text"
            letterSpacing="1.44px"
            textTransform="uppercase"
          >
            Documents
          </Text>
        </HStack>
        <DrawerCloseButton color="text" fontSize={14} position="initial" />
      </HStack>
      {isLoading ? (
        <Flex
          position="relative"
          w="full"
          px="20px"
          my="13px"
          align={"center"}
          gap="8px"
        >
          <ChakraSpinner
            fontSize="14px"
            color={theme.theme_name !== "light" ? "text" : "#757373"}
          />
          <Text
            fontSize={"16px"}
            fontWeight={400}
            color={theme.theme_name !== "light" ? "text" : "#757373"}
          >
            Uploading Document, please wait a moment...
          </Text>
        </Flex>
      ) : null}
      <DrawerBody sx={customScrollbarStyles} p="0px" mb="10px">
        {HOME__OWNERS__PACKETS?.isLoading ? (
          <Center w="full" mt="50%">
            <Stack
              mb="40px"
              align="center"
              spacing={"14px"}
              direction={"column"}
              w="full"
              h="full"
            >
              <Spinner />
            </Stack>
          </Center>
        ) : HOME__OWNERS__PACKETS?.isError ? (
          <AbsoluteCenter w="full">
            <Stack
              mb="40px"
              align="center"
              spacing={"14px"}
              direction={"column"}
              px="20px"
              w="full"
              h="full"
            >
              <Image boxSize="68px" src={warning_icon.src} alt="" />
              <Text
                fontWeight="600"
                fontSize={{ base: "16px", md: "20px" }}
                lineHeight="36px"
                color="text"
              >
                {`No Documents found`}
              </Text>
              <Text
                textAlign="center"
                fontWeight="400"
                fontSize={{ base: "14px", md: "16px" }}
                lineHeight="20px"
                color="text"
              >
                {`There was a problem retrieving documents. Please try again.`}
              </Text>
            </Stack>
          </AbsoluteCenter>
        ) : (
          <Tabs isFitted variant="enclosed" align="center" isLazy h="full">
            <TabList
              boxShadow="none"
              maxW="100%"
              borderBottom="none"
              px="0px"
              py="0px"
              position="sticky"
              top="-1px"
              pt={{ base: "10px", md: "16px" }}
            >
              <HStack
                mx={"20px"}
                border="0.5px solid "
                p={{ base: "7.16px", md: "8px" }}
                borderColor={
                  theme.theme_name !== "light"
                    ? "matador_border_color.200"
                    : lightenHex(75)
                }
                borderRadius="0px"
                w="full"
                justify="space-between"
                bg={
                  theme.theme_name !== "light" ? "background" : lightenHex(95)
                }
                align="center"
                h="60px"
              >
                {packetTabs.map((item, index) => (
                  <Tab
                    width={"fit-content"}
                    key={index}
                    wordBreak="keep-all"
                    fontSize={{ base: "12.536px", md: "14px" }}
                    fontWeight="600"
                    color="matador_text.500"
                    _focusVisible={{
                      boxShadow: "none",
                    }}
                    textTransform="uppercase"
                    border="none"
                    position="relative"
                    _selected={{
                      color: "#FFF",
                      border: "none",
                      fontWeight: "500",
                      _after: {
                        transition: "0.4s ease-in-out",
                        fontSize: { base: "12.536px", md: "14px" },

                        opacity: "1",
                      },
                      background: "primary",
                      height: "44px",
                      rounded: 0,
                    }}
                  >
                    {item.tablist}
                  </Tab>
                ))}
              </HStack>
            </TabList>
            <TabPanels sx={customScrollbarStyles} overflowY="auto">
              {packetTabs.map((item, index) => (
                <TabPanel key={index} px="0" py="0px" h="full">
                  {item.component}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}
      </DrawerBody>

      {HOME__OWNERS__PACKETS?.isError ? null : (
        <Box px={{ base: "27.76px", md: "31px" }}>
          <Button
            py="10px"
            h="64px"
            bg="primary"
            mx="auto"
            position="relative"
            w="full"
            mb="20px"
            align="center"
            cursor="pointer"
            justify="center"
            spacing="8px"
            _hover={{
              bg: "primary",
            }}
            _active={{
              opacity: 1,
            }}
            isDisabled={isLoading}
            {...getRootProps()}
          >
            <Input {...getInputProps()} />

            <Text
              color="#fff"
              fontSize={{ base: "16px", md: "18px" }}
              letterSpacing="0.18px"
              fontWeight="400"
              textTransform="uppercase"
            >
              Upload
            </Text>
          </Button>
        </Box>
      )}
    </>
  );
};

export default PacketsForAsset;
