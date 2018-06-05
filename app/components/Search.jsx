import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import getWeather from '../utils/api';
import storage from '../utils/storage';
import styles from '../styles/components/Search.scss';

const onError = (status, clearSuggestions) => {
    clearSuggestions();
}

const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
    <div className={styles.container}>
        <div className={styles.autocompleteRoot}>
            <input 
                {...getInputProps({autoFocus: true, placeholder: "Paris, London, Rome..." })}
            />
            {suggestions.length > 0 && <div className={styles.autocompleteDropdownContainer} styles={{display: suggestions.length ? 'inline' : 'none'}}>
                {suggestions.map((suggestion) => (
                    <div {...getSuggestionItemProps(suggestion, {className: styles.suggestion})}>
                        <span key={suggestion.id}>
                            <img className={styles.locationIcon} src={require('../images/location-icon.png')}/>
                            {suggestion.description}
                        </span>
                    </div>
                ))}
                <div className={styles.logoContainer}><img src={require('../images/powered_by_google_on_white.png')}/></div>
            </div>}
        </div>
    </div>
)

class Search extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            loading: false
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }
    
    componentDidMount() {
        this.initialState = this.state;
    }
    
    handleChange(address) {
        this.setState(() => ({search: address}));
    }
    
    handleSubmission() {
        const { search } = this.state;

        geocodeByAddress(search)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => console.log('success', latLng))
            .catch((error) => console.log(error));
        
        // reset input
        this.setState(this.initialState);
    }
    
    render() {
        return(
            <PlacesAutocomplete
                value={this.state.search}
                onChange={this.handleChange}
                onSelect={this.handleSubmission}
                onError={onError}
            >
                {renderFunc}
            </PlacesAutocomplete>
        )
    }
}

export default Search;