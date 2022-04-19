import React, { useState } from 'react';
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

function ModelTweet({setSenator}) {
  const [ search, setSearch ] = useState("");
  const [ results, setResults ] = useState(true);
  const [ loading, setLoading ] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    setResults(null)
    if (search) {
      const sen_name_endpoint = `https://stark-cliffs-11649.herokuapp.com/predict/${search}&origin=*`;
      const response_senator = await fetch(sen_name_endpoint);
      const json = await response_senator.json(); 
      setResults(json);
      setSenator(json);
      // setLoading(true);
    }
  }

  const handleSearch = e => {
    e.preventDefault();
    fetchData();
  }

  return (
    <form name="form" onSubmit={handleSearch} className="col-lg-9 offset-lg-1">
      <div className="form-group">
          <label>Write a Tweet for the AI model to guess</label>
          <textarea 
            className="form-control" 
            name="tweet" 
            rows="3" 
            placeholder="Enter text (the model will guess the most likely senator to author the tweet)"
            maxLength="280"
            value={search}
            onChange={e => setSearch(e.target.value)}
          >
          </textarea>
      </div>
      <button value="Submit" className="btn btn-outline-primary">Run Model</button>
      <br></br><br></br>
      {loading && (
        <>
          {results ?
            <div className="col-md-12">
              <h3>{results['full_name']}</h3>
              <img src={results['img']} className='imgWrap' alt='img'></img>
              <p dangerouslySetInnerHTML={{__html: results['wiki_html'].slice(1,-1)}}></p>
            </div>
            : <LoadingIndicator/>
          }
        </>
      )}
      {/* {results && (
        <div className="col-md-12">
          <h3>{results['full_name']}</h3>
          <img src={results['img']} className='imgWrap' alt='img'></img>
          <p dangerouslySetInnerHTML={{__html: results['wiki_html'].slice(1,-1)}}></p>
        </div>
      )} */}
    </form> 
  );
}

export default ModelTweet