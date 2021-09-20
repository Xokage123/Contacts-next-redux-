import {
  combineReducers
} from "redux";

import {
  contactsReducer
} from "../slices/contacts";

const rootReducer = combineReducers({
  contacts: contactsReducer
})

export default rootReducer;