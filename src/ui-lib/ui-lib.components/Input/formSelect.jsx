import React from "react";
import {
  InputGroup,
  Input,
  FormControl,
  FormLabel,
  Text,
  SlideFade,
  InputRightElement,
  InputLeftElement,
  InputLeftAddon,
  Select,
  useTheme,
} from "@chakra-ui/react";
import { themeStyles } from "../../../theme";

export const FormSelect = ({ label, options, leftAddon, rightAddon, error, ...rest }) => {
  const theme = useTheme()
  const isDarkMode = theme.theme_name !== 'light'

  return (
    <FormControl {...themeStyles.textStyles.sl5}>
     {label && <Text fontSize={{ base: '14px', md: '16px' }} color='text' fontWeight={{ base: '400', md: '400' }} pb={2}>
        {label}
      </Text>}
      <InputGroup borderColor={"text"}>
        {leftAddon ? (
          <InputLeftElement ml='2'>
            {leftAddon}
          </InputLeftElement>
        ) : null}
        <Select
          borderRadius={0}
          color='text'
          h={"44px"}
          fontFamily='Noto Sans'
          fontSize={"16px"}
          isInvalid={error}
          _focus={{
            border: error
              ? "0.5px solid red !important"
              : `0.5px solid #747474 !important`,
          }}
          _hover={{
            border: error
              ? "0.5px solid red !important"
              : `0.5px solid #747474 !important`,
          }}
          _focusVisible={{
            border: error
              ? "0.5px red solid !important"
              : `0.5px solid #747474 !important`,
          }}
          border={error ? '1px solid' : rest.border ? `${rest.border} ` : `1px solid`}
          borderColor={
            error
              ? `red !important`
              : rest.border
              ? `${rest.borderColor} !important` : isDarkMode ? 'matador_border_color.200 !important' :
              `matador_border_color.100 !important`
          }
          bg={isDarkMode ? 'background': 'none'}
          _placeholder={{
            fontSize: 16,
            letterSpacing: '0.18px',
            color: 'text',
            opacity: 0.75,
            ...rest._placeholder,
          }}
          sx={{
            '& > option:hover': {
              background: 'primary',
            },
            '& > option': {
              background: 'background'
            }
          }}
          {...(rest?.value === "" && {opacity: 0.6})}
          {...rest}
        >
          <option value='' disabled>{rest?.place}</option>
          {(options || []).map(option => (
            <option value={option} key={option}>{option}</option>
          ))}
        </Select>
        {rightAddon ? (
          <InputRightElement>
            {rightAddon}
          </InputRightElement>
        ) : null}
      </InputGroup>
      <SlideFade in={error} offsetY="10px">
        <Text
          color={themeStyles.color.matador__red}
          my={"5px"}
          fontSize={"14px"}
        >
          {error}
        </Text>
      </SlideFade>
    </FormControl>
  );
};
