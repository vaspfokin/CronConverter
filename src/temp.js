function CustomMultiSelect ({ options }){
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleOptionClick = (option) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(selected => selected !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    };
  
    const handleRemoveSelectedOption = (option) => {
      setSelectedOptions(selectedOptions.filter(selected => selected !== option));
    };
  
    return (
      <div className="custom-multi-select">
        <div className="selected-options">
          {selectedOptions.map(option => (
            <button
              key={option}
              className="selected-option"
              onClick={() => handleRemoveSelectedOption(option)}
            >
              {option} <span className="remove-btn">x</span>
            </button>
          ))}
        </div>
        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            Select Options
          </button>
          {isDropdownOpen && (
            <div className="dropdown">
              {options.map(option => (
                <button
                  key={option}
                  className={`dropdown-option ${selectedOptions.includes(option) ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };