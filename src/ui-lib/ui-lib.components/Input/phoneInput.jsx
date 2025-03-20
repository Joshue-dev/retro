import {
  Box,
  HStack,
  Text,
  Select,
  useTheme,
  FormControl,
  Input,
} from "@chakra-ui/react";
import countries from "constants/country";
import { PhoneNumberUtil } from "google-libphonenumber";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";

const phoneUtil = PhoneNumberUtil.getInstance();

export const PhoneInput = ({
  value,
  countryValue,
  formik,
  onCountryChange,
  error,
  ...rest
}) => {
  const theme = useTheme();
  const isDarkMode = theme.theme_name !== "light";

  const {
    inputValue,
    handlePhoneValueChange,
    inputRef,
    country,
    setCountry,
    phone,
  } = usePhoneInput({
    defaultCountry: "ng",
    value: "",
    disableDialCodeAndPrefix: true,
    disableDialCodePrefill: true,
    countries: defaultCountries,
    onChange: (data) => {
      handlePhone(data.inputValue);
      formik.setFieldValue("country", data.country.name);
    },
  });

  const handlePhone = (val) => {
    // setPhone(val)
    function extractNumbers(inputString) {
      const result = inputString.replace(/\D/g, "");
      return result;
    }

    const phonenumber = extractNumbers(val);

    try {
      const parsedNumber = phoneUtil.parse(phone, formik.values.country);
      const isValid = phoneUtil.isValidNumber(parsedNumber);
      if (!isValid) {
        formik.setFieldError("phone", "Please enter a valid phone number");
      } 
    } catch (error) {
      console.error("Error parsing phone number: ", error.message);
    }

    formik.setFieldValue("phone", phonenumber);
  };

  const displayDialCode = (country) => {
    return `+${
      defaultCountries.find((item) => {
        return item[0] === country?.name;
      })?.[2] || "1"
    }`;
  };
  return (
    <Box w="full">
      {rest?.label && (
        <Text
          fontSize={"16px"}
          color={isDarkMode ? "text" : "matador_text.500"}
          pb={2}
        >
          {rest?.label}
        </Text>
      )}
      <FormControl display="flex" gap={4} w="full">
        <Box
          position="relative"
          w="117px"
          height={rest?.h || rest?.height ? rest?.h || rest?.height : "44px"}
          border={"1px solid"}
          borderColor={rest.borderColor}
          bg={isDarkMode ? "background" : "none"}
          _disabled={rest.disabled}
        >
          <HStack spacing="10px" pl="12px" w="full" h="full">
            <Text
              fontSize="15px"
              color={
                theme.theme_name !== "light"
                  ? "matador_text.500"
                  : "matador_text.300"
              }
              fontWeight="400"
            >
              {displayDialCode(country)}
            </Text>
          </HStack>
          <Select
            name="country"
            overflowX="hidden"
            // hidden={true}
            opacity="0"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            icon={<FaChevronDown size={14} />}
            w="70px"
            zIndex="2"
            position="absolute"
            p="0px"
            cursor="pointer"
            left="10px"
            top={"0px"}
            // bottom="3px"
            border="none"
            required
            id="countryPhoneNumber"
            lineHeight="18px "
            color={rest.bg}
            fontSize="16px"
            height={rest?.h || rest?.height ? rest?.h || rest?.height : "44px"}
            fontWeight="300"
            _focus={{
              border: "none",
            }}
            _active={{
              border: "none",
            }}
            _focusVisible={
              {
                // border: 'none',
              }
            }
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
          >
            {defaultCountries.map((item, index) => {
              const country = parseCountry(item);
              return (
                <option key={index} value={country.iso2}>
                  +{`${country.dialCode} ${country.name}`}
                </option>
              );
            })}
          </Select>
        </Box>
        <Input
          borderRadius={0}
          color="text"
          h={rest?.h || rest?.height ? rest?.h || rest?.height : "44px"}
          fontFamily="Noto Sans"
          fontSize={"16px"}
          isInvalid={error}
          border={
            error ? "1px solid" : rest.border ? `${rest.border} ` : `1px solid`
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
            ...rest?._placeholder,
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
          ref={inputRef}
          value={inputValue}
          onChange={handlePhoneValueChange}
          {...rest}
        />
      </FormControl>
    </Box>
  );
};

const extractCountryKey = (key, country) => {
  const defaultCountry = country
    ? country
    : localStorage.getItem("baseCountry") !== "undefined" &&
      localStorage.getItem("baseCurrency")
    ? localStorage.getItem("baseCountry")
    : "United States Of America";

  return (
    countries
      .find((item) => item.name === defaultCountry)
      ?.[key]?.toLowerCase() || "us"
  );
};
