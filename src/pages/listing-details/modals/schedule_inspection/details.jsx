import {
  Box,
  Center,
  HStack,
  ModalBody,
  ModalHeader,
  Stack,
  StackDivider,
  Text,
  useMediaQuery,
  useTheme,
} from "@chakra-ui/react";
import moment from "moment";
import { IoMdClose } from "react-icons/io";

const PendingInspectionDetails = ({ info, details, disclosure }) => {
  const theme = useTheme();
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#F79009";
      case "Approved":
        return "#12B76A";
      default:
        return "#6C737F";
    }
  };

  const OVERVIEW_INFO = [
    {
      label: "Inspection Type",
      value: details?.tour_method === 'video' ? 'Virtual' : 'in-person',
    },
    {
      label: "Date",
      value: moment(details?.time_date?.date).format("MMM DD, YYYY"),
    },
    {
      label: "Time",
      value: moment(details?.time_date?.time, "HH:mm:ss").format("h:mm A"),
    },
    {
      label: "Status",
      component: (
        <Text color={getStatusColor(details?.status)}>{details?.status}</Text>
      ),
    },
  ];
  const isDarkMode = theme.theme_name !== "light";

  return (
    <Box>
      <ModalHeader p={`0rem`}>
        <HStack
          justify="space-between"
          p={{ base: "2.5rem 2rem", md: `3rem 2.1rem` }}
          borderBottom="0.4px solid"
          borderBottomColor={
            isDarkMode ? "matador_border_color.200" : "matador_border_color.300"
          }
        >
          <Stack gap={0}>
          <Text
              color="text"
              fontSize={{ base: `2rem`, lg: "2.75rem" }}
              fontWeight={600}
              textTransform={`uppercase`}
              textAlign={`left`}
              letterSpacing={`.13rem`}
              maxW='80rem'
            >
              {info?.name}
            </Text>
            <Text
              color="matador_text.500"
              fontSize={{ base: `1.5rem`, lg: "2rem" }}
              textTransform={`uppercase`}
              textAlign={`left`}
              letterSpacing={`.13rem`}
              fontWeight={400}
            >
              Scheduled Inspection
            </Text>
          </Stack>
          <Center
            onClick={() => disclosure.onClose()}
            color="matador_text.100"
            cursor={`pointer`}
          >
            <IoMdClose fontSize={isMobile ? "2.5rem" : "3rem"} />
          </Center>
        </HStack>
      </ModalHeader>
      <ModalBody p={12}>
        <Stack
          p={{
            base: "10.383px 27.687px 10.383px 20.765px",
            md: "11.596px 30.921px 11.596px 23.191px",
          }}
          border="1.288px solid"
          borderColor={
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.100"
          }
          spacing="none"
          divider={
            <StackDivider
              mb={{ base: "10.38px", md: "11.6px" }}
              border="none"
              h="0.8px"
              bg={
                theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.100"
              }
            />
          }
          w="full"
          bg={
            theme.theme_name !== "light" ? "matador_background.100" : "card_bg"
          }
        >
          {OVERVIEW_INFO.map((info, idx) => {
            return (
              <HStack
                py={{ base: "9.85px", md: "11px" }}
                key={idx}
                justify="space-between"
                w="full"
              >
                <Text
                  fontSize={{ base: "12px", md: "13px" }}
                  fontFamily="Open Sans"
                  lineHeight={{ base: "17px", md: "19px" }}
                  fontWeight="400"
                  color="matador_text.500"
                  letterSpacing="0.84px"
                >
                  {info.label}
                </Text>
                {info?.component || (
                  <Text
                    fontSize={{ base: " 12.536px", md: "15px" }}
                    lineHeight={{ base: "14px", md: "16px" }}
                    fontWeight="600"
                    color="matador_text.200"
                    textTransform='capitalize'
                  >
                    {info?.value}
                  </Text>
                )}
              </HStack>
            );
          })}
        </Stack>
      </ModalBody>
    </Box>
  );
};

export default PendingInspectionDetails;
