import * as types from '../../constant/actionTypes';
import {callAPI} from '../../utils/callAPI';
import store from '../store';

export const removeProduct = (index) => ({
    type: types.REMOVE_PRODUCT,
    payload: index
});

export const editProduct = (product) => ({
    type: types.EDIT_PRODUCT,
    payload: product
});

export const addToCart = (product) => ({
    type: types.ADD_TO_CART,
    payload: product
});

export const addProduct = (product) => ({
    type: types.ADD_PRODUCT,
    payload: product
});

export const toggleAddForm = () => ({
    type: types.TOGGLE_ADD_FORM
});

export const toggleEditForm = (index) => ({
    type: types.TOGGLE_EDIT_FORM,
    payload: index
});

export const callApi = () => ({
    type: types.CALL_API
});

export const callProductAPI = (dispatch) => {
    console.log('calling producnt api');
    const url = 'https://5fa276c6ba0736001613bad1.mockapi.io/test_nextJS'
    callApi(url, 'GET', null)
    .then(res => {
        // console.log(res.data);
        store.dispatch(fetchData(res.data));
    })
    .catch(()=>{ console.log('error')})
}
export const fetchData = (products) => ({
    type: types.FETCH_DATA,
    payload: products
})
