import React, {Component} from 'react';
import Header from "./Header";
import DataPanel from "./DataPanel";
import {Container} from 'reactstrap';


class TransformationApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            casvalue: '',
            disclosureList: []
        }
    }

    handleCasSelector = (event) => {
        let newValue = event.target.value;
        fetch(`../api/disclosure/?cas_number_corrected=${newValue}`)
            .then(response => response.json())
            .then(data => this.setState({
                casvalue: newValue,
                disclosureList: data
            }));
    }


    render() {
        return (
            <div>
                <Container>
                    <Header value={this.state.casvalue} handleChange={this.handleCasSelector}/>
                </Container>
                <Container>
                    <DataPanel disclosureList={this.state.disclosureList}/>
                </Container>
            </div>
        );
    }
}

export default TransformationApp;