'use client';

import moment from 'moment';
import Cookies from 'js-cookie';

import { constants, FETCH_SEARCH_DATA, FETCH_FORM_DATA, FETCH_PURGE_STATE, FETCH_LOAD_DATA, FETCH_TOKEN_CREATE, FETCH_ORDER_CREATE, FETCH_ORDER_RETRIEVE, FETCH_ORDER_DELIVERY, FETCH_ORDER_PAYMENT, FETCH_ORDER_LIST, FETCH_AUTH_RETRIEVE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../configs/Constants';
import requests from './Requests';

export const fetchFormData = (data) => ({ type: FETCH_FORM_DATA, payload: data });
export const fetchSearchData = (data) => ({ type: FETCH_SEARCH_DATA, payload: data });
export const fetchPurgeStoredState = () => ({ type: FETCH_PURGE_STATE });
export const fetchLoadData = (data) => ({ type: FETCH_LOAD_DATA, payload: data });
export const fetchPaymentToken = (data) => ({ type: FETCH_TOKEN_CREATE, payload: data });
export const fetchOrderCreate = (data) => ({ type: FETCH_ORDER_CREATE, payload: data });
export const fetchOrderRetrieve = (data) => ({ type: FETCH_ORDER_RETRIEVE, payload: data });
export const fetchOrderDelivery = () => ({ type: FETCH_ORDER_DELIVERY });
export const fetchOrderPayment = () => ({ type: FETCH_ORDER_PAYMENT });
export const fetchOrderList = (data) => ({ type: FETCH_ORDER_LIST, payload: data });
export const fetchAuthRetrieve = (data) => ({ type: FETCH_AUTH_RETRIEVE, payload: data });
export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = () => ({ type: FETCH_DATA_SUCCESS });
export const fetchDataFailure = (error) => ({ type: FETCH_DATA_FAILURE, payload: error });

export const setFormData = (data) => {
  return async (dispatch) => {
    dispatch(fetchFormData(data));
  };
};

export const setSearchData = (data) => {
  return async (dispatch) => {
    dispatch(fetchSearchData(data));
  };
};

export const purgeStoredState = () => {
  return async (dispatch) => {
    dispatch(fetchPurgeStoredState());
  };
};

export const loadData = () => {
  return async (dispatch) => {
    // dispatch(fetchDataRequest());
    try {
      const response = await requests.fetch(`${constants.baseUrl}/api/`, 'POST');
      if (response.ok) {
        const responseData = await response.json();
        if (response.status === 200) {

          const drugs = responseData.drugs.sort((a, b) => a.name.localeCompare(b.name)).map((drug, i) => ({
          name: drug.name,
          price: drug.price,
          }));
          
          const cities = responseData.locations.cities.sort((a, b) => a.name.localeCompare(b.name)).map((city, i) => ({
            name: city.name,
          }));
          
          const quarters = responseData.locations.cities.sort((a, b) => a.name.localeCompare(b.name)).map((city, i) => ({
            key: city.name,
            value: city.quarters.sort((a, b) => a.name.localeCompare(b.name)).map((quarter, j) => ({
              name: quarter.name,
            })),
          }));
          const data = { drugs, cities, quarters };
          dispatch(fetchLoadData(data));
          // dispatch(fetchDataSuccess());
        } else {
          // dispatch(fetchDataFailure(responseData));
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // dispatch(fetchDataFailure(error.message));
    }
  };
};

export const paymentToken = () => {
  return async (dispatch) => {
    // dispatch(fetchDataRequest());
    try {
      const response = await requests.fetch(`${constants.baseUrl}/api/payment/token/`, 'POST');
      if (response.ok) {
        const responseData = await response.json();
        if (response.status === 200) {
          const date = moment().add(responseData.expires_in, 'seconds').format('YYYY-MM-DD HH:mm:ss');
          const data = { ...responseData, expires_at: date };
          dispatch(fetchPaymentToken(data));
          // dispatch(fetchDataSuccess());
        } else {
          // dispatch(fetchDataFailure(responseData));
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // dispatch(fetchDataFailure(error.message));
    }
  };
};

export const tokenCheck = (token, callback=null) => {
  return async (dispatch) => {
    if (token !== null) {
      const date1 = moment();
      const date2 = moment(token.expires_at, 'YYYY-MM-DD HH:mm:ss');

      const diffInSeconds = date2.diff(date1, 'seconds');

      if (diffInSeconds <= 0) {
        dispatch(paymentToken());
      }

      if (callback !== null) {
        dispatch(callback(token));
      } else {
        dispatch({ type: '' });
      }
    } else {
      dispatch(paymentToken());
    }
  };
};

export const orderCreate = (token, data, callback=null) => {
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
        })),
      };
      const response = await requests.fetch(`${constants.baseUrl}/api/order/create/`, 'POST', headers, params);
      if (response.ok) {
        const responseData = await response.json();
        if (response.status === 200) {
          dispatch(fetchOrderCreate(responseData));
          dispatch(fetchDataSuccess());
          if (callback !== null) {
            dispatch(callback({
              title: "Success",
              message: `Veuillez confirmer le paiement à votre numéro de téléphone ${responseData.phone.toString().substr(responseData.phone.toString().length - 9)}`,
              type: 'success',
              success: true
            }));
          } else {
            dispatch({ type: '' });
          }
        } else {
          dispatch(fetchDataFailure(responseData));
          if (callback !== null) {
            dispatch(callback({
              title: "Error",
              message: JSON.stringify(responseData),
              type: 'error',
              success: false
            }));
          } else {
            dispatch({ type: '' });
          }
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
      if (callback !== null) {
        dispatch(callback({
          title: "Error",
          message: JSON.stringify(error.message),
          type: 'error',
          success: false
        }));
      } else {
        dispatch({ type: '' });
      }
}
  };
};

export const orderRetrieve = (token, data) => {
  return async (dispatch) => {
    var orders = [ ...data ];
    data.forEach(async (order, i) => {
      if (order.payments[order.payments.length - 1].status === constants.PATH_PENDING) {
        // dispatch(fetchDataRequest());
        try {
          const headers = {
            'Authorization': `Token ${token.token}`,
          };
          const response = await requests.fetch(`${constants.baseUrl}/api/order/retrieve/${order.id}/`, 'GET', headers);
          if (response.ok) {
            const responseData = await response.json();
            if (response.status === 200) {
              orders[i] = responseData
              dispatch(fetchOrderRetrieve(orders));
              // dispatch(fetchDataSuccess());
            } else {
              // dispatch(fetchDataFailure(responseData));
            }
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          // dispatch(fetchDataFailure(error.message));
        }
      }
    });
  };
};

export const orderDelivery = (token, data, callback=null) => {
  return async (dispatch) => {
    if (data.payments[data.payments.length - 1].status === constants.PATH_SUCCESSFUL) {
      // dispatch(fetchDataRequest());
      try {
        const headers = {
          'Authorization': `Bearer ${token.access}`,
        };
        const response = await requests.fetch(`${constants.baseUrl}/api/order/delivery/${data.id}/`, 'PUT', headers);
        if (response.ok) {
          const responseData = await response.json();
          if (response.status === 200) {
            dispatch(fetchOrderDelivery());
            // dispatch(fetchDataSuccess());
            if (callback !== null) {
              dispatch(callback(token));
            } else {
              dispatch({ type: '' });
            }
          } else {
            // dispatch(fetchDataFailure(responseData));
          }
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        // dispatch(fetchDataFailure(error.message));
      }
    }
  };
};

export const orderList = (token, search='', page=1, page_size=Number.parseInt(constants.PAGE_SIZE)) => {
  return async (dispatch) => {
    // dispatch(fetchDataRequest());
    try {
      const headers = {
        'Authorization': `Bearer ${token.access}`,
      };
      const params = {
        search,
        page,
        page_size,
      };
      const response = await requests.fetch(`${constants.baseUrl}/api/order/`, 'GET', headers, params);
      if (response.ok) {
        const responseData = await response.json();
        if (response.status === 200) {
          dispatch(fetchOrderList(responseData));
          // dispatch(fetchDataSuccess());
        } else {
          // dispatch(fetchDataFailure(responseData));
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // dispatch(fetchDataFailure(error.message));
    }
  };
};

export const authRetrieve = (token) => {
  return async (dispatch) => {
    // dispatch(fetchDataRequest());
    try {
      const headers = {
        'Authorization': `Bearer ${token.access}`,
      };
      const response = await requests.fetch(`${constants.baseUrl}/api/auth/user/retrieve/`, 'GET', headers);
      if (response.ok) {
        const responseData = await response.json();
        if (response.status === 200) {
          const data = { ...responseData, ...token };
          dispatch(fetchAuthRetrieve(data));
          // dispatch(fetchDataSuccess());
        } else {
          // dispatch(fetchDataFailure(responseData));
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // dispatch(fetchDataFailure(error.message));
    }
  };
};

export const authLogin = (email, password, callback=null) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const params = {
        email,
        password,
      };
      const response = await requests.fetch(`${constants.baseUrl}/api/auth/token/`, 'POST', {}, params);
      if (response.ok) {
        const responseData = await response.json();
        if (response.status === 200) {
          await Cookies.set('token', responseData.access);
          await Cookies.set('token-refresh', responseData.refresh);
          dispatch(fetchDataSuccess());
          dispatch(authRetrieve(responseData));
          if (callback !== null) {
            callback({
              title: "Success",
              message: "Connexion effectuée avec succès",
              type: 'success',
              success: true
            });
          } else {
            dispatch({ type: '' });
          }
        } else {
          dispatch(fetchDataFailure(responseData));
          if (callback !== null) {
            callback({
              title: "Error",
              message: "Adresse e-mail ou mot de passe incorrect",
              type: 'error',
              success: false
            });
          } else {
            dispatch({ type: '' });
          }
        }
      } else {
        dispatch(fetchDataFailure(''));
        if (callback !== null) {
          callback({
            title: "Error",
            message: "Adresse e-mail ou mot de passe incorrect",
            type: 'error',
            success: false
          });
        } else {
          dispatch({ type: '' });
        }
      }
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
      if (callback !== null) {
        callback({
          title: "Error",
          message: JSON.stringify(error.message),
          type: 'error',
          success: false
        });
      } else {
        dispatch({ type: '' });
      }
    }
  };
};

export const authRefresh = () => {
  return async (dispatch) => {
    const token = await Cookies.get('token-refresh');
    // dispatch(fetchDataRequest());
    try {
      const params = {
        refresh: token,
      };
      const response = await requests.fetch(`${constants.baseUrl}/api/auth/token/refresh/`, 'POST', {}, params);
      if (response.ok) {
        const responseData = await response.json();
        if (response.status === 200) {
          await Cookies.remove('token');
          await Cookies.set('token', responseData.access);
          // dispatch(fetchDataSuccess());
        } else {
          // dispatch(fetchDataFailure(responseData));
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // dispatch(fetchDataFailure(error.message));
    }
  };
};

export const authCheck = (callback=null) => {
  return async (dispatch) => {
    const token = await Cookies.get('token');
    if (token !== null) {
      // dispatch(fetchDataRequest());
      try {
        const params = {
          token,
        };
        const response = await requests.fetch(`${constants.baseUrl}/api/auth/token/verify/`, 'POST', {}, params);
        if (response.ok) {
          const responseData = await response.json();
          if (response.status === 200) {
            // dispatch(fetchDataSuccess());
            if (callback !== null) {
              dispatch(callback(token));
            } else {
              dispatch({ type: '' });
            }
          } else {
            // dispatch(fetchDataFailure(responseData));
            authRefresh();
          }
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        // dispatch(fetchDataFailure(error.message));
      }
    }
  };
};

export const authLogout = (callback=null) => {
  return async (dispatch) => {
    // dispatch(fetchDataRequest());
    await Cookies.remove('token');
    await Cookies.remove('token-refresh');
    // dispatch(fetchDataSuccess());
    dispatch(fetchAuthRetrieve(null));
    if (callback !== null) {
      dispatch(callback());
    } else {
      dispatch({ type: '' });
    }
  };
};
