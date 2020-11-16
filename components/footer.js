import React, { Component } from 'react';
import Link from 'next/link';

import styles from '../styles/Footer.module.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ styles.footerContainer }>
                this is footer
            </div>
        )
    }
}