import React, { useState, useEffect } from 'react';
import SearchBar from "./Components/SearchBar.js";
import * as NameData from './Data/Names.json';

function SelectSenatorSearch({setSenator}) {
  const [ search, setSearch ] = useState("");
  const [ fetchedData, setFetchedData] = useState(null)

  async function fetchData() {
    if (search) {
      const endpoint = `https://18.223.172.210/select/${search}`
      // const endpoint = `http://127.0.0.1:8000/select/${search}`
      const data = await fetch(endpoint)
      const json = await data.json();
      setFetchedData(json)
      setSenator(json)
    }
  }

  useEffect(() => {
    fetchData()
  }, []) //

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
          {fetchedData && (
            <div className="col-md-12">
              <h3>{fetchedData['full_name']}</h3>
              <img src={fetchedData['img']} className='imgWrap' alt='img'></img>
              <p dangerouslySetInnerHTML={{__html: fetchedData['wiki_html'].slice(1,-1)}}></p>
            </div>
          )}
        </div> 
      </form>
    </>
  );
}

export default SelectSenatorSearch