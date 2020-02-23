import React, { useState } from 'react';

const SearchForm = () => {
    const [search, setSearch] = useState({
        searchType: null,
        searchVal: null
    });

    const handleChange = event => {
        setSearch({
            ...search,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        if(!search.searchType || !search.searchVal){
            alert('Search Type and Value Required');
            return;
        }
        console.log(search);
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="searchType">Search Type</label>
            <select onChange={handleChange} required={true} id="searchType">
                <option disabled selected>Choose Type</option>
                <option value="projects">Project</option>
                <option value="actions">Action</option>
            </select>
            <br></br>
            <label htmlFor="searchVal">Search For ID #</label>
            <input id="searchVal" type="number" onChange={handleChange} min="1" value={search.searchVal || 0}></input>
            <input type="submit"></input>
        </form>
    );
}

export default SearchForm;