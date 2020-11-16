import React, { Component } from 'react';
import MainLayout from '../components/mainLayout';

export default class Home extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <MainLayout test="testing">
                <div className='homepage'>
                    this is homepage
                </div>
            </MainLayout>
        )
    }
}