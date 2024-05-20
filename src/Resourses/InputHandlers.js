import { data } from "./Data";
import { setTimeFromValues, setEveryMinutes, setDaysFromRange, setMonthsFromIndeces, setMonthFromRange, setDowsFromIndeces, setDowsFromRange, setDowsFromShortName, setDowsFromShortNameRange, setDivFromInputString} from "./DataSetter";

function ValidateAndSetData(input, setSelectedMinutes, setMinutePeriodicity, setSelectedHours, setSelectedDays, setSelectedMonths, setSelectedDows, setAtEveryOption, setSelectedDiv){
    const [newMinute, newHour, newDayMonth, newMonth, newDow] = input.split(' ');
    if(!newMinute || !newHour || !newDayMonth || !newMonth || !newDow)
        return 'String is invalid';
    if(!isCombinationHandled(newMinute, newHour, newDayMonth, newMonth, newDow))
        return 'This combination is not soported';
    if(!trySetMinHour(newMinute, data.minute, setSelectedMinutes, setMinutePeriodicity, setAtEveryOption))
        return 'This combination is not soported';
        //return 'Minute is not valid';
    if(!trySetMinHour(newHour, data.hour, setSelectedHours))
        return 'This combination is not soported';
       // return 'Hour is not valid';
    if(!trySetDom(newDayMonth, setSelectedDays))
        return 'This combination is not soported';
       // return 'Day Of Month is not valid';
    if(!trySetMonth(newMonth, setSelectedMonths))
        return 'This combination is not soported';
       // return 'Month is not valid';
    if(!trySetDow(newDow, data.dow.shortNames, setSelectedDows))
        return 'This combination is not soported';
       // return 'Day Of Week is not valid';
    setDivFromInputString(newDayMonth, newMonth, newDow, setSelectedDiv);
    return 'all good';

}

function isCombinationHandled(min, hour, dom, month, dow){
    if(min.includes('/')){
        if(hour !== '*')
            return false;
        if(hour !== '*')
            return false;
        if(dom !== '*')
            return false;
        if(month !== '*')
            return false;
        if(dow !== '*')
            return;
    }
    return true;
}

function trySetMinHour(input, data, setSelectedMinHour, setMinutePeriodicity, setAtEveryOption) {
    const listOfOptionsSingle = data.listOfOptions.map(value => (parseInt(value, 10)).toString());


    if (input === '*') {
        setSelectedMinHour([]);
        return true;
    }

    // Check if the string matches the pattern '*/a' for minute substring
    if(data.type === 'min'){
        const regex = /^\*\/(\d+)$/;
        const match = input.match(regex);
        if (match) {
            const num = match[1];
            console.log('num ' + num);
            if (listOfOptionsSingle.includes(num)) {
                setAtEveryOption('every');
                setEveryMinutes(input, setMinutePeriodicity);
                return true;
            }
        }
    }
    
    // Check if the string matches the pattern 'a,b,c...'
    const listPattern = /^(\d+(,\d+)*)$/;
    const listMatch = input.match(listPattern);
    if (listMatch) {
        const values = input.split(',');
        const uniqueValues = new Set(values);
        const allWithinRange = values.every(num =>  listOfOptionsSingle.includes(num));
        if (values.length === uniqueValues.size && allWithinRange) {
            setTimeFromValues(input, setSelectedMinHour);
            return true;
        }
    }

    if (data.listOfOptions.includes(input) || listOfOptionsSingle.includes(input)) {
        setSelectedMinHour([input]);
        return true;
    }
    // If none of the above conditions are met, the string is not valid
    return false;
}

function trySetDom(input, setSelectedDays) {
    const min = 1;
    const max = 31;
    if (input === '*') {
        setSelectedDays([]);
        return true;
    }

    // Check if the string matches the pattern 'a,b,c...'
    const listPattern = /^(\d+(,\d+)*)$/;
    const listMatch = input.match(listPattern);
    if (listMatch) {
        const values = input.split(',').map(Number);
        const uniqueValues = new Set(values);
        const allWithinRange = values.every((num) => num >= min && num < max);
        if (values.length === uniqueValues.size && allWithinRange) {
            setTimeFromValues(input, setSelectedDays);
            return true;
        }
    }

    // Check if the string matches the pattern 'A-B'
    const rangePattern = /^(\d+)-(\d+)$/;
    const rangeMatch = input.match(rangePattern);
    if (rangeMatch) {
        const a = parseInt(rangeMatch[1], 10);
        const b = parseInt(rangeMatch[2], 10);
        if (a < b && a >= min && b <= max) {
            setDaysFromRange(input, setSelectedDays);
            return true;
        }
    }
    
    // Check if the string is a single number in the allowed values
    const num = parseInt(input, 10);
    if (!isNaN(num) && (num >= min && num < max)) {
        setSelectedDays([num]);
        return true;
    }

    return false;
}

function trySetMonth(input, setSelectedMonths) {
    const min = 1;
    const max = 12;
    if (input === '*') {
        setSelectedMonths([]);
        return true;
    }

    // Check if the string matches the pattern 'a,b,c...'
    const listPattern = /^(\d+(,\d+)*)$/;
    const listMatch = input.match(listPattern);
    if (listMatch) {
        const values = input.split(',').map(Number);
        const uniqueValues = new Set(values);
        const allWithinRange = values.every((num) => num >= min && num < max);
        if (values.length === uniqueValues.size && allWithinRange) {
            setMonthsFromIndeces(input, setSelectedMonths);
            return true;
        }
    }

    // Check if the string matches the pattern 'A-B'
    const rangePattern = /^(\d+)-(\d+)$/;
    const rangeMatch = input.match(rangePattern);
    if (rangeMatch) {
        const a = parseInt(rangeMatch[1], 10);
        const b = parseInt(rangeMatch[2], 10);
        if (a < b && a >= min && b <= max) {
            setMonthFromRange(input, setSelectedMonths);
            return true;
        }
    }
    
    // Check if the string is a single number in the allowed values
    const num = parseInt(input, 10);
    if (!isNaN(num) && (num >= min && num < max)) {
        setSelectedMonths(data.month.listOfOptions[num - 1]);
        return true;
    }
    return false;
}  
  
function trySetDow(input, dowShortNames, setSelectedDows) {
    // Define the min and max for the range a-b
    const min = 0;
    const max = 7;

    // Check if the string is '*'
    if (input === '*') {
        setSelectedDows([]);
        return true;
    }

    // Check if the string matches the pattern 'a,b,c...'
    const listPattern = /^(\d+(,\d+)*)$/;
    const listMatch = input.match(listPattern);
    if (listMatch) {
        const values = input.split(',').map(Number);
        const uniqueValues = new Set(values);
        const allWithinRange = values.every((num) => num >= min && num < max);
        if (values.length === uniqueValues.size && allWithinRange) {
            setDowsFromIndeces(input, setSelectedDows);
            return true;
        }
    }

    // Check if the string matches the pattern 'a-b'
    const regexRange = /^(\d+)-(\d+)$/;
    const matchRange = input.match(regexRange);
    if (matchRange) {
        const a = parseInt(matchRange[1], 10);
        const b = parseInt(matchRange[2], 10);
        if (a < b && a >= min && b <= max) {
            setDowsFromRange(input, setSelectedDows);
            return true;
        }
    }
    
    const num = parseInt(input, 10);
    console.log('num ' + input);
    if (!isNaN(num) && (num >= min && num <= max)) {
        if(num === 0)
            setSelectedDows([data.dow.listOfOptions[6]]);
        setSelectedDows([data.dow.listOfOptions[num - 1]]);
        return true;
    }

    const listShortNamesPattern = /^(\w+(,\w+)*)$/;
    const listShortNamesdMatch = input.match(listShortNamesPattern);
    if (listShortNamesdMatch) {
        const values = input.split(',');
        const uniqueValues = new Set(values);
        const allValid = values.every(value => dowShortNames.includes(value));
        if (values.length === uniqueValues.size && allValid) {
            setDowsFromShortName(input, setSelectedDows);
            return true;
        }
    }

    // Check if the string matches the pattern 'A-B'
    const rangeShortNamesPattern = /^(\w+)-(\w+)$/;
    const rangeShortNamesMatch = input.match(rangeShortNamesPattern);
    if (rangeShortNamesMatch) {
        const a = rangeShortNamesMatch[1];
        const b = rangeShortNamesMatch[2];
        const indexA = dowShortNames.indexOf(a);
        const indexB = dowShortNames.indexOf(b);
        if (indexA !== -1 && indexB !== -1 && (indexA < indexB || (indexA === 6))) {
            setDowsFromShortNameRange(input, setSelectedDows)
            return true;
        }
    }

    // If none of the above conditions are met, the string is not valid
    return false;
  }

  export {ValidateAndSetData}