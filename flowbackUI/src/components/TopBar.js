import React, {Component} from 'react';
import logo from "../assets/images/logo.svg";
import {Icon} from 'antd';

class TopBar extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <span className="App-title">Measured Flowback Composition</span>
                </header>
            </div>
        );
    }
}

export default TopBar;