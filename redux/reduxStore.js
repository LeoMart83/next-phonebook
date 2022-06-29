import contactsReducer from './contactsReducer';
import { createStore, combineReducers } from "redux";

let reducers = combineReducers({
    contactsReducer,
});

const store = createStore(reducers);

export default store;