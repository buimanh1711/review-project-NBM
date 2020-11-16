import React, { Component } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import Head from 'next/head';
import Overlay from './childComponents/overlay';

import crypto from 'crypto-js';
import users from '../user.json';
const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  encode(data) {
    const pass = 'mb1o4er';
    const authCode = crypto.AES.encrypt(data, pass).toString();
    return authCode;
  }

  onFinish(values) {
    this.checkUser(values.username, values.password);
  };

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };

  checkUser(username, password) {
    let check = false;
    users.children.forEach((user, index) => {
        if (user.username === username &&
            user.password === password) {
            localStorage.setItem('isLogined', true)
            localStorage.setItem('loginCode', this.encode(username));
            localStorage.setItem('username', this.encode(username));
            localStorage.setItem('password', this.encode(password));
            check = true;
            window.location.reload();
            return;
        }
    });
    if (!check) {
        alert('sai thong tin!');
    }
  }

  render() {
    let status = 'loginBlock';
    if(this.props.register.isOpened) {
      status = 'loginBlock--on';
    }
    return (
      <div className={status}>
        <Overlay>
          <Head>
              <script src="https://kit.fontawesome.com/cc8d84a666.js" crossorigin="anonymous"></script>
          </Head>
          <div className='contentBlock'>
              <h1 style={{color: "#5D6895"}}>Login</h1>
              <i className="far fa-times-circle closeForm-icon" onClick={ this.props.toggleLoginForm }></i>
              <Form
              {...layout}
              name="login"
              initialValues={{
                  remember: true,
              }}
              onFinish={this.onFinish.bind(this)}
              onFinishFailed={this.onFinishFailed.bind(this)}
              >
              <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                  {
                      required: true,
                      message: 'Please input your username!',
                  },
                  ]}
              >
                  <Input />
              </Form.Item>
  
              <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                  {
                      required: true,
                      message: 'Please input your password!',
                  },
                  ]}
              >
                  <Input.Password />
              </Form.Item>
  
              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
              </Form.Item>
  
              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                      Submit
                  </Button>
              </Form.Item>
              </Form>
          </div>
        </Overlay>
        </div>
    );
  }
};

import { connect } from 'react-redux';
import { toggleLoginForm } from '../rudux/actions/registerActions';

const mapStateToProps = (state) => {
    return {
        register: state.register
    }
}
const mapActionToProps = {
    toggleLoginForm
}
export default connect(mapStateToProps, mapActionToProps)(LoginForm);