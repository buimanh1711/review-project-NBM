import React, { Component } from 'react';
import MainLayout from '../../components/mainLayout';
import { Image, Button } from 'antd';
import styles from '../../styles/Detail.module.css';
import { useRouter } from 'next/router';
 
const Detail = (props) => {
  console.log(props)
  const router = useRouter()
  const { id } = router.query;
  console.log(id)
  return (
    <MainLayout>
      <div className={styles.detailContainer}>
        <div className={styles.productBlock}>
          <Image
            width={500}
            src={props.image}
          />
        </div>
          <div className={ styles.productInfor }>
            <h1 className={ styles.productName }>
              Name: {props.name}
            </h1>
            <h1 className={ styles.productName }>
              Price: {props.price}
            </h1>
            <Button onClick={()=>props.addToCart(props)} type='primary'>Add to cart</Button>
          </div>

      </div>
    </MainLayout>
  );
}

Detail.getInitialProps = async ({query}) => {
  const response = await fetch(`https://5fa276c6ba0736001613bad1.mockapi.io/test_nextJS/${query.id}`);
  const data = await response.json(); 
  return data;
}


import { addToCart } from '../../rudux/actions/productActions';
import { connect } from 'react-redux';

const mapActionsToProps = {
  addToCart
}

export default connect(null, mapActionsToProps)(Detail);