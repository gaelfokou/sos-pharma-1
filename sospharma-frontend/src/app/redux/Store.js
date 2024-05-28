'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../configs/Constants';
import { orderReducer, requestReducer } from './Reducers';

const rootReducer = combineReducers({
  order: orderReducer,
  request: requestReducer,
  loadingBar: loadingBarReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['order'],
  blacklist: ['request', 'loadingBar'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE],
            ignoredActionPaths: ['isLoading', 'error'],
            ignoredPaths: ['isLoading', 'error'],
        },
    }),
})

export const persistor = persistStore(store)
