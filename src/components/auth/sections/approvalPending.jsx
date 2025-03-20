import { Flex, Image, Text, Box, Stack, useTheme } from "@chakra-ui/react";
import check from "../../../images/animated_icons/approval.gif";

const ApprovalPending = ({ setPage, email, ...rest }) => {
  const theme = useTheme()
  return (
    <Stack
      bg={{ md: "card_bg" }}
      maxW="500px"
      w={`100%`}
      p={{ base: "38px 28px", md: "64px 48px" }}
      borderRadius={"2px"}
      boxShadow="0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)"
      {...rest}
      flex={1}
    >
      <Flex
        flex={1}
        h="full"
        direction="column"
        align={{ base: "center", md: "center" }}
        justify={{ base: "center", md: "start" }}
      >
        <Stack w={`100%`} mt={`8px`} textAlign={`start`} align={`center`}>
          <Image
            boxSize={{ base: "90px", md: "150px" }}
            src={check.src}
            alt="approval"
          />
          <Text
            fontSize={"20px"}
            fontWeight={600}
            color="text"
            fontFamily="Open Sans"
            textTransform={"uppercase"}
            letterSpacing={"0.24px"}
          >
            approval pending
          </Text>
          <Text textAlign="center" color={theme.theme_name !== 'light' ? "matador_text.500" : "matador_text.300"} lineHeight="20px">
            Thank you for registering with us! We've received your application
            and our team is currently reviewing it. We'll be in touch soon with
            an update.
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default ApprovalPending;