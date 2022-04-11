import React from 'react';

function ToggleView(props) {
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

export default ToggleView