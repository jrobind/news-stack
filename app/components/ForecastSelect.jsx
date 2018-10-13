import React, { Component } from 'react';
import styles from '../styles/components/ForecastSelect.scss'; 

class ForecastSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Afternoon',
            date: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { updateForecast } = this.props;
        const value = e.target.value;
        const date = e.target.closest('div').getAttribute('data');

        this.setState({value, date}, () => {
            updateForecast(this.state);
        });

    }

    render() {
        return (
            <form 
                className={styles.timeOfDay}
                data-testid="time-of-day"    
            >
                <select value={this.state.value} onChange={this.handleChange}>  
                    <option value="Afternoon">Afternoon</option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                </select>
            </form>
        )
    }
}

export default ForecastSelect;