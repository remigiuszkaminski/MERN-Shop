import { combineReducers } from "@reduxjs/toolkit";
import CartReducer from "../reducers/CartReducer";
import DeliveryReducer from "../reducers/DeliveryReducer";
export default combineReducers({
    cart: CartReducer,
    delivery: DeliveryReducer,
})
