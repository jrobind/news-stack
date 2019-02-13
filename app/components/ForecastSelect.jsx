import React, { Component } from 'react';
import styles from '../styles/components/ForecastSelect.scss'; 

class ForecastSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasAttribute: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const attr = e.target.parentElement.hasAttribute('selected');
        console.log(attr)
        const { updateForecast } = this.props;
        const date = e.target.parentElement.getAttribute('date');
        // add attribute to clicked forecast day
        if (!attr) {
            e.target.parentElement.setAttribute('selected', '');
            this.setState(() => ({hasAttribute: true}));
        } else {
            e.target.parentElement.removeAttribute('selected');
            this.setState(() => ({hasAttribute: false}));
        }

        updateForecast(date);
    }

    render() {
        const { hasAttribute } = this.state;

        return (
            <div
                className={styles.timeOfDay}
                data-testid="time-of-day" 
                onClick={this.handleClick}   
            >{hasAttribute ? 'Current forecast' : 'Weather last week'}</div>           
        )
    }
}

export default ForecastSelect;