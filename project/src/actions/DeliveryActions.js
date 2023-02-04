export const UPDATE_DELIVERY = 'UPDATE_DELIVERY';
export const RESET_DELIVERY = 'RESET_DELIVERY';

export const updateDeliveryAdd = (payload) => ({
    type: UPDATE_DELIVERY,
    payload,
})

export const resetDeliveryForm = (payload) => ({
    type: RESET_DELIVERY,
    payload,
})