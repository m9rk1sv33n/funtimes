//via https://plainenglish.io/blog/implementing-debouncing-in-react

import { useState } from "react";
//import { useDebounce } from "../useDebounce";

const DebounceScratch = () => {
  const [suggestions, setSuggestions] = useState("");

  const optimizedFn = (value) => {
    fetch(`https://demo.dataverse.org/api/search?q=${value}`)
      .then((res) => res.json())
      .then((json) => setSuggestions(json.data.items));
  };

  //const optimizedFn = useDebounce(handleChange);

  return (
    <>
      <label htmlFor="search">Search</label>
      <input
        type="search"
        id="search"
        className="search"
        placeholder="Enter something here..."
        onChange={(e) => optimizedFn(e.target.value)}
      />

      {suggestions.length > 0 && (
        <div className="autocomplete">
          {suggestions.map((suggestion, index) => {
          return (
            <div key={index}>
              <p>{suggestion.name}</p>
            </div>
          );
        })}
        </div>
      )}
    </>
  );
};

export default DebounceScratch;