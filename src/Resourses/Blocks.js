import React, { useState } from 'react';
import {Calendar } from './DayOfMonth';

function CustomMultiSelect ({selectedOptions, setSelectedOptions, option}){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const clearSelected = () => {
      setSelectedOptions([]);
    }
  
    const optionOnclick = (event) =>{
      setSelectedOptions(selectedOptions.filter((d) => d.toString() !== event.target.value));
    }
    return (
      
          <div className="custom-multi-select">
            <div className="selected-options border rounded row m-0">
              <div className='col-7 p-2 mx-0' style={{flexGrow: '1'}}>
                {selectedOptions.length === 0 ? <span className=''>{option.placeholder}</span> : selectedOptions.map((option) => (
                <>
                <button className='dropdown__input-wrapper'  onClick={optionOnclick} value={option}>{option}</button> 
                ,
                </>
                ))}
                  
              </div>
              <div className="d-flex align-items-center justify-content-end col-4 m-0 p-0">
                {selectedOptions.length > 0 && <button className='btn border ' onClick={clearSelected}>X</button>}
                <button className="dropdown-toggle m-0" onClick={toggleDropdown}></button>
              </div>
            </div>
  
            <div className="dropdown-container">  
              {isDropdownOpen && option.type === 'dom' && (
                <div className="dropdown"  >
                  <Calendar selectedDays={selectedOptions} setSelectedDays={setSelectedOptions}/>
                </div>
              )} 
              {isDropdownOpen && option.type !== 'dom' && (
                <div className="dropdown ">
                  <div className=''> 
                    <SelectOptions selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} listOfOptions={option.listOfOptions}/>
                  </div>
                </div>
              )}
            </div>
          </div>
    );
  };


  function SelectOptions({selectedOptions, setSelectedOptions, listOfOptions}){
  
    const optionOnclick = (event) => {
      console.log(`${selectedOptions.length}`);
      const option = event.target.value;
      setSelectedOptions((prevSelectedOptions) => {
        if (prevSelectedOptions.includes(option)) {
          return prevSelectedOptions.filter(selectedMonth => selectedMonth !== option);
        } else {
          return [...prevSelectedOptions, option];
        }
      });
    }
  
    return (  
      <>
        {listOfOptions.map(option => (
        <button
          className="btn btn-light w-100  justify-content-center d-flex"
          style={{ backgroundColor: selectedOptions.includes(option) ? 'lightblue' : '' }}
          value={option}
          clicked = {selectedOptions.includes(option)}
          onClick={optionOnclick}
        >
          {option}
        </button>
        ))}
      </>
    )
  }
  
  export {CustomMultiSelect}