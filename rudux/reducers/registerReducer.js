import * as types from '../../constant/actionTypes';

const initState = {
    isOpened: false,
    isLogined: false
}

const reducer = (state = initState, action) => {
    if(action.type === types.TOGGLE_LOGIN_FORM){
        if(state.isOpened) {
            return {
                ...state,
                isOpened: false
            }
        } else {
            return {
                ...state,
                isOpened: true
            }
        }
    }
    else if(action.type === types.LOGIN) {
        return {
            ...state,
            isLogined: true
        }
    }
    return state;   
}
export default reducer;