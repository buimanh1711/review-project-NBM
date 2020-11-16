import React, { Component } from 'react';

class Overlay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{zIndex: '1000'}} className='overlay'>
                { this.props.children } 
            </div>
        )
    }
}

export default Overlay;