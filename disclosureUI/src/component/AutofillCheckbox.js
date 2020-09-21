import React from 'react';

import {Button, ButtonGroup} from 'reactstrap';

class AutofillCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let selected = [];
        if (this.props.autofill.chloride) {
            selected.push("Cl");
        }
        if (this.props.autofill.bromide) {
            selected.push("Br");
        }
        if (this.props.autofill.iodide) {
            selected.push("I");
        }
        return (
            <div>
                <h5>Halogen AutoFill Checkbox</h5>
                <ButtonGroup>
                    <Button color="primary"
                            onClick={this.props.onClick.chlorideClick}
                            active={!this.props.autofill.chloride}>Chloride</Button>
                    <Button color="primary"
                            onClick={this.props.onClick.bromideClick}
                            active={!this.props.autofill.bromide}>Bromide</Button>
                    <Button color="primary"
                            onClick={this.props.onClick.iodideClick}
                            active={!this.props.autofill.iodide}>Iodide</Button>
                </ButtonGroup>
                <p>Selected: {JSON.stringify(selected)}</p>
            </div>
        )
    }
}

export default AutofillCheckbox;