import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalStyle.css'
import React, { useState, useEffect } from 'react';
import { data } from './Resourses/Data';
import { getOutputString } from './Resourses/OutputHandlers';
import { CustomMultiSelect } from './Resourses/Blocks';
import { ValidateInputString } from './Resourses/InputHandlers';





//{selectedHours, setSelectedHours, selectedMinutes, setSelectedMinutes, hourOption, minuteOption, atEveryOption, setAtEveryOption}


function Main({inputCron, reload, setOutput, save}) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedDows, setSelectedDows] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);
  const [selectedMinutes, setSelectedMinutes] = useState([]);
  const [minutePeriodicity, setMinutePeriodicity] = useState(null);
  const [atEveryOption, setAtEveryOption] = useState('');

  const [selectedDiv, setSelectedDiv] = useState('');

  function changeDivHandler(event){
    setSelectedDiv(event.target.value);
    setSelectedMinutes([])
    setSelectedHours([]);
    setSelectedDays([]);
    setSelectedDows([]);
    setSelectedMonths([]);
    setMinutePeriodicity(null);
    setAtEveryOption('');
  }

  useEffect(() => {
    if (inputCron) {
      setOutput(ValidateInputString(inputCron, setSelectedMinutes, setMinutePeriodicity, setSelectedHours, setSelectedDays, setSelectedMonths, setSelectedDows, setAtEveryOption, setSelectedDiv));
      console.log(`${selectedMinutes} ${selectedHours} ${selectedDays} ${selectedMonths} ${selectedDows}`);
    }
  }, [reload]);

  useEffect(() => {
      setOutput(getOutputString(selectedDays, selectedMonths, selectedDows, selectedHours, selectedMinutes, minutePeriodicity, atEveryOption));
  }, [save]);



  function DailyBlock(){

    function atEveryChangeHandler(event){
      setAtEveryOption(event.target.value);
    }
  
    function onMinuteChangeHandler(event){
      setMinutePeriodicity(event.target.value);
    }
  
  
    return(
  
      <div className= "row mx-3 p-0">
        <div className='row'>
          <div className='col-1 my-3'>
            <div className='d-flex'>
              <input type='radio' checked={atEveryOption === 'at'} value={'at'} onChange={atEveryChangeHandler}/>At
            </div>
          </div>
        
          <div className='col-4 my-3'>
              <CustomMultiSelect selectedOptions={selectedHours} setSelectedOptions={setSelectedHours}  option = {data.hour}/>
          </div> 
          <div className='col-4 my-3'>
            <div className='d-flex'>
              <span className='' style={{width:30}}>{data.minute.prefix}</span>
              <CustomMultiSelect selectedOptions={selectedMinutes} setSelectedOptions={setSelectedMinutes} option = {data.minute}/>   
            </div>
            
          </div>
        </div>
        <div className='row'>
          <div className='col-1 my-3'>
            <div className='d-flex '>
              <input type='radio' checked={atEveryOption === 'every'} value={'every'} onChange={atEveryChangeHandler}/>Every
            </div>
          </div>
          <div className='col-4 my-3'>
            <select className='selected-options rounded w-100' style={{backgroundColor: '#f8f9fa'}} id="singleSelect" value={minutePeriodicity} onChange={onMinuteChangeHandler}>
              <option value="">--Please choose an option--</option>
              {data.minute.listOfOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div> 
          <div className='col-4 my-3'>
            <div className='d-flex justify-content-center'>
              <h4>minute(-s)</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
  

  function WeeklyBlock(){
    return(
      <div className= "row mx-3 p-0">
          <div className='col-4 my-3'>
            <div className='d-flex align-items-start justify-content-start '>
              <span className='' style={{width:30}}>{data.dow.prefix}</span>
             <CustomMultiSelect selectedOptions={selectedDows} setSelectedOptions={setSelectedDows} option = {data.dow}/>      
            </div>
          </div>
          <div className='col-4 my-3'>
            <div className='d-flex align-items-start justify-content-start '>
              <span className='' style={{width:30}}>{data.hour.prefix}</span>
              <CustomMultiSelect selectedOptions={selectedHours} setSelectedOptions={setSelectedHours}  option = {data.hour}/>
            </div>
          </div> 
          <div className='col-4 my-3'>
            <div className='d-flex align-items-start justify-content-start '>
              <span className='' style={{width:30}}>{data.minute.prefix}</span>
              <CustomMultiSelect selectedOptions={selectedMinutes} setSelectedOptions={setSelectedMinutes} option = {data.minute}/>   
            </div>
          </div>
        </div>
    )
  }
  
  function MonthlyBlock(){
    return(
      <div className= "row mx-3 p-0">
          <div className='col-4 my-3 px-0'>
            <div className='d-flex align-items-start justify-content-start '>
              <span className='' style={{width:30}}>{data.dom.prefix}</span>
             <CustomMultiSelect selectedOptions={selectedDays} setSelectedOptions={setSelectedDays} option = {data.dom}/>      
            </div>
          </div>
          <div className='col-4 my-3 px-0'>
            <div className='d-flex align-items-start justify-content-start '>
              <span className='' style={{width:30}}>{data.hour.prefix}</span>
              <CustomMultiSelect selectedOptions={selectedHours} setSelectedOptions={setSelectedHours}  option = {data.hour}/>
            </div>
          </div> 
          <div className='col-4 my-3 px-0'>
            <div className='d-flex align-items-start justify-content-start '>
              <span className='' style={{width:30}}>{data.minute.prefix}</span>
              <CustomMultiSelect selectedOptions={selectedMinutes} setSelectedOptions={setSelectedMinutes} option = {data.minute}/>   
            </div>
          </div>
        </div>
    )
  }

  function CustomBlock(){
    return(
      <>
      <div className= "row mx-3 p-0">
          <div className='col my-3 px-0'>
            <div className='d-flex align-items-start justify-content-start '>
                <span className='' style={{width:30}}>{data.month.prefix}</span>
                <CustomMultiSelect selectedOptions={selectedMonths} setSelectedOptions={setSelectedMonths} option = {data.month}/>  
            </div>     
          </div>
          <div className='col my-3 px-0'>
            <div className='d-flex align-items-start justify-content-start '>
                <span className='' style={{width:30}}>{data.dom.prefix}</span>
                <CustomMultiSelect selectedOptions={selectedDays} setSelectedOptions={setSelectedDays}  option = {data.dom}/>
            </div> 
          </div>
          <div className='col my-3 px-0'>
            <div className='d-flex align-items-start justify-content-start '>
                <span className='' style={{width:30}}>{data.dow.prefix}</span>
                <CustomMultiSelect selectedOptions={selectedDows} setSelectedOptions={setSelectedDows} option = {data.dow}/>
            </div>      
          </div> 
        </div>
        <div className= "row mx-3 p-0">
          <div className='col-4 my-3 px-0'>
            <div className='d-flex align-items-start justify-content-start '>
                <span className='' style={{width:30}}>{data.hour.prefix}</span>
            <CustomMultiSelect selectedOptions={selectedHours} setSelectedOptions={setSelectedHours}  option = {data.hour}/>
            </div> 
          </div> 
          <div className='col-4 my-3 px-0'>
            <div className='d-flex align-items-start justify-content-start '>
                <span className='' style={{width:30}}>{data.minute.prefix}</span>
                <CustomMultiSelect selectedOptions={selectedMinutes} setSelectedOptions={setSelectedMinutes} option = {data.minute}/>  
            </div> 
          </div>
        </div>
      </>
    )
  }

  return(
    <div className= "border rounded">
      <div className = "row mx-0">
        <h3>Lets make CRON</h3>
      </div>
      <div className='border rounded p-3'>
        <div  style={{minHeight:'50px'}}>
          <div className='d-flex justify-content-start'>
            <input  type="radio" checked={selectedDiv === 'daily'} value={'daily'} onChange={changeDivHandler} />
            <h3 >Daily</h3>
          </div>
        </div>
        {selectedDiv === 'daily' && <DailyBlock />}
      </div>
      <div className='border rounded p-3'>
        <div  style={{minHeight:'50px'}}>
        <div className='d-flex justify-content-start'>
            <input  type="radio" checked={selectedDiv === 'weekly'} value={'weekly'} onChange={changeDivHandler} />
            <h3 >Weekly</h3>
          </div>
        </div>
        {selectedDiv === 'weekly' && <WeeklyBlock/>}
      </div>

      <div className='border rounded p-3'>
        <div  style={{minHeight:'50px'}}>
        <div className='d-flex justify-content-start'>
            <input  type="radio" checked={selectedDiv === 'monthly'} value={'monthly'} onChange={changeDivHandler} />
            <h3 >Monthly</h3>
          </div>
        </div>
        {selectedDiv === 'monthly' && <MonthlyBlock/>}
      </div>

      <div className='border rounded p-3'>
        <div  style={{minHeight:'50px'}}>
        <div className='d-flex justify-content-start'>
            <input  type="radio" checked={selectedDiv === 'custom'} value={'custom'} onChange={changeDivHandler} />
            <h3 >Custom</h3>
          </div>
        </div>
        {selectedDiv === 'custom' && <CustomBlock/>}
      </div>
    </div>
  )
}

function App() {
  const [cronString, setCronString] = useState('');
  const [reload, setReload] = useState(false);
  const [save, setSave] = useState(false);

  function onLoadClick(){
    setReload(!reload);
  }
  function onSaveClick(){
  setSave(!save)
  }


  return (
    <>
      <div className="row">
        <div className="col-2"></div>
        <div className="col">
          <Main inputCron={cronString} reload={reload} setOutput={setCronString} save={save}/>
          <button className='btn btn-primary' onClick={onSaveClick}>Save</button>
          <button className='btn btn-primary' onClick={onLoadClick}>Load</button>
          <input type='text' onChange={(sender) => setCronString(sender.target.value)} value={cronString}></input>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}

export default App;



