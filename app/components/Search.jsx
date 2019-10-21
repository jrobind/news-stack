import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Heading from './Header';
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
    }
    
    handleChange(address) {
        this.setState(() => ({address}));
    }
    
    async handleSelect(address) {
        this.setState(() => ({address, loading: true}));  

        try {
            const geoAddress = await geocodeByAddress(address);

            const { short_name } = geoAddress[0].address_components[0];
             // set placeName to localStorage
             storage.setStorage(short_name, 'placeName');   

            const latLng = await getLatLng(geoAddress[0]);
            const weatherResults = await getWeather(latLng);

            this.setState(() => ({loading: false}));
            // set weather data to localStorage
            storage.setStorage(weatherResults, 'weather');
            // redirect to dashboard
            this.props.history.push('/weather');
        } catch(e) {
            // stay on the search page
            this.props.history.push('/');
            this.setState(() => ({address: '', loading: false}));
            // provide some error feedback to the user. Alert for now
            alert('Sorry! Failed to retrieve weather data.');
        }
    }
    
    render() {
        const { loading } = this.state;

        return(
            <div 
                className={styles.container}
                data-testid='container'
            >
                <Heading/>
                <div className={styles.filler}></div>
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
                                    aria-label="Enter search text"
                                    {...getInputProps({autoFocus: true, placeholder:"Paris, London, Rome..."})}
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