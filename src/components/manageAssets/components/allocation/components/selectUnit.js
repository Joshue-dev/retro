import {
  Flex,
  RadioGroup,
  HStack,
  Text,
  Tooltip,
  Radio,
  Grid,
  useTheme,
} from "@chakra-ui/react";
import React from "react";
import { useLightenHex } from "../../../../../utils/lightenColorShade";

const SelectUnit = ({ ALLOCATIONS, setAllocationVal, allocationVal }) => {
  const theme = useTheme()
  const primaryColor = theme.colors.primary;
  const { lightenHex } = useLightenHex(primaryColor);
  return ALLOCATIONS?.length ? (
    <RadioGroup onChange={setAllocationVal} value={allocationVal} pl={{ base: 4, md: '10px'}}>
      <Text
        fontSize={{ base: "16px", md: "20px" }}
        fontWeight="700"
        fontFamily="Open Sans"
        color="primary"
      >
        SELECT A UNIT
      </Text>
      <Flex flexWrap='wrap' gap={'30px 10px'} mt='20px'>
        {ALLOCATIONS.map((allocation, idx) => {
          return (
            <Radio
              w="fit-content"
              minW="fit-content"
              key={idx}
              isDisabled={allocation?.allocated}
              value={allocation?.name}
              hidden
            >
              <Tooltip
                borderRadius="3px"
                fontSize="12px"
                hasArrow
                isDisabled={!allocation?.allocated}
                placement="auto"
                label="This unit has been allocated"
              >
                <HStack
                  cursor={allocation?.allocated ? "not-allowed" : "pointer"}
                  bg={
                    allocationVal == allocation?.name
                      ? theme.theme_name !== 'light' ? lightenHex(50) : "matador_button_bg.100"
                      : "transparent"
                  }
                  border={"1px solid"}
                  transition="0.4s ease-in-out"
                  _hover={{
                    bg:
                      allocationVal == allocation?.name
                        ? "matador_button_bg.100"
                        : theme.theme_name !== 'light' ? lightenHex(60) : 'rgba(0, 0, 0, 0.10)',
                    color:
                      allocationVal == allocation?.name
                        ? "matador_button_text.100"
                        : "matador_text.200",
                  }}
                  color={
                    allocationVal == allocation?.name
                      ? "matador_button_text.100"
                      : "matador_text.200"
                  }
                  borderColor="matador_button_bg.100"
                  opacity={allocation?.allocated ? 0.8 : 1}
                  justify="center"
                  p={{ base: "14.326px 10.745px", md: "16px 12px" }}
                  minH={{ base: "46.7px", md: "52px" }}
                  maxH='52px'
                  minW={{ md: "100px", base: "101.18px" }}
                  maxW='max-content'
                >
                  <Text
                    fontFamily="Liberation Sans"
                    letterSpacing="3.2px"
                    textTransform="uppercase"
                    fontSize={{ base: "16.117px", md: "18px" }}
                    fontweight="700"
                  >
                    {allocation?.name}
                  </Text>
                </HStack>
              </Tooltip>
            </Radio>
          );
        })}
      </Flex>
    </RadioGroup>
  ) : null;
};

export default SelectUnit;