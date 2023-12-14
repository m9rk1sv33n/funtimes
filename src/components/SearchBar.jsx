import React, {useCallback, useState} from 'react';
import { FaSearch } from 'react-icons/fa';
//import { useDebounce } from '../useDebounce';

export const SearchBar = () => {
  const [input, suggestions, setSuggestions] = useState("");

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = (value) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        const suggestions = json.filter((user) => {
          return user.name.toLowerCase().includes(value)
        });
        console.log(suggestions);
      })
  }

  const optimizedFn = useCallback(debounce(handleChange), []);

  // const handleChange = (value) => {
  //   fetchData(value);
  // }

  return (
    <div className='input-wrapper'>
      <label htmlFor="search">Search</label>
      <FaSearch id="search-icon" />
      <input 
        id="search" 
        value={input} 
        onChange={(e) => optimizedFn(e.target.value)}
        />
      {suggestions.length > 0 && (
        <div className="autocomplete">
          {suggestions}
          {/* {suggestions.map((el, i) => (
            <div key={i} className="autocompleteItems">
              <span>{el.name}</span>
            </div>
          ))} */}
        </div>
      )}
    </div>
    
  )
};

