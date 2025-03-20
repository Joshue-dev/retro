import axios from "../utils/axiosInstance";
import { BaseURL_TWO, BaseURL_ONE, store_name } from "../constants/routes.js";

export const fetchNotifs = async () => {
  const storeName = store_name();
  return await axios.get(
    `${BaseURL_TWO}/store/get_notify_store?notify=true&store=${storeName}`
  );
};

export const fetchSpace = async () => {
  const storeName = store_name();

  return await axios.get(
    `${BaseURL_TWO}/store/get_notify_store?space=true&store=${storeName}`
  );
};

export const getMoreInfo = async (id) => {
  return await axios.get(
    `${BaseURL_TWO}/store/view_notification_data/${parseInt(id)}`
  );
};

export const UpdateStatus = async (body) => {
  return axios.patch(`${BaseURL_TWO}/store/get_notify_store`, body);
};

export const UpdateSingleNotif = async (id) => {
  const storeName = store_name();
  return axios.patch(
    `${BaseURL_TWO}/store/get_notify_store/${parseInt(id)}`, { notify: true, store: storeName });
};

export const handleCoownerShipRequest = (requestId, body) => {
  return axios.post(
    `${BaseURL_TWO}/investment/co-own/respond/${parseInt(requestId)}/`,
    body
  );
};
