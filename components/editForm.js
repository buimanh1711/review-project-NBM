import React, { Component } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import Head from 'next/head';
import Overlay from './childComponents/overlay';

import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

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

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.newProduct = {
        name: null,
        price: null,
        image: null
    }
    this.state = {
        loading: false,
      };
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
          this.setState({
            imageUrl,
            loading: false,
          });
          this.newProduct.image = imageUrl;
      }
      );
    }
  };

  onFinish(values) {
    this.newProduct.name = values.name;
    this.newProduct.price = values.price;
    this.props.editProduct(this.newProduct);
  };

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    let status = 'loginBlock';
    if(this.props.product.editFormIsOpened) {
      status = 'loginBlock--on';
    }
    return (
      <div className={status}>
        <Overlay>
          <Head>
              <script src="https://kit.fontawesome.com/cc8d84a666.js" crossorigin="anonymous"></script>
          </Head>
          <div className='contentBlock'>
              <h1 style={{color: "#5D6895"}}>Edit product</h1>
              <i className="far fa-times-circle closeForm-icon" onClick={ this.props.toggleEditForm }></i>
              <Form
              {...layout}
              name="edit_product"
              onFinish={this.onFinish.bind(this)}
              onFinishFailed={this.onFinishFailed.bind(this)}
              >
              <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                  {
                      required: true,
                      message: 'Please input the product"s name!',
                  },
                  ]}
              >
                  <Input />
              </Form.Item>
  
              <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                  {
                      required: true,
                      message: 'Please input the price!',
                  },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '80%' }} /> : uploadButton}
                </Upload>
  
              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                      Edit
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
import { editProduct, toggleEditForm } from '../rudux/actions/productActions';

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}
const mapActionToProps = {
    editProduct,
    toggleEditForm
}
export default connect(mapStateToProps, mapActionToProps)(EditForm);