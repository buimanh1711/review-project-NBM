import crypto from 'crypto-js';
import * as types from '../../constant/actionTypes';



const initState = {
    edittingIndex: null,
    addFormIsOpened: false,
    editFormIsOpened: false,
    products: []
}

function decrypt (data, passphrase) {
  const bytes = crypto.AES.decrypt(data, passphrase);
  let originalText;
  try {
    originalText = bytes.toString(crypto.enc.Utf8);
  } catch (e) {
    originalText = "";
  }
  return originalText;
}

const decryptPass = 'mb1o4er';

const reducer = (state = initState, action) => {
    switch(action.type) {
        case types.REMOVE_PRODUCT: {
          if(!localStorage.getItem('isLogined')){
            alert('ban chua dang nhap');
            return state;
          } 
          else {
          if(decrypt(localStorage.getItem('username'), decryptPass)
              ===
             decrypt(localStorage.getItem('loginCode'), decryptPass))
          {
            const { products } = state;
            return {
                ...state,
                products: [
                    ...products.slice(0, action.payload), 
                    ...products.slice(action.payload+1)
                ]
            }
          }
          }
          
        }
        // // case types.FETCH_DATA: {
        // //   return callAPI(url, 'GET', null).then(res => {
        // //     dispatch(fetchData(res.data));
        // // })
        //   return {
        //     ...state,
        //     products: action.payload
                                                      `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````       //   }
        // }
        case types.FETCH_DATA: {
          return {
            ...state,
            products: action.payload
          }
        }
        case types.EDIT_PRODUCT: {
          action.payload.price = parseInt(action.payload.price);
          
          if(localStorage.getItem('isLogined') && 
            decrypt(localStorage.getItem('username'), decryptPass) === decrypt(localStorage.getItem('loginCode'), decryptPass)
            ) {
            return {
                ...state,
                editFormIsOpened: false,
                products: [
                    ...state.products.slice(0,state.edittingIndex),
                    {...action.payload},
                    ...state.products.slice(state.edittingIndex+1)
                ]
            }
          } else {
            alert('ban chua dang nhap!');
          }
        }

        case types.TOGGLE_ADD_FORM: {
          if(!localStorage.getItem('isLogined')){
            alert('ban chua dang nhap');
            return state;
          } else {
            if(decrypt(localStorage.getItem('username'), decryptPass) 
                ===
                decrypt(localStorage.getItem('loginCode'), decryptPass))
            {
              if(state.addFormIsOpened) {
                return {
                    ...state,
                    addFormIsOpened: false
                }
              } else {
                return {
                  ...state,
                  addFormIsOpened: true
                }
              }
            }
          }  
        }

        case types.TOGGLE_EDIT_FORM: {
          if(!localStorage.getItem('isLogined')){
            alert('ban chua dang nhap');
            return state;
          } else {
            if(decrypt(localStorage.getItem('username'), decryptPass) 
                ===
                decrypt(localStorage.getItem('loginCode'), decryptPass))
            {
              if(state.editFormIsOpened) {
                return {
                    ...state,
                    editFormIsOpened: false
                }
              } else {
                return {
                  ...state,
                  edittingIndex: action.payload,
                  editFormIsOpened: true
                }
              }
            }
          }  
        }

        case types.ADD_PRODUCT: {
          const { products } = state;
          action.payload.price = parseInt(action.payload.price);
          return {
            ...state,
            addFormIsOpened: false,
            products: [...products, action.payload]
          }
        }
        case types.CALL_API: {
          return state;
        }
        default:  return state;
    }
}

export default reducer;