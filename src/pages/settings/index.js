import React from "react";
import { LayoutView } from "../../components/page_layout";
import { Box } from "@chakra-ui/react";
import Profile from "./sections/Profile";
import Auth from "../../hoc/Auth";

const Settings = () => {
  return (
    <LayoutView pb={0} noPadding>
      <Box
        w="full"
        px={{ base: "20px", lg: "80px" }}
      >
        <Profile />
      </Box>
    </LayoutView>
  );
};

export default Auth(Settings);