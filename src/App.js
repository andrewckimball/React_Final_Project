import React, { useState } from 'react';
import './App.css';
import SearchBar from "./Components/SearchBar.js";
import senatordata from "./listData.json";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

/* IMPORTANT youtube vids: https://www.youtube.com/watch?v=x7niho285qs | https://www.youtube.com/watch?v=Gyg5R8Sfo1U */

function TestTweet({setSenator}) {
  const [ search, setSearch ] = useState("");
  const [ results, setResults ] = useState([]);

  const handleSearch = async e => {
    e.preventDefault();
    if (search === "") return;

    // Pull correct senator name from model guess
    // Debugging endpoint
    // const sen_name_endpoint = `http://127.0.0.1:8000/predict/${search}&origin=*`;
    // Live endpoint
    const sen_name_endpoint = `http://18.223.172.210/predict/${search}&origin=*`;
    const response_senator = await fetch(sen_name_endpoint);
    
    if (!response_senator.ok) {
      throw Error(response_senator.statusText);
    }

    const json = await response_senator.json();
    setResults(json['wiki_html'].slice(1,-1));
    setSenator(json);
  }

  return (
    <form name="form" onSubmit={handleSearch} class="col-lg-9 offset-lg-1">
      <div class="form-group">
          <label>Write a tweet for the model to guess</label>
          <textarea 
            class="form-control" 
            name="tweet" 
            rows="3" 
            placeholder="Enter tweet text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          >
          </textarea>
      </div>
      <button value="Submit" class="btn btn-outline-primary">Run Model</button>
      <div>
        <p dangerouslySetInnerHTML={{__html: results}}></p>
      </div>
    </form> 
  );
}

function SelectSenatorOLD() {
  return (
    <>
      <form class="col-lg-9 offset-lg-1">
        <label>Search among the 100 US Senators</label>
        {/* <input class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search"/> */}
        <SearchBar placeholder="enter a senator name" data={senatordata}/>
        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </>
  );
}

function SelectSenator({setSenator}) {
  const [ search, setSearch ] = useState("");
  const [ results, setResults ] = useState([]);

  const handleSearch = async e => {
      e.preventDefault();
      if (search === "") return;

      // Debugging purposes
      // const endpoint = `http://127.0.0.1:8000/select/${search}`;
      // Live
      const endpoint = `http://18.223.172.210/select/${search}`;
      const response = await fetch(endpoint);
      
      if (!response.ok) {
          throw Error(response.statusText);
      }

      const json = await response.json();

      if (json[0] === "Error, not found") {
        setResults("");
        setSenator("");
      } else {
        setResults(json['wiki_html'].slice(1,-1));
        setSenator(json);
      }
  }


  return (
      <div className='SelectV2'>
          <form name="form" class="col-lg-9 offset-lg-1" onSubmit={handleSearch}>
              <div class="form-group">
                  <label>Choose Senator among list</label>
                  <input 
                      class="form-control" 
                      name="tweet" 
                      placeholder="Enter Senator" 
                      value={search}
                      onChange={e => setSearch(e.target.value)}/>
              </div>
              <button value="Submit" class="btn btn-outline-primary">Search</button>
              <div className='result'>
                <p dangerouslySetInnerHTML={{__html: results}} ></p>
              </div> 
          </form> 
      </div>
  );
}

function Switch(props) {
  const { checked, handleChange } = props;

  return (
    <>
        <div class="form-check form-switch offset-lg-1">
            <input 
                class="form-check-input" 
                type="checkbox" 
                id="flexSwitchCheckChecked" 
                checked= {checked}
                onChange={handleChange}
            />
            <label class="form-check-label" for="flexSwitchCheckChecked">AI Guess or Selection?</label>
        </div>
        <br/>
    </>
  );
}

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
                
                <Switch checked={checked} handleChange={handleChange}/>
                { checked ? (
                    <TestTweet setSenator={setSenator}/>
                ) : (
                    <SelectSenator setSenator={setSenator}/>
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

export default TwitterApp;
