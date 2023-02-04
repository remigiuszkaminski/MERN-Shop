import { UPDATE_DELIVERY } from "../actions/DeliveryActions";
import { RESET_DELIVERY } from '../actions/DeliveryActions';
export default function DeliveryReducer(state = [], action) {
    switch(action.type) {
        case UPDATE_DELIVERY:
            return state.concat([action.payload])
        case RESET_DELIVERY:
            const index2 = state.indexOf(action.payload)
            return state.slice(0,index2)
        default:
            return state
    }
}