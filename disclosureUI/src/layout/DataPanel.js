import React from 'react';
import Maps from '../component/Maps';
import TemperatureSelector from '../component/TemperatureSelector';
import HalogenSelector from '../component/HalogenSelector';
import AutofillCheckbox from "../component/AutofillCheckbox";
import {Button, Col, Container, Row} from "reactstrap";
import FilterPanel from "../component/FilterPanel";
import DownloadButton from "../component/DownloadButton";
import ShowHistogramButton from "../component/ShowHistogramButton";
import D3Map from "../component/D3Map";

const disclosureList = [
    {
        temperature: 80,
        chloride: 10000,
        bromide: 1000,
        iodide: 10,
        latitude: 32,
        longitude: -90
    },
    {
        temperature: 50,
        chloride: 20000,
        bromide: 2000,
        iodide: 210,
        latitude: 35,
        longitude: -95
    },

]

const CL = 51982.505924;
const BR = 564.729184;
const I = 28.119126;

class DataPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredDisclosureList: [],
        }
    }

    showMap = (selectedParameters) => {
        let filteredDisclosures;
        if (selectedParameters.stateNameDisabled) {
            filteredDisclosures = this.props.disclosureList.filter(
            disclosure => disclosure.well_depth >= selectedParameters.wellDepth &&
                disclosure.temperature_mean >= selectedParameters.temperature &&
                disclosure.chloride_mean >= selectedParameters.chloride &&
                disclosure.bromide_mean >= selectedParameters.bromide &&
                disclosure.iodide_mean >= selectedParameters.iodide
        )
        } else {
            filteredDisclosures = this.props.disclosureList.filter(
            disclosure => disclosure.well_depth >= selectedParameters.wellDepth &&
                disclosure.temperature_mean >= selectedParameters.temperature &&
                disclosure.chloride_mean >= selectedParameters.chloride &&
                disclosure.bromide_mean >= selectedParameters.bromide &&
                disclosure.iodide_mean >= selectedParameters.iodide &&
                disclosure.state_name === selectedParameters.stateName
        )
        }

        this.setState({
            filteredDisclosureList: filteredDisclosures
        })
        console.log(selectedParameters);
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <FilterPanel onShowMap={this.showMap}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <D3Map disclosures={this.state.filteredDisclosureList}/>
                        {/*<Maps disclosures={this.state.filteredDisclosureList}/>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                                <ShowHistogramButton data={this.state.filteredDisclosureList}/>
                        </Col>
                        <Col xs="4">
                                <DownloadButton data={this.state.filteredDisclosureList}></DownloadButton>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}

export default DataPanel;