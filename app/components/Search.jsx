import React, { Component } from 'react';
import styles from '../styles/components/Search.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
        
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }
    
    handleInput(e) {
        const val = e.target.value;
        this.setState(() => ({search: val}));
    }
    
    handleSubmission() {
        const { search } = this.state;
        console.log(search);
    }
    
    render() {
        return (
            <div className={styles.container}>
                <input 
                    placeholder="Paris, London, Rome..."
                    onChange={this.handleInput}
                    autoFocus
                />
                <button
                    onClick={this.handleSubmission}    
                >
                    Search Weather
                </button>
            </div>
        )
    }
}

export default Search;