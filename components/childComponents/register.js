import React, { Component } from 'react';
import LoginForm from '../loginForm';
import Head from 'next/head';
import { Avatar } from 'antd';
import { Menu, Dropdown, Button } from 'antd';

import styles from '../../styles/Register.module.css';


class Register extends Component {
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
    logOut() {
        localStorage.clear();
        window.location.reload();
    }
    render() {
        const menu = (
            <Menu>
              <Menu.Item onClick={this.logOut} style={{padding: "5px 40px", borderRadius: "3px"}}>
                  Logout
              </Menu.Item>
              <Menu.Item style={{padding: "5px 40px", borderRadius: "3px"}}>
                  Setting
              </Menu.Item>
            </Menu>
          );
        if(!this.state.isLogined) {
            return (
                <div className={styles.registerBlock}>
                    <LoginForm />

                    <button onClick={ this.props.toggleLoginForm }>Sign up</button>
                    <div style={{width: "1px", height: "30px", display: 'inline-block', background: "black"}} />
                    <button>Sign in</button>
                </div>
            )
        } else {
            return (
                <div className={styles.registerBlockOn}>
                    <LoginForm />
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Avatar className={styles.avt} size={36}>USER</Avatar>
                    </Dropdown>
                </div>
            )
        }
    }
}

import { connect } from 'react-redux';
import { toggleLoginForm } from '../../rudux/actions/registerActions';

const mapStateToProps = (state) => {
    return {
        register: state.register
    }
}
const mapActionToProps = {
    toggleLoginForm
}
export default connect(mapStateToProps, mapActionToProps)(Register);