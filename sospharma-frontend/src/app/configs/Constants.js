'use client';

export const constants = {
  step: 0,
  baseUrl: 'http://127.0.0.1:8000',
  LOW_BALANCE_OR_PAYEE_LIMIT_REACHED_OR_NOT_ALLOWED: 'Solde faible, ou limite atteinte, ou non autorisée',
  PENDING: 'En attente',
  SUCCESSFUL: 'Réussi',
  FAILED: 'Échoué',
  PATH_PENDING: 'PENDING',
  PATH_SUCCESSFUL: 'SUCCESSFUL',
  PATH_FAILED: 'FAILED',
  PAGE_SIZE: 10,
};

export const VERSION_STATE = 2;

export const FETCH_FORM_DATA = 'FETCH_FORM_DATA';
export const FETCH_SEARCH_DATA = 'FETCH_SEARCH_DATA';
export const FETCH_PURGE_STATE = 'FETCH_PURGE_STATE';
export const FETCH_LOAD_DATA = 'FETCH_LOAD_DATA';
export const FETCH_TOKEN_CREATE = 'FETCH_TOKEN_CREATE';
export const FETCH_ORDER_CREATE = 'FETCH_ORDER_CREATE';
export const FETCH_ORDER_RETRIEVE = 'FETCH_ORDER_RETRIEVE';
export const FETCH_ORDER_LIST = 'FETCH_ORDER_LIST';
export const FETCH_AUTH_RETRIEVE = 'FETCH_AUTH_RETRIEVE';
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
