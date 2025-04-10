import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import ContactPerson from "../modals/contactPerson";
import { useQuery } from "react-query";
import {
  fetchAllUnits,
  fetchFractionalInfo,
  fetchScheduleInspectionDetails,
  getAllContactPersons,
} from "../../../api/listing";
import FractionalModal from "./fractionalModal";
import useLocalStorage from "../../../utils/hooks/useLocalStorage";
import ScheduleInspection from "../modals/schedule_inspection";
import { useLightenHex } from "utils/lightenColorShade";

const PropertyInfo = ({
  info,
  allUnitsRef,
  buyModal,
  isBuildingTypeSingleFamilyResidential,
  unitsInfo,
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  const requestModal = useDisclosure();
  const contactModal = useDisclosure();
  const fractionalModal = useDisclosure();
  const [storeThemeInfo] = useLocalStorage("storeThemeInfo");
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);
  const fractionalIsEnabled = storeThemeInfo?.isFractionalEnabled ?? false;

  const { data: allUnits, isError } = useQuery(
    ["fetchAllUnits", info?.id],
    () => fetchAllUnits(parseInt(info?.id)),
    { enabled: !!info?.id }
  );

  const unitsData = allUnits?.data?.results;
  const unitThatWasFractionalized = unitsData?.find(
    (item) => item?.is_fraction_sale_available
  );

  const { data: fractionalDetail } = useQuery(
    ["fractional", unitThatWasFractionalized?.id],
    () => fetchFractionalInfo(unitThatWasFractionalized?.id),
    { enabled: !!unitThatWasFractionalized?.id }
  );

  const inspectionDetails = useQuery(
    ["inspectionDetails", info?.id],
    () => fetchScheduleInspectionDetails(info?.id),
    { enabled: !!info?.id }
  );

  const ALL_CONTACT_PERSONS = useQuery(["getAllContactPersons", info?.id], () =>
    getAllContactPersons(Number(info?.id))
  );

  const contactPersons = ALL_CONTACT_PERSONS?.data?.data?.results;

  const fractionalData = fractionalDetail?.data;
  const unitData = fractionalData?.fraction_data?.unit;
  const leftFractions = Number(unitData?.total_fractions);
  const isFractionalEnabled =
    fractionalIsEnabled &&
    info?.is_fractionalized &&
    info?.fraction_is_available;
  const INSPECTION_DATA = inspectionDetails?.data?.data?.data;

  return (
    <Box>
      <Flex
        direction={screenWidth > 540 ? "row" : "column"}
        alignItems={"center"}
        gap={{ base: `1.2rem`, lg: "3.2rem" }}
        justify={"center"}
      >
        {isBuildingTypeSingleFamilyResidential && !isFractionalEnabled && (
          <Button
            textTransform={"uppercase"}
            w={{ base: `100%`, md: `full` }}
            py={{ base: `1.4rem`, md: `1.6rem` }}
            px={{ base: `1rem`, md: "2.4rem" }}
            maxW={screenWidth > 540 && "22.4rem"}
            h={`52px`}
            bg={"primary !important"}
            color={"#FFF"}
            borderRadius={`0rem`}
            _hover={{
              bg: "primary !important",
            }}
            onClick={buyModal.onOpen}
            fontWeight="500"
            isDisabled={unitsInfo?.isLoading || unitsInfo?.isError}
            _active={{
              opacity: 1,
            }}
          >
            <HStack>
              <Text fontSize={{ base: `1.4rem`, md: `1.6rem` }}>
                Proceed to Payment
              </Text>
            </HStack>
          </Button>
        )}
        {!isError && isFractionalEnabled && leftFractions > 0 && (
          <Button
            textTransform={"uppercase"}
            w={{ base: `100%`, md: `20.4rem` }}
            py={{ base: `1.4rem`, md: `1.6rem` }}
            px={{ base: `1rem`, md: "2.4rem" }}
            h={`52px`}
            maxW={screenWidth > 540 && "20.4rem"}
            bg={"primary"}
            color={"#FFF"}
            borderRadius={`0rem`}
            _hover={{
              bg: "",
            }}
            onClick={fractionalModal.onOpen}
            fontWeight="500"
            _active={{
              opacity: 1,
            }}
          >
            <HStack>
              <Text fontSize={{ base: `1.4rem`, md: `1.6rem` }}>
                {isBuildingTypeSingleFamilyResidential
                  ? "Buy Fraction"
                  : "Own a Fraction"}
              </Text>
            </HStack>
          </Button>
        )}
        <Flex
          gap={{ base: "12px", md: "3.2rem" }}
          w={{ base: "full", md: "unset" }}
          justify="space-between"
        >
          {info?.inspection_enabled && (
            <Button
              textTransform={"uppercase"}
              w={{ base: `100%`, md: `26.4rem` }}
              py={{ base: `1.4rem`, md: `1.6rem` }}
              px={{ base: `1rem`, md: "2.4rem" }}
              h={`52px`}
              bg={
                theme.theme_name === "light"
                  ? `transparent`
                  : `matador_background.200`
              }
              color={theme.theme_name === "light" ? `primary` : lightenHex(80)}
              borderRadius={`0rem`}
              border={"1px solid"}
              borderColor={
                theme.theme_name === "light"
                  ? `primary`
                  : `matador_border_color.200`
              }
              _focus={{
                bg: "transparent",
                border: ".2rem solid !important",
                borderColor:
                  theme.theme_name === "light" ? `primary` : `matador_text.100`,
              }}
              _hover={{
                bg: "transparent",
                border: ".2rem solid !important",
                borderColor:
                  theme.theme_name === "light" ? `primary` : `matador_text.100`,
              }}
              onClick={requestModal.onOpen}
              fontWeight="500"
            >
              <HStack>
                <Text fontSize={{ base: `1.3rem`, md: `1.6rem` }}>
                  Schedule Inspection
                </Text>
              </HStack>
            </Button>
          )}
          <Button
            textTransform={`uppercase`}
            w={{ base: `100%`, md: `26.4rem` }}
            py={{ base: `1.4rem`, md: `1.6rem` }}
            px={{ base: `1rem`, md: "2.4rem" }}
            h={`52px`}
            bg={
              theme.theme_name === "light"
                ? `transparent`
                : `matador_background.200`
            }
            color={theme.theme_name === "light" ? `primary` : lightenHex(80)}
            borderRadius={0}
            border={"1px solid"}
            borderColor={
              theme.theme_name === "light"
                ? `primary`
                : `matador_border_color.200`
            }
            _focus={{
              bg: "transparent",
              border: ".2rem solid !important",
              borderColor:
                theme.theme_name === "light" ? `primary` : `matador_text.100`,
            }}
            _hover={{
              bg: "transparent",
              border: ".2rem solid !important",
              borderColor:
                theme.theme_name === "light" ? `primary` : `matador_text.100`,
            }}
            onClick={!info?.contact_persons.length > 0 && !contactPersons?.length > 0 ? null : contactModal.onOpen}
            isDisabled={ALL_CONTACT_PERSONS?.isLoading || !info?.contact_persons.length > 0 && !contactPersons?.length > 0}
            fontWeight="500"
          >
            <Text fontSize={{ base: `1.3rem`, md: `1.6rem` }}>
              Contact Person
            </Text>
          </Button>
        </Flex>
      </Flex>

      <FractionalModal
        isBuildingTypeSingleFamilyResidential={
          isBuildingTypeSingleFamilyResidential
        }
        fractionalModal={fractionalModal}
        info={info}
      />
      <ScheduleInspection
        disclosure={requestModal}
        info={info}
        inspectionDetails={INSPECTION_DATA}
        refetch={inspectionDetails?.refetch}
      />
      <ContactPerson
        info={info}
        contactModal={contactModal}
        contactPersons={contactPersons}
      />
    </Box>
  );
};

export default PropertyInfo;
