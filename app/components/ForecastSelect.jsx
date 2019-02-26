import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/ForecastSelect.scss'; 

class ForecastSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentValue: 'Feels like',
            optionValue: 'Average temperature'
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { updateForecast } = this.props;
        const value = e.target.value;
        const id = e.target.closest('div')
            .getAttribute('data-id');

        this.setState(() => ({optionValue: value}));

        switch(value) {
            case 'Feels like':
                updateForecast('feels-like', id);
            break;
            case 'Average-temperature':
                updateForecast('average-temp', id);
            break;
            case 'Maximum-temperature':
                updateForecast('max-temp', id);
            break;
            case 'Minimum-temperature':
                updateForecast('min-temp', id);
        }
    }

    render() {
        const { id } = this.props;

        return (
            <form 
                className={styles.timeOfDay}
                data-testid="temp-options"    
            >
                <select value={!id ? this.state.currentValue : this.state.value} onChange={this.handleChange}>  
                    {!id && <option value="Feels-like">Feels like</option>}
                    <option value="Average-temperature">Average temperature</option>
                    <option value="Maximum-temperature">Maximum temperature</option>
                    <option value="Minimum-temperature">Minimum temperature</option>
                </select>
            </form>      
        )
    }
}

ForecastSelect.propTypes = {
    updateForecast: PropTypes.func.isRequired,
    coord: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired
}

export default ForecastSelect;