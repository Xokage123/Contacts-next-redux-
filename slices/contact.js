import {
  createSlice
} from "@reduxjs/toolkit";

import {
  API_getContactInfo
} from '../api';

export const initialState = {
  loadGet: false,
  errorGet: false,
  contact: {}
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    loadContact: state => {
      state.loadGet = true;
      state.errorGet = false;
    },
    failedContact: state => {
      state.loadGet = false;
      state.errorGet = true;
    },
    getInfo: (state, {
      payload
    }) => {
      state.loadGet = false;
      state.errorGet = false;
      state.contact = payload;
    }
  }
});

export const {
  loadContact,
  failedContact,
  getInfo
} = contactSlice.actions;

export const contactSelector = state => state.contact;

export const contactReducer = contactSlice.reducer;

export const fetchGetContact = id => {
  return async dispatch => {
    dispatch(loadContact());

    try {
      const contactInfo = await API_getContactInfo(id);
      dispatch(getInfo(contactInfo));
    } catch (_) {
      dispatch(failedContact())
    }
  }
}