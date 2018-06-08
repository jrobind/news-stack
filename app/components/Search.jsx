import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Loading from './Loading';
import getWeather from '../utils/api';
import storage from '../utils/storage';
import styles from '../styles/components/Search.scss';

const onError = (status, clearSuggestions) => {
    clearSuggestions();
}

class Search extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            loading: false
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown(e) {
        console.log(e);
    }
    
    handleChange(address) {
        this.setState(() => ({address}));
    }
    
    handleSelect(address) {
        this.setState(() => ({address, loading: true}));

        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                getWeather(latLng)
                    .then((weather) => {
                        console.log(weather);
                        this.setState(() => ({loading: false}));
                    });
            })
            .catch((error) => console.log(error));
    }
    
    render() {
        const { loading } = this.state;

        return(
            <div className={styles.container}>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    onError={onError}
                >
                    {({ getInputProps, getSuggestionItemProps, suggestions }) => {
                        return (
                            <div className={styles.autocompleteRoot}>

                                {!loading ? <input 
                                    {...getInputProps({autoFocus: true, placeholder: "Paris, London, Rome..."})}
                                /> : 
                                <Loading />}

                                {suggestions.length > 0 && <div className={styles.autocompleteDropdownContainer} styles={{display: suggestions.length ? 'inline' : 'none'}}>
                                    {suggestions.map((suggestion) => {
                                        const className = suggestion.active ? styles.suggestionActive : styles.suggestion;
                                        
                                        return (
                                            <div {...getSuggestionItemProps(suggestion, { className })}>
                                                <span key={suggestion.id}>
                                                    <img className={styles.locationIcon} src={require('../images/location-icon.png')}/>
                                                    {suggestion.description}
                                                </span>
                                            </div>
                                        )
                                    })}
                                    <div className={styles.logoContainer}><img src={require('../images/powered_by_google_on_white.png')}/></div>
                                </div>}
                            </div>
                        ) 
                    }}
                </PlacesAutocomplete>
            </div>
        )
    } 
}

export default Search;