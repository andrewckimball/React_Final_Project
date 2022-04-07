import { React, useState } from 'react';
import "./SearchBar.css";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({placeholder, data}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
  
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };
  
    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                {wordEntered.length === 0 ? (
                    <SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </div>
                
            </div>
            {filteredData.length !== 0 && (
                <div className='dataResult'>
                    {filteredData.map((value, key) => {
                        return <p className='dataItem'>{value.name}</p>
                        // return (
                        //     <a className='dataItem'>
                        //         <p>{value.name}</p>
                        //     </a>
                        // )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar
