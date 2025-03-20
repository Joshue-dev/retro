import {
  Box,
  Flex,
  HStack,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BiShareAlt } from "react-icons/bi";
import { themeStyles } from "../../theme";
import { Button, Popup } from "../../ui-lib/ui-lib.components";
import { Input } from "./Input/Input";
import { CreateToast } from "/src/ui-lib/ui-lib.components/Toast/createToast.js";
import copyIcon from "/src/images/icons/copy.svg";
import { ellipsize } from "/src/utils/ellipsize";
import { FiShare2 } from "react-icons/fi";
import useGetSession from "utils/hooks/getSession";

export const ShareAgentLink = ({ children }) => {
  const toaster = CreateToast();

  const { sessionData: agentInfo } = useGetSession("a_details");

  const agentId = agentInfo?.agent_id;

  const getDomainOnly = () => {
    return window.location.origin;
  };

  const baseUrl = getDomainOnly();

  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  const link = `${baseUrl}?ref_id=${agentId}`;
  const linkToCopy = `${baseUrl}?ref_id=${agentId}`;

  const { hasCopied, onCopy } = useClipboard(linkToCopy);

  useEffect(() => {
    if (hasCopied === true) {
      onToggle();
      toaster("Link copied!", {
        h: "44px",
        bg: "#0D0D0D",
        color: "#fff",
        position: "top-right",
      });
    }
  }, [hasCopied]);

  return (
    <div>
      {children ? (
        <Flex as="span" onClick={onOpen} w="100%">
          {children}
        </Flex>
      ) : (
        <Button
          ml="0"
          borderRadius={"8px"}
          h="100%"
          p={`11px 25.5px`}
          w="139px"
          color="#FFFFFF"
          variant="contained"
          onClick={onOpen}
          bg={"#4545FE" || themeStyles.color.primary}
          leftIcon={<FiShare2 fontSize={"18px"} />}
          _hover={{ bg: "#4545FE" || themeStyles.color.primary }}
        >
          <Text
            fontWeight="400"
            color={"#FFFFFF"}
            fontSize={"14px"}
            lineHeight={`18px`}
          >
            Share link
          </Text>
        </Button>
      )}
      <Popup
        h="fit-content"
        minW={{ base: `200px`, md: "440px" }}
        isOpen={isOpen}
        onClose={onClose}
        // mt={16}
        fontFamily="Euclid Circular B"
      >
        <Popup.Header>
          <HStack>
            <img src={copyIcon.src} />
            <Text fontSize={"20px"} fontWeight="500" lineHeight="41px">
              Share link
            </Text>
          </HStack>
        </Popup.Header>
        <Popup.Body>
          <Flex as="div" mb={-2} position="relative">
            <Input
              bg="#E0E0E0"
              cursor="not-allowed"
              value={ellipsize(link, 30)}
              isReadOnly
              w="364px"
              h="63px"
              borderRadius="12px"
              border="1px solid lightgray"
            />
            {hasCopied ? (
              <HStack
                justify="center"
                my="auto"
                top="0"
                bottom="0"
                right="2%"
                position="absolute"
                ml={2}
              >
                <Text as="small" colorScheme={"teal"}>
                  Copied! 👍🏻
                </Text>
              </HStack>
            ) : (
              <HStack
                as="button"
                position="absolute"
                right="2%"
                variant="default"
                bg="#000"
                w="105px"
                h="48px"
                onClick={onCopy}
                justify="center"
                my="auto"
                top="0"
                bottom="0"
                ml={2}
                borderRadius="12px"
              >
                <Text color="#ffffff" fontSize="16px" fontWeight="500">
                  Copy URL
                </Text>
              </HStack>
            )}
          </Flex>
        </Popup.Body>
      </Popup>
    </div>
  );
};
