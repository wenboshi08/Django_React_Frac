import React, {Component} from 'react';
import logo from "../assets/images/logo.svg";

class TopBar extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <span className="App-title">MapApp: Geochemistry and Chemical Disclosure</span>
                </header>
            </div>
        );
    }
}

export default TopBar;