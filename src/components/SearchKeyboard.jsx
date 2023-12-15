import { useState, useEffect } from 'react'
import './SearchKeyboard.css'
import useDebounce from '../hooks/useDebounce';

const SearchKeyboard = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const debouncedSearch = useDebounce(search);

  const handleChange = (e) => { 
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
  }

  const handleKeyDown = (e) => {
    if (selectedItem < searchData.length) {
      if (e.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem(prev => prev - 1);
      } else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
        setSelectedItem(prev => prev + 1);
      } else if (e.key === "Enter" && selectedItem >= 0) {
        window.open(searchData[selectedItem].show.url);
      }
    } else {
      setSelectedItem(-1);
    }
  }

  useEffect(() => {
    if (debouncedSearch !== ""){
      fetch(`http://api.tvmaze.com/search/shows?q=${debouncedSearch}`)
        .then((res) => res.json())
        .then((data) => setSearchData(data));
    } else {
      setSearchData([]);
    }
  }, [debouncedSearch]);

  return (
    <div>
      <input 
      type="search"
      placeholder="A Teacher"
      autoComplete='off'
      onChange={handleChange}
      value={search}
      onKeyDown={handleKeyDown} />
      <span onClick={handleClose}>X</span>
      <div className='search-results'>
        {searchData.map((data, index) => {
          return (
            <a
              style={{ display: "block" }}
              href={data.show.url}
              key={index}
              target='_blank'
              rel='noreferrer'
              className={selectedItem === index
              ? "selected-item active"
              : "selected-item"}>
                {data.show.name}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default SearchKeyboard
