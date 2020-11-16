import * as types from '../../constant/actionTypes';

const initState = {
    isOpened: false,
    cartList: []
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case types.ADD_TO_CART: {
            const { cartList } = state;
            let checkExist = false;
            let currentItem;
            let currentQuatity;
            
            cartList.forEach((item, index) => {
                if(action.payload.id === item.id) {
                    checkExist = true;
                    currentItem = index;
                }
            });
            if(checkExist) {
                const { quatity } = cartList[currentItem];
                currentQuatity = quatity + 1;
                return {
                    ...state,
                    cartList: [
                        ...cartList.slice(0, currentItem),
                        {
                            ...action.payload,
                            quatity: currentQuatity
                        },
                        ...cartList.slice(currentItem+1)
                    ]
                }
            } else {
                currentQuatity = 1;
                return {
                    ...state,
                    cartList: [
                        ...cartList,
                        {
                            ...action.payload,
                            quatity: currentQuatity
                        }
                    ]
                }
            }
        } 
        case types.DEC_CART: {
            const { cartList } = state;
            let itemCurrentQuatity = cartList[action.payload].quatity;

            if(itemCurrentQuatity === 1) {  
                return { 
                    ...state,
                    cartList: [
                        ...cartList.slice(0, action.payload),
                        ...cartList.slice(action.payload+1)
                    ]
                }
            } else {
                return { 
                    ...state,
                    cartList: [
                        ...cartList.slice(0, action.payload),
                        {
                            ...cartList[action.payload],
                            quatity: itemCurrentQuatity - 1
                        },
                        ...cartList.slice(action.payload+1)
                    ]
                }
            }
        }
        case types.REMOVE_FROM_CART: {
            const { cartList } = state;
            return { 
                ...state,
                cartList: [
                    ...cartList.slice(0, action.payload),
                    ...cartList.slice(action.payload+1)
                ]
            }
        }
        case types.TOGGLE_CART: {
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
        case types.INC_CART: {
            const { cartList } = state;
            let itemCurrentQuatity = cartList[action.payload].quatity;
            
            return { 
                ...state,
                cartList: [
                    ...cartList.slice(0, action.payload),
                    {
                        ...cartList[action.payload],
                        quatity: itemCurrentQuatity + 1
                    },
                    ...cartList.slice(action.payload+1)
                ]
            }
            
        }

        default: return state;
    }
}

export default reducer;