'use client';

import { FETCH_FORM_DATA, FETCH_TOKEN_CREATE, FETCH_ORDER_CREATE, FETCH_ORDER_RETRIEVE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../configs/Constants';

import drug from '../assets/data/drugs.json';
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
}));

const initialState = {
    token: null,
    drugData: drugs,
    cityData: cities,
    quarterData: quarters,
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
    isLoading: false,
    error: null
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORM_DATA:
            return { ...state, formData: action.payload };
        case FETCH_TOKEN_CREATE:
            return { ...state, token: action.payload };
        case FETCH_ORDER_CREATE:
            return { ...state, orderData: [...state.orderData, action.payload] };
        case FETCH_ORDER_RETRIEVE:
            return { ...state, orderData: action.payload };
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
