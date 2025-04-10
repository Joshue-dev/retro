import React from "react";
import {
  InputGroup,
  Input,
  FormControl,
  Text,
  SlideFade,
  InputRightElement,
  InputLeftElement,
  HStack,
  Select,
  Box,
  useTheme,
} from "@chakra-ui/react";
import { themeStyles } from "../../../theme";
import {
  CURRENCIES,
  PHONEPREFIX,
  TITLES,
} from "@/components/constants/settings";
import { PhoneInput } from ".";
import useLocalStorage from "utils/hooks/useLocalStorage";
import countries from "constants/country";

export const FormInput = ({
  label,
  leftAddon,
  rightAddon,
  error,
  group,
  leftAddonStyle,
  getDialCode,
  formik,
  _placeholder = {},
  ...rest
}) => {
  const theme = useTheme();
  const [defaultCurrency] = useLocalStorage("defaultCurrency");
  const BASE_CURRENCY =
    countries?.find((item) => item?.abbreviation === formik?.values?.currency)
      ?.abbreviation || defaultCurrency;
  const [currency, setCurrency] = React.useState(BASE_CURRENCY);
  const isDarkMode = theme.theme_name !== "light";

  const handleGender = (val) => {
    const gender = val === "Mr." ? "male" : "female";
    formik?.setFieldValue("gender", gender);
  };

  const handleCurrency = (val) => {
    setCurrency(val);
    formik?.setFieldValue("currency", val);
  };

  return (
    <FormControl {...themeStyles.textStyles.sl5}>
      {label && (
        <Text
          fontSize={{ base: "14px", md: "16px" }}
          color={isDarkMode ? "text" : "matador_text.500"}
          pb={2}
        >
          {label}
        </Text>
      )}
      <HStack w="full" gap={`12px`}>
        {rest.type === "title" ? (
          <Box
            position="relative"
            w="85px"
            height={rest?.h || rest?.height ? rest?.h || rest?.height : "44px"}
            border={"1px solid"}
            borderColor={rest.borderColor}
            bg={isDarkMode ? "background" : "none"}
            _disabled={rest.disabled}
          >
            <Select
              w="fit-content"
              name="gender"
              overflowX="hidden"
              onChange={(e) => {
                handleGender(e.target.value);
              }}
              zIndex="2"
              position="absolute"
              p="0px"
              cursor="pointer"
              left="10px"
              top={"0px"}
              border="none"
              required
              id="title"
              lineHeight="18px "
              color={rest.bg}
              fontSize={{ base: "14px", md: "16px" }}
              height={
                rest?.h || rest?.height ? rest?.h || rest?.height : "44px"
              }
              fontWeight="300"
              _focus={{
                border: "none",
              }}
              _active={{
                border: "none",
              }}
              isDisabled={rest.disabled}
              disabled={rest.disabled}
              _disabled={{
                opacity: 0,
              }}
              sx={{
                "> option": {
                  bg: "card_bg",
                },
                paddingInlineStart: 0,
              }}
              paddingInlineStart={0}
              placeholder="Title"
              _placeholder={{
                opacity: 0.5,
              }}
            >
              {TITLES.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {`${item}`}
                  </option>
                );
              })}
            </Select>
          </Box>
        ) : null}
        {rest.type === "amount" ? (
          <Box
            position="relative"
            w="85px"
            height={rest?.h || rest?.height ? rest?.h || rest?.height : "44px"}
            border={"1px solid"}
            borderColor={rest.borderColor}
            bg={isDarkMode ? "background" : "none"}
            _disabled={rest.disabled}
          >
            <HStack spacing="10px" pl="12px" w="full" h="full">
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                color={
                  theme.theme_name !== "light"
                    ? "matador_text.500"
                    : "matador_text.300"
                }
                fontWeight="400"
              >
                {currency}
              </Text>
            </HStack>
            <Select
              w="fit-content"
              name="currency"
              overflowX="hidden"
              opacity="0"
              onChange={(e) => {
                handleCurrency(e.target.value);
              }}
              zIndex="2"
              position="absolute"
              p="0px"
              cursor="pointer"
              left="10px"
              top={"0px"}
              border="none"
              required
              id="currency"
              lineHeight="18px "
              color={rest.bg}
              fontSize="16px"
              height={
                rest?.h || rest?.height ? rest?.h || rest?.height : "44px"
              }
              fontWeight="300"
              _focus={{
                border: "none",
              }}
              _active={{
                border: "none",
              }}
              isDisabled={rest.disabled}
              disabled={rest.disabled}
              _disabled={{
                opacity: 0,
              }}
              sx={{
                "> option": {
                  bg: "card_bg",
                },
              }}
              value={currency}
            >
              {countries?.map((item, index) => {
                return (
                  <option key={index} value={item?.abbreviation}>
                    {`${item?.abbreviation}`}
                  </option>
                );
              })}
            </Select>
          </Box>
        ) : null}
        <InputGroup borderColor={"text"} color="#E4E4E4" m="0px" {...group}>
          {leftAddon ? (
            <InputLeftElement ml="0" {...leftAddonStyle}>
              {leftAddon}
            </InputLeftElement>
          ) : null}
          <Input
            borderRadius={0}
            color="text"
            h={rest?.h || rest?.height ? rest?.h || rest?.height : "44px"}
            fontFamily="Noto Sans"
            fontSize={{ base: '14px', md: '16px' }}
            isInvalid={error}
            border={
              error
                ? "1px solid"
                : rest.border
                ? `${rest.border} `
                : `1px solid`
            }
            borderColor={
              error
                ? `red !important`
                : rest.border
                ? `${rest.borderColor} !important`
                : isDarkMode
                ? "matador_border_color.200 !important"
                : `matador_border_color.100 !important`
            }
            _placeholder={{
              fontSize: 16,
              letterSpacing: "0.18px",
              color: "text",
              opacity: 0.6,
              ..._placeholder,
            }}
            _focus={{
              border: error
                ? "1px solid !important"
                : rest.border
                ? `${rest.border} !important`
                : `1px solid !important`,
              borderColor: error
                ? `red !important`
                : rest.border
                ? `${rest.borderColor} !important`
                : `matador_border_color.100 !important`,
            }}
            _focusVisible={{
              border: error
                ? "1px solid !important"
                : rest.border
                ? `${rest.border} !important`
                : `1px solid !important`,
              borderColor: error
                ? `red !important`
                : rest.border
                ? `${rest.borderColor} !important`
                : `matador_border_color.100 !important`,
            }}
            bg={isDarkMode ? "background" : "none"}
            autoFocus={false}
            {...rest}
          />
          {rightAddon ? (
            <InputRightElement>{rightAddon}</InputRightElement>
          ) : null}
        </InputGroup>
      </HStack>
      <SlideFade in={error} offsetY="10px">
        <Text
          color={themeStyles.color.matador__red}
          my={{ base: "3px", md: "5px" }}
          fontSize={{ base: "10px", md: "14px" }}
        >
          {error}
        </Text>
      </SlideFade>
    </FormControl>
  );
};
