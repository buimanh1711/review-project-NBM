import { createStore, combineReducers, applyMiddleware } from 'redux';
import productReducer from './reducers/productReducer';
import registerReducer from './reducers/registerReducer';
import cartReducer from './reducers/cartReducer';
import UIReducer from './reducers/uiReducer';


import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';
import { callApi } from './actions/productActions';

const reducer = combineReducers({
    product: productReducer,
    register: registerReducer,
    cart: cartReducer,
    ui: UIReducer
    
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);


export default store;
