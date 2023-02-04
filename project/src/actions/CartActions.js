export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_DELIVERY_PRICE = 'ADD_DELIVERY_PRICE';
export const DELETE_DELIVERY_PRICE = 'DELETE_DELIVERY_PRICE';
export const RESET_CART = 'RESET_CART';
export const addToCart = (payload) => ({
    type: ADD_ITEM,
    payload,
});

export const deleteFromCart = (payload) => ({
    type: DELETE_ITEM,
    payload,
})

export const addDeliveryPriceToTotal = (payload) => ({
    type: ADD_DELIVERY_PRICE,
    payload
})

export const deleteDeliveryPriceFromTotal = (payload) => ({
    type: DELETE_DELIVERY_PRICE,
    payload,
})

export const resetWholeCart = (payload) => ({
    type: RESET_CART,
    payload,
})