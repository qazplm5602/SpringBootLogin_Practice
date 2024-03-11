import { combineReducers, legacy_createStore as createStore } from "redux";
import LoginStore from "./LoginStore";

const combineStore = combineReducers({
    login: LoginStore
});

export default createStore(combineStore);