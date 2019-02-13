import React, { Component } from 'react';
import styles from '../styles/components/ForecastSelect.scss'; 

class ForecastSelect extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const { updateForecast } = this.props;
        const date = e.target.parentElement.getAttribute('date');

        updateForecast(date);
    }

    render() {
        return (
            <div
                className={styles.timeOfDay}
                data-testid="time-of-day" 
                onClick={this.handleClick}   
            >Forecast last week</div>           
        )
    }
}

export default ForecastSelect;