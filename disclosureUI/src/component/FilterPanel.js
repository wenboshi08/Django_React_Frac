import React, {Component} from 'react';
import TemperatureSelector from './TemperatureSelector';
import HalogenSelector from './HalogenSelector';
import AutofillCheckbox from "./AutofillCheckbox";
import {Button, ButtonGroup} from 'reactstrap';

const CL = 51982.505924;
const BR = 564.729184;
const I = 28.119126;

class FilterPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: 0,
            chloride: {
                value: 0,
                autofill: false,
                disabled: false
            },
            bromide: {
                value: 0,
                autofill: false,
                disabled: false
            },
            iodide: {
                value: 0,
                autofill: false,
                disabled: false
            }
        }
    }

    handleTemperatureChange = (temperature) => {
        this.setState({temperature: temperature})
    }

    handleChlorideChange = (chloride) => {
        this.setState((state) => {
            let br = state.bromide.value, i = state.iodide.value;
            if (state.bromide.autofill === true && state.iodide.autofill === false) {
                br = (BR / CL * chloride + BR / I * i) / 2;
            } else if (state.bromide.autofill === false && state.iodide.autofill === true) {
                i = (I / CL * chloride + I / BR * br) / 2;
            } else if (state.bromide.autofill === true && state.iodide.autofill === true) {
                br = BR / CL * chloride;
                i = I / CL * chloride;
            }
            return {
                chloride: {value: chloride, autofill: state.chloride.autofill, disabled: state.chloride.autofill},
                bromide: {value: br, autofill: state.bromide.autofill, disabled: state.bromide.autofill},
                iodide: {value: i, autofill: state.iodide.autofill, disabled: state.iodide.disabled}
            }
        })
    }

    handleBromideChange = (bromide) => {
        this.setState((state) => {
            let cl = state.chloride.value, i = state.iodide.value;
            if (state.chloride.autofill === true && state.iodide.autofill === false) {
                cl = (CL / BR * bromide + CL / I * i) / 2;
            } else if (state.chloride.autofill === false && state.iodide.autofill === true) {
                i = (I / CL * cl + I / BR * bromide) / 2;
            } else if (state.chloride.autofill === true && state.iodide.autofill === true) {
                cl = CL / BR * bromide;
                i = I / BR * bromide;
            }
            return {
                chloride: {value: cl, autofill: state.chloride.autofill, disabled: state.chloride.autofill},
                bromide: {value: bromide, autofill: state.bromide.autofill, disabled: state.bromide.autofill},
                iodide: {value: i, autofill: state.iodide.autofill, disabled: state.iodide.disabled}
            }
        })
    }

    handleIodideChange = (iodide) => {
        this.setState((state) => {
            let cl = state.chloride.value, br = state.bromide.value;
            if (state.chloride.autofill === true && state.bromide.autofill === false) {
                cl = (CL / BR * br + CL / I * iodide) / 2;
            } else if (state.chloride.autofill === false && state.bromide.autofill === true) {
                br = (BR / CL * cl + BR / I * iodide) / 2;
            } else if (state.chloride.autofill === true && state.bromide.autofill === true) {
                cl = CL / I * iodide;
                br = BR / I * iodide;
            }
            return {
                chloride: {value: cl, autofill: state.chloride.autofill, disabled: state.chloride.autofill},
                bromide: {value: br, autofill: state.bromide.autofill, disabled: state.bromide.autofill},
                iodide: {value: iodide, autofill: state.iodide.autofill, disabled: state.iodide.disabled}
            }
        })
    }

    onChlorideAutofillClick = () => {
        this.setState((state) => {
            let cl = state.chloride.value, br = state.bromide.value, i = state.iodide.value;
            //case one previous state chloride autofill is false
            if (state.chloride.autofill === false) {
                if (state.bromide.autofill === false && state.iodide.autofill === false) {
                    cl = (CL / BR * br + CL / I * i) / 2;
                } else if (state.bromide.autofill === true && state.iodide.autofill === false) {
                    cl = CL / I * i;
                    br = BR / I * i;
                } else if (state.bromide.autofill === false && state.iodide.autofill === true) {
                    cl = CL / BR * br;
                    i = I / BR * br;
                } else {
                    cl = CL;
                    br = BR;
                    i = I;
                }
            } else { // case two previous state chloride autofill is true
                if (state.bromide.autofill === true && state.iodide.autofill === false) {
                    br = (BR / CL * cl + BR / I * i) / 2;
                } else if (state.bromide.autofill === false && state.iodide.autofill === true) {
                    i = (I / CL * cl + I / BR * br) / 2;
                }
            }
            return {
                chloride: {value: cl, autofill: !state.chloride.autofill, disabled: !state.chloride.autofill},
                bromide: {value: br, autofill: state.bromide.autofill, disabled: state.bromide.autofill},
                iodide: {value: i, autofill: state.iodide.autofill, disabled: state.iodide.disabled}
            }
        })
    }

    onBromideAutofillClick = () => {
        this.setState((state) => {
            let cl = state.chloride.value, br = state.bromide.value, i = state.iodide.value;
            //case one previous state bromide autofill is false
            if (state.bromide.autofill === false) {
                if (state.chloride.autofill === false && state.iodide.autofill === false) {
                    br = (BR / CL * cl + BR / I * i) / 2;
                } else if (state.chloride.autofill === true && state.iodide.autofill === false) {
                    br = BR / I * i;
                    cl = CL / I * i;
                } else if (state.chloride.autofill === false && state.iodide.autofill === true) {
                    br = BR / CL * cl;
                    i = I / CL * cl;
                } else {
                    cl = CL;
                    br = BR;
                    i = I;
                }
            } else { // case two previous state bromide autofill is true
                if (state.chloride.autofill === true && state.iodide.autofill === false) {
                    cl = (CL / BR * br + CL / I * i) / 2;
                } else if (state.chloride.autofill === false && state.iodide.autofill === true) {
                    i = (I / CL * cl + I / BR * br) / 2;
                }
            }
            return {
                chloride: {value: cl, autofill: state.chloride.autofill, disabled: state.chloride.autofill},
                bromide: {value: br, autofill: !state.bromide.autofill, disabled: !state.bromide.autofill},
                iodide: {value: i, autofill: state.iodide.autofill, disabled: state.iodide.disabled}
            }
        })
    }

    onIodideAutofillClick = () => {
        this.setState((state) => {
            let cl = state.chloride.value, br = state.bromide.value, i = state.iodide.value;
            //case one previous state iodide autofill is false
            if (state.iodide.autofill === false) {
                if (state.chloride.autofill === false && state.bromide.autofill === false) {
                    i = (I / CL * cl + I / BR * br) / 2;
                } else if (state.chloride.autofill === true && state.bromide.autofill === false) {
                    i = I / BR * br;
                    cl = CL / BR * br;
                } else if (state.chloride.autofill === false && state.bromide.autofill === true) {
                    br = BR / CL * cl;
                    i = I / CL * cl;
                } else {
                    cl = CL;
                    br = BR;
                    i = I;
                }
            } else { // case two previous state iodide autofill is true
                if (state.chloride.autofill === true && state.bromide.autofill === false) {
                    cl = (CL / BR * br + CL / I * i) / 2;
                } else if (state.chloride.autofill === false && state.bromide.autofill === true) {
                    br = (BR / CL * cl + BR / I * i) / 2;
                }
            }
            return {
                chloride: {value: cl, autofill: state.chloride.autofill, disabled: state.chloride.autofill},
                bromide: {value: br, autofill: state.bromide.autofill, disabled: state.bromide.autofill},
                iodide: {value: i, autofill: !state.iodide.autofill, disabled: !state.iodide.disabled}
            }
        });
    }


    onShowDisclosureMap = () => {
        this.props.onShowMap({
            temperature: this.state.temperature,
            chloride: this.state.chloride.value,
            bromide: this.state.bromide.value,
            iodide: this.state.iodide.value,
        });
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.onShowDisclosureMap}>Track on Map</Button>
                <hr />
                <TemperatureSelector value={this.state.temperature} onTemperatureChange={this.handleTemperatureChange}/>
                <AutofillCheckbox onClick={{
                    chlorideClick: this.onChlorideAutofillClick,
                    bromideClick: this.onBromideAutofillClick,
                    iodideClick: this.onIodideAutofillClick
                }}
                                  autofill={{
                                      chloride: this.state.chloride.autofill,
                                      bromide: this.state.bromide.autofill,
                                      iodide: this.state.iodide.autofill
                                  }}/>
                <HalogenSelector id="chlorideConcentration" label="Chloride" value={this.state.chloride.value}
                                 onHalogenChange={this.handleChlorideChange} disabled={this.state.chloride.disabled}/>
                <HalogenSelector id="bromideConcentration" label="Bromide" value={this.state.bromide.value}
                                 onHalogenChange={this.handleBromideChange} disabled={this.state.bromide.disabled}/>
                <HalogenSelector id="iodideConcentration" label="Iodide" value={this.state.iodide.value}
                                 onHalogenChange={this.handleIodideChange} disabled={this.state.iodide.disabled}/>
            </div>
        );
    }
}

export default FilterPanel;