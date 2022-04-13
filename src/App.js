import React, { useState } from 'react';
import './App.css';
import WrappedMap from './Map';
import ModelTweet from './ModelTweet';
import SelectSenatorSearch from './SelectSenatorSearch';
import ToggleView from './ToggleView';




function TwitterApp() {
  const [checked, setChecked] = useState(false);
  const [senator, setSenator] = useState();

  const handleChange = () => {
      setChecked(!checked);
  }

  return (
    <div className="App-header">
        <div className='header'>
            <h1>Welcome to My App</h1>
        </div>
        <div className='content'>
            <div className="twitter">
                
                <ToggleView checked={checked} handleChange={handleChange}/>
                { checked ? (
                    <ModelTweet setSenator={setSenator}/>
                ) : (
                    // <SelectSenator setSenator={setSenator}/>
                    <SelectSenatorSearch setSenator={setSenator}/>
                )}
            </div>
            <div className="map">
              <WrappedMap 
                returnJSON={senator}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
        </div>
    </div>
  );
}

export default TwitterApp;
