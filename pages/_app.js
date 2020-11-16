import '../styles/globals.css'

import 'antd/dist/antd.css';
import "../public/assets/layoutCss/overlay.css"
import '../public/assets/layoutCss/register.css';
import '../public/assets/layoutCss/cart.css';

import { Provider } from 'react-redux';
import store from "../rudux/store";


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
