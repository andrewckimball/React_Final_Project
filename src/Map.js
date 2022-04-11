import React, { useState } from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';


function Map(props) {
  const defaultZoom = props.returnJSON ? 7 : 4;
  const lat = props.returnJSON ? Number(props.returnJSON['latitude']) : 38.907192;
  const lng = props.returnJSON ? Number(props.returnJSON['longitude']) : -94.036873;
  const summary = props.returnJSON ? props.returnJSON['capital_summary'] : "DC TEST";

  const [selectedCapital, setSelectedCapital] = useState(null);

  return (
    <GoogleMap 
      zoom={defaultZoom}
      center={{
        lat:lat,
        lng: lng
      }}
    >
      {props.returnJSON && (
        <Marker 
          position={{
            lat: lat,
            lng: lng
          }}
          onClick={() => {
            setSelectedCapital(true);  
          }}
        />
      )}


      {selectedCapital && (
        <InfoWindow 
          position={{
            lat: lat,
            lng: lng
          }}
          onCloseClick={() => {
            setSelectedCapital(null);
          }}
        >
          <div style={{color: 'black'}}>
            <h2>{props.returnJSON['capital_city'] + ", " + props.returnJSON['state']}</h2>
            <p>{summary}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
  
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap