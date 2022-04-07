import React, { useState } from 'react';
import './App.css';
import SearchBar from "./Components/SearchBar.js";
import senatordata from "./listData.json";
import JSSoup from 'jssoup';


function TestTweet() {
  const [ search, setSearch ] = useState("");
  const [ results, setResults ] = useState([]);

  const handleSearch = async e => {
    e.preventDefault();
    if (search === "") return;

    // Pull correct senator name from model guess
    const sen_name_endpoint = `http://127.0.0.1:8000/predict/${search}&origin=*`;
    const response_senator = await fetch(sen_name_endpoint);
    
    if (!response_senator.ok) {
      throw Error(response.statusText);
    }
    const senator_wiki_name = await response_senator.json();

    // Pull wikipedia article 
    const endpoint = `http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${senator_wiki_name}&origin=*`
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw Error(response.statusText);
    }

    const json = await response.json()
    setResults(json.parse.text['*'])
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
        {/* <p>{results}</p> */}
        <p dangerouslySetInnerHTML={{__html: results}}></p>
      </div>
    </form> 
  );
}

function SelectSenator() {
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

function SelectV2() {
    const [ search, setSearch ] = useState("");
    const [ results, setResults ] = useState([]);
    // const [ searchInfo, setSearchInfo] = useState({});

    const handleSearch = async e => {
        e.preventDefault();
        if (search === "") return;

        const endpoint = `http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${search}&origin=*`;

        const response = await fetch(endpoint);

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const json = await response.json()
        setResults(json.parse.text['*'])
    }

    const soup = new JSSoup(results);
    const new_results = soup.findAll('p');
    console.log(new_results)

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
            </form> 
            <div className='result'>
                <p dangerouslySetInnerHTML={{__html: results}}></p>
            </div> 
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
                    <TestTweet/>
                ) : (
                    // <SelectSenator/>
                    <SelectV2/>
                )}
            </div>
            <div className="map">
            </div>
        </div>
    </div>
  );
}

export default TwitterApp;
