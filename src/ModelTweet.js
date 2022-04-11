import React, { useState } from 'react';


function ModelTweet({setSenator}) {
  const [ search, setSearch ] = useState("");
  // const [ results, setResults ] = useState([]);
  const [ results, setResults ] = useState(null);

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
    // setResults(json['wiki_html'].slice(1,-1));
    setResults(json);
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
            maxLength="280"
            value={search}
            onChange={e => setSearch(e.target.value)}
          >
          </textarea>
      </div>
      <button value="Submit" class="btn btn-outline-primary">Run Model</button>
      {/* <div>
        <p dangerouslySetInnerHTML={{__html: results}}></p>
      </div> */}
      <br></br><br></br>
      {results && (
        <div className="col-md-12">
          <h3>{results['full_name']}</h3>
          <img src={results['img']} className='imgWrap' alt='img'></img>
          <p dangerouslySetInnerHTML={{__html: results['wiki_html'].slice(1,-1)}}></p>
        </div>
      )}
    </form> 
  );
}

export default ModelTweet