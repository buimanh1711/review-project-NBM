import React, { Component } from 'react';
import { Affix } from 'antd';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: null
        }
    }

    componentDidMount() {
        this.setState({
            isLogined: localStorage.getItem('isLogined')
        })
    }

    render() {
        const { cartList } = this.props.cart;
        let cartItem = 0;
        let total = 0;
        let cartLogo = 'display';

        if (this.state.isLogined) {
            cartLogo = 'hidden';
        } 

        cartList.forEach((item, index) => {
            cartItem = cartItem + item.quatity;
            total = total + item.price * item.quatity;
        });
        
        let cartToggle = 'hidden';
        if (this.props.cart.isOpened) cartToggle = 'display';
        return (
            <>
                <div className={`cartIconBlock ${cartLogo}`}>
                    <h4 className="cartIndex">{`(${cartItem})`}</h4><i className={`fas fa-shopping-cart cartIcon`} onClick={this.props.toggleCart}></i>
                </div>
                <Affix style={{ position: 'absolute', top: '40px', right: '200px', zIndex: '1000' }}>
                    <div className={`cart-container ${cartToggle}`}>
                        <i className="fas fa-times closeCartIcon" onClick={this.props.toggleCart}></i>
                        <h3>{`Total: ${total}$`}</h3>
                        <ul className='cartList'>
                            {
                                cartList.map((item, index) => {
                                    let quatityClass = 'hidden';
                                    if (item.quatity > 1) {
                                        quatityClass = 'display';
                                    }
                                    return (
                                        <li className='cartItem' key={index}>
                                            <img className='cartItemImg' src={item.image}></img>
                                            <div className='cartItemInfo'>
                                                <h3 className='cartItemName'>{item.name}</h3>
                                                <h3 className='cartItemPrice'>{item.price + '$'}</h3>
                                                <h4 className={'quatity ' + quatityClass} >{'(' + item.quatity + ')'}</h4>
                                            </div>
                                            <div className='cartItemFunc'>
                                                <i className="fas fa-times delete-func" onClick={() => this.props.removeFromCart(index)}></i>
                                                <i onClick={() => this.props.incCart(index)} className="fas fa-plus add-func"></i>
                                                <i onClick={() => this.props.decCart(index)} className="far fa-window-minimize dec-func"></i>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </Affix>
            </>
        )
    }
}

import { connect } from 'react-redux';
import { toggleCart, removeFromCart, decCart, incCart } from '../rudux/actions/cartActions';

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}
const mapActionToProps = {
    removeFromCart,
    decCart,
    incCart,
    toggleCart
}
export default connect(mapStateToProps, mapActionToProps)(Cart);