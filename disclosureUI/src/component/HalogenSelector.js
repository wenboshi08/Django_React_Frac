import React from 'react';

import {Label, FormGroup, Input, FormText} from 'reactstrap';

class HalogenSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.onHalogenChange(e.target.value)
    }

    render() {

        return (
            <FormGroup>
                <Label>{this.props.label}</Label>
                <Input placeholder={`Enter a ${this.props.label} value`}
                       type="number"
                       value={this.props.value}
                       onChange={this.handleChange}
                       disabled={this.props.disabled}/>
                <FormText>{`Type the low boundary for ${this.props.label} (mg/L)`}</FormText>
            </FormGroup>
        )
    }
}

export default HalogenSelector;