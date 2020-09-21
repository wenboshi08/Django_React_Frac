import React from 'react';

import {Label, FormGroup, Input, FormText} from 'reactstrap';

class TemperatureSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        return (
            <FormGroup>
                <Label>Temperature</Label>
                <Input placeholder="Enter a temperature value"
                       type="number"
                       value={this.props.value}
                       onChange={this.handleChange}/>
                <FormText>Type the low boundary for T in unit of °C</FormText>
            </FormGroup>
        )
    }
}

export default TemperatureSelector;
