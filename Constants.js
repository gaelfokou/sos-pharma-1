'use client';

export const constants = {
  step: 0,
  baseUrl: 'https://test.sos-pharma.com',
  LOW_BALANCE_OR_PAYEE_LIMIT_REACHED_OR_NOT_ALLOWED: 'Solde faible, ou limite atteinte, ou non autorisée',
  PENDING: 'En attente',
  SUCCESSFUL: 'Réussi',
  FAILED: 'Échoué',
  PAGE_SIZE: 10,
};

export const VERSION_STATE = 1;

export const FETCH_FORM_DATA = 'FETCH_FORM_DATA';
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
