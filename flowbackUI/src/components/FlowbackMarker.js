import React, {Component} from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class FlowbackMarker extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        }
    }

    handleToggle = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen}));
    }

    render() {
        const { latitude, longitude, compound_name, concentration} = this.props.point;

        return (
            <Marker
                position={{lat: latitude, lng: longitude}}
                onClick={this.handleToggle}
            >
                {
                    this.state.isOpen ? (
                        <InfoWindow>
                            <div>
                                <p>{`Compound Name: ${compound_name}`}</p>
                                <p>{`Concentration: ${concentration}`}</p>
                            </div>
                        </InfoWindow>
                    ) : null
                }
            </Marker>
        )
    }
}

export default FlowbackMarker;