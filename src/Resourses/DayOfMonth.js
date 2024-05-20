

function DayOfMonth({dayOfMonth,  selectedDays, setSelectedDays}){
    const handleDayClick = (day) => {
      if (selectedDays.includes(day)) {
        setSelectedDays(selectedDays.filter((d) => d !== day));
      } else {
        setSelectedDays([...selectedDays, day]);
      }
      
    };
    const monthDays = 31;
    return(
        <>
      {dayOfMonth <= monthDays && 
        
        <button
            className="col btn btn-outline-secondary"
            style={{ maxWidth:35, backgroundColor: selectedDays.includes(dayOfMonth) ? 'lightblue' : '' }}
            value={dayOfMonth}
            clicked = {selectedDays.includes(dayOfMonth)}
            onClick={() => handleDayClick(dayOfMonth)}
        >
            {dayOfMonth}
        </button>
         }
     </>
    )
  }
  
  function Calendar({selectedDays, setSelectedDays}) {
  
    let dayOfMonth = 1;
    const month = [];
    let week = [];
  
    for (let j = 1; j <= 5; j++) {
      for (let i = 1; i <= 7; i++) {
        week.push(
          <DayOfMonth dayOfMonth={dayOfMonth} selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
        );
        dayOfMonth++;
      }
      month.push(<div key={j} className='row mx-0'>{week}</div>);
      week = [];
    }
    return (
      <div className="">
        {month}
      </div>
    )
  }

   export  {Calendar}