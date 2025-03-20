import { storeDetails } from "@/api/auth";
import { ReportBug } from "@/components/report_bug";
import { useQuery } from "react-query";

const {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  HStack,
  Text,
  DrawerCloseButton,
  useTheme,
  Stack,
  useDisclosure,
} = require("@chakra-ui/react");

const HelpCenterDrawer = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const STOREINFO = useQuery(["storeInfo"], storeDetails);
  const reportBugModal = useDisclosure();

  const handle_whatsapp = () => {
    if (STOREINFO?.data?.data?.data?.whatsapp_url) {
      window.open(STOREINFO?.data?.data?.data?.whatsapp_url || `/`);
    }
  };

  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent roundedTop="1rem">
        <HStack
          align="center"
          p="19.236px 24px"
          borderBottom="0.8px solid"
          borderBottomColor={
            theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.300"
          }
        >
          <Text
            fontWeight={600}
            color="text"
            letterSpacing="0.96px"
            fontFamily="Open Sans"
            textTransform="uppercase"
            fontSize="16px"
          >
            Help Center
          </Text>
          <DrawerCloseButton color='text' mt={"2rem"} mr={6} size={14} />
        </HStack>
        <Stack gap="16px" p="24px">
          <Stack
            align="center"
            justify="center"
            border="1px solid"
            borderColor="primary"
            onClick={handle_whatsapp}
          >
            <Text
              textTransform="uppercase"
              fontFamily="Liberation Sans"
              p="24px"
              fontSize="16px"
              fontWeight={600}
              color="primary"
            >
              Contact Support
            </Text>
          </Stack>
        </Stack>
      </DrawerContent>
      <ReportBug reportBugModal={reportBugModal} />
    </Drawer>
  );
};

export default HelpCenterDrawer;
