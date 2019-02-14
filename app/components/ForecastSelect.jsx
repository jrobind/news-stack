import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchLastWeekForecast } from '../utils/api';
import storage from '../utils/storage';
import styles from '../styles/components/ForecastSelect.scss'; 

class ForecastSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            optionValue: 'Weather history'
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { updateForecast, coord } = this.props;
        const value = e.target.value;
        const date = e.target.closest('div').getAttribute('date');
        const { forecast } = storage.getStorage('weather');

        this.setState(() => ({optionValue: value}));

        switch (value) {
            case 'Weather history':
                updateForecast(forecast);
                break;
            case 'Current':
                updateForecast(forecast);
                break;
            case 'Last week':
                // subtract 7 days from current date selected and pass to api fetch
                const old = String(Number(date.slice(-2) - 7));
                const fOld = old < 10 ? '0' + old : old;
                const fDate = date.slice(0, 8) + fOld;
                coord.date = fDate;
                fetchLastWeekForecast(coord)
                    .then(forecast =>  updateForecast(forecast, date))
                    .catch((error) => console.log(error));
        }  
    }

    render() {
        return (
            <form 
            className={styles.timeOfDay}
            data-testid="time-of-day"    
            >
                <select value={this.state.value} onChange={this.handleChange}>  
                    <option value="Weather history">Weather history</option>
                    <option value="Current">Current</option>
                    <option value="Last week">Last week</option>
                </select>
            </form>      
        )
    }
}

ForecastSelect.propTypes = {
    updateForecast: PropTypes.func.isRequired
}

export default ForecastSelect;