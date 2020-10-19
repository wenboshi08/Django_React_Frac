import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


class D3Map extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const markers = this.props.disclosures;
        return (
            <ComposableMap projection="geoAlbersUsa"
                           projectionConfig={{
                               rotate: [58, 20, 0],
                               scale: 1000
                           }}>
                <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies
                            .map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#EAEAEC"
                                    stroke="#D6D6DA"
                                />
                            ))
                    }
                </Geographies>
                {markers.map((marker) => (
                    <Marker key={marker.id} coordinates={[marker.longitude, marker.latitude,]}>
                        <circle r={1} fill="#F53" />
                    </Marker>
                ))}
            </ComposableMap>
        )
    }
}

export default D3Map;

