import React from 'react';
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


class Maps extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const markers = this.props.disclosures;

    const MapWrapper = withScriptjs(
          withGoogleMap(props => (
            <GoogleMap
              defaultZoom={4}
              defaultCenter={{ lat: 39.50, lng: -98.35 }}
              defaultOptions={{
                scrollwheel: true,
                styles: [
                  {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#444444" }]
                  },
                  {
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [{ color: "#f2f2f2" }]
                  },
                  {
                    featureType: "poi",
                    elementType: "all",
                    stylers: [{ visibility: "off" }]
                  },
                  {
                    featureType: "road",
                    elementType: "all",
                    stylers: [{ saturation: -100 }, { lightness: 45 }]
                  },
                  {
                    featureType: "road.highway",
                    elementType: "all",
                    stylers: [{ visibility: "simplified" }]
                  },
                  {
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }]
                  },
                  {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [{ visibility: "off" }]
                  },
                  {
                    featureType: "water",
                    elementType: "all",
                    stylers: [{ color: "#5e72e4" }, { visibility: "on" }]
                  }
                ]
              }}
            >
            {props.markers.map(marker => (
                <Marker
                    position={{lat: marker.latitude, lng:marker.longitude}}
                    key={marker.id}
                  />
              ))}
            </GoogleMap>
          ))
        )
    return (
              <MapWrapper
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyChXeUd-t_bojnZ6vE2s_6xORmEWfq26FE"
                // googleMapURL="https://maps.googleapis.com/maps/api/js?key=MYKEY"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div
                    style={{ height: `600px` }}
                    className="map-canvas"
                  />
                }
                mapElement={
                  <div style={{ height: `100%`, borderRadius: "inherit" }} />
                }
                markers = {markers}
              />
    )
  }
}

export default Maps;