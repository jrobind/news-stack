import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/Search.scss';

const Search = ({ handleInput, handleSubmission }) => (
    <div className={styles.container}>
        <input 
        placeholder="Paris, London, Rome..."
        onChange={handleInput}
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