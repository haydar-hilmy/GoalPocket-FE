import React from 'react';
import styled from 'styled-components';

const Toggle = ({ name, hook_form }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input {...hook_form} name={name} id={name} type="checkbox" />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 12px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch input:focus + .slider {
    border: 1px solid #525252;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border: 1px solid #adb5bd;
    transition: .2s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 20px;
    left: 0.27em;
    bottom: 0.25em;
    background-color: #adb5bd;
    transition: .2s;
  }

  input:checked + .slider {
    background-color: #007bff;
    border: 1px solid #007bff;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #007bff;
  }

  input:checked + .slider:before {
    transform: translateX(1.4em);
    background-color: #fff;
  }`;

export default Toggle;
