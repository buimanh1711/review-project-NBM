import * as types from '../../constant/actionTypes';
const initState = {
    loading: true
}

const reducer = (state = initState, action) => {
    if(action.type === types.OPEN_LOADING) {
        return {
            ...state,
            loading: true
        }
    }
    else if(action.type === types.OFF_LOADING) {
        return {
            ...state,
            loading: false
        }
    }
    else return state
}

export default reducer;