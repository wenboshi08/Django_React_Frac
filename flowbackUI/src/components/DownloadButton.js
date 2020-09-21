import React, {Component} from 'react';
import {Button} from 'antd';
import { CSVLink } from 'react-csv/lib';

class DownloadButton extends Component {

    render() {
        console.log(this.props.data);
        let button;
        if (typeof this.props.data === 'undefined') {
            button = <Button>
                Download Flowback Records
            </Button>
        } else {
            button =
            <Button type="primary" shape="round" icon="download">
                <CSVLink data={this.props.data} filename={"flowback_records.csv"}
                className="btn btn-primary" style={{color:"white"}}>
                    Download Flowback Records
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