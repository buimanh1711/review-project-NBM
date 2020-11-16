import React, { Component } from 'react';
import { Row, Col } from 'antd';

import MainLayout from '../components/mainLayout';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { callAPI } from '../utils/callAPI';

import { Card } from 'antd';
const { Meta } = Card;

import GlobalLoadingIcon from '../components/globalLoading';
import AddForm from '../components/addForm';
import EditForm from '../components/editForm';

import styles from '../styles/Product.module.css';

const MyClassWithRouter = (props) => {
    const router = useRouter()
    
    return <Products {...props} router={router} />
}

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: null
        }
    }

    componentDidMount() {
        // console.log(this.props)
        this.setState({
            isLogined: localStorage.getItem('isLogined')
        });

        this.props.callApi();
        // this.props.callProductAPI();
        // const url = 'https://5fa276c6ba0736001613bad1.mockapi.io/test_nextJS';
        // callAPI(url, 'GET', null).then((res) => {
        //     console.log('api', res);
        //     this.props.fetchData(res.data);
        //     console.log(this.props)
        // });
    }

    render() {
        const { products } = this.props.product;
        console.log(products)
        if(this.state.isLogined) {
            return (
                <MainLayout currentPage={1}>
                    <GlobalLoadingIcon />
                    <div style={{margin: "0 auto", width: "100%", maxWidth: "1000px"}}>
                        <Button type="primary" onClick={ this.props.toggleAddForm }>Add product</Button>
                        <AddForm />
                        <EditForm />
                        <Row wrap="true" xs={{justify: 'center'}} justify="left" className={ styles.container }>
                            {
                                products.map((item, ind) => {
                                    return (
                                        <Col lg={{span: 6}} md={{span: 8}} sm={{span: 24}} xs={{span: 24}} key={ ind } className={styles.col} >
                                            <Card
                                                hoverable
                                                style={{ width: "100%" }}
                                                bodyStyle={{padding: 12}}
                                                cover={<img alt="example" src={item.image} />}
                                            >
                                                <Link href={`/cards/${item.id}`}>
                                                    <h3 style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{item.name} testing</h3>
                                                </Link>
                                                <h3 className={styles.price}>{`${item.price}.000VND - ${item.price+50}.000VND`}</h3>
                                                <p className={styles.script}>just a description</p>

                                                <div style={{display: "flex", justifyContent: "space-between"}} className='product-func'>
                                                    <Button type="primary"  onClick={ ()=>this.props.toggleEditForm(ind) }>Edit Product</Button>
                                                    <Button type="primary" danger onClick={ ()=>this.props.removeProduct(ind) }>
                                                        Remove
                                                    </Button>
                                                </div>
                                            </Card>    
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </MainLayout>
            )
        } else {
            return (
                <MainLayout currentPage={1}>
                    <GlobalLoadingIcon />
                    <div style={{margin: "0 auto", width: "100%", maxWidth: "1000px"}}>
                        <Row xs={{justify: 'center'}} justify="left" wrap="true" className={ styles.container }>
                            {
                                products.map((item, ind) => {
                                    return (
                                        <Col lg={{span: 6}} xs={{span: 24}} md={{span: 8}} sm={{span: 24}} key={ ind } className={styles.col}>
                                            <Card
                                                hoverable
                                                style={{ width:' 100% '}}
                                                bodyStyle={{padding: 12,}}
                                                cover={<img alt="example" src={item.image} />}
                                            >
                                                <Link href={`/cards/${item.id}`}>
                                                    <h3 style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{item.name} testing</h3>
                                                </Link>
                                                <h3 className={styles.price}>{`${item.price}.000VND - ${item.price+50}.000VND`}</h3>
                                                <p className={styles.script}>just a description</p>
                                                <div style={{display: "flex", justifyContent: "space-between"}} className='product-func'>
                                                    <Button type="primary" onClick={ ()=>this.props.addToCart(item) }>Add to cart</Button>
                                                </div>
                                            </Card>    
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>    
                </MainLayout>
            )
        }
    }
}

import { connect } from 'react-redux';

import { callApi, addProduct, removeProduct, editProduct, toggleAddForm, toggleEditForm, fetchData, callProductAPI } from '../rudux/actions/productActions';
import { addToCart } from '../rudux/actions/cartActions';
import Axios from 'axios';

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}
const mapActionToProps = {
    callApi, 
    addProduct,
    removeProduct,
    editProduct,
    addToCart, 
    toggleEditForm,
    toggleAddForm,
    callProductAPI,
    fetchData
}
export default connect(mapStateToProps,mapActionToProps)(MyClassWithRouter);