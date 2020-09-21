import React, {Component} from 'react';
import FlowbackMarker from "./FlowbackMarker";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";


class NormalFlowbackMap extends Component {

    render() {
        return (
            <GoogleMap
                defaultZoom={5}
                defaultCenter={{ lat: 39.50, lng: -98.35 }}
            >
                {this.props.data.map(point => <FlowbackMarker point={point} key={point.id}/>)}
            </GoogleMap>
        )
    }
}

const FlowbackMap = withScriptjs(withGoogleMap(NormalFlowbackMap))

export default FlowbackMap;