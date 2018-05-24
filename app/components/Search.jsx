import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/Search.scss';

const Search = ({ handleInput, handleSubmission, searchState: { search }}) => (
    <div className={styles.container}>
        <input 
            placeholder="Paris, London, Rome..."
            onChange={handleInput}
            value={search} 
            autoFocus
        />
        <button
            onClick={handleSubmission}    
        >
            Search Weather
        </button>
    </div>
)

Search.propTypes = {
    handleInput: PropTypes.func.isRequired,
    handleSubmission: PropTypes.func.isRequired
}

export default Search;