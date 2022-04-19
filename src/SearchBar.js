import { React, useState } from 'react';
import "./SearchBar.css";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';


function SearchBar({placeholder, NameData, setSearch}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = NameData.data.filter((value) => {
            return value.rename.toLowerCase().includes(searchWord.toLowerCase()); 
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
    
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const runSearch = async (val) => {
        setSearch(val);
        setWordEntered("");
        await delay(100);
        setFilteredData([]);
        
    }

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
                        return (
                                <div key={value.id}>
                                    <button 
                                        key={value.id}
                                        onClick={() => {runSearch(value.key_name)}}
                                        className="btn btn-link"
                                    >
                                        {value.rename}
                                    </button> 
                                </div>

                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar
