export const appWindow = typeof window !== "undefined" ? window : null;

export const BUSINESS_ID = () =>
  appWindow && localStorage && JSON?.parse(localStorage.getItem("businessId"));
// : global?.location?.reload();

export const BaseURL_ONE = "https://api.veritasihomes.com/v1";
export const BaseURL_TWO = "https://api.veritasihomes.com/v2";
export const ROUTES = {};

export const EXTERNAL_ROUTES = {};

export const BASE_ROUTE = "https://matadortrust.com";

const isEnvDev = process && process.env.NODE_ENV === "development";

let storeDomain;

if (process.env.NODE_ENV === "development") {
  //Store Domain for development

  // storeDomain = "orangetestapp.6787878.com";
  // storeDomain = 'dickson-store.6787878.com';
  // storeDomain = "ahmedibraheem.6787878.com";
  storeDomain = "app.veritasihomes.com";
  // storeDomain = 'jola.6787878.com';
  // storeDomain = 'mainstone.6787878.com';
  // storeDomain = 'tolulope.6787878.com';
  // storeDomain = 'https://app.adozillionhomesng.com'?.split('//')[1];
  // storeDomain = 'proptech.6787878.com';

  // storeDomain = 'piushomes.6787878.com';
  // storeDomain = 'joseph_store.6787878.com';
  // storeDomain = 'ethernit.6787878.com';
} else {
  //Store Domain for Production

  storeDomain =
    typeof window !== "undefined" && window.location.origin && !isEnvDev
      ? window.location.origin?.split("//")[1]
      : null;
}
export const STORE__DOMAIN = storeDomain;

export const store_name = () =>
  appWindow &&
  localStorage.getItem("storeName") &&
  JSON?.parse(localStorage.getItem("storeName"));

export const STORENAMEFROMDOMAIN = store_name();
// STORE__DOMAIN?.split('.')[0];

export const storeName = store_name();
// STORENAMEFROMDOMAIN;
// typeof window !== 'undefined' &&
// localStorage.getItem('storeDetails') &&
// JSON?.parse(localStorage?.getItem('storeDetails'))['store_name'];

export const LoggedinUser =
  typeof window !== "undefined" &&
  localStorage.getItem("storeDetails") &&
  JSON?.parse(localStorage?.getItem("LoggedinUser"));

export const STORE =
  typeof window !== "undefined" &&
  localStorage.getItem("storeDetails") &&
  JSON?.parse(localStorage?.getItem("storeDetails"));
