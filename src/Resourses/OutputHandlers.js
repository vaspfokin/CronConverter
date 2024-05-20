import { data } from "./Data";

const getMinuteOutput = (selectedMinutes, minutePeriodicity, atEveryOption) =>{
    if(atEveryOption === 'every'){
        if(minutePeriodicity === '0' || !minutePeriodicity)
            return '*';
        const minutes = `*/${minutePeriodicity}`;
        return minutes;
    } else{
        if(selectedMinutes.length === 0) 
            return '*';
        else{
            const minutes = selectedMinutes.map(Number).sort((a, b) => a - b).join(',');
            return minutes;
        }
    }
    
}

const getDomOutput = (selectedDays) => {
    if(selectedDays.length === 0) 
        return '*';
    else{
        const dom = selectedDays.map(Number).sort((a, b) => a - b).join(',');
        return dom;
    }
    
}

const getHourOutput = (selectedHours) => {
    if(selectedHours.length === 0) 
        return '*';
    else{
        const hours = selectedHours.map(Number).sort((a, b) => a - b).join(',');
        return hours;
    }
}

const getMonthOutput = (selectedMonths) => {
    if(selectedMonths.length === 0)
         return '*';
    else{  
        const indexes = selectedMonths.map(item => data.month.listOfOptions.indexOf(item)+1);
        const month = indexes.sort((a, b) => a - b).join(',');
        return month;
    }
}

const getDowOutput = (selectedDows) => {
    if(selectedDows.length === 0) 
        return '*';
    else{
        const indexes = selectedDows.map(item => data.dow.listOfOptions.indexOf(item) + 1);
        const dow = indexes.sort((a, b) => a - b).join(',');
        return dow;
    }
}

const getOutputString = (selectedDays, selectedMonths, selectedDows, selectedHours, selectedMinutes,  minutePeriodicity, atEveryOption) =>{
    const result = getMinuteOutput(selectedMinutes, minutePeriodicity, atEveryOption) + ' ' + getHourOutput(selectedHours) + ' ' + getDomOutput(selectedDays) + ' '+ getMonthOutput(selectedMonths) + ' ' + getDowOutput(selectedDows);
    return result;
}

  export {getOutputString}