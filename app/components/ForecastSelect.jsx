import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/ForecastSelect.scss'; 

class ForecastSelect extends Component {
    constructor(props) {
        super(props);

        this.state = { currentValue: 'Average temperature' }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { updateForecast } = this.props;
        const value = e.target.value;
        const id = e.target.closest('div')
            .getAttribute('data-id');

       this.setState(() => ({currentValue: value}));

        switch(value) {
            case 'Average temperature':
                updateForecast('avg-temp', id);
                break;
            case 'Maximum temperature':
                updateForecast('max-temp', id);
                break;
            case 'Minimum temperature':
                updateForecast('min-temp', id);
        }
    }

    render() {
        const { currentValue } = this.state;

        return (
            <form 
                className={styles.temperature}
                data-testid="temp-options"    
            >
                <select value={currentValue} onChange={this.handleChange}>  
                    <option value="Average temperature">Average temperature</option>
                    <option value="Maximum temperature">Maximum temperature</option>
                    <option value="Minimum temperature">Minimum temperature</option>
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