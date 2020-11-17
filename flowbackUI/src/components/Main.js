import React, {Component} from 'react';
import { Tabs, Spin, Row, Col, Button, Radio } from 'antd';
// import CsvDownload from "react-json-to-csv";
// import CSVDownload from "react-csv/src/components/Download";
import { CSVLink } from 'react-csv/lib';
import DownloadButton from "./DownloadButton";
import DownloadDOIButton from "./DownloadDOIButton";
import CreatePostButton from "./CreatePostButton";
import FlowbackMap from "./FlowbackMap";
import FlowbackTable from "./FlowbackTable";
import axios from 'axios';

const {TabPane} = Tabs

class Main extends Component {
    constructor() {
        super();
        this.state = {
            flowbackRecords: undefined,
            filteredRecords: undefined,
        }
    }

    componentDidMount() {
        this.fetchFlowbackRecords();
    }

    fetchFlowbackRecords = () => {
        const url = '../api/flowback/';
        axios.get(url)
            .then(response => {
                console.log(response.data);
                this.setState({
                    flowbackRecords: response.data,
                    filteredRecords: response.data,
                })
            })
            .catch(error => {
                console.log('err in fetch flowbackRecords -> ', error);
            })
    }

    handleTableFilter = (pagination, filters, sorter, extra) => {
        this.setState({
            filteredRecords: extra.currentDataSource,
        })
    }

    render() {
        const operations =
            <div style={{display: "flex"}}>
                <div style={{margin:"0px 5px"}}>
                <Button type="primary" icon="download" href='https://djangohydroapp.s3.amazonaws.com/flowback_template_with_instructions.csv'>Download Template</Button>
                </div>
            <CreatePostButton updateData={this.fetchFlowbackRecords}/>
            </div>
        return (
            <div>
                <Tabs tabBarExtraContent={operations} className="main-tabs">
                    <TabPane tab="Flowback Posts" key="1">
                        <FlowbackTable data={this.state.flowbackRecords} onChange={this.handleTableFilter}/>
                    </TabPane>
                    <TabPane tab="Map" key="2">
                        <FlowbackMap
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyChXeUd-t_bojnZ6vE2s_6xORmEWfq26FE"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `600px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            data={this.state.flowbackRecords}
                        />
                    </TabPane>
                </Tabs>

                <div style={{display: "flex"}}>
                    <DownloadButton data={this.state.filteredRecords}></DownloadButton>
                    <DownloadDOIButton data={this.state.filteredRecords}></DownloadDOIButton>
                </div>
            </div>
        );
    }
}

export default Main;