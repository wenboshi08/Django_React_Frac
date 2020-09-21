import React, {Component} from 'react';
import {Button} from 'antd';
import { CSVLink } from 'react-csv/lib';

class DownloadButton extends Component {

    render() {
        console.log(this.props.data);
        let button;
        if (this.props.data.length === 0) {
            button = <Button type="primary" shape="round" icon="download" disabled={true}>
                Download Disclosure Records
            </Button>
        } else {
            button =
            <Button type="primary" shape="round" icon="download">
                <CSVLink data={this.props.data} filename={"disclosure_records.csv"}
                         className="Downloadlink">
                    Download Disclosure Records
            </CSVLink>
            </Button>
        }
        return (
            <div style={{margin:"0px 5px"}}>
                {button}
            </div>
        );
    }
}

export default DownloadButton;