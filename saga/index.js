import { call, take, fork, put } from 'redux-saga/effects';
import * as types from '../constant/actionTypes';
import {callAPI} from '../utils/callAPI';

import {fetchData} from '../rudux/actions/productActions';
import {offLoading} from '../rudux/actions/uiActions';


function* rootSaga() {
    yield fork(watchFetchProductData);
    // yield fork(watchTest);
}

function* watchTest() {
    console.log('manh')
}
function* watchFetchProductData() {
    yield take(types.CALL_API);
    const res = yield call(callAPI);
    const { data } = res;
    yield put(fetchData(data))
    yield put(offLoading());
}

export default rootSaga;    