import {
  combineReducers
} from "redux";

import {
  contactsReducer
} from "../slices/contacts";

import {
  contactReducer
} from "../slices/contact";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  contact: contactReducer
})

export default rootReducer;