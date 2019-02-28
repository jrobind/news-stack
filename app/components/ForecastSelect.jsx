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

        !Number(id) ? this.setState(() => ({currentValue: value})) : this.setState(() => ({optionValue: value}));

        switch(value) {
            case 'Feels like':
                updateForecast('feels like', id);
                break;
            case 'Temperature':
                updateForecast('temperature', id);
                break;
            case 'Average temperature':
                updateForecast('average temp', id);
                break;
            case 'Maximum temperature':
                updateForecast('max temp', id);
            break;
            case 'Minimum temperature':
                updateForecast('min temp', id);
        }
    }

    render() {
        const { id } = this.props;
        const { currentValue, optionValue } = this.state;

        return (
            <form 
                className={styles.timeOfDay}
                data-testid="temp-options"    
            >
                <select value={!id ? currentValue : optionValue} onChange={this.handleChange}>  
                    {!id && <option value="Feels like">Feels like</option>}
                    {!id && <option value="Temperature">Temperature</option>}
                    {id && <option value="Average temperature">Average temperature</option>}
                    {id && <option value="Maximum temperature">Maximum temperature</option>}
                    {id && <option value="Minimum temperature">Minimum temperature</option>}
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