import {
  createSlice
} from "@reduxjs/toolkit";
import {
  getAllContacts,
  API_deleteContact,
  API_addNewContact,
  API_searchContact
} from '../api';

export const CONTACTS = "contacts";

// Начальное состояние хранилища
export const initialState = {
  loading: false,
  loadingAdd: false,
  loadingDelete: false,
  hasError: false,
  textError: null,
  listContacts: []
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // Загрузка контактов
    getListContacts: state => {
      state.loading = true;
    },
    deleteContactLoading: state => {
      state.loadingDelete = true;
    },
    addContactLoading: state => {
      state.loadingAdd = true;
    },
    // Удаление контакта
    deleteContact: (state, {
      payload
    }) => {
      state.loadingDelete = false;
      state.listContacts = state.listContacts.filter(item => {
        return item.id !== payload;
      });
    },
    addNewContact: (state, {
      payload
    }) => {
      state.loadingAdd = false;
      state.listContacts = [
        ...state.listContacts,
        payload
      ];
    },
    getContactsSuccess: (state, {
      payload
    }) => {
      state.listContacts = payload;
      state.loading = false;
      state.hasError = false;
    },
    getContactsFailure: (state, textError) => {
      state.hasError = true;
      state.textError = textError;
    }
  }
});

export const {
  getListContacts,
  getContactsSuccess,
  getContactsFailure,
  deleteContact,
  deleteContactLoading,
  addNewContact,
  addContactLoading
} = contactsSlice.actions;

export const contactsSelector = state => state.contacts;

export const contactsReducer = contactsSlice.reducer;



export const fetchContacts = _ => {
  return async dispatch => {
    // Начинаем загрузку данных
    dispatch(getListContacts());

    try {
      // При успешной загрузке, добавляем контакты в хранилище
      const listContacts = await getAllContacts();
      dispatch(getContactsSuccess(listContacts));
    } catch (er) {
      // При ошибке, выкидываем ощибку
      dispatch(getContactsFailure(er.message));
    }
  }
}

export const fetchDeleteContact = id => {
  return async dispatch => {
    dispatch(deleteContactLoading());
    API_deleteContact(id).then(_ => {
      dispatch(deleteContact(id));
    }).catch(er => {
      dispatch(getContactsFailure(er.message));
    })
  }
}

export const fetchAddContact = infoContact => {
  return async dispatch => {
    dispatch(addContactLoading());
    API_addNewContact(infoContact).then(async _ => {
      const contact = await API_searchContact(infoContact.uniqueKey);
      dispatch(addNewContact(contact));
    });
  }
}