export const appWindow = typeof window !== "undefined" ? window : null;

export const BUSINESS_ID = () =>
  appWindow && localStorage && JSON?.parse(localStorage.getItem("businessId"));
// : global?.location?.reload();

export const BaseURL_ONE = "https://api.matadortrust.com/v1";
export const BaseURL_TWO = "https://api.matadortrust.com/v2";
export const ROUTES = {};

export const EXTERNAL_ROUTES = {};

export const BASE_ROUTE = "https://matadortrust.com";

const isEnvDev = process && process.env.NODE_ENV === "development";

let storeDomain = "app.veritasihomes.com";

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
