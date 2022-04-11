import React from 'react';

function ToggleView(props) {
  const { checked, handleChange } = props;

  return (
    <>
      <br></br>
      <div className="form-check form-switch offset-lg-1">
          <input 
              className="form-check-input" 
              type="checkbox" 
              id="flexSwitchCheckChecked" 
              checked= {checked}
              onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">AI Guess or Selection?</label>
      </div>
      <br/>
    </>
  );
}

export default ToggleView