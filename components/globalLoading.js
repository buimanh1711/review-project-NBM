import React, { Component } from 'react';
import Overlay from './childComponents/overlay';
import { Spin, Space } from 'antd';
// import loadingIcon from '../assets/img/globalLoadingIcon.gif';
class GlobalLoading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.ui.loading){
            return (
                <Overlay>
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                </Overlay>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

import { openLoading , offLoading } from '../rudux/actions/uiActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    ui: state.ui
});

export default connect(mapStateToProps, null)(GlobalLoading);