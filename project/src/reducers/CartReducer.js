import { ADD_ITEM, DELETE_ITEM, ADD_DELIVERY_PRICE, DELETE_DELIVERY_PRICE, RESET_CART} from "../actions/CartActions";
const initialState = {
    items: [],
    total: 0
}

export default function CartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            let existingItem = state.items.find(item => item.title === action.payload.title);
        if (existingItem) {
            existingItem.quantity++;
            return {
                items: [...state.items],
                total: state.total + action.payload.price
            }
        } else {
            return {
                items: [...state.items, { title: action.payload.title, price: action.payload.price, quantity: 1 }],
                total: state.total + action.payload.price
            }
        }
        case DELETE_ITEM:
            const index = state.items.find(item => item.title === action.payload.title);
            const index2 = state.items.indexOf(action.payload)
            if (index) {
                index.quantity--;
                if(index.quantity === 0 || index.quantity < 0){
                    return {
                        items: [
                            ...state.items.slice(0, index2),
                            ...state.items.slice(index2 + 1)
                        ],
                        total: state.total - action.payload.price
                    }
                }
                return {
                    items: [...state.items],
                    total: state.total - action.payload.price
                }
            } else {
                return state
            }
        case ADD_DELIVERY_PRICE:
            return {
                items: [...state.items],
                total: state.total + action.payload
            }
        case DELETE_DELIVERY_PRICE:
            return {
                items: [...state.items],
                total: state.total - action.payload
            }
        case RESET_CART:
            return state = initialState
        default:
            return state
    }
}
