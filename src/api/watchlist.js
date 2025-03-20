import axios from "../utils/axiosInstance";
import { BaseURL_TWO, BaseURL_ONE, store_name } from "../constants/routes.js";
import { getSession } from "utils/sessionmanagers";

// const store_name =
//   typeof window !== "undefined" && Boolean(localStorage.getItem("LoggedinUser"))
//     ? JSON?.parse(localStorage.getItem("storeDetails"))["store_name"]
//     : undefined;

export const fetchWatchlist = async () => {
  const storeName = store_name();
  const user = await getSession("loggedIn");

  return await axios.get(
    `${BaseURL_ONE}/investment/watchlist/${user?.id}?store_name=${storeName}`
  );
};

export const toggleWatchlist = async (propertyId) => {
  const storeName = store_name();

  return await axios.post(
    `${BaseURL_ONE}/investment/watchlist/${propertyId}?store_name=${storeName}`
  );
};
