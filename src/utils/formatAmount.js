import { Text } from "@chakra-ui/react";
import {countries} from "constants/country";

export const formatAmount = (str) => {
  // convert input string to number
  // handle result as a money value in US format
  // since the above returns a string with commas, remove commas from returning string values
  return str && typeof str == "string"
    ? Number(str?.replace(/\,/g, "")).toLocaleString("en-US")
    : Number(str?.toString()?.replace(/\,/g, "")).toLocaleString("en-US");
};

export const formatAmountWithDecimal = (arg, symb) => {
  const formattedAmount = Number(arg).toFixed(2).toString();
  let [whole, decimal] = formattedAmount.split(".");
  let result = decimal
    ? [Number(whole).toLocaleString(), decimal].join(".")
    : Number(whole).toLocaleString();

  return (
    <Text whiteSpace={"nowrap"}>
      {`${symb ? symb : "₦"} ${result.toString().slice(0, -3)}`}
      <Text as="span" color="lightgrey">
        {result.toString().slice(-3)}
      </Text>
    </Text>
  );
};

export const formatToCurrency = (amount, curr = 'naira', condition = 'no space', excludeCurrency) => {
  if (typeof window === 'undefined') return;
  const defaultCurrency =
    localStorage.getItem('defaultCurrency') !== 'undefined' && localStorage.getItem('defaultCurrency')
      ? localStorage.getItem('defaultCurrency')
      : 'NGN';

  const defaultCountry =
    localStorage.getItem('defaultCountry') !== 'undefined' && localStorage.getItem('defaultCurrency')
      ? localStorage.getItem('defaultCountry')
      : 'Nigeria';
  const locale = countries.find(item => item.name === defaultCountry)?.locale || 'en-NG';

  try {
    const formattedAmount =
      amount && typeof amount === 'string'
        ? Number(amount.replace(/\,/g, ''))
        : Number(amount?.toString()?.replace(/\,/g, ''));

    let formattedString = formattedAmount.toLocaleString(locale, {
      style: 'currency',
      currency: JSON.parse(defaultCurrency),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Add space if condition is not 'no space'
    if (condition !== 'no space') {
      formattedString = formattedString.replace(/(.)(.*)/, '$1 $2');
    }
    if (excludeCurrency) {
      // If excludeCurrency is true, remove currency symbol using regex
      formattedString = formattedString.substring(1).trim();
    }
    if (formattedString.includes('NaN')) {
      throw new Error('-');
    }
    return formattedString;
  } catch (error) {
    console.error(error);
    return '-';
  }
};

export const priceString = (curr, price, option) =>
  price &&
  `${curr == "naira" ? "₦" : ""} ${parseInt(price)?.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    ...option,
  })}.00`;
