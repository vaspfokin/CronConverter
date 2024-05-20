import { data } from "./Data";


function setTimeFromValues(input, setSelectedTime){
    const values = input.split(',');
    setSelectedTime(values);
}

function setEveryMinutes(input, setMinutePeriodicity){
    const value = input.split('/');
    setMinutePeriodicity(value[1]);
}

function setDaysFromRange(input, setSelectedDays){
    const values = input.split('-');
    const rangeFrom = values[0];
    const rangeTo = values[1];
    const newDays = [];
    for(let i = rangeFrom; i <= rangeTo; i++){
        console.log(i);
        newDays.push(i);
    }
    setSelectedDays(newDays);
}

function setMonthsFromIndeces(input, setSelectedMonths){
    const values = input.split(',');
    const newMonths = [];
    for(let i = 0; i < values.length; i++){
        newMonths.push(data.month.listOfOptions[values[i] - 1]);
    }
    setSelectedMonths(newMonths);
}

function setMonthFromRange(input, setSelectedMonths){
    const values = input.split('-');
    const rangeFrom = values[0];
    const rangeTo = values[1];
    const newMonths = [];
    for(let i = rangeFrom; i <= rangeTo; i++){
        newMonths.push(data.month.listOfOptions[i - 1]);
    }
    setSelectedMonths(newMonths);
}

function setDowsFromIndeces(input, setSelectedDows){
    const values = input.split(',');
    
    const newDows = [];
    for(let i = 0; i < values.length; i++){
        let index = values[i];
        if(index == 0){
            index = 7;
        }
        console.log('index ' + data.dow.listOfOptions[index - 1]);
        newDows.push(data.dow.listOfOptions[index - 1]);
    }
    setSelectedDows(newDows);
}

function setDowsFromRange(input, setSelectedDows){
    const values = input.split('-');
    const rangeFrom = values[0];
    const rangeTo = values[1];
    const newDows = [];
    for(let i = rangeFrom; i <= rangeTo; i++){
        if(i == 0){
            console.log(data.dow.listOfOptions[6]);
            newDows.push(data.dow.listOfOptions[6]);
        } else
            newDows.push(data.dow.listOfOptions[i - 1]);
    }
    setSelectedDows(newDows);
}

function setDivFromInputString(dom, month, dow, setSelectedDiv){
    if(month.length > 0)
        setSelectedDiv('custom');
    else if(dom.length > 0 && dow.length > 0) 
        setSelectedDiv('custom');
    else if(dom.length > 0)
        setSelectedDiv('monthly');
    else if(dow.length > 0)
        setSelectedDiv('weekly');
    else setSelectedDiv('daily');
            
}


export {setTimeFromValues, setEveryMinutes, setDaysFromRange, setMonthsFromIndeces, setMonthFromRange, setDowsFromIndeces, setDowsFromRange, setDivFromInputString}