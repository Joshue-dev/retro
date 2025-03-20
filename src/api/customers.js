import axios from 'axios';
import {useEffect} from 'react';
import {BaseURL_TWO, BaseURL_ONE} from '../constants/routes';

const token = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('devToken'));
const BEARER_TOKEN = {
  headers: {Authorization: `Bearer ${token}`},
};

// GET REQUESTS
export const fetchAllCustomers = async () => {
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/customers/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchCustomers = async () => {
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/developer-customer`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchOneCustomer = async id => {
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/developers/developer-customer/${id}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchCustomerViaEmail = async (business_id, email, token) => {
  let response = [];
  const BEARER_TOKEN = {
    headers: {Authorization: `Bearer ${token}`},
  };

  await axios
    .get(
      `${BaseURL_ONE}/account/user-basic-data?business_id=${business_id}&email=${email}`,
      BEARER_TOKEN
    )
    .then(res => (response = res))
    .catch(res => (response = res));
  return response;
};

export const fetchCustomersEquity = async customerId => {
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/customers/${customerId}/equity/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchCustomersEquityTxns = async equityId => {
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/equity/${equityId}/transactions/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

// POST REQUESTS

export const createCustomer = body => {
  return axios.post(`${BaseURL_TWO}/developers/customers/`, body, BEARER_TOKEN);
};
export const createCustomerEquity = body => {
  return axios.post(`${BaseURL_TWO}/developers/customers/equity/`, {...body}, BEARER_TOKEN);
};

export const allocateUnitToEquity = body => {
  return axios.post(`${BaseURL_TWO}/developers/allocate/`, {...body}, BEARER_TOKEN);
};

export const blacklistCustomer = (customerId, body) => {
  return axios.post(`${BaseURL_TWO}/developers/customers/${customerId}/blacklist/`, BEARER_TOKEN, {
    ...body,
  });
};

export const respondToInspectionFeedBack = (data, project_id, token) => {
  const BEARER_TOKEN = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return axios.post(
    `${BaseURL_TWO}/developers/project-inspection/${data.project_id}/`,
    data.body,
    BEARER_TOKEN
  );
};
