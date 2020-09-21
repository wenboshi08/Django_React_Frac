import React, {Component} from 'react';
import { Button, Modal } from "antd";
import ChemicalConcentrationHistogram from "./ChemicalConcentrationHistogram";
import {CSVLink} from "react-csv/lib";

class ShowHistogramButton extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: false,
            confirmLoading: false,
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        })
    };


    render() {
        const { visible, confirmLoading } = this.state;

        return (
            <div style={{margin:"0px 5px"}}>
                <Button type="primary" shape="round" icon="line-chart" disabled={this.props.data.length===0} onClick={this.showModal}>
                    Show Concentration Histogram
                </Button>
                <Modal
                    title="Show Concentration Histogram"
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    okButtonProps={{style: {display: 'none'}}}
                    >
                    <ChemicalConcentrationHistogram data={this.props.data}/>
                </Modal>
            </div>
        );
    }
}

export default ShowHistogramButton;