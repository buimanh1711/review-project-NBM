import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
class mainLayout extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    
    render() {
        return (
            <div className='mainLayout'>
                <Header currentPage={this.props.currentPage} />
                <main>
                    <div className='content'>
                        {this.props.children}
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}
export default mainLayout;