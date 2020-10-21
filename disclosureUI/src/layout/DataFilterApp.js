import React, {Component} from 'react';
import DataFilterForm from "./DataFilterForm";
import {Container} from 'reactstrap';
import Button from "antd";
import Maps from "../component/Maps";
import DownloadButton from "../component/DownloadButton";
import ShowHistogramButton from "../component/ShowHistogramButton";
import D3Map from "../component/D3Map";

class DataFilterApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredDisclosureList: []
        }
    }

    handleSearch = (settings) => {
        const api_number = settings['api_number'] ? settings['api_number'] : ''
        const operator_name = settings['operator_name']? settings['operator_name'] : ''
        const url = `../api/disclosure/?state_name=${settings['state_name']}&api_number=${api_number}&operator_name=${operator_name}`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                filteredDisclosureList: data
            }));
    }


    render() {
        return (
            <div>
                <Container>
                    <DataFilterForm handleSubmit={this.handleSearch}/>
                    {/*<D3Map disclosures={this.state.filteredDisclosureList} />*/}
                    <Maps disclosures={this.state.filteredDisclosureList}/>
                    <div style={{float: "right"}}>
                        <DownloadButton data={this.state.filteredDisclosureList}></DownloadButton>
                    </div>
                </Container>
            </div>
        );
    }
}

export default DataFilterApp;