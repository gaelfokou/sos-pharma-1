'use client';

import { VERSION_STATE, FETCH_SEARCH_DATA, FETCH_FORM_DATA, FETCH_PURGE_STATE, FETCH_LOAD_DATA, FETCH_TOKEN_CREATE, FETCH_ORDER_CREATE, FETCH_ORDER_RETRIEVE, FETCH_ORDER_DELIVERY, FETCH_ORDER_PAYMENT, FETCH_ORDER_LIST, FETCH_AUTH_RETRIEVE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../configs/Constants';

/* import drug from '../assets/data/drugs.json';
import geolocation from '../assets/data/geolocation.json';

const drugs = drug.sort((a, b) => a.name.localeCompare(b.name)).map((drug, i) => ({
    name: drug.name,
    price: drug.price,
}));

const cities = geolocation.cities.sort((a, b) => a.name.localeCompare(b.name)).map((city, i) => ({
    name: city.name,
}));

const quarters = geolocation.cities.sort((a, b) => a.name.localeCompare(b.name)).map((city, i) => ({
    key: city.name,
    value: city.quarters.sort((a, b) => a.name.localeCompare(b.name)).map((quarter, j) => ({
        name: quarter.name,
    })),
})); */

const drugs = [];
const cities = [];
const quarters = [];

const initialState = {
    version: VERSION_STATE,
    auth: null,
    token: null,
    drugData: drugs,
    cityData: cities,
    quarterData: quarters,
    searchData: "",
    formData: {
        step1: "",
        stepValue1: [],
        stepResult1: [],
        step2: "",
        stepValue2: [],
        step3: "",
        stepValue3: [],
        step4: "",
        step5: "",
        step6: "",
        step7: "",
        stepResult7: cities,
        step8: "",
        stepResult8: [],
    },
    orderData: [],
    count: 0,
    next: null,
    previous: null,
    results: [],
    isLoading: false,
    error: null,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SEARCH_DATA:
            return { ...state, searchData: action.payload };
        case FETCH_FORM_DATA:
            return { ...state, formData: action.payload };
        case FETCH_PURGE_STATE:
            return { ...initialState };
        case FETCH_LOAD_DATA:
            return { ...state, drugData: action.payload.drugs, cityData: action.payload.cities, quarterData: action.payload.quarters, formData: { ...state.formData, stepResult7: action.payload.cities } };
        case FETCH_TOKEN_CREATE:
            return { ...state, token: action.payload };
        case FETCH_ORDER_CREATE:
            return { ...state, orderData: [...state.orderData, action.payload] };
        case FETCH_ORDER_RETRIEVE:
            return { ...state, orderData: action.payload };
        case FETCH_ORDER_RETRIEVE:
            return { ...state, orderData: action.payload };
        case FETCH_ORDER_RETRIEVE:
            return { ...state, orderData: action.payload };
        case FETCH_ORDER_LIST:
            return { ...state, count: action.payload.count, next: action.payload.next, previous: action.payload.previous, results: action.payload.results };
        case FETCH_AUTH_RETRIEVE:
            return { ...state, auth: action.payload };
        case FETCH_DATA_REQUEST:
            return { ...state, error: null, isLoading: true };
        case FETCH_DATA_SUCCESS:
            return { ...state, isLoading: false };
        case FETCH_DATA_FAILURE:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
};

export default orderReducer;
