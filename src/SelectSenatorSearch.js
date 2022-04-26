import React, { useState } from 'react';
import SearchBar from "./SearchBar.js";
import * as NameData from './Data/Names.json';
import * as ReactBoostrap from 'react-bootstrap';

function LoadingIndicator() {
  return (
    <div         
      style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ReactBoostrap.Spinner animation="border" />
    </div>
  );
}

function SelectSenatorSearch({setSenator}) {
  const [ search, setSearch ] = useState("");
  const [ fetchedData, setFetchedData] = useState(true);
  const [ loading, setLoading ] = useState(false);

  const fetchData = async () => {
    setLoading(true)
    setFetchedData(null)
    if (search) {
      const endpoint = `https://stark-cliffs-11649.herokuapp.com/select/${search}`
      const data = await fetch(endpoint)
      const json = await data.json();
      setFetchedData(json)
      setSenator(json)
    }
  }


  const handleSubmit = e => {
    e.preventDefault()
    fetchData()
  }

  return (
    <>
      <form className="col-lg-9 offset-lg-1" onSubmit={handleSubmit}>
        <label>Search among the 100 US Senators</label>
        <SearchBar 
          placeholder="Enter Senator Name" 
          NameData={NameData}
          setSearch={setSearch}
        />
        <br></br><br></br>
        <div className='result'>
          {loading && (
            <>
              {fetchedData ? 
                <div className="col-md-12">
                  <h3>{fetchedData['full_name']}</h3>
                  <img src={fetchedData['img']} className='imgWrap' alt='img'></img>
                  <p dangerouslySetInnerHTML={{__html: fetchedData['wiki_html'].slice(1,-1)}}></p>
                </div>
                : <LoadingIndicator/>
              }
            </>
          )}
        </div> 
      </form>
    </>
  );
}

export default SelectSenatorSearch
