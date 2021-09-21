import {
  createSlice
} from "@reduxjs/toolkit";
import {
  getAllContacts,
  API_deleteContact,
  API_addNewContact,
  API_searchContact,
  API_updateContact
} from '../api';

// Начальное состояние хранилища
export const initialState = {
  loading: false,
  loadingAdd: false,
  loadingDelete: false,
  loadingUpdate: false,
  hasError: false,
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
    updateContactLoading: state => {
      state.loadingUpdate = true;
    },
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
    updateContact: (state, {
      payload
    }) => {
      state.loadingUpdate = false;
      state.listContacts = state.listContacts.map(element => {
        if (element.id === payload.id) {
          return payload;
        }
        return element;
      })
    },
    getContactsSuccess: (state, {
      payload
    }) => {
      state.listContacts = payload;
      state.loading = false;
      state.hasError = false;
    },
    getContactsFailure: state => {
      state.hasError = true;
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
  addContactLoading,
  updateContact,
  updateContactLoading
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
      dispatch(getContactsFailure());
    }
  }
}

export const fetchDeleteContact = id => {
  return async dispatch => {
    dispatch(deleteContactLoading());
    API_deleteContact(id).then(_ => {
      dispatch(deleteContact(id));
    }).catch(er => {
      dispatch(getContactsFailure());
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

export const fetchUpdateContact = infoContact => {
  return async dispatch => {
    dispatch(updateContactLoading());

    try {
      const newInfoContact = await API_updateContact(infoContact);
      dispatch(updateContact(newInfoContact));
    } catch (_) {}
  }
}