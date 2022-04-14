import React, { useState } from 'react';


function ModelTweet({setSenator}) {
  const [ search, setSearch ] = useState("");
  const [ results, setResults ] = useState(null);

  const handleSearch = async e => {
    e.preventDefault();
    if (search === "") return;

    const sen_name_endpoint = `https://stark-cliffs-11649.herokuapp.com/predict/${search}&origin=*`;
    const response_senator = await fetch(sen_name_endpoint);
    
    if (!response_senator.ok) {
      throw Error(response_senator.statusText);
    }

    const json = await response_senator.json();
    setResults(json);
    setSenator(json);
  }

  return (
    <form name="form" onSubmit={handleSearch} class="col-lg-9 offset-lg-1">
      <div class="form-group">
          <label>Write a Tweet for the AI model to guess</label>
          <textarea 
            class="form-control" 
            name="tweet" 
            rows="3" 
            placeholder="Enter text (the model will guess the most likely senator to author the tweet)"
            maxLength="280"
            value={search}
            onChange={e => setSearch(e.target.value)}
          >
          </textarea>
      </div>
      <button value="Submit" class="btn btn-outline-primary">Run Model</button>
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