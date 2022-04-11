import React, { useState } from 'react';

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
          <form name="form" className="col-lg-9 offset-lg-1" onSubmit={handleSearch}>
              <div class="form-group">
                  <label>Choose Senator among list</label>
                  <input 
                      className="form-control" 
                      name="tweet" 
                      placeholder="Enter Senator" 
                      value={search}
                      onChange={e => setSearch(e.target.value)}/>
              </div>
              <button value="Submit" className="btn btn-outline-primary">Search</button>
              <div className='result'>
                <p dangerouslySetInnerHTML={{__html: results}} ></p>
              </div> 
          </form> 
      </div>
  );
}

export default SelectSenator