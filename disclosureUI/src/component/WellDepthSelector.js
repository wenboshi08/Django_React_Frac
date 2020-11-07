import React, {Component} from 'react';

import {Label, FormGroup, Input, FormText} from 'reactstrap';

class WellDepthSelector extends Component {
    constructor(props) {
        super(props);
    }


    handleChange = (e) => {
        this.props.onWellDepthChange(e.target.value)
    }

    render() {
        return (
            <FormGroup>
                <Label>Well Depth</Label>
                <Input placeholder="Enter a well depth value"
                       type="number"
                       value={this.props.value}
                       onChange={this.handleChange}/>
                <FormText>Type the low boundary for well depth (m)</FormText>
            </FormGroup>
        );
    }
}

export default WellDepthSelector;