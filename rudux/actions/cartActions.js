import * as types from '../../constant/actionTypes';

export const addToCart = (product) => ({
    type: types.ADD_TO_CART,
    payload: product
});

export const removeFromCart = (index) => ({
    type: types.REMOVE_FROM_CART,
    payload: index
});

export const toggleCart = () => ({
    type: types.TOGGLE_CART
});

export const decCart = (index) => ({
    type: types.DEC_CART,
    payload: index
});

export const incCart = (index) => ({
    type: types.INC_CART,
    payload: index
});