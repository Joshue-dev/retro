import React from "react";
import {
  Button,
  HStack,
  Stack,
  useMediaQuery,
  Text,
  Center,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  useTheme,
} from "@chakra-ui/react";
import AllocationGallery from "../../../manageAssets/components/allocation/components/allocationGallery";
import SelectUnit from "../../../manageAssets/components/allocation/components/selectUnit";
import { Spinner } from "ui-lib";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const SelectAllocationForAssetsInfo = ({
  handleScreen,
  uploads,
  handleClose,
  drawerDisClosure,
  ALLOCATIONS,
  setAllocationVal,
  allocationVal,
  handleParentScreen,
  FETCH_UNIT_ALLOCATIONS,
  FETCH_UNIT_ALLOCATION_IMAGES,
}) => {
  const theme = useTheme();
  const [isBelowMd] = useMediaQuery("(max-width:540px)");

  const customScrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "4px",
      borderRadius: "16px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "16px",
      WebkitBoxShadow: "inset 0 0 6px #ffffff",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "16px",
      backgroundColor: "#cbcbcb",
    },
  };

  const AVAILABLE_ALLOCATIONS = ALLOCATIONS?.filter((item) => !item?.archived)
  // switch component depending on the screen size
  return (
    <>
      <HStack
        p={{ base: "30.501px 21.49px 30.039px 21.49px", md: "24.5px 24px" }}
        w="full"
        maxH={{ base: "89.5px", md: "100px" }}
        justify="space-between"
        align="center"
        borderBottom="1px solid"
        borderBottomColor={
          theme.theme_name !== "light"
            ? "matador_border_color.200"
            : "matador_border_color.300"
        }
      >
        <HStack
          spacing="4px"
          role="button"
          
        >
          <ChevronLeftIcon
            onClick={
              isBelowMd
                ? drawerDisClosure?.onClose
                : handleParentScreen("asset info")
            }
            fontSize={"35px"}
            cursor='pointer'
            color='text'
          />
          <Text
            as="h1"
            fontSize={{ base: "16px", md: "20px" }}
            fontFamily="Open Sans"
            lineHeight={{ base: "22px", md: "33px" }}
            fontWeight="600"
            color="text"
            textTransform="uppercase"
            letterSpacing="1.44px"
          >
            Unit allocation
          </Text>
        </HStack>

        <DrawerCloseButton color="text" fontSize={14} position="initial" />
      </HStack>
      {FETCH_UNIT_ALLOCATIONS.isLoading ||
      FETCH_UNIT_ALLOCATION_IMAGES.isLoading ? (
        <Center mt="15vh">
          <Spinner size='50px' noAbsolute color="#0D0D0D" />
        </Center>
      ) : FETCH_UNIT_ALLOCATIONS?.isError ? (
        <Center h="50vh">
          <Text
            fontSize="11px"
            color="text"
            fontWeight="400"
            textAlign="'center"
          >
            Oops something went wrong fetching allocations,please try again
            later.
          </Text>
        </Center>
      ) : (
        <>
          <DrawerBody
            sx={customScrollbarStyles}
            w="full"
            maxH='80rem' overflowY='auto'
          >
            <Stack w="full" spacing={{ base: "21.66px", md: "24px" }} >
              <AllocationGallery uploads={uploads} />
              <SelectUnit
                ALLOCATIONS={AVAILABLE_ALLOCATIONS}
                setAllocationVal={setAllocationVal}
                allocationVal={allocationVal}
              />
            </Stack>
          </DrawerBody>
          <DrawerFooter w="full" pb={10}>
            <Button
              p={{ base: "9.961px 17.93px", md: "11.125px 20.025px" }}
              h={{ base: "57.3px", md: "64px" }}
              fontSize={{ base: "16.117px", md: "18px" }}
              fontWeight="400"
              bg="primary"
              borderRadius="0px"
              color="#FFF"
              isDisabled={!allocationVal}
              onClick={handleScreen("confirm selection")}
              _hover={{
                opacity: 1,
              }}
              _focus={{
                opacity: 1,
              }}
              _active={{
                opacity: 1,
              }}
              w="full"
              textTransform="uppercase"
              letterSpacing="0.16px"
            >
              Proceed
            </Button>
          </DrawerFooter>
        </>
      )}
    </>
  );
};
export default SelectAllocationForAssetsInfo;
