'use client';

import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';

import { constants } from '../configs/Constants';
import { FETCH_FORM_DATA, FETCH_TOKEN_CREATE, FETCH_ORDER_CREATE, FETCH_ORDER_RETRIEVE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../configs/Constants';
import requests from './Requests';

export const fetchFormData = (data) => ({ type: FETCH_FORM_DATA, payload: data });
export const fetchTokenCreate = (data) => ({ type: FETCH_TOKEN_CREATE, payload: data });
export const fetchOrderCreate = (data) => ({ type: FETCH_ORDER_CREATE, payload: data });
export const fetchOrderRetrieve = (data) => ({ type: FETCH_ORDER_RETRIEVE, payload: data });
export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = () => ({ type: FETCH_DATA_SUCCESS });
export const fetchDataFailure = (error) => ({ type: FETCH_DATA_FAILURE, payload: error });

export const setFormData = (data) => {
  return async (dispatch) => {
    dispatch(fetchFormData(data));
  };
};

export const tokenCreate = (callback=null) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await requests.axios(`${constants.baseUrl}/api/payment/token/`, 'POST');
      if (response.status === 200) {
        const date = moment().add(response.data.expires_in, 'seconds').format('YYYY-MM-DD HH:mm:ss');
        const data = { ...response.data, expires_at: date };
        dispatch(fetchTokenCreate(data));
        dispatch(fetchDataSuccess());
        if (callback !== null) {
          dispatch(callback(data));
        }
      } else {
        dispatch(fetchDataFailure(response.data));
      }
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(fetchDataFailure(error.response.data));
      } else {
        dispatch(fetchDataFailure(error.message));
      }
    }
  };
};

export const tokenCheck = (token, callback, data=null, dataCallback=null) => {
  return async (dispatch) => {
    const date1 = moment();
    const date2 = moment(token.expires_at, 'YYYY-MM-DD HH:mm:ss');

    const diffInSeconds = date2.diff(date1, 'seconds');

    if (diffInSeconds <= 0) {
      dispatch(tokenCreate());
    } else {
      if (data !== null) {
        if (dataCallback !== null) {
          dispatch(callback(token, data, dataCallback));
        } else {
          dispatch(callback(token, data));
        }
      } else {
        if (dataCallback !== null) {
          dispatch(callback(token, dataCallback));
        } else {
          dispatch(callback(token));
        }
      }
    }
  };
};

export const orderCreate = (token, data, callback) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const headers = {
        'Authorization': `Token ${token.token}`,
      };
      const params = {
        name: data.step5,
        phone: data.step6,
        city: data.step7,
        quarter: data.step8,
        drugs: data.stepValue1.map((drug, i) => ({
          name: drug.name,
          price: drug.price,
          quantity: data.stepValue2[i],
          prescription: data.stepValue3[i]
        }))
      };
      const response = await requests.axios(`${constants.baseUrl}/api/order/create/`, 'POST', headers, params);
      if (response.status === 200) {
        dispatch(fetchOrderCreate(response.data));
        dispatch(fetchDataSuccess());
        dispatch(callback());
      } else {
        dispatch(fetchDataFailure(response.data));
      }
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(fetchDataFailure(error.response.data));
      } else {
        dispatch(fetchDataFailure(error.message));
      }
    }
  };
};

export const orderRetrieve = (token, data) => {
  return async (dispatch) => {
    var orders = [ ...data ];
    data.forEach(async (order, i) => {
      if (order.payment.status === 'PENDING') {
        dispatch(fetchDataRequest());
        try {
          const headers = {
            'Authorization': `Token ${token.token}`,
          };
          const response = await requests.axios(`${constants.baseUrl}/api/order/retrieve/${order.id}/`, 'GET', headers);
          if (response.status === 200) {
            orders[i] = response.data
            dispatch(fetchOrderRetrieve(orders));
            dispatch(fetchDataSuccess());
          } else {
            dispatch(fetchDataFailure(response.data));
          }
        } catch (error) {
          if (error.response !== undefined) {
            dispatch(fetchDataFailure(error.response.data));
          } else {
            dispatch(fetchDataFailure(error.message));
          }
        }
      }
    });
  };
};

export const useLogin = (email, password, callback) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const params = {
        email,
        password,
      };
      const response = await requests.axios(`${constants.baseUrl}/api/auth/token/`, 'POST', {}, params);
      if (response.status === 200) {
        await Cookies.set('token', response.data);
        dispatch(fetchDataSuccess());
        dispatch(callback(true));
      } else {
        dispatch(fetchDataFailure(response.data));
        dispatch(callback(false));
      }
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(fetchDataFailure(error.response.data));
      } else {
        dispatch(fetchDataFailure(error.message));
      }
      dispatch(callback(false));
    }
  };
};

export const useRefresh = (token) => {
  return async (dispatch) => {
    await Cookies.remove('token');
    await Cookies.set('token', 'token');
  };
};

export const useLogout = () => {
  return async (dispatch) => {
    await Cookies.remove('token');
  };
};
