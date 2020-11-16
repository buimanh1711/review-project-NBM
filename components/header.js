import React, { Component } from 'react';
import Link from 'next/link';
import Register from './childComponents/register';
import Cart from './cart';
import styles from '../styles/Header.module.css';

import { Input } from 'antd';
import { AudioOutlined, SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { withRouter } from "next/router"
const { Search } = Input;


const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = value => console.log(value);

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            home: true,
            product: false
        }

        this.toggleSearch = this.toggleSearch.bind(this);

        this.state = {
            search: false,
            pages: [
                {
                    id: 0,
                    name: 'Home',
                    isActive: true,
                    path: '/'
                },
                {
                    id: 1,
                    name: 'Product',
                    isActive: true,
                    path: '/product'
                }
            ]
        }
        const { pages } = this.state;

        pages.forEach((item, index) => {
            item.isActive = false;
        });
        const {currentPage} = this.props;
        pages[currentPage].isActive = true;
        this.setState({
            ...this.state,
            pages: [
                ...pages
            ]
        });
    }

    toggleSearch() {
        console.log(this.state)
        const { search } = this.state;
        if(search)
            this.setState({
                search: false
            });
        else 
            this.setState({
                search: true
            });
    }

    render() {
        const {search} = this.state;
        let searchBlockStyle = {display: 'none'}
        let searchIconStyle = {display: 'block',cursor: 'pointer'}

        if(search) {
            searchBlockStyle = {display: 'block'}
            searchIconStyle = {display: 'none', cursor: 'pointer'}
        }
        const { pages } = this.state;
        return (
            <div className={ styles.headerContainer }>
                <div className={styles.header}>
                    <div className={ styles.leftBlock }>
                        <h1>Demo</h1>
                        <ul className={styles.headerMenu}>
                            {
                                pages.map((item, index) => {
                                    let itemClass = styles.headerMenuItem;
                                    if(item.isActive) itemClass = styles.headerMenuItemActive;
                                    return (
                                        <li key={item.id} className={itemClass}>
                                            <Link href={item.path}>
                                                <a>
                                                    {item.name}    
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={ styles.rightBlock }>
                        <SearchOutlined className={styles.searchIcon} style={searchIconStyle} onClick={this.toggleSearch} />
                        <div style={searchBlockStyle} className={ styles.searchBlock }>
                            <Search placeholder="input search text" onSearch={onSearch} enterButton />
                        </div>
                        <ArrowRightOutlined className={styles.searchIcon} onClick={this.toggleSearch} style={searchBlockStyle} />
                        <Cart />
                        <Register />
                    </div>
                </div>
            </div>
        )
    }
}