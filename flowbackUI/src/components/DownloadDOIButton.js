import React, {Component} from 'react';
import {Button} from 'antd';
import { CSVLink } from 'react-csv/lib';

class DownloadDOIButton extends Component {

    render() {
        console.log(this.props.data);
        let button;
        if (typeof this.props.data === 'undefined') {
            button = <Button>
                Download Reference List
            </Button>
        } else {
            const flowbackRecords = this.props.data;
            const DOIList = flowbackRecords.map((record) => {return record.reference});
            const uniqueDOIList = [...new Set(DOIList)];
            const uniqueDOIListObject = uniqueDOIList.map(doi => {return {"reference": doi}});
            console.log(uniqueDOIListObject);
            button =
            <Button type="primary" shape="round" icon="download">
                <CSVLink data={uniqueDOIListObject} filename={"flowback_records_references.csv"}
                className="btn btn-primary" style={{color:"white"}}>
                    Download Reference List
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

export default DownloadDOIButton;